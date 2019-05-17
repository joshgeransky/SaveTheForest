class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameScene"
		});
		this.scalingAmt = 1.0;
	}
    
	preload() {
       //   this.load.plugin('DialogModalPlugin', 'dialog_plugin.js');
        /* -------- Sprites -------- */
        this.load.image('tree1', '../assets/sprites/Tree_3.png'); // Regular tree
        this.load.image('burntTree', '../assets/sprites/Burnt_Tree_3.png'); // Burnt tree
        this.load.image('tiles', 'assets/sprites/grassTile2.png'); // Grass tile
        this.load.image("tilesDynamic", "assets/sprites/jungleTileSet.png"); //Object layer tiles
        this.load.image('mushroom', 'assets/sprites/mushroom.png');
        this.load.image('deadShroom', 'assets/sprites/dead-mushroom.png');
        this.load.spritesheet("fireAnim1", "assets/sprites/fireAnimation64.png", {frameWidth: 64, frameHeight: 64, endFrame: 24}); // first fire
        //this.load.image('startBtn', '../assets/sprites/startBtn.png'); // start button
        this.load.spritesheet("fireAnim2", "assets/sprites/fireAnimationNew.png", {frameWidth: 42, frameHeight: 64, endFrame: 11}); // second fire
		this.load.image("msgBox", "../assets/images/chatbox.png");
		this.load.image("okBtn", "../assets/images/ok.png");

        /* -------- Audio -------- */
        this.load.audio('water', ['assets/sounds/Tree_Extinguish1.mp3']);
        this.load.audio('fire', ['assets/sounds/fire.mp3']);
        this.load.audio('game', ['assets/sounds/Game_Screen_1.mp3']);   
        this.load.audio('start', ['assets/sounds/Start_1.mp3']);     
        this.load.audio('gameover', ['assets/sounds/GameOver.mp3']);     
        this.load.audio('marioMusic', ['assets/sounds/mario.mp3']);
		this.load.audio('chopTree', ['assets/sounds/chopTree.wav']); 
}

firstBurntTree = false;

    // Creation function
    create() {
         
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
        
        titleMusic.stop();
        gameMusic = this.sound.add('game', musicConfig);
        gameMusic.play();
        fireSound = this.sound.add('fire', fireConfig);
        waterSound = this.sound.add('water', waterConfig);
        startSound = this.sound.add('start', waterConfig);   
        gameOverSound = this.sound.add('gameover', musicConfig);
        marioMusic = this.sound.add('marioMusic', marioConfig);
		chopTreeSound = this.sound.add('chopTree', waterConfig);

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

//wild fire facts array with 20 facts, to lessen the chance of repeats
facts = [
'A typical year has over 9,000 forest fires in Canada.', //1
'An average of 2.5 million hectares or 25,000 square kilometers are burned in a year.', //2
'The smoke released by the fire can cause health problems.', //3
'Forest fires can burn from a rate of 0.5 km/h to 6 km/h or more.', //4
'In Canada, two-thirds of all forest fires are caused by humans.', //5
'Wildfires need fuel, oxygen, and heat to ignite and burn.', //6
'On average, 40% of wildfires in British Columbia were started by humans.', //7
'Human caused wildfires attribute to: cigarettes, campfires, engines/vehicles, and more.', //8
'Never leave a fire unattended before leaving the campsite.', //9
'Call 911, a local fire department, or the park service if you notice smoke or fire.', //10
'Never discard smoking materials from moving cars or park grounds.', //11
'All wildfires in British Columbia are investigated for its origin and cause.', //12
'Wildfires usually occur from May to September.', //13
'The smoke from BC\'s 2018 wildfires spread from across Canada to as far as Ireland.', //14
]; 
 
factsLength = facts.length - 1; // will display 5 facts per game
clickedBurntTree = 0;

//initializing milestones
trophyTen = false;
trophyTwenty = false;
trophyThirty = false;
trophyFourty = false;
trophyFifty = false;
trophySixty = false;
trophySeventy = false;
trophyEighty = false;
trophyNinety = false;
trophyHun = false;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(facts);

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

		var textStyle = {fontSize: '16pt', fontFamily: 'VT323', fill: 'white', backgroundColor: 'black', align: 'center'};
         
		
		// Create score counter
        scoreCounter = this.add.text(10, 10, scoreTitle + playerScore, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
        textHolder = this.add.text(0, 580, "default");
		textHolder.setStyle({
        fontSize: '16pt',
        fontFamily: 'VT323',
        color: '#ffffff',
        //align: 'center',
        backgroundColor: 'black',
      });
		//textHolder.setOrigin(0.5);
		//textHolder.setX(200);
		textHolder.visible = false;
				
        // For loop to create trees
        for (let i = 0; i < 200; i++) {
            // Create a tree and add it to the window
            var tree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
            var burntTree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'burntTree').setName('Burnt' + i);
        
            burntTree.visible = false;
        
            burntTree.setInteractive();
        
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
                shroom: null,
                deadShroom: null,
                x: treeArr[i].x,
                y: treeArr[i].y
            });
        }
        
        this.children.bringToTop(scoreCounter);
		this.children.bringToTop(textHolder);
		this.children.bringToTop(allTrees.burnt);
    }
   
    // Arrange the trees using the boundaries
    arrangeTrees(bounds) {
    
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
    update() {
    
        // Variable to see what fire is being clicked
        var clickedFire;
        
        // Variable for 'this'
        var th = this;
        
        // If the game has started
        if (start) {
            // When a fire is clicked
            this.input.on('gameobjectdown', function(pointer, fire) {
			 
                // Set the clickedFire variable (may be unnecessary)
                clickedFire = fire;
           
                // Extinguish the fire
                extinguishFire(fire, th);
	
                removingFire = true;
                			
            });
        
            if (!removingFire) {
                // When a burnt tree is clicked
                this.input.on('gameobjectdown', function(pointer, burnt) {
					//waterSound.stop();
					//play chopping music
					//chopTreeSound.play(waterConfig);

                    //Remove the burnt tree
                    removeTree(this, burnt, clickedFire);	
					
					//no longer reading tool tip
					readingToolTip = false;
					
					//to keep track of tool tip 
					clickedBurntTree += 1;
					
					//removes text when user clicks on a burnt tree
					if(clickedBurntTree == 1) {
						textHolder.setText();
					}
                });
            }
        
            // Check what stage the user is at
            detStage();
			/**
			//makes it so the informational text disappears on a timer
			if(readingToolTip == false) {
				//setTimeout(setBlank, stageDelay);
				//timedEvent = this.time.delayedCall(5000, setBlank, [], this);
				textDelay(this);
				console.log("should have been delayed");
			}
        */
            // Delay and then make the fire
            this.time.addEvent({
                delay: stageDelay,
                callback: ()=>{
                    startFires(this) // Send 'this' over so not everything has to be done in this function
                },
                loop: false // Do not loop, the update function loops by itself
            });
			
			 this.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    delayText() // Send 'this' over so not everything has to be done in this function
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
                    deadShroom.setInteractive();
                }        
            }
        }
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
	        
        // For loop to search through the entire liteFire array.
        // If a matching fire is found that means it's already been lit, and it will find another fire.
        for (let i = 0; i < litFires.length; i++) {
            // While loop to avoid the remote possibility of the grabbing the same fire again.
            while (f == litFires[i]) {
                // Get a new random fire from the fire array.
                f = Phaser.Utils.Array.GetRandom(allTrees);
            }
        }
	    
        // Make the fire visible for the user, and thus clickable.   
        f.visible = true;
			
        //Start fire sound only once
        if (fireSoundBoolean == false) {
            fireSound.play(fireConfig);
            fireSoundBoolean = true;
        }
			
        // Bring the fire to the top of the window
        th.children.bringToTop(f);
	    
        //Push the fire to the lit fires array.
        litFires.push(f);
	    
        // Increase the count of total fires (includes past removed fires).
        fireCount++;
		
		// Randomly assigns a number from 1 to 3
		ran = Math.floor(Math.random() * 3 + 1);
		//ran = 3;
		console.log("random is: " + ran);
		
		if(readingToolTip == false && clickedBurntTree >= 1) {
			textHolder.setText();
		}
		//makes it so the second text to display will always be the tool tip instead of another fact
		while(ran == 3 && clickedBurntTree == 0 || playerScore == 100 || playerScore == 200
		|| playerScore == 300 || playerScore == 400 || playerScore == 500 || playerScore == 600
		|| playerScore == 700 || playerScore == 800 || playerScore == 900 || playerScore == 1000) {
			ran = Math.floor(Math.random() * 3 + 1);
			console.log("new random is: " + ran); 
		}
		
		//shows tool tip only when the random is not a 3 and there's been a burnt tree
		//ran can't be 3 because it will override a fact resulting in the fact not being displayed
		if(firstBurntTree && burntTreeCounter == 0 && ran != 3) {
			toolTip(th);
			burntTreeCounter++;
		}	
		
		//1 in 3 chance of a fact popping up,
		//stops trying to display facts after all facts are displayed
		if(ran == 3 && readingToolTip == false && factsLength >= 0) {
			
			//textHolder is initially not displayed
			textHolder.visible = true;
			
			console.log("Fact supposed to be displayed is: " + facts[factsLength]);
			
			updateInfo(th);
		}
	    
        // Print the fire count to console (for testing purposes)
        console.log('FireCount ' + fireCount);
	        
        // Determine how long until the next fire should pop up
        detStage();
		
		 // Activate function to replace the tree with a burnt tree after a set amount of time
			burnDelay(t, f, th);
			
			/**
	     	if(readingToolTip == false && !wait5Secs) {           
					setBlank();
					wait5Secs = true;
					console.log("already set blank");	
					
			}
		*/
        // After delay time, allow the update function to make another fire.
		
        setTimeout(delayFires, stageDelay);
		//setTimeout(delayText, 5000);
		
	}
}

function delayText() {
	wait5Secs = false;
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

function setBlank() {
	textHolder.setText();
}

//displays a tool tip for chopping down a tree the first time it appears 
function toolTip(th) {
	console.log("should be setting text, inside tooltip");
	textHolder.setText("Click on the burnt tree to chop it down, so fires do not spread faster.");
	th.children.bringToTop(textHolder);
	readingToolTip = true;
}

//function to update the text holding the informational facts
function updateInfo(th) {
	if (factsLength < 0) { //no more facts to display
		textHolder.setText();
	} else { //display the fact
		textHolder.setText(facts[factsLength]);
		th.children.bringToTop(textHolder);
		factsLength -= 1;
	}
}	

// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}
	
function textDelay(th) {
    // Delay and then remove text
    th.time.addEvent({
        delay: 5000,
        callback: ()=>{
            setBlank()
        },
        loop: false // Do not loop, once it's removed once, it's done
    });	
}

// Extinguishes the fire
// f = the fire
function extinguishFire(f, th) {
	
    // Play extinguish fire sound
    waterSound.play(waterConfig);
    
    // If the fire hasn't been put out yet, add points
    // This ensures the points are only added once
    if (f.visible == true) {
        // Add points to counter
        addPoints(th);
		
		//milestone/trophy announcements for the player
		if(ran != 3) {
			if(trophyTen == false && playerScore == 100) {
				textHolder.setText("You have saved 10 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 10 trees");
				trophyTen = true;
			}
			if(trophyTwenty == false && playerScore == 200) {
				textHolder.setText("You have saved 20 trees, keep going!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 20 trees");
				trophyTwenty = true;
			}
			if(trophyThirty == false && playerScore >= 300) {
				textHolder.setText("Wow! You have saved 30 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 30 trees");
				trophyThirty = true;
			}
			if(trophyFourty == false && playerScore >= 400) {
				textHolder.setText("Holy smokes, you have saved 40 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 40 trees");
				trophyThirty = true;
			}
			if(trophyFifty == false && playerScore >= 500) {
				textHolder.setText("Amazing, you have saved 50 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 50 trees");
				trophyThirty = true;
			}
			if(trophySixty == false && playerScore >= 600) {
				textHolder.setText("Is this even possible? You have saved 60 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 60 trees");
				trophyThirty = true;
			}
			if(trophySeventy == false && playerScore >= 700) {
				textHolder.setText("You are a firefighter, 70 trees have been saved!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 70 trees");
				trophyThirty = true;
			}
			if(trophyEighty == false && playerScore >= 800) {
				textHolder.setText("The forest is eternally greatful to you. 80 trees have been saved.");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 80 trees");
				trophyThirty = true;
			}
			if(trophyNinety == false && playerScore >= 900) {
				textHolder.setText("Unbelievable! You have saved 90 trees!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 90 trees");
				trophyThirty = true;
			}
			if(trophyHun == false && playerScore >= 1000) {
				textHolder.setText("You have truly saved the forest, 100 trees and counting...!");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 100 trees");
				trophyThirty = true;
			}
		}
    }
    
    // Now set the fire to invisible
    f.visible = false;

    // Mute the fire noise
    fireSoundBoolean = false;
    fireSound.stop();
	   
    // For loop to remove the fire from the litFires array
    for (let i = 0; i < litFires.length; i++) {
        if (f == litFires[i]) {
	        litFires.splice(i, 1);
	    }
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
				
			
				//for showing a tool tip message about clicking on trees to chop
				if(firstBurntTree == false) {
					console.log("firstBurntTree should be true");
				//a burnt tree has appeared for the first time
				firstBurntTree = true;
	
				}
            } else {
                t.shroom.visible = false;
                t.deadShroom.visible = true;
            }
        }
    }
}
	
// Function to remove a burnt tree
// th = 'this'
// b = the burnt tree
function removeTree(th, b, f) {
	        
    // Ensure the tree is no longer on fire
    if (f.visible == false) {
        // Make the burnt tree disappear
        b.visible = false;
    }
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
