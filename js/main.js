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

    //Game variables
    var game = new Phaser.Game(config);
    var width = 40;
	var height = 38;
	var value = Phaser.Math.Between(4, 10);
	var i = 0;
	var hsv = [];

	var treeArr = [];
	var arrLength = Math.floor(Math.random() * 200) + 100;

	var fireArr = [arrLength];

	var startBtn;
	var titleText;

	var subText
    var scoreCounter;
    var scoreTitle = "Score: ";
    var playerScore = 0;
    


    //Preloading function
    function preload () {
        this.load.image('background', '../assets/splash/800x600-grass-background.png');
        this.load.image('logo', '../assets/splash/title-text.png');
        this.load.image('tree1', '../assets/sprites/tree1(64x64).png');
        this.load.image('tiles', 'assets/sprites/grassTile2.png');
        this.load.image('fire', 'assets/sprites/flame2.png');
        this.load.image('startBtn', '../assets/sprites/startBtn.png');

    }

    //Creation function
    function create () {

	//x and y coordinates stored in arrays
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
                    row.push(0);
		        }
		        level.push(row);
		    }
		
		//start-up
		    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
		    var tileset = map.addTilesetImage('tiles');
		    var layer = map.createStaticLayer(0, tileset, 0, 0);
		    this.cameras.main.setBounds(0, 0, layer.width, layer.height);    
		    this.cameras.main.setBounds(0, 0, layer.width, layer.height);
 
		    
        
         //   for (let i = 0; i < tileset.size(); i++) {
           //     tree.add.image(xValues[i], yValues[i], 'tree1')
        //    }
	     

	        //For loop to randomly generate trees around the map
	       for (let i = 0; i < arrLength; i++) {

	            var randX = Math.floor(Math.random() * 800);
	            var randY = Math.floor(Math.random() * 600);

	            tree = this.add.image(randX, randY, 'tree1').setInteractive();

	            treeArr[i] = tree;

	        }
        	/**

              
                tree.on("pointerdown", saveTree);
                tree.on("pointerdown", extinguishFire);

	            treeArr[i] = tree;
	            treeArr[i].setInteractive();
	            var randValue = Math.floor(Math.random() * (5 - 1)) + 1;
        		 if(randValue = 1){
		    		 hasFire = true;
		    	  }

	        }

	        for(i = 0; i < arrLength; i++){
    		var randValue = Math.floor(Math.random() * (5 - 1)) + 1;
    		
    		if(randValue > 3){
    		 this.tree = this.add.image(treeArr[i].x, treeArr[i].y, 'fire'); 
    		}	
    	}

        */	
        	
            var bounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);
		   	var containers = [];
		
		    var container = this.add.container(0, 0).setName('Container1');
		
		    containers.push(container);
		
		    window['Container1'] = container;
		
		    var containerNum = 1;

	    for (var i = 0; i < 128; i++)
	    {
	        var x = Phaser.Math.Between(bounds.left, bounds.right);
	        var y = Phaser.Math.Between(bounds.top, bounds.bottom);
			var randValue = Math.floor(Math.random() * (5 - 1)) + 1;
	        var tree = this.add.sprite(x, y, 'tree1').setName('Sprite' + i);
	        if(randValue > 3){
    		  fire = this.add.sprite(x, y, 'fire'); 
    		  fire.setInteractive();
    		}	
	        
	        window['Sprite' + i] = tree;
			tree.setDepth(600 - y);

	        tree.setInteractive();
	       

    		
	        
	
	        if (i > 0 && i % 8 === 0)
	        {
	            container = this.add.container(0, 0).setName('Container' + containerNum);
	
	            if (containerNum > 1)
	            {
	                var p = Phaser.Utils.Array.GetRandom(containers).add(container);
	                console.log(container.name, 'child of', p.name);
	                console.log(600 - y)
	            }
	
	            containers.push(container);
	
	            window['Container' + containerNum] = container;
	
	            containerNum++;
	        }
	
	        Phaser.Utils.Array.GetRandom(containers).add(tree);
	    }
	    
	     
    		
    		
    		
        //Create title text
        titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
        
        //Create subtext
        subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});

           //Create score counter
        //scoreCounter = this.add.text(10, 10, scoreString + score, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
      
     	//Create start buttons

        startBtn = this.add.sprite(420, 400, 'startBtn').setInteractive();
        
        //start button functionality
        startBtn.on('pointerdown', startGame);
       	startBtn.on('pointerover', changeColor);
       	startBtn.on('pointerout', revertColor);
      
       }
   
    //set fires to trees randomly
    function update () {
		
		this.input.on('gameobjectdown', function(pointer, fire){

        fire.setVisible(false);
    	});
    	
    }

function saveTree(){
  console.log("Extinguish fire!");
  playerScore++;
  scoreCounter.setText(scoreTitle + playerScore);
}

function extinguishFire(){
  this.visible = false;
  destroySprite(this);
}

//removes all titles, start button, trees when start button is clicked    
function startGame() {
   titleText.visible = false;
   subText.visible = false;
   startBtn.visible = false;
	  
	  //Removing all trees and planting new ones to "start game"
	  for (let i = 0; i < arrLength; i++){
	  	destroySprite(treeArr[i]);
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


//should destroy the sprites
function destroySprite(sprite) {
	sprite.destroy();
}


