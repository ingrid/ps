ps_setup = function(width, height){

    var ps = {};
    
    ps.canvas = document.createElement("canvas");
    ps.context = ps.canvas.getContext("2d");
    ps.bgColor = "rgb(0, 0, 0)";
    ps.borderColor = "rgb(240, 240, 240)";
    
    ps.x = width;
    ps.y = height;
    ps.fps = 80;
    ps.elapsed = 0;
    ps.border = 1;
    ps.gridLines = 1;
    ps.edge = 5;
    ps.boxX = 0;
    ps.boxY = 0;

    ps.timer = {};
    ps.timer.time = 0;
    ps.timer.inc = 0;

    var justPressedKeys = [];

    text = {};
    text.makeFont = function (color, size, font, style){
        var self = {};

        if (style === undefined){
            style = "";
        }
        if (font === undefined){
            font = "sans-serif";
        }

        self.color = color;
        self.size = size;
        self.font = font;
        self. style = style;

        return self;
    };

    ps.font = text.makeFont(ps.borderColor, "12pt");

    boxes = {};
    boxes.makeBox = function(color, data){
        var self = {};
        self.color = color;
        self.data = data;
        
        return self;
    };
    
    ps.buffer = new Array (ps.x);
    
    for (var i = 0; i < ps.buffer.length; i++){
        ps.buffer[i] = new Array (ps.height);
    }
    
    for (var j = 0; j < ps.buffer.length; j++){
        for (var k = 0; k < ps.buffer.length; k++){
            ps.buffer[j][k] = boxes.makeBox(ps.bgColor, 0)
        }
    }
    
    parentElement = document.body;
    
    parentElement.appendChild(ps.canvas);
    
    ps.canvas.width = window.innerWidth;
    ps.canvas.height = Math.floor(window.innerHeight);
    ps.message = {};
    
    ps.message.x;
    ps.message.y;
    ps.message.width;
    ps.message.height;
    ps.message.font = text.makeFont(ps.borderColor, "14pt");
    ps.message.text = "";
   

    ps.status = {};
    
    ps.status.x;
    ps.status.y;
    ps.status.width;
    ps.status.height;
    
    ps.status.font = text.makeFont(ps.borderColor, "12pt");

    ps.box = {};
    
    ps.box.x;
    ps.box.y;
    ps.box.height;
    ps.box.width;
    
    ps.dimensions = function(){
    
        ps.message.height = Math.floor(ps.canvas.height * 0.15);
        ps.status.height = Math.floor(ps.canvas.height * 0.05);
        
        var len;
        var count;
        
        if ((ps.canvas.width / ps.x) > ((ps.canvas.height * 0.8) / ps.y)){
            // Use height.
            len = Math.floor(ps.canvas.height * 0.8);
            count = ps.y;
        }
        else{
            // Use width.
            len = Math.floor(ps.canvas.width);
            count = ps.x;
        }
        ps.edge = Math.floor((len - (2 * ps.border) - (ps.gridLines * count - 1)) / count);
        
        ps.box.width = (ps.x * ps.edge) + ((ps.x - 1) * ps.gridLines) + (2 * ps.border);
        
        ps.box.height = (ps.y * ps.edge) + ((ps.y - 1) * ps.gridLines) + (2 * ps.border);
        
        ps.box.x = Math.floor((ps.canvas.width - ps.box.width) / 2);
        ps.box.y = Math.floor((ps.canvas.height - ps.box.height - ps.status.height) - ((ps.canvas.height - ps.box.height - ps.status.height - ps.message.height) / 2));
        
        ps.message.width = ps.box.width;
        ps.status.width = ps.box.width;
        
        ps.message.x = ps.box.x;
        ps.message.y = ps.box.y - (ps.box.y - ps.message.height);
        
        ps.status.x = ps.box.x;
        ps.status.y = (ps.y * ps.edge) + ((ps.y - 1) * ps.gridLines) + (2 * ps.border) + ps.message.height + ps.box.height;
    };
    
    ps.dimensions();
    
    ps.tick = function(){
        ps.render();
        ps.update();
        window.setTimeout(ps.tick, 1000.0/ps.fps);
    };
    
    ps.update = function(){
        ps.elapsed = 1.0/ps.fps;
        if (justPressedKeys !== undefined){
            for (val in justPressedKeys){
                if (val === true){
                    ps_key(justPressedKeys.indexOf(val));
                }
            }
        }
        if (ps.timer.inc !== 0){
            console.log("Time: " + ps.timer.time);
            if (ps.timer.time >= ps.timer.inc){
                ps.timer.time = 0;
                ps_tick();
            }
            ps.timer.time++;
        }
        updateKeys();
    };

    ps_timer = function(inc){
        ps.timer.inc = inc;
        console.log("TIMER CALLED.");
    }
    
    ps.render = function(){

        // Get context.
        var ctx = ps.context;

        // Paint background.
        ctx.fillStyle = ps.bgColor;
        ctx.fillRect(0, 0, ps.canvas.width, ps.canvas.height);

        // Paint borders.
        ctx.fillStyle = ps.borderColor;
        ctx.fillRect(ps.box.x, ps.box.y, ps.box.width, ps.box.height);

        // Paint squares.
        for (var i = 0; i < ps.x; i++){
            for (var j = 0; j < ps.y; j++){
                ctx.fillStyle = ps.buffer[i][j].color;
                var xCord = ps.border + ps.box.x + (ps.gridLines * i) + (ps.edge * i);
                var yCord = ps.border + ps.box.y + (ps.gridLines * j) + (ps.edge * j);
                ctx.fillRect(xCord, yCord, ps.edge, ps.edge);
                
            }
        }

        // Paint message, if any.
        ctx.font = ps.font.style + " " + ps.font.size + " " + ps.font.font;
        ctx.fillStyle = ps.message.font.color;
        ctx.fillText(ps.message.text, ps.message.x, ps.message.y);
        
        ctx.font = ("32pt sans-serif");

        // Paint status, if any.
    };
    
    ps.color = function(x, y, color){
        buffer[x][y].color = color;
    };
    
    ps.setBGColor = function(r, g, b){
        ps.bgColor = "rgb(" + r + "," + g + "," + b + ")";
    };
    
    ps_run = function(){
        ps.tick();
    };
    
    ps_message = function(message){
        ps.message.text = message;
    };

    // Sound stuff.
    
    ps.sound = {};
    ps.sound.cache = {};
    ps.sound.load = function(url){
        var aud = document.createElement('audio');
        aud.setAttribute('src', url);
        aud.load();
        ps.sound.cache[url] = aud;
    };
    ps.sound.play = function(url){
        if(ps.sound.cache[url] === undefined){
            ps.sound.load(url);
        }
        ps.sound.cache[url].play();
    };
    
    ps_play = function(file, volume, pan, loop){
        ps.sound.play("audio/" + file + ".wav");
    };

    ps_load = function(url){
        var aud = document.createElement('audio');
        aud.setAttribute('src', url);
        aud.load();
        ps.sound.cache[url] = aud;
    };

    ps_color = function(x, y, color){
        ps.buffer[x][y].color = color;
    };

    // Input stuff.

    var getKeyName = function(ascii){
        if(ascii >= 65 && ascii <= 90){
            return String.fromCharCode(ascii);
        }
        else if(ascii >= 97 && ascii <= 122){
            return String.fromCharCode(ascii).toUpperCase();
        }
        switch(ascii){
        case 192: return "~"; break;
        case 37: return "LEFT"; break;
        case 38: return "UP"; break;
        case 39: return "RIGHT"; break;
        case 40: return "DOWN"; break;
        default: return "UNKNOWN";
        }
    };

    document.onkeydown = function(evt){
        var code = ('which' in evt) ? evt.which : evt.keyCode;
        ps_key(getKeyName(code));
    };


    var updateKeys = function(){
        justPressedKeys = [];
    };

    return;
};

ps_preProcess = function(){
};

ps_extend = function(baseFunc, addFunc){
    var newFunc = function(){
        var firstCall = baseFunc.apply(null, arguments);
        var secondCall = addFunc.apply(null, arguments);
        return firstCall;
    };
    return newFunc;
};
    
window.onload = function(){
    ps_init();
    ps_run();
};

function onMouseDown(evt){
};