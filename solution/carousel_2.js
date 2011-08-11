/*Program: Freshout challenge 11/10/08 Coder: Joaquin Benitez, Mexico City*/

//Fresh Gallery
(function($){

	var methods = {
		init :	function() {
					//gather necesary values
					var thumb_size = $(this).find('.thumb img').width();
					//var thumb_size = 100;
					var number_of_galleries = $(this).find('.thumb-strip').children().length;
					var side_controls_size = $(this).find('.gallery-scroll').width();
					
					//init view
					$(this).height(thumb_size);

					//animate entry
					$(this).find('.thumb').hide();
					$(this).find('.thumb').each(function(){
						$(this).delay(200 * $(this).attr('thumb-index')).fadeTo('',0.5);
					});

					//adjust view to render correctly
					$(this).find('.thumb-strip').width( (thumb_size * number_of_galleries) );
					$(this).find('.gallery-menu').width( $(this).width() - side_controls_size*2 );
					$(this).find('.thumb-hover')

					//set gallery to scroll mode
					$(this).fresh_gallery('set_scroll_mode',{mode:'scroll'});

					$(this).fresh_gallery('set_thumb_interaction');
		},
		set_scroll_mode : function(options){
					//set view
					$(this).find('.gallery-scroll').css('background-repeat','no-repeat');
					$(this).find('.gallery-scroll').css('background-position','center');
					$(this).find('.scroll-left').css('background-image','url(images/gal-wid-'+options.mode+'_left.gif)');
					$(this).find('.scroll-right').css('background-image','url(images/gal-wid-'+options.mode+'_right.gif)');

					//set animation controls
					if(options.mode = 'scroll'){
						var animation_args = {queue:false,duration:1000,easing:'linear'};
						var my_gallery = $(this).find('.thumb-strip');

						var far_left_scroll = $(this).find('.gallery-menu').width() - $(this).find('.thumb-strip').width();

						$(this).find('.scroll-right').hover(
							function(){
								my_gallery.animate({left:far_left_scroll},animation_args);
							}
							,
							function(){
								my_gallery.stop();
							}
						);

						$('.scroll-left').hover(
							function(){
								$(my_gallery).animate({left:0},animation_args);
							}
							,
							function(){
								$(my_gallery).stop();
							}
						);
					}else{
						//switch gallery
					}
		},
		set_thumb_interaction : function(){
					$(this).find('.thumb').hover(
						function(){
							$(this).fadeTo('',1);
							$(this).children().fadeIn();
						},
						function(){
							$(this).fadeTo('',0.5);
							$(this).find('.thumb-title').fadeOut();
							$(this).find('.thumb-hover').fadeOut();
						}
					);

					//prepare to go fullscreen
					var gallery = $(this);
					$(this).find('.thumb').click(function(){
						gallery.fresh_gallery('show_image',{index:$(this).attr('thumb-index'),image:0});
					});
		},
		go_fullscreen : function(){
					//prepare to go fullscreen
					var current_position = $(this).offset();

					//generate fullscreen placeholder
					$('<div belongs-to="'+$(this).attr('id')+'" class="gallery-hole ab-center"></div>').insertBefore($(this));
					$('[belongs-to="'+$(this).attr('id')+'"]').width($(this).width());
					$('[belongs-to="'+$(this).attr('id')+'"]').height($(this).height());
					
					$('.lightbox').fadeIn();
					$(this).css('z-index',$('.lightbox').css('z-index')+1);

					//disable scrollbars
					$("body").css("overflow", "hidden");


					$(this).css('position','absolute');
					$(this).offset(current_position);
		},
		show_image : function(options){
					//check for fullscreen
					if( !$('.lightbox').is(":visible") ){
						$(this).fresh_gallery('go_fullscreen',{index:$(this).attr('thumb-index')});
					}

					$('<div class="image-placeholder"></div>').insertAfter($('.lightbox'));

					//animate dynamic sizing
					$(this).animate({top:$(window).height() - $(this).height()},{queue:false,duration:1000});
		}
	};

	$.fn.fresh_gallery = function( method ) {

		// Method calling logic as jQuery basic template
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + 'Wrong method' );
		}    

	};

})(jQuery);