	//Variable holding configuration
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
	    };

    //Create the game variable
    var game = new Phaser.Game(config);
    var width = 40;
	var height = 38;
	var value = Phaser.Math.Between(4, 10);
	var i = 0;
	var hsv = [];
    var score = 0;
    var scoreText = "Score: ";
    var scoreCounter;

	var treeArr = [];
	var arrLength = Math.floor(Math.random() * 200) + 100;
	
	var startBtn;
	var titleText;
	var subText


    //Preloading function
    function preload () {
        this.load.image('background', '../assets/splash/800x600-grass-background.png');
        this.load.image('logo', '../assets/splash/title-text.png');
        this.load.image('tree1', '../assets/sprites/tree1(64x64).png');
        this.load.image('tiles', 'assets/sprites/grassTile2.png');
        this.load.image('fire', 'assets/sprites/flame2.png');
        this.load.image('startBtn', '../assets/sprites/startBtn.png');

    }

	function start() {
	console.log("Hello");
	}
    //Creation function
    function create () {
        
        //Add the preset grass background (800x600)
        background = this.add.image(400, 300, 'background');
        

        var xValues = [];
        var yValues = [];
        
        

        //Add tiled background
         var level = [];
		    for (var y = 0; y < height; y++)
		    {
		        var row = [];
                yValues[y] += y;
		        for (var x = 0; x < width; x++)
		        {
                    xValues[x] += x;
                    
		            var tileIndex = Phaser.Math.RND.integerInRange(0, 0);
		            row.push(0);
		        }
		        level.push(row);
		    }
		
		    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
		    var tileset = map.addTilesetImage('tiles');
		    var layer = map.createStaticLayer(0, tileset, 0, 0);
			
		    this.cameras.main.setBounds(0, 0, layer.width, layer.height);    

		    this.cameras.main.setBounds(0, 0, layer.width, layer.height);
        
            //for (let i = 0; i < tileset.size(); i++) {
                //tree.add.image(xValues[i], yValues[i], 'tree1')
            //}
      
	        //For loop to randomly generate trees around the map

	        for (let i = 0; i < arrLength; i++) {

	            var randX = Math.floor(Math.random() * 800);
	            var randY = Math.floor(Math.random() * 600);
	            tree = this.add.image(randX, randY, 'tree1').setInteractive();
              
                tree.on('pointerdown', saveTree);

	            var randValue = Math.floor(Math.random() * (5 - +1)) + 1;
    		
	            treeArr[i] = tree;

	        }
        	
        //Create title text
        titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
        
        //Create subtext
        subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});
        
        var scoreText = this.add.text(10, 10, scoreString + score, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
        
        startBtn = this.add.sprite(420, 400, 'startBtn').setInteractive();
        
        startBtn.on('pointerdown', startGame);
       	startBtn.on('pointerover', changeColor);
       	startBtn.on('pointerout', revertColor);
       	
      
       }

    function update () {
    	for(i = 0; i < arrLength; i++){
    		var randValue = Math.floor(Math.random() * (5 - +1)) + 1;
    		
    		if(randValue > 3){
    		 this.tree = this.add.image(treeArr[i].x, treeArr[i].y, 'fire'); 
    		}	
    	}
    }

function saveTree() {
  console.log("Hi");
}
    
function startGame() {
   titleText.visible = false;
   subText.visible = false;
   startBtn.visible = false;
	  
	  //Removing all trees and planting new ones to "start game"
	  for (let i = 0; i < arrLength; i++){
	  	destroySprite(treeArr[i]);
	  }
}

function changeColor() {
    startBtn.setAlpha(0.7);

}

function revertColor() {
 	startBtn.setAlpha(1);
 }


//should destroy the sprites
function destroySprite(sprite) {
	sprite.destroy();
}

