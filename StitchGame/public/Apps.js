class App {   
    constructor(phone,name,appImageLoc="",neededResources=[]){
         super([`words_${id}`]);
         this.phone = phone;
         this.setAppImageLoc(appImageLoc)
         this.setName(name)
        
    }

    getName(){
        return this.name;
    }

    setAppImageLoc(appImageLoc){
        this.appImageLoc = appImageLoc;
    }

    getAppImageLoc(){
        return this.appImageLoc;
    }

    getAppImage(){
        return super.getResources()['appImage'];
    }

    setName(name){
        this.name = name;;
    }

    getPhone(){
        return this.phone;
    }

    pushNotification(notification){
        this.phone.popUp(notification)
    }
 
 }

 
 class MessageApp extends App{

    constructor(phone,id){
         super(phone,"messages",`messages${id}`,
               [`messages_${id}`]);
         this.setMessages(this.retrieveMessages());
         this.imageLoc = this.getAppImage();
     }

    create(){

    }
    openMessages(){

    }
    openMessage(id){

    }
     setMessages(messages){
         this.messages = messages;
     }
     getMessages(){
         return this.messages;
     }
     getMessage(reciepent){
        return this.messages[reciepent];
    }

     addMessage(message,recpient,direction='fr'){
         if(this.messages[recpient]){
            this.messages[recpient]['npcText'].push({message:`${direction}/${message}`,date:new Date().toLocaleString()})
            //add message to screen
            if(this.messages[recpient]['reply']!={}){
                let msg = this.messages[recpient]['reply'][message]
                let defMsg = this.messages[recpient]['reply']['default'];
                if(msg.includes('action$')){
                    //do action from library
                }else if(msg){
                    this.messages[recpient]['npcText'].push({message:`to/${msg}`,date:new Date().toLocaleString()})
                //add message to screen
                }else if(defMsg){
                    this.messages[recpient]['npcText'].push({message:`to/${defMsg}`,date:new Date().toLocaleString()})
                //add message to screen
                }

            }
        }
     }

     retrieveMessages(){
         return super.getResources()['messages'];
     }

 }
 class PhoneApp extends App{
    constructor(phone,id){
        super(phone,"phone",`phone${id}`,
              [`contacts_${id}`]);
        this.setContacts(this.retrieveContacts());
        this.imageLoc = this.getAppImage();
    }
        
    create(){

    }
    openContacts(){

    }
    openKeyPad(id){

    } 

    callContact(number){
        let reciepent = this.contacts[number];
        let defReciepent = this.contacts[0];
        if(reciepent && reciepent['reply']!=''){
            this.simulateCall(reciepent['reply']);
        }else{
            this.simulateCall(defReciepent['reply']);
        }
    }

    simulateCall(message){
        // simulate call using message
    }

    setContacts(contacts){
        this.contacts = contacts;
    }

    getContacts(){
        return this.contacts;
    }
    getContact(number){
        return this.contacts[number];
    }

    retrieveContacts(){
        return super.getResources()['contacts'];
    }
}
class EmailApp extends App{
    constructor(phone,id){
        super(phone,"email",`email${id}`,
              [`email_${id}`]);
        this.setEmails(this.retrieveEmails());
        this.imageLoc = this.getAppImage();
    }
    create(){

    }
    openMails(){

    }
    openMail(id){

    }
    setEmails(emails){
        this.emails = emails;
    }
    getEmails(){
        return this.emails;
    }
    getEmail(email){
        return this.emails[email];
    }
    retrieveEmails(){
        return super.getResources()['emails'];
    }

}
class PhotosApp extends App{
    constructor(phone,id){
        super(phone,"photos",`photos${id}`,
              [`photos_${id}`]);
        this.setPhotos(this.retrievePhotos());
        this.imageLoc = this.getAppImage();
    }

    create(){

    }
    openPhotos(){

    }
    openPhoto(id){

    }
    setPhotos(Photos){
        this.photos = Photos;
    }
    getPhotos(){
        return this.photos;
    }
    getPhoto(id){
        return this.photos[id];
    }
    retrievePhotos(){
        return super.getResources()['photos'];
    }
}
class EnigmaApp extends App{
    charMap = {
        "a": "q","b": "w","c": "e","d": "r","e": "t","f": "y","g": "u","h": "i","i": "o","j": "p",
        "k": "a","l": "s","m": "d","n": "f","o": "g","p": "h","q": "j","r": "k","s": "l",
        "t": "z","u": "x","v": "c","w": "v","x": "b","y": "n","z": "m"
    }
    constructor(phone,id){
        super(phone,"enigma",`enigma${id}`,
        []);
        this.rotators = [];
        this.sequence = ''
    }

    create(){

    }

    encrypt(letter,r1=this.rotators[0],r2=this.rotators[1],r3=this.rotators[2]){
        if(letter<='h'){
            if(r1>0){
                this.encrypt(letter,r1-1,r2,r3);
            }else{
                return letter;
            } 
        }else if(letter>='h' && letter <='q'){
            if(r2>0){
                this.encrypt(letter,r1,r2-1,r3);
            }else{
                return letter;
            } 
        }else{
            if(r3>0){
                this.encrypt(letter,r1,r2,r3-1);
            }else{
                return letter;
            } 
        }
    }

    getSequence(){
        return this.sequence;
    }

    setSequence(sequence){
        this.sequence=sequence;
    }

    clearSequence(){
        this.sequence='';
    }

    setRotators(num,rotNum){
        this.rotators[num] = rotNum;
    }

    getRotator(num){
        return this.rotators[num];
    }
}
class NotesApp extends App{
    constructor(phone,id){
        super(phone,"notes",`notes${id}`,
              [`notes_${id}`]);
        this.setNotes(this.retrieveNotes());
        this.imageLoc = this.getAppImage();
    }

    create(){
      //create app
    }

    openLockScreen(){
        //open lock screen
    }

    openNotes(){
        //open notes
    }

    openNote(id){
        //open note
    }

    setNotes(notes){
        this.notes = notes;
    }
    getNotes(){
        return this.notes;
    }
    getNote(id){
        return this.notes[id];
    }
    retrieveNotes(){
        return super.getResources()['notes'];
    }
}
class PuzzleScrApp extends App{

    gridWidth = 5;
    gridHeight = 5;

    constructor(id){
        super(phone,"notes",`notes${id}`,
            [`notes_${id}`]);
        this.areaGrid=this.createGrid();
        this.pieceinventory=[];
        this.setPuzzleScr(this.retrievePuzzleScr());
        this.imageLoc = this.getAppImage();
    }

    create(){

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

    addPiece(piece,i,j){
        this.areaGrid[i][j] = piece;
    }
    removePiece(i,j){
        this.areaGrid[i][j] = null;
    }
 
    testSecure(password){
        if(password==this.getPuzzleScr()['password']){
            return true;
        }
        return false;
    }

    openSafe(){
        //create safe
        this.getPuzzleScr()['files'].forEach((file)=> {
            //create file
        });
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

    getPuzzleScr(){
        return this.puzzleScr;
    }

    setPuzzleScr(puzzleScr){
        this.puzzleScr = puzzleScr;
    }

    retrievePuzzleScr(){
        return super.getResources()['puzzles'];
    }

}
class SocialApp extends App{
    constructor(phone,id){
        super(phone,"social", `social${id}`,
                [`social_${id}`]);

        this.retrieveSocial();
        this.setNotifications(this.retrieveNotifications());
        this.setSettings(this.retrieveSettings());
        this.setMessages(this.retrieveMessages());
        this.setProfiles(this.retrieveProfiles());
        this.setPosts(this.retrievePosts());
        this.setPhotos(this.retrievePhotos());

        this.imageLoc = this.getAppImage();
    }

    create(){

    }
    
    openlogin(username,password){
        //OPen profile tab
    }

    openProfile(id){
        //OPen profile tab
    }

    openMessages(){
        //OPen meesage tab
    }

    openMessagesPersonal(handle){
        //Open personal message tab
    }

    openHome(){
        //Open home tab
    }

    openAccount(id){
        //OPen account tab
    }

    setMessages(messages){
        this.messages = messages;
    }

    getMessages(){
        return this.messages;
    }
    getMessage(reciepent){
       return this.messages[reciepent];
    }

    // addMessage(message,recpient,direction='fr'){
    //     if(this.messages[recpient]){
    //        this.messages[recpient]['npcText'].push({message:`${direction}/${message}`,date:new Date().toLocaleString()})
    //        //add message to screen
    //        if(this.messages[recpient]['reply']!={}){
    //            let msg = this.messages[recpient]['reply'][message]
    //            let defMsg = this.messages[recpient]['reply']['default'];
    //            if(msg.includes('action$')){
    //                //do action from library
    //            }else if(msg){
    //                this.messages[recpient]['npcText'].push({message:`to/${msg}`,date:new Date().toLocaleString()})
    //            //add message to screen
    //            }else if(defMsg){
    //                this.messages[recpient]['npcText'].push({message:`to/${defMsg}`,date:new Date().toLocaleString()})
    //            //add message to screen
    //            }

    //        }
    //    }
    // }

    getPosts(){
        return this.posts;
    }
    setPosts(posts){
        this.posts = posts;
    }

    getPost(id){
       return this.posts[id];
    }

    getPhotos(){
        return this.photos;
    }

    getPhoto(id){
       return this.photos[id];
    }

    setPhotos(photos){
        this.photos=photos;
     }

    getSettings(){
        return this.settings;
    }

    setSettings(settings){
       this.settings = settings;
    }

    getNotifications(){
        return this.notifications;
    }

    setNotifications(notifications){
       this.notification = notifications;
    }

    getProfiles(){
        return this.profiles;
    }

    setProfiles(profiles){
       this.profiles = profiles;
    }

    getProfile(id){
        return this.profiles[id];
     }

    retrieveSocial(){
        this.social = super.getResources()['social'];
    }
    retrieveMessages(){
        return this.social['messages'];
    }

    retrievePosts(){
        return this.social['posts'];
    }
    retrievePhotos(){
        return this.social['photos'];
    }

    retrieveSettings(){
        return this.social['settings'];
    }

    retrieveProfiles(){
        return this.social['profiles'];
    }


    retrieveNotifications(){
        return this.social['notifications'];
    }
}