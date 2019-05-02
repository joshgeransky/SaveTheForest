var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game',
        
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);


    function preload () {
        this.load.image('background', '../assets/splash/800x600-grass-background.png');
        this.load.image('logo', '../assets/splash/title-text.png');
    }

    function create () {
        
        this.add.image(400, 300, 'background');
        scoreText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });


        
    }