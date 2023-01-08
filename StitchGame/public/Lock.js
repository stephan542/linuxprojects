class Piece {

    constructor(id,width,height,x,y,touchable=true){
        this.id = id;
        this.x = x;
        this.y = y;
        this.touchable = touchable;
        this.setHeight(height);
        this.setWidth(width);
    }

    create(){
        this.div = document.createElement('div');
        this.div.setAttribute('class','piece');
        this.div.setAttribute('data-number',this.id);

        this.div.style.width = `${this.width}vw`;
        this.div.style.height = `${this.height}vw`;
    }

    getDiv(){
        return this.div;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setWidth(width){
        this.width = width;
    }

    setTouchable(touchable){
        this.touchable = touchable;
    }

    setHeight(height){
        this.height = height;
    }

    getWidth(){
        return this.width;
    }

    getTouchable(){
        return this.touchable;
    }

    getHeight(){
        return this.height;
    }
}

class Lock extends GameObject{

    keyAlphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    pieces = [];
    gridHeight = 0;
    gridWidth = 0;
    areaGrid = [];
    passed = 0;

    constructor(id,scrn={point:{},scrn:null},width,height){
        super([`words_${id}`]);
        this.scrn = scrn;
        this.setHeight(height);
        this.setWidth(width);
        this.areaGrid = this.createGrid();
        this.setWords(this.retrieveWords());
        this.selectedPiece = null;
        this.pieceSize = (100-(this.gridWidth*2)-2)/this.gridWidth;
    }

    create(container){

        let topContainer = document.createElement('div');
        let contentContainer = document.createElement('div');
        let keyboardContainer = document.createElement('div');

        topContainer.setAttribute('class','topContainer');
        contentContainer.setAttribute('class','contentContainer');
        keyboardContainer.setAttribute('class','keyBoardContainer');

        contentContainer.style.padding = '1vw';

        topContainer.style.width = '98vw';
        if(this.scrn['point']['offset']){
            if(this.scrn['point']['offset']<100){
                topContainer.style.height = `${this.scrn['point']['offset']}vh`;
            }else{
                topContainer.style.height= `calc((100vh - ${this.pieceSize*this.gridHeight}vw)/ 3`;
            }
        }
        container.append(topContainer);

        let p = this;
        let id  = 0;

        for(let i=0;i<this.gridHeight;i++){
            for(let j=0;j<this.gridWidth;j++){

                this.pieces[id] = new Piece(id,this.pieceSize,this.pieceSize,j,i);
                this.pieces[id].create();

                contentContainer.appendChild(this.pieces[id].getDiv());
                
                this.pieces[id].getDiv().onclick = function (){
                    p.getHint(p.pieces[parseInt(this.getAttribute('data-number'))]);
                    p.selectPiece(p.pieces[parseInt(this.getAttribute('data-number'))]);
                }
               id++;
            }
        }

        container.append(contentContainer);

        this.generateKeyboard(keyboardContainer);

        keyboardContainer.style.width= '100vw';
        keyboardContainer.style.height= `25vh`;
        container.append(keyboardContainer);
    }

    getHint(piece){
        let line = piece.getY();
            if(this.words[line]){
                new PopUp(null,[this.words[line]['hint']]);
            }
    }

    selectPiece(piece,shift=false,dir='forward'){
        if(piece.getTouchable()){
            let p = this;
            let cords = [piece.getX(),piece.getY()];

            if(shift){
                let testCord = [];
                if(dir=='forward'){
                    testCord = [cords[0]+1,cords[1]];
                }else{
                    testCord = [cords[0]-1,cords[1]];
                }
                if(testCord[0]>=this.gridWidth && dir=='forward'){
                    testCord[0]=0;
                }else if(testCord[0]<0 && dir=='backward'){
                    testCord[0]=this.gridWidth-1;
                }
                piece = this.pieces.filter(pc => pc.getX()==testCord[0] && pc.getY()==testCord[1])[0];
            }


            if(p.selectedPiece){
                p.selectedPiece.getDiv().setAttribute('class','piece');
                this.selectLine(p.selectedPiece.getY(),'piece')
            }

        
            p.selectedPiece = piece;
            p.selectedPiece.getDiv().setAttribute('class','selectedPiece')
            this.selectLine(cords[1],'selectedLine')
        }
    }

    selectLine(line,change,included=false){
        let p = this;
        p.pieces.filter((pcs) => pcs.getY()==line)
            .forEach(pcs => {
                if(pcs != p.selectedPiece || included==true){
                   pcs.getDiv().setAttribute('class',change);
                }
                
            });
    }

    generateKeyboard(keyboardContainer){
        let line = [];
        let lineCount = 0;
        let sep = 10;
        let letter = null;
        let l = this;

        line[0] = document.createElement('div');
        line[1] = document.createElement('div');
        line[2] = document.createElement('div');

        keyboardContainer.appendChild(line[lineCount]);
        for(let x=0;x<this.keyAlphabet.length;x++){
            letter=document.createElement('p');
            letter.setAttribute('class','letter');

            if(x%sep==0 && x!=0){
                lineCount++;
                sep += sep-1;
                keyboardContainer.appendChild(line[lineCount]);
                for(let y=0;y<lineCount;y++){
                    line[lineCount].innerHTML += `<p class='spacer'></p>`;
                }
                
            }
            letter.innerHTML = this.keyAlphabet[x];
            
            letter.onclick = function(){
                l.addLetter(l.keyAlphabet[x]);
            }

            line[lineCount].appendChild(letter);
        }
        letter=document.createElement('p');
        letter.setAttribute('class','letter');
        letter.innerHTML = '<';

        letter.onclick = function(){
            l.removePiece(l.selectedPiece)
        }

        line[lineCount].appendChild(letter);
    }

    addLetter(letter,touchable=true){
       
        if(this.selectedPiece){
            if(this.selectedPiece.getTouchable()){
                let cord = [this.selectedPiece.getX(),this.selectedPiece.getY()];
                this.selectedPiece.getDiv().innerHTML = `<p class='pletter' style='font-size:${this.pieceSize-2}vw'>${letter}</p>`;

                this.selectPiece(this.selectedPiece,true);
                this.areaGrid[cord[1]][cord[0]] = letter;
                this.selectedPiece.setTouchable(touchable);

                this.testLine(cord[1]);
         }
    }
    }

    getHeight(){
        return this.gridHeight
    }
    getWidth(){
        return this.gridWidth;
    }

    setHeight(height){
        this.gridHeight = height;
    }
    setWidth(width){
        this.gridWidth = width;
    }
    testLine(line){
        if(!this.areaGrid[line].includes('')){
            if(this.areaGrid[line].join('')==this.words[line]['word'].toUpperCase()){
                this.selectLine(line,'correctLine',true);
                this.passed+=1
                this.testLock();
                this.lockLine(line);

                let newSelPiece = this.pieces.filter(p=>p.getY()==line+1 && p.getX()==0)[0];
                if(newSelPiece){
                    this.getHint(newSelPiece);
                    this.selectedPiece = newSelPiece;
                    this.selectPiece(newSelPiece);
                }else{
                    this.selectedPiece = null;
                }
                
            }else{
                this.removeLine(line);
                
            }
        }
       
    }
    lockLine(line){
        let p = this;
        this.pieces.filter((pc) => pc.getY()==line)
        .forEach(pc => {
            pc.setTouchable(false);
        });
    }

    testLock(){
        if(this.passed == this.getHeight()){
            this.saveState('screenId',this.scrn['point']['screenLink'])
            this.scrn['scrn'].openScreen(this.scrn['point']['screenLink']);
        }
    }
    setWords(words){
        this.words = words;
    }

    removePiece(piece){
        if(piece){
            if(piece.getTouchable()){
                let cords = [piece.getX(),piece.getY()];
                let p = this;

                if(piece.getDiv().innerHTML == ''){
                    let j = cords[0]-1;
                    if(j>=0){
                        cords[0]=j;
                    }
                }

                this.pieces.filter((pc) => pc.getX()==cords[0] && pc.getY()==cords[1])
                .forEach(pc => {
                    if(pc.getTouchable()){
                        pc.getDiv().innerHTML = '';
                        p.areaGrid[cords[1]][cords[9]] = '';
                    }
                });
                this.selectPiece(this.selectedPiece,true,'backward');
                }
        }
    }

    removeLine(line){
        let p = this;
        this.pieces.filter((pc) => pc.getY()==line)
        .forEach(pc => {
            if(pc.getTouchable()){
                pc.getDiv().innerHTML = '';
                p.areaGrid[line][pc.getX()] = '';
            }
        });
    }

    createGrid(){
        let grid=[];
        for(let i=0;i<this.gridHeight;i++){
            grid[i] = []
            for(let j=0;j<this.gridWidth;j++){
                grid[i].push('');
            }
        }
        return grid;
    }

    retrieveWords(){
        return super.getResources()['words'];
    }
}