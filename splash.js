var PS_GRID_X = 8;
var PS_GRID_Y = 8;

var MY_ORANGE	= "rgb(244, 120, 43)";
var MY_BLUE		= "rgb(106, 152, 186)";
var MY_GREEN	= "rgb(161, 201, 58)";
var MY_YELLOW	= "rgb(249, 235, 66)";
var MY_PURPLE	= "rgb(135, 87, 142)";

var initialized = false;

var score = {};

var makeNote = function(note, x, y, color){
	self = {};
	self.note = note;
	self.x = x;
	self.y = y;
	self.color = color;
	
	return self;
}

score[01] = makeNote("L_HChord_D4", 0, 5, MY_BLUE);
score[03] = makeNote("L_HChord_A4", 1, 0, MY_YELLOW);
score[05] = makeNote("L_HChord_F4", 2, 2, MY_ORANGE);
score[07] = makeNote("L_XHChord_D4", 3, 5, MY_BLUE);
score[09] = makeNote("L_HChord_Db4", 4, 6, MY_PURPLE);
score[11] = makeNote("HChord_D4", 5, 5, MY_BLUE);
score[12] = makeNote("HChord_E4", 6, 3, MY_GREEN);
score[13] = makeNote("L_HChord_F4", 7, 2, MY_ORANGE);

var tix = 0;

ps_init = function(){
	ps_setup(PS_GRID_X, PS_GRID_Y);
	ps_message("P  E  R  L  E  N  S  P  I  E  L");

    ps_load("L_HChord_D4");
    ps_load("L_HChord_A4");
    ps_load("L_HChord_F4");
    ps_load("L_HChord_Db4");
    ps_load("L_HChord_E4");

    ps_timer(60);
};

ps_click = function(x, y, button, data){
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
    if (initialized === false){
        initialized = true;
        ps_timer(30);
    }
    else{
	    var t;
	    
	    t = score[tix];
	    if (t !== undefined){
		    ps_play(t.note);
		    ps_color(t.x, t.y, t.color);
	    }
	    if (tix === 15){
		    ps_message("P   E   R   L   E   N   S   P   I   E   L");
		    ps_timer(0);
	    }

	    tix = tix + 1;
	}
};

ps_state = function(){
};

ps_restore = function(){
};