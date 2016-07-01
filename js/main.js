var flagCarousel = false;
var cal_month;
var cal_year;
$(document).ready(function(){
	//image gallery 
	$("#main-gallery").unitegallery();
	flagCarousel = true;	
	$("#right-gallery").unitegallery();
	//end image gallery
	

	//click function
	$(".links-container-class").bind("click", function(){
		$(".links-container-class").removeClass("clicked");
		$(this).addClass("clicked");
		if($(".sample1-home").hasClass("clicked"))
		{
			//window.location.replace("http://google.com");
			alert("home");
		}
		else if($(".sample2-home").hasClass("clicked"))
		{
			alert("ABC");
		}
		else if($(".sample3-home").hasClass("clicked"))
		{
			alert("DEF");
		}
		else if($(".sample4-home").hasClass("clicked"))
		{
			alert("GHI");
		}
		else if($(".sample5-home").hasClass("clicked"))
		{
			alert("JKL");
		}
	});

	$(".Top-Links-Class").bind("click", function(){
		$(".Top-Links-Class").removeClass("clicked");
		$(this).addClass("clicked");
	});

	$(".Latest-Post-Clickable-Class").bind("click", function(){
		$(".Latest-Post-Clickable-Class").removeClass("clicked");
		$(this).addClass("clicked");
	});

	$(".Top-Links-Class:first-child").addClass("clicked");
	$(".links-container-class:first-child").addClass("clicked");

	$(".popular-tab-options").click(function(){
		$(".popular-tab-comments").removeClass("clicked");
		$(this).addClass("clicked");
	})

	$(".popular-tab-comments").click(function(){
		$(".popular-tab-options").removeClass("clicked");
		$(this).addClass("clicked");
	})

	$(".popular-tab-options").addClass("clicked");

	$(".Popular-Clickable-Title").bind("click", function(){
		$(".Popular-Clickable-Title").removeClass("clicked");
		$(this).addClass("clicked");
	});
	//end click function

	//Newsletter 
	$(".Newsletter-Form-Sub").submit(function(e) {
    	e.preventDefault();
	});
	//
	
	//video player widget
	var myVideo = document.getElementById("video-Right-Container");
	$(".First-Video-buttons-player").click(function(){
		if($( ".play-pause-Right-First-Video" ).hasClass( "play" ))
		{
			$(".play-pause-Right-First-Video").removeClass("play");
			$(".play-pause-Right-First-Video").addClass("pause");
			myVideo.play();
		}
		else{
			$(".play-pause-Right-First-Video").removeClass("pause");
			$(".play-pause-Right-First-Video").addClass("play");
			myVideo.pause();
		}
	})
	//end video widget

	$(".play-pause-Right-First-Video").addClass("play");

	//weather widget
	weatherCallFunc();	
	setInterval(weatherCallFunc,60000);

	function weatherCallFunc(){
		var location = RandomizeCountry();
		$.simpleWeather({
    	location: location,
    	woeid: '',
    	unit: 'f',
    	success: function(weather) {
      		html = 	'<div class="Weather-City">'+weather.city+', '+weather.region+'</div>';
      		html += '<i class="icon-'+weather.code+' Weather-Icon-Class"></i> <div class = "weather-Temp">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
      		html += '<div class="weather-currently">'+weather.currently+'</div>';
      		html += '<div class="weather-speed">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</div>';
  			$("#weather").html(html);
    	},
    	error: function(error) {
      		$("#weather").html('<p>'+error+'</p>');
    	}
 	});
	}

	function RandomizeCountry(){
		var array = ["Guangzhou", "Beijing", "Makati", "Paris","Madrid","Shanghai","New York", "Berlin" , "California" , "Hanoi", "Tianjin ,Kuala Lumpur"];
		var rand = array[Math.floor(Math.random() * array.length)];
  		return rand + ",";
	}
	//end weather widget

	//calendar widget
	var cal_month;
	var cal_year;

	function getMonthName(m) {
    	var months = [ 'January', 'February', 'March', 'April', 
           	'May', 'June', 'July', 'August', 
            'September', 'October', 'November', 'December' ];
    		return months[m];
		}

	function daysInMonth(m, y) {
    	return new Date(y, m, 0).getDate();
	}    

	function firstDay(m, y) {
    	return new Date(y, m, 0).getDay();
	}

	function build() {
    	$('.calendar .cal-month').html(getMonthName(cal_month) + ' ' + cal_year);
    
    	var nbDays = daysInMonth(cal_month+1, cal_year);
    	var nbDaysLastMonth = daysInMonth(cal_month, cal_year);
    	var offset = firstDay(cal_month, cal_year);
    	var today = new Date();

    	var nbRows = 0;
    	var perLine = 0;
    	var i = 1-offset;
 
    	var html = '<tr class="cal-row">';  
    	while(perLine!=7 && nbRows<6) {
        	if(i<1) 
            	html += '<td class="faded">' + (i+nbDaysLastMonth) + '</td>';
        	else if(i>nbDays) 
            	html += '<td class="faded">' + (i-nbDays) + '</td>';
        	else if(i==today.getDate() && cal_month==today.getMonth() && cal_year==today.getFullYear()) 
            	html += '<td class="today">' + i + '</td>';
        	else 
            	html += '<td>' + i + '</td>';
        		perLine++;
        		i++;
        
        		if(perLine>0 && perLine%7==0) {
            	html += '</tr><tr class="cal-row">';
            	perLine = 0;
            	nbRows++;
       			}
    		}
    		html += '</tr>';
     	$('.calendar table tbody').html(html);
	}

	function init() {
    	var today = new Date();
    	cal_month = today.getMonth();
    	cal_year = today.getFullYear();
    	build();
	}

	init();

	$('.cal-prevMonth').click(function() {
    	if(cal_month > 0) cal_month--;
    	else {
        	cal_month = 11;
        	cal_year--;
    	}
    	build();
	});
	$('.cal-nextMonth').click(function() {
    	if(cal_month < 11) cal_month++;
    	else {
        	cal_month = 0;
        	cal_year++;
    	}
    	build();
	});
	// end calendar
})
