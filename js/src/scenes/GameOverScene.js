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

		// continue button functionality
		continueBtn.on('pointerover', changeColor);
        
	    continueBtn.on('pointerout', revertColor);
		

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {


			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
			}
			return array;
		}
	
		continueBtn.on('pointerdown', function () {
			
			gameOverSound.stop();
			startSound.play();
			
			// If the player score is higher than the highScoreMin after game over, they will enter their name
			// to the high score table. highScoreMin = lowest value on the high score table.
			// Also allows the player to enter a value onto the high score table if the table is not
			// already filled. See firebase.js for variables.
			
			if (playerScore > highScoreMin || highScoreCount != highScorePlaces) {

				this.scene.start('EnterName');

			} else {

				//this.scene.start('TitleScene'); --- Tends to screw up the game
                
                // Reloads the page
                // (cheesy way to restart the game without causing problems)
                location.reload();
			}
			//reset playerscore
			//playerScore = 0;
			
			//reset facts index
			//factsLength = 4;
			
			//reshuffle facts array
			//shuffle(facts);
			
        }, this);
	}
}