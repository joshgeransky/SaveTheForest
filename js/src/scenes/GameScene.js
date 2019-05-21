class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameScene"
		});
		this.scalingAmt = 1.0;
	}
	init() {
        
	}
    
	preload() {
        
	
	}

    // Creation function
    create() {

        //Temporary game over trigger and point addition system.

        //**************** DELETE BELOW AFTER IMPLEMENTATION ****************
        var gameOverButton = this.add.sprite(550, 50, 'gameOverButton').setInteractive().setScale(0.25, 0.25);

        gameOverButton.setDepth(500);

        gameOverButton.on('pointerdown', (pointer) => {

            gameMusic.pause();

            this.scene.start("GameOverScene");
            
        })

        var pointIcon = this.add.sprite(450, 50, 'pointsButton').setInteractive().setScale(0.2, 0.2);

        pointIcon.setDepth(500);

        pointIcon.on('pointerdown', (pointer) => {

            playerScore += 10;
            scoreCounter.setText(scoreTitle + playerScore);
            
        })

        //**************** DELETE ABOVE AFTER IMPLEMENTATION ****************
          

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
   
        /* -------- Music -------- */
        
        //titleMusic = this.sound.add('bg', musicConfig);
        //titleMusic.stop();
        gameMusic = this.sound.add('game', musicConfig);
        gameMusic.play();
        fireSound = this.sound.add('fire', fireConfig);
        waterSound = this.sound.add('water', waterConfig);
        startSound = this.sound.add('start', waterConfig);   
        gameOverSound = this.sound.add('gameover', musicConfig);
        marioMusic = this.sound.add('marioMusic', marioConfig);

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
        // Initialize the background layer
        var groundLayer = map.createBlankDynamicLayer("Ground Layer", tileset);
        // Initialize the object layer
        var objectLayer = map.createBlankDynamicLayer("Object Layer", tileset);

        // Scale up the tiles on both the background layer and object layer
        groundLayer.setScale(2);
        objectLayer.setScale(2);
    
        // Fill the background layer and object layer with a specific tile from the tileset
        groundLayer.fill(23, 0, 0, map.width, map.height);
        objectLayer.fill(23, 0, 0, map.width, map.height);

        // Call the random function on the object layer to randomize tiles
        randomObjLayer();

        // Function that randomizes tiles on the object layer 
        // (Indiviudal tile weight / total weight) determines the frequency of the tile
        function randomObjLayer() {
            objectLayer.weightedRandomize(0, 0, map.width, map.height, [
                {index: 30, weight: 17},
                {index: 67, weight: 1},
                {index: 70, weight: 1},
                {index: 89, weight: 1}
            ]);
        }

        // Set the camera location
        this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);    
        this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);	    
                
        // Create the boundaries of the game
        var bounds = new Phaser.Geom.Rectangle(20, 20, 780, 560);

        // Configure the first fire animation
        this.anims.create(configFire1);
    
        // Configure the second fire animation
        this.anims.create(configFire2);
    
        // Create the entire scene
        createScene(this, bounds);
                
        // Create score counter
        scoreCounter = this.add.text(10, 10, scoreTitle + playerScore, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});        
        
        this.children.bringToTop(scoreCounter);
        
        
        //**************** DELETE BELOW AFTER IMPLEMENTATION ****************
    var saveIcon = this.add.sprite(500, 50, 'save').setInteractive().setScale(0.25, 0.25);

    saveIcon.setDepth(500);

    saveIcon.on('pointerdown', (pointer) => {

        this.scene.start("GameOverScene");
     
 })
    }

    // Update function, repeats indefinitely
    update() {
    
        // Variable to see what fire is being clicked
        var clickedFire;
        
        // Variable for 'this'
        var th = this;
                
        // If the game has started
        if (start && !((removedTreeCount + currentFireCount) == 200)) {
            // When a fire is clicked
            this.input.on('gameobjectdown', function(pointer, fire) {
			 
                // Set the clickedFire variable (may be unnecessary)
                clickedFire = fire;
           
                // Extinguish the fire
                extinguishFire(fire, th);
                
            });
        
            // When a burnt tree is clicked
                this.input.on('gameobjectdown', function(pointer, burnt) {
                    // Remove the burnt tree
                    removeTree(this, burnt, clickedFire);			
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
        
        
            var mKey = this.input.keyboard.addKey('M');
    
            if (mKey.isDown && !marioed) {
                marioMusic.play(marioConfig);
                titleMusic.stop();
                gameMusic.stop();
                marioed = true;
        
                for (let i = 0; i < allTrees.length; i++) {
            
                    var shroom = this.add.sprite(treeArr[i].x, treeArr[i].y, 'mushroom').setName('Shroom' + i);	
                    shroom.setScale(0.7);
            
                    var deadShroom = this.add.sprite(treeArr[i].x, treeArr[i].y, 'deadShroom').setName('deadShroom' + i);
                    deadShroom.setScale(0.7);
            
                    allTrees[i].tree.visible = false;
                    allTrees[i].shroom = shroom;
                    allTrees[i].deadShroom = deadShroom;
                    deadShroom.visible = false;
                    deadShroom.setInteractive({ cursor: 'url(assets/sprites/saw.cur), pointer' });
                }        
            }
        } else if (currentFireCount + removedTreeCount == 200) {
            gameOver(this);
        }
    }
}


// Create the entire tree scene
// th = this
// bounds = boundaries of the game
function createScene(th, bounds) {
    
    // Get the x and y values for the trees
    arrangeTrees(bounds);
    
    // For loop to create trees
        for (let i = 0; i < 200; i++) {
            // Create a tree and add it to the window
            var tree = th.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
            var burntTree = th.add.sprite(treeArr[i].x, treeArr[i].y, 'burntTree').setName('Burnt' + i);
            burntTree.setInteractive({ cursor: 'url(assets/sprites/saw.cur), pointer' });
        	
            burntTree.visible = false;
        
            burntTree.setInteractive();
        
            // Add the tree to the containers array
            treeContains.push(tree);    
        
            // Generate either 1 or 2 to choose the fire type
            var fireType = Math.floor(Math.random() * 2);
        
            // If the first fire type, add it
            if (fireType == 0) {
          
                // Makes fire on the tree
                fire = th.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim1').setName('Fire' + i);
                fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
                
        
                // Animate the fire
                fire.anims.play("burn1");
            
                // If the second fire type, add it
            } else if (fireType == 1) {
            
                // Makes fire on the tree
                fire = th.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim2').setName('Fire' + i);
               	fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
            
                // Animate the fire
                fire.anims.play("burn2");
            
                // Otherwise, in case of a weird number, add the first one
            } else {
                // Makes fire on the tree
                fire = th.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim').setName('Fire' + i);
                fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
        
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
                shroom: null,
                deadShroom: null,
                x: treeArr[i].x,
                y: treeArr[i].y
            });
        }
    
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
        
        // Make the fire visible for the user, and thus clickable.   
        f.visible = true;
			
        //Start fire sound only once
        if (fireSoundBoolean == false) {
            fireSound.play(fireConfig);
            fireSoundBoolean = true;
        }
			
        // Bring the fire to the top of the window
        th.children.bringToTop(f);
	    
        // Increase the count of total fires (includes past removed fires).
        fireCount++;
        
        // Increase the current fire count.
        currentFireCount++;
	    
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
	
// Adds a point to the player score
function addPoints(th) {
    
    playerScore += 10;
    scoreCounter.setText(scoreTitle + playerScore);
    th.children.bringToTop(scoreCounter);
    
}
	
// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}
	
// Extinguishes the fire
// f = the fire
function extinguishFire(f, th) {
	
    // Get the number of the fire
    var fireNumber = parseInt((f.name.replace('Fire', '')), 10);
        
    // Check to see if we're actually clicking a fire
    if (!isNaN(fireNumber)) { 
    
        // If the fire hasn't been put out yet, add points
        // This ensures the points are only added once
        if (f.visible == true) {
            
            // Play extinguish fire sound
            waterSound.play(waterConfig);
        
            // Add points to counter
            addPoints(th);
            
            // Store the last extinguished fire number
            removedFires.push(fireNumber);
                    
            // Decrease the current fire count
            currentFireCount--;
        }
    
        // Now set the fire to invisible
        f.visible = false;

        // Mute the fire noise
        fireSoundBoolean = false;
        fireSound.stop();
    }
}
	
// Function to delay the burning of a tree
// t = specific index at the tree array
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
// t = specific index at the tree array
// f = the fire from that index
function burnTree(t, f) {
	    
    // Get the actual tree
    var tree = t.tree;

    // Get the currently invisible burnt tree
    var burnt = t.burnt;

    // Ensure the tree isn't already burnt down
    if (burnt.visible == false) {

        // If the fire hasn't been clicked
        if (f.visible == true) {

            // Check if in Mario mode
            if (!marioed) {

                // Make the actual tree invisible
                tree.visible = false;

                // Make the burnt tree visible
                burnt.visible = true;
                                
            } else {
                
                // Make the normal mushroom invisible
                t.shroom.visible = false;
                
                // Make the sad dead mushroom visible
                t.deadShroom.visible = true;
            }
        }
    }
}
	
// Function to remove a burnt tree
// th = 'this'
// b = the burnt tree
function removeTree(th, b, f) {
	        
    // Get the number of the burnt tree
    var burntNumber = parseInt(b.name.replace('Burnt', ''), 10);
    
    var deadShroomNumber = parseInt(b.name.replace('deadShroom', ''), 10);
    
    // Ensure this is a burnt tree
    if (!isNaN(burntNumber)) {
        
        // Go through all previously extinguished fires
        for (let i = 0; i < removedFires.length; i++) {
        
            // Check to see if the fire has been extinguished yet
            if (burntNumber == removedFires[i]) {
                
                // Make the burnt tree disappear
                b.visible = false;
                
                // Increase the count of removed trees
                removedTreeCount++;
                
                // Remove the extinguished fire from the array
                removedFires.splice(i, 1);
            }
        }
        
    } else if (!isNaN(deadShroomNumber)) {
                
        // Go through all previously extinguished fires
        for (let i = 0; i < removedFires.length; i++) {
            
            // Check to see if the fire has been extinguished yet
            if (deadShroomNumber == removedFires[i]) {
                
                // Make the dead mushroom disappear
                b.visible = false;
                
                // Increase the count of removed trees/shrooms
                removedTreeCount++;
                
                // Remove the extinguished fire from the array
                removedFires.splice(i, 1);
            }
        }
    }
}

// Game over function
function gameOver(th) {
    console.log("Game Over");
    
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

 
