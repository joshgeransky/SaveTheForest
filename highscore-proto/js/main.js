var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: 0xaaaaaa,
    parent: "game",
    
    scene: [ClickGame, EnterName]
    
};

var game = new Phaser.Game(config);

