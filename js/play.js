$(function(){

	//center screen
	$("#main").css('top', ($(window).height()-600)/2);

	//add ship
	$("#gameBoard").append('<img id="ship" src="02_Design/spaceship_0.png" />');

	//font
	$(".big").click(function(){ $("#main").css('font-size', ++fontsize) });
	$(".small").click(function(){ $("#main").css('font-size', --fontsize) });


	//control mainship
	shipMove();

	//background sound
	playSound('sound/background.mp3', true, 'bgsound');

	//sound button
	mute();

	//time and fuel counter
	counter();

	//keyboard press
	keyControl();

	//elements crash
	vacham();

	//pause
	gamePause();



	//add aestroid
	$("#gameBoard").append('<div id="thienthach"></div>');
	var Fthienthach = function(){
		var bien = 'ae' + $.now();
		var thoigian = Math.floor(Math.random()*3000)+2000;
		var vitri = Math.floor(Math.random()*550);
		thienthach(bien, thoigian, vitri, 2);
	}
	var Sthienthach = setInterval(Fthienthach, 2000);
	myinterval.push({"Inter":Sthienthach, "name":Fthienthach, "time":2000});


	//add friendly
	$("#gameBoard").append('<div id="dongdoi"></div>');
	var Fdongdoi = function(){
		var bien = 'dd' + $.now();
		var thoigian = Math.floor(Math.random()*3000)+2000;
		var vitri = Math.floor(Math.random()*550);
		dongdoi(bien, thoigian, vitri);
	}
	var Sdongdoi = setInterval(Fdongdoi, 2500);
	myinterval.push({"Inter":Sdongdoi, "name":Fdongdoi, "time":2500});


	//add enemy
	$("#gameBoard").append('<div id="doithu"></div>');
	var Fdoithu = function(){
		var bien = 'dt' + $.now();
		var thoigian = Math.floor(Math.random()*3000)+2000;
		var vitri = Math.floor(Math.random()*550);
		doithu(bien, thoigian, vitri);
	}
	var Sdoithu = setInterval(Fdoithu, 4000);
	myinterval.push({"Inter":Sdoithu, "name":Fdoithu, "time":4000});


	//add fuel icon
	$("#gameBoard").append('<div id="nhienlieu"></div>');
	var Fnhienlieu = function(){
		var bien = 'nl' + $.now();
		var thoigian = Math.floor(Math.random()*3000)+2000;
		var vitri = Math.floor(Math.random()*1200);
		nhienlieu(bien, thoigian, vitri);
	}
	var Snhienlieu = setInterval(Fnhienlieu, 2500);
	myinterval.push({"Inter":Snhienlieu, "name":Fnhienlieu, "time":2500});

	//add planet
	$("#gameBoard").append('<div id="hanhtinh"></div>');
	var Fhanhtinh = function(){
		var bien = 'ht' + $.now();
		var thoigian = 10000;
		var vitri = Math.floor(Math.random()*550);
		var src = Math.floor(Math.random()*5)+1;
		hanhtinh(bien, thoigian, vitri, src);
	}
	var Shanhtinh = setInterval(Fhanhtinh, 2500);
	myinterval.push({"Inter":Shanhtinh, "name":Fhanhtinh, "time":2500});
})