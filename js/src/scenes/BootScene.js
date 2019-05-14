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
	this.scene.start('PreloadScene');
	}
	
	
}