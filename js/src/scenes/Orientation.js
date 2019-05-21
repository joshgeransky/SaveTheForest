window.onload = function() {
	var gameRatio = window.innerWidth/window.innerHeight;		
	//var game = new Phaser.Game(Math.ceil(640*gameRatio), 640, Phaser.CANVAS);
	var firstRunLandscape;
	var play = function(game){}  
	
	play.prototype = {
		preload:function(){
			firstRunLandscape = game.scale.isGamePortrait;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.forceOrientation(false, true);
			game.scale.enterIncorrectOrientation.add(handleIncorrect);
            game.scale.leaveIncorrectOrientation.add(handleCorrect);
			game.load.image("portrait", "../assets/images/portrait.png");
		//	game.load.image("center", "center.png");
			//game.load.image("bottomright", "bottomright.png");
		},
		create:function(){
			game.add.sprite(0,0,"topleft");
			game.add.sprite(game.width/2,game.height/2,"center").anchor.set(0.5,0.5);	
			game.add.sprite(game.width,game.height,"bottomright").anchor.set(1,1);		
		}
	}
	
	function handleIncorrect(){
     	if(!game.device.desktop){
     		document.getElementById("game").style.display="block";
			console.log("handle incorrect");
     	}
	}
	
	function handleCorrect(){
		if(!game.device.desktop){
			if(firstRunLandscape){
				gameRatio = window.innerWidth/window.innerHeight;		
				game.width = Math.ceil(640*gameRatio);
				game.height = 640;
				game.renderer.resize(game.width,game.height);
				
				//game.state.start("Play");		
			}
			document.getElementById("game").style.display="none";
		}
	}
	
	//game.state.add("Play",play);
	//game.state.start("Play");
}