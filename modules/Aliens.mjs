import Spaceship from "./Spaceship.mjs";


export function createAliens() {
	console.log('creating aliens')
	const numAlienShips = Math.floor(Math.random() * 5) + 4;
	for (let i = 0; i < numAlienShips; i++) {
		const alienShip = new Spaceship(`Alien Ship ${i + 1}`);
		alienFleet.push(alienShip);
	}
}