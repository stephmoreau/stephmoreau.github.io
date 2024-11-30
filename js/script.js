console.log('script.js has loaded');
const LETTERS = ["B", "I", "N", "G", "O"];
const ROW_COUNT = 15;
const MAX_ATTEMPTS = 5;// (LETTERS.length * ROW_COUNT );
let options = new Options,
		isPlaying = true;


function Options(){

	this.list = [];
	this.fullList = [];

	num = 1;
	LETTERS.forEach((letter) => {
		for (let n=1; n<=ROW_COUNT; n++){
			this.fullList.push(letter + num++);
		}
	});

	//build board - remove all HTML
	function buildNumber(letter, number){
		"<button class='number' type='button' id='B1' data-letter='B' data-number='1'>1</button>";
	}
}

$(document).ready(function () {
	
	/* initialize the game */
	function init(){
		
	}

	/* Click on a number */
	$('.number').click(function (e) { 
		e.preventDefault();
		$(this).prop('disabled', 'disabled');
		$(".latest").removeClass("latest");	
		$(this).addClass("latest");
		showBall( $(this).data('letter'), $(this).data('number') );
	});

	/* Draw a number */
	$("#btn_draw").click( function(e){

		let l, n, id;
		let attempts = 0;
		do{
			if ( !(attempts++ < MAX_ATTEMPTS ) ){
				break
			}
			l = getRandomNumber( LETTERS.length, 0 );
			n = getRandomNumber( ROW_COUNT ) + ( l * ROW_COUNT );

			id = "#" + LETTERS[l]  + n;
			log(attempts + " - " + id);
		}while ( $(id).prop('disabled') );

		if (attempts < MAX_ATTEMPTS){
			$(id).click();
		}else{
			console.log("Board is full!! Are you sure who know how to play?")
		}
		
	});

	/* Reset the board */
	$('#btn_reset').click(function(e){
		if ( confirm( "Reset Board?" ) ){
			//reset board
			$(".number").prop('disabled', '');
			showBall();

		}
	});


	function showBall(letter = "", number = ""){
		// add some validation
	//		if (LETTERS.indexOf(letter) == -1)
		$('#last .letter').text( letter );
		$('#last .number').text( number );
	}
	
	function getRandomNumber(max, min = 1) {  
    min = Math.ceil( min ); 
    max = Math.floor( max ); 
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min; 
	}  

	$(document).keyup(function(e) {
		if(e.which == 32){ // space bar
			$("#btn_draw").click();
		}
	});

	init();

});

function log(str){ console.log(str); }