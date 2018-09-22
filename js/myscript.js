var step = 6;
var keySpace = 32;
var keyPause = 80;
var check_fire = true;
var mute_sound = false;
var pause_status = false;
var fontsize = 16;
var time_sec = 0;
var fuel_counter = 21;
var score_counter = 0;
var allow_key = true;
var myinterval = [];

//control ship
function shipMove(){
	var Sleft, Sright, Sup, Sdown;
	$('.control>img').mouseover(function(){
		var position = $("#ship").position();
		var direction = $(this).attr('alt');
		switch(direction){
			case 'keyLeft':
			var leftFunction = function(){
				position = $("#ship").position();
				if(position.left < 10)
				{
					clearInterval(Sleft);
				}
				else
				{
					position.left -= step;
					$("#ship").css({top:position.top, left:position.left});
				}
			}
			Sleft = setInterval(leftFunction, 20);
			break;

			case 'keyRight':
			var rightFunction = function(){
				if(position.left > 1050)
				{
					clearInterval(Sright);
				}
				else
				{
					position.left += step;
					$("#ship").css({top:position.top, left:position.left});
				}
			}
			Sright = setInterval(rightFunction, 20);
			break;

			case 'keyUp':
			var upFunction = function(){
				if(position.top < 10)
				{
					clearInterval(Sup);
				}
				else
				{
					position.top -= step;
					$("#ship").css({top:position.top, left:position.left});
				}
			}
			Sup = setInterval(upFunction, 20);
			break;		

			case 'keyDown':
			var downFunction = function(){
				if(position.top > 490)
				{
					clearInterval(Sdown);
				}
				else
				{
					position.top += step;
					$("#ship").css({top:position.top, left:position.left});
				}
			}
			Sdown = setInterval(downFunction, 20);
			break;		
		}
	})
	$('.control>img').mouseleave(function(){
		clearInterval(Sleft);
		clearInterval(Sright);
		clearInterval(Sup);
		clearInterval(Sdown);
	})
}

//keyboard press
function keyControl(){
	$(document).keydown(function(e){
		switch(e.keyCode){
			case keyPause:
			if(allow_key){
				$('.pause').click();
			}
			break;

			case keySpace:
			removeSound('shoot');
			if(check_fire){
				fire();
				check_fire = false;
			}
			break;
		}
	})
	$(document).keyup(function(e){
		check_fire = true;
	})
}

//play sound
function playSound(src, loop, cl){
	var lb = (loop)?"loop":"";
	var sound = '<audio src="'+src+'" class="'+cl+'"'+lb+' autoplay="autoplay"></audio>';
	$('body').append(sound);
}

//remove sound
function removeSound(name){
	var names = '.' + name;
	$(names).remove();
}

//sound button
function mute(){
	$('.sound').click(function(){
		if(!mute_sound)
		{
			$('.sound>img').attr('src','02_Design/on-sound.png');
			$('audio').remove();
			mute_sound = !mute_sound;
		}
		else
		{
			playSound('sound/background.mp3', true, 'bgsound');
			$('.sound>img').attr('src','02_Design/off-sound.png');
			mute_sound = !mute_sound;
		}
	})
}


//time and fuel counter
function counter(){
	var Fcounter = function(){
		//time
		time_sec++;
		$('.time span').text(time_sec);

		//fuel
		fuel_counter = fuel_counter - 1;
		$('.fuel span').text(fuel_counter);
		$('.fuel span').css({width:fuel_counter * 2.5 +'%'});
		if( fuel_counter < 0)
		{
			gameOver();
			$('.fuel span').text('0');
		}
	}
	var Scounter = setInterval(Fcounter, 1000);
	myinterval.push({"Inter":Scounter, "name":Fcounter, "time":1000});
}

//mainship fire
function fire(){
	var position = $("#ship").position();
	var id_shoot = 'shoot' + $.now() + id_shoot;
	var shoot = '<div id="'+id_shoot+'" class="shoot_fire"></div>';
	id_shoot = '#' + id_shoot;
	$("#gameBoard").append(shoot);
	var top = position.top + $("#ship").height()/2;
	var left = position.left + $("#ship").width();
	$(id_shoot).css({top:top, left:left});
	$(id_shoot).attr('moveto','right');
	$(id_shoot).attr('time', 200);
	if(!mute_sound)
	{
		playSound('sound/shoot.mp3', false, 'shoot');
	}
	$(id_shoot).animate({left:1200}, 200, "linear", function(){
		$(id_shoot).remove();
	})
}

//enemy fire
function enemy_fire(id){
	var id = '#' + id;
	var position = $(id).position();
	var id_shoot = $.now() + 'shoot' + id_shoot;
	var shoot = '<div id="'+id_shoot+'" class="enemy_fire"></div>';
	id_shoot = '#' + id_shoot;
	$("#gameBoard").append(shoot);
	var top = position.top + $(id_shoot).height()/2;
	var left = position.left;
	$(id_shoot).css({top:top, left:left});
	$(id_shoot).attr('moveto','left');
	var thoigian = 1000 * $(id_shoot).position().left/1200;
	$(id_shoot).attr('time', thoigian);
	$(id_shoot).animate({left:0}, thoigian, "linear", function(){
		$(id_shoot).remove();
	})
}



//add aestroid
function thienthach(id, thoigian, vitri, nangluong){
	var x = '#' + id;
	var ae = '<div id="'+id+'" class="aestroid"><img id="'+nangluong+'" src="images/aestroid_brown.png" /></div>';
	$("#thienthach").append(ae);
	$(x).css({left:1200, top:vitri});
	$(x).attr('moveto','left');
	$(x).attr('time', thoigian);
	$(x).animate({left:0}, thoigian, "linear", function(){
		$(x).remove();
	})
}

//add friendly
function dongdoi(id, thoigian, vitri){
	var x = '#' + id;
	var ae = '<div id="'+id+'" class="friendly"></div>';
	$("#dongdoi").append(ae);
	$(x).css({left:1200, top:vitri});
	$(x).attr('moveto','left');
	$(x).attr('time', thoigian);
	$(x).animate({left:0}, thoigian, "linear", function(){
		$(x).remove();
	})
}

//add enemy
function doithu(id, thoigian, vitri){
	var x = '#' + id;
	var ae = '<div id="'+id+'" class="enemy"></div>';
	$("#doithu").append(ae);
	$(x).css({left:1200, top:vitri});
	$(x).attr('moveto','left');
	$(x).attr('time', thoigian);
	$(x).animate({left:0}, thoigian, "linear", function(){
		$(x).remove();
	})
}

//add fuel-icon
function nhienlieu(id, thoigian, vitri){
	var x = '#' + id;
	var ae = '<div id="'+id+'" class="fuel_icon"></div>';
	$("#nhienlieu").append(ae);
	$(x).css({left:vitri, top:0});
	$(x).attr('moveto','down');
	$(x).attr('time', thoigian);
	$(x).animate({top:600}, thoigian, "linear", function(){
		$(x).remove();
	})
}

//add planet
function hanhtinh(id, thoigian, vitri, src){
	var x = '#' + id;
	var ae = '<div id="'+id+'" class="planet"><img src="images/planets/planet'+src+'.png" /></div>';
	$("#hanhtinh").append(ae);
	$(x).css({left:1200, top:vitri});
	$(x).attr('moveto','left');
	var img = x + ">img";
	var size = src * 30;
	$(img).css({width:size, height:size});
	thoigian = Math.round(thoigian/src);
	$(x).attr('time', thoigian);
	$(x).animate({left:0}, thoigian, "linear", function(){
		$(x).remove();
	})
}

//element crash
function vacham(){
	var Fvacham = function(){
		//mainship vs aestroid
		$("#thienthach>div").each(function(){
			var id_AE = '#' + $(this).attr('id');
			var posAE = $(id_AE).position();
			var posShip = $("#ship").position();
			if( (posAE.top + $(id_AE).height()/2 > posShip.top)&&
				(posAE.top + $(id_AE).height()/2 < posShip.top + $("#ship").height())&&
				(posAE.left + $(id_AE).width()/2 > posShip.left)&&
				(posAE.left + $(id_AE).width()/2 < posShip.left + $("#ship").width()) )
			{
				var img = id_AE + ">img";
				$(img).attr('src','02_Design/break.png');
				$(img).animate({width:'80px'}, 200, "linear", function(){
					$(img).remove();
					if(!mute_sound)
					{
						playSound('sound/destroyed.mp3', false,'destroyed');
					}
					fuel_counter = fuel_counter - 10;
				})
			}
		})


		//mainship vs friendly
		$("#dongdoi>div").each(function(){
			var id_DD = '#' + $(this).attr('id');
			var posDD = $(id_DD).position();
			var posShip = $("#ship").position();
			if( (posDD.top + $(id_DD).height()/2 > posShip.top)&&
				(posDD.top + $(id_DD).height()/2 < posShip.top + $("#ship").height())&&
				(posDD.left + $(id_DD).width()/2 > posShip.left)&&
				(posDD.left + $(id_DD).width()/2 < posShip.left + $("#ship").width()) )
			{
				$(id_DD).remove();
				if(!mute_sound)
				{
					playSound('sound/destroyed.mp3', false,'destroyed');
				}
				fuel_counter = fuel_counter - 10;			
			}
		})

		//mainship vs enemy
		$("#doithu>div").each(function(){
			var id_DT = '#' + $(this).attr('id');
			var posDT = $(id_DT).position();
			var posShip = $("#ship").position();
			if( (posDT.top + $(id_DT).height()/2 > posShip.top)&&
				(posDT.top + $(id_DT).height()/2 < posShip.top + $("#ship").height())&&
				(posDT.left + $(id_DT).width()/2 > posShip.left)&&
				(posDT.left + $(id_DT).width()/2 < posShip.left + $("#ship").width()) )
			{
				$(id_DT).remove();
				if(!mute_sound)
				{
					playSound('sound/destroyed.mp3', false,'destroyed');
				}
				fuel_counter = fuel_counter - 10;		
			}
		})


		//mainship vs fuel icon
		$("#nhienlieu>div").each(function(){
			var id_Fuel = '#' + $(this).attr('id');
			var posFuel = $(id_Fuel).position();
			var posShip = $("#ship").position();
			if( (posFuel.top + $(id_Fuel).height()/2 > posShip.top)&&
				(posFuel.top + $(id_Fuel).height()/2 < posShip.top + $("#ship").height())&&
				(posFuel.left + $(id_Fuel).width()/2 > posShip.left)&&
				(posFuel.left + $(id_Fuel).width()/2 < posShip.left + $("#ship").width()) )
			{
				$(id_Fuel).remove();
				fuel_counter = fuel_counter + 20;
				fuel_counter = (fuel_counter/40>1)?41:fuel_counter;		
			}
		})


		//mainship shoot vs aestroid
		$(".shoot_fire").each(function(){
			var id_shoot = '#' + $(this).attr('id');
			var posShoot = $(id_shoot).position();
		$("#thienthach>div").each(function(){
			var id_AE = '#' + $(this).attr('id');
			var posAE = $(id_AE).position();
			if( (posShoot.top > posAE.top)&&
				(posShoot.top < posAE.top + $(id_AE).height())&&
				(posShoot.left > posAE.left) )
			{
				var img = id_AE + ">img";
				$(img).attr('id', $(img).attr('id') - 1);
				$(id_shoot).remove();
				if($(img).attr('id') < 1)
				{
					$(img).attr('src','02_Design/break.png');
					$(img).animate({width:'80px'}, 200, "linear", function(){
						$(img).remove();
						removeSound('destroyed');
						if(!mute_sound)
						{
							playSound('sound/destroyed.mp3', false,'destroyed');
						}
						$('.score span').text(score_counter = score_counter + 10);
					})
				}
			}
		})
		})

		//mainship shoot vs friendly
		$(".shoot_fire").each(function(){
			var id_shoot = '#' + $(this).attr('id');
			var posShoot = $(id_shoot).position();
		$("#dongdoi>div").each(function(){
			var id_DD = '#' + $(this).attr('id');
			var posDD = $(id_DD).position();
			if( (posShoot.top > posDD.top)&&
				(posShoot.top < posDD.top + $(id_DD).height())&&
				(posShoot.left > posDD.left) )
			{
				$(id_shoot).remove();
				$(id_DD).remove();
				removeSound('destroyed');
				if(!mute_sound)
				{
					playSound('sound/destroyed.mp3', false,'destroyed');
				}
				$('.score span').text(score_counter = score_counter - 10);

			}
		})
		})

		//mainship shoot vs enemy
		$(".shoot_fire").each(function(){
			var id_shoot = '#' + $(this).attr('id');
			var posShoot = $(id_shoot).position();
		$("#doithu>div").each(function(){
			var id_DT = '#' + $(this).attr('id');
			var posDT = $(id_DT).position();
			if( (posShoot.top > posDT.top)&&
				(posShoot.top < posDT.top + $(id_DT).height())&&
				(posShoot.left > posDT.left) )
			{
				$(id_shoot).remove();
				$(id_DT).remove();
				removeSound('destroyed');
				if(!mute_sound)
				{
					playSound('sound/destroyed.mp3', false,'destroyed');
				}
				$('.score span').text(score_counter = score_counter + 5);
			}
		})
		})

		//enemy shoot
		$("#doithu>div").each(function(){
			var ban = Math.floor(Math.random()*50);
			if(ban == 2){
				enemy_fire($(this).attr('id'));
			}
		})

		//enemy shoot vs mainship
		$(".enemy_fire").each(function(){
			var id_shoot = '#' + $(this).attr('id');
			var posShoot = $(id_shoot).position();
			var posShip = $("#ship").position();
			if( (posShoot.top > posShip.top)&&
				(posShoot.top < posShip.top + $("#ship").height())&&
				(posShoot.left > posShip.left)&&
				(posShoot.left < posShip.left + $("#ship").width()) )
			{
				
				$(id_shoot).remove();
				removeSound('destroyed');
				if(!mute_sound)
				{
					playSound('sound/destroyed.mp3', false,'destroyed');
				}
				fuel_counter = fuel_counter - 10;
			}
		})

	}
	var Svacham = setInterval(Fvacham, 50);
	myinterval.push({"Inter":Svacham, "name":Fvacham, "time":50});
}

function gamePause(){
	$('.pause').click(function(){
		if(!pause_status)
		{
			$('.pause>img').attr('src','02_Design/continue.png');
			$('div').stop();
			$('#gameBoard').css('animation-play-state','paused');
			$('#ship').css('animation-play-state','paused');
			$('.aestroid').css('animation-play-state','paused');
			$('.fuel_icon').css('animation-play-state','paused');
			$('.friendly').css('animation-play-state','paused');
			$('.enemy').css('animation-play-state','paused');
			$('.planet').css('animation-play-state','paused');
			$('.sound').click();
			$('.control>img').css('pointer-events','none');
			for(var i=0;i<myinterval.length;i++)
			{
				clearInterval(myinterval[i].Inter);
			}

			pause_status = !pause_status;
		}
		else
		{
			$('.pause>img').attr('src','02_Design/pause.png');
			$('#gameBoard').css('animation-play-state','running');
			$('#ship').css('animation-play-state','running');
			$('.aestroid').css('animation-play-state','running');
			$('.fuel_icon').css('animation-play-state','running');
			$('.friendly').css('animation-play-state','running');
			$('.enemy').css('animation-play-state','running');
			$('.planet').css('animation-play-state','running');
			$('.sound').click();
			$('.control>img').css('pointer-events','auto');
			for(var i=0;i<myinterval.length;i++)
			{
				myinterval[i].Inter = setInterval(myinterval[i].name, myinterval[i].time);
			}

			//continue animation left
			$('div[moveto="left"]').each(function(){
				var thoigian = $(this).attr('time');
				thoigian = thoigian * $(this).position().left/1200;
				$(this).animate({left:0}, thoigian, "linear", function(){
					$(this).remove();
				})
			})

			//continue animation right
			$('div[moveto="right"]').each(function(){
				var thoigian = $(this).attr('time');
				thoigian = thoigian * $(this).position().left/1200;
				$(this).animate({left:0}, thoigian, "linear", function(){
					$(this).remove();
				})
			})

			//continue animation down
			$('div[moveto="down"]').each(function(){
				var thoigian = $(this).attr('time');
				thoigian = thoigian * (600-($(this).position().top))/600;
				$(this).animate({top:600}, thoigian, "linear", function(){
					$(this).remove();
				})
			})

			pause_status = !pause_status;
		}
	})
}

function gameOver(){
	$('#gameBoard>div').empty();
	$('#ship').hide();
	check_fire = false;
	fire = undefined;
	$('.shoot_fire').empty();
	$('.pause').click();

	$('.pause').css('pointer-events','none');


	var input = '<div id="over">'+
					'<h1>GAME OVER</h1>'+
					'<input type="text" id="name" placeholder="Input your name"><br><br><br>'+
					'<input type="submit" id="continue" value="Continue" disabled="disabled">'+
				'</div>';
	$('#gameBoard').append(input);

	$('#name').keyup(function(){
		if( $('#name').val() == '' )
		{
			$('#continue').prop('disabled', true);
			$('#continue').css('pointer-events','none');
		}
		else
		{
			$('#continue').prop('disabled', false);
			$('#continue').css('pointer-events','auto');
			$('#continue').css('cursor','pointer');
			$('#continue').css('color','#fff');
		}
	});


	$('#continue').click(function(){
		var name = $("#name").val();
		var score = score_counter;
		var time = time_sec
		var arrxephang = [];

		if( localStorage.getItem('xephang') != null )
		{
			arrxephang = JSON.parse(localStorage.getItem('xephang'));
		}

		arrxephang.push({"Name":name, "Score":score, "Time":time});

		var string = JSON.stringify(arrxephang);

		localStorage.setItem('xephang', string);
		location.replace('ranking.html');
	})
}