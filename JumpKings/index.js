
class GameObject{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    draw(pen){
        pen.fillStyle = this.color;
        pen.fillRect(this.x,this.y,this.width,this.height);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }


    getBounds(){
        return [this.x,this.y,this.width,this.height];
    }
}

class Player extends GameObject {
    
    mass = 0.03;
    jumpHeight = 8;

    constructor(x,y,width,height,color){
        super(x,y,width,height,color);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.fallAcc = 0;
        this.jumpAcc = 0;
        this.jumping = false;
        this.falling = true;
        this.bottomCollision = false;
        this.topCollision = false;
        this.leftCollision = false;
        this.rightCollision = false;
    }

    setCollision(pos,val){

        switch(pos){
            case 't':{
                this.topCollision=val;
                if(val){
                    this.setFalling(true);
                    this.setJumping(false);
                }
                break;
            }
            case 'b':{
                this.bottomCollision=val;
                if(val){
                    this.setFalling(false);
                }
                break;
            }
            case 'l':{
                this.leftCollision=val;
                if(val){
                    this.xSpeed = 0;
                }
                break;
            }
            case 'r':{
                this.rightCollision=val;
                if(val){
                    this.xSpeed = 0;
                }
                break;
            }

        }

    }

    getJumping(){
        return this.jumping;
    }

    setJumping(flag){
        this.ySpeed=0;
        this.jumping=flag;
    }
    
    getFalling(){
        return this.falling;
    }

    setFalling(flag){
        this.fallAcc=0;
        this.jumpAcc=0;
        this.falling=flag;
    }

    update(){
        
          if(!this.bottomCollision && !this.jumping){
            this.y += this.ySpeed;
            this.ySpeed = this.mass*this.fallAcc;
            if(this.ySpeed<=60){
                this.fallAcc += gravity;
            }
            this.jumpAcc=0;
            
          }
          
          if(!this.topCollision && this.jumping){
            let rate = 0.7;
            this.jumpAcc +=0.5;
            this.ySpeed = -((rate*this.jumpAcc)*(rate*this.jumpAcc)+this.jumpAcc);
            this.y += this.ySpeed;
            if(this.jumpAcc>=this.jumpHeight){
                this.jumping=false;
                this.jumpAcc=0;
                this.ySpeed=0;
                this.falling = true;
            }
          }

          if(this.xSpeed<0 && !this.leftCollision){
            this.x +=this.xSpeed;
          }

          if(this.xSpeed>0 && !this.rightCollision){
            this.x +=this.xSpeed;
          }
          
          
    }

    move(val){
        this.xSpeed = val;
    }

}

class Collision{
    constructor(){}

    collision(obj){
        let cllsn = [false,false,false,false];
        let tCllsn = [false,false,false,false];

        for(let i=0;i<gameObjects.length;i++){
            if(obj!=gameObjects[i]){
                tCllsn = this.collide(obj,gameObjects[i]);
                cllsn = [
                    tCllsn[0]||cllsn[0],
                    tCllsn[1]||cllsn[1],
                    tCllsn[2]||cllsn[2],
                    tCllsn[3]||cllsn[3],
                ]
            }
        }
        obj.setCollision('t',cllsn[0]);
        obj.setCollision('b',cllsn[1]);
        obj.setCollision('l',cllsn[2]);
        obj.setCollision('r',cllsn[3]);
    }

    collide(obj1,obj2){
        let b = this.bottomCollision(obj1,obj2);
        let t = this.topCollision(obj1,obj2);
        let l = this.leftCollision(obj1,obj2);
        let r = this.rightCollision(obj1,obj2);
        return [t,b,l,r];
    }

    topCollision(b1,b2){
        if((b2.getBounds()[1]+b2.getBounds()[3])< b1.getBounds()[1]){
            let yDist = b1.getBounds()[1]-(b2.getBounds()[1]+b2.getBounds()[3]) + b1.ySpeed;
            let x1 = b1.getBounds()[0];
            let x2 = (b1.getBounds()[0]+(b1.getBounds()[2]/2));
            let x3 = (b1.getBounds()[0]+b1.getBounds()[2]);
            if(yDist <=1 && 
                (
                    (x1>=b2.getBounds()[0] && x1<=(b2.getBounds()[0]+b2.getBounds()[2])) ||
                    (x2>=b2.getBounds()[0] && x2<=(b2.getBounds()[0]+b2.getBounds()[2])) ||
                    (x3>=b2.getBounds()[0] && x3<=(b2.getBounds()[0]+b2.getBounds()[2]))
                )){
                b1.setY(b2.getBounds()[1]+b2.getBounds()[3]+2);
                console.log('TOP');
                return true;
            }else{
                return false;
            }
        }
    }

    bottomCollision(b1,b2){
        if(b2.getBounds()[1] > (b1.getBounds()[1]+b1.getBounds()[3])){
            let yDist = b2.getBounds()[1] - (b1.getBounds()[1]+b1.getBounds()[3]) - b1.ySpeed;
            let x1 = b1.getBounds()[0];
            let x2 = (b1.getBounds()[0]+(b1.getBounds()[2]/2));
            let x3 = (b1.getBounds()[0]+b1.getBounds()[2]);

            
            if(yDist <=1 && 
                (
                    (x1>=b2.getBounds()[0] && x1<=(b2.getBounds()[0]+b2.getBounds()[2])) ||
                    (x2>=b2.getBounds()[0] && x2<=(b2.getBounds()[0]+b2.getBounds()[2])) ||
                    (x3>=b2.getBounds()[0] && x3<=(b2.getBounds()[0]+b2.getBounds()[2]))
                )){
                    b1.setY(b2.getBounds()[1]-b1.getBounds()[3]-1);
                    console.log('BOTTOM');
                    return true;
                }else{
                    return false;
                }
        }
    }
    leftCollision(b1,b2){
        if((b2.getBounds()[0]+b2.getBounds()[2])< b1.getBounds()[0]){
            let xDist = b1.getBounds()[0]-(b2.getBounds()[0]+b2.getBounds()[2]) + b1.xSpeed;
            let y1 = b1.getBounds()[1];
            let y2 = (b1.getBounds()[1]+(b1.getBounds()[3]/2));
            let y3 = (b1.getBounds()[1]+b1.getBounds()[3]);
            if(xDist <=1 && 
                (
                    (y1>=b2.getBounds()[1] && y1<=(b2.getBounds()[1]+b2.getBounds()[3])) ||
                    (y2>=b2.getBounds()[1] && y2<=(b2.getBounds()[1]+b2.getBounds()[3])) ||
                    (y3>=b2.getBounds()[1] && y3<=(b2.getBounds()[1]+b2.getBounds()[3]))
                )){
                b1.setX(b2.getBounds()[0]+b2.getBounds()[2]+1);
                console.log('LEFT');
                return true;
            }else{
                return false;
            }
        }
    }
        rightCollision(b1,b2){
            if(b2.getBounds()[0] > (b1.getBounds()[0]+b1.getBounds()[2])){
                let xDist = b2.getBounds()[0] - (b1.getBounds()[0]+b1.getBounds()[2]) - b1.ySpeed;
                let y1 = b1.getBounds()[0];
                let y2 = (b1.getBounds()[0]+(b1.getBounds()[2]/2));
                let y3 = (b1.getBounds()[0]+b1.getBounds()[2]);
    
                
                if(xDist <=1 && 
                    (
                        (y1>=b2.getBounds()[1] && y1<=(b2.getBounds()[1]+b2.getBounds()[3])) ||
                        (y2>=b2.getBounds()[1] && y2<=(b2.getBounds()[1]+b2.getBounds()[3])) ||
                        (y3>=b2.getBounds()[1] && y3<=(b2.getBounds()[1]+b2.getBounds()[3]))
                    )){
                        b1.setX(b2.getBounds()[0]-b1.getBounds()[2]-1);
                        console.log('RIGHT');
                        return true;
                    }else{
                        return false;
                    }
            }
}

}


///----------------------------------------------------------------------------------------


let gameloop; 
let pen;
let canvas;
let player;
let gravity = 10;
let gameObjects = [];
let debug = [];

let collision = new Collision();

function init(){
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    pen = canvas.getContext('2d');

    player = new Player(100,400,50,50,"red");

    gameObjects.push(player);
    gameObjects.push(new GameObject(90,canvas.height-10,canvas.width-180,1,"black"));
    gameObjects.push(new GameObject(0,canvas.height-90,120,81,"black"));
    gameObjects.push(new GameObject(canvas.width-90,canvas.height-90,90,81,"black"));

    startGameLoop();
}

function draw(){
   for(let i=0;i<gameObjects.length;i++){
        gameObjects[i].draw(pen);
   }
}

function update(){
    collision.collision(player);
    player.update();
}

function startGameLoop(){
    gameloop = setInterval(()=>{

        try{
            pen.clearRect(0,0,canvas.width,canvas.height)
            draw();
            update();
        }catch(error){
            console.error();
            stopGameLoop();
        }
        
    
    },16);
}

function stopGameLoop(){
    clearInterval(gameloop);
}



document.onkeydown = (e) =>{
        if(e.keyCode==38){
            if(!player.getJumping() && !player.getFalling() && player.bottomCollision){
                player.setJumping(true);
                player.setY(player.getY()-1)
            }
        }
        if(e.keyCode==37){
            player.move(-3);
        }else if(e.keyCode==39){
            player.move(3);
            
        }

}

document.onkeyup = (e) =>{
    if(e.keyCode==37 || e.keyCode==39){
        player.move(0);
    }

}

init();