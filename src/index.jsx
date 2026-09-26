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
  document.querySelector(`[data-idx="${activeIdx}"]`).classList.remove("active");
  if (remainingSteps > 0) {
    shiftPositionsUp();
    activeIdx === boxes.length - 1 ? (activeIdx = 0) : activeIdx++;
  } else if (remainingSteps < 0) {
    shiftPositionsDown();
    activeIdx === 0 ? (activeIdx = boxes.length - 1) : activeIdx--;
  }
  document.querySelector(`[data-idx="${activeIdx}"]`).classList.add("active");
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
    document.querySelector(`[data-idx="${activeIdx}"]`).classList.remove("active");
    if (e.key === "ArrowUp") {
      shiftPositionsDown();
      activeIdx === 0 ? (activeIdx = boxes.length - 1) : activeIdx--;
      disableControls = true;
    } else if (e.key === "ArrowDown") {
      shiftPositionsUp();
      activeIdx === boxes.length - 1 ? (activeIdx = 0) : activeIdx++;
      disableControls = true;
    }
    document.querySelector(`[data-idx="${activeIdx}"]`).classList.add("active");
    setTimeout(() => {
      disableControls = false;
    }, menuTimeoutMS);
  }
}

function changeContent(hash = window.location.hash){
  const content = document.getElementById("content");
  const bgIcons = document.getElementsByClassName("bg-icon");
  const setBgIconsHTML = (html) => {
    for (const bgIcon of bgIcons) {
      bgIcon.innerHTML = html;
    }
  };
  switch(hash){
    case "#contact":
      content.innerHTML = <markup path="src/content_pages/contact.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>megaphone-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Q3_icons" data-name="Q3 icons"> <g> <path d="M34,6h-.6l-30,8.8A2,2,0,0,0,2,16.8v9a2.2,2.2,0,0,0,1.4,2l30,8.8H34a2,2,0,0,0,2-2V8A2,2,0,0,0,34,6ZM19.1,34.2,8.4,31l1.3,8.4A2.9,2.9,0,0,0,12.6,42h4.5a2.8,2.8,0,0,0,2.1-1,3.4,3.4,0,0,0,.8-2.6Z"></path> <path d="M40,15.3a1.5,1.5,0,0,0,.9-.2l4-2a2,2,0,0,0-1.8-3.6l-4,2a2,2,0,0,0-.9,2.7A2.1,2.1,0,0,0,40,15.3Z"></path> <path d="M44.9,29.6l-4-2a2.1,2.1,0,0,0-2.7.8,2,2,0,0,0,.9,2.7l4,2a1.5,1.5,0,0,0,.9.2,2.1,2.1,0,0,0,1.8-1.1A1.9,1.9,0,0,0,44.9,29.6Z"></path> <path d="M40,23.3h4a2,2,0,0,0,0-4H40a2,2,0,0,0,0,4Z"></path> </g> </g> </g> </g></svg>');
      break;
    case "#resume":
      content.innerHTML = <markup path="src/content_pages/resume.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M107.144 151.822C125.387 123.149 172.933 150.894 145.402 178.522C121.728 202.27 97.2165 175.079 108.809 151.822" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M122.974 212.302C125.153 228.19 81.2981 324.169 91.3644 307.561" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M115.677 251.155C161.521 223.509 132.314 288.796 148.868 280.447" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M123.053 212.302C144.827 207.048 162.33 196.81 180.831 186.468" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M354.165 160.635C252.238 223.748 152.551 294.348 46.8345 345.159" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M183.183 91.4691C298.323 -27.1136 376.95 176.85 262.758 215.315C197.875 237.172 150.585 139.072 187.809 98.9482" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>');
      break;
    case "#projects":
      content.innerHTML = <markup path="src/content_pages/projects.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" fill="#000000"></path> <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" fill="#000000"></path> <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z" fill="#000000"></path> </g></svg>');
      break;
    case "#links":
      content.innerHTML = <markup path="src/content_pages/links.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L12.5 6.06212" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g>');
      break;
    case "#home":
    default:
      content.innerHTML = <markup path="src/content_pages/home.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z" fill="#000000"></path> </g></svg>');
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
document.querySelector(`[data-idx="${activeIdx}"]`).classList.add("active"); //set active border
changeContent();
document.addEventListener("keydown", (e) => {
  if(["ArrowDown", "ArrowUp"].includes(e.key)){
    handleMenuChange(e)
  }
});

window.addEventListener("hashchange",() => {
  changeContent();
})
