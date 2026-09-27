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
      setBgIconsHTML('<svg fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M100,18.54C45,18.54,10,52,10,93s35,74.5,90,74.5c9.5,0,22.5-1.5,30-4L159,180c6.5,4,15-1,15-8.5v-36c.5-.5.5-1,1-1,10-15,15-22.5,15-41.5C190,52,155,18.54,100,18.54Zm67.5,89a168.37,168.37,0,0,1-10,17c-2,3.5-3.5,7-3.5,11v19L140,146a18.22,18.22,0,0,0-16-1.5c-4.5,1.5-15,2.5-23.5,2.5-47,0-70-27-70-54.5-.5-27,22.5-54,69.5-54s70,27,70,54.5c0,7.5-1,11-2.5,14.5ZM85,93.54a15,15,0,1,0,15-15A15,15,0,0,0,85,93.54Zm-40,0a15,15,0,1,0,30,0h0a15,15,0,0,0-30,0Zm80,0a15,15,0,0,0,30,0v0a15,15,0,1,0-30,0Z"></path></g></svg>');
      break;
    case "#resume":
      content.innerHTML = <markup path="src/content_pages/resume.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M107.144 151.822C125.387 123.149 172.933 150.894 145.402 178.522C121.728 202.27 97.2165 175.079 108.809 151.822" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M122.974 212.302C125.153 228.19 81.2981 324.169 91.3644 307.561" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M115.677 251.155C161.521 223.509 132.314 288.796 148.868 280.447" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M123.053 212.302C144.827 207.048 162.33 196.81 180.831 186.468" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M354.165 160.635C252.238 223.748 152.551 294.348 46.8345 345.159" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M183.183 91.4691C298.323 -27.1136 376.95 176.85 262.758 215.315C197.875 237.172 150.585 139.072 187.809 98.9482" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>');
      break;
    case "#code":
      content.innerHTML = <markup path="src/content_pages/code.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8ZM5.5 8V16M5.5 16C4.11929 16 3 17.1193 3 18.5C3 19.8807 4.11929 21 5.5 21C6.88071 21 8 19.8807 8 18.5C8 17.1193 6.88071 16 5.5 16ZM18.5 8C19.8807 8 21 6.88071 21 5.5C21 4.11929 19.8807 3 18.5 3C17.1193 3 16 4.11929 16 5.5C16 6.88071 17.1193 8 18.5 8ZM18.5 8C18.5 8.92997 18.5 9.39496 18.3978 9.77646C18.1204 10.8117 17.3117 11.6204 16.2765 11.8978C15.895 12 15.43 12 14.5 12H8.5C6.84315 12 5.5 13.3431 5.5 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>');
      break;
    case "#video":
      content.innerHTML = <markup path="src/content_pages/video.html"/>;
      setBgIconsHTML('<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20 11.5H3V20.5C3 21.0523 3.44772 21.5 4 21.5H20C20.5523 21.5 21 21.0523 21 20.5V12.5C21 11.9477 20.5523 11.5 20 11.5Z" stroke="#000000" stroke-linejoin="round"></path> <path d="M1.59998 7.40002L17.5747 1.58568C18.0937 1.39679 18.6676 1.66438 18.8565 2.18335L19.5405 4.06274C19.7294 4.58172 19.4618 5.15556 18.9428 5.34445L2.96806 11.1588L1.59998 7.40002Z" stroke="#000000" stroke-linejoin="round"></path> <path d="M15.6954 2.26973L15.1841 6.71254" stroke="#000000"></path> <path d="M11.9366 3.6378L11.4253 8.08061" stroke="#000000"></path> <path d="M8.17785 5.00589L7.66654 9.4487" stroke="#000000"></path> <path d="M4.41906 6.37397L3.90775 10.8168" stroke="#000000"></path> </g></svg>');
      break;
    case "#home":
    default:
      content.innerHTML = <markup path="src/content_pages/home.html"/>;
      setBgIconsHTML('<svg fill="#000000" viewBox="-25.6 -25.6 307.20 307.20" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M168,30.99268A8.00009,8.00009,0,0,1,176,23h.00781A60.21143,60.21143,0,0,1,227.9541,53.00439a8.00044,8.00044,0,1,1-13.85742,8A44.16357,44.16357,0,0,0,175.99219,39,8,8,0,0,1,168,30.99268Zm60.99512,139.772A88.01088,88.01088,0,0,1,67.7832,191.98828l-42-72.74609A27.991,27.991,0,0,1,47.77832,77.33807L44.4248,71.5293A28.00473,28.00473,0,0,1,87.44922,36.74976a27.99212,27.99212,0,0,1,48.11328.63549l17.34326,30.04a28.01379,28.01379,0,0,1,47.29834,1.92243l19.999,34.64062A87.41865,87.41865,0,0,1,228.99512,170.76465Zm-22.64746-58.77637-20-34.64062A12.00012,12.00012,0,1,0,165.5625,89.34717l10,17.3208a7.98085,7.98085,0,0,1,.36475.7121c.08007.17706.1455.35723.21191.53735.02393.0647.05322.12756.0752.19281.0747.22082.13574.44385.19043.66772.00634.02771.01611.05469.02294.08252.05323.23029.09327.4618.126.69373.00342.02508.00977.04974.01318.07489.02881.22156.04444.44342.05469.66522.00147.03882.00733.07733.00879.11621.00635.20417-.00049.40753-.00976.61078-.00245.05823,0,.11633-.00391.17456-.0127.19092-.03858.38007-.06494.56922-.00977.06988-.01319.14013-.0249.2099-.0376.227-.08838.45141-.145.67419-.00782.02972-.01172.05994-.01954.0896-.0083.0304-.0205.05914-.0288.08942-.062.22088-.13038.44-.21094.655-.02246.05945-.05127.11567-.07471.17444-.07422.18415-.1499.36774-.2373.54621-.02149.0429-.04688.083-.06885.12548-.09815.19062-.19971.37934-.31348.5622-.01318.02112-.02832.04053-.0415.06152-.12647.19947-.25977.3949-.4043.5835l-.01758.02087q-.22925.29737-.48779.575l-.01611.01586c-.17188.18268-.352.35907-.543.52668-.03125.0274-.06592.051-.09766.07788-.166.1416-.33545.28088-.51562.41009a7.96868,7.96868,0,0,1-.66992.43329,32.00043,32.00043,0,0,0-11.71387,43.71289,7.99959,7.99959,0,1,1-13.85547,8,48.025,48.025,0,0,1,10.9707-60.998L151.707,97.34766l-.00244-.0044L121.707,45.38574a12.00023,12.00023,0,1,0-20.78515,12l25.999,45.03369a8,8,0,0,1-13.85645,8l-26-45.03369-.01562-.02826L79.06543,51.5293A12.00012,12.00012,0,0,0,58.28027,63.52881l15.99707,27.7077.00293.00519,22,38.106A7.95946,7.95946,0,0,1,92.47852,140.706c-.08643.03675-.17334.06806-.26026.10157q-.33105.12771-.66748.22454c-.08935.02564-.17773.05225-.26758.07465a7.93311,7.93311,0,0,1-.84131.16473c-.0249.00342-.0498.00989-.0747.01307a7.94421,7.94421,0,0,1-.93018.05963c-.02539.00024-.05127.00494-.07666.00494-.05273,0-.10449-.00915-.15723-.01019q-.364-.00723-.72412-.04675c-.08593-.00953-.17138-.01832-.25683-.03058a8.05171,8.05171,0,0,1-.85449-.16712c-.01954-.00506-.03956-.00769-.05909-.01288a8.05256,8.05256,0,0,1-.88867-.29571c-.07471-.0293-.14648-.06305-.22021-.09454q-.33106-.14174-.64844-.313c-.07617-.041-.15186-.08075-.22705-.12421a8.0088,8.0088,0,0,1-.76807-.50262l-.01758-.012a8.00346,8.00346,0,0,1-.72412-.62359c-.06006-.05823-.11767-.12-.17627-.1803q-.25928-.26541-.4956-.5578c-.05469-.06781-.11035-.134-.16309-.204a8.01625,8.01625,0,0,1-.55566-.82623l-22-38.10547a11.99994,11.99994,0,0,0-20.78418,12.00049l42,72.7456a72.00015,72.00015,0,0,0,124.708-72ZM85.65234,233.42871a103.08083,103.08083,0,0,1-30.72461-33.438,7.99959,7.99959,0,1,0-13.85546,8,118.949,118.949,0,0,0,35.46289,38.58643,8.00007,8.00007,0,1,0,9.11718-13.14844Z"></path> </g></svg>');
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
