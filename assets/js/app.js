let cl = console.log;


let stdForm = document.getElementById("stdForm");
let Fname = document.getElementById("Fname");
let Lname = document.getElementById("Lname");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let submitBtn = document.getElementById("submitBtn");
let tbody = document.getElementById("tbody");
let Updatebtn = document.getElementById("Updatebtn");

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
   
let StdArry = [];
const onsubmitHandler = (ele) =>{
    ele.preventDefault();
    let obj = {
        Fname : Fname.value,
        Lname : Lname.value,
        email : email.value,
        contact : contact.value,
        id :uuid()
    }
    StdArry.push(obj);
    templating(StdArry);
    localStorage.setItem("setData", JSON.stringify(StdArry));    
    ele.target.reset();
}

const onEditHandler = (ele)=>{
let getid = ele.dataset.id;
let storeid = localStorage.setItem("setId",getid);
let arr = getData();
let EditArr = arr.find((ele)=> getid === ele.id);
cl(EditArr);

Fname.value = EditArr.Fname; 
Lname.value = EditArr.Lname;
email.value = EditArr.email;
contact.value = EditArr.contact;
Updatebtn.classList.remove("d-none");
submitBtn.classList.add("d-none");
}

const onUpdataHandler =()=>{
    let getId = localStorage.getItem("setId");
    let UpdateArr = getData();
    UpdateArr.forEach((ele)=>{
        if(getId=== ele.id){
            ele.Fname = Fname.value;
            ele.Lname = Lname.value;
            ele.email = email.value;
            ele.contact = contact.value
        }
    })
    localStorage.setItem("setData",JSON.stringify(UpdateArr));
    templating(UpdateArr);
    stdForm.reset();
    Updatebtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
}
const onDeleteHandler = (e)=>{
    let getId1 = e.getAttribute("data-id");
    cl(getId1);
     setid =getData();
    StdArry = setid.filter((ele)=>{
        return ele.id !== getId1;
    })
    templating(StdArry);
    localStorage.setItem("setData",JSON.stringify(StdArry));
}

function templating(arr){
    let result = '';
    arr.forEach((ele,i) => {
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${ele.Fname}</td>
        <td>${ele.Lname}</td>
        <td>${ele.email}</td>
        <td>${ele.contact}</td>
        <td><button class="btn-success" onclick="onEditHandler(this)" data-id="${ele.id}">Edit</button></td>

        <td><button class="btn-danger" onclick="onDeleteHandler(this)" data-id="${ele.id}">Delete</button></td>
    </tr>
        `
    });
    tbody.innerHTML = result;
}
const getData = () =>{
return JSON.parse(localStorage.getItem("setData"))
}
if(localStorage.getItem("setData")){
  StdArry =  getData();
  templating(StdArry);
}
stdForm.addEventListener("submit",onsubmitHandler);
Updatebtn.addEventListener("click",onUpdataHandler);