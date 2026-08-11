//Get boxes
let boxes = document.getElementsByClassName("box");


const boxWidth = boxes[0].offsetWidth;
const boxHeight = boxes[0].offsetHeight;
let positions = [];

const endVisIdx = Math.floor((boxes.length - 1)/2);
const medianVisIdx = Math.floor(boxes.length/4);

function calculateVisibleLeft(idx,median,offsetStep,end){
	if(idx <= median) {
		return idx * offsetStep;
	} else {
		return (end - idx) * offsetStep;
	}
}

function calculateVisibleTop(idx,height,offset) {
	if(idx === 0) {
		return 0;
	} else {
		return (height * idx) + (offset * idx);
	}
}

function calculateInvisibleTop(idx,height,offset) {
	if(idx === boxes.length - 1) {
		return -height;
	} else {
		return (height * (boxes.length / 2)) + (offset * (boxes.length / 2));
	}
}

//calculate box positions
for(let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
		
		if(i < (boxes.length / 2)){
			let leftValue = calculateVisibleLeft(i,medianVisIdx,10,endVisIdx);
			let topValue = calculateVisibleTop(i,boxHeight,10);
   	 	box.style.top = topValue + "px";
			box.style.left = leftValue + "px";
    	positions.push([leftValue,topValue]);
		} else {
			let topValue = calculateInvisibleTop(i,boxHeight,10);
			box.style.top = topValue + "px";
			box.style.left = -boxWidth + "px";
			positions.push([-boxWidth, topValue]);
		}
}

function shiftPositions() {
    let tmpArr = Array(boxes.length);

    for(let i = 0; i < boxes.length; i++) {
			let box = boxes[i];
	if(i === boxes.length - 1) {
	    box.style.top = positions[0][1] + "px";
			box.style.left = positions[0][0] + "px";
	    tmpArr[0] = box;
	} else {
	    box.style.top = positions[i+1][1] + "px";
			box.style.left = positions[i+1][0] + "px";
	    tmpArr[i+1] = box;
	}

    }
    boxes = tmpArr;
}

document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowDown") {
	shiftPositions();
    }
})

