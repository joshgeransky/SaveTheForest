
// Variable holding initial game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    scene: [TitleScene, GameScene]
   /* scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
	       minimap: null
        },
		audio: {
	        displayWebAudio: true
	    }
    } */
}




// Game variables
let game = new Phaser.Game(config);
var width = 40;
var height = 38;
var value = Phaser.Math.Between(4, 10);
var fireArr = [];
var startBtn;
var titleText;
var subText;
var scoreCounter;
var scoreTitle = "Score: ";
var playerScore = 0;
var start = false;
var treeArr = []; // holds x and y values of trees
var allTrees = []; // holds the trees themselves, as well as burnt trees
var animCamp;
var fireCount = 0; // total count of fires (including removed ones)
var treeContains = []; // probably should be removed at some point
var fire; // holds a fire
var fireMaking = false; // boolean to check if already making a fire
var litFires = []; // array of all lit fires
var stageDelay = 5000; // delay between fires
var fireSoundBoolean = false; //keeps track of how whether a fire is on the screen or not
var spriteCamp;
var startSound;
//title screen music
var titleMusic;
    
//gameplay music
var gameMusic;
    
//water effect when dousing fire
var waterSound;
    
//fire effect
var fireSound;

//start button on click
var start;

//gameOver effect
var gameOverSound;	
	
//configuration for audio
var musicConfig = {
mute: false,
volume: 0.5,
rate: 1,
detune: 0,
seek: 0,
loop: true,
delay: 0
};

//configuration for fire effect
var fireConfig = {
mute: false,
volume: 1,
rate: 1,
detune: 0,
seek: 0,
loop: true,
delay: 0
};

//configuration for extinguishing water
var waterConfig = {
mute: false,
volume: 0.5,
rate: 1,
detune: 0,
seek: 0,
loop: false,
delay: 0
};

let titleScene = new TitleScene();


//game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene');





























