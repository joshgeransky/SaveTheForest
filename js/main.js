// Variable holding configuration
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
var hsv = [];
var arrLength = Math.floor(Math.random() * 200) + 100;
var fireArr = [arrLength];
var startBtn;
var titleText;
var subText;
var scoreCounter;
var scoreTitle = "Score: ";
var playerScore = 0;
var start = false;
var treeArr = [];


// Preloading function
function preload () {
        this.load.image('background', '../assets/splash/800x600-grass-background.png');
        this.load.image('logo', '../assets/splash/title-text.png');
        this.load.image('tree1', '../assets/sprites/tree1(64x64).png');
        this.load.image('tiles', 'assets/sprites/grassTile2.png');
        this.load.image('fire', 'assets/sprites/flame2.png');
        this.load.spritesheet("fireAnim1", "assets/sprites/fireAnimationNew.png", {frameWidth: 42, frameHeight: 64, endFrame: 11});
        this.load.spritesheet("fireAnim2", "assets/sprites/fireAnimation64.png", {frameWidth: 64, frameHeight: 64, endFrame: 23});
        this.load.image('startBtn', '../assets/sprites/startBtn.png');
}

// Creation function
function create () {

	// config for fireAnim1
	var configFire1 = {
		key: "burn1",
        frames: this.anims.generateFrameNumbers("fireAnim1", 
        {
            start : 0,
            end : 12,
            first : 12
        }),
		frameRate: 12,
		repeat: -1
    }

    //config for fireAnim2
    var configFire2 = {
        key: "burn2",
        frames: this.anims.generateFrameNumbers("fireAnim2",
        {
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
                
    // Add tiled background
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
		
    // Startup
    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
    var tileset = map.addTilesetImage('tiles');
    var layer = map.createStaticLayer(0, tileset, 0, 0);
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);    
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);		    
                
    var bounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    var containers = [];
		
    var container = this.add.container(0, 0).setName('Container1');
    window['Container1'] = container;
		
    var containerNum = 1;

    // Creating the fire animations
    this.anims.create(configFire1);
    this.anims.create(configFire2);
    
    // Arrange the trees by y values
    arrangeTrees(bounds);

    // For loop to create trees
    for (let i = 0; i < 200; i++) {
        // Create a tree and add it to the window
        var tree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
        
        if (i > 0 && i % 8 === 0) {
	       container = this.add.container(0, 0).setName('Container' + containerNum);
	       containers.push(container);
	       window['Container' + containerNum] = container;
	       containerNum++;
        }
        
        // Add the tree to the containers array
        containers.push(tree);
    }
    
    
    // Create fires on all trees, for testing purposes
    for (let i = 0; i < treeArr.length; i++) {
        var fireType = Math.floor(Math.random() * 2);
        console.log(fireType);
        // fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim1');
        // fire.anims.play("burn1");
        fire = this.add.sprite(treeArr[i].x, treeArr[i].y, "fireAnim2");
        fire.anims.play("burn2");
        window['Sprite' + i] = tree;        
        fire.setInteractive();
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
   

function arrangeTrees(bounds) {
    
    for (let i = 0; i < 200; i++) {
        var x = Phaser.Math.Between(bounds.left, bounds.right);
        var y = Phaser.Math.Between(bounds.top, bounds.bottom);
        
        treeArr.push({
            x: x,
            y: y
        });
        
        sortTrees(treeArr[0], treeArr[i]);    
    }
    
}

// Set fires to trees randomly
function update () {
    if(start) { //only remove fires when the game has officially started
        this.input.on('gameobjectdown', function(pointer, fire) {
            fire.setVisible(false);
        });
    }
}

function saveTree(){
  playerScore++;
  scoreCounter.setText(scoreTitle + playerScore);
}

// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}

function extinguishFire(){
  this.visible = false;
  destroySprite(this);
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


//should destroy the sprites
function destroySprite(sprite) {
	sprite.destroy();
}
