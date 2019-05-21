class TitleScene extends Phaser.Scene {
	constructor(){
		super({
			key: "TitleScene"
		});
		this.scalingAmt = 1.0;
	}
	preload(){
	}
	
	create (){		
		    
		//music
		titleMusic = this.sound.add('bg', musicConfig);
		titleMusic.play(musicConfig);
		
		let background = this.add.sprite(0, 0, 'background_image');
		background.setOrigin(0, 0);
		
		// Create title text
	    titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
	        
	    // Create subtext
	    subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});
		
		//campfire animations setup
	    let campAnimConfig = {
			key: 'camping',
	    	frames: this.anims.generateFrameNumbers('campFire',{
				start : 0,
	            end : 7,
	            first : 7
	        }),
	    	frameRate: 8,
	    	repeat: -1    	
	    };
		
		//creating and adding the campfire sprite to title page
	    animCamp = this.anims.create(campAnimConfig);
	    spriteCamp = this.add.sprite(450, 450, 'campFire').setScale(0.5);
	
	    console.log(spriteCamp);
	
	    spriteCamp.anims.play('camping');
	     
	      
	    // Create start buttons
	    startBtn = this.add.sprite(400, 270, 'startButt').setInteractive();
  		startSound = this.sound.add('startPlay', waterConfig);   
	    
	    // Start button functionality
	    startBtn.on('pointerover', changeColor);
	    startBtn.on('pointerout', revertColor);
		
	    //Event handler for start button
		startBtn.on('pointerdown', function () {
			startSound.play();
			this.scene.start('GamePreload');
			
        }, this);
		 
		startBtn.on('pointerdown', startGame);
	}
}
function startGame() {  
	start = true;
	titleMusic.stop();
}
	
//export default TitleScene;
