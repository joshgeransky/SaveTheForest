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
    }
    
    create ()
    {
        

        var chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];
        var cursor = { x: 0, y: 0 };
        var name = '';
    
        var input = this.add.bitmapText(130, 50, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);
    
        input.setInteractive();

        var rub = this.add.image(input.x + 430, input.y + 148, 'rub');
        var end = this.add.image(input.x + 482, input.y + 148, 'end');
    
        var block = this.add.image(input.x - 10, input.y - 2, 'block').setOrigin(0);
    
        var legend = this.add.bitmapText(80, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);

        var scoreTex = this.add.bitmapText(300, 310, 'arcade', playerScore).setTint(0xffffff);
    
        var playerText = this.add.bitmapText(560, 310, 'arcade', name).setTint(0xff0000);
    
        input.on('pointermove', function (pointer, x, y) {
    
            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
            
            var char = chars[cy][cx];
    
            cursor.x = cx;
            cursor.y = cy;
    
            block.x = input.x - 10 + (cx * 52);
            block.y = input.y - 2 + (cy * 64);
    
        }, this);
    
        input.on('pointerup', function (pointer, x, y) {
    
            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            var char = chars[cy][cx];
    
            cursor.x = cx;
            cursor.y = cy;
    
            block.x = input.x - 10 + (cx * 52);
            block.y = input.y - 2 + (cy * 64);
    
            if (char === '<' && name.length > 0)
            {
                //  Rub
                name = name.substr(0, name.length - 1);
    
                playerText.text = name;
            }
            else if (char === '>' && name.length > 0)
            {
                //  Submit

                var saveData = {
                    name: name,
                    metrics: {
                    count: playerScore * -1
                    }
                }

                $('#scoreTable').empty()
        
                ref.push(saveData);

                this.scene.start('TitleScene');

            }

            else if (name.length < 3)
            {
                //  Add
                if (char !== '>') {
                name = name.concat(char);

                playerText.text = name;

                } else {
                    this.cameras.main.shake(475, 0.013, 0.4);
                }
                
            }
    
        }, this);
    }
}
