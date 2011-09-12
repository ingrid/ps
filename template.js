// Perlenspiel.js template.
// This is a template for creating new Perlenspiel scripts for perlenspiel.js.

// About the project: The was made for a Labor Day weekend hackathon. The original intention was to emulate the original lua version of perlenspiel as much as possible, however, this hedged the design a lot, so if I work on this again in the future I will likely redesign the whole thing to better fit with javascript and web use.

// One more quick note: I took this class when it was first offered in D Term 2010, so I was using an older version of Perlenspiel. I've dug around the new API but some of the desgin is from memory so it may not match the lastest version exactly.

// Global constants should probably be erapped per convention.

var PS_GRID_X = 8;
var PS_GRID_Y = 8;

// ps_init ()
// Initializes the game.
// The ps_init() function MUST call ps_setup (x, y), where x and y are the desired size of the grid.

// Every game MUST include a ps_init() function, and that function MUST call ps_setup() with the x and y dimensions of the grid!

ps_init = function(){
	ps.setup(PS_GRID_X, PS_GRID_Y);
	// Any other initialization code goes here.
};

// ps_click (x, y, button, data)
// This function is called whenever a bead is clicked.
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// button = -- PS_BUTTON_LEFT if left button was clicked, else PS_BUTTON_RIGHT
// data = the data value associated with this bead, 0 if none has been set

// Every game MUST include a ps_click() function. It doesn't have to do anything.

ps_click = function(x, y button, data){
	// Put code here for when a bead is clicked.
};

ps_key = function(val){

};

ps_enter = function(x, y, button, data){

};

ps_leave = function(x, y, button, data){

};

ps_release = function(x, y, button, data){
};

ps_wheel = function(x, y, button, data){
};

ps_tick = function(){
};

ps_state = function(){
};

ps_restore = function(){
};