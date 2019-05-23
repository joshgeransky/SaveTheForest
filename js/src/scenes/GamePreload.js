class GamePreload extends Phaser.Scene {

    constructor() {
        super({
            key: "GamePreload",
        });
        this.scalingAmt = 1.0;
    }

    preload() {
        //preload scene assets
        this.createGameProgressbar(this.centerX(), this.centerY());
        //Game scene assets

        /* -------- Sprites -------- */
        this.load.image('tree1', '../assets/sprites/Tree_3.png'); // Regular tree
        this.load.image('burntTree', '../assets/sprites/Burnt_Tree_3.png'); // Burnt tree
        //this.load.image('tiles', 'assets/sprites/grassTile2.png'); // Grass tile
        this.load.image("tilesDynamic", "assets/sprites/jungleTileSet.png"); //Object layer tiles
        this.load.image('mushroom', 'assets/sprites/mushroom.png'); //Easter egg tree
        this.load.image('deadShroom', 'assets/sprites/dead-mushroom.png'); //Easter egg burnt tree
        this.load.spritesheet("fireAnim1", "assets/sprites/fireAnimation64.png", { frameWidth: 64, frameHeight: 64, endFrame: 24 }); // first fire
        this.load.spritesheet("fireAnim2", "assets/sprites/fireAnimationNew.png", { frameWidth: 42, frameHeight: 64, endFrame: 11 }); // second fire
        this.load.image('pauseBtn', '../assets/sprites/pause.png'); // Sprite for the pause button
        this.load.image('pauseMenuBack', '../assets/images/newPauseMenu.png'); // Background for pause menu
        this.load.image('resumeBtn', '../assets/sprites/continueButton.png'); // Resume button for pause menu
        this.load.image('quitBtn', '../assets/sprites/quitBtn.png'); // Quit button for pause menu

        /* -------- Audio -------- */
        this.load.audio('water', ['assets/sounds/Tree_Extinguish1.mp3']); //Audio for extinguishing fire
        this.load.audio('fire', ['assets/sounds/fire.mp3']); //Audio for fires
        this.load.audio('game', ['assets/sounds/Game_Screen_1.mp3']); //Audio when playing game
        this.load.audio('start', ['assets/sounds/Start_1.mp3']); //Audio on start screen
        this.load.audio('gameover', ['assets/sounds/GameOver.mp3']); //Audio for gameover screen
        this.load.audio('marioMusic', ['assets/sounds/mario.mp3']); //Audio for easter egg mode
        this.load.audio('chopTree', ['assets/sounds/chopTree.wav']); //Audio for chopping trees
		this.load.audio('milestone', ['assets/sounds/successJingleSFX.wav']); //Audio for reaching milestone

        /* -------- Image assets -------- */
        this.load.image('gameOverBackground', '../assets/images/newGameOverBack.png'); //Image for game over screen
        this.load.image('continueBtn', '../assets/sprites/continueButton.png'); //Image for continue button
    }

    //Create the game screen
    create() {
        this.scene.start('GameScene');
    }

    //Get the game screen's center for the x coordinates
    centerX() {
        return this.sys.game.config.width / 2;
    }

    //Get the game screen's center for the y coordinates
    centerY() {
        return this.sys.game.config.height / 2;
    }

    //Creates the progress bar
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

        /* Updates the progress bar */
        let updateProgressbar = function (percentage) {
            progressbar.clear();
            progressbar.fillStyle(0x42f450, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };
		
		//progress bar 
        this.load.on('progress', updateProgressbar);
		
		//shows title screen when loading is complete
        this.load.once('complete', function () {

            this.load.off('progress', updateProgressbar);
            this.scene.start('title');

        }, this);
    }
}