import {
	hideButtons
} from "./Buttons.mjs";

const LETTER_DELAY = 20;
const WORD_DELAY = 60;

const warReport = document.querySelector('#warReport');
const messageElement = document.querySelector('#message-element');


export function showWarReport() {
	warReport.style.display = "block";
}

export function resetMessage() {
	message = "";
	messageElement.innerText = "";
	hideButtons();
}

export function report(message, callback) {
	if (message.length === 0) return;
	messages.push(message);
	const messageWords = message.split(' ');
	iterateWords(messageWords, 0, callback);
}

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const unspoolCurrentWord = word => {
	return new Promise((resolve, reject) => {
		try {
			console.log(word);
			let letterCounter = 0;
			const letterInterval = setInterval(() => {
				if (letterCounter === 0) {
					messageElement.innerText += ` ${word[letterCounter]}`;
				}
				else {
					messageElement.innerText += word[letterCounter];
				}
				letterCounter++;
				if (letterCounter >= word.length) {
					clearInterval(letterInterval);
					resolve('word unspooled');
				}
			}, LETTER_DELAY);
		}
		catch (error) {
			reject(`Error: ${error}`);
		}
	});
}

const iterateWords = (messageWords, index, callback) => {
	if (index === messageWords.length) return;
	unspoolCurrentWord(messageWords[index])
	.then(() => delay(WORD_DELAY))
	.then(() => iterateWords(messageWords, index + 1))
	.then(() => {
		if (callback) {
			callback();
		}
	});
}