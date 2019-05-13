
class TitleScene extends Phaser.Scene {
	constructor(){
		super({
			key: "TitleScene"
		});
		this.scalingAmt = 1.0;
	}
	preload(){
		this.load.image('background_image', '../assets/images/forestBackground.png');
		this.load.image('startButt', '../assets/sprites/startBtn.png'); // start button
		this.load.spritesheet('campFire', '../assets/sprites/campFireSprites.png', { frameWidth: 275, frameHeight: 400, endFrame: 8});
		//music
		this.load.audio('bg', ['assets/sounds/Title_Screen_1.mp3']);
		this.load.audio('water', ['assets/sounds/Tree_Extinguish1.mp3']);
		this.load.audio('fire', ['assets/sounds/fire.mp3']);
		this.load.audio('game', ['assets/sounds/Game_Screen_1.mp3']);   
		this.load.audio('startPlay', ['assets/sounds/Start_1.mp3']);   
		this.load.audio('gameover', ['assets/sounds/GameOver.mp3']);    
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
	    titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
	
	        
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
	    startBtn = this.add.sprite(400, 270, 'startButt').setInteractive();
  		startSound = this.sound.add('startPlay', waterConfig);   
	    
	    // Start button functionality

	    startBtn.on('pointerover', changeColor);
	    startBtn.on('pointerout', revertColor);
	    //Event handler for start button
		startBtn.on('pointerdown', function () {
			startSound.play();
			
            console.log('From TitleScene to GameScene');
			//titleMusic.pause();
            this.scene.start('GameScene');
            

        }, this);
		
		  
		startBtn.on('pointerdown', startGame);

		
	}

}
function startGame() {
	   
	   start = true;
	   titleMusic.stop();


	}
	

//export default TitleScene;

