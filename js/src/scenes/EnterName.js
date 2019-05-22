class EnterName extends Phaser.Scene {
	constructor(){
		super({
            key: "EnterName",
		});
        this.scalingAmt = 1.0;
    }

    preload() 
    {
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');
        this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
        this.load.audio('invalidEntry', ['assets/sounds/invalidEntry.wav']);
        this.load.audio('backspace', ['assets/sounds/backspaceSFX.wav']);
        this.load.audio('newHighScore', ['assets/sounds/newHighScoreSFX.wav']);
        this.load.audio('completeEntry', ['assets/sounds/completeEntrySFX.wav']);
    }
    
    create ()
    {
        var invalidSFXConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        // function gameReset() {
        //     this.scene.start('TitleScene');
        // }

        var invalidSFX = this.sound.add('invalidEntry', invalidSFXConfig);
        var backspaceSFX = this.sound.add('backspace', invalidSFXConfig);
        var newHighScoreSFX = this.sound.add('newHighScore', invalidSFXConfig);
        var completeEntrySFX = this.sound.add('completeEntry', invalidSFXConfig);
        
        newHighScoreSFX.play();

        var chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];
        var cursor = { x: 0, y: 0 };
        var name = '';
        
        var newHighScoreText = this.add.bitmapText(400, 65, 'arcade', 'NEW HIGH SCORE!').setTint(0xffff00);
        newHighScoreText.setOrigin(0.5);

        var skipText = this.add.bitmapText(400, 550, 'arcade', 'SKIP').setScale(0.75, 0.75);
        skipText.setInteractive();
        skipText.setOrigin(0.5);

        var input = this.add.bitmapText(400, 200, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);
        input.setOrigin(0.5);
    
        input.setInteractive();

        var rub = this.add.image(input.x + 181, input.y + 67, 'rub');
        var end = this.add.image(input.x + 233, input.y + 67, 'end');
    
        var block = this.add.image(input.x - 260, input.y - 83, 'block').setOrigin(0);
    
        var scoreLegend = this.add.bitmapText(150, 325, 'arcade', 'SCORE').setTint(0xff00ff);
        var nameLegend = this.add.bitmapText(500, 325, 'arcade', 'NAME').setTint(0xff00ff);

        var scoreText = this.add.bitmapText(150, 370, 'arcade', playerScore).setTint(0xffffff);
    
        var playerText = this.add.bitmapText(500, 370, 'arcade', name).setTint(0xff0000);

        var invalidText = this.add.bitmapText(400, 472, 'arcade', 'PLEASE ENTER\nYOUR INITIALS!');
        invalidText.setOrigin(0.5);
        invalidText.visible = false;

        skipText.on('pointerup', () => {
            startSound.play();
            // this.scene.start('TitleScene');
            // gameReset();
            
            // Refresh the page to restart the game
            location.reload();
        })
    
        input.on('pointermove', function (pointer, x, y) {
    
            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
            
            var char = chars[cy][cx];
    
            cursor.x = cx;
            cursor.y = cy;
    
            block.x = input.x - 260 + (cx * 52);
            block.y = input.y - 83 + (cy * 64);
    
        }, this);
    
        input.on('pointerup', function (pointer, x, y) {
    
            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            var char = chars[cy][cx];
    
            cursor.x = cx;
            cursor.y = cy;
    
            block.x = input.x - 260 + (cx * 52);
            block.y = input.y - 83 + (cy * 64);
    
            if (char === '<' && name.length > 0)
            {
                //  Rub
                name = name.substr(0, name.length - 1);
    
                playerText.text = name;

                backspaceSFX.play();
            }
            else if (char === '>' && name.length > 0)
            {
                //  Submit
                completeEntrySFX.play();

                var saveData = {
                    name: name,
                    metrics: {
                    count: playerScore * -1
                    }
                }

                $('#scoreTable').empty()
        
                ref.push(saveData);

                location.reload();

            }

            else if (name.length < 3)
            {
                // Add
                // If player hits enter without entering a name, shake screen and play invalid entry sound.
                if (char === '>') {

                    this.cameras.main.shake(475, 0.013, 0.4);
                    invalidSFX.play();
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


