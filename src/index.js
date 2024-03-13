import "./style.css";
import { addProject, appendToP } from "./addProject";

function todoObj(title, description, dueDate, priority, checkList) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.checkList = checkList;
}
appendToP();
addProject();

export { todoObj };
