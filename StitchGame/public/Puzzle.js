class Puzzle extends GameObject{

    constructor(id,height,width){
        super([`puzzles_${id}`]);
        this.setWidth(width);
        this.setHeight(height);
        this.areaGrid=this.createGrid();
        this.pieceinventory=[];
        this.setPuzzle(this.retrievePuzzle());
        this.currentCords = [];
        this.intialCords = []
        this.offsets = [0,0];
    }

    create(container){
        let item = this;
        this.div = container;
        this.div.addEventListener('touchstart',function(e){return item.dragStart(e)},false);
        this.div.addEventListener('touchend',function(e){return item.dragEnd(e)},false);
        this.div.addEventListener('touchstart',function(e){return item.drag(e)},false);

        this.div.addEventListener('mousedown',function(e){return item.dragStart(e)},false)
        this.div.addEventListener('mouseup',function(e){return item.dragEnd(e)},false)
        this.div.addEventListener('mousemove',function(e){return item.drag(e)},false)
   }

   dragStart(e){
           if(e.type === "touchstart"){
               this.intialCords[0] = e.touches[0].clientX - this.offsets[0];
               this.intialCords[1] = e.touches[0].clientY - this.offsets[1];
           }else{
               this.intialCords[0] = e.clientX - this.offsets[0];
               this.intialCords[1] = e.clientY - this.offsets[1];
           }
   }

   dragEnd(e){
       let itemBounds = this.div.getBoundingClientRect();
       let inventoryBounds = this.inventoryBounds;
       if((itemBounds.top+itemBounds.width)>=inventoryBounds.top){
           $(`#${this.div.getAttribute('id')}`).detach().appendTo('#inventory');
       }else{
           this.currentCords = [0,0];
           this.intialCords = [0,0];
           this.offsets = [0,0];
           this.translate(this.currentCords,this.div)
       }
   }

   drag(e){
           e.preventDefault();

           if(e.type==="touchmove"){
               this.currentCords[0] = e.touches[0].clientX - this.intialCords[0];
               this.currentCords[1] = e.touches[0].clientY - this.intialCords[1];
           }else{
               this.currentCords[0] = e.clientX - this.intialCords[0];
               this.currentCords[1] = e.clientY - this.intialCords[1];
           }

           this.offsets = this.currentCords;
           this.translate(this.currentCords,this.div);
   }

   translate(cords,item){
       item.style.transform = `translate3d(${cords[0]}px,${cords[1]}px,0)`
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

    addPiece(piece,i,j){
        this.areaGrid[i][j] = piece;
    }
    removePiece(i,j){
        this.areaGrid[i][j] = null;
    }

    createGrid(){
        let grid=[];
        for(let i=0;i<this.gridHeight;i++){
            grid[i] = []
            for(let j=0;j<this.gridHeight;j++){
                grid[i].push(null);
            }
        }
        return grid;
    }
 
    createInventory(){
        //use image to create div with image and number rep
    }
 

    testPuzzle(){
        let count=0;
        for(let i=0;i<this.gridHeight;i++){
            for(let j=0;j<this.gridHeight;j++){
                if(gridArea[i][j]==count){
                    count++;
                }else{
                    return false;
                }
            }
        }
        return true;
    }

    getPuzzle(){
        return this.puzzle;
    }

    setPuzzle(puzzle){
        this.puzzle = puzzle;
    }

    retrievePuzzle(){
        return super.getResources()['puzzles'];
    }

}