// Variable holding initial game configuration
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game',

        scale: {
            // automatic scaling of the entire app
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        scene: [BootScene, PreloadScene,TitleScene, GamePreload, GameScene, GameOverScene, EnterName],
        pixelArt: true,
                    audio: {
                    displayWebAudio: true
            },	
    }

/* --- Game variables --- */
let game = new Phaser.Game(config);
var width = 40;
var height = 38;
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
var removedFires = [];
var currentFireCount = 0;
var removedTreeCount = 0;
  
// Mario music easter egg boolean
var marioed = false;

//for setting up facts and tool tip
var facts = []; //all wildfire facts
var factsLength = 4; //index (not length) of facts array, 5 facts will be displayed
var textHolder; //the text at the bottom of the game
var firstBurntTree = false; //whether a burnt tree has appeared or not
var burntTreeCounter = 0; //shows tool tip only when the random is not a 3 and there's been a burnt tree
var ran = 0; //determines whether or not an informational fact should be displayed 
var readingToolTip = false; //whether or not the tool tip is displayed
var clickedBurntTree = 0; //for removing the text when user clicks on a burnt tree
var trophyStatus = false; //wait time for trophy announcement's appearance

//designates milestones for every 100, 200, 300... points
//not using the odd scores for now (spams when the pace of the game is fast)
var trophyTen = true; 
var trophyTwenty = true;
var trophyThirty = true;
var trophyFourty = true;
var trophyFifty = true;
var trophySixty = true;
var trophySeventy = true;
var trophyEighty = true;
var trophyNinety = true;
var trophyHun = true;

//designates the milestone message has finished showing
//not using the odd trophies for now (spams)
var trophyTenFin = false;
var trophyTwentyFin = false;
var trophyThirtyFin = false;
var trophyFourtyFin = false;
var trophyFiftyFin = false;
var trophySixtyFin = false;
var trophySeventyFin = false;
var trophyEightyFin = false;
var trophyNinetyFin = false;
var trophyHunFin = false;

// Title screen music
var titleMusic;

// start button effect
var startSound;
    
// Gameplay music
var gameMusic;
    
// Water effect when dousing fire
var waterSound;
    
// Fire effect
var fireSound;
	
// Start button on click
var start;

// Game over effect
var gameOverSound;	

// Mario music
var marioMusic;

//tree chopping effect
var chopTreeSound;

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

//configuration for fire sound
var fireConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

//configuration for extinguishing fire
var waterConfig = {
mute: false,
volume: 0.5,
rate: 1,
detune: 0,
seek: 0,
loop: false,
delay: 0
};

// Configuration for the Mario music
var marioConfig = {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 2.5,
    loop: true,
    delay: 0
}

// Setting the Title Screen
let titleScene = new TitleScene();

game.scene.add("BootScene", BootScene.js);
game.scene.start('BootScene');
