function main() {
    let menuItems = document.getElementsByClassName("menu-item");
    let menuSize = menuItems.length;
    let selectedIdx = 0;
    document.addEventListener("keydown", handleKeyDown);


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
}



main();
