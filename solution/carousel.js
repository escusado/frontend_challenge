/*Program: Freshout challenge 11/10/08 Coder: Joaquin Benitez, Mexico City*/

/*********************************** CONFIGURATION	*/
//hardcoded data
var POST_DATA = [{name: 'NES Images',album_image: 'images/gallery/nes.jpg',images: ['images/gallery/nes-01.jpg','images/gallery/nes-02.jpg','images/gallery/nes-03.jpg','images/gallery/nes-04.jpg','images/gallery/nes-05.jpg','images/gallery/nes-06.jpg','images/gallery/nes-07.jpg','images/gallery/nes-08.jpg','images/gallery/nes-09.jpg','images/gallery/nes-10.jpg','images/gallery/nes-11.jpg','images/gallery/nes-12.jpg','images/gallery/nes-13.jpg','images/gallery/nes-14.jpg','images/gallery/nes-15.png','images/gallery/nes-16.jpg','images/gallery/nes-17.jpg','images/gallery/nes-18.jpg','images/gallery/nes-19.gif']},{name: 'SNES Images',album_image: 'images/gallery/snes.jpg',images: ['images/gallery/snes-01.jpg','images/gallery/snes-02.jpg','images/gallery/snes-03.jpg','images/gallery/snes-04.jpg','images/gallery/snes-05.jpg','images/gallery/snes-06.jpg','images/gallery/snes-07.jpg','images/gallery/snes-08.jpg','images/gallery/snes-09.jpg','images/gallery/snes-10.jpg','images/gallery/snes-11.JPG','images/gallery/snes-12.jpg','images/gallery/snes-13.gif','images/gallery/snes-14.png','images/gallery/snes-15.jpg']},{name: 'N64 Images',album_image: 'images/gallery/n64.jpg',images: ['images/gallery/n64-01.jpg','images/gallery/n64-02.jpg','images/gallery/n64-03.jpg','images/gallery/n64-04.jpg','images/gallery/n64-05.jpg','images/gallery/n64-06.jpg','images/gallery/n64-07.jpg','images/gallery/n64-08.jpg','images/gallery/n64-09.jpg','images/gallery/n64-10.jpg','images/gallery/n64-11.jpg','images/gallery/n64-12.jpg','images/gallery/n64-13.jpg','images/gallery/n64-14.jpg']},{name: 'Game Cube Images',album_image: 'images/gallery/gamecube.jpg',images: ['images/gallery/gc-01.jpg','images/gallery/gc-02.jpg','images/gallery/gc-03.jpg','images/gallery/gc-04.jpg','images/gallery/gc-05.jpg','images/gallery/gc-06.jpg','images/gallery/gc-07.jpg','images/gallery/gc-08.jpg','images/gallery/gc-09.jpg','images/gallery/gc-10.jpg','images/gallery/gc-11.jpg','images/gallery/gc-12.jpg','images/gallery/gc-13.jpg','images/gallery/gc-14.jpg','images/gallery/gc-15.jpg']},{name: 'Wii Images',album_image: 'images/gallery/wii.jpg',images: ['images/gallery/wii-01.jpg','images/gallery/wii-02.jpg','images/gallery/wii-03.jpg','images/gallery/wii-04.jpg','images/gallery/wii-05.jpg','images/gallery/wii-06.jpg','images/gallery/wii-07.jpg','images/gallery/wii-08.jpg','images/gallery/wii-09.jpg']},{name: 'Wii-U Images',album_image: 'images/gallery/wiiu.jpg',images: ['images/gallery/wiiu-01.jpg','images/gallery/wiiu-02.jpg','images/gallery/wiiu-03.jpg','images/gallery/wiiu-04.jpg','images/gallery/wiiu-05.jpg']}];

//(100px thumbnail width + margin)
var thumb_width = 90;

/*********************************** BEHAVIOR		*/
//wait for dom to complete
$(document).ready(function(){

	//append gallery to strip gallery
	$('.thumb-strip').append( parse_data_and_build_markup(POST_DATA) );
	setup_thumb_hover();

	//set gallery width properties so it renders correctly
	$('.thumb-strip').width( ( $('.thumb-strip').children().length * thumb_width ) + 12 ); //12 last margin + 2px border correction

	//scroll functionality
	//get far left scroll value
	var left_scroll_value = $('.gallery-menu').width() - $('.thumb-strip').width();

	//initial scroll action for the arrows
	setup_scroll_controls(left_scroll_value , $('.thumb-strip'));


	$('.thumb').click(function(){
		switch_to_gallery_mode();
	});

	/* NOT THAT FANCY TOOLTIP FUNTIONALITY*/
	setup_tooltip();

});

function parse_data_and_build_markup(DATA){
	var built_gallery = '';

	//parse array using jQuery
	$.each(DATA, function(index,value){
		//generate and append markup
		built_gallery+='<li class="gal-'+index+' thumb left track-as-link" tool-tip="'+value.name+'"><div class="thumb-hover" style="display:none;"></div><img src="'+value.album_image+'"></li>';
	});

	return built_gallery;
}

function setup_thumb_hover(){
	//set thumb hover behavior
	$('.thumb').hover(
		function(){
			$(this).find('.thumb-hover').fadeIn();
		}
		,
		function(){
			$(this).find('.thumb-hover').fadeOut();
		}
	);
}

function setup_scroll_controls(left_scroll_value, my_gallery){

	var animation_args = {queue:false,duration:1000,easing:'linear'};

	$('.gallery-scroll-left img').attr('src','images/gal-wid-bar_scroll_left_arr.gif');
	$('.gallery-scroll-right img').attr('src','images/gal-wid-bar_scroll_right_arr.gif');

	$('.gallery-scroll-right').hover(
		function(){
			my_gallery.animate({marginLeft:left_scroll_value},animation_args);
		}
		,
		function(){
			my_gallery.stop();
		}
	);

	$('.gallery-scroll-left').hover(
		function(){
			$(my_gallery).animate({marginLeft:10},animation_args);
		}
		,
		function(){
			$(my_gallery).stop();
		}
	);
}

function switch_to_gallery_mode(){
	show_lightbox();
}

function show_lightbox(){
	$('.lightbox').fadeIn();
	$('.lightbox-content').fadeIn();
	$('.gallery').appendTo($('.lightbox-content'));
}

function setup_tooltip(){
	/* NOT THAT FANCY TOOLTIP FUNTIONALITY*/
	$('[tool-tip]').hover(
		//over
		function(){
			//$('#tool-tip-holder').fadeIn(); //some display persistance issues :'(
			$('#tool-tip-holder').show(); //hides and shows correctly

			$('#tool-tip-holder').text($(this).attr('tool-tip'));
			$(this).bind('mousemove', function(e){
				$('#tool-tip-holder').css({
					left:  e.pageX,
					top:   e.pageY+20
				});
			});
		}
		,
		//leave
		function(){
			$('#tool-tip-holder').hide();
			$(this).unbind('mousemove');
		}
	);
}