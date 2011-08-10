/*Program: Freshout challenge 11/10/08 Coder: Joaquin Benitez, Mexico City*/

//Fresh Gallery
(function($){

	var methods = {
		init :	function() {
					//gather necesary values
					var thumb_size = 0;

					var img = $(this).find('.thumb img:first');
					
					//chrome based browsers need this calculation for images
					$("<img/>").attr("src", $(img).attr("src")).load(function() {
						setTimeout(function(){
							thumb_size = this.width;
						}, 100);
					});

					console.log( thumb_size );	
					
					var number_of_galleries = $(this).find('.thumb-strip').children().length;
					var side_controls_size = $(this).find('.gallery-scroll').width();
					
					//init view
					$(this).height(thumb_size);

					//animate entry
					$(this).find('.thumb').hide();
					$(this).find('.thumb').each(function(){
						$(this).delay(200 * $(this).attr('thumb-index')).fadeIn();
					});

					//adjust view to render correctly
					$(this).find('.thumb-strip').width( (thumb_size * number_of_galleries) );
					$(this).find('.gallery-menu').width( $(this).width() - side_controls_size*2 );

					//set gallery to scroll mode
					$(this).fresh_gallery('set_scroll_mode',{mode:'scroll'});
		},
		set_scroll_mode : function(mode){
					//set view
					$(this).find('.gallery-scroll').css('background-repeat','no-repeat');
					$(this).find('.gallery-scroll').css('background-position','center');
					$(this).find('.scroll-left').css('background-image','url(images/gal-wid-'+mode.mode+'_left.gif)');
					$(this).find('.scroll-right').css('background-image','url(images/gal-wid-'+mode.mode+'_right.gif)');

					//set animation controls
					if(mode.mode = 'scroll'){
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
					}
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