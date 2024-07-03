'use strict';

// Disable right-click
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        // Disable specific key combinations
        document.addEventListener('keydown', function(event) {
            if ((event.ctrlKey && (event.key === 's' || event.key === 'u' || event.key === 'p' || event.key === 'c' || event.key === 'a')) ||
                (event.metaKey && (event.key === 's' || event.key === 'u' || event.key === 'p' || event.key === 'c' || event.key === 'a'))) {
                event.preventDefault();
            }
            if (event.key === 'PrintScreen') {
                event.preventDefault();
            }
        });

        // Prevent text selection and copying
        document.addEventListener('selectstart', function(event) {
            event.preventDefault();
        });
        
        document.addEventListener('copy', function(event) {
            event.preventDefault();
        });

        // Additional measure to disable right-click on all elements
        document.querySelectorAll('*').forEach(element => {
            element.addEventListener('contextmenu', function(event) {
                event.preventDefault();
            });
        });


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sentence for random
const sentences = [
  "Web Developer.",
  "Video Editor.",
  "Professional Programmer.",
  "Computer Engineer"
];

// typewriter intro
const typewriterElement = document.getElementById('typewriter');

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Function to shuffle the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
// Shuffle the sentences array
shuffle(sentences);

let partIndex = 0;
let sentenceIndex = 0;
let currentSentence = '';
let isDeleting = false;
const typeSpeed = 150;
const deleteSpeed = 75;
const delayBetweenSentences = 2000;

// add automatic changer
function type() {
  const fullSentence = sentences[sentenceIndex];
  if (isDeleting) {
      currentSentence = fullSentence.substring(0, currentSentence.length - 1);
  } else {
      currentSentence = fullSentence.substring(0, currentSentence.length + 1);
  }
  
  typewriterElement.textContent = currentSentence;

  let speed = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && currentSentence === fullSentence) {
      speed = delayBetweenSentences;
      isDeleting = true;
  } else if (isDeleting && currentSentence === '') {
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      if (sentenceIndex === 0) shuffle(sentences); // Shuffle again after one loop
      speed = typeSpeed;
  }

  setTimeout(type, speed);
}

type();

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
const targets = [
  { date: "07 Aug 2024", elementId: "days1", statusId: "status1" },
  { date: "25 Jul 2024", elementId: "days2", statusId: "status2" },
  { date: "01 Jan 2025", elementId: "days3", statusId: "status3" }
];

function countdown() {
  targets.forEach(target => {
      const targetDate = new Date(target.date);
      const currentDate = new Date();
      const totalSeconds = (targetDate - currentDate) / 1000;

      const days = Math.floor(totalSeconds / (3600 * 24));

      const element = document.getElementById(target.elementId);
      const statusElement = document.getElementById(target.statusId);

      if (totalSeconds <= 0) {
          if (element) {
              element.innerHTML = "00";
          }
          if (statusElement) {
              statusElement.innerHTML = "Completed";
          }
      } else {
          if (element) {
              element.innerHTML = formatTime(days);
          }
          if (statusElement) {
              statusElement.innerHTML = "In Progress";
          }
      }
  });
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Initial call to set the countdown immediately on page load
countdown();

// Update the countdown every second
setInterval(countdown, 1000);


