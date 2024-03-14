import { todoObj } from "./app.js";
import { projects, createEl } from "./DOM";
import { saveToStorage } from "./storage.js";
import { setPriority, getPriority } from "./addPriority.js";
import { marked, updateBtn } from "./clickEvents.js";

let todoDom = document.querySelector(".todos");
let count = new createEl("div", "count");
count.setText("Total Tasks: 0");
let addTasks = document.querySelector(".add");
let top = document.querySelector(".top");

function getTaskData(idx) {
  let projectName = new createEl("div", "projectName");
  projectName.setText(projects[idx].name);

  addTodo(idx);

  let addTD = new createEl("button", "todo");
  addTD.setText("+");

  addTasks.append(addTD.el);
  addTasks.append(count.el);

  top.append(projectName.el);
  top.append(addTasks);

  let titA = document.querySelector(".titA");
  let desA = document.querySelector(".desA");
  let dueDate = document.querySelector(".dueDate");
  let radioBtn1 = document.querySelector(".radioBtn1");
  let radioBtn2 = document.querySelector(".radioBtn2");
  let radioBtn3 = document.querySelector(".radioBtn3");
  let addPrompt = document.querySelector(".addTask");
  let cancelTask = document.querySelector(".cancelTask");

  //Add Task Button Event Listener
  addTD.el.addEventListener("click", () => {
    let divSubmit = document.querySelector(".submitBtn");
    divSubmit.innerText = "";
    let submit = new createEl("button", `submit`);
    submit.setText("Submit");
    divSubmit.append(submit.el);
    titA.value = "";
    desA.value = "";
    dueDate.value = "";
    radioBtn1.checked = false;
    radioBtn2.checked = false;
    radioBtn3.checked = false;
    addPrompt.classList.remove("hidden");
    addPrompt.setAttribute("style", "display:flex");

    //Cancel Task Button Event Listener
    cancelTask.addEventListener("click", (e) => {
      e.preventDefault();
      addPrompt.setAttribute("style", "display:none");
    });

    //Submit Task Data Button Event Listener
    submit.el.addEventListener("click", (e) => {
      e.preventDefault();
      if (titA.value === "" || titA.value === null) {
        alert("Enter Title!");
        return false;
      } else if (desA.value === "" || desA.value === null) {
        alert("Enter Description!");
        return false;
      } else if (dueDate.value === "" || dueDate.value === null) {
        alert("Select Due Date!");
        return false;
      } else if (
        radioBtn1.checked === false &&
        radioBtn2.checked === false &&
        radioBtn3.checked === false
      ) {
        alert("Select Priority!");
        return false;
      } else {
        let task = new todoObj(
          titA.value,
          desA.value,
          dueDate.value,
          getPriority(radioBtn1, radioBtn2, radioBtn3),
          false
        );
        projects[idx].todos.push(task);

        //Save to storage
        saveToStorage("Data", projects);

        addTodo(idx);
        addPrompt.setAttribute("style", "display:none");
      }
    });
  });
}

//Function to append Task
function addTodo(idx) {
  todoDom.innerHTML = "";
  count.setText(`Total Tasks: ${projects[idx].todos.length}`);
  projects[idx].todos.forEach((todo, index) => {
    let task = new createEl("div", "task");
    let input = new createEl("input", "checked");
    input.setAtr("type", "checkbox");

    //Check button Event Listener
    input.el.addEventListener("click", () => {
      marked(idx, index, update, task, todo, title, date);

      //Save to Storage
      saveToStorage("Data", projects);
    });

    let title = new createEl("div", "title");
    title.setText(todo.title);

    let details = new createEl("button", "details");
    details.setText("Details");

    //Details Button Event Listener
    details.el.addEventListener("click", () => {
      let cross = document.querySelector(".cross");
      cross.addEventListener("click", () => {
        info.setAttribute("style", "display:none");
      });
      let info = document.querySelector(".info");
      info.classList.remove("hidden");
      info.setAttribute("style", "display:flex");
      let name = document.querySelector(".name");
      let detail = document.querySelector(".detail");
      let pri = document.querySelector(".priority");
      let dDate = document.querySelector(".dDate");
      name.innerHTML = todo.title;
      detail.innerHTML = `Details: ${todo.description}`;
      pri.innerHTML = `Priority: ${todo.priority}`;
      dDate.innerHTML = `Due Date: ${todo.dueDate}`;
    });

    let date = new createEl("div", "date");
    date.setText(todo.dueDate);

    let update = new createEl("button", "update");
    update.setAtr("title", "Edit");
    update.setHTML(`<i class="far fa-edit"></i>`);

    //Update Button Event Listener
    update.el.addEventListener("click", () => {
      updateBtn(idx, index);
    });
    let del = new createEl("button", "del");
    del.setAtr("title", "Delete");
    del.setHTML(`<i class="fas fa-trash-alt"></i>`);

    del.el.addEventListener("click", () => {
      if (
        projects[idx].todos.filter(
          () => projects[idx].todos[index] === projects[idx].todos[0]
        )
      ) {
        projects[idx].todos.splice(index, 1);

        //Save to Storage
        saveToStorage("Data", projects);
      } else {
        projects[idx].todos.splice(index, index);

        //Save to Storage
        saveToStorage("Data", projects);
      }

      addTodo(idx);
    });

    task.el.append(input.el);
    task.el.append(title.el);
    task.el.append(details.el);
    task.el.append(date.el);
    task.el.append(update.el);
    task.el.append(del.el);
    todoDom.append(task.el);

    setPriority(task, todo.priority);

    task.el.style.padding = "1rem ";
    task.el.style.backgroundColor = "#c7ddcc";

    if (projects[idx].todos[index].checklist) {
      task.el.style.backgroundColor = "rgba(199,221,204,0.5)";
      title.el.style.opacity = "0.5";
      date.el.style.opacity = "0.5";
      update.el.disabled = true;
      update.el.style.pointerEvents = "none";
      input.el.checked = true;
    }
  });
}

export { getTaskData, addTodo };
