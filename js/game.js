var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let numOfTrees = Math.floor(Math.Random() * 49 + 1);
console.log(numOfTrees);
function preload () {
    this.load.image('grass', '../assets/sprites/grassSprite1.png');
	this.load.image('tree','../assets/sprites/Tree_1.png');
  
    this.load.image('flame', '../assets/sprites/Flame.png');
}

function create () {
    this.add.image(400, 300, 'grass');
	
	this.add.image(300,300,'tree');
	this.add.image(500,200,'tree');
	this.add.image(600,375,'tree');
	this.add.image(350,490,'tree');
	this.add.image(500, 400,'tree');
	this.add.image(290,120,'tree');
	this.add.image(200,200,'tree');
  
    this.add.image(300, 300, 'flame');
	this.add.image(500,200,'flame');
	this.add.image(600,375,'flame');
	this.add.image(350,490,'flame');
	this.add.image(500, 400,'flame');
	this.add.image(290,120,'flame');
	this.add.image(200,200,'flame');
    
	
}

function update () {
    
}
    