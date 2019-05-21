
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
		//let btn = this.add.sprite(0, 0, 'button_image');
		//btn.setOrigin(0, 0);
		
		
		  // Create title text
	    titleText = this.add.text(15, 70, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
	
	        
	    // Create subtext
	    subText = this.add.text(200, 200, 'Tap the fires to save the forest!', { fontSize: '24pt', fill: 'white', fontFamily: 'VT323'});
	
	    // Create score counter, currently unused
	    //scoreCounter = this.add.text(10, 10, scoreString + score, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
	     
	     
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

	    animCamp = this.anims.create(campAnimConfig);
	    spriteCamp = this.add.sprite(450, 450, 'campFire').setScale(0.5);
	
	    console.log(spriteCamp);
	
	    spriteCamp.anims.play('camping');
	     
	      
	    // Create start buttons
	    startBtn = this.add.sprite(400, 300, 'startButt').setInteractive();
  		startSound = this.sound.add('startPlay', waterConfig);   
	    
        
	    /**** Start button functionality ****/
        
	    startBtn.on('pointerover', changeColor);
        
	    startBtn.on('pointerout', revertColor);
        
        
	    //Event handler for start button
		startBtn.on('pointerdown', function () {
			startSound.play();
            
            if (this.scale.isFullscreen) {

				this.scale.stopFullscreen();

			} else {

				this.scale.startFullscreen();
			}
			
            console.log('From TitleScene to GamePreload');
            
			//titleMusic.pause();
            
            this.scene.start('GamePreload');
            

        }, this);
		
		// On start button press  
		startBtn.on('pointerdown', startGame);

        // Check orientation
		whatOrientation(this.scale.orientation);
		this.scale.on("orientationchange", whatOrientation, this);

	}

}

//Function for stopping start screen music
function startGame() {  
	   start = true;
	   titleMusic.stop();
}

function whatOrientation (orientation) {
	var gameDiv = document.getElementById("game");
	if (orientation === Phaser.Scale.PORTRAIT) {
		console.log("Portrait Mode");
		// gameDiv.style.display = "none";
	} else  {
		console.log("LandScape Mode");
		// gameDiv.style.display = "block";
	}
}

//export default TitleScene;

