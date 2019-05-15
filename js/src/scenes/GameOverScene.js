class GameOverScene extends Phaser.Scene {
	constructor(){
		super({
			key: "GameOverScene"
		});
		this.scalingAmt = 1.0;
	}
	
	preload(){
	
		this.load.image('restartButt', '../assets/sprites/restartBtn.png'); // start button
	}
	create(){
	 // Create start buttons
	    restartBtn = this.add.sprite(400, 270, 'startButt').setInteractive();
  		restartSound = this.sound.add('startPlay', waterConfig);   
	    
	    // Start button functionality

	    restartBtn.on('pointerover', changeColor);
	    restartBtn.on('pointerout', revertColor);
	    //Event handler for start button
		restartBtn.on('pointerdown', function () {
			startSound.play();
			
            console.log('From TitleScene to GameScene');
			//titleMusic.pause();
            this.scene.start('GameScene');
            

        }, this);
		
		  
		restartBtn.on('pointerdown', startGame);
	}
	
}