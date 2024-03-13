import { getFromStorage } from "./storage.js";
import { getTaskData, addTodo } from "./addTask.js";

let todoDom = document.querySelector(".todos");

let top = document.querySelector(".top");

let addTasks = document.querySelector(".add");

let projects = getFromStorage("Data");

if (projects === null) {
  projects = [
    {
      name: "Home",
      todos: [
        {
          title: "Cook Dinner",
          description: "Prepare meal to eat after Iftar",
          dueDate: "2024-03-13",
          priority: "High",
          checklist: false,
        },
        {
          title: "Workout",
          description: "Abs Workout and Cardio",
          dueDate: "2024-03-12",
          priority: "Medium",
          checklist: true,
        },
        {
          title: "Play Fifa",
          description: "Play the Weekly Squads Event",
          dueDate: "2024-03-14",
          priority: "Low",
          checklist: false,
        },
      ],
    },
  ];
} else if (projects.length === 0) {
  todoDom.innerHTML = `<div style=
  "display:flex;
   justify-content:center;
   align-items:center;
   height:40.7vh;
   font-size:30px"
   >Add Project</div>`;
}

// Function to create DOM Element
function createEl(type, classN) {
  this.el = document.createElement(type);
  this.el.classList.add(classN);
  this.setText = function (text) {
    this.el.innerText = text;
  };
  this.setHTML = function (htm) {
    this.el.innerHTML = htm;
  };
  this.setID = function (id) {
    this.el.setAttribute("id", id);
  };
  this.setAtr = function (atr, val) {
    this.el.setAttribute(atr, val);
  };
}

//Funtion to Update Dom
function updateDOM(idx) {
  if (projects.length !== 0) {
    todoDom.innerHTML = `<div style=
                        "display:flex;
                         justify-content:center;
                         align-items:center;
                         height:45vh;
                         font-size:30px"
                         >Switch Project</div>`;
    top.innerHTML = "";
    addTasks.innerHTML = "";
    getTaskData(idx);
  } else {
    todoDom.innerHTML = `<div style=
                        "display:flex;
                         justify-content:center;
                         align-items:center;
                         height:45vh;
                         font-size:30px"
                         >Add Project</div>`;
    top.innerHTML = "";
  }
}
export { updateDOM, projects, createEl };
