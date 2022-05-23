import { hideButtons } from "./Buttons.mjs";


const DELAY = 10;

const warReport = document.querySelector('#warReport');
const progress = document.querySelector('#progress');
const messageP = document.querySelector('#message-p');


export function showWarReport() {
    warReport.style.display = "block";
}

export function resetMessage() {
    message = "";
    messageP.innerText = "";
    hideButtons();
}

export function report(message, callback) {
    let counter = 0;
    const messageInterval = setInterval(() => {
        if (message[counter] !== " ") {
            messageP.innerText += message[counter];
            counter++
        } else {
            messageP.innerText += message.slice(counter, counter + 2)
            counter += 2
        }
        if (counter >= message.length) {

            clearInterval(messageInterval);
            if (callback) {
                setTimeout(() => {
                    callback();
                }, 500);
            }
        }
    }, DELAY);
    messages.push(message)
}