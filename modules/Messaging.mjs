import {
	hideButtons
} from "./Buttons.mjs";

const DELAY = 10;

const warReport = document.querySelector('#warReport');
const messageP = document.querySelector('#message-p');


export function showWarReport() {
	warReport.style.display = "block";
}

export function resetMessage() {
	message = "";
	messageP.innerText = "";
	hideButtons();
}

export function report(message, nextFunction) {
	if (message.length === 0) return;
	console.log('report initiated');
	messages.push(message);
	controlDeliverySpeed(message)
		.then(() => {
			if (nextFunction) {
				nextFunction();
			}
		});
}

function controlDeliverySpeed(message) {
	return new Promise((resolve, reject) => {
		try {
			let counter = 0;
			const letterInterval = setInterval(() => {
				if (message[counter] !== " ") {
					messageP.innerText += message[counter];
					counter++
				} else {
					messageP.innerText += message.slice(counter, counter + 2)
					counter += 2
				}
				// messageP.textContent += message[i];
				// i++;
				if (counter >= message.length) {
					clearInterval(letterInterval);
					resolve('message delivered');
				}
			}, DELAY);
		} catch (error) {
			reject(`Error: ${error}`);
		}
	});
}