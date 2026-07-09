function main() {
    let menuItems = document.getElementsByClassName("menu-item");
    let contentSection = document.getElementById("content");
    let menuSize = menuItems.length;
    let selectedIdx = 0;
    let contentPages = [
	"Hello",
	"Projects",
	"Contact",
	"Resume",
	"Links"
    ]
    menuItems[selectedIdx].classList.add("selected");
    contentSection.innerHTML = contentPages[selectedIdx];
    document.addEventListener("keydown", handleKeyDown);

    for(let i = 0; i < menuItems.length; i++){
	menuItems[i].setAttribute("data-idx",i);
	menuItems[i].addEventListener("click", handleClick);

    }
    
    function advanceOne() {
	if(selectedIdx + 1 < menuSize) {
	    selectedIdx++;
	    return;
	}

	if(selectedIdx + 1 === menuSize) {
	    selectedIdx = 0;
	    return;
	}
    }

    function retreatOne() {
	if(selectedIdx <= 0) {
	    selectedIdx = menuSize - 1;
	    return;
	} else {
	    selectedIdx--;
	    return;
	}
    }

    function setActiveMenuItem() {
	let oldActive = document.getElementsByClassName("selected")[0];
	oldActive.classList.remove("selected");
	menuItems[selectedIdx].classList.add("selected");
	contentSection.innerHTML = contentPages[selectedIdx];
    }

    function handleKeyDown(e) {
	if(e.key === "ArrowDown") {
	    advanceOne();
	} else if(e.key === "ArrowUp") {
	    retreatOne();
	} else {
	    //noop
	}
	setActiveMenuItem();
    }

    function handleClick(e) {
	let oldActive = document.getElementsByClassName("selected")[0];
	oldActive.classList.remove("selected");
	selectedIdx = parseInt(e.target.getAttribute("data-idx"));
	e.target.classList.add("selected");
	contentSection.innerHTML = contentPages[selectedIdx];
    }
}

main();
