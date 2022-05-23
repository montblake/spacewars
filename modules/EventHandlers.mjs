import { resetMessage, showWarReport, report } from "./Messaging.mjs";
import { hideButtons, removeButtons } from "./Buttons.mjs";
import { createAliens } from "./Aliens.mjs";
import { endOfRound, assessDamage, damageInTheDom } from "./BattleFunctions.mjs";


export function engage() {
    removeButtons();
    message = `Alien fleet approaching.\nThere are ${alienFleet.length} ships total.\n\nWhat would you like to do?`;
    showWarReport();
    report(message, endOfRound);
    // endOfRound();
}

export function handlePlay() {
    resetMessage();
    hideButtons();
    gameOver = false;
    const alienFleet = createAliens();
    console.log('Aliens:', alienFleet);
    engage(ourShip, alienFleet);
}

export function handleQuit() {
    console.log('thanks.');
}

// retreatAttempt is called if retreat button is clicked
export function handleRetreat() {
    resetMessage();
    removeButtons();
    alienFleet = [];
    gameOver = true;
    setTimeout(() => {
        endOfRound('retreat');
    }, 1000);
}

// battleExchange is called if attack button is clicked
export function handleAttack() {
    resetMessage();
    console.log('attacking');
    hideButtons();
    console.log(ourShip);
    console.log(alienFleet);
    // as long as we are not and the alienFleet is not destroyed, fight
    if (ourShip.hullCurrent > 0 && alienFleet.length > 0) {
        // we attack first
        // currently we attack the "first" alien and only the first alien can attack us in return
        // someday this will evolve. perhaps will be the trickiest thing to expand?

        // attack should now take a second argument: what weapon
        // for NetworkInformation, let us choose at random:
        let ourWeapon = ourShip.weapons[Math.floor(Math.random() * ourShip.weapons.length)];

        ourShip.attack(alienFleet[0], ourWeapon);
        assessDamage(ourShip, alienFleet[0])
        // report(message);
        // check if we have destroyed the whole fleet
        if (alienFleet[0]) {
            console.log('weapons:', alienFleet[0].weapons);
            // if at least one ship remains...
            let alienWeapon = alienFleet[0].weapons[Math.floor(Math.random() * alienFleet[0].weapons.length)];
            alienFleet[0].attack(ourShip, alienWeapon);
            assessDamage(alienFleet[0], ourShip);
        }
    }
    removeButtons();
    report(message, () => {
        damageInTheDom(endOfRound)
    }); // message has been building for whole round
    // endOfRound();
}