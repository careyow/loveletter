const wrapper = document.getElementById("wrapper");
const pages = document.querySelectorAll(".letter-page");

let state = 0; 
let pagesRead = 0; 

// --- ENVELOPE INTERACTION ---
wrapper.addEventListener("click", (e) => {
  // Phase 1: Open Flap
  if (state === 0) {
    wrapper.classList.add("open1");
    state = 1;
  } 
  // Phase 2: Pull Letter Out
  else if (state === 1) {
    wrapper.classList.add("open2");
    state = 2;
    pagesRead = 0; 
  }
  // Phase 3: Read Pages
  else if (state === 2) {
    const clickedPage = e.target.closest(".letter-page");

    // Only allow clicking the visible top page
    if (clickedPage && clickedPage === pages[pagesRead]) {
       clickedPage.classList.add("slide-away");
       pagesRead++;
    }
    
    // If all pages are read, mark as finished
    if (pagesRead === pages.length) {
       state = 3; 
    }
  }
  // Phase 4: Reset
  else if (state === 3) {
    wrapper.classList.remove("open1", "open2");
    setTimeout(() => {
       pages.forEach(page => {
          page.classList.remove("slide-away");
       });
    }, 600);
    state = 0;
    pagesRead = 0;
  }
});