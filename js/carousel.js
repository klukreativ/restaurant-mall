// grabs all slides
const slides = document.querySelectorAll('.slide');

// loop through slides and set each slides translateX property to index * 100% 
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// current slide counter starts at -1 as autoScroll runs on page load pushing to 0
let curSlide = -1;

// updates slide location
function moveSlide() {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

// function that updates all classes to active or not on every change
function classToggle(activeButton) {
  for (i = 0; i < 4; i++) {
    i != activeButton ? newBtns[i].classList.remove('active') : newBtns[i].classList.add('active');
  }
}

// autoscroll feature that will scroll through each slide every 5s
function autoScroll() {
  curSlide++;
  curSlide < 4 ? '' : curSlide = 0;
  classToggle(curSlide);
  moveSlide();
  setTimeout(autoScroll, 5000);
}

// initialized on page load 
const icons = ['location-dot-solid', 'users-solid', 'file-solid', 'phone-flip-solid'];

const buttonContainer = document.querySelector('.buttonContainer');

for (i = 0; i < 4; i++) {
  buttonContainer.innerHTML += (
    `<div class='slideBtn'>
      <img src='./assets/${icons[i]}.svg' class='infoIcons'>
    </div>
    `
  )
}

// gathers all slide buttons
slideBtns = document.querySelectorAll('.slideBtn');
// assigns event listener to each button that allows it to direct to its own slide on click
for (i = 0; i < 4; i++) {
  let j = i;
  slideBtns[i].addEventListener('click', function () {
    classToggle(j);
    curSlide = j;
    moveSlide();
  })
}

autoScroll();