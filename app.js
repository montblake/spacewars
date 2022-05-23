import { handleShipNameSubmit } from "./modules/Spaceship.mjs";

// const newShip = new Spaceship("Alien Ship");
// console.log(newShip);

// GAME VARIABLES
// these properties written onto the window object are accessible in all modules
// perhaps there is a better, more protected/scoped alternative.
window.gameOver = false;
window.message = "";
window.messages = [];
window.alienFleet = [];
window.ourShip = null;



// By Submitting Ship Name, events are set in motion ...
// DOM ELEMENTS
const submitNameBtn = document.querySelector('#ship-name-submit');

// EVENT LISTENERS
submitNameBtn.addEventListener('click', handleShipNameSubmit);
