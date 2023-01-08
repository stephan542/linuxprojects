class Item {
    constructor(item,scrn=null){
        this.setName(item.name);
        this.setImage(item.image);
        this.setCombinations(item.combine);
        this.scrn = scrn;
        this.currentCords = [];
        this.intialCords = []
        this.offsets = [0,0];
        this.active = false;
    }

    create(container){
         let item = this;
         this.div = container;
         this.div.addEventListener('touchstart',function(e){return item.dragStart(e)},false);
         this.div.addEventListener('touchend',function(e){return item.dragEnd(e)},false);
         this.div.addEventListener('touchmove',function(e){return item.drag(e)},false);

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

            

            this.active = true;
    }

    dragEnd(e){

        if(this.scrn){
            let itemBounds = this.div.getBoundingClientRect();
            let inventoryBounds = this.scrn.getInvBounds();

           
            if((itemBounds.top+itemBounds.height)>=inventoryBounds.top || (this.currentCords[0]==0 && this.currentCords[0]==0)){
                this.div.setAttribute('class','inventoryItem');
                $(this.div).detach().appendTo('#inventoryContainer');
                this.scrn.removeDetails('points',this.div.getAttribute('id'));
                this.stripItemPosition(this.div);
            }  
        }
        this.currentCords = [0,0];
        this.intialCords = [0,0];
        this.offsets = [0,0];
        this.translate(this.currentCords,this.div)
        this.active = false;
    }

    drag(e){
        if(this.active){
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
    }

    stripItemPosition(div){
        div.style.removeProperty('top');
        div.style.removeProperty('left');
        div.style.removeProperty('width');
        div.style.removeProperty('height');
        div.style.removeProperty('display');
    }

    setItemPosition(div,position){
        div.style.top = position.top;
        div.style.left = position.left;
        div.style.width = position.width;
        div.style.height = position.height;
        div.style.display = "block";
    }

    translate(cords,item){
        item.style.transform = `translate3d(${cords[0]}px,${cords[1]}px,0)`
    }

    getDiv(){
        return this.div;
    }

    getName(){
        return this.name;
    }

    getImage(){
        return this.image;
    }

    setCombinations(combine){
        this.combinations=combine;
    }

    getCombinations(){
        return this.combinations;
    }

    setName(name){
        this.name = name;
    }

    setImage(){
        return this.image;
    }

    setImage(image){
        this.image = image;
    }

    testCombine(item){
        this.combinations.forEach((combine) => {
            if(combine.with == item.name){
                return combine.makes;
            }
        });

        return '';
    }
}

class Inventory extends GameObject{

    inventory = []

    constructor(id,scrnCtrol){
        super([`items_${id}`]);
        this.scrnCtrol = scrnCtrol;
        this.setItems(this.retrieveItems())
        this.inventoryDiv = $('#inventory');

    }

    create(){
        let i = this;
        this.inventoryContainer = document.createElement('div');
        
        this.inventoryContainer.setAttribute('id','inventoryContainer')
        this.inventoryDiv.append(this.inventoryContainer);

        $(this.inventoryDiv).bind("DOMSubtreeModified",function(){ 
            let inventory = [];
            let allItems = document.getElementsByClassName('inventoryItem');

            $('.inventoryItem').each((_,d)=>{
                inventory.push(d.getAttribute('id'));
            });
            this.inventory = inventory;
            i.saveState('inventory',inventory);
        });
    }
    
    setItems(items){
        this.items = items;
    }

    getItems(){
        return this.items;
    }

    getItem(name){
        return this.items[name];
    }

    setInventory(inventory){
        this.inventory = inventory
    }

    getInventory(){
        return this.inventory;
    }

    combine(item1,item2){
        let makes = item1.testCombine(items2);
        let item3 = this.getItem[makes];
        if(makes!=''){
            this.removeItem(item1);
            this.removeItem(item2);
            this.addItem(new Item(items3));
        }
    }


    addItem(item,div=null){
        let newItem = new Item(this.scrnCtrol.getItem(item));

        if(div){
            newItem.create(div);
            this.inventoryContainer.appendChild(div);
        }else{
            let d  = document.createElement("div");
            d.setAttribute('id',item);
            d.setAttribute('class','inventoryItem');
            d.style.backgroundImage =`url(${newItem.getImage()})`;
            newItem.create(d);
            this.inventoryContainer.appendChild(d);
        }

        this.inventory.push(newItem.getName());
    }
    

    removeItem(item){
        let newInventory = []
        this.inventory.forEach((i)=>{
            if(i.getName()!=item.getName()){
                newInventory.push(i);
            }
        })
        this.setInventory(newInventory);
    }

    retrieveItems(){
        return super.getResources()['items'];
    }
}