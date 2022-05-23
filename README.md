# SPACEWARS
A simple text and logic-based browser game. Evolved from a basic assignment I encounted as Instructional Associate at General Assembly. If I remember correctly, the point was to practice using classes to make multiple objects... in this case the spaceships. And then place those objects into a simple game environment. I've added DOM manipulation to what was originally a console only ui. Also, I have begun the add more complexity to the ships. 

The current version uses modules to break apart the javascript game and rendering logic. Some global variables are declared in app.js as well as the event handler listening for the submission of a shipname (which sets everything in motion). The other modules are in the modules directory. The original single file version still exists in battle.js.

I had thought I would put the game logic into its own class which took a spaceship as its only argument. But I found myself breaking the code up into smaller chunks. Not sure which is better suited to what. Maybe I should just do a separate version with spaceship and game classes only. Just to compare them.

The ultimate goal is to add more complexity, connect the spacewars game to a spaceship store where new and used ships, as well as a la carte components, can be bought or sold. This then can re-inform the game to make collection of equipment from captured/destroyed ships how one gains wealth and adds capabilities to the ship. 

Once this complexity has been reached, try making this into a multi-user thing. Spaceships floating in a real dimensinal world. You can battle generic aliens or other users. Perhaps other options cna evolve to include cooperation, etc. At that point you would have to add a server to keep control of the central world. And allow communications between players.

At some point this may also want to transition to a react front end to allow more dynamic experience.

## Created by Blake Montgomery.
A work in progress in