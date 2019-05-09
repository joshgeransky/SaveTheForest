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
var treeArr = []; // holds x and y values of trees
var allTrees = []; // holds the trees themselves, as well as burnt trees
var fireCount = 0;
var treeContains = [];
var fire;
var fireMaking = false;
var litFires = [];
var stageDelay = 5000;


// Preloading function
function preload () {
    this.load.image('tree1', '../assets/sprites/tree1(64x64).png'); // Regular tree
    this.load.image('burntTree', '../assets/sprites/burntTree(64x64).png'); // Burnt tree
    this.load.image('tiles', 'assets/sprites/grassTile2.png'); // Grass tile
    this.load.image("tilesDynamic", "assets/sprites/RPGTileset.png");
	this.load.spritesheet("fireAnim1", "assets/sprites/fireAnimation64.png", {frameWidth: 64, frameHeight: 64, endFrame: 24}); // first fire
    this.load.image('startBtn', '../assets/sprites/startBtn.png'); // start button
    this.load.spritesheet("fireAnim2", "assets/sprites/fireAnimationNew.png", {frameWidth: 42, frameHeight: 64, endFrame: 11}); // second fire

}

// Creation function
function create () {
    
    // Configure the first fire animation
    var configFire1 = {
        key: "burn1",
        frames: this.anims.generateFrameNumbers("fireAnim1", {
            start : 0,
            end : 23,
            first : 23
        }),
        frameRate: 12,
        repeat: -1,
    }
    
    // Configure the second fire animation
    var configFire2 = {
        key: 'burn2',
        frames: this.anims.generateFrameNumbers('fireAnim2', {
            start: 0,
            end: 24,
            first: 24
        }),
        frameRate: 12,
        repeat: -1
    }
    

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
    var map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16});
    var tileset = map.addTilesetImage('tilesDynamic');
    var groundLayer = map.createBlankDynamicLayer("Ground Layer", tileset);
    var objectLayer = map.createBlankDynamicLayer("Object Laber", tileset);
    groundLayer.setScale(2);
    objectLayer.setScale(2);
    
    groundLayer.fill(23, 0, 0, map.width);
    objectLayer.fill(27, 0, 0, map.width);

    // Set the camera location
    this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);    
    this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);	    
                
    // Create the boundaries of the game
    var bounds = new Phaser.Geom.Rectangle(20, 20, 780, 560);
    
    // Creating container variables
    var treeContainer = this.add.container(0, 0).setName('treeContainer');
    window['Container1'] = treeContainer;
    var containerNum = 1;
    

    // Configure the first fire animation
    this.anims.create(configFire1);
    
    //Configure the second fire animation
    this.anims.create(configFire2);
    
    // Get the x and y values for the trees
    arrangeTrees(bounds);

    // For loop to create trees
    for (let i = 0; i < 200; i++) {
        // Create a tree and add it to the window
        var tree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
        var burntTree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'burntTree').setName('Burnt' + i);
        
        burntTree.visible = false;
        
        // Creating containers for each individual tree
        // (May be unnecessary but it's working for now so I won't remove it)
        if (i > 0 && i % 8 === 0) {
	       treeContainer = this.add.container(0, 0).setName('treeContainer' + containerNum);
	       treeContains.push(treeContainer);
	       window['treeContainer' + containerNum] = treeContainer;
	       containerNum++;
        }
        
        // Add the tree to the containers array (will likely be removed eventually)
        treeContains.push(tree);    
        
        // Generate either 1 or 2 to choose the fire type
        var fireType = Math.floor(Math.random() * 2);
        
        // If the first fire type, add it
        if (fireType == 0) {
        
            // Makes fire on the tree
            fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim').setName('Fire' + i);
        
            // Animate the fire
            fire.anims.play("burn1");
            
        // If the second fire type, add it
        } else if (fireType == 1) {
            
            // Makes fire on the tree
            fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim1').setName('Fire' + i);
            
            // Animate the fire
            fire.anims.play("burn2");
            
        // Otherwise, in case of a weird number, add the first one
        } else {
            // Makes fire on the tree
            fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim').setName('Fire' + i);
        
            // Animate the fire
            fire.anims.play("burn1");
        }
        
        // Set the fire to be clickable
        fire.setInteractive();
        
        // Set the fire to be invisibile (it will be visible when it spawns later)
        fire.visible = false;
        
        // Push the new fire to the fire array
        fireArr.push(fire);
        
        
        // Add the tree, burnt tree, fire and x/y values to the array
        allTrees.push({
            tree: tree,
            burnt: burntTree,
            fire: fire,
            x: treeArr[i].x,
            y: treeArr[i].y
        });
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
        
        // Check what stage the user is at
        detStage();
        
        // Delay and then make the fire
        this.time.addEvent({
            delay: stageDelay,
            callback: ()=>{
                startFires(this) // Send 'this' over so not everything has to be done in this function
            },
            loop: false // Do not loop, the update function loops by itself
        });
    }
}

// Start making fires
// th = 'this'
function startFires(th) {
    
    // If a fire is not currently being made
    if (!fireMaking) {
    
        // We are now making a fire, set 'fireMaking' to true.
        // This avoids the update function making infinite fires at once.
        fireMaking = true;
    
        // Grab a fire, any fire.
        var t = Phaser.Utils.Array.GetRandom(allTrees);
        
        // Get the fire at the randomly chosen index
        var f = t.fire;
        
        // For loop to search through the entire liteFire array.
        // If a matching fire is found that means it's already been lit, and it will find another fire.
        for (let i = 0; i < litFires.length; i++) {
            // While loop to avoid the remote possibility of the grabbing the same fire again.
            while (f == litFires[i]) {
                // Get a new random fire from the fire array.
                f = Phaser.Utils.Array.GetRandom(allTrees.fire);
            }
        }
    
        // Make the fire visible for the user, and thus clickable.   
        f.visible = true;
        
        // Bring the fire to the top of the window
        th.children.bringToTop(f);
    
        //Push the fire to the lit fires array.
        litFires.push(f);
    
        // Increase the count of total fires (includes past removed fires).
        fireCount++;
    
        // Print the fire count to console (for testing purposes)
        console.log('FireCount ' + fireCount);
        
        // Determine how long until the next fire should pop up
        detStage();
                
        // Activate function to replace the tree with a burnt tree after a set amount of time
        burnDelay(t, f, th);
    
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
    
    // If less than 10 fires, first stage, etc.
    if (fireCount >= 0 && fireCount <= 10) {
        stageDelay = 5000;
    
    } else if (fireCount > 10 && fireCount <= 20) {
        stageDelay = 3000;
    
    } else if (fireCount > 20 && fireCount <= 30) {
        stageDelay = 2000;
    
    } else if (fireCount > 30 && fireCount <= 40) {
        stageDelay = 1000;
        
    } else if (fireCount > 40) {
        stageDelay = 500;
        
    } else {
        stageDelay = 5000;
    }
    
}

// Save tree function, unused atm
function saveTree(){
  playerScore++;
  scoreCounter.setText(scoreTitle + playerScore);
}

// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}

// Extinguishes the fire
// f = the fire
function extinguishFire(f) {
    
    // Set the fire to invisible
    f.visible = false;
   
    // For loop to remove the fire from the litFires array
    for (let i = 0; i < litFires.length; i++) {
        if (this == litFires[i]) {
            litFires.splice(i, 1);
        }
    }    
}

// Function to delay the burning of a tree
// t = specific index at a tree array
// f = the fire from that index
// th = 'this'
function burnDelay(t, f, th) {
    
    // Delay and then burn the tree
    th.time.addEvent({
        delay: 5000,
        callback: ()=>{
            burnTree(t, f)
        },
        loop: false // Do not loop, once it's burned once it's done
    });
}

// Function to burn down a tree
function burnTree(t, f) {
    
    // Get the actual tree
    var tree = t.tree;
    
    // Get the currently invisible burnt tree
    var burnt = t.burnt;
    
    // If the fire hasn't been clicked
    if (f.visible == true) {
        
        // Make the actual tree invisible
        tree.visible = false;
        
        // Make the burnt tree visible
        burnt.visible = true;
        
    }
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
