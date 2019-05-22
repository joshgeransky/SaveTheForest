class LoadKeyboard extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadKeyboard",
        });
        this.scalingAmt = 1.0;
    }

    preload() {
        
         //preload scene assets
         this.createGameProgressbar(this.centerX(), this.centerY());

         //loads assets for keyboard
         this.load.image('block', 'assets/input/block.png');
         this.load.image('rub', 'assets/input/rub.png');
         this.load.image('end', 'assets/input/end.png');
         this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
         this.load.audio('invalidEntry', ['assets/sounds/invalidEntry.wav']);
         this.load.audio('backspace', ['assets/sounds/backspaceSFX.wav']);
         this.load.audio('newHighScore', ['assets/sounds/newHighScoreSFX.wav']);
         this.load.audio('completeEntry', ['assets/sounds/completeEntrySFX.wav']);
    }

    create() {
        this.scene.start('EnterName');
    }
    centerX() {
        return this.sys.game.config.width / 2;
    }

    centerY() {
        return this.sys.game.config.height / 2;
    }
    createGameProgressbar(x, y) {
        // size and position
        let width = 400;
        let height = 20;
        let xStart = x - width / 2;
        let yStart = y - height / 2;

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xededed
            }
        });
        border.strokeRectShape(borderRect);

        let progressbar = this.add.graphics();

        /**
         * Updates the progress bar.
         */

        let updateProgressbar = function (percentage) {
            progressbar.clear();
            progressbar.fillStyle(0x42f450, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function () {

            this.load.off('progress', updateProgressbar);
            this.scene.start('title');

        }, this);
    }
}