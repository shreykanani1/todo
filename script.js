// localStorage.clear();
var a = new Array();
// console.log(localstorage.getItem("data"));
let tg = localStorage.getItem("data");
const d = new Date();
// console.dir(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`);
console.dir(document.getElementById("welcome"))

function store() {
  var todos = [];
  if(tg !== ""){
    a = JSON.parse(localStorage.getItem("data"));
  }
  if(a==null){
    a=[];
  }
  //   console.log(localData);

  let fname1 = document.getElementById("fname").value;
  //   console.log(fname);
  let lname1 = document.getElementById("lname").value;
  //   console.log(lname);
  let username1 = document.getElementById("username").value;
  //   console.log(username);
  let password1 = document.getElementById("password").value;
  //   console.log(password);

  a.push({
    "fname": fname1,
    "lname": lname1,
    "username": username1,
    "password": password1,
    "todos": todos,
  });

  localStorage.setItem("data", JSON.stringify(a));

  localStorage.setItem("activeAccount", username1);

  window.location.href = "home.html";
  document.getElementById("welcome").innerText = `Welcome ${username1}`;
  showNotes();
}

function check() {
  var username1 = document.getElementById("username").value;
  //   console.log(username);
  let password1 = document.getElementById("password").value;
  //   console.log(password);

  let data = JSON.parse(localStorage.getItem("data"));

  //   console.log(data);

  for (let i = 0; i < data.length; i++) {
    var count = 0;
    // console.log(data[i]);
    if (data[i].username == username1 && data[i].password == password1) {
      window.location.href = "home.html";
      
      count++;
      localStorage.setItem("activeAccount", data[i].username);
      break;
    }
  }
  if (count == 0) {
    alert("Wrong details");
  }
  showNotes();
}



// Add Note
function addNote() {
  console.log("hello")
  let addBtn = document.getElementById("addBtn");
  let addTxt1 = document.getElementById("addTxt").value;

  let currentTime = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
  let addTxt = {"notedata":addTxt1,"time":currentTime};

  document.getElementById("addTxt").value = "";
  let data = JSON.parse(localStorage.getItem("data"));
  let username = localStorage.getItem("activeAccount");
  for (let i = 0; i < data.length; i++) {
    if (data[i].username == username) {
      data[i].todos.push(addTxt);
      break;
    }
  }
  //   console.log(data);
  localStorage.setItem('data', JSON.stringify(data));
  showNotes();
}

// show notes
function showNotes() {
  let data = JSON.parse(localStorage.getItem("data"));
  let username = localStorage.getItem("activeAccount");
  for (let i = 0; i < data.length; i++) {
    if (data[i].username == username) {
      var notesArr = data[i].todos;
      document.getElementById("welcome").innerText = `Welcome ${data[i].fname}`;
      // console.log(notesArr);
    }
  }



  let html = "";
  notesArr.forEach(function (element, index) {
    // console.log(element);
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p>${element["time"]}</p>
                        <textarea rows="5" cols="25" class="card-text" id="${index}Note"> ${element["notedata"]}</textarea>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        <button class="btn btn-primary" id="${index}" onclick="editNote(this.id)">Edit Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesArr.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// delete a note
function deleteNote(index) {
  let data = JSON.parse(localStorage.getItem("data"));
  let user = localStorage.getItem("activeAccount");
  let notesArr = [];
  for (let index = 0; index < data.length; index++) {
    // console.log(user + "  " + allUser[index].username)
    if (user == data[index].username) {
      notesArr = data[index].todos;
    }
  }

  console.log(notesArr);
  notesArr.splice(index, 1);
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  showNotes();
}

function editNote(index) {
  let data = JSON.parse(localStorage.getItem("data"));
  let user = localStorage.getItem("activeAccount");
  let notesArr = [];
  for (let i = 0; i < data.length; i++) {
    if (user == data[i].username) {
      notesArr = data[i].todos;
    }
  }
  // console.log(notesArr);
  let newNote1 = document.getElementById(`${index}Note`).value;
  let currentTime = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
  let newNote = {"notedata":newNote1,"time":currentTime};
  // console.log(newNote);
  notesArr.splice(index, 1, newNote);
  // console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  showNotes();
}

function editPageFillDeails() {
  let user = localStorage.getItem("activeAccount");
  // console.log(user);
  let allUser = JSON.parse(localStorage.getItem("data"));
  console.log(allUser);
  for (let index = 0; index < allUser.length; index++) {
    // console.log(user + "  " + allUser[index].username)
    if (user == allUser[index].username) {
      document.getElementById("fname1").value = allUser[index].fname;
      document.getElementById("lname1").value = allUser[index].lname;
      document.getElementById("username1").value = allUser[index].username;
      document.getElementById("password1").value = allUser[index].password;
    }
  }
}

function editDetails() {
  let user = localStorage.getItem("activeAccount");
  let allUser = JSON.parse(localStorage.getItem("data"));

  let newFname = document.getElementById("fname1").value;
  let newLname = document.getElementById("lname1").value;
  // let newUsername = document.getElementById("username1").value;
  let newPassword = document.getElementById("password1").value;

  console.log(newFname + " " + newLname + " " + newPassword);

  for (let index = 0; index < allUser.length; index++) {
    if (user == allUser[index].username) {
      allUser[index].fname = newFname;
      allUser[index].lname = newLname;
      // allUser[index].username = newUsername;
      allUser[index].password = newPassword;
    }
  }
  localStorage.setItem("data", JSON.stringify(allUser))
}

function deleteAccount() {
  let want = confirm("Are you sure you want to delete your account?")
  
  if(want){
    let user = localStorage.getItem("activeAccount");
  let allUser = JSON.parse(localStorage.getItem("data"));
  for (let index = 0; index < allUser.length; index++) {
    if (user == allUser[index].username) {
      allUser.splice(index,1);
        localStorage.setItem("data",JSON.stringify(allUser));
    }
  }
  window.location.href = "index.html";
  }
}



let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  console.log(noteCards);
  Array.from(noteCards).forEach(function (element, index) {
    let cardTxt = element.getElementsByTagName("textarea")[0].innerHTML;
    cardTxt = cardTxt.toLowerCase();
    // console.log(element.getElementsByTagName("textarea")[0].innerHTML);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// document.getElementById("today").addEventListener("click",)