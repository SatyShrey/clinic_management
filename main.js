
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, set, get, ref,update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOlvsZg9qAe99jE-p3n3yaGJ31_m5jUpE",
    authDomain: "quiz-1ecfc.firebaseapp.com",
    projectId: "quiz-1ecfc",
    storageBucket: "quiz-1ecfc.appspot.com",
    messagingSenderId: "647426568440",
    appId: "1:647426568440:web:a8776f43458d4286fc0b0d",
    measurementId: "G-JQ2HW6Z5L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db= getDatabase(app);

//variables declaration
var doctorTab=document.querySelector('.doctorTab');
var ol=document.getElementById('dTokens');
var recepTab=document.querySelector('.recepTab');
var ol2=document.getElementById('tokens');
var login=document.getElementById('loginForm');
var signup=document.getElementById('signupForm');
var main=document.querySelector('main');
var rName=document.getElementById('rName');
var dName=document.getElementById('dName');
var alert=document.getElementById('alert');
var alert2=document.getElementById('alert2');
var email='';

//go to signup page
document.getElementById('goToSignup').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('signupForm').style.display='block';
    document.getElementById('loginForm').style.display='none';
    login.reset();
})

//go to login page
document.getElementById('goToLogin').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('signupForm').style.display='none';
    document.getElementById('loginForm').style.display='block';
    signup.reset();
})

//function for signup
signup.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert.innerHTML=`<marquee direction='right' style='background-color:skyblue'><i>Loading..</i></marquee>`;
    var email0=document.getElementById('email0').value;
    var password=document.getElementById('pw0').value;
    var password1=document.getElementById('pw1').value;
    var deg=document.getElementById('level').value;
    if(password===password1 && password.length>=6  && deg!='none'){
        createUserWithEmailAndPassword(auth,email0,password).then((userCredentials)=>{
            alert.innerHTML=`<i style='background-color:green'>Signup successfull.</i>`;
            signup.reset();setTimeout(()=>{alert.innerHTML=''},900);
           var uid=userCredentials.user.uid;
           set(ref(db,'users/'+uid),{level:deg});
        }).catch((error)=>{ console.log(error);  if(error=="FirebaseError: Firebase: Error (auth/network-request-failed)."){
            alert.innerHTML=`<i style='background-color:red'>Internet connection failed.</i>`;
            setTimeout(()=>{alert.innerHTML=''},900);
        }else if(error=="FirebaseError: Firebase: Error (auth/email-already-in-use)."){alert.innerHTML=`<i style='background-color:red'>This email already in use.</i>`;
            setTimeout(()=>{alert.innerHTML=''},900);}else if(error=="FirebaseError: Firebase: Error (auth/invalid-email)."){
                alert.innerHTML=`<i style='background-color:red'>Invalid email.</i>`;
            setTimeout(()=>{alert.innerHTML=''},900);
            }
     })
    }else if(password!=password1){alert.innerHTML=`<i style='background-color:red'>confirm your password.</i>`;
        setTimeout(()=>{alert.innerHTML=''},900);}else if(deg==='none'){
            alert.innerHTML=`<i style='background-color:red'>Select Designation.</i>`;
            setTimeout(()=>{alert.innerHTML=''},900);
        }else if(password.length<6){
            alert.innerHTML=`<i style='background-color:red'>The password must have six digits.</i>`;
            setTimeout(()=>{alert.innerHTML=''},900);
        }
})

//functions for login
login.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert.innerHTML=`<marquee direction='right' style='background-color:skyblue'><i>Loading..</i></marquee>`;
    email=document.getElementById('email').value;
    var password=document.getElementById('pw').value;
    signInWithEmailAndPassword(auth,email,password).then((userCredentials,err)=>{
        login.reset();
        alert.innerHTML='';
        var uid=userCredentials.user.uid;
        get(ref(db,'users/'+uid)).then((userId)=>{
            var level=Object.values(userId.val())[0];
            if(level==='doctor'){dashboard(doctorTab,ol,dName);}
            else if(level==='recep'){dashboard(recepTab,ol2,rName);}
        }) 
        
    }).catch((error)=>{
        if(error=="FirebaseError: Firebase: Error (auth/network-request-failed)."){
        alert.innerHTML=`<i style='background-color:red'>Internet connection failed.</i>`;
        setTimeout(()=>{alert.innerHTML=''},900);}
        else if(error=="FirebaseError: Firebase: Error (auth/invalid-credential)."){
        alert.innerHTML=`<i style='background-color:red'>Invalid credential.</i>`;
        setTimeout(()=>{alert.innerHTML=''},900);}
  })
})

//function for generate tokens
var dataForm= document.getElementById('dataForm');
dataForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var nam=document.getElementById('pName').value;
    var age=document.getElementById('pAge').value;
    var gender=document.getElementById('gender').value;
    var date=new Date().toLocaleDateString();
    var time=new Date().toLocaleTimeString();
    var id='i'+Date.now();
    if(gender==='none'){alert2.innerHTML=`<i style='background-color:red;'>Select gender</i>`;
        setTimeout(()=>{alert2.innerHTML=''},900);
    }
    else{
        set(ref(db,'patients/'+id),{
            Age:age,
            Name:nam,
            Gender:gender,
            Date:date,
            Time:time,
            Checkup:'Pending',
            Id:id
        }).then((datas)=>{alert2.innerHTML=`<i style='background-color:green;'>Token generated successfully</i>`;
            setTimeout(()=>{alert2.innerHTML=''},900);dashboard(recepTab,ol2,rName);dataForm.reset();});
    }
})


//function to view all token list
function dashboard(a,b,c){
a.style.display='block';
main.style.display='none';
c.innerHTML=email;
b.innerHTML='';
    get(ref(db,'patients/')).then((ids)=>{
        var idsValue=ids.val();
        var idsArray=Object.values(idsValue);
        for(var num=idsArray.length-1;num>=0;num--){
        var id=idsArray[num];
        var Chekup=id.Checkup;
        var Id=id.Id;
        var Name=id.Name;
        var color='red';
        if(Chekup==='Checkup done<br>Payment done &#10003;'){color='green'}else if(Chekup==="Checkup done"){
            color='orange';
        }
        var li=document.createElement('li');
        li.innerHTML=`<table>
        <tr><td>Name</td><td>:</td><td> ${Name}</td></tr>
        <tr><td>Status</td><td>:</td>
        <td style='color:${color};border:2px solid ${color}'>${Chekup}</td></tr>
        </table>
        <button style='background-color:${color}' class='btnView' id='${Id}'>Check</button>
        <button style='background-color:${color}' class='btnView2' id='${"rec"+Id}'>View</button><br><br>`;
        b.appendChild(li);
        }
    })
}

//function for view button, cancel button and update the value of checkup
document.addEventListener('click',(e)=>{
    var preview=document.getElementById('preview');
    var pId=e.target.id;
    if(e.target.className==='btnView'){
        get(ref(db,'patients/'+pId)).then((info)=>{
            var infoVal=info.val();
            preview.innerHTML=`<div class=preview>
            <u>Appointment Details</u>
    <table>
      <tr><td>Patient's name</td><td>:</td><td>${infoVal.Name}</td></tr>
      <tr><td>Date</td><td>:</td><td>${infoVal.Date}</td></tr>
      <tr><td>Time</td><td>:</td><td>${infoVal.Time}</td></tr>
      <tr><td>Age</td><td>:</td><td>${infoVal.Age}</td></tr>
      <tr><td>Gender</td><td>:</td><td>${infoVal.Gender}</td></tr>
      <tr><td>Id</td><td>:</td><td id='uId'>${infoVal.Id}</td></tr>
      <tr><td>Total charge</td><td>:</td><td>Rs.<input id='charge' placeholder='Enter amount' type='number'></td></tr>
      <tr><td>Checkup</td><td>:</td><td id='status'>${infoVal.Checkup}</td></tr>
      <tr><td><u>Prescription</u></td><td></td><td></td></tr>
    </table>
    <div class='center'><textarea cols="37" rows="10" placeholder='Write prescription' id="prescription"></textarea></div><br>
    <div class='alert' id='alert1'></div>
    <div class='center'><button id='ok'>Ok</button>
    <button id='completed'>Checkup done</button></div>
    </div>`;
    var prescription=document.getElementById("prescription");
    var charge=document.getElementById("charge");
    var completed=document.getElementById('completed');
    if(infoVal.Checkup==='Pending'){
        prescription.value='';
        charge.value='';
    }else{
        prescription.value=infoVal.Prescription;
        prescription.disabled='true';
        charge.value=infoVal.Charge;
        charge.disabled='true';
        completed.style.display='none';
    }
    
        })}

        //cancel button
    else if(pId==='ok'){
        preview.innerHTML='';}

    //completed button
    else if(pId==='completed'){
       var ch =document.getElementById('charge').value;
       var preq=document.getElementById('prescription').value;
       var alert=document.getElementById('alert1');
        if(ch===''){
            alert.innerHTML="<span style='color:red'>Error:Charge field is empty..</span>";
            setTimeout(()=>{alert.innerHTML=''},900);
        }else if(preq===''){alert.innerHTML="<span style='color:red'>Error:Prescription field is empty..</span>";
            setTimeout(()=>{alert.innerHTML=''},900);
        }else{
            var uId=document.getElementById('uId').innerHTML;
        var preq=document.getElementById('prescription').value;
        var ch=document.getElementById('charge').value;
        update(ref(db,'patients/'+uId),{
            Checkup:'Checkup done',
            Prescription:preq,
            Charge:ch
        }).then(()=>{
            dashboard(doctorTab,ol,dName);preview.innerHTML='';
        })
        }
    }
})

//logout buton for doctor
document.getElementById('dLogout').addEventListener('click',()=>{
    doctorTab.style.display='none';
    main.style.display='block';
})

//logout buton for receptionist
document.getElementById('rLogout').addEventListener('click',()=>{
    recepTab.style.display='none';
    main.style.display='block';
})

//view data for receptionalist
document.addEventListener('click',(e)=>{
    var updateForm=document.getElementById('updateForm');
    if(e.target.className==='btnView2'){
        var id=e.target.id.replace('rec','');
        get(ref(db,'patients/'+id)).then((data)=>{
            var dataval=data.val();
            if(dataval.Checkup==='Pending'){
                dataval.Charge='--';
                dataval.Prescription='';
            }
            updateForm.innerHTML=`<div class="center">
  <table>
    <tr><td>Patient's name</td><td>:</td><td>${dataval.Name}</td></tr>
    <tr><td>Date</td><td>:</td><td>${dataval.Date}</td></tr>
    <tr><td>Time</td><td>:</td><td>${dataval.Time}</td></tr>
    <tr><td>Age</td><td>:</td><td>${dataval.Age}</td></tr>
    <tr><td>Gender</td><td>:</td><td >${dataval.Gender}</td></tr>
    <tr><td>Id</td><td>:</td><td id='upId' >${dataval.Id}</td></tr>
    <tr><td>Checkup</td><td>:</td><td >${dataval.Checkup}</td></tr>
    <tr><td>Total charge</td><td>:</td><td >Rs.${dataval.Charge}</td></tr>
  </table>
  <u>Precription</u>
  <p>${dataval.Prescription}</p>
  <div class='btnDiv'>
    <button id="ok2">Ok</button><button id="Payment">Payment done</button>
  </div>
</div>`;
if(dataval.Checkup != "Checkup done"){
    document.getElementById('Payment').style.display='none';
}

        })
    }

    else if(e.target.id==='ok2'){
        updateForm.innerHTML='';

//mark as payment done
    }else if(e.target.id==='Payment'){
        var id=document.getElementById('upId').innerHTML;
        update(ref(db,'patients/'+id),{
            Checkup:'Checkup done<br>Payment done &#10003;'
        }).then((data)=>{
            dashboard(recepTab,ol2,rName);updateForm.innerHTML='';
        })
    }
})

//Thank you..............|||

