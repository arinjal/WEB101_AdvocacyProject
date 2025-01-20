let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {
  let nameInput = document.getElementById('name');
  let hometownInput = document.getElementById('hometown');
  let emailInput = document.getElementById('email');

  let name = nameInput.value;
  let hometown = hometownInput.value;

  let newSignature = document.createElement('p');

  let signatureText = ` 🖊️  ${person.name} from ${person.hometown} supports this.`;

  let signatureNode = document.createTextNode(signatureText);

  newSignature.appendChild(signatureNode);

  let signaturesSection = document.getElementById('signatures');  
  signaturesSection.appendChild(newSignature);

  nameInput.value = '';
  hometownInput.value = '';
  emailInput.value = '';

  toggleModal(person);
};

const validateForm = () => {
let containsErrors = false;
let petitionInputs = [...document.getElementById("sign-petition").elements];
  
let person = {
  name: petitionInputs[0].value,
  hometown: petitionInputs[1].value,
  email:  petitionInputs[2].value};
    for (let i = 0; i < petitionInputs.length; i++) {
      if (person.hometown.length < 2) {
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      }
        else {
          petitionInputs[i].classList.remove('error');
        }
      }
  if (!containsErrors) {  
    addSignature(person);

    let buttonContainer = document.getElementById('sign-now-button');
    buttonContainer.scrollIntoView({ behavior: 'smooth' });
    
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    containsErrors = false;
  }
}
signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function reveal() {
  
  for (let i = 0; i < revealableContainers.length; i++) {
    let container = revealableContainers[i];

    let windowHeight = window.innerHeight;

    let topOfRevealableContainer = container.getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
     
      container.classList.add('active');
    } else {
     
      container.classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

const toggleModal = (person) => {
  // Select modal and modalContent elements
  let modal = document.getElementById('thanks-modal');
  let modalContent = document.getElementById('thanks-modal-content');

  modal.style.display = 'flex';

  modalContent.textContent = `Thank you, ${person.name}, for supporting our cause all the way from ${person.hometown}!`;
};

let closeModalButton = document.getElementById('close-modal-button');
let modal = document.getElementById('thanks-modal');

const closeModal = () => {
  modal.style.display = 'none';
};

closeModalButton.addEventListener('click', closeModal);