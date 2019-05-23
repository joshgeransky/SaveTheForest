

class EnterName extends Phaser.Scene {
    constructor() {
        super({
            key: "EnterName",
        });
        this.scalingAmt = 1.0;
    }

    preload() {
       
    }

    create() {

        var invalidSFXConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

		/**Sounds */
        var invalidSFX = this.sound.add('invalidEntry', invalidSFXConfig);
        var backspaceSFX = this.sound.add('backspace', invalidSFXConfig);
        var newHighScoreSFX = this.sound.add('newHighScore', invalidSFXConfig);
        var completeEntrySFX = this.sound.add('completeEntry', invalidSFXConfig);

        // Words which the user may not enter for their username.
        var bannedWords = ["ASS", "DIK", "DIC", "FUK", "FCK", "FUC", "FUQ", "FUX", "NIG", "NGR", "SHT", "CNT",
            "KNT", "KKK", "POO", "PEE", "PIS", "COC", "COK", "COQ", "KOC", "KOK", "COX", "TIT", "JIZ",
            "FAG", "CUM", "HOR", "KUM", "SAK", "SAC", "SUC", "SUK", "SUX", "SEX", "WTF", "BS", "FAP", "HEL",
            "BJ", "DAM", "SAQ", "SUQ", "FK", "HOE", "HO", "QOQ", "QOC", "QOK", "KOQ", "JAP", "GAY", "NUT", "NIP",
            "VAJ", "VAG", "YID", "JEW", "BUT", "TIP", "CUC", "CUK", "CUQ", "CUX", "KUC", "KUK", "KUQ", "KUX",
            "QUC", "QUK", "QUQ", "QUX", "JIS", "BS.", "BS-", ".BS", "-BS", "B.S", "B-S", ".BJ", "-BJ", "BJ.",
            "BJ-", "B.J", ".FK", "-FK", "FK.", "FK-", "F.K", "F-K", ".FC", "-FC", "FC", "FC-", "F.C", "F.K",
            ".HO", "-HO", "HO.", "HO-", "H.O", "H-O", "WOR", "DIX"];

        newHighScoreSFX.play();

        //array for keyboard
        var chars = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>']
        ];
        
		//player's mouse
        var cursor = { x: 0, y: 0 };
        var name = '';
		
		//All text, inputs
        var newHighScoreText = this.add.bitmapText(500, 65, 'arcade', 'NEW HIGH SCORE!').setTint(0xffff00);
        newHighScoreText.setOrigin(0.5);

        var skipText = this.add.bitmapText(500, 550, 'arcade', 'SKIP').setScale(0.75, 0.75);
        skipText.setInteractive();
        skipText.setOrigin(0.5);

        var input = this.add.bitmapText(500, 200, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);
        input.setOrigin(0.5);
        input.setInteractive();

        var rub = this.add.image(input.x + 181, input.y + 67, 'rub');
        var end = this.add.image(input.x + 233, input.y + 67, 'end');

        var block = this.add.image(input.x - 260, input.y - 83, 'block').setOrigin(0);

        var scoreLegend = this.add.bitmapText(250, 325, 'arcade', 'SCORE').setTint(0xff00ff);
        var nameLegend = this.add.bitmapText(625, 325, 'arcade', 'NAME').setTint(0xff00ff);

        var scoreText = this.add.bitmapText(250, 370, 'arcade', playerScore).setTint(0xffffff);

        var playerText = this.add.bitmapText(625, 370, 'arcade', name).setTint(0xff0000);

        var invalidText = this.add.bitmapText(500, 472, 'arcade', 'PLEASE ENTER\nYOUR INITIALS!');
        invalidText.setOrigin(0.5);
        invalidText.visible = false;

        var bannedText = this.add.bitmapText(500, 485, 'arcade', "SOMETHING APPROPRIATE PLEASE!");
        bannedText.setOrigin(0.5);
        bannedText.visible = false;

        // skip text button
        skipText.on('pointerup', () => {

            startSound.play();

            // Refresh the page to restart the game
            location.reload();
        })
		
		//selects letter and moves it
        input.on('pointermove', function (pointer, x, y) {

            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            var char = chars[cy][cx];

            cursor.x = cx;
            cursor.y = cy;

            block.x = input.x - 260 + (cx * 52);
            block.y = input.y - 83 + (cy * 64);

        }, this);

		//input actual character into database
        input.on('pointerup', function (pointer, x, y) {

            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            var char = chars[cy][cx];

            cursor.x = cx;
            cursor.y = cy;

            block.x = input.x - 260 + (cx * 52);
            block.y = input.y - 83 + (cy * 64);

            if (char === '<' && name.length > 0) {
                //  Delete
                name = name.substr(0, name.length - 1);

                playerText.text = name;

                backspaceSFX.play();
            }
            else if (char === '>' && name.length > 0) {

                //  Submit

                if (isBannedWord(bannedWords, name)) {
                    this.cameras.main.shake(475, 0.013, 0.4);
                    invalidSFX.play();
                    invalidText.visible = false;
                    bannedText.visible = true;
                } else {
                
                    completeEntrySFX.play();

                    var saveData = {
                        name: name,
                        metrics: {
                            count: playerScore * -1
                        }
                    }

                    $('#scoreTable').empty();
        
                    ref.push(saveData);


                    location.reload();
                    }

                }
            else if (name.length < 3) {
                
                // Add
                // If player hits enter without entering a name, shake screen and play invalid entry sound.
                if (char === '>') {

                    this.cameras.main.shake(475, 0.013, 0.4);
                    invalidSFX.play();
                    bannedText.visible = false;
                    invalidText.visible = true;

                } else if (char === '<') {

                    // If name field is empty and player presses backspace, do nothing.

                } else {

                    //If player selects a letter, add it to their name.
                    startSound.play();
                    name = name.concat(char);
                    playerText.text = name;

                }

            }

        }, this);
    }

}

function isBannedWord(bannedWords, name) {
    return bannedWords.indexOf(name) > -1;
}

