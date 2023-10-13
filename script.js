let textTyped = document.querySelector(".special");
let myList = document.querySelector(".list");
let sendIcon = document.querySelector(".send-icon");
let table = [];

function createElement(text, id = null, check = null) {
  let myDiv = document.createElement("div");
  let myInput = document.createElement("input");
  let myLabel = document.createElement("label");
  let myBtn = document.createElement("button");
  let mySpan = document.createElement("span");

  myDiv.className = "activity";
  myBtn.className = "btn";
  myBtn.innerHTML = "delete";
  mySpan.className = "material-symbols-outlined delete";
  mySpan.innerHTML = "delete";
  myInput.id = id ? id : Math.random();
  myInput.type = "checkbox";

  if (check != null && check != "") {
    let att = document.createAttribute(check);
    myInput.setAttributeNode(att);
  }

  myLabel.setAttribute("for", myInput.id);
  myLabel.innerHTML = text;

  myDiv.appendChild(myInput);
  myDiv.appendChild(myLabel);
  myDiv.appendChild(myBtn);
  myDiv.appendChild(mySpan);
  myList.appendChild(myDiv);
  localSave(text, myInput.id);
}

if (window.localStorage.getItem("inputs")) {
  table = JSON.parse(window.localStorage.getItem("inputs"));

  table.forEach((e) => {
    createElement(e.text, e.id, e.check);
  });
}

function localSave(text, id) {
  obj = new Object();
  obj.id = id;
  obj.text = text;
  obj.check = "";
  let counter = 0;
  if (window.localStorage.getItem("inputs")) {
    table = JSON.parse(window.localStorage.getItem("inputs"));
    table.forEach((e) => {
      e.id === id ? ++counter : counter;
    });
    if (counter === 0) {
      table.push(obj);
    }
    window.localStorage.setItem("inputs", JSON.stringify(table));
  } else {
    table.push(obj);
    window.localStorage.setItem("inputs", JSON.stringify(table));
  }
}

textTyped.onkeypress = function (e) {
  if (e.keyCode == 13) {
    if (textTyped.value != "") {
      createElement(textTyped.value);
    }
    textTyped.value = "";
  }
};

sendIcon.onclick = function () {
  if (textTyped.value != "") {
    createElement(textTyped.value);
  }
  textTyped.value = "";
};

document.addEventListener("click", function (e) {
  if (
    e.target.className === "btn" ||
    e.target.className === "material-symbols-outlined delete"
  ) {
    e.target.parentElement.remove();
    table = JSON.parse(window.localStorage.getItem("inputs"));
    table.forEach((p) => {
      if (
        p.id === e.target.previousElementSibling.getAttribute("for") ||
        p.id ===
          e.target.previousElementSibling.previousElementSibling.getAttribute(
            "for"
          )
      ) {
        table.splice(table.indexOf(p), 1);
        window.localStorage.setItem("inputs", JSON.stringify(table));
      }
    });
  }
  if (e.target.type === "checkbox") {
    table = JSON.parse(window.localStorage.getItem("inputs"));
    table.forEach((x) => {
      if (x.id === e.target.nextElementSibling.getAttribute("for")) {
        if (x.check === "") {
          x.check = "checked";
          window.localStorage.setItem("inputs", JSON.stringify(table));
        } else {
          x.check = "";
          window.localStorage.setItem("inputs", JSON.stringify(table));
        }
      }
    });
  }
});

/* Set Timer */
let container = document.querySelector(".container");
let option = document.querySelector("select");
let munites = document.querySelector(".min");
let seconds = document.querySelector(".sec");
let reset = document.querySelector("[type = 'reset']");
let start = document.querySelector("[type = 'submit']");
let choice = 0;

option.onchange = function (e) {
  choice = e.target.value;
};

reset.onclick = function () {
  option.nextElementSibling.style.display = "block";
  option.nextElementSibling.nextElementSibling.style.display = "none";
  container.children[1].style.display = "none";
  container.children[3].style.display = "none";
};

start.onclick = function () {
  container.children[1].style.display = "block";
  container.children[3].style.display = "none";
  option.nextElementSibling.style.display = "none";
  option.nextElementSibling.nextElementSibling.style.display = "block";
  let date = new Date(new Date().getTime() + choice * 60 * 1000);

  let counter = setInterval(() => {
    let now = new Date();
    let diff = date - now.getTime();
    let minute = Math.floor(diff / (60 * 1000));
    let second = Math.floor((diff % (60 * 1000)) / 1000);
    munites.innerHTML = minute < 10 ? `0${minute}` : minute;
    seconds.innerHTML = second < 10 ? `0${second}` : second;
    if (diff <= 1000) {
      clearInterval(counter);
      container.children[3].style.display = "block";
      option.nextElementSibling.style.display = "block";
      option.nextElementSibling.nextElementSibling.style.display = "none";
      container.children[1].style.display = "none";
    }
    reset.onclick = function () {
      clearInterval(counter);
      munites.innerHTML = `00`;
      seconds.innerHTML = `00`;
      option.nextElementSibling.style.display = "block";
      option.nextElementSibling.nextElementSibling.style.display = "none";
      container.children[1].style.display = "none";
      container.children[3].style.display = "none";
    };
  }, 1000);
};
