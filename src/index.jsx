let boxes = document.getElementsByClassName("box");

const menuTimeoutMS = 225; //timeout 25 ms < animation duration in css
let disableControls = false;
let activeIdx = 2;
const boxWidth = boxes[0].offsetWidth;
const boxHeight = boxes[0].offsetHeight;
let positions = [];

const endVisIdx = Math.floor((boxes.length - 1) / 2);
const medianVisIdx = Math.floor(boxes.length / 4);

function calculateVisibleLeft(idx, median, offsetStep, end) {
  if (idx <= median) {
    return idx * offsetStep;
  } else {
    return (end - idx) * offsetStep;
  }
}

function calculateVisibleTop(idx, height, offset) {
  if (idx === 0) {
    return 0;
  } else {
    return height * idx + offset * idx;
  }
}

function calculateInvisibleTop(idx, height, offset) {
  if (idx === boxes.length - 1) {
    return -height;
  } else {
    return height * (boxes.length / 2) + offset * (boxes.length / 2);
  }
}

function shiftPositionsDown() {
  let tmpArr = Array(boxes.length);

  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    if (i === boxes.length - 1) {
      box.style.top = positions[0][1] + "px";
      box.style.left = positions[0][0] + "px";
      tmpArr[0] = box;
    } else {
      box.style.top = positions[i + 1][1] + "px";
      box.style.left = positions[i + 1][0] + "px";
      tmpArr[i + 1] = box;
    }
  }
  boxes = tmpArr;
}

function shiftPositionsUp() {
  let tmpArr = Array(boxes.length);
  for (let i = boxes.length - 1; i >= 0; i--) {
    let box = boxes[i];
    if (i === 0) {
      box.style.top = positions[boxes.length - 1][1] + "px";
      box.style.left = positions[boxes.length - 1][0] + "px";
      tmpArr[boxes.length - 1] = box;
    } else {
      box.style.top = positions[i - 1][1] + "px";
      box.style.left = positions[i - 1][0] + "px";
      tmpArr[i - 1] = box;
    }
  }
  boxes = tmpArr;
}

function animateClickSteps(remainingSteps) {
  if (remainingSteps > 0) {
    shiftPositionsUp();
    activeIdx === boxes.length - 1 ? (activeIdx = 0) : activeIdx++;
  } else if (remainingSteps < 0) {
    shiftPositionsDown();
    activeIdx === 0 ? (activeIdx = boxes.length - 1) : activeIdx--;
  }

  if (remainingSteps > 1) {
    disableControls = true;
    setTimeout(() => animateClickSteps(remainingSteps - 1), menuTimeoutMS);
  } else if (remainingSteps < -1) {
    disableControls = true;
    setTimeout(() => animateClickSteps(remainingSteps + 1), menuTimeoutMS);
  } else {
    disableControls = false;
  }
}

function animate(e) {
  if (disableControls) {
    return;
  }
  if (e.type === "click") {
    let selectedIdx = parseInt(e.target.getAttribute("data-idx"));
    let steps = selectedIdx - activeIdx;
    steps = ((steps % boxes.length) + boxes.length) % boxes.length;
    if (steps > boxes.length / 2) {
      steps -= boxes.length;
    }
    if (steps !== 0) {
      animateClickSteps(steps);
    }
  } else if (e.type === "keydown") {
    if (e.key === "ArrowDown") {
      shiftPositionsDown();
      activeIdx === 0 ? (activeIdx = boxes.length - 1) : activeIdx--;
      disableControls = true;
    } else if (e.key === "ArrowUp") {
      shiftPositionsUp();
      activeIdx === boxes.length - 1 ? (activeIdx = 0) : activeIdx++;
      disableControls = true;
    }
    setTimeout(() => {
      disableControls = false;
    }, menuTimeoutMS);
  }
}

function changeContent(hash = window.location.hash){
  const content = document.getElementById("content");
  switch(hash){
    case "#contact":
      content.innerHTML = <markup path="src/content_pages/contact.html"/>;
      break;
    case "#resume":
      content.innerHTML = <markup path="src/content_pages/resume.html"/>;
      break;
    case "#projects":
      content.innerHTML = <markup path="src/content_pages/projects.html"/>;
      break;
    case "#links":
      content.innerHTML = <markup path="src/content_pages/links.html"/>;
      break;
    case "#home":
    default:
      content.innerHTML = <markup path="src/content_pages/home.html"/>;
      break;
  }
}

function handleMenuChange(e){
  if (disableControls) {
    return;
  }
  animate(e);
  const idx = e.type === "click" ? parseInt(e.currentTarget.getAttribute("data-idx")) : activeIdx;
  const anchor = document.querySelector(`[data-idx="${idx}"]`).parentElement;
  window.location.hash = anchor.getAttribute("href");
}

//INIT
for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  box.setAttribute("data-idx", i);
  box.addEventListener("click", handleMenuChange);
  if (i < boxes.length / 2) {
    let leftValue = calculateVisibleLeft(i, medianVisIdx, 20, endVisIdx);
    let topValue = calculateVisibleTop(i, boxHeight, 10);
    box.style.top = topValue + "px";
    box.style.left = leftValue + "px";
    positions.push([leftValue, topValue]);
  } else {
    let topValue = calculateInvisibleTop(i, boxHeight, 10);
    box.style.top = topValue + "px";
    box.style.left = -boxWidth + "px";
    positions.push([-boxWidth, topValue]);
  }
}

changeContent();
document.addEventListener("keydown", (e) => {
  if(["ArrowDown", "ArrowUp"].includes(e.key)){
    handleMenuChange(e)
  }
});

window.addEventListener("hashchange",() => {
  changeContent();
})
