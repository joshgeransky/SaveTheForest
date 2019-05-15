
class GamePreload extends Phaser.Scene {
	
	constructor(){
		super({
			key: "GamePreload",
		});
		this.scalingAmt = 1.0;
	}
	
		
	preload(){
		//preload scene assets
		this.createGameProgressbar(this.centerX(), this.centerY());
		//this.add.image(this.centerX(), this.centerY(), 'logo');
		//Game scene assets
		 /* -------- Sprites -------- */
        this.load.image('tree1', '../assets/sprites/tree1(64x64).png'); // Regular tree
        this.load.image('burntTree', '../assets/sprites/burntTree(64x64).png'); // Burnt tree
        this.load.image('tiles', 'assets/sprites/grassTile2.png'); // Grass tile
        this.load.image("tilesDynamic", "assets/sprites/jungleTileSet.png"); //Object layer tiles
        this.load.image('mushroom', 'assets/sprites/mushroom.png');
        this.load.image('deadShroom', 'assets/sprites/dead-mushroom.png');
        this.load.spritesheet("fireAnim1", "assets/sprites/fireAnimation64.png", {frameWidth: 64, frameHeight: 64, endFrame: 24}); // first fire
        //this.load.image('startBtn', '../assets/sprites/startBtn.png'); // start button
        this.load.spritesheet("fireAnim2", "assets/sprites/fireAnimationNew.png", {frameWidth: 42, frameHeight: 64, endFrame: 11}); // second fire
	
		//cursor image
		this.load.image("fireCursor", "assets/sprites/cursor.cur");
        /* -------- Audio -------- */
        //this.load.audio('bg', ['assets/sounds/Title_Screen_1.mp3']);
        this.load.audio('water', ['assets/sounds/Tree_Extinguish1.mp3']);
        this.load.audio('fire', ['assets/sounds/fire.mp3']);
        this.load.audio('game', ['assets/sounds/Game_Screen_1.mp3']);   
        this.load.audio('start', ['assets/sounds/Start_1.mp3']);     
        this.load.audio('gameover', ['assets/sounds/GameOver.mp3']);     
        this.load.audio('marioMusic', ['assets/sounds/mario.mp3']);
	}
	create(){
		this.scene.start('GameScene');
		
	}
	centerX(){
		return this.sys.game.config.width /2;
	}
	centerY(){
		return this.sys.game.config.height /2;
	}
	
	createGameProgressbar (x, y)
    {
        // size &amp; position
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
         * 
         *  
         */

      let updateProgressbar = function (percentage)
        {
            progressbar.clear();
            progressbar.fillStyle(0x42f450, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function ()
        {

            this.load.off('progress', updateProgressbar);
            this.scene.start('title');

        }, this);
}


}
