class GameOverScene extends Phaser.Scene {
	constructor(){
		super({
			key: "GameOverScene"
		});
		this.scalingAmt = 1.0;
	}
	
	preload(){
	
	}
	create(){

		let background = this.add.sprite(0, 0, 'gameOverBackground');
		background.setOrigin(0, 0);

	 // Create start buttons
	    var restartBtn = this.add.sprite(400, 270, 'continueBtn').setInteractive();
  		// restartSound = this.sound.add('startPlay', waterConfig);   
	    
	    // Start button functionality

	    // restartBtn.on('pointerover', changeColor);
	    // restartBtn.on('pointerout', revertColor);
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