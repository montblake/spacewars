const DELAY = 10;
// let gameOver = true; NOT SURE WHY THIS WAS HERE


function game(){

    class Spaceship {
        constructor(name, hull, weaponsAvailable) {
            this.name = name;
            this.hullMax = hull || (Math.floor(Math.random() * 4) + 3);
            this.hullCurrent = this.hullMax;
            // original version: ship had no weapon choice, only a general firepower and accuracy rating;
            // this.firepower = firepower || (Math.floor(Math.random() * 3) + 2);
            // this.accuracy = accuracy || ((Math.floor(Math.random() * 4) + 5) / 10);
            this.basicWeaponPackage = [{name: "Space Laser", accuracy: .5, firepower: 3}];
            this.weapons = weaponsAvailable || this.basicWeaponPackage;
        }

        attack(target, chosenWeapon) {
            // target is a ship object
            // currently: weapon is chosen at random from this.weapons
            console.log('attack:',this);
            
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

    function damageInTheDom(callback){
        // update value in the DOM
        const shipHullCurrent = document.querySelector('#our-ship-hull-current');
        console.log(ourShip.hullCurrent);
        console.log('?:', shipHullCurrent.textContent.split(" ")[1]);
        if (ourShip.hullCurrent != shipHullCurrent.textContent.split(" ")[1]) {
            shipHullCurrent.style.color = 'orangered';
            shipHullCurrent.textContent = `Current: ${ourShip.hullCurrent}`;
            setTimeout(()=>{
                shipHullCurrent.style.color = 'rgb(0, 224, 18)';
            }, 500);
        }
        if (callback) {
            setTimeout(()=>{
                callback();
            },500);
        }
    }


    ////////////////////// DOM ELEMENTS /////////////////////////
    const warReport = document.querySelector('#warReport');
    const progress = document.querySelector('#progress');

    function blinker(){
        const blinky = document.querySelector('#blinky');
        
        const blinkyInterval = setInterval(() => {
            blinky.style.opacity = "0";
            setTimeout(()=> {
                blinky.style.opacity = "100%";
            }, 500);
        },1000);
        
    }

    function showWarReport() {
        warReport.style.display = "block";
    }

    function resetMessage(){
        message = "";
        messageP.innerText = "";
        hideButtons();
    }

    function report(message, callback){
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
                    setTimeout(()=>{
                        callback();
                    },500);
                }
            }
        }, DELAY);
        messages.push(message)
    }

    // OurShip
    function handleShipNameSubmit(){
        console.log('Submitted Ship Name');
        const shipName = document.querySelector('#ship-name-input').value;
        if (!shipName || shipName === "") return;
        createOurShip(shipName);
    }

    function chooseWeaponsPackage() {
        const ourWeapons = [
            {name: "Needler", accuracy: .8, firepower: 3},
            {name: "Laser Cannon", accuracy: .4, firepower: 8},
            {name: "Disintigration Ray", accuracy: .1, firepower: 100},
        ];
        return ourWeapons;
    }

    function createOurShip(shipName){
        const ourWeapons = chooseWeaponsPackage();
        ourShip = new Spaceship(shipName, 20, ourWeapons);
        console.log(ourShip);
        removeForm();
        renderShip(ourShip);
        
        progress.style.display = "flex";
        message = 'You have successfully created your ship.\nWhat would you like to do now?';
        report(message, renderGameOptions);
    }

    // create ALIENS
    function createAliens() {
        console.log('creating aliens')
        const numAlienShips = Math.floor(Math.random() * 5) + 4;
        for (let i = 0; i < numAlienShips; i++){
            const alienShip = new Spaceship(`Alien Ship ${i + 1}`);
            alienFleet.push(alienShip);
        }
    }


    // Ship & DOM
    function removeForm() {
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
        const shipHull = document. createElement('div');
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



    /////////////////////// GAME LOGIC  //////////////////////////
    function renderEncounterOptions() {
        // const buttonDiv = document.createElement('div')
        const actionsDiv = document.querySelector('#actions')
        // buttonDiv.id = "buttonDiv"
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

        // setTimeout(()=>{
            showButtons();
        // }, 1000);
    }

    function removeButtons() {
        const actionsDiv = document.querySelector('#actions');
        console.log(actionsDiv.hasChildNodes());
        while (actionsDiv.hasChildNodes()) {
            actionsDiv.childNodes[0].remove();
        }
    }

    function renderGameOptions() {

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

        // setTimeout(()=>{
            showButtons();
        // }, 1000);
    }

  

    function encounter() {
        removeButtons();
        message = `Alien fleet approaching.\nThere are ${alienFleet.length} ships total.\n\nWhat would you like to do?`;
        showWarReport();
        report(message, endOfRound);
        // endOfRound();
    }

    function handlePlay() {
        resetMessage();
        hideButtons();
        gameOver = false;
        const alienFleet = createAliens();
        console.log('Aliens:', alienFleet);
        encounter(ourShip, alienFleet);
    }

    function handleQuit() {
        console.log('thanks.');
    }

    // retreatAttempt is called if retreat button is clicked
    function handleRetreat() {
        resetMessage();
        removeButtons();
        alienFleet = [];
        gameOver = true;
        setTimeout(()=>{
            endOfRound('retreat');
        }, 1000);
    }

    // battleExchange is called if attack button is clicked
    function handleAttack() {
        resetMessage();
        console.log('attacking');
        hideButtons();
        console.log(ourShip);
        console.log(alienFleet);
        // as long as we are not and the alienFleet is not destroyed, fight
        if (ourShip.hullCurrent > 0 && alienFleet.length > 0){
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
        report(message, ()=>{damageInTheDom(endOfRound)}); // message has been building for whole round
        // endOfRound();
    }

    function endOfRound(shipRetreating=false){
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
                setTimeout(()=>{
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

    function hideButtons() {
        const buttons = document.querySelector('#actions').childNodes;
        for (let btn of buttons){
            btn.style.opacity = "0%";
        }
    }

    function showButtons() {
        const buttons = document.querySelector('#actions').childNodes;
        setTimeout(()=>{
            for (let btn of buttons){
                btn.style.opacity = "100%";
            }
        }, 250);
    }

    function assessDamage(attacker, target){
        if (target.hullCurrent <= 0) {
            message += `\n${attacker.name} destroys ${target.name}!`;
            alienFleet.shift();
            message += `\n${alienFleet.length} alien ships remain.`
        } else {
            message += `\n${target.name} has ${target.hullCurrent} hull points remaining.`
        }

        message += "\n";

        if (ourShip.hullCurrent <= 0 || alienFleet.length === 0){
            gameOver = true;
        }
        message += '\n';
    }

    ////////////////// THE GAME /////////////////////////////
    blinker();

    let gameOver = false;
    // make our hero spaceship
    // at some point, add ability to name your ship

    let ourShip;
    let alienFleet = [];
    const submitNameBtn = document.querySelector('#ship-name-submit');
    submitNameBtn.addEventListener('click', handleShipNameSubmit);
    
    let message;
    const messages = [];
    const messageP = document.querySelector('#message-p');

    // const alienFleet = createAliens();
    // encounter(ourShip, alienFleet);

    
}

game();