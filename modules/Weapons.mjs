// The creation of various weapons systems and the implementation of a store
// will take some time. What are the rules for mounting weapons?
// What logic needs to be built?
// How and when are they chosen/switched between by the user

export function chooseWeapons() {
	const ourWeapons = [{
			name: "Needler",
			accuracy: .8,
			firepower: 3
		},
		{
			name: "Laser Cannon",
			accuracy: .4,
			firepower: 8
		},
		{
			name: "Disintigration Ray",
			accuracy: .1,
			firepower: 100
		},
	];
	return ourWeapons;
}