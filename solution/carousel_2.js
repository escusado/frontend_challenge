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
						$(this).delay(400 * $(this).attr('thumb-index')).fadeTo('',0.5);
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
					if(options.mode == 'scroll'){
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

						$(this).find('.scroll-left').hover(
							function(){
								$(my_gallery).animate({left:0},animation_args);
							}
							,
							function(){
								$(my_gallery).stop();
							}
						);
					}else{

						


						//prepare for switching galleries
						var gallery = $(this);

						$(this).find('.scroll-right').click(function(){
							var next_gallery = parseInt($('.thumb.active').attr('thumb-index'))+1;
							if ( next_gallery == $('.thumb').length ){
								next_gallery = 0;
							}
							gallery.fresh_gallery('show_image',{gallery:next_gallery,image:0});
						});

						$(this).find('.scroll-left').click(function(){
							var prev_gallery = parseInt($('.thumb.active').attr('thumb-index'))-1;
							if ( prev_gallery < 0 ){
								prev_gallery = $('.thumb').length - 1;
							}
							gallery.fresh_gallery('show_image',{gallery:prev_gallery,image:0});
						});
					}
		},
		set_thumb_interaction : function(){
					$(this).find('.thumb').hover(
						function(){
							$(this).fadeTo('',1);
							$(this).find('.thumb-title').fadeIn();
							$(this).find('.thumb-hover').fadeIn();
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
						gallery.fresh_gallery('show_image',{gallery:$(this).attr('thumb-index'),image:0});
					});

					//set image switcher functionality
					$('.img-right').click(function(){
						var next_image = parseInt($('#current-image').attr('image-index')) + 1;
						if( next_image == $('[gallery-index="'+parseInt($('.thumb.active').attr('thumb-index'))+'"]').length){
							next_image = 0;
						}
						gallery.fresh_gallery('show_image',{gallery:$('.thumb.active').attr('thumb-index'),image:next_image}); 
					});

					$('.img-left').click(function(){
						var prev_image = parseInt($('#current-image').attr('image-index')) - 1;
						if( prev_image < 0){
							prev_image = $('[gallery-index="'+parseInt($('.thumb.active').attr('thumb-index'))+'"]').length - 1;
						}
						gallery.fresh_gallery('show_image',{gallery:$('.thumb.active').attr('thumb-index'),image:prev_image});  
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
					$(this).css('z-index',$('.lightbox').css('z-index')+2);

					//disable scrollbars
					$("body").css("overflow", "hidden");


					$(this).css('position','absolute');
					$(this).offset(current_position);
		},
		show_image : function(options){
					//check for fullscreen
					if( !$('.lightbox').is(":visible") ){
						$(this).fresh_gallery('go_fullscreen');
						$(this).fresh_gallery('set_scroll_mode',{mode:'switch'});
					}

					//clear previous active gallery
					$(this).find('.thumb').removeClass('active')
					//activate gallery
					$(this).find('[thumb-index="'+options.gallery+'"]').addClass('active');

					$('.image-placeholder').show();
					$('.image-placeholder').css('z-index',$(this).css('z-index')-1);

					$(this).animate({top:$(window).height() - $(this).height()},{queue:false,duration:1000});

					//look for image to load
					var image_path =  $('[gallery-index="'+options.gallery+'"][image-index="'+options.image+'"]').attr('src');
					var image_index = $('[gallery-index="'+options.gallery+'"][image-index="'+options.image+'"]').attr('image-index');

					$('.image-placeholder img').remove();

					var img = new Image();

					$(img).load(function () {
						$(this).hide();
						$('.image-placeholder').append(this);
						
						var placeholder_width = this.width;
						var placeholder_height = this.height;
						var placeholder_y = ($(window).height() - placeholder_height)/2;
						if(placeholder_y<0)placeholder_y=0;
						var placeholder_x = ($(window).width() - placeholder_width)/2;
						if(placeholder_x<0)placeholder_x=0;
						
						$('.image-placeholder').animate({top:placeholder_y,left:placeholder_x,width:placeholder_width,height:placeholder_height},{queue:false,duration:1000});
						
						$(this).delay(1000).fadeIn();
						$(this).attr('image-index',image_index);
						$(this).attr('id','current-image');
					}).attr('src', image_path);

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