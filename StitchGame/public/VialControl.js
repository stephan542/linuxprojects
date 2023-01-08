class Vial {
    constructor(id,width,height,colors=[],blocked=false){
        this.id = id;
        this.width = width;
        this.height = height;
        this.setColors(colors);
        this.setAmt()
        this.maxAmt = colors.length;
        this.div = null;
    }

    create(){
        this.div = document.createElement('div');
        this.div.setAttribute('class','vial');
        this.div.setAttribute('data-number',this.id);

        this.div.style.width = `${this.width}vw`;
        this.div.style.height = `${this.height}vh`;
         
        let level = null;
        for(let i=0;i<this.maxAmt-1;i++){
            level = document.createElement('div');
            level.setAttribute('class','vialLevel')
            level.style.height=`${100/this.maxAmt}%`;
            this.div.appendChild(level)
        }
        level = document.createElement('div');
        level.setAttribute('class','vialLevel');
        level.style.borderBottomRightRadius='32%';
        level.style.borderBottomLeftRadius='32%';
        level.style.height=`${100/this.maxAmt}%`;
        this.div.appendChild(level);
        
        this.setVialColors();
        
    }

    setVialColors(){
        let levels = this.div.getElementsByClassName('vialLevel');
        for(let i=0;i<this.colors.length;i++){
            levels[i].style.backgroundColor = this.colors[i];
        }
    }

    getDiv(){
        return this.div;
    }

    setAmt(){
        let amt = 0;
        for(let i=0;i<this.colors.length;i++){
            if(this.colors[i]!=''){
                amt++;
            }
        }
        this.amt = amt;
    }

    getMaxAmt(){
        return this.maxAmt;
    }

    getAmt(){
        return this.amt;
    }
    getColors(){
        return this.colors;
    }

    setColors(colors){
        this.colors = colors;
    }

    getColor(index){
        return this.colors[index];
    }

    setColor(index,color=''){
       this.color[index]=color;
    }

    addColor(color=''){
        if(this.amt<this.maxAmt){
            this.colors[this.maxAmt-1-this.amt]=color;
            this.setAmt()
        }
    }

    removeColor(){
        if(this.amt>0){
            let color = '';
            color = this.colors[this.maxAmt-this.amt]
            this.colors[this.maxAmt-this.amt]='';
            this.setAmt();
            return color;
        }
        return '';
    }

    getNextColor(){
        if(this.maxAmt-this.amt>=0 && this.amt>0){
            return this.colors[this.maxAmt-this.amt];
        }else if(this.amt==0){
            return '';
        }else{
            return "/";
        }
        
    }
}

class VialControl extends GameObject{

    vials = []
    name = 'vialControl'
    constructor(id,scrn={scrn:null,point:{}}){
        super([`vials_${id}`]);
        this.id = id;
        this.scrn = scrn;
        this.setVials(this.retrieveVials());
        this.selectedVial = null;
    }

    create(container){
        let vialWidth = (195-this.allVials['colors'].length*10-25)/(this.allVials['colors'].length+1);
        let vialHeight = ((90-this.scrn['point']['offset'])/2-5);
        let topContainer = document.createElement('div');
        let contentContainer = document.createElement('div');

        console.log(vialWidth);

        topContainer.setAttribute('class','topContainer');
        contentContainer.setAttribute('class','contentContainer');

        contentContainer.style.padding = '5vw';
        contentContainer.style.backgroundColor = '#eee';

        topContainer.style.width = '98vw';

        if(this.scrn['point']['offset']){
            if(this.scrn['point']['offset']<100){
                topContainer.style.height = `${this.scrn['point']['offset']}vh`;
            }else{
                topContainer.style.height= `calc((100vh - ${this.pieceSize*this.gridHeight}vw)/ 3`;
            }
        }

        
        container.append(topContainer);

        contentContainer.style.height = `${90-this.scrn['point']['offset']}vh`;
        let id = 0;
        let v = this;
        for(let i=0;i<this.allVials['colors'].length;i++){
            this.vials[id] = new Vial(id,vialWidth,vialHeight,this.allVials['colors'][i],this.allVials['blocked'])
            this.vials[id].create();

            contentContainer.appendChild(this.vials[id].getDiv());
            
            this.vials[id].getDiv().onclick = function (){
                v.selectVial(v.vials[parseInt(this.getAttribute('data-number'))]);
            }
            id++;
        }

        container.append(contentContainer);

    }

    selectVial(vial){
        
        if(!this.selectedVial){
            vial.getDiv().classList.add("selectedVial");
            this.selectedVial = vial;
        }else if( this.selectedVial == vial){
            vial.getDiv().classList.remove('selectedVial')
            this.selectedVial = null;
        }else{
            let v1 = vial.getDiv().getBoundingClientRect();
            let v2 = this.selectedVial.getDiv().getBoundingClientRect();
            let w =  vial.getDiv().clientWidth;
            let h =  vial.getDiv().clientHeight;
            let prevSel = this.selectedVial;
            this.selectedVial.getDiv().style.transition = "1s ease";

            if(parseInt(this.selectedVial.getDiv().getAttribute('data-number'))<parseInt(vial.getDiv().getAttribute('data-number'))){
                this.selectedVial.getDiv().style.transform = `rotate(90deg) translate(${v1.y-(v2.y+(h/2-w/2)+w)-10}px, ${v2.x-(h/2-w/2)-v1.x+h-10}px)`;
            }else{
                this.selectedVial.getDiv().style.transform = `rotate(-90deg) translate(${v2.y-v1.y+h-(h/2-w/2)+10}px, ${v1.x-(v2.x-h/2-w/2)-10}px)`;
            }

            let v = this;
            setTimeout(function(){
                v.pourToVial(prevSel,vial);
            },1000)

            setTimeout(function(){
                prevSel.getDiv().style.transform = "none";
            },1000)

            setTimeout(function(){
                prevSel.getDiv().style.transition = "none";
            },2000)

            this.selectedVial.getDiv().classList.remove("selectedVial")
            this.selectedVial = null
        }
        
    }

    testVials(){
        let passed = 0;
        this.vials.forEach((vial)=>{
            if(vial.getColors().every((color)=> color == vial.getColors()[0])){
                passed++;
            }
        });
        return passed==this.vials.length;
    }
    
    setVials(vials){
        this.allVials = vials;
    }

    pourToVial(vial1,vial2){
        let v = this;
        if(vial2.getAmt()<vial2.getMaxAmt()){
            if(vial1.getAmt()>0 && (vial1.getNextColor()== vial2.getNextColor() || vial2.getNextColor()=='')){
                let c = vial1.removeColor();
                vial2.addColor(c);

                if(c==vial1.getNextColor()){
                   this.pourToVial(vial1,vial2);
                }   
            }
        }
        vial1.setVialColors();
        vial2.setVialColors();

        if(this.testVials()){
            this.scrn['scrn'].revealPoints(this.scrn['point']['showPoints'])
            this.scrn['scrn'].showInventory();
            this.vials.forEach((vial)=>{
                $(vial.getDiv()).unbind();
            });
        }
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getVials(){
        return this.allVials;
    }

    getVials(){
        return this.allVials;
    }

    retrieveVials(){
        return super.getResources()['vials'];
    }
}