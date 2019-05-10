class TitleScene extends Phaser.Scene {
	constructor(){
		super("TitleScene");
	}
	
	preload(){
		this.load.image('background_image', '../assets/images/forestBackground.png');
		this.load.image('button_image', '../assets/sprites/startBtn.png');
	}
	
	create (){
		let background = this.add.sprite(0, 0, 'background_image');
		background.setOrigin(0, 0);
		let btn = this.add.sprite(0, 0, 'button_image');
	}

}

//export default TitleScene;

