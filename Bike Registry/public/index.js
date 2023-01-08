const firebaseConfig = {
  //get api key from firebase
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
let user = JSON.parse(sessionStorage.getItem('user'));
let bikes = JSON.parse(sessionStorage.getItem('bikes'));
let requestedBikes = JSON.parse(sessionStorage.getItem('requests'));

$(document).ready(() => {

  $('.nav-item').click((e) => {
    $('.nav-item .active2').removeClass('active2');
    $(e.target).addClass('active2')
  })

  $('form').submit((e)=>{
    e.preventDefault();
  });

  $('#cnfph').change((e) => {
    if (e.target.checked) {
      $('#ownerimg').show();
    } else {
      $('#ownerimg').hide();
    }
  });

  $('#bikeimg input').change((e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      $('#bikeimg img').attr('src', reader.result);
      $(e.target).css('position','');
    }
    reader.readAsDataURL(files[0]);
  });

  $('#ownerimg input').change((e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      $('#ownerimg img').attr('src', reader.result);
      $(e.target).css('position','');
    }
    reader.readAsDataURL(files[0]);
  });

  if (user) {
    openMenu();
  } else {
    openLogin();
  }

})

function logout() {
  sessionStorage.removeItem('user');
  openLogin();
}

function login() {
  let username = $('#username').val();
  let password = $('#password').val();

  authenticate(username, password).then(
    (user) => {
      sessionStorage.setItem('user', JSON.stringify({ username: user.username, permissions: user.permissions }))
      database.ref('bikeregistry/bikes').once('value', (snap) => {
        bikes = snap.val();
        sessionStorage.setItem('bikes',JSON.stringify(bikes));
      });
      database.ref('bikeregistry/requests').once('value', (snap) => {
        requestedBikes = snap.val();
        sessionStorage.setItem('requests',JSON.stringify(requestedBikes));
      });
      openMenu();

    }
    , (error) => {
      if (error == "WRNG_PSWD") {
        console.log('Incorrect password')
      } else if (error == "WRNG_USRNM") {
        console.log('Incorrect username')
      } else {
        console.log('Something when wrong')
      }
    }
  )
}

function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    database.ref('bikeregistry/users').once('value', (snap) => {
      snap.val().forEach((user) => {
        if (user.username == username) {
          if (user.password == password) {
            resolve(user);
          } else {
            reject('WRNG_PSWD')
          }
        }
      });
      reject("WRNG_USRNM");
    });
  });
}

function changeScreen() {
  $('#nav').show();
  $('nav').show();
  $('.activeScreen').hide();
  $('.activeScreen').addClass('screen')
  $('.activeScreen').removeClass('activeScreen')
}

function openRegister() {
  changeScreen();
  $('#nav').hide();
  $('nav').hide();
  $('#register').fadeIn(1000);
  $('#register').addClass('activeScreen');
}
function openLogin() {
  changeScreen();
  $('#nav').hide();
  $('nav').hide();
  $('#login').fadeIn(1000)
  $('#login').addClass('activeScreen')
}

function openMenu() {
  changeScreen();
  user = JSON.parse(sessionStorage.getItem('user'));
  bikes = JSON.parse(sessionStorage.getItem('bikes'));
  if (user.permissions.includes('WRITE')) {
    $('#bkreqlbl').show();
  }
  $('#currentUser').html(user.username)
  $('#searchBike').fadeIn(1000)
  $('#searchBike').addClass('activeScreen')
}

function openRegistry() {
  changeScreen();
  $('#bikeRegister').fadeIn(1000)
  $('#bikeRegister').addClass('activeScreen')
}

function openSearch() {
  changeScreen();
  $('#searchBike').fadeIn(1000)
  $('#searchBike').addClass('activeScreen')
}

function openRequest() {
  changeScreen();
  $('#requestBike').fadeIn(1000)
  $('#requestBike').addClass('activeScreen')
  
  for(let bike in bikes){
    let bke = bikes[bike];
    if(bke.ownerName.length<=0){
      $('#availBikes').append(`
      <div class="card" style="width: 100%;" onclick="openProfile('${bike}')">
        <img src="${bke.photo}" class="card-img-left" alt="...">
        <div class="card-body">
          <p class="card-text">
               <b>Owner </b>: ${bke.ownerName}<br>
               <b>Bike Color </b>: ${bke.bikeColor}<br>
               <b>Bike Type </b>: ${bke.bikeType}<br>
               <b>Bike Description </b>: ${bke.bikeDesc}
          </p>
        </div>
    </div>
      `);
    }
  }
}

function openRequests() {
  changeScreen();

  requestedBikes = JSON.parse(sessionStorage.getItem('requests'));
  $('#bikeRequests').fadeIn(1000)
  $('#bikeRequests').addClass('activeScreen');

  $('#bkeReqt').html('');

  for(let r in requestedBikes){
    $('#bkeReqt').html(`
    <div class="card" style="width: 100%;>
      <div class="card-body">
        <p class="card-text">
            <b>Name of Borrower </b>: ${requestedBikes[r].reqName}<br>
            <b>Description </b>: ${requestedBikes[r]  .desc}<br>
        </p>
      </div>
    </div>
    `)
  }
}

function openProfile(bikeId) {
  changeScreen();
  $('#profile').fadeIn(1000)
  $('#profile').addClass('activeScreen')
  $('#profile .img1').attr('src', bikes[bikeId].photo);
  $('#bikeId').attr('value',bikeId)
  $('#bkclr').html(bikes[bikeId].bikeColor);
  $('#bktyp').html(bikes[bikeId].bikeType);
  $('#bkdes').html(bikes[bikeId].bikeDesc);
  $('#ownrnm').html(bikes[bikeId].ownerName);
  $('#dspt').html(bikes[bikeId].deposit);
  //add prifile info
}

function register() {
  // not to be implemented yet
}

function searchBike(bikeInput) {
  $('#searchResult').html('');
  if(bikeInput.value.length>0){
    for(let bike in bikes){
      let searchStr = bikes[bike].bikeColor+' '+bikes[bike].bikeType+' '+bikes[bike].ownerName;
      if(searchStr.toLowerCase().includes(bikeInput.value.toLowerCase())){
        let bke = bikes[bike];
        $('#searchResult').append(`
        <div class="card" style="width: 100%;" onclick="openProfile('${bike}')">
          <img src="${bke.photo}" class="card-img-left" alt="...">
          <div class="card-body">
            <p class="card-text">
                 <b>Owner </b>: ${bke.ownerName}<br>
                 <b>Bike Color </b>: ${bke.bikeColor}<br>
                 <b>Bike Type </b>: ${bke.bikeType}<br>
                 <b>Bike Description </b>: ${bke.bikeDesc}
            </p>
          </div>
      </div>
        `);
      }
    }
}
}

function edit(e,field,name){
  $(e).hide();
  $(`#${field}`).html(`
  <div class="input-group mb-3">
    <input type="text" id="newInfo" class="form-control" aria-describedby="bas2" >
    <span class="input-group-text" id="bas2"><li class="bi bi-save" onclick="updateInfo('${name}','${field}','${$(e).attr('id')}')" style="list-style: none;"></li></span>
  </div>  
  `)
} 


function updateInfo(name,field,e) {
  let newInfo = {};
  let id = $('#bikeId').attr('value');
  newInfo[`${name}`] = $('#newInfo').val();
  database.ref('bikeregistry/bikes/'+ id).update(newInfo)
  bikes[id][`${name}`] =  $('#newInfo').val();
  sessionStorage.setItem('bikes',JSON.stringify(bikes));
  $(`#${e}`).show();
  $(`#${field}`).html($('#newInfo').val());
}

function requestBike(form) {
  let data = new FormData(form);
  let id  =  uuid.v4();
  let reqt = {
    reqName:data.get('name'),
    desc:data.get('desc')
  };

  database.ref('bikeregistry/requests/'+ id ).set(reqt);
  sessionStorage.setItem('requests',JSON.stringify(reqt));
  form.reset();
}

function registerBike(data) {
  let info = new FormData(data);
  let id = uuid.v4();
  let bikephoto = $('#bikeimg input').prop('files')[0];

  
  if (bikephoto) {
    let uploadTask = firebase.storage().ref('bikes/' + uuid.v4() + '.png').put(bikephoto);

    uploadTask.on('state_changed', (snapshot) => { 
      $('#bikeRegister').slideUp();
      $('#loadingScreen').slideDown();
      console.log('1')
    }, (error) => {
      console.log(error)},
      () => {

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
          
          let bikeData = {
            bikeColor: info.get('bikeColor'),
            bikeType: info.get('bikeType'),
            bikeDesc: info.get('bikeDesc'),
            ownerName: info.get('ownerName'),
            problems: info.get('problems'),
            deposit: info.get('deposit'),
            photo:url
          };
   
          database.ref('bikeregistry/bikes/'+ id).set(bikeData)
          data.reset();
          $('#bikeRegister').slideDown();
          $('#loadingScreen').slideUp();
          $('#bikeimg img').attr('src','images/bike.jpg');
          $('#ownerimg img').attr('src','images/bike.jpg');
          bikes[id] = bikeData;
          sessionStorage.setItem('bikes',JSON.stringify(bikes));
        })
        console.log('uploaded')
        $('#registerbikebtn').html('Register Bike')
    }
    );
  }
}


