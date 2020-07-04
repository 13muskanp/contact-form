var config = {
  apiKey: "AIzaSyC_5FimxVsR-coaRR4d0N2jML8bMVblm0w",
authDomain: "cf-fb-01.firebaseapp.com",
databaseURL: "https://cf-fb-01.firebaseio.com",
projectId: "cf-fb-01",
storageBucket: "cf-fb-01.appspot.com",
messagingSenderId: "997934529700",
appId: "1:997934529700:web:77f1e069816e07b6c77a31"
};

firebase.initializeApp(config);
var dataRef = firebase.database().ref('Data');


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){
      document.getElementById("user_para").innerHTML = "Welcome User : " + user.email;
    }

  } else {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

}

function logout(){
  firebase.auth().signOut();
}

function signUp() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

var provider = new firebase.auth.GoogleAuthProvider();
function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      
      console.log(token)
      console.log(user)

   }).catch(function(error) {
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout(){
  firebase.auth().signOut()
  
  .then(function() {
     console.log('Signout successful!')
  }, function(error) {
     console.log('Signout failed')
  });
}

  
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  var name = getInputVal('name');
  var phone = getInputVal('phone');
  var address = getInputVal('address');
  var date = getInputVal('date');

  var user = firebase.auth().currentUser;
    
  savedata(name, user.email, phone, address, date, user.photoURL);

  document.querySelector('.alert').style.display = 'block';
  addToCal()
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  document.getElementById('contactForm').reset();
}


function getInputVal(id){
  return document.getElementById(id).value;
}

function savedata(name, email, phone, address, date, photo){
  var newdataRef = dataRef.push();
  newdataRef.set({
    name: name,
    email: email,
    phone: phone,
    address: address,
    date: date,
    photo: photo
  });
}


function displayAll(){
  // var dataRef = firebase.database().ref('Data');
  // dataRef.on('value', gotData, errData);

  var dataRef = firebase.database().ref('Data');
dataRef.orderByChild("date").on("child_added", function(snapshot) {
  // var Name = snapshot.key;
  var Data = snapshot.val();


  const output = `
        <div class="card">
          <div class="card--details">
            <div>
              <h4>${Data.name}</h4>
            </div>
            <span class="card--details-ribbon ribbon-${Data.date}">
                ${Data.date}
            </span>
             <p>${Data.email}</p>
          </div>
        </div>
        `
  const book_button = `
        <a role="button" href="./calender2.html">Book Apppointment</a><br>
  `
        document.getElementById("user_div").innerHTML = '';
        document.getElementById("user_div").innerHTML += output;
        // document.getElementById("user_div").style.display = "none";
        document.getElementById("user_div").innerHTML += book_button;
        document.getElementById("login_div").style.display = "none";

  console.log(Data.name + " booked an appointment for " + Data.date + " date");
});
}


function addToCal() {
  var user = firebase.auth().currentUser;
  var event = {
    'summary': 'Booking',
    'location': user.address,
    'description': 'Appointment',
    'start': {
      'dateTime': user.date,
      'timeZone': 'India/Kolkata',
    },
    'end': {
      'dateTime': user.date,
      'timeZone': 'India/Kolkata',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': user.email},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
}