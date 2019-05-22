class GameOverScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameOverScene"
		});
		this.scalingAmt = 1.0;
	}

	preload() {

	}
	create() {

		let background = this.add.sprite(0, 0, 'gameOverBackground');
		background.setOrigin(0, 0);

		var gameOverText = this.add.text(500, 120, "Game Over", { fontSize: '70pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white' });
		gameOverText.setOrigin(0.5);

		var yourScoreText = this.add.text(500, 250, "Your Score:", { fontSize: '50pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white' });
		yourScoreText.setOrigin(0.5);

		var scoreText = this.add.text(500, 320, playerScore, { fontSize: '70pt', stroke: 0x000000, strokeThickness: 6, fontFamily: 'VT323', fill: 'white' });
		scoreText.setOrigin(0.5);

		var continueBtn = this.add.sprite(500, 490, 'continueBtn').setInteractive();

		// continue button functionality
		continueBtn.on('pointerover', changeColor);

		continueBtn.on('pointerout', revertColor);

		continueBtn.on('pointerdown', function () {

			gameOverSound.stop();
			startSound.play();

			// If the player score is higher than the highScoreMin after game over, they will enter their name
			// to the high score table. highScoreMin = lowest value on the high score table.
			// Also allows the player to enter a value onto the high score table if the table is not
			// already filled. See firebase.js for variables.

			if (playerScore > highScoreMin || highScoreCount != highScorePlaces) {

				this.scene.start('LoadKeyboard');

			} else {

				location.reload();
			}

		}, this);
	}

}

