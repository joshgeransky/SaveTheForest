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

		var continueBtn = this.add.sprite(400, 450, 'continueBtn').setInteractive();
		
		var yourScoreText = this.add.text(400, 200, "Your Score:", {fontSize: '60pt', fontFamily: 'VT323', fill: 'white'});
		yourScoreText.setOrigin(0.5);

		var scoreText = this.add.text(400, 275, playerScore, {fontSize: '60pt', fontFamily: 'VT323', fill: 'white'});
		scoreText.setOrigin(0.5);

		continueBtn.on('pointerdown', function () {

			startSound.play();
			

			// If the player score is higher than the highScoreMin after game over, they will enter their name
			// to the high score table. highScoreMin = lowest value on the high score table. See firebase.js
			
			if (playerScore > highScoreMin) {

				this.scene.start('EnterName');

			} else {

				this.scene.start('TitleScene');
			}


        }, this);
	}
}