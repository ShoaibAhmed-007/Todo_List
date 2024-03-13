//Function to set color of Task according to Priority
function setPriority(domEl, pDom) {
  if (pDom === "Low") {
    domEl.setAtr("style", "border-left: solid 15px green");
  } else if (pDom === "Medium") {
    domEl.setAtr("style", "border-left: solid 15px yellow;");
  } else if (pDom === "High") {
    domEl.setAtr("style", "border-left: solid 15px red");
  }
}

//Function to get Priority value from User
function getPriority(r1, r2, r3) {
  if (r1.checked) {
    return r1.value;
  } else if (r2.checked) {
    return r2.value;
  } else if (r3.checked) {
    return r3.value;
  }
}

export { setPriority, getPriority };
