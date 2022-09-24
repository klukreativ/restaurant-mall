// grabs all slides
const slides = document.querySelectorAll('.slide');

// loop through slides and set each slides translateX property to index * 100% 
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// current slide counter
let curSlide = 0;

// updates slide location
function moveSlide() {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}


// initialized on page load 
const icons = ['location-dot-solid', 'users-solid', 'file-solid', 'phone-flip-solid'];

const buttonContainer = document.querySelector('.buttonContainer');

for (i = 0; i < 4; i++) {
  buttonContainer.innerHTML += (
    `<div class='newBtn infoIconContainer'>
      <img src='./assets/${icons[i]}.svg' class='infoIcons'>
    </div>
    `
  )
}

newBtns = document.querySelectorAll('.newBtn');

for (i = 0; i < 4; i++) {
  let j = i;
  newBtns[i].addEventListener('click', function () {
    for (k = 0; k < 4; k++) {
      k != j ? newBtns[k].classList.remove('active') : newBtns[k].classList.add('active');
    }
    curSlide = j;
    moveSlide();
  })
}