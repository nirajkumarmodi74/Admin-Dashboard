let users = JSON.parse(localStorage.getItem("users")) || [];
let userId = users.length ? users[users.length - 1]?.id + 1 : 1;

// -------Checking login status----------------

window.onload = function () {
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    document.querySelector("#login-page").style.display = "none";
    document.querySelector(".dashboard").style.display = "flex";
    renderUsers();
  }
};

function Login() {
  const userName = document.querySelector("#username").value;
  const userPassword = document.querySelector("#userpassword").value;

  console.log(userName);
  console.log(userPassword);

  if (userName === "admin" && userPassword === "1234") {
    sessionStorage.setItem("isLoggedIn", "true");
    document.querySelector("#login-page").style.display = "none";
    document.querySelector(".dashboard").style.display = "flex";
  } else {
    document.querySelector("#loginError").textContent = "invalid inputs";
  }
}

const loginButton = document.querySelector("#loginbutton");
loginButton.addEventListener("click", () => {
  Login();
});

// ------------------LOGOUT-------------------------

function logOut() {
  sessionStorage.removeItem("isLoggedIn");
  document.querySelector("#login-page").style.display = "grid";
  document.querySelector(".dashboard").style.display = "none";
}

const logOutButton = document.querySelector("#log-out");
logOutButton.addEventListener("click", () => {
  logOut();
});

// --------------SIDEBAR BUTTON-----------------
function openSidebar() {
  document.querySelector("#sidebar").classList.toggle("active");
}

function saveUser() {
  const name = document.querySelector("#inputname").value.trim();
  const email = document.querySelector("#inputemail").value.trim();
  const editId = Number(document.querySelector("#editId").value);
  // const editNUm = Number(editId);
  if (!name || !email) {
    document.querySelector("#formError").textContent = "All items are Required";
    return;
  }

  if (editId) {
    users = users.map((u) => (u.id === editId ? { ...u, name, email } : u));
  } else {
    users.push({ id: userId++, name, email });
  }

  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector("#inputname").value = "";
  document.querySelector("#inputemail").value = "";
  document.querySelector("#formError").textContent = "";

  renderUsers();
}

// ------RENDER USERS---------------------

function renderUsers() {
  const table = document.querySelector("#userTableBody");
  table.innerHTML = "";

  users.forEach((e) => {
    table.innerHTML += `
    <tr>
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.email}</td>
      <td class="userbtn">
        <button class="editbtn" onclick="editUser(${e.id})">Edit</button>
        <button class="deletebtn" onclick="deleteUser(${e.id})">Delete</button>
      </td>
    </tr>`;
  });

  document.querySelector("#totalusers").textContent = users.length;
  document.querySelector("#activeusers").textContent = users.length;
}

// -------EDIT USERS------
// function editUser(id) {
//   const user = users.find(u=>u.id==id);
//   document.querySelector("#inputname").value = user.name;
//   document.querySelector("#inputemail").value = user.email;
//   document.querySelector("#editId").value = id;
//   console.log(id);
// }

function editUser(id){
  const user=users.find(u=>u.id==id);
  document.getElementById("inputname").value=user.name;
  document.getElementById("inputemail").value=user.email;
  document.getElementById("editId").value=id;
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

// -------SEARCH USERS----------------

function searchUser() {
  const value = document.querySelector("#search").value.toLowerCase();
  const rows = document.querySelectorAll("#userTableBody tr");

  rows.forEach((row) => {
    const name = row.cells[1].textContent.toLowerCase();
    const email = row.cells[2].textContent.toLowerCase();
    console.log(row);
    
    if(name.includes(value) || email.includes(value)){
      row.style.display = "" ;
    }else{
      row.style.display = "none";
    }
  });
}


