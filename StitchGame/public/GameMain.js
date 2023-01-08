class Games{
    static games  = {
        "vialControl":VialControl,
        "lock":Lock,
        "phone":Phone
    }
}

class Point {
    div = null
    item = null
    game = null
    constructor(point,scrn) {
        this.scrn = scrn;
        this.setPoint(point);
        this.setupPoint(point);
    }

    setupPoint(point){
        if(point['type'] != 'game'){
            this.setLeft(point['point']['left']);
            this.setTop(point['point']['top']);
            this.setWidth(point['point']['width']);
            this.setHeight(point['point']['height']);
        }else{
            this.setLeft(0);
            this.setTop(0);
            this.setWidth(100);
            this.setHeight(100);
        }
        
    }

    create() {
        let id = this.scrn.getId();
        this.div  = document.createElement("div");
        this.div.setAttribute('id',this.point['name']);

        if(this.point['hidden']){
            this.div.style.display = 'none';
        }

        
        this.div.style.top = this.getTop()+'vh';
        this.div.style.left = this.getLeft()+'vw';
        this.div.style.width = this.getWidth()+'vw';
        this.div.style.height = this.getHeight()+'vh';

        if (this.point['type'] == 'game') {
            let scrnDet = {scrn:this.scrn,point:this.point};
            
            this.game = new Games.games[this.point['game']](id,scrnDet,...this.point['parameters']);
            this.game.create(this.div);
        }else {
            if(this.point['image']){
                this.div.style.backgroundImage =`url(${this.point['image']})`;
            }
            if (this.point['type'] == 'item') {
                this.item = new Item(this.scrn.getItem(this.point['name']),this.scrn);
                this.item.create(this.div);
            }else{
                this.setupClick();
            }
        }
        
        if (this.point['type'] == 'item') {
            this.div.setAttribute('class','item');
        }else{
            this.div.setAttribute('class','point');
        }
        
    }

    setupClick(item){
        let p = this;

        if(this.point['screenLink']){
            p.div.addEventListener("click", function(){
                p.openScreen(p.point['screenLink']);
            });
        }
        if(this.point['popUpLink']){
            p.div.addEventListener("click",  function(){
                p.openPopUp(p.point['popUplink']);
            });
        }

        if(this.point['hidePoints']){
            p.div.addEventListener("click", function(){
                p.hidePoints(p.point['hidePoints']);
            });
        }
        if(this.point['showPoints']){
            p.div.addEventListener("click", function(){
                p.revealPoints(p.point['showPoints']);
            });
        }

        if(this.point['moveScreen']){
            p.div.addEventListener("click", function(){
                p.moveScreen(p.point['moveScreen']);
                if(p.point['saveScreen']){
                    p.saveScreenDetail();
                }
            });
        }
    }

    getDiv(){
        return this.div;
    }

    getTop() {
        return this.top;
    }
    getLeft() {
        return this.left;
    }
    setTop(top) {
        this.top = top;
    }
    setLeft(left) {
        this.left = left;
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }

    saveScreenDetail(){
        this.scrn.saveScreenDetail();
    }

    openScreen(scrn) {
        this.scrn.openScreen(scrn);
    }

    openPopUp(popUpId) {
        this.scrn.openPopUp(popUpId);
    }

    hidePoints(points){
        this.scrn.hidePoints(points);
    }

    revealPoints(points){
        this.scrn.revealPoints(points);
    }

    moveScreen(dir){
        this.scrn.moveScreen(dir);
    }

    addInventory(item){
        this.scrn.addInventory(item);
    }

    setPoint(point) {
        this.point = point;
    }

}

class PopUp{

    constructor(image=null,messages=[]){
        this.popUpDiv = $('#popUp');
        this.popUpMessage = $('#popUpMessage');
        this.popUpImage= $('#popUpImage');
        this.popUpCount=0;

        let p = this;

        this.setImage(image);
        this.messages = messages;

        this.popUpDiv.unbind();

        p.popUpDiv.fadeOut();

        if(messages.length != 0){
            this.setMessage(this.popUpCount)
            this.popUpDiv.click(function(){
                return p.nextPopUp();
             });
     
             this.timeOutId = setTimeout(()=>{
                 p.popUpDiv.fadeIn();
             }, 2000);
        }
    }
    

    setImage(image){
        if(image!=null){
            this.popUpImage.attr('src',image);
        }
        
    }

    setMessage(m){
        this.popUpMessage.text(this.messages[m]+" >>");
        this.popUpCount+=1;
    }

    nextPopUp(){
        if(this.popUpCount<this.messages.length){
            this.setMessage(this.popUpCount);
        }else{
            this.popUpDiv.toggle('slide');
        }
    }

    getTimeoutId(){
        return this.timeOutId;
    }
}

class Screen {

    pointDivs = []
    details = {}

    constructor(scrn, screenCtrl) {
        this.screenId = screenCtrl.getCurrentScreenId();
        this.setImage(scrn['image']);
        this.setPopUp(scrn['popUp']);
        this.screenCtrl = screenCtrl;

        this.addPoints(scrn['points']);

        if(scrn['inventory']){
            this.showInventory();
        }
        if(scrn['screenPosition']){
            $('#screen').css('background-position',scrn['screenPosition']);
        }else{
            $('#screen').css('background-position','center');
        }


        this.details['popUp']=scrn['popUp'];
        this.details['image']=scrn['image'];
        this.details['points']=scrn['points'];
        this.details['screenPosition']=scrn['screenPosition']?scrn['screenPosition']:'center';
        this.details['inventory']=scrn['inventory'];
        
    }

    create() {
        if(this.image){
            this.screenCtrl.getScreenDiv().css('background-image',`url(${this.image})`);
        }
        if(this.popUp['default'] && this.popUp['default']!={}){
            this.screenPopUp = new PopUp(this.popUp['default']['image'],this.popUp['default']['messages']);
        }else{
            this.screenPopUp = new PopUp();

        }
        
    }

    getScreenPopUp(){
        return this.screenPopUp;
    }

    saveScreenDetail(){
        let s = this;
        $('#screen div').each((_,div)=>{
            let el = s.details['points'].filter(p=>p.name==div.getAttribute('id'))[0];
            if(el){
                el.hidden = div.style.display!='none'?false:true;
            }
        });
        this.details['screenPosition']=document.getElementById('screen').style.backgroundPosition;
        this.screenCtrl.saveScreen();
    }

    getDetails(){
        return this.details;
    }

    revealPoints(points){
        let s = this;
        points.forEach((p)=>{
            let pointDiv = s.pointDivs.filter(pt=>pt.getAttribute('id')==p)[0];
            if(pointDiv){
                pointDiv.style.display = 'block';
            }
            
        });
    }

    hidePoints(points){
        let s = this;
        points.forEach((p)=>{
            let pointDiv = s.pointDivs.filter(pt=>pt.getAttribute('id')==p)[0];
            if(pointDiv){
                pointDiv.style.display = 'none';
            }
        });
    }

    moveScreen(dir){
        this.screenCtrl.moveScreen(dir);
    }
    addInventory(item){
        this.screenCtrl.addInventory(item);
    }

    addPoints(points) {
        let s = this;
        points.forEach((p) => {
            let point = new Point(p,this);
            point.create();
            s.screenCtrl.getScreenDiv().append(point.getDiv());
            s.pointDivs.push(point.getDiv());
        });
    }

    removePoint(point) {
        point.remove();
    }

    getItem(name){
        return this.screenCtrl.getItem(name);
    }

    getInvBounds(){
        return this.screenCtrl.getInvBounds();
    }

    setPopUp(popUp){
        this.popUp = popUp;
    }

    setImage(image) {
        this.image = image;
    }

    openScreen(scrn){
        this.screenCtrl.changeScreen(scrn);
    }

    openPopUp(id){
        this.screenPopUp = new PopUp(this.popUp[id]['image'],this.popUp[id]['messages']);
    }

    showInventory(){
        return this.screenCtrl.showInventory();
    }

    getId(){
        return this.screenCtrl.id;
    }

    getScreenId(){
        return this.screenId;
    }

    removeDetails(detail,item){
        this.details[detail] = this.details[detail].filter(d=> !(d.name==item));
        this.screenCtrl.saveScreen();
    }

    addDetails(detail,item){
        this.details[detail].push(item);
    }
}


class ScreenControl extends GameObject {


    constructor(id,screenId,inventory=[],savedData={}) {
        super([`screens_${id}`, `items_${id}`]);
        this.id = parseInt(id);

        this.screenDiv = $('#screen');
        this.inventoryDiv = $('#inventory');
        this.savedData = savedData;

        this.setCurrentScreenId(screenId);
        this.setScreens(this.retrieveScreens());
        this.setItems(this.retrieveItems());
        
        this.inventory = new Inventory(id,this);
        this.inventory.create();

        if(inventory){
            this.addInventory(JSON.parse(inventory))
        }
        
    }

    showInventory(){
        this.inventoryDiv.fadeIn();
    }

    moveScreen(dir){
        this.screenDiv.css('background-position',dir);
    }

    setScreens(screens) {
        this.screens = screens;
    }

    setItems(items) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    getItem(name) {
        return this.items[name];
    }

    getScreenDiv(){
        return this.screenDiv;
    }

    setCurrentScreenId(s) {
        this.currentScreenId = s;
    }

    getCurrentScreenId() {
        return this.currentScreenId;
    }

    getCurrentScreen() {
        return this.currentScreen;
    }

    getInvBounds(){
        return {
            top:parseInt(this.inventoryDiv.css('top').slice(0,-2)),
            left:parseInt(this.inventoryDiv.css('left').slice(0,-2)),
            width:parseInt(this.inventoryDiv.css('width').slice(0,-2)),
            height:parseInt(this.inventoryDiv.css('height').slice(0,-2))
        }
    }

    changeScreen(scrn){
        this.screenDiv.fadeOut(300);
        this.inventoryDiv.fadeOut();
        clearInterval(this.getCurrentScreen().getScreenPopUp().getTimeoutId());
        this.setCurrentScreenId(scrn);
        this.createScreen();
        this.screenDiv.fadeIn(300);
        
    }

    createScreen() {
        this.screenDiv.html('');
        
        if(!this.savedData){
            console.log('Create new screen')
            this.currentScreen = new Screen(this.screens['screens'][this.getCurrentScreenId()],this);
        }else{
            let savedData = null;
            if(this.savedData){
                savedData = JSON.parse(this.savedData)
            }

            if(this.testPath(savedData,'screens',this.getLevel(),this.getCurrentScreenId())){
                let scrn = savedData['screens'][this.getLevel()][this.getCurrentScreenId()];
                this.currentScreen = new Screen(scrn,this);
                console.log('Screen recovered')
            }else{
                console.log('Screen not found,creating new screen')
                this.currentScreen = new Screen(this.screens['screens'][this.getCurrentScreenId()],this);
            }
            
        }
        this.currentScreen.create();
        this.addInventory(this.screens['screens'][this.getCurrentScreenId()]['inventory']);
    }

    testPath(path,type,level,id){
        if(!path){
            return false;
        }
        
        if(!path[type]){
            return false;
        }
        if(!path[type][level]){
            return false;
        }
        
        if(!path[type][level][id]){
            return false;
        }
        return true;
    }

    addInventory(items=[]) {
        items.forEach((i)=>{
            this.inventory.addItem(i);
        })
    }


    getLevel(){
        return this.id;
    }

    saveScreen(){
        this.saveState('savedData',{type:'screens',screen:this.getCurrentScreen(),id:this.getCurrentScreenId(),level:this.getLevel()})
        this.saveState('screenId',this.getCurrentScreenId());

        this.savedData = sessionStorage.getItem('savedData');
    }

    retrieveItems(){
        return super.getResources()['items'];
    }

    retrieveScreens() {
        return super.getResources()['screens'];
    }

}

$(document).ready(function () {

    let level = (sessionStorage.getItem('level') ? sessionStorage.getItem('level') : 0);
    let screenId = (sessionStorage.getItem('screenId') ? JSON.parse(sessionStorage.getItem('screenId')): 0);
    let inventory = (sessionStorage.getItem('inventory') ? sessionStorage.getItem('inventory') : null);
    let savedData = (sessionStorage.getItem('savedData') ? sessionStorage.getItem('savedData') : null);
    let screenCtrl = new ScreenControl(level,screenId,inventory,savedData);
   
    screenCtrl.createScreen();
})
// $(document).click(function(e){
//     console.log(e.pageX + ' , ' + e.pageY);
// })