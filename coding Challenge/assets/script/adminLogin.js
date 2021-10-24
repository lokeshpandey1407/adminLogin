const loginForm = document.querySelector(".form-control");
const sumbitBtn = document.querySelector(".login-btn");

const clearValue = () => {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};

const saveToSession = (userValues) => {
  sessionStorage.setItem("userValue", JSON.stringify(userValues));
};

const ifPassWordInvalid = (message, time) => {
  const alertBox = document.querySelector(".alert-modal");
  alertBox.textContent = message;
  alertBox.style.opacity = 1;
  setTimeout(() => {
    alertBox.style.opacity = 0;
  }, time);
};

function getFormValues(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username.length === 0 || password.length === 0) {
    ifPassWordInvalid("Error!! Field(s) cannot be empty", 2000);
    return;
  } else if (password.length < 10) {
    ifPassWordInvalid("Password should be ten characters long", 5000);
    return;
  }
  const userValues = { username: username, passrord: password };
  saveToSession(userValues);
  window.location.href = "admin.html";
  clearValue();
}

sumbitBtn.addEventListener("click", (e) => getFormValues(e));
