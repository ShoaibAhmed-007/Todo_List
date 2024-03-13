import { createEl, projects } from "./DOM";
import { setPriority, getPriority } from "./addPriority";
import { saveToStorage } from "./storage";
import { addTodo } from "./addTask";

//Function to Mark Task Completed
function marked(idx, index, updateBtn, task, todo, title, date) {
  if (projects[idx].todos[index].checklist) {
    projects[idx].todos[index].checklist = false;
    updateBtn.el.disabled = false;
    setPriority(task, todo.priority);
    task.el.style.padding = "1rem ";
    task.el.style.backgroundColor = "#c7ddcc";
    title.el.style.opacity = "1";
    date.el.style.opacity = "1";
    updateBtn.el.style.pointerEvents = "all";
  } else {
    projects[idx].todos[index].checklist = true;
    task.el.style.backgroundColor = "rgba(199,221,204,0.5)";
    title.el.style.opacity = "0.5";
    date.el.style.opacity = "0.5";
    updateBtn.el.disabled = true;
    updateBtn.el.style.pointerEvents = "none";
  }
}

//Function to Update Task Data
function updateBtn(idx, index) {
  let divSubmit = document.querySelector(".submitBtn");
  divSubmit.innerText = "";
  let submit1 = new createEl("button", `submit`);
  submit1.setText("Submit");
  divSubmit.append(submit1.el);
  let titA = document.querySelector(".titA");
  let desA = document.querySelector(".desA");
  let dueDate = document.querySelector(".dueDate");
  let radioBtn1 = document.querySelector(".radioBtn1");
  let radioBtn2 = document.querySelector(".radioBtn2");
  let radioBtn3 = document.querySelector(".radioBtn3");
  let addPrompt = document.querySelector(".addTask");
  let cancelTask = document.querySelector(".cancelTask");

  titA.value = projects[idx].todos[index].title;
  desA.value = projects[idx].todos[index].description;
  dueDate.value = projects[idx].todos[index].dueDate;
  if (projects[idx].todos[index].priority === "Low") {
    radioBtn1.checked = true;
  } else if (projects[idx].todos[index].priority === "Medium") {
    radioBtn2.checked = true;
  } else {
    radioBtn3.checked = true;
  }
  addPrompt.classList.remove("hidden");
  addPrompt.setAttribute("style", "display:flex");

  //Cancel Button Event Listener
  cancelTask.addEventListener("click", (e) => {
    e.preventDefault();
    addPrompt.setAttribute("style", "display:none");
  });

  //Submit Button Event Listener
  submit1.el.addEventListener("click", (e) => {
    e.preventDefault();

    projects[idx].todos[index].title = titA.value;
    projects[idx].todos[index].description = desA.value;
    projects[idx].todos[index].dueDate = dueDate.value;
    projects[idx].todos[index].priority = getPriority(
      radioBtn1,
      radioBtn2,
      radioBtn3
    );

    //Save to Storage
    saveToStorage("Data", projects);

    addTodo(idx);
    addPrompt.setAttribute("style", "display:none");
  });
}

export { marked, updateBtn };
