
class PreloadScene extends Phaser.Scene {
	
	constructor(){
		super({
			key: "PreloadScene",
		});
		this.scalingAmt = 1.0;
	}
	
		
	preload(){
		//preload scene assets
		this.createProgressbar(this.centerX(), this.centerY());
		//this.add.image(this.centerX(), this.centerY(), 'logo');
		//TitleScene assets
		this.load.image('background_image', '../assets/images/forestBackground.png');
		this.load.image('startButt', '../assets/sprites/startBtn.png'); // start button
		this.load.spritesheet('campFire', '../assets/sprites/campFireSprites.png', { frameWidth: 275, frameHeight: 400, endFrame: 8});
		//music
		this.load.audio('bg', ['assets/sounds/Title_Screen_1.mp3']);
		this.load.audio('water', ['assets/sounds/Tree_Extinguish1.mp3']);
		this.load.audio('fire', ['assets/sounds/fire.mp3']);
		this.load.audio('game', ['assets/sounds/Game_Screen_1.mp3']);   
		this.load.audio('startPlay', ['assets/sounds/Start_1.mp3']);   
		this.load.audio('gameover', ['assets/sounds/GameOver.mp3']); 
	}
	create(){
		this.scene.start('TitleScene');
		
	}
	centerX(){
		return this.sys.game.config.width /2;
	}
	centerY(){
		return this.sys.game.config.height /2;
	}
	
	createProgressbar (x, y)
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
         * @param {number} percentage 
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

