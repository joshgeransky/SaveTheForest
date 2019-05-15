class BootScene extends Phaser.Scene {
	constructor(){
		super({
			key: "BootScene"
		});
		this.scalingAmt = 1.0;
	}
	
	preload(){
		//cursor image
		this.load.image("fireCursor", "assets/sprites/fireExtinguisher.cur");
	}
	create(){
		this.input.setDefaultCursor('url(assets/sprites/blue.cur), pointer');
		this.scene.start('PreloadScene');
	}
	
}