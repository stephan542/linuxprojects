class GameObject{
    
      constructor(neededResources){
        this.resources = this.retrieveResources(neededResources);
      }

      getResources(){
        return this.resources;
      }

      retrieveResources(resources){
        let requestResources = {};
        //retrieve sources from firebase and download to local starge if not available
        let data = {appImage:{messages1:"/messageCover.jpg"},
                    puzzles:{
                        0:{secure:true,
                          image:'Image in base 64',
                          password:'password',
                          files:[{appImage:'image in base 64',type:'image',content:'image in base 64'}]
                          },
                        1:{secure:false,
                           image:'Image in base 64',
                           password:'',
                           files:[]
                          }
                    },
                    phone:{
                      0:{
                        settings:{
                          lockScreen:{locked:true,password:"",hint:""},
                          wifi:true,
                          percent:100,
                          network:true,
                        },
                        apps:{
                          messages:{
                            message:{
                              'paul':{npcText:[{message:'to/Hello',date:'1/1/22T01:11'},{message:'fr/whats up',date:'1/1/22T01:12'}],reply:{'hello':'hey man','default':'huh'}},
                              'tom':{npcText:[{message:'to/dont text me',date:'1/1/22T01:11'}],reply:{'hello':'hey man'}}
                            }},
                          photos:{photos:['images/phone.png']},
                          contacts:{0:{11111111:{name:'paul',reply:''},22222222:{name:'tom',reply:'who is this'},0:{name:'Flow',reply:'no plan'}},
                             1:{333333333:{name:'micheal',reply:''},0:{name:"Flow",reply:'number is unavaliable'}}
                            },
                          notes:{
                            0:{setting:{lockScreen:true},
                              1:'note info 1',
                              2:'note info 2',
                              3:'note info 3'}
                          }
                        }
                      }
                    },
                      vials:{
                        0:{colors:[['blue','blue','red','green'],['red','red','blue','green'],['green','blue','red','green'],['','','',''],['','','','']],blocked:false}
                      },
                      items:{
                        0:{
                          'drill':{name:'drill',image:'images/testtubes.png',combine:[{with:'battery',makes:'powerdrill'}]},
                          'keys':{name:'wrench',image:'images/keys.png',combine:[]},
                          'wrench':{name:'wrench',image:'images/wrench.png',combine:[]},
                          'testtubes':{name:'testtubes',image:'images/testtubes.png',combine:[]}
                        }
                      },
                      words:{
                        0:[
                          {hint:'These animals roamed the earth before man',word:'dinosaur'},
                          {hint:'The evil creatures in movies. ',word:'monsters'},
                          {hint:'A person that breaks the law. ',word:'criminal'},
                          {hint:'A German physicist is best known for developing the theory of relativity. ',word:'einstein'},
                          {hint:'Not firm or fixed',word:'insecure'},
                          {hint:'A crystalline form of the element carbon;used in lead pencils. ',word:'graphite'}
                          
                        ]
                      },
                      screens:{
                        0:{screens:[
                          {
                            image:'images/jumba_lab.png',
                            popUp:{default:{image:'images/jumba_1.png',messages:['Welcome','Im jumbo','let me enter my lab']},1:{}},
                            points:[{name:'door',type:'point',hidden:false,screenLink:1/*change back to screen 1 */,image:null,point:{left:40,top:53,width:17.8,height:9}}]
                          },
                          {
                            image:'images/jumba_lab_2.png',
                            popUp:{default:{image:'images/jumba_1.png',messages:['Woah ,this is embarassing,if forgot the password','wait i know ,i wrote down hints']},1:{}},
                            points:[{name:'lock',type:'game',hidden:false,screenLink:2,game:'lock',parameters:[8,6],offset:25}]
                          },
                          {
                            image:'images/jumba_lab_3.png',
                            inventory:[],
                            screenPosition:'center',
                            popUp:{
                              default:{image:'images/jumba_1.png',messages:['Finally,now I need to finish makin my evil expirements','I need to get these mixtures ready first']},
                              1:{image:null,message:['I think that binding agent is in my phone somewhere']}},
                            points:[
                              {name:'lookleft',type:'point',hidden:false,moveScreen:'left',
                              showPoints:["lookright_c","workstation_2"],hidePoints:["workstation","lookright","lookleft"],
                              image:'images/left_arrow.png',saveScreen:true,point:{left:0,top:11,width:17.8,height:9}},
                              {name:'lookright',type:'point',hidden:false,moveScreen:'right',
                              showPoints:["lookleft_c"],hidePoints:["workstation","lookright","lookleft"],
                              image:'images/right_arrow.png',saveScreen:true,point:{left:82.2,top:11,width:17.8,height:9}},
                              {name:'lookleft_c',type:'point',hidden:true,moveScreen:'center',
                              showPoints:["workstation","lookright","lookleft"],hidePoints:["lookleft_c"],
                              image:'images/left_arrow.png',saveScreen:true,point:{left:0,top:11,width:17.8,height:9}},
                              {name:'lookright_c',type:'point',hidden:true,moveScreen:'center',
                              showPoints:["workstation","lookright","lookleft"],hidePoints:["lookright_c","workstation_2" ],
                              image:'images/right_arrow.png',saveScreen:true,point:{left:82.2,top:11,width:17.8,height:9}},
                              {name:'workstation',type:'point',hidden:false,screenLink:3,
                              image:null,point:{left:27,top:65,width:30.8,height:20}},
                              {name:'workstation_2',type:'point',hidden:true,screenLink:6,
                              image:null,point:{left:0,top:65,width:32.8,height:20}}
                            ]
                          },
                          {
                            image:'images/jumba_lab_4.png',
                            inventory:[],
                            popUp:{default:{image:'images/jumba_1.png',messages:['I may want to look at those test,or fix the machine','I can remember which button opens the hatch']},1:{}},
                            points:[
                              {name:'keys',type:'item',hidden:false,image:'images/keys.png',point:{left:18,top:52,width:14.8,height:8}},
                              {name:'lookleft',type:'point',hidden:false,screenLink:2,image:'images/left_arrow.png',point:{left:0,top:11,width:17.8,height:9}},
                              {name:'testtube_area',type:'point',hidden:false,screenLink:4,image:null,point:{left:32,top:21,width:23.8,height:27}},
                            ]
                          },
                          {
                            image:'images/jumba_lab_5.png',
                            inventory:[],
                            popUp:{default:{image:'images/jumba_1.png',messages:['Let see,need to fix these test tubes']},1:{}},
                            points:[
                              {name:'testsort',type:'point',hidden:false,screenLink:5,image:null,point:{left:63,top:42,width:29.8,height:17}},
                              {name:'wrench',type:'item',hidden:false,image:'images/wrench.png',point:{left:63,top:65,width:36.8,height:8}},
                              {name:'lookleft',type:'point',hidden:false,screenLink:3,image:'images/left_arrow.png',point:{left:0,top:11,width:17.8,height:9}},
                              {name:'home',type:'point',hidden:false,screenLink:2,image:'images/home_arrow.png',point:{left:82.2,top:11,width:17.8,height:9}},
                            ]
                          },
                          {
                            image:'images/testtube_background.jpg',
                            popUp:{default:{image:'images/jumba_1.png',messages:['Okay,i need to sort these']},1:{}},
                            points:[
                              {name:'vialControl',type:'game',hidden:false,screenLink:4,showPoints:['testtubes'],game:'vialControl',parameters:[],offset:25},
                              {name:'testtubes',type:'item',hidden:true,image:'images/testtubes.png',point:{top:8,left: 39,width: 20.8,height: 18}},
                              {name:'lookleft',type:'point',hidden:false,screenLink:4,image:'images/left_arrow.png',point:{left:0,top:11,width:17.8,height:9}},
                              {name:'home',type:'point',hidden:false,screenLink:2,image:'images/home_arrow.png',point:{left:82.2,top:11,width:17.8,height:9}},
                            ]
                          },
                          {
                            image:'images/jumba_lab_6.png',
                            inventory:[],
                            popUp:{default:{image:'images/jumba_1.png',messages:['Let see,need to fix these test tubes']},1:{}},
                            points:[
                              {name:'phone',type:'point',hidden:false,screenLink:7,image:'images/phone.png',point:{left:-5,top:45,width:21.8,height:11}},
                              {name:'lookright',type:'point',hidden:false,screenLink:2,image:'images/right_arrow.png',point:{left:82.2,top:11,width:17.8,height:9}},
                            ]
                          },
                          {
                            popUp:{1:{}},
                            points:[
                              {name:'phoneScreen',type:'game',hidden:false,screenLink:7,game:'phone',parameters:[['message']],offset:0},
                              {name:'exitPhone',type:'point',hidden:false,screenLink:6,image:'images/exit_arrow.png',point:{left:45,top:0,width:9.8,height:5}},
                            ]
                          }
                          ]
                        }
                      }
                    }; 

        resources.forEach((resource) => {
           let req_id = resource.split('_');
           if(data[req_id[0]]){
                requestResources[`${req_id[0]}`] = data[req_id[0]][req_id[1]];
           }
        });
        return requestResources;
      }
      
      saveState(detail,obj){
        if(detail=='savedData'){
          let savedData = sessionStorage.getItem('savedData')?JSON.parse(sessionStorage.getItem('savedData')):{};

          let savedScreen = {
               image:obj['screen'].getDetails().image,
               points:obj['screen'].getDetails().points,
               screenPosition:obj['screen'].getDetails().screenPosition,
               inventory:obj['screen'].getDetails().inventory,
               popUp:obj['screen'].getDetails().popUp,
          }

            if(!savedData[obj.type]){
              savedData[obj.type]= {} 
            }
            if(!savedData[obj.type][obj.level]){
              savedData[obj.type][obj.level] = {} 
            }
            savedData[obj.type][obj.level][obj.id] = savedScreen;

            sessionStorage.setItem('savedData',JSON.stringify(savedData))
            console.log('Data saved',detail,savedScreen)
        }else{
          console.log('Data saved',detail,obj)
          sessionStorage.setItem(detail,JSON.stringify(obj))
        }
      }
}

// social:{
//   0:
//   {messages:{'paul':{npcText:[{message:'to/Hello',date:'1/1/22T01:11'},{message:'fr/whats up',date:'1/1/22T01:12'}],reply:{'hello':'hey man','default':'huh'}},'tom':{npcText:[{message:'to/dont text me',date:'1/1/22T01:11'}],reply:{'hello':'hey man'}}},
//    photos:{1:'image in string'},
//    posts:{1:{caption:'executive order',photoId:1,profileID:1}},
//    profiles:{'hamster':{photosIds:['images in string'],bio:{bio:'its a hamster',photoId:1,followers:200,following:100,post:3}}},
//    notifications:{1:{type:'like',message:'hamster liked your photo',profile:'hamster'}},
//    settings:{apps:['home','notifications','message','account'],userId:1,password:'123',username:'hamster'}
//  }
// }