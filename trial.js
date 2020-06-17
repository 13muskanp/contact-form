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
  
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  function submitForm(e){
    e.preventDefault();
  
    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var address = getInputVal('address');
    var date = getInputVal('date');
  
    savedata(name, email, phone, address, date);
  
    document.querySelector('.alert').style.display = 'block';
  
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    document.getElementById('contactForm').reset();
  }

  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  function savedata(name, email, phone, address, date){
    var newdataRef = dataRef.push();
    newdataRef.set({
      name: name,
      email: email,
      phone: phone,
      address: address,
      date: date
    });
  }
  