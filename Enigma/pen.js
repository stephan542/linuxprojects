class Pen{
    constructor(container,font="Comic Sans MS",size=30){
        this.pen = container.getContext("2d");
        this.fontSize = size;
        this.fontType = font;
    }

    drawCircle(x,y,r,color="black",fill=false){
        this.pen.beginPath();
        this.pen.fillStyle = color;
        this.pen.arc(x+r,y+r,r,0, 2 * Math.PI);
        if(fill){
            this.pen.fill();
        }else{
            this.pen.stroke();
        }
        
    }

    drawRect(x,y,w,h,color="black",fill=false){
        if(fill){
            this.pen.fillStyle = color;
            this.pen.fillRect(x,y,w,h);
        }else{
            this.pen.fillStyle = color;
            this.pen.strokeRect(x,y,w,h)
        }
        
    }

    drawText(text,x,y,color="black",size=this.fontSize,font=this.fontType){
        this.pen.font = size+"px "+font;
        this.pen.fillStyle = color;
        this.pen.fillText(text,x,y);
    }

    clearRect(x,y,w,h){
        this.pen.clearRect(x,y,w,h);
    }

    getPen(){
        return this.pen;
    }
    
    setPen(pen){
        this.pen = pen;
    }

    setFont(font,size=this.fontSize){
        this.pen.font = size+"px "+font;
    }

    getFont(){
        return this.fontType+"("+this.fontSize+")";
    }


}