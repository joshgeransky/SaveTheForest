// Variable holding initial game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
	       minimap: null
        }
    }
}

// Game variables
var game = new Phaser.Game(config);
var width = 40;
var height = 38;
var value = Phaser.Math.Between(4, 10);
var i = 0;
var fireArr = [];
var startBtn;
var titleText;
var subText;
var scoreCounter;
var scoreTitle = "Score: ";
var playerScore = 0;
var start = false;
var treeArr = [];
var fireCount = 0;
var treeContains = [];
var fire;
var fireMaking = false;
var litFires = [];
var stageDelay = 5000;


// Preloading function
function preload () {
    this.load.image('tree1', '../assets/sprites/tree1(64x64).png');
    this.load.image('tiles', 'assets/sprites/grassTile2.png');
	this.load.spritesheet("fireAnim", "assets/sprites/fireAnimation64.png", {frameWidth: 64, frameHeight: 64, endFrame: 24});
    this.load.image('startBtn', '../assets/sprites/startBtn.png');
}

// Creation function
function create () {

	// x and y coordinates stored in arrays
    var xValues = [];
    var yValues = [];
    // In theory we could force the trees to grab only one of the values from
    // the x/y arrays, thus tiling them and making them more organized. Worth considering.
                
    // Create the tiled background
    var level = [];
    for (var y = 0; y < height; y++) {
        var row = [];
        yValues[y] += y;
        for (var x = 0; x < width; x++) {
            xValues[x] += x;
            row.push(0);
        }
        level.push(row);
    }
		
    // Initialize the starting map
    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
    var tileset = map.addTilesetImage('tiles');
    var layer = map.createStaticLayer(0, tileset, 0, 0);
    
    // Set the camera location
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);    
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);		    
                
    // Create the boundaries of the game
    var bounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    
    // Creating container variables
    var treeContainer = this.add.container(0, 0).setName('treeContainer');
    window['Container1'] = treeContainer;
    var containerNum = 1;
    
    // Configure the fire animation
    this.anims.create(configFireAnim(this));
    
    // Get the x and y values for the trees
    arrangeTrees(bounds);

    // For loop to create trees
    for (let i = 0; i < 200; i++) {
        // Create a tree and add it to the window
        var tree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
        
        // Creating containers for each individual tree
        // (May be unnecessary but it's working for now so I won't remove it)
        if (i > 0 && i % 8 === 0) {
	       treeContainer = this.add.container(0, 0).setName('treeContainer' + containerNum);
	       treeContains.push(treeContainer);
	       window['treeContainer' + containerNum] = treeContainer;
	       containerNum++;
        }
        
        // Add the tree to the containers array
        treeContains.push(tree);
    }
    
    
    // For loop to repeat for each tree
    for (let i = 0; i < treeArr.length; i++) {
        
        // Makes fires on each tree
        fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim').setName('Sprite' + i);
        
        // Animate the fires
        fire.anims.play("burn");
        
        // Set the fires to be clickable
        fire.setInteractive();
        
        // Set the fires to be invisibile (they will be visible when they spawn later)
        fire.visible = false;
        
        // Push the fire to the fire array
        fireArr.push(fire);
    }
    
    // Create title text
    titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
        
    // Create subtext
    subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});

    // Create score counter, currently unused
    //scoreCounter = this.add.text(10, 10, scoreString + score, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
      
    // Create start buttons
    startBtn = this.add.sprite(420, 400, 'startBtn').setInteractive();
        
    // Start button functionality
    startBtn.on('pointerdown', startGame);
    startBtn.on('pointerover', changeColor);
    startBtn.on('pointerout', revertColor);
}
   
// Arrange the trees using the boundaries
function arrangeTrees(bounds) {
    
    // For the amount of trees you want (200 atm)
    for (let i = 0; i < 200; i++) {
        
        // Get random x and y values
        var x = Phaser.Math.Between(bounds.left, bounds.right);
        var y = Phaser.Math.Between(bounds.top, bounds.bottom);
        
        // Push these values to an array
        treeArr.push({
            x: x,
            y: y
        });
        
        // Then sort the trees by y values
        sortTrees(treeArr[0], treeArr[i]);    
    }
    
}

// Update function, repeats indefinitely
function update () {
        
    // If the game has started
    if (start) {
        // When a fire is clicked
        this.input.on('gameobjectdown', function(pointer, fire) {
            // Extinguish the fire
            extinguishFire(fire);
        });
        
        detStage();
        
        // Delay and then make the fire
        this.time.addEvent({
            delay: stageDelay,
            callback: ()=>{
                startFires()
            },
            loop: false // Do not loop, the update function loops by itself
        });
    }
}

// Start making fires
function startFires() {
    
    // If a fire is not currently being made
    if (!fireMaking) {
    
        // We are now making a fire, set 'fireMaking' to true.
        // This avoids the update function making infinite fires at once.
        fireMaking = true;
    
        // Grab a fire, any fire.
        var f = Phaser.Utils.Array.GetRandom(fireArr);
        
        // For loop to search through the entire litFire array.
        // If a matching fire is found that means it's already been lit, and it will find another fire.
        for (let i = 0; i < litFires.length; i++) {
            // While loop to avoid the remote possibility of the grabbing the same fire again.
            while (f == litFires[i]) {
                // Get a new random fire from the fire array.
                f = Phaser.Utils.Array.GetRandom(fireArr);
            }
        }
    
        // Make the fire visible for the user, and thus clickable.   
        f.visible = true;
    
        //Push the fire to the lit fires array.
        litFires.push(f);
    
        // Increase the count of total fires (includes past removed fires).
        fireCount++;
    
        console.log(fireCount);
        
        detStage();
    
        // After delay time, allow the update function to make another fire.
        setTimeout(delayFires, stageDelay);
    }
}
// Dealing with the boolean for making fires
function delayFires() {    
    fireMaking = false;
}

// Determine the rate the fires will spawn
function detStage() {
    
    if (fireCount >= 0 && fireCount <= 10) {
        stageDelay = 5000;
    
    } else if (fireCount > 10 && fireCount <= 20) {
        stageDelay = 3000;
    
    } else if (fireCount > 20 && fireCount <= 30) {
        stageDelay = 2000;
    
    } else if (fireCount > 30 && fireCount <= 40) {
        stageDelay = 1000;
    } else {
        stageDelay = 5000;
    }
    
}

// Function to configure fire animations
function configFireAnim(t) {

    // Create variable with animation configuration
	var configFire = {
		key: "burn",
		frames: t.anims.generateFrameNumbers("fireAnim", {
            start : 0,
            end : 23,
            first : 23
        }),
		frameRate: 12,
		repeat: -1,
	}
    
    // Return the configuration for the fire
    return configFire;
}

function saveTree(){
  playerScore++;
  scoreCounter.setText(scoreTitle + playerScore);
}

// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}

// Extinguishes the fire
function extinguishFire(f) {
    
    f.visible = false;
   
    for (let i = 0; i < litFires.length; i++) {
        if (this == litFires[i]) {
            litFires.splice(i, 1);
        }
    }
    
    //destroySprite(f); --- Removed for now so the sprites still exist, just invisible
}

// Removes all titles, start button, trees when start button is clicked    
function startGame() {
   titleText.visible = false;
   subText.visible = false;
   startBtn.visible = false;
   start = true;
}

//changes color of start button on hover
function changeColor() {
    startBtn.setTint(0xa09f9f);

}

//changes color of start button back to normal
function revertColor() {
 	startBtn.clearTint();
 }


// Function to destroy sprites, currently unused
function destroySprite(sprite) {
	sprite.destroy();
}
