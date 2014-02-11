/* Main JS */

$(function(){
	
	var app = (function(){
		// selectors
		var body	= $('body'),
			winWidth= $(window).width(),
			wrapper = $('body > .container'),
			header 	= $('#header'),
			stickyThis = 'destroyed',
			deskXS	= false,
			wrap_w	= wrapper.width(),
			logo	= $('#logo'),
			openMob	= $('#openMenu'),
			nav 	= $('#nav'),
			nav_li 	= nav.find('li'),
			nav_a 	= nav.find('a'),
			team	= $('#team'),
			home_vid= $('.home-video > a'),
			serv_a	= $('#services a'),
			fb_btn	= $('.home-facebook a'),
			navserv = $('#nav-services a'),
			gmap 	= $('#gmap'),
			address = '1415 10th Street STE 2 Santa Monica, California 90401',
			contact = $('#contactForm label'),
			member  = $('#team .member'),
			locate  = $('#redcols a'),
			instagram = $('#instagram'),
			work_gal= $('#work-thumbs'),
			IE8		= $.support.cssFloat,
			// classes
			active 	= 'active';
		
		var site = {
			init: function(){
				svgeezy.init(false, 'png');
				
				// Bind Resize
				this.bindResize();
												
				// Menu FX for Desktop 
				this.headerFx();
				this.headerScroll();

				// Service FX for Desktop Home
				this.servicesRollover();
				
				// Mobile and Tablet Menu
				this.mobileMenu();
				// Team Carousel for Mobile and Tablet
				this.memberCarousel();
				
				this.homeVideo();
				this.fbRollover();
				this.navServices();
				this.googleMap();
				this.placeholderLabels();
				this.memberRollover();
				this.locationRollover();
				this.instagramCols();
				this.workThumbs();

				winWidth = $(window).width();
				if(winWidth>1024){
					deskXS = false;
				} else {
					deskXS = true;
				} 

				$('#destroyStick').click(function(e){
					e.preventDefault();
					console.log(stickyThis);
					stickyThis.destroy();
					wrapper.add(header).removeClass('stickit');
					stickyThis = 'destroyed';
				});
			},

			bindResize: function(){

				$(window).scroll(function(){
					app.headerScroll();	
				});

				$(window).on("throttledresize", function( event ) {

					wrap_w	= wrapper.width();
					winWidth = $(window).width();
					//console.log(winWidth);
					if(winWidth>1024){
						// Run Desktop Menu
						deskXS = false;
						//console.log('desktop menu');
						app.headerScroll();
						/*
						if(stickyThis!==""){
							stickyThis.destroy();
							//app.headerScroll();
						}*/
					} else{
						// Run Mobile Menu
						deskXS = true;
						console.log('mobile menu');
						//app.headerScroll();
						if(stickyThis!=="destroyed"){
							console.log('destroy it');
							stickyThis.destroy();
							wrapper.add(header).removeClass('stickit');
							stickyThis = 'destroyed';
						}
					}


					if(openMob.hasClass('active')){
						
						openMob.toggleClass('active');
						var tmp_height = nav.outerHeight();

						logo.find('.text').fadeOut(200, function(){
							logo.find('.spark').fadeIn(200);
						});
						nav.hide();
						wrapper.stop(true, true).animate({
								paddingTop:'0px'
							}, 400);				
					}

					if(instagram.length){

						if(winWidth<=769){
							var columnsGrid = 3;
						} else {
							var columnsGrid = 3;
						}
						instagram.isotope({
							masonry: { columnWidth: instagram.width() / columnsGrid }
						});

					}

				});
			},
			
			headerFx: function(){
								
				header.hover(
					// mouseenter
					function(e){
						if(!jQuery.browser.mobile && deskXS === false){
							if(header.hasClass('stickit')){
								
								if(!nav.hasClass('animating')){
		  							logo.stop().animate( {
			    						marginTop: "-73px",
			  						}, 200, function(){
			  							logo.addClass(active);
			  						} );
			  						header.css('background-color','#fff');
			  						nav.css({opacity: 0, display: 'block'});
			  						nav.stop().animate( { opacity: 1 }, 400 );
			  						if(IE8===false){
			  							nav.show();
			  						}
		  						}	  	

		  					} else {
		  						if(!nav.hasClass('animating')){
		  							logo.stop().animate( {
			    						marginTop: "-73px",
			  						}, 200, function(){

			  							logo.addClass(active);
			  							logo.find('.text').css({opacity: 0, display: 'block'});
			  							logo.find('.text').stop().animate( { opacity: 1 }, 200 );
			  						} );
			  						nav.css({opacity: 0, display: 'block'});
			  						nav.stop().animate( { opacity: 1 }, 200 );
			  						if(IE8===false){
			  							nav.show();
			  						}
		  						}	  						
		  					}		
		  				}				
					},
					// mouseleave
					function(e){
						if(!jQuery.browser.mobile && deskXS === false)
							if(header.hasClass('stickit')){

								nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
									if(IE8===false){
			  							nav.hide();
			  						}
									header.css('background-color','transparent');
									logo.stop().animate( {
			    						marginTop: "32px",
			  						}, 400, function(){
			  							nav.removeClass('animating');
			  							logo.removeClass(active);
			  							
			  						});								
								});
		  							  					
			  				} else {
			  					
								nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
									if(IE8===false){
			  							nav.hide();
			  						}
									logo.stop().animate( {
			    						marginTop: "32px",
			  						}, 200, function(){
			  							nav.removeClass('animating');
			  							logo.removeClass(active);
			  							logo.find('.text').hide();	
			  							
			  						});								
								});
			  				}
							
					}
				);					

			},

			headerScroll: function(){
				if(!jQuery.browser.mobile && winWidth>=1024){
					//console.log('Execute Stick');
					if(stickyThis==='destroyed'){
						stickyThis = $(document).stickem({
					 	 	item: header,
					 		container: wrapper,
					 		stickClass: 'stickit',
					 		endStickClass: 'stickit-end',
					 		/*start: ,*/
					 		offset: -105,
					 		onStick: function(){
					 			app.headerFx();
						 	},
					 		onUnstick: function(){
					 		}
					 	});
				 	}
				} else {
					console.log('Destroy Stick');
					if(stickyThis!=="destroyed"){
						console.log('destroy again');
						stickyThis.destroy();
					}
				}
			},

			mobileMenu: function(){

				openMob.on('click', function(){
					if(jQuery.browser.mobile || deskXS === true){
						$(this).toggleClass('active');
						var tmp_height = nav.outerHeight();
						
						if($(this).hasClass('active')){
							logo.find('.spark').fadeOut(200, function(){
								logo.find('.text').fadeIn(200);
							});
							wrapper.stop(true, true).animate({
								paddingTop: tmp_height
							}, 300, function(){
								nav.css('opacity', 1);
								nav.stop(true, true).fadeIn(400);
							});
						}else{
							logo.find('.text').fadeOut(200, function(){
								logo.find('.spark').fadeIn(200);
							});
							nav.hide();
							wrapper.stop(true, true).animate({
									paddingTop:'0px'
								}, 400);
						}
					}
				});

				// Delete this
				$('#companies a').on('click', function(e){
					e.preventDefault();
				});

			},

			memberCarousel: function(){
				if(team.length && jQuery.browser.mobile){
					team.touchCarousel({
				        itemsPerMove: 1,
				        snapToItems: false,
				        pagingNav: false,
				        pagingNavControls: false,
				        scrollbar: false,
				        directionNav: false,
				        loopItems: true,
				        useWebkit3d: false
				    });
				}
			},

			homeVideo: function(){
				home_vid.hover(
					//mousenter
					function(){
						$(this).find('.video').stop(true, true).fadeIn(300);
					},
					//mouseleave
					function(){
						$(this).find('.video').stop(true, true).fadeOut(300);
					}
				);
				home_vid.on('click', function(e){
					e.preventDefault();
					$(this).find('.video-box').stop(true, true).fadeIn(300);					
				});
			},

			servicesRollover: function(){
				
				serv_a.hover(
					//mouseenter
					function(){
						if(!jQuery.browser.mobile){
							var topVal = '77px';
							if(winWidth<=1025){
								topVal = '40px';
							}
							$(this).find('.red-overlay').stop(true,true).fadeIn(200);
							$(this).find('h4').stop(true,true).animate({ top:topVal, color:'#ffffff' });
							$(this).find('.service-text').stop(true,true).fadeIn(500);
						} 
					},
					//mouseleave
					function(){
						if(!jQuery.browser.mobile){
							var topVal = '140px';
							if(winWidth<=1025){
								topVal = '90px';
							}
							$(this).find('.red-overlay').stop(true,true).fadeOut(200);
							$(this).find('h4').stop(true,true).animate({ top:topVal, color:'#cbcbcb' });
							$(this).find('.service-text').stop(true,true).fadeOut(500);
						}
					}
				);

			},

			fbRollover: function(){
				
				fb_btn.hover(
					//mousenter
					function(){
						if(winWidth<=767){
							$(this).find('.fb-icon').stop(true,true).animate({ top:'30px'}, 200);
						} else {
							$(this).find('.fb-icon').stop(true,true).animate({ top:'118px'}, 200);
						}
					},
					//mouseleave
					function(){
						if(winWidth<=767){
							$(this).find('.fb-icon').stop(true,true).animate({ top:'50px'}, 200);
						} else {
							$(this).find('.fb-icon').stop(true,true).animate({ top:'130px'}, 200);
						}
					}
				);

				fb_btn.on('click', function(e){
					e.preventDefault();
					if(!$(this).hasClass('deactive')){
						$(this).addClass('pressed');
						$(this).find('.like-txt').html('Thanks!');
						setTimeout(function() {
						    fb_btn.removeClass('pressed').addClass('deactive');
						    fb_btn.find('.like-txt').html('741 Likes');
						}, 3000);
					}
				});

			},

			navServices: function(){
				
				navserv.hover(
					//mouseenter
					function(){	
						if(!jQuery.browser.mobile){					
							$(this).find('.red-overlay').stop(true, true).fadeIn(500);
						}
					},
					//mouseleave
					function(){
						if(!jQuery.browser.mobile){	
							$(this).find('.red-overlay').stop(true, true).fadeOut(500);
						}
					}
				);

			},

			googleMap: function(){
				if(gmap.length){
					gmap.gmap3({
					    marker:{
					      address: address
					    },
					    map:{
					      options:{
					        zoom: 14
					      }
					    }
					});
				}
			},

			placeholderLabels: function(){
				contact.inFieldLabels();
			},

			memberRollover: function(){
				if(!jQuery.browser.mobile){			
					member.hover(
						//mouseenter
						function(){
							$(this).find('img').stop(true, true).fadeTo(300, 0.15);
							$(this).find('.member-text').stop(true, true).animate({ top:'94px', opacity:1 }, 300, function(){ });
						},
						//mouseleave
						function(){
							$(this).find('img').stop(true, true).fadeTo(300, 1);
							$(this).find('.member-text').stop(true, true).animate({ top:'114px', opacity:0 }, 300);
							$(this).find('.member-profile').stop(true, true).fadeOut(300);
						}
					);

					member.on('click', function(e){
						e.preventDefault();
						$(this).find('.member-profile').stop(true, true).fadeIn(300);
						
					});
				}
			},

			locationRollover: function(){
				
				locate.hover(
					//mouseenter
					function(){
						$(this).find('.location-hover').stop(true, true).fadeIn(300);
					},
					//mouseleave
					function(){
						$(this).find('.location-hover').stop(true, true).fadeOut(300);
					}
				);

			},

			instagramCols: function(){
				if(instagram.length){

					$(document).ready(function() {
					    instagram.hide();
					});

					if(winWidth<=769){
						var columnsGrid = 3;
					} else {
						var columnsGrid = 3;
					}
					// initialize
					instagram.imagesLoaded( function(){
						instagram.show();
						instagram.isotope({
						  itemSelector : '.isotope-item',
						  animationEngine: 'best-available',
						  resizable: false, // disable normal resizing
						  masonry: {
						    columnWidth: instagram.width() / columnsGrid
						  }
						});
						instagram.isotope( 'reLayout' );
					});
				}
				
			},

			workThumbs: function(){

				if(work_gal.length){

					$(document).ready(function() {
					    work_gal.hide();
					});

					if(winWidth>=1200){
						var columnsGrid = 3;
					} else if(winWidth>768 && winWidth<1200){
						var columnsGrid = 4;
					} else if(winWidth<=767){
						var columnsGrid = 2;
					}				

					
					
					work_gal.imagesLoaded( function(){	 	
						work_gal.show();
					    // set width of container based on columnWidth
					    work_gal.isotope({
					      // other options...
					      // disable automatic resizing when window is resized
					      itemSelector : '.isotope-item',
					      animationEngine: 'best-available',
					      resizable: false,
					      // set columnWidth option for masonry
					      masonry: {
					        columnWidth: work_gal.width() / columnsGrid
					      }
					    }).isotope( 'reLayout' );	
					    
					});				

					$(window).on("throttledresize", function( event ) {
					 	console.log('triggered');
						if(winWidth>=1200){
							var columnsGrid = 3;
						} else if(winWidth>768 && winWidth<1200){
							var columnsGrid = 4;
						} else if(winWidth<=767){
							var columnsGrid = 2;
						}				 	

					    // set width of container based on columnWidth
					    work_gal.isotope({
					      // other options...
					      // disable automatic resizing when window is resized
					      itemSelector : '.isotope-item',
					      animationEngine: 'best-available',
					      resizable: false,
					      // set columnWidth option for masonry
					      masonry: {
					        columnWidth: work_gal.width() / columnsGrid
					      }
					    }).isotope( 'reLayout' );
					    // trigger smartresize for first time
					});

				}
			}
			
		}
		
		return site;
		
	}());
	
	app.init();

});
