//Variable holding configuration
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game',
        
        scene: {
        preload: preload,
        create: create,
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
    //Preloading function
    function preload () {
        this.load.image('background', '../assets/splash/800x600-grass-background.png');
        this.load.image('logo', '../assets/splash/title-text.png');
        this.load.image('tree1', '../assets/sprites/tree1(64x64).png');
        this.load.image('tiles', 'assets/sprites/grassTile2.png');
    }

    //Creation function
    function create () {
        
        //Add the preset grass background (800x600)
        //background = this.add.image(400, 300, 'background');
        
        
        //Add tiled background
         var level = [];
		    for (var y = 0; y < height; y++)
		    {
		        var row = [];
		        for (var x = 0; x < width; x++)
		        {
		            //var tileIndex = Phaser.Math.RND.integerInRange(0, 0);
		            row.push(0);
		        }
		        level.push(row);
		    }
		
		    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
		    var tileset = map.addTilesetImage('tiles');
		    var layer = map.createStaticLayer(0, tileset, 0, 0);
			
		    this.cameras.main.setBounds(0, 0, layer.width, layer.height);
	                
	        //For loop to randomly generate trees around the map
	        for (let i = 0; i < (Math.floor(Math.random() * 200) + 100); i++) {
	            var randX = Math.floor(Math.random() * 800);
	            var randY = Math.floor(Math.random() * 600);
	            
	            tree = this.add.image(randX, randY, 'tree1');
	        }
        
        //Create title text
        this.titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
        
        //Create subtext
        this.subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});
        
        //Create play button text --- Not Functional, should be actual button
        this.playButton = this.add.text(300, 300, 'PLAY', {
            fontSize: '100pt',
            fill: 'white',
            fontFamily: 'VT323',
            backgroundColor: 'blue',
            
        });

    }
