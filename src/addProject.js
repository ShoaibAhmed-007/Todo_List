import { updateDOM, projects, createEl } from "./DOM.js";
import { saveToStorage } from "./storage.js";

//Function to Get Project Data
function addProject() {
  let addP = document.querySelector(".addP");
  let wrap = document.querySelector(".wrapper");
  let afterP = new createEl("button", "addP");
  afterP.setText("Add Project");

  //Add Project Button Event Listener
  addP.addEventListener("click", () => {
    let iptP = new createEl("input", "iptDom");
    iptP.setAtr("type", "text");
    let div = new createEl("div", "btnDom");
    let addBtn = new createEl("button", "addPro");
    addBtn.setText("Add");
    let cancelBtn = new createEl("button", "cancel");
    cancelBtn.setText("Cancel");
    div.el.append(addBtn.el);
    div.el.append(cancelBtn.el);
    wrap.innerHTML = "";
    wrap.append(iptP.el);
    wrap.append(div.el);

    addBtn.el.addEventListener("click", () => {
      if (iptP.el.value === "" || iptP.el.value === null) {
        alert("Enter Project Name!");
        return false;
      } else {
        let p = {
          name: iptP.el.value,
          todos: [],
        };
        projects.push(p);

        //Save to Storage
        saveToStorage("Data", projects);

        appendToP();
        wrap.innerHTML = "";
        wrap.append(afterP.el);
        addProject();
      }
    });
    cancelBtn.el.addEventListener("click", () => {
      wrap.innerHTML = "";
      wrap.append(afterP.el);
      addProject();
    });
  });
}

//Funtion to append Project
function appendToP() {
  let projectEl = document.querySelector(".itemsP");
  projectEl.innerHTML = "";
  projects.forEach((project, idx) => {
    let leftPane = new createEl("div", "leftPane");
    leftPane.setHTML(`${idx + 1}. ${project.name}`);

    let rightPane = new createEl("div", "rightPane");
    rightPane.setHTML(`<i class="fas fa-trash-alt"></i>`);
    rightPane.el.addEventListener("click", () => {
      if (projects.filter(() => projects[idx] === projects[0])) {
        projects.splice(idx, 1);

        //Save to Storage
        saveToStorage("Data", projects);
      } else {
        projects.splice(idx, idx);

        //Save to Storage
        saveToStorage("Data", projects);
      }
      appendToP();
    });
    let btn = new createEl("button", "todo1");
    btn.el.append(leftPane.el);
    btn.el.append(rightPane.el);
    btn.setID(idx);
    projectEl.append(btn.el);

    btn.el.addEventListener("click", () => {
      updateDOM(idx);
    });

    if (btn.el.id === "0") {
      btn.el.click();
    }
  });
}

export { addProject, appendToP };
