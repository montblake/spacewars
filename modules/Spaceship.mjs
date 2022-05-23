import { chooseWeapons } from "./Weapons.mjs";
import { renderGameOptions } from "./Buttons.mjs";
import { report } from "./Messaging.mjs";


export default class Spaceship {
	constructor(name, hull, weaponsAvailable) {
		this.name = name;
		this.hullMax = hull || (Math.floor(Math.random() * 4) + 3);
		this.hullCurrent = this.hullMax;
		// original version: ship had no weapon choice, only a general firepower and accuracy rating;
		// this.firepower = firepower || (Math.floor(Math.random() * 3) + 2);
		// this.accuracy = accuracy || ((Math.floor(Math.random() * 4) + 5) / 10);
		this.basicWeaponPackage = [{
			name: "Space Laser",
			accuracy: .5,
			firepower: 3
		}];
		this.weapons = weaponsAvailable || this.basicWeaponPackage;
	}

	attack(target, chosenWeapon) {
		// target is a ship object
		// currently: weapon is chosen at random from this.weapons
		console.log('attack:', this);

		// add to message
		message += `${this.name} fires ${chosenWeapon.name}! `;
		console.log(message);

		// having fired, determine hit or miss
		if (Math.random() < chosenWeapon.accuracy) {
			// add to message, it is a hit
			message += `\n${this.name} hits ${target.name}!`;
			console.log(message);
			target.hullCurrent -= chosenWeapon.firepower;

		} else {
			// add to message in case of miss
			message += `\nBad aim. ${this.name} misses ${target.name}!`;
			console.log(message);

		}
	}
}

// FUNCTIONS RELATED/LEADING TO THE CREATION OF THE HERO SPACESHIP
export function handleShipNameSubmit() {
	const shipName = document.querySelector('#ship-name-input').value;
	if (!shipName || shipName === "") return;
	createShip(shipName);
}

function createShip(shipName) {
	const ourWeapons = chooseWeapons();
	ourShip = new Spaceship(shipName, 20, ourWeapons);
	console.log(ourShip);
	removeShipForm();
	renderShip(ourShip);

	progress.style.display = "flex";
	let welcomeMessage = 'You have successfully created your ship.';
	report(welcomeMessage, renderGameOptions);
}

function removeShipForm() {
	const formToRemove = document.querySelector('#our-ship-form');
	formToRemove.remove();
}

function renderShip(ship) {
	const shipContainer = document.createElement('div');
	shipContainer.id = "ship-container";

	const shipHeader = document.createElement('div');
	shipHeader.id = "our-ship-header";

	const shipTitle = document.createElement('h2');
	shipTitle.textContent = ship.name;
	shipHeader.appendChild(shipTitle);
	const shipClass = document.createElement('h4');
	shipClass.textContent = "Class: Flying Fortress";
	shipHeader.appendChild(shipClass);
	shipContainer.appendChild(shipHeader);

	// hull
	const shipHull = document.createElement('div');
	shipHull.id = "our-ship-hull";
	const shipHullHeader = document.createElement('h3');
	shipHullHeader.textContent = "Hull Strength";
	shipHull.appendChild(shipHullHeader);
	const shipHullCurrent = document.createElement('h4');
	shipHullCurrent.id = "our-ship-hull-current";
	shipHullCurrent.textContent = `Current: ${ship.hullCurrent}`;
	shipHull.appendChild(shipHullCurrent);
	const shipHullMax = document.createElement('h4');
	shipHullMax.textContent = `Structural Max: ${ship.hullMax}`;
	shipHull.appendChild(shipHullMax);
	shipContainer.appendChild(shipHull);

	// weapons
	const shipWeapons = document.createElement('div');
	shipWeapons.id = "ship-weapons";
	const shipWeaponsHeader = document.createElement('h3');
	shipWeaponsHeader.textContent = "Weapons Available";
	shipWeapons.appendChild(shipWeaponsHeader);
	for (let weapon of ship.weapons) {
		console.log(weapon);
		const weaponDiv = document.createElement('div');
		const weaponName = document.createElement('h4');
		weaponName.innerHTML = `${weapon.name} <span>Accuracy: ${weapon.accuracy}, Firepower: ${weapon.firepower}</span>`;

		weaponDiv.appendChild(weaponName);

		shipWeapons.appendChild(weaponDiv);
	}
	shipContainer.appendChild(shipWeapons);
	const ourShipSection = document.querySelector('#our-ship-section');
	ourShipSection.appendChild(shipContainer);
}