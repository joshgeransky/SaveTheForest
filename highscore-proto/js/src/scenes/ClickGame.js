const gameState = {
	score: 0
};

class ClickGame extends Phaser.Scene {
	constructor(){
		super({
			key: "ClickGame"
		});
        this.scalingAmt = 1.0;
    }

preload ()
{
    this.load.image('eye', 'https://media.licdn.com/dms/image/C4D0BAQGIHxryaMF-Bg/company-logo_200_200/0?e=2159024400&v=beta&t=WQHW-YHAR0dX5iL3VvXZrhlBxiGu9rhgOGUi3WZzlZw');
    this.load.image('save', 'https://image.flaticon.com/icons/svg/159/159834.svg');
}

create ()
{
    
    var sprite = this.add.sprite(400, 200, 'eye').setInteractive();
    var saveIcon = this.add.sprite(400, 400, 'save').setInteractive().setScale(0.5, 0.5);
    gameState.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '30px', fill: '#000000' });
    gameState.info = this.add.text(20, 60, 'Click until at least 30 points, enter your name, then click the floppy!', { fontSize: '15px', fill: '#000000' });

    sprite.on('pointerdown', (pointer) => {
        gameState.score += 10;
        gameState.scoreText.setText(`Score: ${gameState.score}`);

    });

    saveIcon.on('pointerdown', (pointer) => {

        this.scene.start("EnterName");
        
    })
}

update() {

}
}
