import { renderEncounterOptions , renderGameOptions, removeButtons, showButtons } from "./Buttons.mjs";
import { report } from "./Messaging.mjs";

export function assessDamage(attacker, target) {
	if (target.hullCurrent <= 0) {
		message += `\n${attacker.name} destroys ${target.name}!`;
		alienFleet.shift();
		message += `\n${alienFleet.length} alien ships remain.`
	} else {
		message += `\n${target.name} has ${target.hullCurrent} hull points remaining.`
	}

	message += "\n";

	if (ourShip.hullCurrent <= 0 || alienFleet.length === 0) {
		gameOver = true;
	}
	message += '\n';
}

export function endOfRound(shipRetreating = false) {
	console.log('end of round processing');
	if (gameOver) {
		if (shipRetreating) {
			removeButtons();
			console.log('retreat underway');
			message = 'You live to fight another day.';
			report(message);
			renderGameOptions();
			// setTimeout(()=>{
			showButtons();
			// }, 1000);
			return;
		} else {
			setTimeout(() => {
				if (ourShip.hullCurrent <= 0) {
					message = 'The aliens are victorious. Mankind is doomed.';
				} else {
					message = 'The aliens are defeated. Mankind is saved.';
				}
				report(message);
			}, 1000);
		}

	} else {
		console.log('the encounter continues');
		renderEncounterOptions();
	}
}

export function damageInTheDom(callback) {
	// update value in the DOM
	const shipHullCurrent = document.querySelector('#our-ship-hull-current');
	console.log(ourShip.hullCurrent);
	console.log('?:', shipHullCurrent.textContent.split(" ")[1]);
	if (ourShip.hullCurrent != shipHullCurrent.textContent.split(" ")[1]) {
		shipHullCurrent.style.color = 'orangered';
		shipHullCurrent.textContent = `Current: ${ourShip.hullCurrent}`;
		setTimeout(() => {
			shipHullCurrent.style.color = 'rgb(0, 224, 18)';
		}, 500);
	}
	if (callback) {
		setTimeout(() => {
			callback();
		}, 500);
	}
}