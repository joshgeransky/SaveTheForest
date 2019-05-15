class BootScene extends Phaser.Scene {
	constructor(){
		super({
			key: "BootScene"
		});
		this.scalingAmt = 1.0;
	}
	
	preload(){

	}
	create(){
		this.input.setDefaultCursor('url(assets/sprites/blueWeird.cur), pointer');
		this.scene.start('PreloadScene');
	}
	
}