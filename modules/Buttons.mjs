import { handlePlay, handleQuit, handleAttack, handleRetreat } from "./EventHandlers.mjs";


export function renderGameOptions() {
	const actionsDiv = document.querySelector('#actions');
	const playBtn = document.createElement('button');
	playBtn.id = "continueBtn";
	playBtn.innerText = "Play";
	const quitBtn = document.createElement('button')
	quitBtn.id = "quitBtn";
	quitBtn.innerText = "Quit";
	actionsDiv.appendChild(playBtn);
	playBtn.addEventListener('click', handlePlay);
	actionsDiv.appendChild(quitBtn);
	quitBtn.addEventListener('click', handleQuit);
	showButtons();
}

export function renderEncounterOptions() {
	const actionsDiv = document.querySelector('#actions')
	const attackBtn = document.createElement('button')
	attackBtn.id = "attackBtn"
	attackBtn.innerText = "Attack"
	const retreatBtn = document.createElement('button')
	retreatBtn.id = "retreatBtn"
	retreatBtn.innerText = "Retreat"
	actionsDiv.appendChild(attackBtn);
	actionsDiv.appendChild(retreatBtn);
	attackBtn.addEventListener('click', handleAttack);
	retreatBtn.addEventListener('click', handleRetreat);
	showButtons();
}

export function removeButtons() {
	const actionsDiv = document.querySelector('#actions');
	console.log(actionsDiv.hasChildNodes());
	while (actionsDiv.hasChildNodes()) {
		actionsDiv.childNodes[0].remove();
	}
}

export function hideButtons() {
	const buttons = document.querySelector('#actions').childNodes;
	for (let btn of buttons) {
		btn.style.opacity = "0%";
	}
}

export function showButtons() {
	const buttons = document.querySelector('#actions').childNodes;
	setTimeout(() => {
		for (let btn of buttons) {
			btn.style.opacity = "100%";
		}
	}, 250);
}