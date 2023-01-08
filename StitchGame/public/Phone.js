class Phone extends GameObject{

    allApps = {"messages":MessageApp,
               "phone":PhoneApp,
               "email":EmailApp,
               "photos":PhotosApp,
               "enigma":EnigmaApp,
               "notes":NotesApp,
               "puzzleScr":PuzzleScrApp,
               "social":SocialApp};
    apps = [];

    constructor(id,scrn={point:{},scrn:null},appNames){ 
        super([`phone_${id}`])
        this.id = id;
        this.scrn = scrn;
        this.initializeApps(appNames);
        this.setPhoneSettings(this.retrievePhone());
        this.setPhoneApps(this.retrievePhone()['apps'])
        
    }

    create(container){
        let p = this;

        let phoneScreen = document.createElement('div');
        phoneScreen.setAttribute('class','appScreen');

       let statusBar = document.createElement('div');
       statusBar.setAttribute('id','statusBar');
       statusBar.innerHTML = this.createStatusBar();

       let ctrlBar = document.createElement('div');
       ctrlBar.setAttribute('id','ctrlBar');
       ctrlBar.innerHTML = this.createCtrlBar();

       if(this.phoneSettings['lockScreen'].locked){
            let lockScreen = document.createElement('div');
            lockScreen.setAttribute('id','lockScreen');
            lockScreen.setAttribute('class','appScreen');
            lockScreen.innerHTML = this.createLockScreen();
            phoneScreen.appendChild(lockScreen);

            
            phoneScreen.addEventListener('click',function (){
                p.openLockScreen();
            });
       }else{
           this.openHome(phoneScreen);
           
       }
       
       container.appendChild(phoneScreen);
       container.appendChild(statusBar);
    }

    setPhoneSettings(phone){
        this.phoneSettings = phone['settings'];
    }

    openHome(){
        //openHome
    }
    
    initializeApps(appNames){
        this.apps = [];
        appNames.forEach((appName)=>{
            if(this.allApps[appName]){
                let appDetails = this.phoneApps[appName];
                this.apps.push(new this.allApps[appName](this,this.id,appDetails))
            }
        });
    }

    openLockScreen(){
        $('#lockScreen').slideDown();
    }

    popUp(message){
        //create popUp
    }

    addApp(appName){
        if(app[appName]){
            this.apps.push(new apps[appName](this,this.id))
        }
    }

    getApps(){
        return this.phoneApps;
    }

    setPhoneApps(apps){
        return this.phoneApps = apps;
    }

    getId(){
        return this.id;
    }

    retrievePhone(){
        return super.getResources()['phone'];
    }

    createStatusBar(){
        let date = new Date();
        return `
            <div id='time' style="float:left;font-size: 70.5%;margin:1%">${date.getHours()%12>9?'':'0'}${date.getHours()%12}:${date.getMinutes()>9?'':'0'}${date.getMinutes()}</div>
            <span id="phoneStatus" style="float:right">
            <image src="images/network_bars.png" id="networkBars" class="bars" style="float:left;width: 6vw;height: 54%;margin: 1vh"/>
            <image src="images/wifi_bars.png" id="wifiBars" class="bars" style="float:left;width: 6vw;height: 54%;margin: 1vh"/>
            <div id="batteryPercent" style="margin: 1vh;
                    float:left;height: 54%;width: 8vw;background: url('images/battery.png');
                    background-size: 100% 100%;background-repeat: no-repeat;">
                <div id="battery" style="float:left;margin-top: 3.5%;margin-left: 3.7%;width: ${this.phoneSettings['percent']>19?this.phoneSettings['percent']-19:0}%;height: 83%;background-color: white;"></div>
            </div>
        `
    }

    createCtrlBar(){
        return `
          <div style="width:90%;height:95%;padding-left:5%">
            <button id="backbtn" style="float:left"><</button>
            <button id="homebtn" style="float:center">o</button>
            <button id="recentbtn" style="float:right">[]</button>
          </div>
        `
    }

    createLockScreen(){
        return `
          <div style="width: 100%;height: 100%;text-align: center;justify-content: center;align-items: center;display: flex;color:white;flex-direction:column">
            <h1>Enter Passcode</h1>
            <div>
            <div></div><div></div><div></div><div></div>
            </div>
            <div class="keypad" style="display:grid;grid-template-columns:auto auto auto">
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">1</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">2</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">3</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">4</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">5</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">6</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">7</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">8</div>
                <div style="padding: 7vw;margin: 3vw;border: solid white 0.6vw;border-radius: 49%;">9</div>

            </div>
          </div>
        `
    }
}