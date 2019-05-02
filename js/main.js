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
        this.load.image('tree1', '../assets/sprites/tree1.png');
    }

    function create () {
        
        background = this.add.image(400, 300, 'background');
                
        for (let i = 0; i < 1000; i++) {
            var randX = Math.floor(Math.random() * 800);
            var randY = Math.floor(Math.random() * 600);
            
            tree = this.add.image(randX, randY, 'tree1');
        }
        
        titleText = this.add.text(15, 100, 'Save the Forest', { fontSize: '128px', fill: 'white', fontFamily: 'VT323' });
        playButton = this.add.text(300, 300, 'PLAY', {
            fontSize: '100pt',
            fill: 'white',
            fontFamily: 'VT323',
            backgroundColor: 'blue',
            
        });
        
    }
