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

		console.log("HIGH SCORE COUNT: " + highScoreCount);

		let background = this.add.sprite(0, 0, 'gameOverBackground');
		background.setOrigin(0, 0);

		var gameOverText = this.add.text(400, 120, "Game Over", {fontSize: '70pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white'});
		gameOverText.setOrigin(0.5);
		
		var yourScoreText = this.add.text(400, 250, "Your Score:", {fontSize: '50pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white'});
		yourScoreText.setOrigin(0.5);

		var scoreText = this.add.text(400, 320, playerScore, {fontSize: '70pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white'});
		scoreText.setOrigin(0.5);

		var continueBtn = this.add.sprite(400, 490, 'continueBtn').setInteractive();

		continueBtn.on('pointerdown', function () {

			startSound.play();

			// If the player score is higher than the highScoreMin after game over, they will enter their name
			// to the high score table. highScoreMin = lowest value on the high score table. See firebase.js
			
			if (playerScore > highScoreMin || highScoreCount != highScorePlaces) {

				this.scene.start('EnterName');

			} else {

				this.scene.start('TitleScene');
			}


        }, this);
	}
}