(function($, window, document, undefined) {
	// Default options
	var pluginName = "navigation", 
	screenSize = $(window).width(), 
	pixelSize = window.devicePixelRatio, 
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint, 
	desktopBreakpoint =  NVIDIAGDC.desktopBreakpoint, 
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {};
	// to keep track of elements of the brand nav that are visible
	var visibleCount = $(".sub-brand-item").length;
	// variable that keeps track of showing the more link on the brand
	// navigation
	var showMore = false;
	// variable that keeps track of the first time checkBrandNavSize was called
	var checkBrandNavSizeCalled = false;
	var windowWidth = $(document).width();
	// list of page elements to navigate to
	var pageElements = [];
	pageElements.push($("#sub-btn0").attr("href"));
	$(".breadcrumb-link").each(function() {
		pageElements.push($(this).attr("href"));
	});
	// variable that stores the number of in page navigation items
	var brandCrumbNavCount = $(".scrollmenu-button").length;
	var initScroll = 0, st = $(window).scrollTop(), headerCollapsed = false, scrollPos;

	var scrollingDown;

	// removing unused domain cookies with the referrer href and element
	Cookies.remove("nv.buttonReferrer",{
		domain : "nvidia.com"
	});
	Cookies.remove("nv.referrerHref",{
		domain : "nvidia.com"
	});
	Cookies.remove("nv.referrerId",{
		domain : "nvidia.com"
	});

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function() {
		this.registerCallbacks();
		this.handlePageLoadScroll();
	};

	Plugin.prototype.addNVSearchLibrary = function () {
		var enableSearchLibrary = this.options.enableSearchLibrary,
			locale = $('html').attr('lang'),
			searchOptions = $.extend({}, {
				site: 'https://www.nvidia.com',
				language: locale
			}, this.options.searchOptions);

		var _self = this,
			searchElement = document.querySelector('#nvidia-search-box-link');

		/*mount the library with options*/
		NvidiaSearchLibrary.BoxWidget.mount(searchOptions);
		$(document).trigger('loadedNVSearchLibrary');

		searchElement.onclick = function () {
			$(NvidiaSearchLibrary.BoxWidget.el).css({ 'visibility': 'hidden' });
			var boxWidgetElem = setInterval(function () {
				if ($("#" + NvidiaSearchLibrary.BoxWidget.id).length && $(NvidiaSearchLibrary.BoxWidget.el).find('.search-box-wrapper').children().length > 0) {
					clearInterval(boxWidgetElem);
					_self._resizeNVSearchLibrary(NvidiaSearchLibrary.BoxWidget);
				}
			}, 1);
		}

		$(document).on('scroll', function () {
			var event;
			//This is true only for IE,firefox
			if (document.createEvent) {
				// To create a mouse event , first we need to create an event and then initialize it.
				event = document.createEvent("MouseEvent");
				event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			else {
				event = new MouseEvent('mouseup', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
			}
			var node = document.getElementById('nvidia-search-box-dummy-link');
			node.dispatchEvent(event);
		});

		$(window).resize(function (e) {
			if ($(NvidiaSearchLibrary.BoxWidget.el).find('.search-box-popper').is(":visible")) {
				_self._resizeNVSearchLibrary(NvidiaSearchLibrary.BoxWidget);
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		});


		$(document).on('mouseup touchend click', function (e) {
			if (e.target.id == "nvidia-search-box-link" || $(e.target).parents("#nvidia-search-box-link").length) {
				if ($("#dropdown-arrow").hasClass("dropdown-expanded")) {
					toggleMainHeaderMenu.apply(_self);
				}
				$('.nvidia-search-box-overlay').fadeOut();
			} else if (e.target.id == "nvidia-search-box-widget" || $(e.target).parents("#nvidia-search-box-widget").length) {
				return;
			} else {
				$('.nvidia-search-box-overlay').fadeOut();
			}
		});

		$('.nvcarticon, .cart-counter').on('click', function () {
			$('.nvidia-search-box-overlay').fadeOut();
		});

		this._resizeNVSearchLibrary = function (BoxWidget) {
			var navHeaderContainer = $('.nav-header-container'),
				navHeaderContainerHeight = navHeaderContainer.height(),
				triggerId = $("#" + searchOptions.triggerId),
				offsetLeftTriggerID = triggerId.offset().left,

				boxWidgetId = BoxWidget.el,
				searchBoxPoper = $(boxWidgetId).find('.search-box-popper'),
				searchBoxPoperArrow = $(boxWidgetId).find('.search-box-popper-arrow'),
				searchBoxPoperWidth = searchBoxPoper.width(),
				offsetLeftBoxWidgetId = 0,
				cssObj;

			navHeaderContainerHeight += $(window).scrollTop();
			var isMobile = NVIDIAGDC.Browser.getViewport() == "mobile";

			if (isMobile) {
				if (window.matchMedia("(max-width:480px)").matches) {
					navHeaderContainerHeight += 10;
					cssObj = {
						'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '50%',
						'transform': 'translate3d(-50%, ' + navHeaderContainerHeight + 'px, 0px)',
						'width': '270px', 'margin': '0 auto'
					};
				} else {
					searchBoxPoperWidth = searchBoxPoperWidth / 1.5;
					offsetLeftBoxWidgetId = offsetLeftTriggerID - searchBoxPoperWidth;
					cssObj = {
						'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px',
						'transform': 'translate3d(' + offsetLeftBoxWidgetId + 'px, ' + navHeaderContainerHeight + 'px, 0px)',
						'width': '270px'
					};
				}
			} else {
				searchBoxPoperWidth = searchBoxPoperWidth * 3 / 4;
				offsetLeftBoxWidgetId = offsetLeftTriggerID - searchBoxPoperWidth;
				cssObj = {
					'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px',
					'transform': 'translate3d(' + offsetLeftBoxWidgetId + 'px, ' + navHeaderContainerHeight + 'px, 0px)',
					'width': '270px'
				};
			}
			searchBoxPoper.css(cssObj);
			offsetLeftTriggerID = offsetLeftTriggerID - searchBoxPoper.offset().left;
			searchBoxPoperArrow.css({
				'left': offsetLeftTriggerID + 'px'
			});
			$('.nvidia-search-box-overlay').stop(true, true).fadeIn(200);
			$(NvidiaSearchLibrary.BoxWidget.el).css({ 'visibility': 'visible' });
		}
	}

	Plugin.prototype.registerCallbacks = function() {
		
		$(".nav-langglobe-icon").click(function(e){
		e.preventDefault();
		$(".navglobicon > ul > li> ul").addClass("phonetabletshow");		
		});
	
		var throttledCheckSize = _.throttle(checkSize, 250);
		var throttledToggleHeader = _.throttle(toggleHeader, 250);
		var throttledExtendJarvisSession = _.throttle(extendJarvisSession, 750);
		this.$element.find("#dropdown-arrow").click($.proxy(toggleMainHeaderMenu, this));
		this.$element.find(".nav-search-icon, .search-abort").click(
            toggleSearchBar
        );
        $(".searchoverlay").click(toggleSearchBar);
		this.$element.find(".ic-expand").click($.proxy(toggleSubnavMenu, this));
		this.$element.find(".scrollmenu-button").click(
			$.proxy(toggleSubnavMenu, this));
		// this.$element.find(".ic-menu").click($.proxy(toggleBrandnavMenu,
		// this));
		this.$element.find('.global-item[data-element-role="solutions"]')
		.hover($.proxy(toggleSolutionsMenu, this));
		$(window).resize($.proxy(throttledCheckSize, this));
		$(window).scroll($.proxy(throttledToggleHeader, this));
		$(
			".breadcrumb-link span, .subnav-category span, .scrollmenu-button span, .link-txt[data-href^='#'] .btn, .link-btn[data-href^='#'] .btn")
		.click(smoothScroll);
		/* handle Breadcrumb CTA model popups */
		$(".model-popup").click(openModal);
		$(document).on("showCart", showHeader);
		checkSize.apply(this);
		
		/* AD-877 -Fixed issue when it is searching from research page */
		$("#searchform").submit(function(e){
			var actionurl = document.getElementById("searchform").action;
			if(actionurl.indexOf("search/node") !== -1) {
				e.preventDefault();
				actionurl = actionurl + $(".search-box-input").val();
				window.location.href = actionurl;
			}
		});
		/* AD-877 End */
		
	    $(".nav-search-form-icon").click(function(){
	        $("#searchform").submit();
	    });
		
		/* research page goes to a different page */
		if (this.$element.find(".search-research").length) {
			this.$element.find("#searchform").on("submit", submit2Research);
		}
		this.$element.find("#search-terms").keypress(searchsubmitvalidation);
		$(".search-abort").click(function() {
			$(".search-box-input").val("");
		});
		$(document).on("click scroll", throttledExtendJarvisSession);
		//console.log("Inside registerCallbacks");

		/*$(".mobile-menu").slideMobileMenu({


		}); */
		if ($(document).width() < 1025) {
			$(".mobile-menu").slideMobileMenu({

			});

		/*	var openItem = getCookie("openMenuItem");
			if (openItem != "" && openItem != null && openItem != 'none') {

				$('.ic-menu').click();
				if (openItem != "main-menu") {
					$('.mobile-menu').find(
							$("li.hasChild:contains(" + openItem + ")"))
							.addClass('active');
				}
			} */

		}

		/*else {



		}*/




		/************ Desktop menu *************/

		$(function() {
			$(".sub-brand-item").each(function() {
				var subLink = $(this).find("span.sub-brand-link").width();
				if (document.documentMode || /Edge/.test(navigator.userAgent)) {
					var nvArrowLt = subLink - 30;
				}
				var nvArrowLt = subLink - 30;
				var nvwidth = subLink + 65;
				$(this).find(".nvArrow").css("left", nvArrowLt);
				$(this).find("#nav").css("min-width", nvwidth); 
				$(this).find("li.more-element").closest("ul").addClass("more-menu");
			});


			$(".dropdown-menu > li:first-child").each(function() {
				var parent = $(this).parent('ul.dropdown-menu').prev();
				var copy = parent.clone();
				$(copy).removeClass("div").find(".ic-arrow-dropdown").remove();
				$(copy).removeClass("div").find(".arrow").remove();
				$(copy).removeClass("sub-menu").addClass("overview");
				$(copy).prepend();
        //$(this).before(copy);

        $('.dropdown-menu span.sub-brand-link ').replaceWith(function() {
        	return $('<li/>', {
        		html: this.innerHTML
        	})
        });
        $('.sub-brand-link > a').addClass('dropdown-toggle');
        $(".dropdown-menu li a.sub-brand-link").html("<div class='title'>Overview</div>");
        $(".global-nav-link.overview").html("<div class='title'>Overview</div>");

        $('span.sub-brand-link').addClass('button-dropdown');
    });
			$(".global-nav-link.overview").wrap("<li></li>");
			$('.sub-brand-link > a').attr('href', 'javascript:void(0)');
			$('.global-nav-link.sub-menu').attr('href', 'javascript:void(0)');

			hide = true;
			$('body').on('click', '.sub-brand-item', function() {
				var self = $(this).find(".dropdown-menu.bullet");
				var nvself = $(this);
				self.toggleClass('active');
				nvself.toggleClass('active');
				hide = false;
			});



			$('.sub-brand-item').hover(
				function() {
					$('.sub-brand-item').removeClass('active');
					$(".sub-menu").removeClass('active');
					$(".dropdown-menu").removeClass('active');
					$(".arrow").removeClass('active');
				},
				function() {
					if ($('.sub-brand-item').children().length > 0) {
						$('.sub-brand-item').removeClass('active');
					}
					$(this).find(".dropdown-menu.active").parent().addClass('active');
				});


			$('.dropdown-menu.bullet > li').bind('click mouseenter', function() {
				if(!$( this ).find( ".dropdown-menu.level2" ).hasClass( "active" )){
					$(".dropdown-menu.sub").removeClass('active');}

					if(!$( this ).find( ".dropdown-menu.level2 .sub-menu" ).hasClass( "active" )){
						$(".dropdown-menu.sub .sub-menu").removeClass('active');}
						$('.dropdown-menu.bullet li').has('.sub-menu ').removeClass('active');
						if($( this ).find( ".dropdown-menu.level3" ).has( "active" )){
							$( this ).find( ".dropdown-menu.level3.active" ).parent().addClass('active');}
							$(this).has('.sub-menu ').addClass('active');
      //  $(this).find(".dropdown-menu.level2").addClass('active');
      $(this).parent().addClass('active');

  });



			$('.dropdown-menu.level2 li').hover( function() {
				$(".dropdown-menu.level2 .sub-menu").removeClass('active');
				$(".dropdown-menu.level3").removeClass('active');
				$(this).has('.sub-menu ').addClass('active');
				$(this).parent('ul.dropdown-menu.sub').addClass('active');
				$(this).find(".dropdown-menu.level3").addClass('active');
				$(this).parent().parent('.sub-menu').addClass('active');
			});



			$('.brand-nav-left .sub-brand-item').hover(
				function() {
					$(this).removeClass('active');
					$( this ).find(".dropdown-menu.bullet").removeClass('active');
					if($( this ).find( ".dropdown-menu.level2" ).hasClass( "active" )){
						$( this ).find(".dropdown-menu.bullet").addClass('active');
						$(this).addClass('active');
					}

				});



			$('.sub-brand-item').hover( function() {

				if ( ($(this).find(".dropdown-menu").hasClass("level2")) && ($(this).find(".dropdown-menu").hasClass("level3"))  ){

					var subLink2W = $(this).find(".dropdown-menu.level2").width()+30;
					var subLink3W = $(this).find(".dropdown-menu.level3").width()+30;
					var subLink3W1 =   subLink3W + 5;
      //  console.log(subLink2W);
      //   console.log(subLink3W);


      if(( $(this).find(".dropdown-menu.level3").offset().left + subLink3W ) > $(document).width()){
      	$(this).parents('ul.dropdown-menu.sub').css("right","100%").addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level3").css( "width",subLink3W1).addClass('edge');
      }

      if(( $(this).find(".dropdown-menu.level2").offset().left + subLink2W) > $(document).width()){
      	$(this).parents('ul.dropdown-menu.sub').addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level2").css("right","100%").addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level3").removeClass('edge');
      }
  }
});




			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);


			var isEdge = /Edge/.test(navigator.userAgent); 

			if (isEdge || isSafari ) {
				var max = 0;
				$('ul.level2 li .title').each(function(){
					var length = $(this).text().length;

					var ulw = length * 8.25;
					var ulwt = ulw +16 ;


					if( ulw <= 130 ){
						$(this).css("min-width", ulw +10);
						$(this).parent().parent().css("min-width", ulw+10);

					}
					else  if( ulwt <= 179 ){
						$(this).css("min-width", ulwt);
						$(this).parent().parent().css("min-width", ulwt);

					}

					else  if( ulwt <= 210 ){
						$(this).css("min-width", ulwt+11);
						$(this).parent().parent().css("min-width", ulwt+11);

					}

					else  if( ulw > 200 ){
						$(this).css("min-width", "228px");
						$(this).parent().parent().css("min-width", "232px");
					}
				}); 
			}



			$('body').on("click", function() {
				if (event.target.id == "nv-language" || $(event.target).parents("#nv-language").length) {
                    if ($(".phonetabletshow").length){
						$(".navglobicon > ul > li> ul").addClass("phonetabletshow");
					}
                }else {
                    $(".phonetabletshow").removeClass("phonetabletshow");
    			}
				if (hide) $('.dropdown-menu.bullet').removeClass('active');
				if (hide) $('.sub-brand-item').removeClass('active');
				if (hide) $('.dropdown-menu.sub').removeClass('active');
				if (hide) $('.sub-menu ').removeClass('active');
				hide = true;
			});

		});



/******************** end ****************/




};

Plugin.prototype.handlePageLoadScroll = function() {
	var hashid = NVIDIAGDC.Browser.getUrlParameter("section");
	if (!!hashid) {
			// var hashid=window.location.hash;
			setTimeout(function() {
				hashid = "#" + hashid;
				if ($(hashid).offset()) {
					if ($(".breadCrumbNav").length) {
						// find always returns Object, checking length of Object.
						// failing below if condition while breadCrumb is enabled and no matched element present in breadCrumb.
						var breadCrumbOBj = $(".breadCrumbNav").find(
							".subnav-right").find(
							"a[href='" + hashid + "']");
							if (breadCrumbOBj.length) {

								$(breadCrumbOBj).find("span").trigger("click");
							} else {
								handleSmoothScroll(hashid);
							}
						} else {
							handleSmoothScroll(hashid);
						}
					}
				}, 500);
		}
	};

	/* Code for New Mobile menu */

	//Check if the cookie is set for menu

	var defaults = {
		"hamburgerId" : "ic-menu", // Hamburger Id
		"wrapperClass" : "mobile-menu-container", // Menu Wrapper Class
		"submenuClass" : "submenu", // Submenu Class
		"onMenuLoad" : function() {
			return true;
		}, // Calls when menu loaded
		"onMenuToggle" : function() {
			return true;
		} // Calls when menu open/close

	};

	var menuToggle;
	menuToggle = new TimelineMax({
		paused : true,
		reversed : true
	});

	if(NVIDIAGDC.isBrandPage){
		menuToggle.add('rotate', 0.1).to(' #menu-line-top', .5, {
			stroke : '#76b900',
			transformOrigin : '50% 50%',
			x : '0',
			y : '6'
		}, 'rotate').to(' #menu-line-mid', .5, {
			stroke : 'rgba(118,185,0,0)',
			transformOrigin : '50% 50%',
			x : '0',
			y : '0'
		}, 'rotate').to(' #menu-line-bot', .5, {
			stroke : '#76b900',
			transformOrigin : '50% 50%',
			x : '0',
			y : '-6'
		}, 'rotate').to(' #menu-line-top', .5, {
			rotationZ : 225,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate').to(' #menu-line-mid', .5, {
			rotationZ : 225,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate').to(' #menu-line-bot', .5, {
			rotationZ : 135,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate');
	}

	$.fn.slideMobileMenu = function(options) {

		if (this.length === 0) {
			return this;
		}
		var mobMenu = {}, ds = $(this);

		var init = function() {
			mobMenu.settings = $.extend({}, defaults);
			createBackButton();
			mobMenu.hamburger = $('.ic-menu');

		}

		createBackButton = function() {

			mobMenu.outer = $('.mobile-menu-container');
			mobMenu.outer
			.find("ul." + mobMenu.settings.submenuClass)
			.each(
				function() {
					var dis = $(this), disPar = dis
					.closest("li"), disfA = disPar
					.find("> a"),

					disBack = $(
						"<li/>",
						{
							"class" : "back",
													// "html": "<div
													// class='mobile-arrow-left'></div><a
													// href='#'>" + disfA.text()
													// + "</a>"})
													"html" : "<div class='mobile-arrow-left'><svg class='left-arrow' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><polygon points='352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256'/></svg></div><a href='#'>Back</a>"
												})
					disPar.addClass("hasChild");
					disBack.prependTo(dis);
					$('<svg class="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="a" d="M11.45,22.12,17.56,16,11.45,9.88,13.33,8l8,8-8,8Z"/></svg>').prependTo(disPar);
				});
		},

		toggleMobileMenu = function(e) {
			//console.log("Did toggle menu");

			$("." + mobMenu.settings.hamburgerId).toggleClass("open");
					/* $("." + mobMenu.settings.wrapperClass)
							.toggleClass("active").find("li.active")
							.removeClass("active");*/
					//$("." + mobMenu.settings.wrapperClass).toggleClass("hide");
					// $("body").toggleClass("mmactive");
					$(".ic-menu").toggleClass("ic-menu-green");
					$(document.body).toggleClass("noscroll");

					if ($("." + mobMenu.settings.hamburgerId).hasClass('open')
					/*&& $("." + mobMenu.settings.wrapperClass).hasClass(
					'active')*/) {
							/*logic to reset sidenav*/
						resetsideNav();
						hideHeader();
					menuToggle.restart();

					$('.mobile-menu-container').css({
						'display' : 'block',
						'opacity' : '1',
						'overflow' : 'hidden',
						'transition' : 'all 0.5s ease-in'
					});
					if (getCookie("openMenuItem") == 'none') {
						setSessionCookie("openMenuItem", "main-menu");
						TweenMax.to($('.mobile-menu').children("li").find(
							'a'), 0.1, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});
					}

					$('.lightbox-background').css({
						opacity : 0
					});
					$('.lightbox-background').removeClass('hide');
					TweenMax.to('.lightbox-background', 0.5, {
						autoAlpha : 1,
						delay : 0.2
					});
						// TweenMax.to($('.mobile-menu-container'), 0.2,
						// {opacity: 1, ease: Expo.easeInOut});
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'height' : '100vh',
								'transition' : 'all 0.8s'
							});
						}, 100);
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'overflow-y' : 'auto'
							});
						}, 200);

					} else {

						$('.mobile-menu-container').css({
							'overflow' : 'hidden',
							'height' : '0',
							'transition' : 'all 0.5s'
						});

						/*TweenMax.to($('.mobile-menu-container'), 0.1,
						{opacity: 0, ease: Expo.easeOut});*/
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'display' : 'none'
							});
						}, 500);

						setTimeout(function() {
							$('.mobile-menu').find('.active').removeClass(
								'active');
						}, 500);

						setTimeout(function() {
							$('.subnav').css({
								'display' : 'block'
							});
						}, 400);

						TweenMax.to('.lightbox-background', 1, {
							autoAlpha : 0,
							onComplete : function() {
								$('.lightbox-background').addClass('hide');
							}
						});
						setSessionCookie('openMenuItem', 'none');

						setTimeout(function() {showHeader()},800);
						menuToggle.reverse();
					}

				},

				showSubMenu = function(e) {
					e.preventDefault();

					$("." + mobMenu.settings.wrapperClass).scrollTop(0);
					$(this).parent().addClass("active").siblings().removeClass(
						"active");
					var name = $(this).html();
					//console.log($(this).parent().siblings("li").andSelf().find('a:first'));
					// $(this).parent().siblings("li").andSelf().find('a:first').addClass('mnm');
					TweenMax.to($(this).parent().siblings("li").andSelf().find(
						'a:first'), 0.1 * 4, {
						x : -1025,
						left : -1025,
						opacity : 1,
						ease : Cubic.easeInOut
					});
					//console.log($(this).parent().siblings("li:first").find('.mobile-arrow-left:first'));
					TweenMax.to($(this).parent().siblings("li:first").find(
						'.mobile-arrow-left:first'), 0.1 * 4, {
						x : -1025,
						left : -1025,
						opacity : 1,
						ease : Cubic.easeInOut
					});

					//document.cookie = "openMenuItem="+ name +";path=/";
					setSessionCookie("openMenuItem", name);

				},

				goBack = function(e) {
					e.preventDefault();

					$(this).closest("ul." + mobMenu.settings.submenuClass)
					.parent().removeClass("active");
					//console.log($(this).parent().parent().siblings("li").andSelf().find('a:first'));
					TweenMax.to($(this).parent().parent().siblings("li")
						.andSelf().find('a:first'), 0.1 * 4, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});
					TweenMax.to($(this).parent().parent().siblings("li:first")
						.find('.mobile-arrow-left'), 0.1 * 4, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});

					//console.log($(this).parent().parent().find('.mobile-arrow-left:first'));
					var prev = $(this).parent().parent().parent().siblings('a')
					.html();
					if (typeof prev === "undefined" || prev == ''
						|| prev == null) {
						setSessionCookie("openMenuItem", "main-menu");
				} else {
					setSessionCookie("openMenuItem", prev);
				}
			},

			/* Init */
			init();

			/* Open Menu */

			mobMenu.hamburger.click(toggleMobileMenu);
			/* Show SubMenu */
			mobMenu.outer.find("li.hasChild > a").click(showSubMenu);
			/* Go Back */
			mobMenu.outer.find("li.back").click(goBack);

			$(".lightbox-background").bind('mousedown touchstart', function() {
				if ($("." + mobMenu.settings.hamburgerId).hasClass('open')) {

					toggleMobileMenu();
				}
				return false;
			});

		}

		function getCookie(cName) {
			var name = cName + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		function setSessionCookie(cName, cValue) {
			document.cookie = cName + "=" + cValue + ";path=/";
		}

		/* Mobile menu code ends here */

	function handleSmoothScroll(hashid) {
		var mobileOffset = NVIDIAGDC.Browser.getUrlParameter("m") ? NVIDIAGDC.Browser.getUrlParameter("m") : 0,
			tabletOffset = NVIDIAGDC.Browser.getUrlParameter("t") ? NVIDIAGDC.Browser.getUrlParameter("t") : 0,
			laptopOffset = NVIDIAGDC.Browser.getUrlParameter("l") ? NVIDIAGDC.Browser.getUrlParameter("l") : 0,
			desktopOffset = NVIDIAGDC.Browser.getUrlParameter("d") ? NVIDIAGDC.Browser.getUrlParameter("d") : 0,
			targetOffset = $(hashid).offset().top,
			newTargetOffset = 0,

			globalNav = $(".global-nav"),
			navHeader = $(".nav-header").height(),

			subBrandNav = $(".sub-brand-nav"),
			subBrandNavHeight = subBrandNav.height(),

			breadCrumbOBj = $(".breadCrumbNav").find(".subnav"),
			breadCrumbOBjHeight = breadCrumbOBj.height();

		// defaultOffset = (scrollDirection == 'down') ? subBrandNavHeight : globalNavHeight; 
		defaultOffset = subBrandNavHeight + breadCrumbOBjHeight,
			viewport = NVIDIAGDC.Browser.getViewport();

		switch (viewport) {
			case "mobile": defaultOffset -= mobileOffset;
				break;
			case "tablet": defaultOffset -= tabletOffset;
				break;
			case "laptop": defaultOffset -= laptopOffset;
				break;
			case "desktop":
			default: defaultOffset -= desktopOffset;
		}

		function reTrigger() {

			$("html, body").stop().animate({
				scrollTop: targetOffset - defaultOffset + "px"
			}, 1500, "linear", function () { // handles dynamically changing of Element offset.
				newTargetOffset = $(hashid).offset().top;

				if (targetOffset == newTargetOffset) {
					return false;
				}
				if (targetOffset < newTargetOffset) {
					targetOffset = newTargetOffset;
					reTrigger();
				}
			})
		}
		reTrigger();
	}

	// method that extends the jarvis session cookie by 20 mns
	// it is invoked when the user clicks or scrolls
	function extendJarvisSession() {
		var sessionData = Cookies.get("nv.nvidmData");
		if (sessionData) {
			var sessionDuration = 1 / (24 * 3);
			Cookies.remove("nv.nvidmData", {
				domain : "nvidia.com"
			});
			Cookies.set("nv.nvidmData", sessionData, {
				domain : "nvidia.com",
				expires : sessionDuration
			});
		}
	}

	function submit2Research(e) {
		e.preventDefault();
		var searchval = $(".search-box-input").val();
		window.location.href = $("#searchform").attr("action") + searchval;
	}

	function toggleSearchBar(e) {
		e.preventDefault();
		if($("#dropdown-arrow").hasClass( "dropdown-expanded")){
                 $( "#dropdown-arrow" ).trigger( "click" );
        }
		$(".search-outter-container").toggleClass( "hide-wid-0" );
		$(".search-abort-container").toggleClass( "hide" );
		$(".searchoverlay").toggleClass( "searchoverlaydisplay" );
		$(".search_white").toggleClass( "search-shown");
		if($(".search-outter-container").hasClass("hide-wid-0")){
			$(".nav-search-icon").fadeToggle(200);
			//$(".profile-item").delay(500).fadeToggle(200);
			//$(".cart-item").delay(500).fadeToggle(200);
			//$(".nav-header-container").delay(500).toggleClass("mob-hide-brand");
		}else{
			//$(".nav-header-container").toggleClass("mob-hide-brand");
			$(".nav-search-icon").toggle();
			//$(".profile-item").toggle();
			//$(".cart-item").toggle();
			$('#search-terms').focus();	
		}
	}
	function searchsubmitvalidation(event) {
		// condition to prevent account page form validation
		if (event.which == 13) {
			event.stopPropagation();
		}
	}



	function backToTop() {
		if ($(window).scrollTop() == 0) {
			return;
		}
		$("html, body").animate({
			scrollTop : 0
		}, 500, "linear");
	}
	function hightlightElementSelected($selected) {
		removeHighlighting();
		// console.log($selected);
		if (!$selected.hasClass("cta")) {
			$selected.parent().addClass("selected");
		}
	}

	function removeHighlighting() {
		$(".breadcrumb-element").removeClass("selected");
	}





	function smoothScroll(e) {
		if ($(this.parentElement).attr("target") !== "overlay") {

			/** Adding Logic for Tab highlight **/            
			if ($(this.parentElement).attr("data-activetab")) {
				var tabcomponentparam =  $(this.parentElement).attr("data-activetab");
				var tabancrid = tabcomponentparam.substring(0, tabcomponentparam.lastIndexOf("-") + 0);
				var tabancrindx = tabcomponentparam.substring(tabcomponentparam.lastIndexOf("-") + 1, tabcomponentparam.length);                
				var tabelement = '#' + tabancrid;
			    var $ultabs=$('#' + tabancrid).find('>.tabs-wrapper');
			    var $tabcontainer=$('#' + tabancrid).find('>div.tab-container');
				   	
				if ($ultabs.find('>ul.tabs >li:nth-child(' + tabancrindx + ')').length) {            
					var li = $ultabs.find('>ul.tabs >li');
					var tabContent = $tabcontainer.find('>.tab-content');            
					
					li.removeClass('current');            
					tabContent.removeClass('current');
					/*check if its embeded*/
					var $isembed=$('#' + tabancrid).parent().closest(".tabblock"); 
					if($isembed.length){
						/*reset current for parent Tabs*/
						$isembed.find('>.tabs-wrapper >ul.tabs >li').removeClass('current'); 
						$isembed.find('>.tab-container >.tab-content').removeClass('current');	
						$closestparentTab=$('#' + tabancrid).closest(".tab-content");
						var currentindex=$closestparentTab.index()+1;
						$isembed.find('>.tabs-wrapper >ul.tabs >li:nth-child(' + currentindex + ')').addClass('current');
						$closestparentTab.addClass('current');
					}
					var $p =  $ultabs.find('>ul.tabs >li:nth-child(' + tabancrindx + ')');
					$p.addClass('current');
					
					var calcposition = 0;
					$p.parent().scrollLeft(calcposition);
					calcposition = ($p.offset().left)-(($(window).width())/2) + 90;
					var position = $p.position();
					$p.parent().scrollLeft(calcposition);
					$tabcontainer.find('>div:nth-child('+ tabancrindx + ')').addClass('current');
				} else {        	
					setFirstTabContentCurrent($(tabelement));
				}
			}            
			/** End of Logic for Tab highlight **/

			
			var id, $linkSelected;
			$(".subnav").data("auto-scrolling", "yes");
			if (e.target.nodeName === "SPAN") {
				$linkSelected = $(this.parentElement);
				id = $linkSelected.attr("href");
				hideSubnavMenu($("#subnav-menu"));
			} else if (e.target.nodeName === "DIV") {
				$linkSelected = $(this.parentElement);
				id = $linkSelected.data("href");
				$linkSelected = $(".breadcrumb-element a[href='" + id + "']");
			} else {
				// for subnav links, not including the CTA
				$linkSelected = $(this.parentElement);
				id = $linkSelected.attr("href");
			}
			if(id.startsWith("#")){
				scrollPos = 0;
				e.preventDefault();
				e.stopPropagation();
				var $id = $(id);
				// in case the author puts the wrong href
				if ($id.length === 0) {
					return;
				}
				var sp = $(id).offset().top;
				st = $(window).scrollTop();
				if (sp == st) {
					return;
				}
				hideHeader();
				if (windowWidth < 768) {
					scrollPos = sp - 81;
				} else if (windowWidth < 1025) {
					scrollPos = sp - 101;
				} else {
					scrollPos = sp - 135;
				}
				$("html, body").animate({
					scrollTop : scrollPos
				}, 500, "linear").promise().then(function() {
					setTimeout(function() {
						$(".subnav").data("auto-scrolling", "no");
					}, 100);
					hightlightElementSelected($linkSelected);
				});
	
				return false;
			}
		}
	}

	function determineLinkToHightight(st) {
		var elementHeight, headerSize, $pageElement;
		// determing the header size base on the vertical direction of scrolling
		if (scrollingDown) {
			headerSize = 109;
		} else {
			headerSize = 179;
		}
		var activebreadcrumbindex = 0;       
		for (i = 0; i < pageElements.length; i++) {
			$pageElement = $(pageElements[i]);
			var breadcrumbactiveindex = 0;
			breadcrumbactiveindex = $((($pageElement.find(".tabcomponentenhanced")).find(".tabs")).find("li.current")).index();           
			if (breadcrumbactiveindex >= 0){
				activebreadcrumbindex = breadcrumbactiveindex + 1; 
			}else{
				activebreadcrumbindex = i;
			}           
			// handling the case when the author populates the breadcrumb with
			// wrong hrefs
			if ($pageElement.length != 0) {
				elementHeight = $pageElement.height();
				elementPosition = $pageElement.offset().top;
				if (elementPosition - headerSize <= st
					&& st <= elementPosition - headerSize + elementHeight) {
					hightlightElementSelected($("#sub-btn" + activebreadcrumbindex));
				break;
			} else {
				removeHighlighting();
			}
		}
	}
}

function toggleHeader() {
	if ($(".subnav").data("auto-scrolling") == "yes" || $('.no-hamburgler').length ) {
			// console.log("left toggle scroll call back function bevause we are
			// autoscrolling" or sidenav is open );
			return;
		}
		// console.log("inside toggle header, autoscrolling is :" +
		// $(".subnav").data("auto-scrolling"));
		windowWidth = $(document).width();
		st = $(window).scrollTop();
		if (windowWidth > (NVIDIAGDC.desktopBreakpoint-1)) {
			determineLinkToHightight(st);
		}
		if (st < initScroll) {
			showHeader();
			scrollingDown = false;
		}
		// handling the case of bounce scrolling for iOs devices
		if (st <= 50) {
			return;
		} else if (st > initScroll) {
			scrollingDown = true;
			hideHeader();
		}
		initScroll = st;
	}

	function hideHeader() {

       if (!$("body").hasClass("nv-megamenu")) {
		$(".global-nav").addClass("pull-up");		
		if ($(".phonetabletshow").length){
	      	$(".phonetabletshow").removeClass("phonetabletshow");
	    }
		$(".subnav").addClass("pull-up");
		$("#page-content").addClass("pull-up");
        }
		if (!$(".global-menu-overlay").hasClass("hide")) {
			$(".global-menu-overlay").animate({
				top : "66px",
				duration : 500
			});
		}
		if($(".search-outter-container").length && !$(".search-outter-container").hasClass( "hide-wid-0" )){
			$(".searchoverlay").toggleClass( "searchoverlaydisplay" );
			$(".search_white").toggleClass( "search-shown");
			$(".search-outter-container").toggleClass( "hide-wid-0" );
			$(".search-abort-container").toggleClass( "hide" );
			$(".nav-search-icon").delay(500).toggle();
			//$(".profile-item").delay(800).toggle();
			//$(".cart-item").delay(800).toggle();
			//$(".nav-header-container").delay(800).toggleClass("mob-hide-brand");
		}
		headerCollapsed = true;
	}

	function showHeader() {
        var viewport = NVIDIAGDC.Browser.getViewport();
        // $(".nav-header-container").slideDown("500");
     if (!$("body").hasClass("nv-megamenu")) {
        $(".global-nav").removeClass("pull-up");
        $(".subnav").removeClass("pull-up");
        $("#page-content").removeClass("pull-up");
            }
        if (!$(".global-menu-overlay").hasClass("hide") && viewport == "desktop") {
            $(".global-menu-overlay").animate({
                top : "100px",
                duration : 500
            });
        }
        headerCollapsed = false;
    }
	function checkSize() {
		//hideBrandnavMenu($(".mobile-menu-container"));

		checkBrandNavSize(this.options);
	}

	function checkBrandNavSize(options) {
		
		var brandNavWidth = $(".brand-nav-left").width(), brandNavContainerWidth = $(
			".sub-brand-nav-container").width(), BrandNavSize = $(".sub-brand-item").length, savedWidth = 0;
		var totalElementswidth = 0;
		$(".sub-brand-item").each(function() {
			totalElementswidth += $(this).outerWidth(true);
		});
		windowWidth = window.innerWidth;
		// console.log(windowWidth);
		if (windowWidth > (NVIDIAGDC.desktopBreakpoint-1)) {
			hideBrandnavMenu($(".mobile-menu-container"));
		}

		// handling corporate brand navigation overflow
		if (options.globalSite) {
			while (windowWidth > (NVIDIAGDC.desktopBreakpoint-1) && totalElementswidth - savedWidth > brandNavContainerWidth - 100) {
				savedWidth = savedWidth
				+ $(".sub-brand-item").eq(visibleCount - 2).width();
				$(".sub-brand-item").eq(visibleCount - 2).addClass("hide");
				$(".more-element").eq(visibleCount - 3).removeClass("hide");
				windowWidth = $(document).width();
				brandNavContainerWidth = $(".sub-brand-nav-container").width();
				visibleCount--;

			}
		}
		// handling brand navigation overflow
		else {
			while (windowWidth > (NVIDIAGDC.desktopBreakpoint-1) && totalElementswidth - savedWidth > brandNavContainerWidth - 250 && visibleCount > 0) {
				savedWidth = savedWidth
				+ $(".sub-brand-item").eq(visibleCount - 2).width();
				$(".sub-brand-item").eq(visibleCount - 2).addClass("hide");
				$(".more-element").eq(visibleCount - 2).removeClass("hide");
				windowWidth = $(document).width();
				brandNavContainerWidth = $(".sub-brand-nav-container").width();
				visibleCount--;

				showMore = true;
			}
			if (showMore) {
				$(".sub-brand-item").last().removeClass("hide");
			}			
		}
		
		if (!checkBrandNavSizeCalled) {
			$(".brand-nav-left").addClass("in");
		}
		checkBrandNavSizeCalled = true;
		
		if (screenSize >= desktopBreakpoint) {
            //console.log(screenSize);
            if ($('#brand-cta-button').length) {
                var brandCTA = $('.sub-brand-nav').find('#brand-cta-button').width();
                var brandCTAwidth = brandCTA + 20;
                $(".brand-nav-left").css({
                    'width': 'calc(100% - ' + brandCTAwidth + 'px)'
                });
            } else {
                $(".brand-nav-left").css('width', 100 + '%');
            }
        }
	}

	function toggleMainHeaderMenu() {
		if(this.$element.find(".searchoverlay").hasClass("searchoverlaydisplay")){
				 $( ".searchoverlay" ).trigger( "click" );
		}
		var overlayElement = this.$element.find(".global-menu-overlay");
		if (overlayElement.hasClass("hide")) {
			overlayElement.removeClass("hide").addClass("show");
			overlayElement.outerWidth();
			overlayElement.addClass("in");
			$(document.body).addClass("noscroll");
			this.$element.find("#dropdown-arrow").addClass("dropdown-expanded");
		} else {
			overlayElement.removeClass("in");
			overlayElement.removeClass("show").addClass("hide");
			$(document.body).removeClass("noscroll");
			this.$element.find("#dropdown-arrow").removeClass(
				"dropdown-expanded");
		}
	}

	function toggleSubnavMenu() {
		var overlayElement = this.$element.find("#subnav-menu");
		if (overlayElement.hasClass("hide")) {
			overlayElement.removeClass("hide").addClass("show");
			this.$element.find(".subnav").css({
				height : "100vh",
				opacity : 1
			});
			this.$element.find(".ic-expand").addClass("ic-expand-green");
			$(document.body).addClass("noscroll");
		} else {
			hideSubnavMenu(overlayElement);
		}
	}

	function hideSubnavMenu(overlayElement) {
		overlayElement.removeClass("in show").addClass("hide");
		$(".subnav").removeAttr("style");
		$(".ic-expand").removeClass("ic-expand-green");

		$(document.body).removeClass("noscroll");
		if($(window).width()<NVIDIAGDC.desktopBreakpoint && $(".hide-unibrow").length<1){
            $(".subnav").css("marginTop", $("#unibrow-container").css("height"));
        }
	}
	
	function resetsideNav (){
		if ($(".hamburgler").length && ($(".hamburgler").hasClass("no-hamburgler"))) {
			$(".hamburgler").toggleClass('no-hamburgler sidenav-open sidenav-close');
            $("#docarea").toggleClass("tab-hide mob-hide lap-hide");
			$("#sidebarnav").toggleClass("tab-hide mob-hide lap-hide");
            $(".footer").toggleClass("tab-hide mob-hide lap-hide");
			//$("#main-header").toggleClass("tab-hide mob-hide lap-hide");
            //$(".global-nav").toggleClass("pull-up");
    		//$(".subnav").toggleClass("pull-up");
    		//$("#page-content").toggleClass("pull-up");
            $(".global-nav").css('top', '');
			$("#page-content").css('height', '');
			$(".breadcrumb.breadCrumbNav").css('display', '');
			

		}
		
	}

	/*
	 * function toggleBrandnavMenu() { var overlayElement =
	 * this.$element.find(".mobile-menu-container"); if
	 * (overlayElement.hasClass("hide")) {
	 * overlayElement.removeClass("hide").addClass("show");
	 * overlayElement.outerWidth(); overlayElement.addClass("in");
	 * this.$element.find(".ic-menu").addClass("ic-menu-green");
	 * $(document.body).addClass("noscroll"); } else {
	 * hideBrandnavMenu(overlayElement); } }
	 */

	 function hideBrandnavMenu(overlayElement) {

	 	overlayElement.removeClass("in");
	 	overlayElement.removeClass("show")/*.addClass("hide");*/
	 	$(".ic-menu").removeClass("ic-menu-green").removeClass('open');
	 	$('.mobile-menu-container').removeClass('active');
	 	$('.mobile-menu-container').css({
	 		'overflow' : 'hidden',
	 		'height' : '0px',
	 		'transition' : 'all 0.5s'
	 	});
	 	setTimeout(function() {
	 		$('.mobile-menu-container').css({
	 			'display' : 'none'
	 		});
	 	}, 500);
	 	menuToggle.reverse();

	 	$(document.body).removeClass("noscroll");
	 }

	 function toggleSolutionsMenu() {
	 	var overlayElement = this.$element.find(".global-menu-overlay");
	 	if (overlayElement.hasClass("hide")) {
	 		if ($("#page-content").hasClass("pull-up")) {
	 			overlayElement.css({
	 				transition : "none",
	 				top : "66px",
	 				left : "0"
	 			});
	 		} else {
	 			overlayElement.css({
	 				transition : "none",
	 				top : "100px",
	 				left : "0"
	 			});
	 		}
	 		overlayElement.removeClass("hide").addClass("show");
	 		overlayElement.outerWidth();
	 		overlayElement.addClass("in");
	 	} else {
	 		overlayElement.removeClass("in");
	 		overlayElement.removeClass("show").addClass("hide");
	 		overlayElement.removeAttr("style");
	 	}
	 }

	 function openModal(e) {
	 	e.preventDefault();
	 	var screenSize = $(window).width();
	 	var imageURL = $(this).attr("href");
	 	var isInline = false;
	 	var isIframe = false;
	 	var isYoutube = false;
	 	$('body').addClass('noscroll');
	 	if (imageURL.indexOf("youtube") != -1) {
	 		isYoutube = true;
			// console.log("Its youtube ...");
			var videoId = getUrlParam("v", imageURL);
			var listId = getUrlParam("list", imageURL);
			if (videoId != null) {
				imageURL = "https://www.youtube.com/embed/" + videoId;
				if (listId != null)
					imageURL = imageURL + "?list=" + listId;
			}
		}
		if (imageURL.indexOf("#") != -1) {
			isInline = true;
		} else {
			isIframe = true;
		}
		defaultOptions = {
			inline : isInline,
			iframe : isIframe,
			width : "80%",
            height: "auto",
			maxHeight : "80%",
			href : imageURL,
			onComplete : function() {
            	if($('.aemformcontainer').parents('.modal-content').is(":visible")) {
            		if($('.ui-front')) {
            			$('.ui-front').css('z-index','10000');
            		}
            		/*if(NVIDIAGDC.Browser.getViewport() === "mobile"){
            			$(this).colorbox.resize({width: screenWidth, height: screenHeight});
            		}*/
            	}  
            }
		};
        // console.log("imageURL : "+imageURL);
         var screenWidth = $(window).width() - 30;
         var screenHeight = $(window).height() - 30;
		if (screenSize < tabletBreakpoint) {
			if (isYoutube) {
				defaultOptions.height = screenSize * 9 / 16;
			} else {
				defaultOptions.height = "auto";
			}
			defaultOptions.width = screenWidth;
			defaultOptions.maxHeight = screenHeight;
		} else if(screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint) {
			if (isYoutube) {
				defaultOptions.height = screenSize * 9 / 16;
			} else {
				defaultOptions.height = "auto";
				if(isIframe) {
					defaultOptions.height = screenHeight;
				}
			}
			defaultOptions.width = screenWidth;
            defaultOptions.maxHeight = screenHeight;
        } else {
			if (isYoutube) {
				defaultOptions.height = "480px";
                defaultOptions.width = "854px";
			} else if(isInline) {
				defaultOptions.height = $(imageURL).data("height") ? $( imageURL).data("height") + "px" : defaultOptions.maxHeight;
                defaultOptions.width = $(imageURL).data("width") ? $( imageURL).data("width") + "px" : defaultOptions.width;
            } else {
                defaultOptions.height = defaultOptions.maxHeight;				
            }
		}
		$.colorbox(defaultOptions);
		$("#cboxClose").off().on("click", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            $.colorbox.close();
            if($('body').hasClass('noscroll')) {
                $('body').removeClass('noscroll');
            }
        });
	}

	function getUrlParam(name, url) {
		var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(url);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}
	

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this
		.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this,
					options));
			}
		});
	};
		//// Brand Nav 2.0 ////
	
var menuContainerId = ["#bn-lvl1-menu-01", "#bn-lvl1-menu-02", "#bn-lvl1-menu-03", "#bn-lvl1-menu-04",
						"#bn-lvl1-menu-05", "#bn-lvl1-menu-06", "#bn-lvl1-menu-07", "#bn-lvl1-menu-08"];
var tabContainer = ["#bn-l2-container01", "#bn-l2-container02", "#bn-l2-container03", "#bn-l2-container04",
					"#bn-l2-container05", "#bn-l2-container06", "#bn-l2-container07", "#bn-l2-container08"];

function hideOther(currentId){
    for (const contId of tabContainer) {
        if(contId!==currentId && $(contId).length>0 && $(contId).attr('class').indexOf("bn-hide")<0){
            $(contId).addClass("bn-hide");
        }
    }
}

function openBrandSubMenu(mainMenuId){
    if($(mainMenuId).children()[1] && $(mainMenuId).children()[1].id && $(mainMenuId).children()[1].id.length>0){
        var submenudiv = $(mainMenuId).children()[1].id;
        submenudiv = "#"+submenudiv;
        if($(submenudiv).attr('class').indexOf("bn-hide") >= 0){
            $(submenudiv).removeClass("bn-hide");
            $(mainMenuId).addClass("bn-active").siblings().removeClass("bn-active");
    
            hideOther(submenudiv);
        } else {
            $(submenudiv).addClass("bn-hide");
            $(mainMenuId).removeClass("bn-active");
        }
    }
    
}

// $("#bn-lvl1-menu-02").click(function() { openBrandSubMenu(this); });
// $("#bn-lvl1-menu-04").click(function() { openBrandSubMenu(this); });

function addBrandNavEvents(){
	for (const tabContId of tabContainer) {
        $(tabContId).click(function(e) { e.stopPropagation(); });
    }
    for (const menuContId of menuContainerId) {
        $(menuContId).click(function() { 
			if($("#bn-overlay").attr('class').indexOf("bn-hide") >= 0){
				$("#bn-overlay").removeClass("bn-hide");
			} else {
				$("#bn-overlay").addClass("bn-hide");
			}
			openBrandSubMenu(this);
		});
    }
}

function closeAllSubMenu(){
	if($("#bn-overlay").attr('class').indexOf("bn-hide") < 0){
		$("#bn-overlay").addClass("bn-hide");
	}
    for (const mainTabId of menuContainerId) {
        document.testVal = mainTabId
        if($(mainTabId).length>0 && $(mainTabId).attr('class') && $(mainTabId).attr('class').indexOf("bn-active")>=0){
            $(mainTabId).removeClass("bn-active");
        }
    }
    for (const tabMenuId of tabContainer) {
        if($(tabMenuId).length>0 && $(tabMenuId).attr('class').indexOf("bn-hide")<0){
            $(tabMenuId).addClass("bn-hide");
        }
    }
}

 $( "#bn-ic-menu" ).click(function() {
 /*   if($(window).width() > 1023) {*/
        if($("#bn-nav20").attr('class').indexOf("bn-hide") >= 0){
            // $("#bn-ic-menu").addClass("open ic-menu-green");
            $("#bn-ic-menu").addClass("bn-hide-none");
            $("#bn-ic-menu-close").removeClass("bn-hide-none");
            $("#bn-nav20").removeClass("bn-hide");
            $("#bn-overlay").removeClass("bn-hide");
        }
		if($("#bn-overlay").attr('class').indexOf("bn-hide") >= 0){
			$("#bn-overlay").removeClass("bn-hide");
		}
/*    }*/
/*    if($(window).width() < 1023) {*/
        if($("#bn-mob-container").attr('class').indexOf("bn-hide") >= 0){
            $("#bn-ic-menu").addClass("bn-hide-none");
            $("#bn-ic-menu-close").removeClass("bn-hide-none");
            $("#bn-mob-container").removeClass("bn-hide");
            $("#bn-overlay").removeClass("bn-hide");
			if($(window).width() < 1025) {
				if($(".body-page").attr('class').indexOf("noscroll")<0){
	                $(".body-page").addClass("noscroll");
	            }
				if($(".global-nav").attr('class').indexOf("pull-up")<0){
	                $(".global-nav").addClass("pull-up");	                
	                if ($(".phonetabletshow").length){
	                	$(".phonetabletshow").removeClass("phonetabletshow");
	                }	                
	            }
				if($(".subnav").length>0 && $(".subnav").attr('class').indexOf("pull-up")<0){
	                $(".subnav").addClass("pull-up");
	            }
				if($("#bn-mob-container").attr('class').indexOf("bm-m-relative")<0){
					$("#bn-mob-container").addClass("bm-m-relative");
				}
			}
/*        }*/
    }
 });

 function closeBrandNav(){
 /*   if($(window).width() > 1023) {*/
        if($("#bn-nav20").attr('class').indexOf("bn-hide") < 0){
            closeAllSubMenu();
            $("#bn-ic-menu").removeClass("bn-hide-none");
            $("#bn-ic-menu-close").addClass("bn-hide-none");
            $("#bn-nav20").addClass("bn-hide");
            $("#bn-overlay").addClass("bn-hide");
        }
		if($("#bn-overlay").attr('class').indexOf("bn-hide") < 0){
			$("#bn-overlay").addClass("bn-hide");
		}
/*    }*/
/*    if($(window).width() < 1023) {*/
        if($("#bn-mob-container").attr('class').indexOf("bn-hide") < 0){
            // closeAllSubMenu();
            $("#bn-ic-menu").removeClass("bn-hide-none");
            $("#bn-ic-menu-close").addClass("bn-hide-none");
            $("#bn-mob-container").addClass("bn-hide");
            $("#bn-overlay").addClass("bn-hide");
            closeOtherMobMenu();
			if($(window).width() < 1025) {
				if($(".body-page").attr('class').indexOf("noscroll")>=0){
	                $(".body-page").removeClass("noscroll");
	            }
				if($(".global-nav").attr('class').indexOf("pull-up")>=0){
	                $(".global-nav").removeClass("pull-up");
	            }
				if($(".subnav").length>0 && $(".subnav").attr('class').indexOf("pull-up")>=0){
	                $(".subnav").removeClass("pull-up");
	            }
				if($("#bn-mob-container").attr('class').indexOf("bm-m-relative")>=0){
					$("#bn-mob-container").removeClass("bm-m-relative");
				}
			}
/*        }*/
    }
 }

 $( "#bn-ic-menu-close" ).click(function() {
	// closeAllSubMenu();
	if($(window).width() < 1025) {
		closeBrandNav();
	}
 });

 $(window).scroll(function() {
     if($( "#bn-nav20" ).length>0 && $(window).width() > 1024) {
		closeAllSubMenu();
     	// closeBrandNav();
     }
 });

 $( "#bn-overlay" ).click(function() {
	if($(window).width() < 1025) {
		closeBrandNav();
	} else {
		closeAllSubMenu();
	}
 });

var mMainMenu=["#bn-m-cont-lvl1-l1", "#bn-m-cont-lvl1-l2", "#bn-m-cont-lvl1-l3", "#bn-m-cont-lvl1-l4", "#bn-m-cont-lvl1-l5", "#bn-m-cont-lvl1-l6", "#bn-m-cont-lvl1-l7", "#bn-m-cont-lvl1-l8"];
var mSubMenu = ["#bn-m-cont-lvl2-l1-1", "#bn-m-cont-lvl2-l1-2", "#bn-m-cont-lvl2-l1-3", "#bn-m-cont-lvl2-l1-4", "#bn-m-cont-lvl2-l1-5", "#bn-m-cont-lvl2-l1-6", "#bn-m-cont-lvl2-l1-7", "#bn-m-cont-lvl2-l1-8",
				"#bn-m-cont-lvl2-l2-1", "#bn-m-cont-lvl2-l2-2", "#bn-m-cont-lvl2-l2-3", "#bn-m-cont-lvl2-l2-4", "#bn-m-cont-lvl2-l2-5", "#bn-m-cont-lvl2-l2-6", "#bn-m-cont-lvl2-l2-7", "#bn-m-cont-lvl2-l2-8",
				"#bn-m-cont-lvl2-l3-1", "#bn-m-cont-lvl2-l3-2", "#bn-m-cont-lvl2-l3-3", "#bn-m-cont-lvl2-l3-4", "#bn-m-cont-lvl2-l3-5", "#bn-m-cont-lvl2-l3-6", "#bn-m-cont-lvl2-l3-7", "#bn-m-cont-lvl2-l3-8",
				"#bn-m-cont-lvl2-l4-1", "#bn-m-cont-lvl2-l4-2", "#bn-m-cont-lvl2-l4-3", "#bn-m-cont-lvl2-l4-4", "#bn-m-cont-lvl2-l4-5", "#bn-m-cont-lvl2-l4-6", "#bn-m-cont-lvl2-l4-7", "#bn-m-cont-lvl2-l4-8",
				"#bn-m-cont-lvl2-l5-1", "#bn-m-cont-lvl2-l5-2", "#bn-m-cont-lvl2-l5-3", "#bn-m-cont-lvl2-l5-4", "#bn-m-cont-lvl2-l5-5", "#bn-m-cont-lvl2-l5-6", "#bn-m-cont-lvl2-l5-7", "#bn-m-cont-lvl2-l5-8",
				"#bn-m-cont-lvl2-l6-1", "#bn-m-cont-lvl2-l6-2", "#bn-m-cont-lvl2-l6-3", "#bn-m-cont-lvl2-l6-4", "#bn-m-cont-lvl2-l6-5", "#bn-m-cont-lvl2-l6-6", "#bn-m-cont-lvl2-l6-7", "#bn-m-cont-lvl2-l6-8"];


function closeOtherMobSubMenu(){
    var allActiveMenu=$("#bn-mob-container .bn-m-sb-active");
    var allBorderClass=$("#bn-mob-container .bn-m-border");
	var allArrowUp=$("#bn-mob-container .bn-m-up");
    for(var i=0;i<allBorderClass.length;i++){
        allBorderClass[i].classList.remove("bn-m-border");
    }
    for(var i=0;i<allActiveMenu.length;i++){
        allActiveMenu[i].classList.remove("bn-m-sb-active");
        allActiveMenu[i].classList.add("bn-m-hide");
    }
	for(var i=0;i<allArrowUp.length;i++){
		allArrowUp[i].classList.add("bn-m-down");
        allArrowUp[i].classList.remove("bn-m-up");
    }
}

function closeOtherMobMenu(){
    var allActiveMenu=$("#bn-mob-container .bn-m-active");;
    var allActiveSubMenu = $("#bn-mob-container .bn-m-sb-active");
    var allBorderClass=$("#bn-mob-container .bn-m-border");
	var allArrowUp=$("#bn-mob-container .bn-m-up");
    for(var i=0;i<allBorderClass.length;i++){
        allBorderClass[i].classList.remove("bn-m-border");
    }
    for(var i=0;i<allActiveSubMenu.length;i++){
        allActiveSubMenu[i].classList.remove("bn-m-sb-active");
        allActiveSubMenu[i].classList.add("bn-m-hide");
    }
    for(var i=0;i<allActiveMenu.length;i++){
        allActiveMenu[i].classList.remove("bn-m-active");
        allActiveMenu[i].classList.add("bn-m-hide");
    }
	for(var i=0;i<allArrowUp.length;i++){
		allArrowUp[i].classList.add("bn-m-down");
        allArrowUp[i].classList.remove("bn-m-up");
    }
}

function openMobSubMenu(mId, isSubMenu){
    if($(mId).length>0 && $(mId).siblings()[0]){
        var subMenuL2 = $(mId).siblings()[0];
        if(subMenuL2.getAttribute("class").indexOf("bn-m-hide")>=0){
            if(isSubMenu){
                closeOtherMobSubMenu();
                subMenuL2.classList.add("bn-m-sb-active");
                $(mId + " label").addClass("bn-m-border");
                subMenuL2.classList.remove("bn-m-hide");
            } else {
                subMenuL2.classList.remove("bn-m-hide");
                closeOtherMobMenu();
                subMenuL2.classList.add("bn-m-active");
            }
			if($(mId + " .bn-m-down").length>0){
				$(mId + " .bn-m-down").addClass("bn-m-up");
				$(mId + " .bn-m-down").removeClass("bn-m-down");
			}
        } else {
            if(isSubMenu){
                $(mId + " label").removeClass("bn-m-border");
            }
            subMenuL2.classList.remove("bn-m-active");
            subMenuL2.classList.add("bn-m-hide");
			if($(mId + " .bn-m-up").length>0){
				$(mId + " .bn-m-up").addClass("bn-m-down");
				$(mId + " .bn-m-up").removeClass("bn-m-up");
			}
        }
    }
}

function addMobMMEvent(){
    for (const mmId of mMainMenu) {
        $(mmId).click(function() {
            openMobSubMenu(mmId, false);
        });
    }

    for (const smId of mSubMenu) {
        $(smId).click(function() {
            openMobSubMenu(smId, true);
        });
    }

}

$(document).ready(function() {
	$("#bn-ic-menu a").click(function(e){e.preventDefault();});
	$("#bn-ic-menu-close a").click(function(e){e.preventDefault();});
    addBrandNavEvents();
    addMobMMEvent();
});

	//// Brand Nav 2.0 ////
})(jQuery, window, document);

//if (NVIDIAGDC.Browser.getViewport() == "desktop" || NVIDIAGDC.Browser.getViewport() == "laptop") {
	if (typeof gsap !== 'undefined') {
		var radioState;
		var subradioState;
	
		gsap.defaults({
			overwrite: "auto"
		});
	
		// Register GSAP Plugins...
		gsap.registerPlugin(Draggable, InertiaPlugin, ScrollToPlugin, ScrollTrigger);
	
		if (typeof NV === 'undefined') {
			var NV = {};
		}
	

		NV.isHomePage = undefined;
		NV.interiorPageNavCollapseTimer = undefined;
		NV.megaNavCollapsed = false;
		NV.megaNavCollapsingOrExpanding = undefined;
	
	
		NV.megaNavOpen = false; NV.istouchDevice = false;
		NV.megaNavAccordionOpen = false;
		NV.autoOpenFirstChildAccordion = false;
	
		NV.forYouOpened = false;
		NV.forYouPreferenceId = undefined;
		NV.mainMenuButtonsDesktopReady = false;
		NV.secondMenuSaved, NV.parentforSecondMenu;
		NV.responsiveIndex = 3; // 0 = WATCH, 1 = MOBILE PHONE, 2 = TABLET, 3 = LAPTOP, 4 = DESKTOP, 5 = 4K ULTRA-WIDE DESKTOP...
	
	
		function closeMenu() {
			
			if (!NV.mainMenuButtonsDesktopReady) {
				gsap.delayedCall(4, initMainMenuButtonsDesktop);
			}
	
			$('.navoverlay').removeClass('navoverlay-display');
			$('body').removeClass('noscroll');
			$('.main-menu').attr('checked', false);
			$('.sub-menu').prop('checked', false);
			$('.nv-menu').removeClass('menuopen');
			$('.main-menu').removeClass('nvactive');
			$('input.main-menu').attr('checked',false)
	
			radioState = null;
			
			if (NVIDIAGDC.isBrandPage && !(NV.megaNavCollapsed)) {
	
				NV.megaNavCollapsed = true;
				collapseAndCloseMegaNavOnBrandPage();
	
			}
			$('.nav-header-container').find('label').parent('.nv-menu-item').attr('aria-expanded', 'false')
			NV.megaNavOpen = false;
	
		}
	
	
		function isMenuopen() {
			return (($('.navoverlay').hasClass('navoverlay-display') && $('.nv-menu').hasClass('menuopen')) ? true : false);
		}
	
	
		function openMenu(target) {
	
			//Close other flyouts if open when menu is operated.
	
			
			if ($(".searchoverlay").hasClass('searchoverlaydisplay') && $(".search_white").hasClass("search-shown")) {
	
				$(".desktop-nav .searchoverlay").click();
			}
	
			if ($('.cart').hasClass('cart--shown')) {
				$('.cart__close').click();
			}
	
			NV.secondMenuSaved = getCookie('secondMenu');
			NV.parentforSecondMenu = getCookie('parentforSecondMenu');
	
	
	
			if (isTopLevel(target)) {
	
				
				$('.navoverlay').addClass('navoverlay-display');
				$('body').addClass('noscroll');
				$('.nv-menu').addClass('menuopen');
				$('.main-menu').removeClass('nvactive');
				NV.megaNavOpen = true;
	
				var $this = $(target)[0];
				$(target).prop('checked', true);
				var id = $(target).prop('id');
				$('.nav-header-container').find('label[for="' + id + '"]').parent('.nv-menu-item').attr('aria-expanded', 'true');
				$($this).addClass('nvactive');
				if (radioState === $this) {
					$this.checked = false;
					radioState = null;
					if (NVIDIAGDC.isBrandPage && !NV.megaNavCollapsingOrExpanding) {
						collapseMegaNavOnBrandPage(0.2); //
					} else $('.navoverlay').removeClass('navoverlay-display');
					if (NV.megaNavCollapsed && NVIDIAGDC.isBrandPage) {
						$('body').removeClass('noscroll');
					} else if (!NVIDIAGDC.isBrandPage) {
						$('body').removeClass('noscroll');
					}
					$('.nav-header-container').find('label[for="' + id + '"]').parent('.nv-menu-item').attr('aria-expanded', 'false')
					$($this).removeClass('nvactive');
					NV.megaNavOpen = false;
				} else {
					radioState = $this;
	
				}
	
	
	
	
				/*Auto Open hardware on Products click */
				
				if ($(target).prop('id') == 'nv-level1-tab1' && NV.parentforSecondMenu != 'nv-level1-tab1') {
					$("#tab1-nv-level2-tab1").prop('checked', true);
					$('.nav-header-container').find('label[for="tab1-nv-level2-tab1"]').parent('.nv-menu-item').attr('aria-expanded', 'true');
					$("#tab1-nv-level2-tab1").addClass('nvactive');
					subradioState = $("#tab1-nv-level2-tab1")[0];
					
					animateSecondlevelTabs($('.nav-header-container').find('label[for="tab1-nv-level2-tab1"]').parent('.nv-menu-item'))
					setSessionCookie('secondMenu', 'tab1-nv-level2-tab1');
					setSessionCookie('parentforSecondMenu', 'nv-level1-tab1');
	
				} else { /* Else open */
					$("#tab1-nv-level2-tab1").prop('checked', false);
					$('.nav-header-container').find('label[for="tab1-nv-level2-tab1"]').parent('.nv-menu-item').attr('aria-expanded', 'false');
					subradioState = null
				}
	
	
	
				if (!$('#nv-level1-tab1').is(':checked')) {
					$('.sub-menu').prop('checked', false)
	
				}
	
				if (NV.secondMenuSaved != null && NV.parentforSecondMenu != null && $(target).prop('id') == NV.parentforSecondMenu) {
					
					$('#' + NV.secondMenuSaved).prop('checked', true);
					$('.nav-header-container').find('label[for="' + NV.secondMenuSaved + '"]').parent('.nv-menu-item').attr('aria-expanded', 'true');
					$('#' + NV.secondMenuSaved).addClass('nvactive');
					subradioState = $('#' + NV.secondMenuSaved)[0];
					$('.nav-header-container').find('label[for="' + NV.secondMenuSaved + '"]').parent('.nv-menu-item').click();
					
					//Calculation();
					//animateSecondlevelTabs($('.nav-header-container').find('label[for="' + NV.secondMenuSaved + '"]').parent('.nv-menu-item'));
	
				}
	
				animatefirstlevelTabs($('.nav-header-container').find('label[for="' + id + '"]').parent('.nv-menu-item'));
	
	
			} else if (isSecondLevel(target)) {
				//("---------Second Level MENU-----------");
	
				/*Set session cookie for last browsed second level menu and its parent*/
				setSessionCookie('secondMenu', $(target).prop('id'));
				setSessionCookie('parentforSecondMenu', $(target).parent().siblings('label.menu-level-1').attr('for'));
	
	
				$('input.sub-menu').removeClass('nvactive');
				$('.sub-menu').prop('checked', false)
				$('.nv-menu-level2-list').find('label').parent('.nv-menu-item').attr('aria-expanded', 'false');
				var $this = $(target)[0];
				$(target).prop('checked', true);
				$($this).addClass('nvactive');
				var id = $(target).prop('id');
	
				$('.nav-header-container').find('label[for="' + id + '"]').parent('.nv-menu-item').attr('aria-expanded', 'true')
	
				if (subradioState === $this) {
					$this.checked = false;
	
					subradioState = null;
				} else {
					subradioState = $this;
	
				}
				
				animateSecondlevelTabs($('.nav-header-container').find('label[for="' + id + '"]').parent('.nv-menu-item'));
	
			}
			//$(target).addClass('nvactive');
	
	
		}
	
		
	
	
		$('.global-nav').keydown(function (e) {
	
	
			var target = e.target;
			var keyCode = e.keyCode;
			var which = e.which
			
			if (keyCode == '13') { // Enter key
				
				var id = $(target).attr('for');
				openMenu($('#' + id))


	


				if ($(target).parent().hasClass('search-item')) {
					e.preventDefault();
					(NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') ? $('.desktop-nav .nav-search-icon').trigger('click') : $('.mobile-nav .nav-search-icon').trigger('click');
				}

                if($(target).parent().hasClass('search-icon-container') || $(target).hasClass('search-box-input')){e.preventDefault(); $('.nav-search-form-icon').trigger('click');}


				if((NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') && ($(target).hasClass('search-abort')))
                {

                    e.preventDefault();
                    $('.desktop-nav.search-abort').trigger('click')
					//(NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') ? $('.desktop-nav.search-abort').trigger('click') : $('.mobile-nav .search-abort').trigger('click');
				}

                else if((NVIDIAGDC.Browser.getViewport() == 'mobile' || 'tablet') && ($(target).hasClass('search-abort'))) {
                     e.preventDefault();
                    $('.mobile-nav.search-abort').trigger('click')

                }

	
			}

			if(keyCode == '32'){ //Space Bar keycode
				var id = $(target).attr('for');
				if(!$(target).hasClass('search-box-input') && !$(target).hasClass('search-box-input-mob')) openMenu($('#' + id))
				

                if ($(target).parent().hasClass('search-item')) {

					e.preventDefault();
					(NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') ? $('.desktop-nav .nav-search-icon').trigger('click') : $('.mobile-nav .nav-search-icon').trigger('click');
				}

                if($(target).parent().hasClass('search-icon-container')) $('.nav-search-form-icon').trigger('click');
                if((NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') && ($(target).hasClass('search-abort')))
                {

                    e.preventDefault();
                    $('.desktop-nav.search-abort').trigger('click')
					//(NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') ? $('.desktop-nav.search-abort').trigger('click') : $('.mobile-nav .search-abort').trigger('click');
				}

                else if((NVIDIAGDC.Browser.getViewport() == 'mobile' || 'tablet') && ($(target).hasClass('search-abort'))) {
                     e.preventDefault();
                    $('.mobile-nav.search-abort').trigger('click')

                }


			}


			else if (which == 9) {
				
				if ($('.global-nav').hasClass('pull-up')) {
					e.preventDefault();

					$('.global-nav').removeClass('pull-up');
					$('.brand-link.nvidia-logo').focus().addClass('focusOutline');


				}

                if($(target).hasClass('skip-main') && !($(target).hasClass('focus')))
                {
                    e.preventDefault();
					$(target).focus();
                    $(target).addClass('focus');
                }


				if((NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop')){
					if($(target).parent().hasClass('search-icon-container') && $('.search_white').hasClass('search-shown')){
					e.preventDefault();

					$('.search-abort').focus();
				}

				if($(target).hasClass('search-abort')&& $('.search_white').hasClass('search-shown')){
					e.preventDefault();
					$('.search-form input').focus().addClass('focusOutline');
	
				}
	
				if($(target).hasClass('search-box-input')&& $(target).hasClass('focusOutline')){
					e.preventDefault();
					$('.search-form input').removeClass('focusOutline');
					$('.nav-search-form-icon').focus()
	
	
				}
			}
	
	
			
	
			}
			else if (keyCode == 27) { // Escape key 

				/*Close navigation when esc key is pressed. */
				var ele = $(target).parent();
	
	
				if (($(target).parents('.nv-menu2-container').length) && $(target).hasClass('menu-level-2')) {
					$('#' + $(target).attr('for')).removeClass('nvactive');
					$('#' + $(target).attr('for')).attr('checked', false);
					target = $(target).parents().eq(5)[0];
					var id = '#' + $(target).children('label').attr('for');
					//openMenu($(id)[0]);

					$(id).attr("checked", false);
					$(id).removeClass('nvactive');
					$(target).children('label').focus();
					if (!NVIDIAGDC.isBrandPage) {
	
						closeMenu();
	
						setTimeout(function () {
							$(target).find('label.menu-level-1').focus();
							$(target).find('label.menu-level-1').addClass('focusOutline');
						}, 0);
	
					}
	
				} else if ($(ele).parents('.nv-menu2-container').length && $(target).hasClass('menu-item-link')) {
	
					//There is second level menu
					var id = $(ele).parents('.nv-menu2-container').find('input.nvactive').attr('id');
	
					parent = $(ele).parents('.nv-menu2-container').find('label[for=' + id + ']');
					$(ele).parents('.nv-menu2-container').find('input.nvactive').attr('checked', false);
					$(ele).parents('.nv-menu2-container').find('input.nvactive').removeClass('nvactive')
					//openMenu($(ele).parents('.nv-menu2-container').find('input.nvactive'));
					$(ele).parents('.nv-menu2-container').find('label[for=' + id + ']').focus().addClass('focusOutline');
	
	
				} else if (!$(ele).parents('.nv-menu2-container').length && $(target).hasClass('menu-item-link')) {
					var id = $('#' + $(ele).parents('.nv-menu3-container').siblings('label').attr('for'));
					//openMenu($(id));
					$(id).attr("checked", false);
					$(id).removeClass('nvactive');
					$(ele).parents('.nv-menu3-container').siblings('label').focus();
					if (!NVIDIAGDC.isBrandPage) {
	
						closeMenu();
	
						setTimeout(function () {
							$(target).find('label.menu-level-1').focus();

						}, 0);
	
					}
	
				} else if ($(target).hasClass('menu-level-1') && NVIDIAGDC.isBrandPage) {
					closeMenu();

	
				}

               //Close the Search box if it is open
                if($(target).hasClass('search-box-input') || $(target).parent().hasClass('search-icon-container') && $('.search_white').hasClass('search-shown'))

                {
					if((NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop'))
                {

                    e.preventDefault();
                    $('.desktop-nav .search-abort').trigger('click')
                    $('.desktop-nav .nav-search-icon').parent('.menu-level-1').focus();

				}

                else if((NVIDIAGDC.Browser.getViewport() == 'mobile' || 'tablet') ) {
                     e.preventDefault();
                    $('.mobile-nav .search-abort').trigger('click');
                    $('.mobile-nav .nav-search-icon').parent('.menu-level-1').focus();

                }


                }
	
				radioState = null;
	
			}
	
	
			//RIGHT arrow key
			else if (which === 39) {
				if (isTopLevel(target)) {
	
					var nextTopMenu = adjacentTopLevelItem(target, 'next');
					if (nextTopMenu) {
						e.preventDefault();
						nextTopMenu.focus();
					}
	
	
				} else if (isSecondLevel(target)) {
					var nextmenu = adjacentSecLevelItem(target, 'next');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					}
				} else {
					//dropdown item
					var nextmenu = adjacentDropdownItem(target, 'next');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					}
				}
	
	
			} else if (which === 37) { // LEFT ARROW
	
				if (isTopLevel(target)) {
	
					var nextTopMenu = adjacentTopLevelItem(target, 'prev');
					if (nextTopMenu) {
						e.preventDefault();
	
						nextTopMenu.focus();
					}
	
	
				} else if (isSecondLevel(target)) {
					var nextmenu = adjacentSecLevelItem(target, 'prev');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					}
				} else {
					//dropdown item
					var nextmenu = adjacentDropdownItem(target, 'prev');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					}
				}
	
			} else if (which === 38) { // UP
				
	
				if (isSecondLevel(target)) {
					
					$('#' + $(target).attr('for')).removeClass('nvactive');
					target = $(target).parents().eq(5)[0];
					
					var id = '#' + $(target).children('label').attr('for');
					openMenu($(id)[0]);
					e.preventDefault();
					$(target).children('label').focus();
	
				} else {
					//dropdown item
					var nextmenu = adjacentDropdownItem(target, 'prev');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					} else {
						e.preventDefault();
	
						id = $(target).parents('.nv-menu2-container').find('.sub-menu.nvactive').attr('id')
						//openMenu($(target).parents('.nv-menu2-container').find('.sub-menu.nvactive'));
						
						$(target).parents('.nv-menu2-container').next('label').attr("for", id).focus();
	
	
					}
				}
	
			} else if (which === 40) { //DOWN
	
	
				if (isTopLevel(e.target) || isSecondLevel(e.target)) {
	
					target = $(target).attr('for');
					target = $('#' + target);
	
	
					
	
	
					if ($('.nav-header-container').find(target).hasClass('nvactive') && !$(e.target).hasClass('menu-level-2')) {
						//Coming down from Top level
						
						e.preventDefault();
						if ($(e.target).siblings().hasClass('nv-menu2-container')) {
							
							$(e.target).siblings('.nv-menu2-container').find('label.menu-level-2:first').focus();
	
						}
						else {
	
							$(e.target).siblings('.nv-menu3-container').children('.nav-row-container').find('li.menu-level-4:first').find('a.menu-item-link').focus();
						}
	
					} else if ($('.nav-header-container').find(target).hasClass('nvactive') && $(e.target).hasClass('menu-level-2')) {
						e.preventDefault();
						
						var s = $(e.target).attr('for');
						s = s.substr(s.length - 4);
						
	
						$(e.target).parents('.nv-level2-list-container').siblings('.menu3-container').children('.nv-level3-' + s).find('li.menu-level-4:first').find('a.menu-item-link').focus();
						
					} else {
						
	
						e.preventDefault();
						openMenu(target);
						
	
	
					}
				} else {
	
					//Menu List item
					var nextmenu = adjacentDropdownItem(target, 'next');
					if (nextmenu) {
						e.preventDefault();
						nextmenu.focus();
					}
				}
			}
	
	
		});
	
		function isTopLevel(t) {
	
			return ($(t).is('.menu-level-1') || $(t).is('.nvidia-logo') || $(t).is('.main-menu')) || $(t).is('.menu-button');
		}
	
		function isSecondLevel(t) {
	
			return ($(t).is('.menu-level-2') || $(t).is('.sub-menu'));
		}
	
		function adjacentTopLevelItem(t, dir) {
	
			var li = t.parentNode;
			var adjlabel;
	
			if ($(t).hasClass('nav-cart-link')) {
				li = t.parentNode.parentNode.parentNode
			}
	
	
	
			if (NVIDIAGDC.isBrandPage) {
	
	
				if (dir === 'next') {
					if ($(t).hasClass('nvidia-logo') && NV.megaNavCollapsed) {
						adjlabel = $(t).parent().siblings('.nv-menu').children('.menu-buttons-container').find('.menu-button.caret-right');
						$('#mega-menu-expand-label').removeClass('hide');
					}
	
					if ($(t).hasClass('nvidia-logo') && !NV.megaNavCollapsed) {
						adjlabel = $(t).parent().siblings('.nv-menu').children('.nv-menu-list.left').find('.menu-level-1:first');
						$('#mega-menu-expand-label').addClass('hide');
					} else if ($(t).hasClass('caret-right') && NV.megaNavCollapsed) {
						expandMegaNavOnBrandPage(0.5);
						adjlabel = $(t).parents('.menu-buttons-container').siblings('.nv-menu-list.left').find('.menu-level-1:first');
	
					} else if (($(li).parent().hasClass('left') && /*$(li).next()[0] !== undefined*/ !$(li).next().hasClass('menu-slider')) || ($(li).parent().hasClass('right') && $(li).next()[0] !== undefined)) {
						//This is left mega menu item
						adjlabel = $(li).next('.nv-menu-item').children('.menu-level-1');
	
	
					} else if ($(li).next().hasClass('menu-slider') && $(li).parent().hasClass('left')) {
						//last element of the left navigation
						li = $(li).parent().siblings('.right')[0].children[0];
						adjlabel = li.children[0];
					} else if ($(li).next()[0] == undefined && $(li).parent().hasClass('right')) {
						//last element of the right navigation 
	
						li = $(li).parent().parent().siblings('.nav-tools-container').find('a.menu-level-1:first');
	
						adjlabel = li
	
					} else if ($(li).parent().parent().hasClass('nav-tools-container') && $(li).next()[0] !== undefined) {
                        
						if ($(li).next('.nav-header-item').hasClass('cart-item')) 
                        {
                            adjlabel = $(li).next('.nav-header-item').children('.nav-header-list').find('a.menu-level-1');
                        }

						else adjlabel = $(li).next('.nav-header-item').children('a.menu-level-1');
	
	
					}
	
	
				}
	
			} else {
	
				if (dir === 'next') {
	
					if ($(t).hasClass('nvidia-logo')) {
	
						adjlabel = $(t).parent().siblings('.nv-menu').children('.nv-menu-list.left').find('.menu-level-1:first');
					}
					if (($(li).parent().hasClass('left') && !$(li).next().hasClass('menu-slider')) || ($(li).parent().hasClass('right') && $(li).next()[0] !== undefined)) {
						//This is left mega menu item
	
						//adjlabel = $(li).next()[0].children[0];
						adjlabel = $(li).next('.nv-menu-item').children('.menu-level-1');
	
	
					} else if (/*$(li).next()[0] == undefined*/$(li).next().hasClass('menu-slider') && $(li).parent().hasClass('left')) {
						//last element of the left navigation 
	
						li = $(li).parent().siblings('.right')[0].children[0];
						adjlabel = li.children[0];
					} else if ($(li).next()[0] == undefined && $(li).parent().hasClass('right')) {
						//last element of the left navigation 
	
						li = $(li).parent().parent().siblings('.nav-tools-container').find('a.menu-level-1:first');
	
						adjlabel = li
	
					} else if ($(li).parent().parent().hasClass('nav-tools-container') && $(li).next()[0] !== undefined) {
	
						adjlabel = $(li).next('.nav-header-item').children('a.menu-level-1');
	
	
					}
	
	
				}
	
			}
	
	
			if (dir === 'prev') {
	
	
	
				if (NVIDIAGDC.isBrandPage) {
					if ($(t).hasClass('caret-right') && NV.megaNavCollapsed) {
						adjlabel = $(li).parents('.nv-menu').siblings('.brand-container').children('.nvidia-logo');
					}
	
				}
	
	
	
				if (($(li).parent().hasClass('left') && $(li).prev()[0] !== undefined) || ($(li).parent().hasClass('right') && $(li).prev()[0] !== undefined)) {
					//This is left mega menu item
					adjlabel = $(li).prev('.nv-menu-item').children('.menu-level-1');
	
	
				} else if ($(li).prev()[0] == undefined && $(li).parent().hasClass('left')) {
					//first element of the left navigation 
					adjlabel = $(li).parents('.nv-menu').siblings('.brand-container').children('.nvidia-logo');
					//adjlabel = li.children[0];
				} else if ($(li).prev()[0] == undefined && $(li).parent().hasClass('right')) {
					//first element of the right navigation 
					if(!NV.megaNavCollapsed) li = $(li).parent().siblings('.left').children('li').last().prev();
					else li = $(li).parent().siblings('.menu-buttons-container').find('.caret-right').focus();
					adjlabel = li.children('.menu-level-1');
	
				} else if ($(li).parent().parent().hasClass('nav-tools-container') && $(li).prev()[0] !== undefined) {
					if ($(li).hasClass('search-item')) {
						adjlabel = $('.nv-container').children('.right').children('li').last().children('.menu-level-1');
					} else if ($(li).prev('.nav-header-item').hasClass('cart-item')) {
						adjlabel = $(li).prev('.nav-header-item').children('.nav-header-list').find('a.menu-level-1');
	
					}
	
					else {
						adjlabel = $(li).prev('.nav-header-item').children('a.menu-level-1');
					}
	
	
	
				}
	
	
			}
	
	
			return adjlabel;
		}
	
		function adjacentSecLevelItem(t, dir) {
			var li = t.parentNode;
			var adjlabel;
			if (dir === 'next') {
				adjlabel = $(li).next('.nv-menu-item').children('.menu-level-2');
			}
	
			if (dir === 'prev') {
				adjlabel = $(li).prev('.nv-menu-item').children('.menu-level-2');
			}
	
	
			return adjlabel
		}
	
	
		function adjacentDropdownItem(t, dir) {
			var li = t.parentNode;
			var adjlabel;
			if (dir == 'next') {
	
				adjlabel = $(li).next('.menu-level-4').children('.menu-item-link');
				if (adjlabel.length == 0) {
					li = $(li).parent().parent().next().children('ul.menu-level-4').children('li.menu-level-4:first');
					adjlabel = $(li).children('.menu-item-link');
				}
			}
	
			if (dir == 'prev') {
	
				adjlabel = $(li).prev('.menu-level-4').children('.menu-item-link');
	
				if (adjlabel.length == 0) {
					if ($(li).parent().parent().is(':first-child') && $(li).parents('.nv-menu2-container').length) {
						openMenu($(li).parents('.nv-menu2-container').find('input.nvactive'));
	
						var id = $(li).parents('.nv-menu2-container').find('input.nvactive').attr('id');
						$('#' + id).removeClass('nvactive')
						$(li).parents('.nv-menu2-container').find('label[for=' + id + ']').focus();
	
					} else if ($(li).parent().parent().is(':first-child') && !($(li).parents('.nv-menu2-container').length)) {
	
						var id = $('#' + $(li).parents('.nv-menu3-container').siblings('label').attr('for'));
	
						openMenu($(id));
						$(li).parents('.nv-menu3-container').siblings('label').focus();
					}
	
	
					li = $(li).parent().parent().prev().children('ul.menu-level-4').children('li.menu-level-4:last');
	
					adjlabel = $(li).children('.menu-item-link');
				}
			}
	
	
			return adjlabel;
		}
	
	
		function resizeColHeight() {
			$(".menu-accordion").each(function () {
				var maxHeighth = 0,
					menu3Titles = $(this).find("div.menu3-title");
				$(menu3Titles).css("min-height", 0);
				$(menu3Titles).each(function () {
					if ($(this).height() > maxHeighth) {
						maxHeighth = $(this).outerHeight();
					}
				});
				$(menu3Titles).css("min-height", maxHeighth);
			});
		}
	
	
		function animatefirstlevelTabs(e) {
			$('li.nv-menu-item').attr('aria-expanded', 'false');
			var $this = $(e);
			// make sure we cannot click the slider
			if ($this.hasClass('menu-slider')) {
				return;
			}
			/* Add the menu-slider movement */
			var total = 0;
			$('ul.nv-menu-list.left  li.nv-menu-item.tmenu ').each(function () {
				$(this).attr('data-pos', total)
				//$(this).addClass(whatTab)
				var whatTab = $(this).index();
				total += $(this).width();
			});
			// what tab was pressed
	
			var wt = e[0].clientWidth;
			// Work out how far the menu-slider needs to go
			var fwt = $this.attr("data-pos");
			var howFar = fwt;
			if (!$("#tab1-nv-level2-tab1").is(':checked') && NV.secondMenuSaved == "tab1-nv-level2-tab1") {
				var tabw = $('label[for="tab1-nv-level2-tab1"]').width() + 20;
				$(".menu-slider-l1").css({
					left: 0 + "px",
					width: tabw + "px"
				});
			}
			$(".menu-slider").css({
				left: howFar + "px",
				width: wt + "px"
			});
			$(".menu-slider1").css("opacity", 0);
	
		}
	
		function animateSecondlevelTabs(e) {
	
		
	
			$('.nv-menu-list.left > li.nv-menu-item').each(function (i) {
	
	
				i += 1;
				var dd = $(this).find("ul.nv-menu-level2-list").addClass("tab-bar" + i).find("li");
	
				/*	$(dd).click(function (e) {
						e.stopPropagation();
					
					}); */
	
				
				var $that = $(e);
				// make sure we cannot click the slider
	
				if ($that.hasClass('slider-menu')) {
					return;
				}
				/* Add the menu-slider movement */
				var total = 0;
				$(dd).each(function () {
					$(this).attr('data-wt', total);
					var whatTab = $(this).index();
					total += $(this).width();
				});
				// what tab was pressed
				
				var wt = e[0].clientWidth;
				// Work out how far the menu-slider needs to go
				var fwt = $that.attr("data-wt");
				var howFar = fwt;
				
				$(".slider-menu").css({
					left: howFar + "px",
					width: wt + "px"
				});
	
			});
	
		}
	
		$(document).ready(function () {
	
			/*ADD MENU OVAERLAY */
			//
	
	
			$('.expandable').addClass('menuclose');
			$('body').removeClass('mega-menu-open');
	
	
			$('.main-menu').on("click", function (e) {
				e.stopPropagation();
	
				openMenu($(this));
			});
	
			$('.navoverlay').on("click", function () {
				closeMenu($(this));
			});
	
	
			$('.nav-header-container .sub-menu').on("click", function (e) {
				
				e.stopPropagation();
				openMenu(this);
			});
	
	
			/* Tab Menu Slider Animation*/
			$('.nv-menu-list.left > li.nv-menu-item').each(function (i) {
		
		
				i += 1;
				var dd = $(this).find("ul.nv-menu-level2-list").addClass("tab-bar" + i).find("li");
				$(dd).click(function (e) {
					e.stopPropagation();
					// make sure we cannot click the slider
					
					if ($(this).hasClass('slider-menu')) {
						return;
					}
					/* Add the menu-slider movement */
					var total = 0;
					$(dd).each(function () {
						$(this).attr('data-wt', total);
						var whatTab = $(this).index();
						total += $(this).width();
					});
					// what tab was pressed
					var wt = this.clientWidth;
					// Work out how far the menu-slider needs to go
					var fwt = $(this).attr("data-wt");
					var howFar = fwt;
					
					$(".slider-menu").css({
						left: howFar + "px",
						width: wt + "px"
					});
				});
			});
	
	
	
	
			/* tab Animation end */
	
	
			/* Menu Animation */
	
			$('.nv-menu input.sub-menu').each(function (i) {
				$(this).change(function () {
					$(".three-lvl").removeClass("on");
					if ($(this).is(':checked')) {
						$(".three-lvl").removeAttr("style");
						var ssw = $(this).val();
						var ssq = ssw.slice(10);
						$(this).parents(".three-lvl").addClass("on");
						var ht = $(".three-lvl.on .nv-menu3-container.nv-level3-" + ssq).height();
						$(this).parents(".three-lvl").children(".menu3-container").css({
							"height": ht,
							"visibility": " visible",
							"width": " 100%",
							"background-color": " #eee",
							"-webkit-transform": " rotateX(0)",
							"-moz-transform": " rotateX(0)",
							"-ms-transform": " rotateX(0)",
							"transform": " rotateX(0)",
							"opacity": " 1",
	
							"transition": " ease-in .2s",
							"-webkit-transition": " ease-in .2s",
							"-o-transition": " ease-in .2s"
						});
					}
				});
			});
			$('.nv-menu input').click(function () {
				if (!$(this).is(':checked')) {
					$(".three-lvl").removeClass("on");
					$(".menu3-container").css({
						"height": "auto",
						"position": " absolute",
						"width": " 100%",
						"padding": " 0",
						"box-shadow": " 0 6px 4px -4px #1a1a1a",
						"background-color": " #eee",
						"z-index": " 552",
						"transition": " ease-out  .2s",
						"-webkit-transition": " ease-out .2s",
						"-o-transition": " ease-out .2s",
						"transform": " rotateX(90deg)",
						"-webkit-transform-origin": " top center",
						"-ms-transform-origin": " top center",
						"transform-origin": " top center"
					});
				}
			});
			$('.nv-menu input.sub-menu, .nv-menu input.main-menu').each(function () {
				$(this).click(function () {
					if (!$('.nv-menu2-container.nv-level1-tab1.three-lvl input').is(':checked')) {
						$(".menu3-container").removeAttr("style");
						$(".three-lvl").removeClass("on");
					}
				});
				$(".nv-menu2-container.nv-level1-tab4.three-lvl input.sub-menu, input.main-menu").click(function () {
					if (!$('.nv-menu2-container.nv-level1-tab4.three-lvl').is(':checked')) {
						$(".menu3-container").removeAttr("style");
						$(".nv-menu3-container").removeClass("on");
					}
				});
			});
	
	
			/* end Menu Animation */
	
			/*  Title equal height  */
	
			$('.nv-menu ul.menu-level-3').each(function (index) {
				$(this).addClass('row' + index);
				resizeColHeight();
			});
			$(window).resize(function () {
				
				if (NVIDIAGDC.Browser.getViewport() == 'laptop' || 'desktop') {
					if ($('body').hasClass('noscroll')) $('body').removeClass('noscroll');
				}
				resizeColHeight();
			});
	
	
			/* Default radio unchecked */
	
			$('input[type=radio].main-menu').change(function () {
				//  $('.sub-menu').prop('checked', false)
			})
	
	
			/*****Key focus *******/
	
			$(".global-nav a, .global-nav button, .global-nav label,.global-nav input[type=radio]").keyup(function (e) {
				e.preventDefault();
				$(this).addClass("focusOutline");
                if($(this).hasClass('skip-main')){ $(this).addClass('focus')}
	
	
			}).blur(function (e) {
                e.preventDefault();
				$(this).removeClass("focusOutline");
                if($(this).hasClass('skip-main')){ $(this).removeClass('focus')}
			});
	
			$(document).on('keyup', function (evt) {
				if (evt.keyCode == 27) {
					/*$(".global-nav a, .global-nav button, .global-nav label,.global-nav input[type=radio]").removeClass("focusOutline");*/
				}
			});
	
	
			/*Animation */
	
	
			// Check window.location.pathname string to determine if we're currently on an interior brand page in "LAPTOP" or "DESKTOP" breakpoint,
			// and if so, collapse the MEGA NAV level 1 menu items to avoid confusion such as double products or double hamburger, and prioritize focus on the BRAND subnav...
	
			setTimeout(function () {
				checkWindowLocationPathname();
			}, 300);
	
	
			// checkWindowLocationPathname();
	
			$('.sub-menu').prop('checked', false);
			$('.main-menu').attr('checked', false);
	
	
			/*End of Document ready */
	
		});
	
		$(window).unload(function () {
			$('.sub-menu').prop('checked', false)
			$('.main-menu').attr('checked', false);
		});
	
	
		/*Collapse animation for Brand pages */
	
		function checkWindowLocationPathname() {
	
	
			if (NVIDIAGDC.isBrandPage) {
	
				// If you are not on the homepage, you must be on an INTERIOR (BRAND) page...
				NV.isHomePage = false;
	
				if (NV.responsiveIndex > 2) {
	
					// And are viewing from laptop or desktop breakpoint... then collapse the mega nav.
					
	
					if (NV.megaNavCollapsed == true) {
						stayCollapsedOnInteriorPages();
					} else {
	
						//collapseMegaNavOnBrandPage(5);
	
						
	
						if (!NV.isHomePage && NV.responsiveIndex > 2 && !NV.megaNavOpen && !NV.megaNavCollapsed) {
	
							if (typeof NV.interiorPageNavCollapseTimer === 'undefined') {
								NV.interiorPageNavCollapseTimer = gsap.delayedCall(10, collapseMegaNavOnBrandPage, [0]);
							}
	
						}
					}

				}
	
			} else {
	
				// You are on the homepage, or a brand page in mobile or tablet breakpoint...
				
	
				NV.isHomePage = true;
	
				//expandMegaNavOnBrandPage(1, false);

			}
		}
	
		function collapseMegaNavOnBrandPage(_delay) {

	
			NV.istouchDevice = isTouchDevice();
			if (NV.istouchDevice === true) {
				removeClass('hide', '#mega-menu-expand-label');
			}
	
	
			if (NV.responsiveIndex < 3 && NV.megaNavCollapsed !== true) {
				return;
			} // Only allow collapse and close to occur on LAPTOP/DESKTOP breakpoints...
			
			if (!NV.megaNavOpen && NV.megaNavCollapsed == false) {
	
				if (typeof _delay === 'undefined' || _delay === null) {
					_delay = 0;
				}
	
				NV.megaNavCollapsingOrExpanding = true;
	
				NV.megaNavCollapsed = true;
				setSessionCookie('megaNavCollapsed', true);
	
				if (NV.megaNavOpen && NV.responsiveIndex > 2) closeMenu();
	
				//gsap.set('li.menu-button.caret-right.close', {display: "inline-block"});
				// left: 540,  left: 140,               scaleX: -1, scaleX: 1, 
				$('body').removeClass('noscroll');
				addClass("hide", 'button.menu-button.caret-right');
				addClass("hide", 'button.menu-button.close');
				removeClass("navoverlay-display", ".navoverlay")
				gsap.set('svg.menu-button.caret-left', {
					autoAlpha: 1,
					scaleX: 1
				});
				removeClass("hide", 'button.menu-button.caret-left');
	
				gsap.fromTo('svg.menu-button.caret-left', {
					autoAlpha: 0,
					scaleX: -1
				}, {
					duration: 0.5,
					autoAlpha: 1,
					scaleX: 1,
					delay: 1
				});
	
				gsap.fromTo('span.main-menu-buttons-desktop', {
					x: 0,
					autoAlpha: 1
				}, {
					duration: 1,
					x: -$('.nv-menu-list.left').width() - 25,
					autoAlpha: 1,
					ease: "expo.inOut",
					delay: _delay + 2.25,
					onComplete: function () {
						gsap.fromTo('svg.menu-button.caret-left', {
							scaleX: 1
						}, {
							duration: 1,
							scaleX: -1,
							ease: "expo.out",
							onComplete: function () {
								addClass("hide", "button.menu-button.caret-left");
								removeClass("hide", "button.menu-button.caret-right");
								NV.megaNavCollapsingOrExpanding = false;
							}
						});
					}
				});
	
	
				gsap.to('label.menu-level-1', {
					duration: 1,
					left: 0,
					autoAlpha: 0,
					ease: "expo.inOut",
					stagger: {
						amount: 0.2,
						from: "end"
					},
					delay: _delay + 2.25
				});
	
				if (!NV.mainMenuButtonsDesktopReady) {
					gsap.delayedCall(4, initMainMenuButtonsDesktop);
				}
	
	
	
	
			}
	
	
		}
	
		function stayCollapsedOnInteriorPages() {
	
	
	
			NV.megaNavCollapsed = true;
			setSessionCookie('megaNavCollapsed', true);
	
			addClass("hide", 'button.menu-button.caret-left');
			addClass("hide", 'button.menu-button.close');
	
			gsap.set('svg.menu-button.caret-right', {
				autoAlpha: 1,
				scaleX: 1
			});
			removeClass("hide", 'button.menu-button.caret-right');
	
			if (NV.mainMenuButtonsDesktopReady === false) initMainMenuButtonsDesktop();
		}
	
	
	
	
		// SET SESSION COOKIE preferences for MEGA NAV...
	
		function setSessionCookie(cName, cValue) {
			document.cookie = cName + "=" + cValue + ";path=/";
		}
	
		function getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}
	
	
	
	
		function addClass(_class, _selector) {
			var elements = document.querySelectorAll(_selector);
			for (var i = 0; i < elements.length; i++) {
				elements[i].classList.add(_class);
			}
		}
	
		function removeClass(_class, _selector) {
			var elements = document.querySelectorAll(_selector);
			for (var i = 0; i < elements.length; i++) {
				elements[i].classList.remove(_class);
			}
		}
	
		function isTouchDevice() {
			return (('ontouchstart' in window) ||
				(navigator.maxTouchPoints > 0) ||
				(navigator.msMaxTouchPoints > 0));
		}
	
	
	
		function initMainMenuButtonsDesktop() {
	
	
	
			$("button.menu-button.caret-right").hover(function () {
				if (NV.megaNavCollapsingOrExpanding == true) return;
				removeClass('hide', '#mega-menu-expand-label');
			}, function () {
				if (NV.megaNavCollapsingOrExpanding == true && NV.istouchDevice === true) return;
				removeClass('hide', '#mega-menu-expand-label');
			}, function () {
				if (NV.megaNavCollapsingOrExpanding == true) return;
				addClass('hide', '#mega-menu-expand-label');
			});
	
			$("button.menu-button.caret-right").click(function () {
				if (NV.megaNavCollapsingOrExpanding == true) return;
				expandMegaNavOnBrandPage(0.2); // 0.2
			});
	
			$("button.menu-button.caret-left").click(function () {
				if (NV.megaNavCollapsingOrExpanding == true) return;
				collapseMegaNavOnBrandPage(0.2); // 0
			});
	
			$("button.menu-button.close").click(function () {
				if (NV.megaNavCollapsingOrExpanding == true) return;
				collapseAndCloseMegaNavOnBrandPage();
			});
	
			NV.mainMenuButtonsDesktopReady = true;
		}
	
		function expandMegaNavOnBrandPage(_delay, _openFirstAccordion) {
	
			if (typeof _delay === 'undefined' || _delay === null) {
				_delay = 1;
			}
	
	
			NV.megaNavCollapsingOrExpanding = true;
	
			NV.megaNavCollapsed = false;
	
			setSessionCookie('megaNavCollapsed', false);
			var left = $('.nv-menu-list.left').width();
			// gsap.set('.menu-button.close', {left: "400px"}); //left: 140, left: 540,
	
			gsap.set("svg.menu-button.caret-left", {
				scaleX: -1
			});
	
			removeClass("hide", "button.menu-button.caret-left");
	
			addClass("hide", "button.menu-button.caret-right");
			addClass("navoverlay-display", ".navoverlay");
			$('body').addClass('noscroll');
	
			gsap.fromTo('span.main-menu-buttons-desktop', {
				x: -$('.nv-menu-list.left').width() - 25,
				autoAlpha: 1
			}, {
				duration: 1,
				x: 0,
				autoAlpha: 1,
				ease: "expo.out",
				delay: _delay,
				onComplete: function () {
	
					removeClass("hide", "button.menu-button.close");
					addClass("hide", "button.menu-button.caret-left");
	
					gsap.fromTo("svg.menu-button.close", {
						scale: 0.25,
						autoAlpha: 0
					}, {
						duration: 0.5,
						scale: 1,
						autoAlpha: 1,
						ease: "expo.out",
						onComplete: function () {
	
							$("button.menu-button.close").focus();
	
							NV.megaNavCollapsingOrExpanding = false;
	
						}
					});
	
					// gsap.set('svg.menu-button.close', {left: "400px"});
	
	
				}
			});
	
			gsap.set('label.menu-level-1', {
				clearProps: "all",
				autoAlpha: 1
			});
	
			gsap.fromTo('label.menu-level-1', {
				autoAlpha: 0
			}, {
				duration: 1,
				autoAlpha: 1,
				ease: "expo.out",
				stagger: {
					amount: 0.33
				},
				delay: _delay + 0.33
			});
	
			if (NV.responsiveIndex > 2) {
	
				openMenu();
	
				gsap.delayedCall(0.25, function () {
					$("label.menu-level-1:first").focus(); // Focus on first level 1 menu item...
				});
	
	
			}
		}
	
	
		function collapseAndCloseMegaNavOnBrandPage() {
	
			if (NV.responsiveIndex < 3 /* && NV.megaNavCollapsed !== true*/) {
				return;
			} // Only allow collapse and close to occur on LAPTOP/DESKTOP breakpoints...
	
	
	
			NV.megaNavCollapsingOrExpanding = true;
	
			NV.megaNavCollapsed = true;
			setSessionCookie('megaNavCollapsed', true);
	
			addClass("hide", 'button.menu-button.close');
			addClass("hide", 'button.menu-button.caret-right');
	
			gsap.set('svg.menu-button.caret-left', {
				autoAlpha: 1,
				scaleX: 1
			});
			removeClass("hide", 'button.menu-button.caret-left');
			removeClass("navoverlay-display", ".navoverlay");
			$('body').removeClass('noscroll');
			gsap.to('label.menu-level-1', {
				duration: 1,
				left: 0,
				autoAlpha: 0,
				ease: "expo.inOut",
				stagger: {
					amount: 0.2,
					from: "end"
				},
				delay: 0
			});
	
			gsap.fromTo('span.main-menu-buttons-desktop', {
				x: 0,
				autoAlpha: 1
			}, {
				duration: 1,
				x: -$('.nv-menu-list.left').width() - 25,
				autoAlpha: 1,
				ease: "expo.inOut",
				onComplete: function () {
					gsap.fromTo('svg.menu-button.caret-left', {
						scaleX: 1
					}, {
						duration: 1,
						scaleX: -1,
						ease: "expo.out",
						onComplete: function () {
							addClass("hide", "button.menu-button.caret-left");
							removeClass("hide", "button.menu-button.caret-right");
							$("button.menu-button.caret-right").focus();
							NV.megaNavCollapsingOrExpanding = false;
							NV.istouchDevice = isTouchDevice();
							if (NV.istouchDevice === true) {
								removeClass('hide', '#mega-menu-expand-label');
							} else addClass('hide', '#mega-menu-expand-label');
						}
					});
				}
			});
	
	
	
			if (NV.megaNavOpen) {
				closeMenu();
			};
		}
	}
	
			//}
(function($, window, document, undefined) {
	// Default options
	var pluginName = "navigation-megamenu", 
	screenSize = $(window).width(), 
	pixelSize = window.devicePixelRatio, 
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint, 
	desktopBreakpoint =  NVIDIAGDC.desktopBreakpoint, 
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {};
	// to keep track of elements of the brand nav that are visible
	var visibleCount = $(".sub-brand-item").length;
	// variable that keeps track of showing the more link on the brand
	// navigation
	var showMore = false;
	// variable that keeps track of the first time checkBrandNavSize was called
	var checkBrandNavSizeCalled = false;
	var windowWidth = $(document).width();
	// list of page elements to navigate to
	var pageElements = [];
	pageElements.push($("#sub-btn0").attr("href"));
	$(".breadcrumb-link").each(function() {
		pageElements.push($(this).attr("href"));
	});
	// variable that stores the number of in page navigation items
	var brandCrumbNavCount = $(".scrollmenu-button").length;
	var initScroll = 0, st = $(window).scrollTop(), headerCollapsed = false, scrollPos;

	var scrollingDown;

	// removing unused domain cookies with the referrer href and element
	Cookies.remove("nv.buttonReferrer",{
		domain : "nvidia.com"
	});
	Cookies.remove("nv.referrerHref",{
		domain : "nvidia.com"
	});
	Cookies.remove("nv.referrerId",{
		domain : "nvidia.com"
	});

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function() {
		this.registerCallbacks();
		this.handlePageLoadScroll();
		/*if(this.options.enableSearchLibrary){
			this.addNVSearchLibrary();
		}*/
	};

	Plugin.prototype.addNVSearchLibrary = function () {
		var enableSearchLibrary = this.options.enableSearchLibrary,
			locale = $('html').attr('lang'),
			searchOptions = $.extend({}, {
				site: 'https://www.nvidia.com',
				language: locale
			}, this.options.searchOptions);

		var _self = this,
			searchElement = document.querySelector('#nvidia-search-box-link');

		/*mount the library with options*/
		NvidiaSearchLibrary.BoxWidget.mount(searchOptions);
		$(document).trigger('loadedNVSearchLibrary');

		searchElement.onclick = function () {
			$(NvidiaSearchLibrary.BoxWidget.el).css({ 'visibility': 'hidden' });
			var boxWidgetElem = setInterval(function () {
				if ($("#" + NvidiaSearchLibrary.BoxWidget.id).length && $(NvidiaSearchLibrary.BoxWidget.el).find('.search-box-wrapper').children().length > 0) {
					clearInterval(boxWidgetElem);
					_self._resizeNVSearchLibrary(NvidiaSearchLibrary.BoxWidget);
				}
			}, 1);
		}

		$(document).on('scroll', function () {
			var event;
			//This is true only for IE,firefox
			if (document.createEvent) {
				// To create a mouse event , first we need to create an event and then initialize it.
				event = document.createEvent("MouseEvent");
				event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			else {
				event = new MouseEvent('mouseup', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
			}
			var node = document.getElementById('nvidia-search-box-dummy-link');
			node.dispatchEvent(event);
		});

		$(window).resize(function (e) {
			if ($(NvidiaSearchLibrary.BoxWidget.el).find('.search-box-popper').is(":visible")) {
				_self._resizeNVSearchLibrary(NvidiaSearchLibrary.BoxWidget);
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		});


		$(document).on('mouseup touchend click', function (e) {
			if (e.target.id == "nvidia-search-box-link" || $(e.target).parents("#nvidia-search-box-link").length) {
				if ($("#dropdown-arrow").hasClass("dropdown-expanded")) {
					toggleMainHeaderMenu.apply(_self);
				}
				$('.nvidia-search-box-overlay').fadeOut();
			} else if (e.target.id == "nvidia-search-box-widget" || $(e.target).parents("#nvidia-search-box-widget").length) {
				return;
			} else {
				$('.nvidia-search-box-overlay').fadeOut();
			}
		});

		$('.nvcarticon, .cart-counter').on('click', function () {
			$('.nvidia-search-box-overlay').fadeOut();
		});

		this._resizeNVSearchLibrary = function (BoxWidget) {
			var navHeaderContainer = $('.nav-header-container'),
				navHeaderContainerHeight = navHeaderContainer.height(),
				triggerId = $("#" + searchOptions.triggerId),
				offsetLeftTriggerID = triggerId.offset().left,

				boxWidgetId = BoxWidget.el,
				searchBoxPoper = $(boxWidgetId).find('.search-box-popper'),
				searchBoxPoperArrow = $(boxWidgetId).find('.search-box-popper-arrow'),
				searchBoxPoperWidth = searchBoxPoper.width(),
				offsetLeftBoxWidgetId = 0,
				cssObj;

			navHeaderContainerHeight += $(window).scrollTop();
			var isMobile = NVIDIAGDC.Browser.getViewport() == "mobile";

			if (isMobile) {
				if (window.matchMedia("(max-width:480px)").matches) {
					navHeaderContainerHeight += 10;
					cssObj = {
						'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '50%',
						'transform': 'translate3d(-50%, ' + navHeaderContainerHeight + 'px, 0px)',
						'width': '270px', 'margin': '0 auto'
					};
				} else {
					searchBoxPoperWidth = searchBoxPoperWidth / 1.5;
					offsetLeftBoxWidgetId = offsetLeftTriggerID - searchBoxPoperWidth;
					cssObj = {
						'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px',
						'transform': 'translate3d(' + offsetLeftBoxWidgetId + 'px, ' + navHeaderContainerHeight + 'px, 0px)',
						'width': '270px'
					};
				}
			} else {
				searchBoxPoperWidth = searchBoxPoperWidth * 3 / 4;
				offsetLeftBoxWidgetId = offsetLeftTriggerID - searchBoxPoperWidth;
				cssObj = {
					'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px',
					'transform': 'translate3d(' + offsetLeftBoxWidgetId + 'px, ' + navHeaderContainerHeight + 'px, 0px)',
					'width': '270px'
				};
			}
			searchBoxPoper.css(cssObj);
			offsetLeftTriggerID = offsetLeftTriggerID - searchBoxPoper.offset().left;
			searchBoxPoperArrow.css({
				'left': offsetLeftTriggerID + 'px'
			});
			$('.nvidia-search-box-overlay').stop(true, true).fadeIn(200);
			$(NvidiaSearchLibrary.BoxWidget.el).css({ 'visibility': 'visible' });
		}
	}

	Plugin.prototype.registerCallbacks = function() {
		var throttledCheckSize = _.throttle(checkSize, 250);
		var throttledToggleHeader = _.throttle(toggleHeader, 250);
		var throttledExtendJarvisSession = _.throttle(extendJarvisSession, 750);
		this.$element.find("#dropdown-arrow").click($.proxy(toggleMainHeaderMenu, this));
		this.$element.find(".nav-search-icon, .search-abort").on("click",
            toggleSearchBar
        );
        $(".searchoverlay").click(toggleSearchBar);
		this.$element.find(".ic-expand").click($.proxy(toggleSubnavMenu, this));
		this.$element.find(".scrollmenu-button").click(
			$.proxy(toggleSubnavMenu, this));
		// this.$element.find(".ic-menu").click($.proxy(toggleBrandnavMenu,
		// this));
		this.$element.find('.global-item[data-element-role="solutions"]')
		.hover($.proxy(toggleSolutionsMenu, this));
		$(window).resize($.proxy(throttledCheckSize, this));
		$(window).scroll($.proxy(throttledToggleHeader, this));
		$(
			".breadcrumb-link span, .subnav-category span, .scrollmenu-button span, .link-txt[data-href^='#'] .btn, .link-btn[data-href^='#'] .btn")
		.click(smoothScroll);
		/* handle Breadcrumb CTA model popups */
		$(".model-popup").click(openModal);
		$(document).on("showCart", showHeader);
		checkSize.apply(this);
		
		/* AD-877 -Fixed issue when it is searching from research page */
		$("#searchform").submit(function(e){
			var actionurl = document.getElementById("searchform").action;
			if(actionurl.indexOf("search/node") !== -1) {
				e.preventDefault();
				actionurl = actionurl + $(".search-box-input").val();
				window.location.href = actionurl;
			}
		});
		
		$("#searchformmob").submit(function(e){
			var actionurl = document.getElementById("searchformmob").action;
			if(actionurl.indexOf("search/node") !== -1) {
				e.preventDefault();
				actionurl = actionurl + $(".search-box-input-mob").val();
				window.location.href = actionurl;
			}
		});
		/* AD-877 End */
		
	    $(".nav-search-form-icon").click(function(){
	        $("#searchform").submit();
	    });
	    
	    $(".nav-search-form-icon-mob").click(function(){
	        $("#searchformmob").submit();
	    });
		
		/* research page goes to a different page */
		if (this.$element.find(".search-research").length) {
			this.$element.find("#searchform").on("submit", submit2Research);
		}
		this.$element.find("#search-terms").keypress(searchsubmitvalidation);
		this.$element.find("#search-terms-mob").keypress(searchsubmitvalidation);
		$(".search-abort").click(function() {
			$(".search-box-input").val("");
			$(".search-box-input-mob").val("");
		});
		
		$(document).on("click scroll", throttledExtendJarvisSession);
		// console.log("Inside registerCallbacks");

		/*$(".mobile-menu").slideMobileMenu({


		}); */
		if ($(document).width() < 1025) {
			$(".mobile-menu").slideMobileMenu({

			});

		/*	var openItem = getCookie("openMenuItem");
			if (openItem != "" && openItem != null && openItem != 'none') {

				$('.ic-menu').click();
				if (openItem != "main-menu") {
					$('.mobile-menu').find(
							$("li.hasChild:contains(" + openItem + ")"))
							.addClass('active');
				}
			} */

		}

		/*else {



		}*/




		/************ Desktop menu *************/

		$(function() {
			$(".sub-brand-item").each(function() {
				var subLink = $(this).find("span.sub-brand-link").width();
				if (document.documentMode || /Edge/.test(navigator.userAgent)) {
					var nvArrowLt = subLink - 30;
				}
				var nvArrowLt = subLink - 30;
				var nvwidth = subLink + 65;
				$(this).find(".nvArrow").css("left", nvArrowLt);
				$(this).find("#nav").css("min-width", nvwidth); 
				$(this).find("li.more-element").closest("ul").addClass("more-menu");
			});


			$(".dropdown-menu > li:first-child").each(function() {
				var parent = $(this).parent('ul.dropdown-menu').prev();
				var copy = parent.clone();
				$(copy).removeClass("div").find(".ic-arrow-dropdown").remove();
				$(copy).removeClass("div").find(".arrow").remove();
				$(copy).removeClass("sub-menu").addClass("overview");
				$(copy).prepend();
        //$(this).before(copy);

        $('.dropdown-menu span.sub-brand-link ').replaceWith(function() {
        	return $('<li/>', {
        		html: this.innerHTML
        	})
        });
        $('.sub-brand-link > a').addClass('dropdown-toggle');
        $(".dropdown-menu li a.sub-brand-link").html("<div class='title'>Overview</div>");
        $(".global-nav-link.overview").html("<div class='title'>Overview</div>");

        $('span.sub-brand-link').addClass('button-dropdown');
    });
			$(".global-nav-link.overview").wrap("<li></li>");
			$('.sub-brand-link > a').attr('href', 'javascript:void(0)');
			$('.global-nav-link.sub-menu').attr('href', 'javascript:void(0)');

			hide = true;
			$('body').on('click', '.sub-brand-item', function() {
				var self = $(this).find(".dropdown-menu.bullet");
				var nvself = $(this);
				self.toggleClass('active');
				nvself.toggleClass('active');
				hide = false;
			});



			$('.sub-brand-item').hover(
				function() {
					$('.sub-brand-item').removeClass('active');
					$(".sub-menu").removeClass('active');
					$(".dropdown-menu").removeClass('active');
					$(".arrow").removeClass('active');
				},
				function() {
					if ($('.sub-brand-item').children().length > 0) {
						$('.sub-brand-item').removeClass('active');
					}
					$(this).find(".dropdown-menu.active").parent().addClass('active');
				});


			$('.dropdown-menu.bullet > li').bind('click mouseenter', function() {
				if(!$( this ).find( ".dropdown-menu.level2" ).hasClass( "active" )){
					$(".dropdown-menu.sub").removeClass('active');}

					if(!$( this ).find( ".dropdown-menu.level2 .sub-menu" ).hasClass( "active" )){
						$(".dropdown-menu.sub .sub-menu").removeClass('active');}
						$('.dropdown-menu.bullet li').has('.sub-menu ').removeClass('active');
						if($( this ).find( ".dropdown-menu.level3" ).has( "active" )){
							$( this ).find( ".dropdown-menu.level3.active" ).parent().addClass('active');}
							$(this).has('.sub-menu ').addClass('active');
      //  $(this).find(".dropdown-menu.level2").addClass('active');
      $(this).parent().addClass('active');

  });



			$('.dropdown-menu.level2 li').hover( function() {
				$(".dropdown-menu.level2 .sub-menu").removeClass('active');
				$(".dropdown-menu.level3").removeClass('active');
				$(this).has('.sub-menu ').addClass('active');
				$(this).parent('ul.dropdown-menu.sub').addClass('active');
				$(this).find(".dropdown-menu.level3").addClass('active');
				$(this).parent().parent('.sub-menu').addClass('active');
			});



			$('.brand-nav-left .sub-brand-item').hover(
				function() {
					$(this).removeClass('active');
					$( this ).find(".dropdown-menu.bullet").removeClass('active');
					if($( this ).find( ".dropdown-menu.level2" ).hasClass( "active" )){
						$( this ).find(".dropdown-menu.bullet").addClass('active');
						$(this).addClass('active');
					}

				});



			$('.sub-brand-item').hover( function() {

				if ( ($(this).find(".dropdown-menu").hasClass("level2")) && ($(this).find(".dropdown-menu").hasClass("level3"))  ){

					var subLink2W = $(this).find(".dropdown-menu.level2").width()+30;
					var subLink3W = $(this).find(".dropdown-menu.level3").width()+30;
					var subLink3W1 =   subLink3W + 5;
      //  console.log(subLink2W);
      //   console.log(subLink3W);


      if(( $(this).find(".dropdown-menu.level3").offset().left + subLink3W ) > $(document).width()){
      	$(this).parents('ul.dropdown-menu.sub').css("right","100%").addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level3").css( "width",subLink3W1).addClass('edge');
      }

      if(( $(this).find(".dropdown-menu.level2").offset().left + subLink2W) > $(document).width()){
      	$(this).parents('ul.dropdown-menu.sub').addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level2").css("right","100%").addClass('edge');
      	$(this).has('.sub-menu ').find(".dropdown-menu.level3").removeClass('edge');
      }
  }
});




			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);


			var isEdge = /Edge/.test(navigator.userAgent); 

			if (isEdge || isSafari ) {
				var max = 0;
				$('ul.level2 li .title').each(function(){
					var length = $(this).text().length;

					var ulw = length * 8.25;
					var ulwt = ulw +16 ;


					if( ulw <= 130 ){
						$(this).css("min-width", ulw +10);
						$(this).parent().parent().css("min-width", ulw+10);

					}
					else  if( ulwt <= 179 ){
						$(this).css("min-width", ulwt);
						$(this).parent().parent().css("min-width", ulwt);

					}

					else  if( ulwt <= 210 ){
						$(this).css("min-width", ulwt+11);
						$(this).parent().parent().css("min-width", ulwt+11);

					}

					else  if( ulw > 200 ){
						$(this).css("min-width", "228px");
						$(this).parent().parent().css("min-width", "232px");
					}
				}); 
			}



			$('body').on("click", function() {
				if (hide) $('.dropdown-menu.bullet').removeClass('active');
				if (hide) $('.sub-brand-item').removeClass('active');
				if (hide) $('.dropdown-menu.sub').removeClass('active');
				if (hide) $('.sub-menu ').removeClass('active');
				hide = true;
			});

		});



/******************** end ****************/




};

Plugin.prototype.handlePageLoadScroll = function() {
	var hashid = NVIDIAGDC.Browser.getUrlParameter("section");
	if (!!hashid) {
			// var hashid=window.location.hash;
			setTimeout(function() {
				hashid = "#" + hashid;
				if ($(hashid).offset()) {
					if ($(".breadCrumbNav").length) {
						var breadCrumbOBj = $(".breadCrumbNav").find(
							".subnav-right").find(
							"a[href='" + hashid + "']");
							if (!!breadCrumbOBj) {

								$(breadCrumbOBj).find("span").trigger("click");
							} else {
								handleSmoothScroll(hashid);
							}
						} else {
							handleSmoothScroll(hashid);
						}
					}
				}, 500);
		}
	};

	/* Code for New Mobile menu */

	 var isMobile = NVIDIAGDC.Browser.getViewport() == "mobile";
	 var isTablet = NVIDIAGDC.Browser.getViewport() == "tablet";

    if (isMobile || isTablet) {
       
 	$(".mobile .nav-search-icon, .mobile-menu .search-abort").on("click",toggleSearchBar);


 	//$(".searchoverlay").click(toggleSearchBar);

    }

	//Check if the cookie is set for menu

	var defaults = {
		"hamburgerId" : "ic-menu", // Hamburger Id
		"wrapperClass" : "mobile-menu-container", // Menu Wrapper Class
		"submenuClass" : "submenu", // Submenu Class
		"onMenuLoad" : function() {
			return true;
		}, // Calls when menu loaded
		"onMenuToggle" : function() {
			return true;
		} // Calls when menu open/close

	};	

	var menuToggle;
	menuToggle = new TimelineMax({
		paused : true,
		reversed : true
	});

	if(NVIDIAGDC.isBrandPage){
		menuToggle.add('rotate', 0.1).to(' #menu-line-top', .5, {
			stroke : '#76b900',
			transformOrigin : '50% 50%',
			x : '0',
			y : '6'
		}, 'rotate').to(' #menu-line-mid', .5, {
			stroke : 'rgba(118,185,0,0)',
			transformOrigin : '50% 50%',
			x : '0',
			y : '0'
		}, 'rotate').to(' #menu-line-bot', .5, {
			stroke : '#76b900',
			transformOrigin : '50% 50%',
			x : '0',
			y : '-6'
		}, 'rotate').to(' #menu-line-top', .5, {
			rotationZ : 225,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate').to(' #menu-line-mid', .5, {
			rotationZ : 225,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate').to(' #menu-line-bot', .5, {
			rotationZ : 135,
			transformOrigin : '50% 50%',
			ease : Cubic.easeInOut
		}, 'rotate');
	}

	$.fn.slideMobileMenu = function(options) {

		if (this.length === 0) {
			return this;
		}
		var mobMenu = {}, ds = $(this);

		var init = function() {
			mobMenu.settings = $.extend({}, defaults);
			createBackButton();
			mobMenu.hamburger = $('.ic-menu');

		}

		createBackButton = function() {

			mobMenu.outer = $('.mobile-menu-container');
			mobMenu.outer
			.find("ul." + mobMenu.settings.submenuClass)
			.each(
				function() {
					var dis = $(this), disPar = dis
					.closest("li"), disfA = disPar
					.find("> a"),

					disBack = $(
						"<li/>",
						{
							"class" : "back",
													// "html": "<div
													// class='mobile-arrow-left'></div><a
													// href='#'>" + disfA.text()
													// + "</a>"})
													"html" : "<div class='mobile-arrow-left'><svg class='left-arrow' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><polygon points='352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256'/></svg></div><a href='#'>Back</a>"
												})
					disPar.addClass("hasChild");
					disBack.prependTo(dis);
					$('<svg class="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="a" d="M11.45,22.12,17.56,16,11.45,9.88,13.33,8l8,8-8,8Z"/></svg>').prependTo(disPar);
				});
		},

		toggleMobileMenu = function(e) {
			$("." + mobMenu.settings.hamburgerId).toggleClass("open");
					/* $("." + mobMenu.settings.wrapperClass)
							.toggleClass("active").find("li.active")
							.removeClass("active");*/
					//$("." + mobMenu.settings.wrapperClass).toggleClass("hide");
					// $("body").toggleClass("mmactive");
					$(".ic-menu").toggleClass("ic-menu-green");
					$(document.body).toggleClass("noscroll");

					if ($("." + mobMenu.settings.hamburgerId).hasClass('open')
					/*&& $("." + mobMenu.settings.wrapperClass).hasClass(
					'active')*/) {
							/*logic to reset sidenav*/
						resetsideNav();
						hideHeader();
					menuToggle.restart();

					$('.mobile-menu-container').css({
						'display' : 'block',
						'opacity' : '1',
						'overflow' : 'hidden',
						'transition' : 'all 0.5s ease-in'
					});
					if (getCookie("openMenuItem") == 'none') {
						setSessionCookie("openMenuItem", "main-menu");
						TweenMax.to($('.mobile-menu').children("li").find(
							'a'), 0.1, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});
					}

					$('.lightbox-background').css({
						opacity : 0
					});
					$('.lightbox-background').removeClass('hide');
					TweenMax.to('.lightbox-background', 0.5, {
						autoAlpha : 1,
						delay : 0.2
					});
						// TweenMax.to($('.mobile-menu-container'), 0.2,
						// {opacity: 1, ease: Expo.easeInOut});
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'height' : 'calc(100vh - 45px)',
								'transition' : 'all 0.8s'
							});
						}, 100);
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'overflow-y' : 'auto'
							});
						}, 200);

					} else {

						$('.mobile-menu-container').css({
							'overflow' : 'hidden',
							'height' : '0',
							'transition' : 'all 0.5s'
						});

						/*TweenMax.to($('.mobile-menu-container'), 0.1,
						{opacity: 0, ease: Expo.easeOut});*/
						setTimeout(function() {
							$('.mobile-menu-container').css({
								'display' : 'none'
							});
						}, 500);

						setTimeout(function() {
							$('.mobile-menu').find('.active').removeClass(
								'active');
						}, 500);

						setTimeout(function() {
							$('.subnav').css({
								'display' : 'block'
							});
						}, 400);

						TweenMax.to('.lightbox-background', 1, {
							autoAlpha : 0,
							onComplete : function() {
								$('.lightbox-background').addClass('hide');
							}
						});
						setSessionCookie('openMenuItem', 'none');

						setTimeout(function() {showHeader()},800);
						menuToggle.reverse();
					}

				},

				showSubMenu = function(e) {
					e.preventDefault();

					$("." + mobMenu.settings.wrapperClass).scrollTop(0);
					$(this).parent().addClass("active").siblings().removeClass(
						"active");
					var name = $(this).html();
					//console.log($(this).parent().siblings("li").andSelf().find('a:first'));
					// $(this).parent().siblings("li").andSelf().find('a:first').addClass('mnm');
					TweenMax.to($(this).parent().siblings("li").andSelf().find(
						'a:first'), 0.1 * 4, {
						x : -1025,
						left : -1025,
						opacity : 1,
						ease : Cubic.easeInOut
					});
					TweenMax.to($(this).parent().siblings("li:first").find(
						'.mobile-arrow-left:first'), 0.1 * 4, {
						x : -1025,
						left : -1025,
						opacity : 1,
						ease : Cubic.easeInOut
					});

					//document.cookie = "openMenuItem="+ name +";path=/";
					setSessionCookie("openMenuItem", name);

				},

				goBack = function(e) {
					e.preventDefault();

					$(this).closest("ul." + mobMenu.settings.submenuClass)
					.parent().removeClass("active");
					//console.log($(this).parent().parent().siblings("li").andSelf().find('a:first'));
					TweenMax.to($(this).parent().parent().siblings("li")
						.andSelf().find('a:first'), 0.1 * 4, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});
					TweenMax.to($(this).parent().parent().siblings("li:first")
						.find('.mobile-arrow-left'), 0.1 * 4, {
							x : 0,
							left : 0,
							opacity : 1,
							ease : Cubic.easeInOut
						});

					//console.log($(this).parent().parent().find('.mobile-arrow-left:first'));
					var prev = $(this).parent().parent().parent().siblings('a')
					.html();
					if (typeof prev === "undefined" || prev == ''
						|| prev == null) {
						setSessionCookie("openMenuItem", "main-menu");
				} else {
					setSessionCookie("openMenuItem", prev);
				}
			},

			/* Init */
			init();

			/* Open Menu */

			mobMenu.hamburger.click(toggleMobileMenu);
			/* Show SubMenu */
			mobMenu.outer.find("li.hasChild > a").click(showSubMenu);
			/* Go Back */
			mobMenu.outer.find("li.back").click(goBack);

			$(".lightbox-background").bind('mousedown touchstart', function() {
				if ($("." + mobMenu.settings.hamburgerId).hasClass('open')) {

					toggleMobileMenu();
				}
				return false;
			});

		}

		function getCookie(cName) {
			var name = cName + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		function setSessionCookie(cName, cValue) {
			document.cookie = cName + "=" + cValue + ";path=/";
		}

		/* Mobile menu code ends here */

	function handleSmoothScroll(hashid) {
		var mobileOffset = NVIDIAGDC.Browser.getUrlParameter("m") ? NVIDIAGDC.Browser.getUrlParameter("m") : 0,
			tabletOffset = NVIDIAGDC.Browser.getUrlParameter("t") ? NVIDIAGDC.Browser.getUrlParameter("t") : 0,
			laptopOffset = NVIDIAGDC.Browser.getUrlParameter("l") ? NVIDIAGDC.Browser.getUrlParameter("l") : 0,
			desktopOffset = NVIDIAGDC.Browser.getUrlParameter("d") ? NVIDIAGDC.Browser.getUrlParameter("d") : 0,
			targetOffset = $(hashid).offset().top,
			newTargetOffset = 0,

			globalNav = $(".global-nav"),
			navHeader = $(".nav-header").height(),

			subBrandNav = $(".sub-brand-nav"),
			subBrandNavHeight = subBrandNav.height(),

			breadCrumbOBj = $(".breadCrumbNav").find(".subnav"),
			breadCrumbOBjHeight = breadCrumbOBj.height();

		// defaultOffset = (scrollDirection == 'down') ? subBrandNavHeight : globalNavHeight; 
		defaultOffset = subBrandNavHeight + breadCrumbOBjHeight,
			viewport = NVIDIAGDC.Browser.getViewport();

		switch (viewport) {
			case "mobile": defaultOffset -= mobileOffset;
				break;
			case "tablet": defaultOffset -= tabletOffset;
				break;
			case "laptop": defaultOffset -= laptopOffset;
				break;
			case "desktop":
			default: defaultOffset -= desktopOffset;
		}

		function reTrigger() {

			$("html, body").stop().animate({
				scrollTop: targetOffset - defaultOffset + "px"
			}, 1500, "linear", function () { // handles dynamically changing of Element offset.
				newTargetOffset = $(hashid).offset().top;

				if (targetOffset == newTargetOffset) {
					return false;
				}
				if (targetOffset < newTargetOffset) {
					targetOffset = newTargetOffset;
					reTrigger();
				}
			})
		}
		reTrigger();
	}

	// method that extends the jarvis session cookie by 20 mns
	// it is invoked when the user clicks or scrolls
	function extendJarvisSession() {
		var sessionData = Cookies.get("nv.nvidmData");
		if (sessionData) {
			var sessionDuration = 1 / (24 * 3);
			Cookies.remove("nv.nvidmData", {
				domain : "nvidia.com"
			});
			Cookies.set("nv.nvidmData", sessionData, {
				domain : "nvidia.com",
				expires : sessionDuration
			});
		}
	}

	function submit2Research(e) {
		e.preventDefault();
		var searchval = $(".search-box-input").val();
		window.location.href = $("#searchform").attr("action") + searchval;
	}






	function toggleSearchBar(e) {
		e.preventDefault();
		//console.log("Search")
		
		if($('.navoverlay').hasClass('navoverlay-display') && $('.nv-menu').hasClass('menuopen')){
			 $('.navoverlay').click();
		}
   		
		if($("#dropdown-arrow").hasClass( "dropdown-expanded")){
                 $( "#dropdown-arrow" ).trigger( "click" );
        }
		$(".search-outter-container").toggleClass( "hide-wid-0" );
		$(".search-abort-container").toggleClass( "hide" );
		$(".searchoverlay").toggleClass( "searchoverlaydisplay" );
		$(".search_white").toggleClass( "search-shown");
		$('.search-form').focus;
		if($(".search-outter-container").hasClass("hide-wid-0")){
			$(".nav-search-icon").fadeToggle(200);
			//$(".profile-item").delay(500).fadeToggle(200);
			//$(".cart-item").delay(500).fadeToggle(200);
			//$(".nav-header-container").delay(500).toggleClass("mob-hide-brand");
		}else{
			//$(".nav-header-container").toggleClass("mob-hide-brand");
			$(".nav-search-icon").toggle();
			//$(".profile-item").toggle();
			//$(".cart-item").toggle();
			$('#search-terms').focus();	
		}
	} 
	function searchsubmitvalidation(event) {
		// condition to prevent account page form validation
		if (event.which == 13) {
			event.stopPropagation();
		}
	}



	function backToTop() {
		if ($(window).scrollTop() == 0) {
			return;
		}
		$("html, body").animate({
			scrollTop : 0
		}, 500, "linear");
	}

	function hightlightElementSelected($selected) {
		removeHighlighting();
		// console.log($selected);
		if (!$selected.hasClass("cta")) {
			$selected.parent().addClass("selected");
		}
	}

	function removeHighlighting() {
		$(".breadcrumb-element").removeClass("selected");
	}





	function smoothScroll(e) {
		if ($(this.parentElement).attr("target") !== "overlay") {

			/** Adding Logic for Tab highlight **/            
			if ($(this.parentElement).attr("data-activetab")) {
				var tabcomponentparam =  $(this.parentElement).attr("data-activetab");
				var tabancrid = tabcomponentparam.substring(0, tabcomponentparam.lastIndexOf("-") + 0);
				var tabancrindx = tabcomponentparam.substring(tabcomponentparam.lastIndexOf("-") + 1, tabcomponentparam.length);                
				var tabelement = '#' + tabancrid;
			    var $ultabs=$('#' + tabancrid).find('>.tabs-wrapper');
			    var $tabcontainer=$('#' + tabancrid).find('>div.tab-container');
				   	
				if ($ultabs.find('>ul.tabs >li:nth-child(' + tabancrindx + ')').length) {            
					var li = $ultabs.find('>ul.tabs >li');
					var tabContent = $tabcontainer.find('>.tab-content');            
					
					li.removeClass('current');            
					tabContent.removeClass('current');
					/*check if its embeded*/
					var $isembed=$('#' + tabancrid).parent().closest(".tabblock"); 
					if($isembed.length){
						/*reset current for parent Tabs*/
						$isembed.find('>.tabs-wrapper >ul.tabs >li').removeClass('current'); 
						$isembed.find('>.tab-container >.tab-content').removeClass('current');	
						$closestparentTab=$('#' + tabancrid).closest(".tab-content");
						var currentindex=$closestparentTab.index()+1;
						$isembed.find('>.tabs-wrapper >ul.tabs >li:nth-child(' + currentindex + ')').addClass('current');
						$closestparentTab.addClass('current');
					}
					var $p =  $ultabs.find('>ul.tabs >li:nth-child(' + tabancrindx + ')');
					$p.addClass('current');
					
					var calcposition = 0;
					$p.parent().scrollLeft(calcposition);
					calcposition = ($p.offset().left)-(($(window).width())/2) + 90;
					var position = $p.position();
					$p.parent().scrollLeft(calcposition);
					$tabcontainer.find('>div:nth-child('+ tabancrindx + ')').addClass('current');
				} else {        	
					setFirstTabContentCurrent($(tabelement));
				}
			}            
			/** End of Logic for Tab highlight **/
			var id, $linkSelected;
			$(".subnav").data("auto-scrolling", "yes");
			if (e.target.nodeName === "SPAN") {
				$linkSelected = $(this.parentElement);
				id = $linkSelected.attr("href");
				hideSubnavMenu($("#subnav-menu"));
			} else if (e.target.nodeName === "DIV") {
				$linkSelected = $(this.parentElement);
				id = $linkSelected.data("href");
				$linkSelected = $(".breadcrumb-element a[href='" + id + "']");
			} else {
				// for subnav links, not including the CTA
				$linkSelected = $(this.parentElement);
				id = $linkSelected.attr("href");
			}
			
			if(id.startsWith("#")){
				scrollPos = 0;
				e.preventDefault();
				e.stopPropagation();
				var $id = $(id);
				// in case the author puts the wrong href
				if ($id.length === 0) {
					return;
				}
				var sp = $(id).offset().top;
				st = $(window).scrollTop();
				if (sp == st) {
					return;
				}
				hideHeader();
				if (windowWidth < 768) {
					scrollPos = sp - 81;
				} else if (windowWidth < 1025) {
					scrollPos = sp - 101;
				} else {
					scrollPos = sp - 135;
				}
				$("html, body").animate({
					scrollTop : scrollPos
				}, 500, "linear").promise().then(function() {
					setTimeout(function() {
						$(".subnav").data("auto-scrolling", "no");
					}, 100);
					hightlightElementSelected($linkSelected);
				});
	
				return false;
			}
		}
	}

	function determineLinkToHightight(st) {
		var elementHeight, headerSize, $pageElement;
		// determing the header size base on the vertical direction of scrolling
		if (scrollingDown) {
			headerSize = 109;
		} else {
			headerSize = 179;
		}
		var activebreadcrumbindex = 0;       
		for (i = 0; i < pageElements.length; i++) {
			$pageElement = $(pageElements[i]);
			var breadcrumbactiveindex = 0;
			breadcrumbactiveindex = $((($pageElement.find(".tabcomponentenhanced")).find(".tabs")).find("li.current")).index();           
			if (breadcrumbactiveindex >= 0){
				activebreadcrumbindex = breadcrumbactiveindex + 1; 
			}else{
				activebreadcrumbindex = i;
			}           
			// handling the case when the author populates the breadcrumb with
			// wrong hrefs
			if ($pageElement.length != 0) {
				elementHeight = $pageElement.height();
				elementPosition = $pageElement.offset().top;
				if (elementPosition - headerSize <= st
					&& st <= elementPosition - headerSize + elementHeight) {
					hightlightElementSelected($("#sub-btn" + activebreadcrumbindex));
				break;
			} else {
				removeHighlighting();
			}
		}
	}
}

function toggleHeader() {
	if ($(".subnav").data("auto-scrolling") == "yes" || $('.no-hamburgler').length ) {
			// console.log("left toggle scroll call back function bevause we are
			// autoscrolling" or sidenav is open );
			return;
		}
		// console.log("inside toggle header, autoscrolling is :" +
		// $(".subnav").data("auto-scrolling"));
		windowWidth = $(document).width();
		st = $(window).scrollTop();
		if (windowWidth > (NVIDIAGDC.desktopBreakpoint-1)) {
			determineLinkToHightight(st);
		}
		if (st < initScroll) {
			showHeader();
			scrollingDown = false;
		}
		// handling the case of bounce scrolling for iOs devices
		if (st <= 50) {
			return;
		} else if (st > initScroll) {
			scrollingDown = true;
			hideHeader();
		}
		initScroll = st;
	}

	function hideHeader() {

       if (!$("body").hasClass("nv-megamenu")) {
		$(".global-nav").addClass("pull-up");
		$(".subnav").addClass("pull-up");
		$("#page-content").addClass("pull-up");
        }
		if (!$(".global-menu-overlay").hasClass("hide")) {
			$(".global-menu-overlay").animate({
				top : "66px",
				duration : 500
			});
		}
		if($(".search-outter-container").length && !$(".search-outter-container").hasClass( "hide-wid-0" )){
			$(".searchoverlay").toggleClass( "searchoverlaydisplay" );
			$(".search_white").toggleClass( "search-shown");
			$(".search-outter-container").toggleClass( "hide-wid-0" );
			$(".search-abort-container").toggleClass( "hide" );
			$(".nav-search-icon").delay(500).toggle();
			//$(".profile-item").delay(800).toggle();
			//$(".cart-item").delay(800).toggle();
			//$(".nav-header-container").delay(800).toggleClass("mob-hide-brand");
		}
		headerCollapsed = true;
	}

	function showHeader() {
        var viewport = NVIDIAGDC.Browser.getViewport();
        // $(".nav-header-container").slideDown("500");
       if (!$("body").hasClass("nv-megamenu")) {
        $(".global-nav").removeClass("pull-up");
        $(".subnav").removeClass("pull-up");
        $("#page-content").removeClass("pull-up");
        }
        if (!$(".global-menu-overlay").hasClass("hide") && viewport == "desktop") {
            $(".global-menu-overlay").animate({
                top : "100px",
                duration : 500
            });
        }
        headerCollapsed = false;
    }
	function checkSize() {
		//hideBrandnavMenu($(".mobile-menu-container"));

		checkBrandNavSize(this.options);
	}

	function checkBrandNavSize(options) {
		
			if(NVIDIAGDC.isBrandPage){
				
			var brandNavWidth = $(".brand-nav-left").width(), brandNavContainerWidth = $(
				".sub-brand-nav-container").width(), BrandNavSize = $(".sub-brand-item").length, savedWidth = 0;
			var totalElementswidth = 0;
			$(".sub-brand-item").each(function() {
				totalElementswidth += $(this).outerWidth(true);
			});
			windowWidth = window.innerWidth;
			if (windowWidth > (NVIDIAGDC.desktopBreakpoint-1)) {
				hideBrandnavMenu($(".mobile-menu-container"));
			}
	
			// handling corporate brand navigation overflow
			if (options.globalSite) {
				while (windowWidth > (NVIDIAGDC.desktopBreakpoint-1) && totalElementswidth - savedWidth > brandNavContainerWidth - 100) {
					savedWidth = savedWidth
					+ $(".sub-brand-item").eq(visibleCount - 2).width();
					$(".sub-brand-item").eq(visibleCount - 2).addClass("hide");
					$(".more-element").eq(visibleCount - 3).removeClass("hide");
					windowWidth = $(document).width();
					brandNavContainerWidth = $(".sub-brand-nav-container").width();
					visibleCount--;
	
				}
			}
			// handling brand navigation overflow
			else {
				while (windowWidth > (NVIDIAGDC.desktopBreakpoint-1) && totalElementswidth - savedWidth > brandNavContainerWidth - 250 && visibleCount > 0) {
					savedWidth = savedWidth
					+ $(".sub-brand-item").eq(visibleCount - 2).width();
					$(".sub-brand-item").eq(visibleCount - 2).addClass("hide");
					$(".more-element").eq(visibleCount - 2).removeClass("hide");
					windowWidth = $(document).width();
					brandNavContainerWidth = $(".sub-brand-nav-container").width();
					visibleCount--;
	
					showMore = true;
				}
				if (showMore) {
					$(".sub-brand-item").last().removeClass("hide");
				}			
			}
			
			if (!checkBrandNavSizeCalled) {
				$(".brand-nav-left").addClass("in");
			}
			checkBrandNavSizeCalled = true;
			
			if (screenSize >= desktopBreakpoint) {
	            //console.log(screenSize);
	            if ($('#brand-cta-button').length) {
	                var brandCTA = $('.sub-brand-nav').find('#brand-cta-button').width();
	                var brandCTAwidth = brandCTA + 20;
	                $(".brand-nav-left").css({
	                    'width': 'calc(100% - ' + brandCTAwidth + 'px)'
	                });
	            } else {
	                $(".brand-nav-left").css('width', 100 + '%');
	            }
	        }
		}
	}

	function toggleMainHeaderMenu() {
		if(this.$element.find(".searchoverlay").hasClass("searchoverlaydisplay")){
				 $( ".searchoverlay" ).trigger( "click" );
		}
		var overlayElement = this.$element.find(".global-menu-overlay");
		if (overlayElement.hasClass("hide")) {
			overlayElement.removeClass("hide").addClass("show");
			overlayElement.outerWidth();
			overlayElement.addClass("in");
			$(document.body).addClass("noscroll");
			this.$element.find("#dropdown-arrow").addClass("dropdown-expanded");
		} else {
			overlayElement.removeClass("in");
			overlayElement.removeClass("show").addClass("hide");
			$(document.body).removeClass("noscroll");
			this.$element.find("#dropdown-arrow").removeClass(
				"dropdown-expanded");
		}
	}

	function toggleSubnavMenu() {
		var overlayElement = this.$element.find("#subnav-menu");
		if (overlayElement.hasClass("hide")) {
			overlayElement.removeClass("hide").addClass("show");
			this.$element.find(".subnav").css({
				height : "100vh",
				opacity : 1
			});
			this.$element.find(".ic-expand").addClass("ic-expand-green");
			$(document.body).addClass("noscroll");
		} else {
			hideSubnavMenu(overlayElement);
		}
	}

	function hideSubnavMenu(overlayElement) {
		overlayElement.removeClass("in show").addClass("hide");
		$(".subnav").removeAttr("style");
		$(".ic-expand").removeClass("ic-expand-green");

		$(document.body).removeClass("noscroll");
		if($(window).width()<NVIDIAGDC.desktopBreakpoint && $(".hide-unibrow").length<1){
            $(".subnav").css("marginTop", $("#unibrow-container").css("height"));
        }
	}
	
	function resetsideNav (){
		if ($(".hamburgler").length && ($(".hamburgler").hasClass("no-hamburgler"))) {
			$(".hamburgler").toggleClass('no-hamburgler sidenav-open sidenav-close');
            $("#docarea").toggleClass("tab-hide mob-hide lap-hide");
			$("#sidebarnav").toggleClass("tab-hide mob-hide lap-hide");
            $(".footer").toggleClass("tab-hide mob-hide lap-hide");
			//$("#main-header").toggleClass("tab-hide mob-hide lap-hide");
            //$(".global-nav").toggleClass("pull-up");
    		//$(".subnav").toggleClass("pull-up");
    		//$("#page-content").toggleClass("pull-up");
            $(".global-nav").css('top', '');
			$("#page-content").css('height', '');
			$(".breadcrumb.breadCrumbNav").css('display', '');
			

		}
		
	}

	/*
	 * function toggleBrandnavMenu() { var overlayElement =
	 * this.$element.find(".mobile-menu-container"); if
	 * (overlayElement.hasClass("hide")) {
	 * overlayElement.removeClass("hide").addClass("show");
	 * overlayElement.outerWidth(); overlayElement.addClass("in");
	 * this.$element.find(".ic-menu").addClass("ic-menu-green");
	 * $(document.body).addClass("noscroll"); } else {
	 * hideBrandnavMenu(overlayElement); } }
	 */

	 function hideBrandnavMenu(overlayElement) {

	 	overlayElement.removeClass("in");
	 	overlayElement.removeClass("show")/*.addClass("hide");*/
	 	$(".ic-menu").removeClass("ic-menu-green").removeClass('open');
	 	$('.mobile-menu-container').removeClass('active');
	 	$('.mobile-menu-container').css({
	 		'overflow' : 'hidden',
	 		'height' : '0px',
	 		'transition' : 'all 0.5s'
	 	});
	 	setTimeout(function() {
	 		$('.mobile-menu-container').css({
	 			'display' : 'none'
	 		});
	 	}, 500);
	 	menuToggle.reverse();

	 	$(document.body).removeClass("noscroll");
	 }

	 function toggleSolutionsMenu() {
	 	var overlayElement = this.$element.find(".global-menu-overlay");
	 	if (overlayElement.hasClass("hide")) {
	 		if ($("#page-content").hasClass("pull-up")) {
	 			overlayElement.css({
	 				transition : "none",
	 				top : "66px",
	 				left : "0"
	 			});
	 		} else {
	 			overlayElement.css({
	 				transition : "none",
	 				top : "100px",
	 				left : "0"
	 			});
	 		}
	 		overlayElement.removeClass("hide").addClass("show");
	 		overlayElement.outerWidth();
	 		overlayElement.addClass("in");
	 	} else {
	 		overlayElement.removeClass("in");
	 		overlayElement.removeClass("show").addClass("hide");
	 		overlayElement.removeAttr("style");
	 	}
	 }

	 function openModal(e) {
	 	e.preventDefault();
	 	var screenSize = $(window).width();
	 	var imageURL = $(this).attr("href");
	 	var isInline = false;
	 	var isIframe = false;
	 	var isYoutube = false;
	 	$('body').addClass('noscroll');
	 	if (imageURL.indexOf("youtube") != -1) {
	 		isYoutube = true;
			// console.log("Its youtube ...");
			var videoId = getUrlParam("v", imageURL);
			var listId = getUrlParam("list", imageURL);
			if (videoId != null) {
				imageURL = "https://www.youtube.com/embed/" + videoId;
				if (listId != null)
					imageURL = imageURL + "?list=" + listId;
			}
		}
		if (imageURL.indexOf("#") != -1) {
			isInline = true;
		} else {
			isIframe = true;
		}
		defaultOptions = {
			inline : isInline,
			iframe : isIframe,
			width : "80%",
            height: "auto",
			maxHeight : "80%",
			href : imageURL,
			onComplete : function() {
            	if($('.aemformcontainer').parents('.modal-content').is(":visible")) {
            		if($('.ui-front')) {
            			$('.ui-front').css('z-index','10000');
            		}
            		/*if(NVIDIAGDC.Browser.getViewport() === "mobile"){
            			$(this).colorbox.resize({width: screenWidth, height: screenHeight});
            		}*/
            	}  
            }
		};
         var screenWidth = $(window).width() - 30;
         var screenHeight = $(window).height() - 30;
		if (screenSize <= tabletBreakpoint) {
			if (isYoutube) {
				defaultOptions.height = screenSize * 9 / 16;
			} else {
				defaultOptions.height = "auto";
			}
			defaultOptions.width = screenWidth;
			defaultOptions.maxHeight = screenHeight;
		} else if(screenSize > tabletBreakpoint && screenSize <= desktopBreakpoint) {
			if (isYoutube) {
				defaultOptions.height = screenSize * 9 / 16;
			} else {
				defaultOptions.height = screenHeight;
				if(isIframe) {
					defaultOptions.height = screenHeight;
				}
			}
			defaultOptions.width = screenWidth;
            defaultOptions.maxHeight = screenHeight;
        } else {
			if (isYoutube) {
				defaultOptions.height = "480px";
                defaultOptions.width = "854px";
			} else if(isInline) {
				defaultOptions.height = $(imageURL).data("height") ? $( imageURL).data("height") + "px" : defaultOptions.maxHeight;
                defaultOptions.width = $(imageURL).data("width") ? $( imageURL).data("width") + "px" : defaultOptions.width;
            } else {
                defaultOptions.height = defaultOptions.maxHeight;				
            }
		}
		$.colorbox(defaultOptions);
		// AD-1188 fixing breadcrumb modal issue
		$("#cboxClose").off().on("click", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            $.colorbox.close();
            if($('body').hasClass('noscroll')) {
                $('body').removeClass('noscroll');
            }
        });
	}

	function getUrlParam(name, url) {
		var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(url);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}
	

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this
		.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this,
					options));
			}
		});
	};
})(jQuery, window, document);

/* jslint browser: true */
/* global window document console navigator gsap CSSRulePlugin Draggable EasePack InertiaPlugin ScrollToPlugin ScrollTrigger TextPlugin $ */
/* eslint no-console: "off" */
(function() {
    'use strict';
    if(typeof gsap !== 'undefined'){
    // Set GSAP defaults...
    gsap.defaults({
        overwrite: "auto"
    });

    // Register GSAP Plugins...
    
    // gsap.registerPlugin(CSSRulePlugin, Draggable, EaselPlugin, EasePack, PixiPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger, DrawSVGPlugin, Flip, GSDevTools, InertiaPlugin, MorphSVGPlugin, Physics2DPlugin, PhysicsPropsPlugin, ScrambleTextPlugin, SplitText);
    //gsap.registerPlugin(CSSRulePlugin, Draggable, EasePack, TextPlugin, ScrollToPlugin, ScrollTrigger, DrawSVGPlugin, GSDevTools, InertiaPlugin,  Physics2DPlugin, PhysicsPropsPlugin);
    // gsap.registerPlugin(CSSRulePlugin, Draggable, EasePack, InertiaPlugin, ScrollToPlugin, ScrollTrigger, SplitText, TextPlugin);
    gsap.registerPlugin(Draggable, InertiaPlugin, ScrollToPlugin, ScrollTrigger);
    gsap.defaults({overwrite: "auto"});
    TweenMax.killDelayedCallsTo = gsap.killTweensOf;
    TweenMax.to = gsap.to;
    TweenMax.delayedCall = gsap.delayedCall;
    TweenMax.set = gsap.set;

    
    
    // gsap.registerPlugin(CSSRulePlugin, Draggable, EasePack, InertiaPlugin, ScrollToPlugin, ScrollTrigger, SplitText, TextPlugin);

    if (typeof NV === 'undefined') {
        var NV = {};
    }

    NV.winWidth = window.innerWidth;
    NV.winHeight = window.innerHeight;
    NV.vh = NV.winHeight;

    NV.isHomePage = undefined;
    NV.interiorPageNavCollapseTimer = undefined;
    NV.megaNavCollapsed = undefined;
    NV.megaNavCollapsingOrExpanding = undefined;

    NV.accessibilityMode = false;

    NV.megaNavOpen = false;
    NV.megaNavAccordionOpen = false;
    NV.autoOpenFirstChildAccordion = false;

    NV.forYouOpened = false;
    NV.forYouPreferenceId = undefined;
    NV.mainMenuButtonsDesktopReady = false;

    NV.accordionMenuItemNumbers = [1, 2, 34, 69, 102, 120, 121, 142, 175, 212, 237, 265, 277]; // Hard-coded accordion menu item numbers (for now...)

    NV.currentAccordionNumber = 0; // Current accordion number...  init at 0 since there is no current accordion menu selected yet...
    NV.previousAccordionNumber = -1; // Previous accordion number... init at -1 since there was no previous accordion menu selected yet...

    NV.currentMegaMenuLevel = 1; // Current mega menu level is 1... the top level menu items get exposed in laptop/desktop viewport, but hidden in mobile/tablet...
    NV.previousMegaMenuLevel = 1; // We always start at mega menu level 1, so let the previous start at 1 too...

    NV.currentLevel1ParentId = 1; // Current Level 1 Parent id is 1, which is Products.
    NV.currentMegaMenuLevel1Parent = undefined; // Init at undefined until a menu item is selected and its parent selector can be determined in level 1.
    NV.currentMegaMenuLevel2Parent = undefined; // Init at undefined until a menu item is selected and its parent selector can be determined in level 2.

    NV.currentMegaMenuHashArray; // The current mega menu hash array for in-page scrolls or an alternative way of activating mega menu features...

    NV.responsiveOrientation = (NV.winWidth <= NV.winHeight) ? "portrait" : "landscape"; // The current responsive orientation determined by comparing window width to window height...
    NV.responsiveIndex = 1; // 0 = WATCH, 1 = MOBILE PHONE, 2 = TABLET, 3 = LAPTOP, 4 = DESKTOP, 5 = 4K ULTRA-WIDE DESKTOP...
    NV.previousResponsiveIndex = 0; // Initial value is zero until browser window resizes or orientation changes occur...
    NV.responsiveBreakpoints = [0, 320, 640, 1024, 1350, 2560]; // NVIDIA Components 2.0 Breakpoints according to Design Specifications / Guidelines...
    NV.responsiveBreakpointLabels = ["WATCH", "PHONE", "TABLET", "LAPTOP", "DESKTOP", "ULTRA-WIDE"]; // Descriptive labels for responsive index for debugging etc...
    NV.previousResponsiveBreakpoint = NV.responsiveBreakpoints[NV.previousResponsiveIndex]; // The previous responsive breakpoint's CSS media query min-width value...  
    NV.responsiveBreakpoint = NV.responsiveBreakpoints[NV.responsiveIndex]; // The current responsive breakpoint's CSS media query min-width value...
    NV.responsiveBreakpointLabel = NV.responsiveBreakpointLabels[NV.responsiveIndex]; // The current responsive breakpoint's label for debugging etc...

    NV.pageAnimationsReady = false; // If true, all required gsap tweens and timelines have been defined and are ready for action...
    NV.isResizing = false; // If true, browser window is being actively resized...
    NV.fxEnabled = false; // If true, animate CSS filters Brightness and Blur : If false, animate opacity only...
    NV.fxForbidden = false; // If true, animated CSS filters are NOT ALLOWED : If false, let the state of fxEnabled determine this feature...
    NV.transitionsEnabled = true; // If true, do transitions between slides : If false, NO transitions...
    NV.transitionsForbidden = false; // If true, NO TRANSITIONS. EVER. They *must* stay off : If false, let the state of transitionsEnabled determine this feature...

    NV.is_Mobile = (/Android|webOS|iPhone|iPad|iPod|BB10|PlayBook|BlackBerry|Silk/.test(navigator.userAgent)); // Detect if this is a mobile device based on user agemt...
    NV.is_iOS = (!!navigator.userAgent.match(/iP(hone|ad)/i)); // Detect is this is an iOS device, based on useragent... iPod, iPhone, iPad
    NV.is_iPhone = (/iPad|iPhone/.test(navigator.userAgent)); // Detect if this is iPhone (or even iPad in disguise)...
    NV.is_Android = (/Android/.test(navigator.userAgent)); // Detect if this is an Android device based on user agent...
    NV.is_Desktop = (!NV.isMobile); // A desktop computer tower is pretty much the opposite of a mobile phone...
    NV.is_Firefox = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1); // Detect if the browser is Firefox based on the user agent...
    NV.is_Chrome = (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)); // Detect if the browser is Chrome based on the user agent...
    NV.is_Safari = (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)); // Detect if the browser is Safari, based on the user agent AND vendor...
    NV.is_Edge = (navigator.appVersion.indexOf('Edge') > -1); // Detect if the browser is Microsoft Edge...
    NV.is_MSIE = (navigator.appName == 'Microsoft Internet Explorer') ? true : (navigator.appVersion.indexOf('Trident') > -1) ? true : false; // Detect for living dead browser pains ahead...


    // METHOD TO DELETE COOKIES DURING TESTING...



    var isMobile = NVIDIAGDC.Browser.getViewport() == "mobile";
    var isTablet = NVIDIAGDC.Browser.getViewport() == "tablet";

  //  if (isMobile || isTablet) {




        // Store the viewport height in a CSS Variable...
        document.documentElement.style.setProperty('--vh', NV.vh + 'px');

        // Browser detection for any fallbacks or polyfills that may be required after QA testing...
        if (NV.is_Mobile || NV.is_iOS || NV.is_iPhone || NV.is_Android) {

            if (NV.is_iOS) {

                NV.st = window.pageYOffset;
            }

            NV.fxEnabled = false;
            NV.transitionsEnabled = false;
            NV.transitionsForbidden = true;
        } else {

            if (NV.is_Firefox || NV.is_Edge || NV.is_MSIE || NV.is_Safari) {
                if (NV.is_MSIE) {

                    patchMSIE();
                }
                if (NV.is_Safari) {

                }
                NV.fxEnabled = false;
                NV.transitionsEnabled = false;
                NV.transitionsForbidden = true;
            } else {
                if (NV.is_Chrome) {

                    NV.fxEnabled = true;
                    NV.transitionsEnabled = true;
                }
            }
        }


        // If transitions need to be disabled for performance reasons... force static mode.


        // Patch MSIE 11 with polyfills...
        function patchMSIE() {

        }


        // TOGGLE MEGA NAV OPEN... if its open, close it. If its closed, open it. Keep track of its state in this NV.megaNavOpen boolean value.

        function toggleMegaNavOpen() {


            reportSizes();

            if (NV.megaNavOpen == true) {

                // MEGA NAV IS OPEN, SO... CLOSE IT.
                closeMegaNav();
                NV.megaNavOpen = false;

            } else if (NV.megaNavOpen == false) {

                // MEGA NAV IS CLOSED, SO... OPEN IT.
                openMegaNav();
                NV.megaNavOpen = true;
            }
        }


        function openMegaNav() {



            // MEGA MENU OPEN STATE

            // console.log($(".searchoverlay").hasClass('searchoverlaydisplay')&& $(".search_white").hasClass("search-shown"));

            if ($(".mobile-nav").find(".searchoverlay").hasClass("searchoverlaydisplay") && $(".mobile-nav").find(".search_white").hasClass("search-shown"))
                $(".mobile-nav").find(".searchoverlay").click();


            if ($('.cart').hasClass('cart--shown')) {
                $('.cart__close').click();
            }



            //addClass("mega-menu-open", "body"); // When menu-open is added, stop overflow of body to prevent page scrolling
            addClass("megamenu-open", ".sub-brand-nav .brand-nav-right");
            addClass('noscroll', 'body');

            // Show overlay
            showOverlay();

            removeClass('hide', '.mega-menu'); // Show the mega menu

            addClass('hide', '#mega-nav-open-menu-icon'); // Hide the open menu icon
            removeClass('hide', '#mega-nav-close-menu-icon'); // Show the close menu icon


            if (NV.responsiveIndex <= 2) {

                // CLOSE MEGA NAV :: MOBILE: 1 / TABLET: 2

                // Animate mega menu from left to right... (from -winWidth to 0 for mobile, or from -400 pixels to 0 pixels for tablet)...
                var distanceLeft = (NV.responsiveIndex < 2) ? -(NV.winWidth) : -400;
                gsap.killTweensOf(".mega-menu");
                gsap.killTweensOf(".mega-nav");

                gsap.fromTo('.mega-menu', {
                    left: distanceLeft,
                    height: NV.vh - 44
                }, {
                    duration: 0.5,
                    left: 0,
                    height: NV.vh - 44,
                    clearProps: "height",
                    ease: "cubic.out",
                    delay: 0.1
                });
                gsap.fromTo('.mega-nav', {
                    position: "absolute"
                }, {
                    duration: 0.5,
                    position: "fixed",
                    zIndex: 999,
                    ease: "cubic.out",
                    delay: 0.1
                });


            } else {

                // CLOSE MEGA NAV :: LAPTOP: 3 / DESKTOP: 4 / ULTRA-WIDE: 5

                // Animate mega menu from height at 44 to height at auto, and keep left at zero...
                gsap.killTweensOf(".mega-menu");
                gsap.fromTo('.mega-menu', {
                    left: 0,
                    height: 44
                }, {
                    duration: 0.5,
                    left: 0,
                    height: "auto",
                    ease: "cubic.out",
                    delay: 0.1
                });
            }

            NV.megaNavOpen = true;

        }

        function closeMegaNav() {



            // MEGA MENU CLOSED STATE

          //  removeClass('mega-menu-open', 'body'); // When menu is not open, allow body to scroll normally
            removeClass("megamenu-open", ".sub-brand-nav .brand-nav-right");
            removeClass('noscroll', 'body');
            // Hide overlaymegaNavCollapsingOrExpanding
            hideOverlay();

            removeClass('hide', '#mega-nav-open-menu-icon'); // Show the open menu icon
            addClass('hide', '#mega-nav-close-menu-icon'); // Hide the close menu icon

            removeClass('active', '.mobile-nav li.menu-level-1'); // Remove active state from all menu-level-1
            removeClass('active', '.mobile-nav li.menu-level-2'); // Remove active state from all menu-level-1

            removeClass('active', '.mobile-nav .mega-menu > .menu-accordion > ul'); // Remove active state from all unordered lists
            removeClass('active', '.mobile-nav .mega-menu > .menu-accordion > li'); // Remove active state from all list items

            removeClass('open', '.mobile-nav .mega-menu > .menu-accordion > ul'); // Remove open state from all unordered lists
            addClass('closed', '.mobile-nav .mega-menu > .menu-accordion > ul'); // Add closed state to all unordered lists
            removeClass('open', '.mobile-nav .mega-menu > .menu-accordion > li'); // Remove open state from all list items
            addClass('closed', '.mobile-nav .mega-menu > .menu-accordion > li'); // Add closed state to all list items

            removeClass('open', '.menu-button.caret-down'); // Close all accordions

            addClass('closed', '.mobile-nav ul.menu-accordion'); // Close all accordion unordered lists
            addClass('hide', '.mobile-nav ul.menu-accordion'); // Hide all accordion unordered lists
            removeClass('active', '.mobile-nav ul.menu-accordion'); // Remove active state from all menu-accordion unordered lists
            removeClass('open', '.mobile-nav ul.menu-accordion'); // Remove open state from all menu-accordion unordered lists

            removeClass("active", ".mobile-nav li.mm-1"); // 
            $(".mobile-nav li.mm-1 > a > svg").attr("class", "n24-icon menu-button caret-down"); // 

            // closeAllAccordionMenus(NV.currentAccordionNumber);                              // Close all accordion menus (except the current accordion)
            closeAllAccMenus();

            //window.location.hash = "";



            if (NV.responsiveIndex <= 2) {
                // CLOSE MEGA NAV :: MOBILE: 1 / TABLET: 2
                var distanceLeft = (NV.responsiveIndex < 2) ? -(NV.winWidth) : -400;
                gsap.killTweensOf(".mega-menu");
                gsap.killTweensOf(".mega-nav");

                gsap.fromTo('.mega-menu', {
                    left: 0,
                    height: "auto"
                }, {
                    duration: 0.5,
                    left: distanceLeft,
                    height: NV.vh - 44,
                    ease: "cubic.out",
                    clearProps: "height",
                    delay: 0.25,
                    onComplete: function() {
                        addClass('hide', '.mega-menu'); // Hide the mega menu
                    }
                }); // Animate mega menu from right to left at -400 pixels.
                gsap.fromTo('.mega-nav', {
                    position: "fixed"
                }, {
                    duration: 0.5,
                    position: "absolute",
                    zIndex: 1,
                    ease: "cubic.out",
                    delay: 0.9
                });

            } else {
                // CLOSE MEGA NAV :: LAPTOP: 3 / DESKTOP: 4 / ULTRA-WIDE: 5
                removeClass('hide', '.mega-menu');
                gsap.killTweensOf(".mega-menu");
                gsap.fromTo('.mega-menu', {
                    left: 0,
                    height: "auto"
                }, {
                    duration: 0.5,
                    left: 0,
                    height: 44,
                    ease: "cubic.out",
                    delay: 0.25
                });
            }

            NV.megaNavOpen = false;
        }




        // COOKIE METHODS for Mega Nav..

        function setSessionCookie(cName, cValue) {
            //console.log("setSessionCookie :: ", cName + "=" + cValue + ";path=/");
            document.cookie = cName + "=" + cValue + ";path=/";
        }



        function getCookie(cName) {

            // console.log("getCookie", cName);

            var name = cName + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    // console.log(c.substring(name.length, c.length));
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }



        function checkCookies() {

            // console.log("checkCookies :: MEGA NAV preferences...");

            var _megaNavCollapsed = getCookie("megaNavCollapsed");

            if (_megaNavCollapsed != "" && _megaNavCollapsed != null && _megaNavCollapsed != 'none') {

            } else {

            }
            var _forYou = getCookie("forYouPrefs");

            if (_forYou != "" && _forYou != null && _forYou != 'none') {




            }
        }


        // ON DOCUMENT READY...

        $(document).ready(function() {

            initPageAnimations();

            NV.winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);



            // Check the browser window's width on initial page load...
            checkSize();

            // Check the browser window's width on resize...
            $(window).resize(checkSize);

            window.addEventListener('orientationchange', onOrientationChange);

            $("#menu-toggle").on("click",function() {
                toggleMegaNavOpen();
            });

            $("#mega-nav li").on('click', function(e) {
                e.stopPropagation();
                openAccMenu($(this))
            });


            $(".mega-overlay").on("click", function() {
                closeMegaNav();
                NV.megaNavOpen = false;
                if (!NV.isHomePage && NV.responsiveIndex > 2) {
                    collapseMegaNavOnBrandPage();
                }
            });

            $('.nav-search-icon').click(function() {
                if (NV.megaNavOpen) {
                    closeMegaNav();
                }

                if ($('.cart').hasClass('cart--shown')) {
                    $('.cart__close').click();
                }




            });

            $(".nvcarticon").click(function() {
                //console.log(NV.megaNavOpen)
                if (NV.megaNavOpen) {
                    closeMegaNav();
                }
                if ($(".searchoverlay").hasClass('searchoverlaydisplay') && $(".search_white").hasClass("search-shown")) {
                    $(".searchoverlay").trigger("click");
                }


            })



            //  initAccordionMenuToggles();

            // HACK: Note that the arrow function below may require writing differently for Internet Explorer 11 or other browsers (might be ES6 syntax?),
            // not sure how other page links may respond to it yet. May need refinement to apply only to MEGA MENU ACCORDION ITEMS...


            // If the href of a link is an in-page anchor link for an accordion item, smooth scroll to it...



            $('.mega-menu a[href]').each(function() {

                $(this).click(function(e) {
                    // console.log("Clicked", $(this).attr('href'), $(this), e)

                    scrollToHashAnchor($(this).attr('href'), e);

                })

            })

            // Check window.location.pathname string to determine if we're currently on an interior brand page in "LAPTOP" or "DESKTOP" breakpoint,
            // and if so, collapse the MEGA NAV level 1 menu items to avoid confusion such as double products or double hamburger, and prioritize focus on the BRAND subnav...

            // checkWindowLocationPathname();        
            // Scroll to the element in the URL's hash on load...        
            // Listen for the hashchange event if navigating to in-page links...

            window.addEventListener("hashchange", checkHash, false);


            // Check cookies on document ready...

            checkCookies();


            // keydown events for up, down, left, right, and space bar...

            $('.mobile-nav').keydown(function(e) {


                var target = e.target;
                var keyCode = e.keyCode;
                var which = e.which

                if (keyCode === 9) {
                	//TAB KEY is pressed.
                    enableAccessibilityMode(true);

                    if (!document.activeElement) {
                        // If there is no current active element on the page with focus...
                        // console.log("document", document.activeElement)

                        $("#menu-toggle").focus();
                    }

                    if ($(target).attr('id') === 'menu-toggle' && (NV.megaNavOpen == true)) {
                        $('.mega-menu').find('li.menu-level-1:first').find('a').focus();
                    }

                    if((NVIDIAGDC.Browser.getViewport() == 'tablet' || 'mobile')){
                        if($(target).parent().hasClass('search-icon-container') && $('.search_white').hasClass('search-shown')){
                            e.preventDefault();
        
                            $('.search-abort').focus();
                        }
        
                        if($(target).hasClass('search-abort')&& $('.search_white').hasClass('search-shown')){
                            e.preventDefault();
                            $('.search-form input').focus().addClass('focusOutline');
            
                        }
            
                        if($(target).hasClass('search-box-input')&& $(target).hasClass('focusOutline')){
                            e.preventDefault();
                            $('.search-form input').removeClass('focusOutline');
                            $('.nav-search-form-icon').focus()
            
            
                        }
                    }
 
                    


                }




                if (keyCode === 13) {
                    // console.log("Enter key pressed", target);
                    if ($(target).attr('id') === 'menu-toggle') {

                        if (NV.megaNavOpen == false) {
                            openMegaNav();
                            NV.megaNavOpen = true;
                        }
                        else if (NV.megaNavOpen == true){
							closeMegaNav();
                            NV.megaNavOpen = false;

                        }
                        $('.mega-menu').find('li.menu-level-1:first').find('a').focus();

                    }



                } else if (keyCode === 27) {
                	
                    // esc key
                    if (NV.megaNavOpen) {

                        //  console.log("NV.currentAccordionNumber: ", NV.currentAccordionNumber);

                        closeMegaNav();

                        NV.megaNavOpen = false;
                        document.activeElement.blur();

                        if (NV.responsiveIndex < 3) {

                            // MOBILE or TABLET...
                            $("#menu-toggle").focus(); // Restore focus to the MENU TOGGLE button...
                        } else {

                            // LAPTOP, DESKTOP, or larger...
                            $("button.menu-button.caret-right").focus(); // Restore focus to main menu toggle button...
                            $("li.mm-1").focus(); // Restore focus to first menu item...
                            //$("#nvidia-logo").focus(); // Restore focus to NVIDIA LOGO...
                        }

                        enableAccessibilityMode(false);
                    }
                }

                //RIGHT arrow key
                else if (which === 39) {

                    if (isTopLevel(target)) {
                        var nextTopMenu = adjacentTopLevelItem(target, 'next');
                        if (nextTopMenu) {
                            e.preventDefault();
                            nextTopMenu.focus();
                        }

                    }
                } else if (which === 37) { // LEFT ARROW
                    //  console.log(target);

                    if (isTopLevel(target)) {
                        var nextTopMenu = adjacentTopLevelItem(target, 'prev');
                        if (nextTopMenu) {
                            e.preventDefault();

                            nextTopMenu.focus();
                        }



                    }

                } else if (keyCode === 38) {
                    // UP arrow key
                    if (isMenuLevel1($(target).parent())) {

                        var nextMenu = adjacentTopLevelItem(target, 'prev');
                        if (nextMenu) {
                            e.preventDefault();

                            nextMenu.focus();
                        }

                    }

                    if (isMenuLevel4($(target).parent())) {

                        var nextMenu = adjacentMenuitem(target, 'prev');
                        if (nextMenu) {
                            e.preventDefault();

                            nextMenu.focus();
                        }

                    }

                    if (isMenuLevel2($(target).parent())) {

                        if ($(target).parent().prev()[0] !== undefined) {

                            $(target).parent().prevAll('li.menu-level-2:first').children('a').focus();
                        } else if ($(target).parent().prev()[0] == undefined) {
                            var t = $(target).parents('ul.menu-level-2').parent().prev('li.menu-level-1')
                            openAccMenu($(t));
                            $(t).children('a').focus();

                        }

                    }


                } else if (keyCode === 40) {
                    // DOWN arrow key
                    // console.log(target)
                    if ($(target).attr('id') === 'menu-toggle') {

                        if (NV.megaNavOpen == false) {
                            openMegaNav();
                            NV.megaNavOpen = true;
                        }
                        $('.mega-menu').find('li.menu-level-1:first').find('a').focus();
                    }

                    if (isMenuLevel1($(target).parent())) {

                        var nextMenu = adjacentTopLevelItem(target, 'next');
                        if (nextMenu) {
                            e.preventDefault();

                            nextMenu.focus();
                        }

                    }

                    if (isMenuLevel2($(target).parent())) {
                        openAccMenu($(target).parent());
                        $(target).parent().next().find('ul.menu-level-3').children('li.menu-level-3:first').find('li.menu-level-4.grid-item:first').children('a.mm-link').focus();

                    }

                    if (isMenuLevel4($(target).parent())) {

                        var nextMenu = adjacentMenuitem(target, 'next');
                        if (nextMenu) {
                            e.preventDefault();

                            nextMenu.focus();
                        }

                    }

                }

            });

        });

        /*KEY FOCUS */

        /*$(".global-nav a, .global-nav button, .global-nav label,.global-nav input[type=radio]").keyup(function() {
            $(this).addClass("focusOutline");
        }).blur(function() {
            $(this).removeClass("focusOutline");
        }); */

        $(".mega-menu a").keyup(function() {
            $(this).addClass("focusOutline");
        }).blur(function() {
            $(this).removeClass("focusOutline");
        });

        $(document).on('keyup', function(evt) {
            if (evt.keyCode == 27) {
               /* $(".global-nav a, .global-nav button, .global-nav label,.global-nav input[type=radio]").removeClass("focusOutline");*/
                $(".mega-menu a").removeClass("focusOutline");
            }
        });

        /* End of key Focus */




        function isTopLevel(t) {
            return ($(t).is('.toplevel'));
        }

        function isMenuLevel2(t) {
            return ($(t).is('.menu-level-2'));
        }

        function isMenuLevel4(t) {
            return ($(t).is('.menu-level-4'))

        }

        function isMenuLevel1(t) {
            return ($(t).is('.menu-level-1'))
        }

        function adjacentTopLevelItem(t, dir) {

            var li = t.parentNode;
            var adjlabel;


            if (dir == 'next') {
                // console.log(t);

                if ($(t).hasClass('toplevel') && $(li).next()[0] !== undefined) {

                    li = $(li).nextAll('.nav-header-item:first');
                    while (($(li).find('a.toplevel')).length == 0 && $(li).next()[0] !== undefined) {

                        li = $(li).nextAll('.nav-header-item:first');

                    }

                    adjlabel = $(li).find('a.toplevel');

                }

                // console.log($(li).hasClass('menu-level-1') ,  !$(li).parents().eq(2).hasClass('menu-right'), !$(t).hasClass('mm-btn-link'))

                if ($(li).hasClass('menu-level-1') && !$(t).parents().eq(2).hasClass('menu-right') && !$(t).hasClass('mm-btn-link')) {

                    openAccMenu($(li))
                    li = $(li).next().find('ul');
                    if ($(li).hasClass('menu-level-2')) {

                        li = $(li).find('li.menu-level-2:first').children('a')
                        adjlabel = li
                    }

                    if ($(li).hasClass('menu-level-3')) {
                        //   console.log($(li).children('li:first').hasClass('menu-level-3'));
                        if ($(li).children('li:first').hasClass('menu-level-3')) {
                            li = $(li).children('li.menu-level-3:first').find('li.menu-level-4.grid-item:first').children('a.mm-link')
                            adjlabel = li
                        } else if ($(li).children('li:first').hasClass('menu-level-4')) {

                            li = $(li).children('li.menu-level-4:first').children('a.mm-link');
                            adjlabel = li
                        }
                    }
                }


                if ($(t).parents().eq(2).hasClass('menu-right') && $(t).hasClass('mm-btn-link')) {
                    //  console.log($(li).next().children('a.mm-btn-link'))
                    li = $(li).next().children('a.mm-btn-link')
                    adjlabel = li

                }

            }

            if (dir == 'prev') {



                if ($(t).hasClass('toplevel') && $(li).prev()[0] !== undefined) {

                    li = $(li).prevAll('.nav-header-item:first');
                    //console.log(li)
                    while (($(li).find('a.toplevel')).length == 0 && $(li).prev()[0] !== undefined) {

                        li = $(li).prevAll('.nav-header-item:first');

                    }

                    if ($(li).prev()[0] == undefined) adjlabel = $(li).find('button.toplevel');
                    else adjlabel = $(li).find('a.toplevel');

                } else if ($(li).hasClass('menu-level-1') && $(li).prevAll('.menu-level-1')[0] == undefined && !$(t).parents().eq(2).hasClass('menu-right')) {
                    closeMegaNav();
                    $('#menu-toggle').focus();
                } else if ($(li).hasClass('menu-level-1') && !$(t).parents().eq(2).hasClass('menu-right') && !$(t).hasClass('mm-btn-link') && $(li).prevAll('.menu-level-1')[0] !== undefined) {

                    li = $(li).prevAll('.menu-level-1:first')
                    adjlabel = $(li).children('a[role=menuitem]')
                } else if ($(t).parents().eq(2).hasClass('menu-right') && $(t).hasClass('mm-btn-link') && $(li).prev()[0] !== undefined) {


                    li = $(li).prev().children('a.mm-btn-link')
                    adjlabel = li

                } else if ($(t).parents().eq(2).hasClass('menu-right') && $(li).prev()[0] == undefined) {

                    li = $(li).parents().eq(2).prev().prev().children('a');
                    adjlabel = li

                }




            }



            return adjlabel

        }


        function adjacentMenuitem(t, dir) {

            var li = t.parentNode;
            var adjlabel;

            if (dir === 'next') {



                if ($(li).next('.menu-level-4')[0] == undefined && $(li).parent().parent('li.menu-level-3').next()[0] !== undefined) {

                    li = $(li).parent().parent('li.menu-level-3').next().find('li.menu-level-4:first').children('a.mm-link')


                } else li = $(li).next('.menu-level-4').children('a.mm-link');

                adjlabel = li

            }

            if (dir === 'prev') {

                if ($(li).prev('.menu-level-4')[0] == undefined && $(li).parent().parent('li.menu-level-3').prev()[0] !== undefined) {

                    li = $(li).parent().parent('li.menu-level-3').prev().find('li.menu-level-4:first').children('a.mm-link')
                    adjlabel = li;

                } else if ($(li).prev('.menu-level-4')[0] == undefined && $(li).parent().parent('li.menu-level-3').prev()[0] == undefined) {


                    li = $(li).parents('ul.menu-level-3').parent().prev();
                    openAccMenu($(li));

                    adjlabel = $(li).children('a').focus();


                } else {
                    li = $(li).prev('.menu-level-4').children('a.mm-link');

                    adjlabel = li
                }

            }




            return adjlabel;

        }


        function onOrientationChange() {
            checkSize();

        }


        function checkWindowLocationPathname() {



            var pathArray = window.location.pathname.split('/');

            //if (window.location.pathname !== "/" && window.location.pathname !== "/en-us/" || window.location.hash === "#geforce") {
            if (pathArray.length > 3) {

                // If you are not on the homepage, you must be on an INTERIOR (BRAND) page...


                NV.isHomePage = false;

                if (NV.responsiveIndex > 2) {

                    // And are viewing from laptop or desktop breakpoint... then collapse the mega nav.


                    if (NV.megaNavCollapsed == true) {
                        stayCollapsedOnInteriorPages();
                    } else {

                        //collapseMegaNavOnBrandPage(5);

                        if (!NV.isHomePage && NV.responsiveIndex > 2) {

                            if (typeof NV.interiorPageNavCollapseTimer === 'undefined') {
                                NV.interiorPageNavCollapseTimer = gsap.delayedCall(3, collapseMegaNavOnBrandPage, [0]);
                            }

                        }
                    }

                }

            } else {

                // You are on the homepage, or a brand page in mobile or tablet breakpoint...


                NV.isHomePage = true;

                //expandMegaNavOnBrandPage(1, false);

            }
        }


        function checkHash() {

            return;



            checkWindowLocationPathname();

            if (window.location.hash === '#geforce') {
                if (NV.responsiveIndex > 2) {
                    collapseMegaNavOnBrandPage();
                }
            }
        }

        function addClass(_class, _selector) {
        	//console.log(_selector);
            var elements = document.querySelectorAll(_selector);
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add(_class);
            }
        }

        function removeClass(_class, _selector) {
            var elements = document.querySelectorAll(_selector);
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove(_class);
            }
        }




        //Closes all accordian menus 

        function closeAllAccMenus() {
            $('.mobile-nav li.menu-level-1').removeClass('active').find('a > svg').attr("class", "n24-icon menu-button caret-down");
            $('.mobile-nav li.menu-level-2').removeClass('active').find('a > svg').attr("class", "n24-icon menu-button caret-down");
            $('.mobile-nav ul.menu-accordion').removeClass('active open').addClass('hide closed');
        }

        function closeAllAccordionMenus(_except) {

            if (_except == undefined) {
                _except = -1;
                NV.megaNavAccordionOpen = false;
            } else {

            }
            for (var i = 0; i < NV.accordionMenuItemNumbers.length; i++) {
                if (NV.accordionMenuItemNumbers[i] !== _except) {
                    if (NV.accordionMenuItemNumbers[i] !== NV.currentLevel1ParentId) {
                        closeAccordionMenu(NV.accordionMenuItemNumbers[i]);
                    } else {

                    }
                } else {

                }
            }
        }




        // Open an accordion menu using its _id and _level number... and keep track of important variables...

        function openAccMenu($this) {
            var currentMenu = $this;
            var nextMenu;
            //Close the previously opened accordian menus
            nextMenu = $this.next().find('ul.menu-accordion:first')
            // console.log($(nextMenu));


            if ($(currentMenu).hasClass('menu-level-1') && !$(currentMenu).hasClass('active')) {
                $('.mobile-nav li.menu-level-1').removeClass('active').find('a > svg').attr("class", "n24-icon menu-button caret-down");
                $('.mobile-nav ul.menu-accordion').removeClass('active open').addClass('hide closed');


                nextMenu = ($this.next().find("ul.menu-accordion").hasClass('menu-level-2')) ? $this.next().find("ul.menu-accordion.menu-level-2") : $this.next().find("ul.menu-accordion.menu-level-3");
                $(nextMenu).addClass("active open").removeClass("hide closed");
                NV.megaNavAccordionOpen = true;
            } else if ($(currentMenu).hasClass('menu-level-2') && !$(currentMenu).hasClass('active')) {
                $('.mobile-nav li.menu-level-2').removeClass('active').find('a > svg').attr("class", "n24-icon menu-button caret-down");
                $('.mobile-nav ul.menu-accordion.menu-level-3').removeClass('active open').addClass('hide closed');

                nextMenu = $(currentMenu).next().find("ul.menu-accordion.menu-level-3");

                $(nextMenu).addClass("active open").removeClass("hide closed");
                NV.megaNavAccordionOpen = true;
            }



            if ($(currentMenu).hasClass("active"))

            {
                $(nextMenu).removeClass("active open").addClass("hide closed");
                $(currentMenu).removeClass("active").find('a > svg').attr("class", "n24-icon menu-button caret-down");
                $(currentMenu).attr('aria-expanded', 'false');
                //Find next level menu is open or no 
                if ($(nextMenu).find('li.menu-level-2').hasClass('active')) {
                    $(nextMenu).find('li.menu-level-2').removeClass('active').find('a > svg').attr("class", "n24-icon menu-button caret-down");
                    NV.megaNavAccordionOpen = false;

                }
            } else {

                $(nextMenu).removeClass("hide closed").addClass("active open");
                $(currentMenu).addClass("active").find('a > svg').attr("class", "n24-icon menu-button caret-down open");
                $(currentMenu).attr('aria-expanded', 'true');
            }




        }




        /* function setForYouPrefferedMenu(_id) {
             
             console.log("setForYouPrefferedMenu: ", _id);
             
             setSessionCookie('forYouPrefs', _id);
         } 
         
         function openForYouPreferredMenu(_id) {
             
             if (NV.responsiveIndex < 3) return;
             
             console.log("openForYouPreferredMenu: ", _id);
             
             if ( _id == 120) {
                 var forYou = getCookie("forYouPrefs");
                 
                 console.log("For You accordion menu clicked... preferred category is", forYou);
                 
                 //NV.previousAccordionNumber = 120;
                 NV.currentAccordionNumber = forYou;
                 
                 $("li.mm-" + _id).focus();
                 
                 //openAccordionMenu(forYou);
                 
                 if (forYou != null) {
                     gsap.delayedCall(0.5, openAccordionMenu, [forYou]);
                 }
                 
             }
             
             if ( _id == 121 || _id == 142 || _id == 175 || _id == 212 || _id == 237 || _id == 265 || _id == 277) {
                 
                 console.log("This category id is For You! _id: ", _id);    
                 setSessionCookie('forYouPrefs', _id);
             }
             
         } */


        // Close an accordion menu by passing an _id that corresponds to its mega menu class number such as 1... .mm-1 is Products.




        // Show the lightbox overlaywhen the Mega Nav is opened...

        function showOverlay() {

            gsap.killTweensOf(".mega-overlay");
            removeClass('hide', '.mega-overlay');
            gsap.to('.mega-overlay', {
                duration: 0.5,
                opacity: 1,
                ease: "cubic.out"
            });
        }


        // Hide the lightbox overlay whenever the Mega Nav is closed and/or collapsed...

        function hideOverlay() {

            gsap.killTweensOf('.mega-overlay');
            gsap.to('.mega-overlay', {
                duration: 0.8,
                opacity: 0,
                ease: "cubic.out",
                onComplete: function() { // Fade out overlay
                    addClass('hide', '.mega-overlay'); // Hide overlay
                }
            });
        }




        // Scroll to a given hash, preventing the event given if there is one...
        function scrollToHashAnchor(_hash, _e) {

            //if (NV.responsiveIndex > 2) return;

            var elem = (typeof _hash !== 'undefined' && _hash !== '') ? document.getElementById(_hash.substring(1)) : false;


            if (elem) {
                if (_e) _e.preventDefault();
            }

            //gsap.set("#mega-nav", {scrollTo: {y: 0, offsetY: 0}});
            
            if(elem !== null){
            gsap.to("#mega-nav", {
                duration: 0.25,
                scrollTo: {
                    y: _hash,
                    offsetY: 0
                },
                ease: "expo.out",
                delay: 0.15
            });
            }
            

        }


        // Init page animations... but only if transitions are not forbidden, and keep track if page animations are now ready.

        function initPageAnimations() {
            if (NV.transitionsForbidden) {

                return;
            }

            //console.log('initPageAnimations...');

            if (!NV.pageAnimationsReady) {
                // Init reusable GSAP Timelines, Tweens, or ScrollTriggers here if required...
                NV.pageAnimationsReady = true;
            }
        }




        // A method to report sizes of browser window dimensions and responsive orientation, and keep these cached with up-to-date values for layout purposes...

        function reportSizes() {

            NV.winWidth = window.innerWidth;
            NV.winHeight = window.innerHeight;
            NV.vh = NV.winHeight;

            NV.responsiveOrientation = (NV.winWidth <= NV.winHeight) ? "portrait" : "landscape";

            NV.st = $(window).scrollTop();
            if (NV.is_iOS) NV.st = window.pageYOffset;

            document.documentElement.style.setProperty('--vh', NV.winHeight + 'px');

            if (NV.winWidth < 1024) {
                NV.is_Mobile = true;
                NV.fxEnabled = false;
                NV.transitionsEnabled = false;
            } else {
                NV.is_Mobile = false;
                if (NV.is_Chrome) NV.fxEnabled = true;
            }

            NV.is_Desktop = !NV.is_Mobile;

            NV.transitionsEnabled = NV.is_Desktop;


        }


        // A method to clear properties from accordion menu items that may have been animated by GSAP and need to have inline styles removed and restored back to CSS values....

        function clearAccordionProps() {
            //console.log("clearAccordionProps...");

            gsap.set('.mobile-nav li.menu-level-1', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav li.menu-level-2', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav li.menu-level-3', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav li.menu-level-4', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav ul.menu-level-1', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav ul.menu-level-2', {
                clearProps: "all"
            });
            gsap.set('ul.menu-level-3', {
                clearProps: "all"
            });
            gsap.set('.mobile-nav ul.menu-level-4', {
                clearProps: "all"
            });
            gsap.set(".mobile-nav li.menu-button.caret-right.close", {
                clearProps: "all"
            });
        }


        // The checkSize function is bound to the window resize event, and keeps track of the current and previous responsiveIndex for responsive design layout handling...

        function checkSize() {
		//console.log("WinWidth", NV.winWidth)
            NV.isResizing = true;
            NV.prevWidth = NV.winWidth;

            reportSizes();

            NV.previousResponsiveIndex = NV.responsiveIndex;


             if (NV.winWidth < 320) {
                    // WATCH...
                    NV.responsiveIndex = 0;
                }

            else  if (NV.winWidth >= 320 && NV.winWidth < 640) {
                        // MOBILE PHONE...
                        NV.responsiveIndex = 1;
                    }

            else if (NV.winWidth >= 640 && NV.winWidth < 1024) {
				 NV.responsiveIndex = 2;
            }

            else if (NV.winWidth >= 1025 && NV.winWidth < 1350) {

                    // LAPTOP...
                    NV.responsiveIndex = 3;
                } else if (NV.winWidth >= 1350 && NV.winWidth < 2560) {

                    // DESKTOP...
                    NV.responsiveIndex = 4;
                }

            else if (NV.winWidth >=2560) {

                    // ULTRA-WIDE DESKTOP...
                    NV.responsiveIndex = 5;
                }





            NV.responsiveBreakpoint = NV.responsiveBreakpoints[NV.responsiveIndex];

            if (NV.previousResponsiveBreakpoint !== NV.responsiveBreakpoint) {



                // WATCH == 0, MOBILE PHONE == 1, TABLET == 2...

                if (NV.responsiveIndex < 3) {



                    clearAccordionProps();

                    if (NV.megaNavOpen) {

                        // Show the overlay if no accordions are open in mobile phone/tablet breakpoint when megaNavOpen is true...
                        if (!NV.megaNavAccordionOpen) {
                            showOverlay();
                        }

                        gsap.to('.mega-menu', {
                            duration: 0.5,
                            left: 0,
                            height: "auto",
                            clearProps: "all",
                            ease: "cubic.out"
                        });
                        removeClass('hide', '.mega-menu');
                    } else {
                        gsap.to('.mega-menu', {
                            duration: 0.25,
                            left: ((NV.responsiveIndex < 2) ? -(NV.winWidth) : -400),
                            height: "auto",
                            clearProps: "all",
                            ease: "cubic.out"
                        });
                        addClass('hide', '.mega-menu');
                    }

                } else {

                    // LAPTOP (3) and DESKTOP (4)...

                    if (NV.megaNavAccordionOpen == false) {

                        // Hide the overlay if no accordions are open in laptop/desktop breakpoint...
                        if (NV.megaNavAccordionOpen == false) {
                            hideOverlay();
                        } else {
                            showOverlay();
                        }
                    }



                    if (NV.megaNavOpen) {
                        removeClass('hide', '.mega-menu');
                        gsap.set('.mega-menu', {
                            height: "auto"
                        });
                        gsap.to('.mega-menu', {
                            duration: 0.5,
                            left: 0,
                            ease: "cubic.out"
                        });
                    } else {
                        removeClass('hide', '.mega-menu');
                        gsap.fromTo('.mega-menu', {
                            opacity: 0
                        }, {
                            duration: 0.25,
                            opacity: 1,
                            left: 0,
                            height: 44,
                            ease: "cubic.out"
                        });
                    }
                }
            }

            NV.previousResponsiveBreakpoint = NV.responsiveBreakpoint;

            if (NV.is_MSIE || NV.is_Edge) {
                patchMSIE();
            }

            NV.isResizing = false;

            //console.log("Responsive index", NV.responsiveIndex)
        }

        // When TAB key is pressed, "Accessibility Mode" is true, and focus should be set on the nearest appropriate item.

        // When ESC key is pressed, "Accessibility Mode" is false, and focus is blurred.

        function enableAccessibilityMode(_b) {

            if (typeof _b === undefined) {
                _b = true;
            }

            if (_b) {
                NV.accessibilityMode = true;

            } else {
                NV.accessibilityMode = false;

            }
        }


    //}
    }

}());

;
(function($, window, document, undefined) {
  // Default options
  var pluginName = 'imageComponent',
  screenSize = $(window).width(),
  pixelSize = window.devicePixelRatio,
  largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
  desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
  tabletBreakpoint = NVIDIAGDC.tabletBreakpoint,
  defaults = {
    imageDesktopUrl:"",
    imageLaptopUrl:"",
    imageTabletUrl:"",
    imageMobileUrl:"",
    imageDesktopRetinaUrl:"",
    imageLaptopRetinaUrl:"",
    imageTabletRetinaUrl:"",
    imageMobileRetinaUrl:"",
    imageTarget:'',
	imageTargetURL:'',
    oldBreakPointValue:'',
    lazyloded:true
  };

  // Plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.$element = $(this.element);
    this.$responsiveimg=this.$element.find('.responsive-image');
    this.$svgimg=this.$element.find('.svg-cls');
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.$imageLink= this.$element.find('.imageLink');
    this.init();
  };

  Plugin.prototype.init = function() {
    if (this.options.imageTarget === "_modal" && this.options.imageTargetURL.length>0 ) {
    	this.$imageLink.click($.proxy(openModal, this));
    }
    if(this.options.lazyloded){
    	this.setSize();
    }else{
    	this.setImage();
    }
    
  };
  
  Plugin.prototype.getUrlParam=  function(name, url){
	  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}

  Plugin.prototype.setSize= function(){  
	  if (screenSize < tabletBreakpoint && this.options.imagePhoneCustWidth ) {
		      var phonecustomwid= $.isNumeric(this.options.imagePhoneCustWidth)?this.options.imagePhoneCustWidth+'px':this.options.imagePhoneCustWidth;
			  this.$responsiveimg.attr({style: 'width:'+phonecustomwid});
			  this.$svgimg.attr({style: 'width:'+phonecustomwid});
		
    } else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint && this.options.imageTabletCustWidth) {
    		var tabletcustomwid= $.isNumeric(this.options.imageTabletCustWidth)?this.options.imageTabletCustWidth+'px':this.options.imageTabletCustWidth;
    		this.$responsiveimg.attr({style: 'width:'+tabletcustomwid});
    		this.$svgimg.attr({style: 'width:'+tabletcustomwid});
    		    	
    } else if (screenSize >= desktopBreakpoint && screenSize < largeDesktopBreakpoint && this.options.imageLaptopCustWidth && ((this.options.oldBreakPointValue) === "false") ) {
    		var laptopcustomwid= $.isNumeric(this.options.imageLaptopCustWidth)?this.options.imageLaptopCustWidth+'px':this.options.imageLaptopCustWidth;
    		this.$responsiveimg.attr({style: 'width:'+laptopcustomwid});
    		this.$svgimg.attr({style: 'width:'+laptopcustomwid});
    
    }else {
    	if(this.options.imageDesktopCustWidth){
    		var desktopcustomwid= $.isNumeric(this.options.imageDesktopCustWidth)?this.options.imageDesktopCustWidth+'px':this.options.imageDesktopCustWidth;
    		this.$responsiveimg.attr({style: 'width:'+desktopcustomwid});
    		this.$svgimg.attr({style: 'width:'+desktopcustomwid});
    	}
    }
  
  }
  
  
  Plugin.prototype.setImage= function(){      
    // We load the mobile image for devices with a viewport of 767px or less
    // We load the desktop image for devices with a viewport betweek 768 and 1024 px
    // We load the desktop image for devices with a viewport of 1025px or bigger
	  /* TODO: fix this once retina display issue is fixed.*/
	 /*( if (pixelSize > 5) {
			if (screenSize < tabletBreakpoint){	
				var highres = this.options.imageMobileUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.find('.responsive-image').attr('src', highres);				
				} else {
					this.setValidImg(this.$element.find('.responsive-image'), this.options.imageMobileUrl.replace(".", "@2x."), this.options.imageMobileUrl);
				}
			} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint){
				var highres = this.options.imageTabletUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.find('.responsive-image').attr('src', highres);				
				} else {
					this.setValidImg(this.$element.find('.responsive-image'), this.options.imageTabletUrl.replace(".", "@2x."), this.options.imageTabletUrl);					
				}
			} else {				
				var highres = this.options.imageDesktopUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.find('.responsive-image').attr('src', highres);
				} else {
					this.setValidImg(this.$element.find('.responsive-image'), this.options.imageDesktopUrl.replace(".", "@2x."), this.options.imageDesktopUrl);					
				}
			}    
	  } */
	  if(pixelSize >= 1.5) {
		  if (screenSize < tabletBreakpoint) {
			  if(this.options.imagePhoneCustWidth){
				  var phonecustomwid= $.isNumeric(this.options.imagePhoneCustWidth)?this.options.imagePhoneCustWidth+'px':this.options.imagePhoneCustWidth;
				  this.$element.find('.responsive-image').attr({src:this.options.imageMobileRetinaUrl, style: 'width:'+phonecustomwid});
				  this.$svgimg.attr({style: 'width:'+phonecustomwid});
				  }
			  else{
				  this.$element.find('.responsive-image').attr("src",this.options.imageMobileRetinaUrl);
				  }
	    } else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint) {
	    	if(this.options.imageTabletCustWidth){
	    		var tabletcustomwid= $.isNumeric(this.options.imageTabletCustWidth)?this.options.imageTabletCustWidth+'px':this.options.imageTabletCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageTabletRetinaUrl, style: 'width:'+tabletcustomwid});
	    		this.$svgimg.attr({style: 'width:'+tabletcustomwid});
	    	}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageTabletRetinaUrl);
	    	}
	    } else if (screenSize >= desktopBreakpoint && screenSize < largeDesktopBreakpoint && ((this.options.oldBreakPointValue) === "false") ) {
	    	if(this.options.imageLaptopCustWidth){
	    		var laptopcustomwid= $.isNumeric(this.options.imageLaptopCustWidth)?this.options.imageLaptopCustWidth+'px':this.options.imageLaptopCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageLaptopRetinaUrl, style: 'width:'+laptopcustomwid});
	    		this.$svgimg.attr({style: 'width:'+laptopcustomwid});
	    	}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageLaptopRetinaUrl);
	    	}
	    } else {
	    	if(this.options.imageDesktopCustWidth){
	    		var desktopcustomwid= $.isNumeric(this.options.imageDesktopCustWidth)?this.options.imageDesktopCustWidth+'px':this.options.imageDesktopCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageDesktopRetinaUrl, style: 'width:'+desktopcustomwid});
	    		this.$svgimg.attr({style: 'width:'+desktopcustomwid});
	    		}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageDesktopRetinaUrl);
	    		}
	    }
	  }
	  else {
		  if (screenSize < tabletBreakpoint) {
			  if(this.options.imagePhoneCustWidth){
				  var phonecustomwid= $.isNumeric(this.options.imagePhoneCustWidth)?this.options.imagePhoneCustWidth+'px':this.options.imagePhoneCustWidth;
				  this.$element.find('.responsive-image').attr({src:this.options.imageMobileUrl, style: 'width:'+phonecustomwid});
				  this.$svgimg.attr({style: 'width:'+phonecustomwid});
			  }else{
				  this.$element.find('.responsive-image').attr("src",this.options.imageMobileUrl);
			  }
	    } else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint) {
	    	if(this.options.imageTabletCustWidth){
	    		var tabletcustomwid= $.isNumeric(this.options.imageTabletCustWidth)?this.options.imageTabletCustWidth+'px':this.options.imageTabletCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageTabletUrl, style: 'width:'+tabletcustomwid});
	    		this.$svgimg.attr({style: 'width:'+tabletcustomwid});
	    	}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageTabletUrl);
	    	}	    	
	    } else if (screenSize >= desktopBreakpoint && screenSize < largeDesktopBreakpoint && ((this.options.oldBreakPointValue) === "false") ) {
	    	if(this.options.imageLaptopCustWidth){
	    		var laptopcustomwid= $.isNumeric(this.options.imageLaptopCustWidth)?this.options.imageLaptopCustWidth+'px':this.options.imageLaptopCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageLaptopUrl, style: 'width:'+laptopcustomwid});
	    		this.$svgimg.attr({style: 'width:'+laptopcustomwid});
	    	}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageLaptopUrl);
	    	}
	    }else {
	    	if(this.options.imageDesktopCustWidth){
	    		var desktopcustomwid= $.isNumeric(this.options.imageDesktopCustWidth)?this.options.imageDesktopCustWidth+'px':this.options.imageDesktopCustWidth;
	    		this.$element.find('.responsive-image').attr({src:this.options.imageDesktopUrl, style: 'width:'+desktopcustomwid});
	    		this.$svgimg.attr({style: 'width:'+desktopcustomwid});
	    	}else{
	    		this.$element.find('.responsive-image').attr("src",this.options.imageDesktopUrl);
	    	}
	    }
	  }
  }
  

  
  function openModal(e) {
	e.preventDefault();
    var screenSize = $(window).width();
    var imageURL= this.options.imageTargetURL;
    var isInline=false;
    var isIframe=false;
    var isYoutube=false;
    if (imageURL.indexOf('youtube')!= -1) {
    	isYoutube=true;
        //console.log("Its youtube ...");
        var videoId = this.getUrlParam('v', imageURL);
        var listId = this.getUrlParam('list', imageURL);
        if (videoId != null ) {
        	imageURL="https://www.youtube.com/embed/" + videoId;
              if(listId!=null)
            	  imageURL= imageURL + "?list=" + listId;
        }
      }
    if(imageURL.indexOf("#") !=-1){
    	isInline=true;
    }else{
    	isIframe=true;
    }
    defaultOptions = {
      inline: isInline,
      iframe: isIframe,
      width:'80%',
      height:'auto',  
      maxHeight : '80%',
      href : imageURL
    };
    if(screenSize < desktopBreakpoint) {
        //defaultOptions.width = "100%";
        defaultOptions.width = $(window).width() -30;
        if(isYoutube){
            defaultOptions.height = "480px";
            if(screenSize < tabletBreakpoint) {
            	defaultOptions.height=(defaultOptions.width*9)/16;
            }    
            defaultOptions.maxWidth = "854px";
        } else {
            defaultOptions.height="auto";
            //defaultOptions.maxHeight="100%";
            defaultOptions.maxHeight=$(window).height() -30;
            if(isIframe) {
                defaultOptions.height="80%";
            }
        }

    } else {
        if(isInline) {
            defaultOptions.maxHeight = "80%";
            defaultOptions.height = $(this.options.imageTargetURL).data('height')!=''?$(this.options.imageTargetURL).data('height') + 'px':"auto";
            defaultOptions.width = $(this.options.imageTargetURL).data('width')!=''?$(this.options.imageTargetURL).data('width') + 'px' : "80%";		  
        } else {
            if(isYoutube){
            	defaultOptions.height= "480px";
            	defaultOptions.maxWidth = "854px";
            } else {
                defaultOptions.height="80%";
                if(screenSize < desktopBreakpoint) {
                    //defaultOptions.width = "100%";
                    defaultOptions.width = $(window).width() -30;
                    
                }
            }
    	}
    };
   $.colorbox(defaultOptions);
  };
    
  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
            new Plugin(this, options));
      }
    });
  }
})(jQuery, window, document);

;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'cookiemsg',
		defaults = {
			cookiemsg:''
	};
	
	
	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		var theLanguage = $('html').attr('lang');
		Granite.I18n.setLocale(theLanguage);
		var closetxt=Granite.I18n.get("Accept");
		var self = this;
		var CookiePolicy={};
		var cookiemsg=this.$element.find('#cookie-msg').html();
		var templateLayer='<div id="cookiePolicy-layer" class="noSelection shadowBox-light">'+
		'<div class="messageContainer fontSmall">'+cookiemsg+'</div>'+
		'<div id="cookiePolicy-btn-close" class="green-box-bttn"><span>'+closetxt+'</span></div></div>';
		self.showLayer(templateLayer);
		
	};

	
	Plugin.prototype.showLayer = function(templateLayer) {
		if(!cookieHelpers.getCookie('CookiePolicy')){
			$('body').append(templateLayer);
			$('#cookiePolicy-layer').fadeTo("slow", 1); 
			/*$(window).scroll(function(){
				if($(window).scrollTop() > 200) {
					$('#cookiePolicy-layer').fadeOut(300);
				}else{
					$('#cookiePolicy-layer').fadeIn(300);
				}
			})*/
		}
		/* setTimeout(function() {
		   $('#cookiePolicy-layer').fadeOut(300, function() {
			$(this).remove();
			});			
			//cookieHelper.setCookie('CookiePolicy', 1, {expires:365,path:'/'});
		}, 3000); */
		// attach close click
		$("#cookiePolicy-btn-close").on("click", function(event){
			$('#cookiePolicy-layer').fadeTo("slow", 0, function() {
				$(this).remove();
			});			
			cookieHelpers.setCookie('CookiePolicy', 1, {expires:365,path:'/'});
		});
	
	}
	

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}
})(jQuery, window, document);

;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'videoComponent',
	screenSize = $ (window ).width(),
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {
		videotype:"dam",
		preload:"auto",
		videoconfig:"",
		videourl:"",
		videowebmurl:"",
		youtubeurl:"",
		youkurul: ""
	};
	var damVideoOverlay;

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$watchvideo=this.$element.find(".watchvideo"); 
		//console.log("video comp"+this.$watchvideo.length);
		this.init();
	};

	Plugin.prototype.init = function() {
		var self = this;
		
		self.$watchvideo.find('i, .icon-text-pos').click(function(e) {
	        $('body').addClass('noscroll');
			var htmlstr="";
			screenSize = $(window).width();
            var cbWidth = screenSize - 30;
			//var width="100%";
			var width=cbWidth;
			var height="60%";
			if (screenSize >= desktopBreakpoint){
                cbWidth="854px";
				width= "854px";
			  	height= "480px";
			}else{
				//height= (screenSize*9)/16;
				height= (cbWidth*9)/16;
			}

			if(self.options.videotype==='dam'){
				htmlstr="<div class='damvideo-border'><video id='player-dam' preload='"+self.options.preload+"' width='"+width+"' /* height= '"+height+"' "+self.options.videoconfig+">"
                +"<source src='"+self.options.videowebmurl+"' type='video/webm' />"
				+"<source src='"+self.options.videourl+"' type='video/mp4' />"
				+"</video></div>";
				damVideoOverlay = true;
			}else if (self.options.videotype==='youku'){
				htmlstr="<iframe id='player-youku' width='"+width+"' height= '"+height+"' src='"+self.options.youkuurl+"' frameborder='0' allowfullscreen>"
				+"</iframe>"
			}else{
				htmlstr="<div class='youtube-border'><iframe id='player-youtube' width='"+width+"' height= '"+height+"' src='"+self.options.youtubeurl+"' frameborder='0' allowfullscreen>"
			+"</iframe></div>"
			}	
			$.colorbox({width: cbWidth, html:htmlstr});
			$.colorbox.resize();
			if (damVideoOverlay){
				$("#player-dam").get(0).play();
				$("#cboxLoadedContent").css("overflow", "visible");
			}
		});
	};
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);







;
(function($, document, undefined) {

	// Default options
	var pluginName = 'enhancedtabComponent', defaults = {};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.$ul=this.$element.find('>.tabblock >.tabs-wrapper >ul.tabs');
		this.$li=this.$ul.children();
		this.$tabcontent=this.$element.find('>.tabblock >.tab-container >.tab-content');
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	;

	Plugin.prototype.init = function() {
		var self = this;
		if (this.options.tabtype === "3"  ) {
			 self.setDropdown();
	    }else{
	    	self.setTabs();
	    	self.handleTabPageLoadScroll();
	    }
	}
	Plugin.prototype.setDropdown = function(){
	       console.log("dropdown");
			var self = this;
			var tabcompanchorid = this.options.anchorid;
	        var $tabcontainer=$('#' + tabcompanchorid).find('>div.tab-container');
			this.$element.find('div.tab-container div:first-child').addClass('current');	
	    }
	Plugin.prototype.setTabs = function() {	
		var self = this;
		var tabcompanchorid = this.options.anchorid;
        var tabcontentindex = this.options.activetabid;			
		var tabcontentparam = NVIDIAGDC.Browser.getUrlParameter("activetab");
		/*handle secondary embedded tab*/
		if(!!tabcontentparam &&tabcompanchorid && tabcontentparam.indexOf(tabcompanchorid)<0) {
			/*id in request param is that of embeded tab*/
			tabcontentparam = NVIDIAGDC.Browser.getUrlParameter("at2");	
		}
		/*if this is the targeted tab*/
		if (!!tabcontentparam && tabcompanchorid && tabcontentparam.indexOf(tabcompanchorid)>=0) {
            if(tabcontentparam.lastIndexOf("-") > -1){  
                tabcompanchorid = tabcontentparam.substring(0, tabcontentparam.lastIndexOf("-"));
                tabcontentindex = tabcontentparam.substring(tabcontentparam.lastIndexOf("-") + 1);
                if(!tabcompanchorid){
                	tabcompanchorid = self.options.anchorid;
                }
                if(!tabcontentindex){
                	tabcontentindex = self.options.activetabid; 
                }                
            } else{
                 setFirstTabContentCurrent(self);
            }            
		}
			if(tabcompanchorid){	
				var elemtstr = "#"+tabcompanchorid;
	            if((this.$element.find(elemtstr)).length){
	            if (!isNaN(tabcontentindex)) {	            	
	                setAuthoredTabToCurrent(self, tabcompanchorid, tabcontentindex);	                
	            } else {
	                setFirstTabContentCurrent(self);
	                }
	            }else{
	               setFirstTabContentCurrent(self);
	            }
	}else{
		setAuthoredTabToCurrent(self, tabcompanchorid, tabcontentindex);
        
     }
			self.$li.click(function() {
			var tab_id = $(this).attr('data-tab');
			if(tabcompanchorid && /^nodtab/.test(tabcompanchorid)){
				NVIDIAGDC.Browser.mountUnmount($(this),false,$(this).index());
			}
			
			self.$li.removeClass('current');
			self.$tabcontent.removeClass('current');
			$(this).addClass('current');
			$('#' + tab_id).addClass('current');
		});

	}

	function setFirstTabContentCurrent(localself) {
		localself.$ul.children(':first-child').addClass('current');
		localself.$tabcontent.children(':first-child').addClass(
				'current');
	}
	
	function setAuthoredTabToCurrent(sattc, tabcompanchorid, tabcontentindex) {
       var $ultabs=$('#' + tabcompanchorid).find('>.tabs-wrapper');
       var $tabcontainer=$('#' + tabcompanchorid).find('>div.tab-container');
       /*if this tab has no anchor id  at all */
		if(!tabcompanchorid){
			tabcompanchorid = sattc.options.id;
			/*resetting as no anchorid provided*/
			$ultabs=$('#' + tabcompanchorid).children().find('>.tabs-wrapper');
		    $tabcontainer=$('#' + tabcompanchorid).children().find('>div.tab-container');
		}
		
        if (sattc.$ul.children(':nth-child('+ tabcontentindex + ')').length > 0) {
        	tabcontentindex = tabcontentindex;        	
        } else { 
        	tabcontentindex = sattc.options.activetabid;        	
        }
        
        if (sattc.$ul.children(':nth-child('
                + tabcontentindex + ')').length) {            
        	sattc.$li.removeClass('current');            
        	sattc.$tabcontent.removeClass('current');
        	$ultabs.find('>ul.tabs >li:nth-child(' + tabcontentindex + ')').addClass('current');
        	$tabcontainer.find('>div:nth-child('+ tabcontentindex + ')').addClass('current');
            
        } else {        	
            setFirstTabContentCurrent(sattc);
        }
        
	}

	Plugin.prototype.handleTabPageLoadScroll = function() {
		var self = this;
		var tabcompanchorid = this.options.anchorid;
		var tabcompcontentparam = NVIDIAGDC.Browser.getUrlParameter("activetab");
		/*handle secondary embedded tab*/
		if(!!tabcompcontentparam &&tabcompanchorid && tabcompcontentparam.indexOf(tabcompanchorid)<0) {
			tabcompcontentparam = NVIDIAGDC.Browser.getUrlParameter("at2");	
		}
        if(tabcompcontentparam.lastIndexOf("-") > -1){
              var hashid = tabcompcontentparam.substring(0, tabcompcontentparam.lastIndexOf("-"));
        }else{
              var hashid = tabcompcontentparam;
        }
            if (!!hashid) {
                setTimeout(function() {
                    hashid = "#" + hashid;
                    if ($(hashid).offset()) {
                        handleTabSmoothScroll(hashid);
                    }
                }, 500);
            }

	};

	function handleTabSmoothScroll(hashid) {
        var scrolltabback = NVIDIAGDC.Browser.getUrlParameter("scrolltabback");
		var scrollPos = 0;
		var sp = $(hashid).offset().top;
		if (screenWidth < 768) {
            if(scrolltabback){
                scrollPos = sp - (scrolltabback-54);
            }else{
                scrollPos = sp - 81;
            }

		} else if (screenWidth < 1025) {
            if(scrolltabback){
                scrollPos = sp - (scrolltabback-34);
            }else{
                scrollPos = sp - 101;
            }

		} else {
            if(scrolltabback){
                scrollPos = sp - scrolltabback;
            }else{
                scrollPos = sp - 135;
            }

		}

		// smooth scroll to the anchor id
		$("html, body").animate({
			scrollTop : scrollPos + "px"
		}, 1000, "swing");
	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this
				.each(function() {
					if (!$.data(this, 'plugin_' + pluginName)) {
						$.data(this, 'plugin_' + pluginName, new Plugin(this,
								options));
					}
				});
	}

})(jQuery, document);

;
(function($, document, undefined) {

	// Default options
	var pluginName = 'tabComponent',
	defaults = {};
	
	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};
	
	Plugin.prototype.init = function() {
		var self = this;
		self.setTabs();
	}	
	
	Plugin.prototype.setTabs = function(){
		
			this.$element.find('ul.tabs li:first-child').addClass('current');
			this.$element.find('div#tab-container div:first-child').addClass('current');	
			var li = this.$element.find('ul.tabs li');
			var tabContent = this.$element.find('.tab-content');
			this.$element.find('ul.tabs li').click(function () {  		
				var tab_id = $(this).attr('data-tab');
				li.removeClass('current');
				tabContent.removeClass('current');
		        $(this).addClass('current');
		        $('#'+ tab_id).addClass('current');
			}); 	
	}
		
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, document);
;
(function($, document, undefined) {

    // Default options

	var pluginName = 'enhancedstaticBreadCrumbComp',
    	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
		desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
		tabletBreakpoint = NVIDIAGDC.tabletBreakpoint,
        defaults = {};

    var staticbrdcmbElements = [];
	//staticbrdcmbElements.push($(".stbrdcrmbitems > li > a ").attr("href"));
	$(".stbrdcrmbitems > li > a").each(function() {	
		staticbrdcmbElements.push($(this).attr("href"));        
	});

	var initScroll = 0, scrltp = $(window).scrollTop();
	var scrollingDown;

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);


        this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

        this.$stcbrdcmblkele = this.$element.find(".stbrdcrmbblock"); 
		this.init();
	};

	Plugin.prototype.init = function() {
		var self = this;
		
		
		
	$(".left-button").click(function () { 
	     
	  var leftPos = $('.stbrdcrmbitems').scrollLeft();
	  $(".stbrdcrmbitems").animate({scrollLeft: leftPos - 200}, 800);
	});
	
	$(".right-button").click(function () { 
	    
	  var leftPos = $('.stbrdcrmbitems').scrollLeft();
	  $(".stbrdcrmbitems").animate({scrollLeft: leftPos + 200}, 800);
	});

	// var stcbrdcmbscrl =  (($('.stbrdcrmbblock').offset().top) - $('.sub-brand-nav').height());
	var stcbrdcmbscrl = NVIDIAGDC.isBrandPage2 ? ((($('.stbrdcrmbblock').offset().top) - $('.sub-brand-nav').height()) - 46) : ((($('.stbrdcrmbblock').offset().top) - $('.sub-brand-nav').height()));




function determineLinkToHightight(scrltp) {
		var elementHeight, headerSize, $staticbrdcmbElement;

   // determing the header size base on the vertical direction of scrolling
		if (scrollingDown) {
			headerSize = 119;
		} else {
			headerSize = 289;
		}

		for (i = 0; i < staticbrdcmbElements.length; i++) {

		$staticbrdcmbElement = $(staticbrdcmbElements[i]);

        if ($staticbrdcmbElement.length != 0) {
			elementHeight = $staticbrdcmbElement.height();
       		elementPosition = $staticbrdcmbElement.offset().top;

            if (elementPosition - headerSize <= scrltp && scrltp <= elementPosition - headerSize + elementHeight) {               
               	hightlightStaticBrdEle($("#stbrdcrmb-item" + (i+1)));
				break;
            }else{
				/* commenting for not to remove the first element hightlight */
				//removeHightlightStaticBrdEle();
				
        	}
    	}else{
				/*console.log("No id reference element");*/
        	}
    }
}

function hightlightStaticBrdEle($selected) {
		removeHightlightStaticBrdEle();		
		if (!$selected.hasClass("cta")) {
			$selected.parent().addClass("current");
		}
	}

function removeHightlightStaticBrdEle() {	
	$(".staticbreadcrumb ul.stbrdcrmbitems li").removeClass("current");
}

window.onscroll=function(){

		if (!$( ".stbrdcrmbblock" ).hasClass("stbrdcrmbshadow")) {
            $( ".stbrdcrmbblock" ).addClass("stbrdcrmbshadow");
		}

    	//setTimeout(function(){  $('.stbrdcrmbblock').removeClass('stbrdcrmbshadow'); }, 1000);

		scrltp = $(window).scrollTop();
		
		determineLinkToHightight(scrltp);
		
		if (scrltp < initScroll) {

			scrollingDown = false;
		}
		// handling the case of bounce scrolling for iOs devices
		if (scrltp <= 50) {
			return;
		} else if (scrltp > initScroll) {
			scrollingDown = true;

		}
		initScroll = scrltp;

    //determineLinkToHightight(scrltp);


    if (($(window).scrollTop()) > stcbrdcmbscrl){						

			if (!$( ".global-nav" ).hasClass( "pull-up" )){
            	
            	$('.stbrdcrmbblock').addClass('stbrdcrmbstickwthhead');
                $('.stbrdcrmbblock').removeClass('stbrdcrmbstick');
                
    		}else {
    			$('.stbrdcrmbblock').addClass('stbrdcrmbstick');
                $('.stbrdcrmbblock').removeClass('stbrdcrmbstickwthhead');
               
    		}

    }else{

        if (!$( ".global-nav" ).hasClass( "pull-up" )){
           
            $('.stbrdcrmbblock').removeClass('stbrdcrmbstickwthhead');
             $('.stbrdcrmbblock').removeClass('stbrdcrmbstick');
        }
    }

};


//below code handles the smooth scroll on click of Static Breadcrumb items

        self.$stcbrdcmblkele.find('ul.stbrdcrmbitems li').click(function(e) {
        
        self.$stcbrdcmblkele.find('ul.stbrdcrmbitems li').removeClass('current');			
		$(this).addClass('current');

		var hashid = $(this).find("a").attr('href');
    	e.preventDefault(); // same to return false;

        // smooth scroll to the anchor id
		var scrollPos = 0;
		var sp = $(hashid).offset().top;

		if (screenWidth < tabletBreakpoint) {
                scrollPos = sp - 81;

		} else if (screenWidth < desktopBreakpoint) {
                scrollPos = sp - 101;

		} else {
                scrollPos = sp - 105;
		}


		// smooth scroll to the anchor id
		$("html, body").animate({
			scrollTop : scrollPos + "px"
		}, 1000, "swing");
		
		// handle unibrow
        if($(".hide-unibrow").length<1){
            if($("#page-content").attr("class").indexOf("pull-up")>0){
                $(".stbrdcrmbblock").css("top", parseInt($(".global-nav").css("height"))+"px");
            } else {
                $(".stbrdcrmbblock").css("top", parseInt($(".global-nav").css("height"))+46+"px");
            }
        }

 // smooth scroll to the anchor id ended

		});

	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this
				.each(function() {
					if (!$.data(this, 'plugin_' + pluginName)) {
						$.data(this, 'plugin_' + pluginName, new Plugin(this,
								options));
					}
				});
	}

})(jQuery, window, document);

;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'shieldGames',
	defaults = {
			currentGameBatch: [],
			currentlyLoading: false,
			gameLimit: 18,
			gameType: 'android',
			localeType: 'us/en_US',
			startValue: 0,
			initialValue: 0,
			currentValue : 0,
			platform: null,
			orderby: null,
			sort: null,
			template: null,
			androidLimit: 36,
			buyandplay:false,
			includedwithmembership:false,
			ratingMatrix: [
			               [0, ''],
			               [1, 'rating1'],
			               [1.5, 'rating15'],
			               [2, 'rating2'],
			               [2.5, 'rating25'],
			               [3, 'rating3'],
			               [3.5, 'rating35'],
			               [4, 'rating4'],
			               [4.5, 'rating45'],
			               [5, 'rating5']
			               ]
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		//this.$appCarouselCaption=(this.$element.find('#shield-apps .store-slide-info .caption').length)? $('#shield-apps .store-slide-info .caption') : $('#games-container .store-slide-info .caption');
		this.$shieldgamescontainer=this.$element.find('#games-container');
		this.$shieldappscontainer=this.$element.find('#apps-container');
		this.$sortfilter= this.$element.find('#sort');
		this.$sortele= this.$element.find('.sort');
		this.$appbox= this.$element.find('#app-boxes');
		this.$gamebox= this.$element.find('#game-boxes');
		this.$morefiltersbtn=this.$element.find("#more-filters-bttn");
		this.$morefilters=this.$element.find("#more-filters");
		this.$devicefilter= this.$element.find('#device');
		this.$gridfilter=this.$element.find('#grid');
		this.$bundlefilter=this.$element.find('#bundle');
		this.$ratingsfilter=this.$element.find('#ratings');
		this.$controllersfilter=this.$element.find('#controllers');
		
		this.$gfntype=this.$element.find('#gfntype');
		
		this.$featuretab=this.$element.find('.featured-tab');
		this.$featuregamesnavtabitems=this.$featuretab.find(".games-navigation-tabs-item");

		this.$buypi=this.$element.find('#buypi');
		this.$buypinavtabitems=this.$buypi.find(".games-navigation-tabs-item");

		this.$fgames=this.$element.find('#fgames');
		this.$fgamesnavtabitems=this.$fgames.find(".games-navigation-tabs-item");

		this.$inlucdedwm=this.$element.find('#inlucdedwm');
		this.$inlucdedwmnavtabitems=this.$inlucdedwm.find(".games-navigation-tabs-item");

		this.$freefilter=this.$element.find('#free');
		this.$comingsoonfilter=this.$element.find('#coming_soon');

		this.$genrefilter=this.$element.find('#genre');
		this.$loadmore=this.$element.find('#more-games');
		

		var _self=this;

		/*onload data*/
		var game_type = _self.getQueryStringValue('tab');
		if (game_type == ""){
			game_type = _self.options.gameType;
		}else {
			_self.options.gameType=game_type;
		}
		_self.$element.find('#games-container').attr('data-category',game_type);
		
		if (typeof this.options.localeType === "undefined" || this.options.localeType == "" ) this.options.localeType = 'us/en_US';
		
		/*ondata load finisah*/

		// Init truncate Setup
		/*this.$gameCarouselCaption = ($('#apps-container .store-slide-info .caption').length)? $('#apps-container .store-slide-info .caption') : $('#games-container .store-slide-info .caption');
		var gameCarouselText = this.$gameCarouselCaption.html();

		this.$gameCarouselCaption.truncate({
			lines: 3,
			lineHeight: 24
		});*/


		//this.onwindowresize();

		if (this.$shieldgamescontainer || this.$shieldappscontainer) {
			var category=this.$shieldgamescontainer.data('category');
			if (category === 'android') {
				this.options.platform = 'apps';
				this.options.gameType = 'android';
				this.options.template = '<% _.each( gameData, function( game ){ %><li class="android-game active"><div class="game"><a href="<%- game.detailPageURL %>" target="<%- game.gameTarget %>"><div class="banner"><img src="<%- game.feature_image %>" alt="<%- game.title %>" title="<%- game.title %>" /></div><div class="info"><div data-title="<%- game.title %>" class="title"><%- game.title %></div><div class="game-rating"><% if(game.only_on_shield == true) { %> <div class="onlyShield">Only on SHIELD</div><% } %></div><div class="game-price"><% if (game.price !== "FREE") { %><div class="price"><%- game.price %></div><% } else { %><div class="price"><%- game.price %></div><% } %></div><div class="cf"></div></div></a></div></li><% }); %>';
				this.init();
			} else if (category === 'gamestream') {
				this.options.platform = 'pcgames';
				this.options.gameType = 'gamestream';
				this.options.template = '<% _.each( gameData, function( game ){ %><li class="gamestream-game"><div class="game"><a href="<%- game.detailPageURL %>"><div class="banner"><img src="<%- game.feature_image %>" alt="<%- game.title %>" title="<%- game.title %>" /></div><div class="info"><div data-title="<%- game.title %>" class="title"><%- game.title %></div><div class="cf"></div></div></a></div></li><% }); %>';
				this.init();
			} else if (category === 'geforce-now') {
				this.options.platform = 'pcgames';
				this.options.gameType = 'geforce-now';
				this.options.template = '<% _.each( gameData, function( game ){ %><li class="grid-game"><div class="game"><a href="<%- game.detailPageURL %>"><div class="banner"><img src="<%- game.feature_image.thumbnail %>" alt="<%- game.title %>" title="<%- game.title %>" /></div><div class="info"><div data-title="<%- game.title %>" class="title"><%- game.title %></div><div class="grid-game-price"><% if(game.grid_store_game == false) { %> <div class="included"><%- game.included %></div><% }else if(game.price !== ""){ %><div class="price"><%- game.price %></div><% }else{ %><div class="price">&nbsp;</div><% } %></div><div class="cf"></div></div></a></div></li><% }); %>';
				this.init();
			} else if (category=== 'apps') {
				this.options.platform = 'otherapps';
				this.options.gameType = 'app';
				this.options.template = '<% _.each( gameData, function( app ){ %><li class="android-app active"><div class="app"><a href="<%- app.detailPageURL %>"><div class="banner"><img src="<%- app.feature_image %>" alt="<%- app.title %>" title="<%- app.title %>" /></div><div class="info"><div data-title="<%- app.title %>" class="title"><%- app.title %></div><div class="app-rating"><% if(app.only_on_shield == true) { %> <div class="onlyShield">Only on SHIELD</div><% } %></div><div class="app-price"><% if (app.price !== "FREE") { %><div class="price"><%- app.price %></div><% } else { %><div class="price"><%- app.price %></div><% } %></div><div class="cf"></div></div></a></div></li><% }); %>';
				this.init();
			}
		}


		if (this.$morefiltersbtn) {
			var bttn =this.$morefiltersbtn;
			$(bttn).click(function(e) {
				if ($(bttn).hasClass('active')) {
					$(bttn).removeClass('active');
					_self.$morefilters.toggle();
				} else {
					$(bttn).addClass('active');
					_self.$morefilters.toggle();
				}
			});

		}

		if( this.options.gameType == 'geforce-now' && _self.$element.find('#fgames .games-navigation-tabs-item').hasClass('active') == true){
			this.$sortele.hide();
			this.$featuretab.css('padding-bottom','80px');
		}


		this.init();
		this.options.gameType = _self.$element.find('#games-container').attr('data-category') ;
		this.fetchGameCategories();
		this.toggleFilters();
		//this.windowscroll();

	};

	/*Plugin.prototype.onwindowresize = function() {
		var gameCarouselCaption = ($('#apps-container .store-slide-info .caption').length)? $('#apps-container .store-slide-info .caption') : $('#games-container .store-slide-info .caption');
		$(gameCarouselCaption).each(function() {
			var text = $(this).html();
			$(this).truncate('update', text);
			$(this).truncate('collapse');
		});
	};*/

	
	Plugin.prototype.init = function() {


		var _self = this;
		_self.$loadmore.hide();
		_self.$sortfilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.options.sort = data.item.value;
				_self.$appbox.html('');
				_self.$gamebox.html('');
				_self.fetchGames();


			}
		});
		
		_self.$gfntype.selectmenu({
			change: function(event, data) {
										
				
			if (data.item.value == "fg"){		
				
				
				_self.options.startValue = 0 ;
				_self.options.gameLimit = 9;
				_self.options.buyandplay = false;
				_self.options.includedwithmembership = false;
				_self.$gamebox.html('');
				_self.fetchGames();
				_self.$featuretab.css('padding-bottom','0px');
			
			}else if (data.item.value == "bp"){	
				
				_self.options.startValue = 0 ;
				_self.options.buyandplay = true;
				_self.$gamebox.html('');
				_self.fetchGames();
				_self.$featuretab.css('padding-bottom','0px');			
				
			}else if (data.item.value == "im"){	
				
				_self.options.startValue = 0 ;
				_self.options.buyandplay = false;
				_self.options.includedwithmembership = true;
				_self.$gamebox.html('');
				_self.fetchGames();
				_self.$featuretab.css('padding-bottom','0px');
			}
			
			}
		});

		_self.$devicefilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$gridfilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$bundlefilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$ratingsfilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$controllersfilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$freefilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});

		_self.$comingsoonfilter.selectmenu({
			change: function(event, data) {
				_self.options.startValue = 0;
				_self.$gamebox.html('');
				_self.fetchGames();
			}
		});
		
		_self.$loadmore.click(function(){
			//console.log('click more');
			_self.$loadmore.hide();
			 _self.options.startValue = _self.options.startValue;
			_self.ellipsisTitlesGames();
			_self.ellipsisTitles();
		});



		
		_self.ellipsisTitles();

		_self.ellipsisTitlesGames();

	};
	
	Plugin.prototype.toggleFilters= function(){
		var _self=this;
		var game_type=_self.options.gameType;
		if (game_type == "geforce-now"){
			_self.$element.find('.android-display').hide();
			_self.$element.find('.grid-display').show();
			_self.$element.find('#geforce-now-nav').addClass('active');
			_self.$element.find('#android-nav').removeClass('active');
			_self.$element.find('#device').next('.ui-selectmenu-button').hide();
			_self.$element.find('#free').next('.ui-selectmenu-button').hide();
			_self.$element.find('#coming_soon').next('.ui-selectmenu-button').hide();
			_self.$element.find('#bundle').next('.ui-selectmenu-button').hide();									
			_self.$element.find('#ratings').next('.ui-selectmenu-button').show();
			_self.$element.find('#grid').next('.ui-selectmenu-button').show();
			_self.$element.find('#bundle').next('.ui-selectmenu-button').show();
			_self.$element.find('#controllers').next('.ui-selectmenu-button').show();
			_self.$element.find('#gfntype').next('.ui-selectmenu-button').show();
			
			_self.$element.find('#fgames > .col > .games-navigation-tabs-item').addClass('active');
			_self.$element.find('#game-boxes').html('');
			//$('#fgames').trigger('click');
			//_self.fetchGames();

		}else if (game_type == "android"){

			_self.$element.find('.android-display').show();
			_self.$element.find('.grid-display').hide();
			_self.$element.find('#geforce-now-nav').removeClass('active');
			_self.$element.find('#android-nav').addClass('active');
			_self.$element.find('#gfntype').next('.ui-selectmenu-button').hide();
			_self.$element.find('#ratings').next('.ui-selectmenu-button').hide();
			_self.$element.find('#grid').next('.ui-selectmenu-button').hide();
			_self.$element.find('#bundle').next('.ui-selectmenu-button').hide();
			_self.$element.find('#controllers').next('.ui-selectmenu-button').hide();
			_self.$element.find('#free').next('.ui-selectmenu-button').show();
			_self.$element.find('#coming_soon').next('.ui-selectmenu-button').show();
			//_self.fetchGames();
		}
	};

	Plugin.prototype.ellipsisTitles= function(){
		var _self=this;
		var title = (_self.$element.find('.app .title').length)? _self.$element.find('.app .title') : _self.$element.find('.game .title');
		$(title).each(function(index) {
			$(this).truncate('update', $(this).data('title'));
		});

		$(title).truncate('collapse');


	};

	Plugin.prototype.ellipsisTitlesGames= function(){
		var _self=this;

		//console.log('ellipsisTitlesGames');
		//if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
			//if(_self.$element.find('#fgames .games-navigation-tabs-item').hasClass('active') == false){
				var loadingScreen = (_self.$element.find('.no-apps-results').length)? _self.$element.find('.no-apps-results') : _self.$element.find('.no-games-results');
				if (_self.options.currentlyLoading == false && !$(loadingScreen).is(':visible')) {
					if (_self.options.initialValue == 0){
						_self.options.startValue = _self.options.startValue;
						_self.options.initialValue = 1;
					}else{
						_self.options.startValue = _self.options.startValue + _self.options.gameLimit;
					}

					_self.fetchGames();
				}

			//}

		//}


	};
	Plugin.prototype.windowscroll= function(){	
		var _self=this;
		$(window).scroll(function() {
			if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
			//	if(_self.$element.find('#fgames .games-navigation-tabs-item').hasClass('active') == false){
					var loadingScreen = (_self.$element.find('.no-apps-results').length)? _self.$element.find('.no-apps-results') : _self.$element.find('.no-games-results');
					if (_self.options.currentlyLoading == false && !$(loadingScreen).is(':visible')) {
						if (_self.options.initialValue == 0){
							_self.options.startValue = _self.options.startValue;
							_self.options.initialValue = 1;
						}else{
							_self.options.startValue = _self.options.startValue + _self.options.gameLimit;
						}

						_self.fetchGames();
					}

			//	}

			}
		});
	};




	Plugin.prototype.fetchGames= function(){
		var _self = this;
		_self.options.currentlyLoading = true;
		_self.showLoadingImage();
		_self.options.currentGameBatch = [];
		
		// hide no results if visible
		var loadingScreen = (_self.$element.find('.no-apps-results').length)? _self.$element.find('.no-apps-results') : _self.$element.find('.no-games-results');
		if ($(loadingScreen).is(':visible')) {
			$(loadingScreen).hide();
		}
		
		var baseURL ="";
        var localeStr = _self.options.localeType;
        var language = localeStr.split("/")[0];
        var locale = localeStr.split("/")[1];
        if(language === 'gb'){
        	baseURL = 'https://shield.nvidia.co.uk/games/';
        	language="uk";
        }else if(language === 'us'){
        	baseURL = 'https://shield.nvidia.com/games/';
        }else if(language === 'cn'){
        	baseURL = 'http://shield.nvidia.' + language + '/games/';
        }else{
        	baseURL = 'https://shield.nvidia.' + language + '/games/';
        }
        
		$.get(this.makeGameURL(),
				function(response) {
			
			
			if (response.length <= 0){
				_self.$loadmore.hide();
			}else{
				_self.$loadmore.show();
			}
			// Loop through each response per batch
			for (var i = 0; i < response.length; i++) {
				// Creating a game object per game
				var game = {};
				// Getting all needed info
				game.title = response[i].title;
				game.id = response[i].id;
				game.gameTarget = '_blank';

				var isAndroid = false;
				if (_self.options.gameType === 'android') {
					isAndroid = true;
				}		
				
				if(language ==='cn') {
					game.gameTarget = '_self';
				}
				
				// TODO change to live URL
				switch(_self.options.gameType){
				case "android":
					if(language==='cn'){
						//baseURL = 'http://shield.aem.local/web/game-details.html?';
						game.detailPageURL = baseURL + 'android/' +response[i].object_name.slice(0, -4);
					} else {
						game.detailPageURL = 'https://play.google.com/store/apps/details?id='+ response[i].package_name +'&utm_source=nvidia-web&utm_medium=nvidia-web&utm_content=detail';
					}	
					break;
				case "geforce-now":
					//baseURL = 'http://shield.aem.local/web/game-details-pc.html?';
					game.detailPageURL = baseURL + 'geforce-now/' + response[i].machine_name;

					break;
				case "app":
					game.detailPageURL = baseURL + 'apps/' + response[i].machine_name;
					break;
				}

				game.price = response[i].price;

				if (game.price) {
					// ignore $ sign if included in response
					if (game.price.charAt(0) === '$') {
						//game.price = game.price.substring(1);
					}
				}

				game.only_on_shield = response[i].only_on_shield;
				game.grid_store_game = response[i].grid_store_game;
				game.included ='Included';


				if ((typeof(response[i].feature_image) !== 'undefined' && response[i].feature_image !== '')){
					if (isAndroid || _self.options.gameType === 'app') {
						game.feature_image = response[i].feature_image;
					} else {
						if(typeof(response[i].feature_image) !== 'undefined' && response[i].feature_image !== ''){
							game.feature_image = response[i].feature_image;
						}else if(typeof(response[i].hero_image) !== 'undefined' && response[i].hero_image !== ''){
							game.feature_image = response[i].hero_image;
						}else{
							game.feature_image = "";
						}
					}
				}

				/*try {
					//console.log(response[i]);
					game.ratingAvgValue = _self.getRatingClass(response[i].feedback.ratingAvgValue);
				} catch (e) {
					console.log("do nothing "+e);
				}*/

				// Store to currentGameBatch objects for rendering/appending
				_self.options.currentGameBatch.push(game);
			}

			_self.appendGames();
		});


	};
	
	
	
	Plugin.prototype.getRatingClass= function(value) {
		var _self=this;
         for (var i = 0; i < _self.options.ratingMatrix.length; i++) {
             if (_self.options.ratingMatrix[i][0] === value) {
                 return _self.options.ratingMatrix[i][1];
             }
         }
     };
     
     
	Plugin.prototype.appendGames= function(){
		var _self=this;

		var template = _.template(
				_self.options.template
		);
		var templateData = {
				gameData: _self.options.currentGameBatch
		};



		var loadingScreen = (_self.$element.find('.no-apps-results').length)? _self.$element.find('.no-apps-results') : _self.$element.find('.no-games-results');

		//var resultsArea = (_self.$appbox)?_self.$appbox : _self.$gamebox;
		var resultsArea =  _self.$gamebox;
		if (_self.options.currentGameBatch.length > 0) {
			$(resultsArea).append(template(templateData));
			_self.truncateTitle();
		} else {
			if (_self.options.startValue === 0) { // only show when getting new set of results, not appending more.
				$(loadingScreen).show();
			}
		}

		_self.options.currentlyLoading = false;

		// hide loading image
		_self.hideLoadingImage();

		// analytics
		// watchout
		_self.$element.find('#game-boxes .game a, #app-boxes .game a').unbind();

		// hide include
		//if( _self.$element.find('.col > .games-navigation-tabs-item').hasClass('active') == true){
			_self.$element.find('.grid-game-price').show();
		//}else{
		//	_self.$element.find('.grid-game-price').hide();
		//}

		_self.$element.find('#game-boxes .game a, #app-boxes .game a').click(function(e) {
			//e.preventDefault();
			var title = $($(this).find('.info .title')[0]).attr('data-title');
			var url = $(this).attr('href');

			//m2g_analytics.games_gameClick(title, url);
		});

		if(_self.options.gameType == 'geforce-now' && _self.$element.find('#fgames .games-navigation-tabs-item').hasClass('active') == true){
			_self.$sortele.hide();
			_self.$featuretab.css('padding-bottom','80px');
		}


	};

	Plugin.prototype.fetchGameCategories= function(){



		var _self = this;
		var gameContext = '';
		var otherApps = '';
		switch(_self.options.gameType){
		case 'android':
			gameContext = 'android';
			break;
		case 'geforce-now':
			gameContext = 'pcgames';
			break;
		case 'app':
			otherApps = true;
			break;
		}
		if(gameContext !== ''){
			gameContext = '&context=' + gameContext;
		}
		if(otherApps !== ''){
			otherApps = '&otherApps=true';
		}


		var baseURL ='';
		//console.log('fetch games');
				
		if (_self.$element.find('#games-container').attr('data-category') == "geforce-now"){
			baseURL = 'https://services.tegrazone.com/api/v3/pcgames/'+this.options.localeType+'/made2game/4.3.5?';
		}else if (_self.$element.find('#games-container').attr('data-category') == "android"){
			baseURL = 'https://services.tegrazone.com/api/v3/apps/'+this.options.localeType+'/made2game/4.3.5?';
		}
		$.get(baseURL  + gameContext + otherApps,
				function(response) {



			var genre_list_name = Array();
			var genre_list = Array();
			// Loop through each response per batch
			for (var i = 0; i < response.length; i++) {
				if (response[i].categories[0] != undefined){

					for (var j = 0; j < response[i].categories.length ; j ++){
						if(response[i].categories[j].name != null){
							if ($.inArray(response[i].categories[j].name, genre_list_name)  === -1) {
								genre_list_name.push(response[i].categories[j].name);
								genre_list.push({"id":response[i].categories[j].id,"name":response[i].categories[j].name});
								_self.ellipsisTitles();
							}
						}
					}

				}


			}

			//console.log(genre_list);

			$.each(genre_list, function(i, el){
				try {
					genre_list.sort(function(a,b){
					 	var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
						    if (nameA < nameB) //sort string ascending
						        return -1 
						    if (nameA > nameB)
						        return 1
						    return 0 //default return value (no sorting)
					 });
				}
				catch(err) {
				    console.log(err);
				}
				
				_self.$genrefilter.append(
						$('<option></option>').val(genre_list[i].id).html(genre_list[i].name)
				);
			});


			_self.$genrefilter.selectmenu({
				change: function(event, data) {
					_self.options.startValue = 0;
					_self.options.category = data.item.value;

					_self.$gamebox.html('');
					_self.$appbox.html('');

					_self.fetchGames();
				}
			});

			_self.options.sort = _self.$element.find('#sort option:selected').val();
			_self.options.category = _self.$element.find('#genre option:selected').val();


		});


	};

	Plugin.prototype.truncateTitle=function() {


		var _self = this;

		$(window).resize(function() {
			_self.ellipsisTitles();
		});

		// Init truncate Setup
		var title = (_self.$element.find('.app .title').length)? _self.$element.find('.app .title') : _self.$element.find('.game .title');
		$(title).truncate({
			lines: 2,
			lineHeight: 20
		});


	};

	Plugin.prototype.showLoadingImage= function() {
		var _self=this;
		var image = (_self.$element.find('.apps-loading').length)? _self.$element.find('.apps-loading') : _self.$element.find('.games-loading');
		$(image).addClass('active');
	};
	Plugin.prototype.hideLoadingImage= function() {
		var _self=this;
		var image = (_self.$element.find('.apps-loading').length)? _self.$element.find('.apps-loading') : _self.$element.find('.games-loading');
		$(image).removeClass('active');
	};



	Plugin.prototype.makeGameURL= function() {
		var _self=this;
		var selected_sort = _self.$element.find('#sort option:selected').val();
		var selected_device = _self.$element.find('#device option:selected').val();
		var selected_resolution = _self.$element.find('#grid option:selected').val();
		var selected_store = _self.$element.find('#bundle option:selected').val();
		var selected_controllers = _self.$element.find('#controllers option:selected').val();
		var selected_free = (_self.$element.find('#free option:selected').val() === '1') ? '&free_app=true' : '';
		var selected_comingsoon = (_self.$element.find('#coming_soon option:selected').val() === '1') ? '&coming_soon=true' : '';
		var selected_rating = _self.$element.find('#ratings option:selected').val();

		switch (selected_sort) {
		case 'title_asc':
			_self.options.orderby = 'title';
			_self.options.sort = "asc";
			break;
		case 'title_desc':
			_self.options.orderby = 'title';
			_self.options.sort = "desc";
			break;
		case 'featured':
			_self.options.orderby = 'feature_position';
			_self.options.sort = "desc";
			break;
		case 'release_date_asc':
			_self.options.orderby = 'release_date';
			_self.options.sort = "asc";
			break;
		case 'release_date_desc':
			_self.options.orderby = 'release_date';
			_self.options.sort = "desc";
			break;
		case 'created_asc':
			_self.options.orderby = 'created';
			_self.options.sort = "asc";
			break;
		case 'created_desc':
			_self.options.orderby = 'created';
			_self.options.sort = "desc";
			break;
		case 'updated_asc':
			_self.options.orderby = 'updated';
			_self.options.sort = "asc";
			break;
		case 'updated_desc':
			_self.options.orderby = 'updated';
			_self.options.sort = "desc";
			break;


		default:
			_self.options.orderby = 'feature_position';
		_self.options.sort = "desc";
		}

		if (selected_device !== "0" && typeof selected_device !== 'undefined') {
			if (selected_device === "1") {
				selected_device = '&only_on_shield=true';
			} else {
				selected_device = '&device_support=' + selected_device;
			}
		} else {
			selected_device = '';
		}
		if (selected_resolution !== "0" && typeof selected_resolution !== 'undefined') {
			selected_resolution = '&grid_profile_support=' + selected_resolution;
		} else {
			selected_resolution = '';
		}
		if (selected_store !== "0" && typeof selected_store !== 'undefined') {
			selected_store = '&grid_store_game=' + selected_store;
		} else {
			selected_store = '';
		}
		if (typeof selected_controllers !== 'undefined' && parseInt(selected_controllers) > 1) {
			selected_controllers = '&multi_controller_support=' + selected_controllers;
		} else {
			selected_controllers = '';
		}
		if (typeof selected_rating !== 'undefined' && selected_rating !== '0') {
			selected_rating = '&rating=' + selected_rating;
		} else {
			selected_rating = '';
		}



		var gamestreamGrid = '';
		if (_self.options.gameType == 'gamestream') {
			gamestreamGrid = '&gamestream_support=true';
		} else if (_self.options.gameType == 'geforce-now') {
			gamestreamGrid = '&grid_support=true';
		}


		var featuredtabs = '';
		if(_self.options.buyandplay == true){
			featuredtabs = '&grid_store_game=true';

		}else if (_self.options.includedwithmembership == true){
			featuredtabs = '&grid_store_game=false';
		}


		// TODO: change api call url
		var baseURL ='';
		//console.log(_self.options.gameType);
				
		if (_self.$element.find('#games-container').attr('data-category') == "geforce-now"){
			baseURL = 'https://services.tegrazone.com/api/v3/pcgames/'+this.options.localeType+'/made2game/4.3.5?';
			
		}else if (_self.$element.find('#games-container').attr('data-category') == "android"){
			baseURL = 'https://services.tegrazone.com/api/v3/apps/'+this.options.localeType+'/made2game/4.3.5?';
		}

		return baseURL + 'orderby=' + _self.options.orderby + '&sort=' + _self.options.sort + (_self.options.category > 0 ? '&category=' + _self.options.category : '') + '&start=' + _self.options.startValue + '&limit=' + _self.options.gameLimit + gamestreamGrid + selected_device + selected_free + selected_controllers + selected_store + selected_resolution + selected_comingsoon + selected_rating + featuredtabs;

	};

	Plugin.prototype.getQueryStringValue= function(key) {  
		return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
	} 


	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'shieldApps',
	defaults = {
			currentAppBatch: [],
		    currentlyLoading: false,
		    startValue: 0,
		    initialValue: 0,
		    orderby: null,
		    sort: null,
		    template: null,
		    category:null,
		    localeType: 'us/en_US'
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$appCarouselCaption=($('#shield-apps .swiper-slide .store-slide-info .caption').length)? $('#shield-apps .swiper-slide .store-slide-info .caption') : $('#games-container .swiper-slide .store-slide-info .caption');
		this.$shieldapps=this.$element.find('#shield-apps');
		this.$sortfilter= this.$element.find('#sort');
		this.$appbox= this.$element.find('#app-boxes');
		this.$genrefilter=this.$element.find('#genre');
		
		if (typeof this.options.localeType === "undefined" || this.options.localeType == "" ) this.options.localeType = 'us/en_US';
		
		this.onwindowresize();
		    // game/app queries initiate here...
		    if (this.$shieldapps.length != 0) {

		         if (this.$shieldapps.data('category') === 'apps') {
		        	this.options.platform = 'otherapps';
		        	this.options.gameType = 'app';
		        	this.options.template = '<% _.each( gameData, function( app ){ %><li class="android-app active"><div class="app"><a href="<%- app.detailPageURL %>"><div class="banner"><img src="<%- app.feature_image %>" alt="<%- app.title %>" title="<%- app.title %>" /></div><div class="info"><div data-title="<%- app.title %>" class="title"><%- app.title %></div><div class="app-rating"><% if(app.only_on_shield == true) { %> <div class="onlyShield">Only on SHIELD</div><% } %></div><div class="app-price"><% if (app.price !== "FREE") { %><div class="price"><%- app.price %></div><% } else { %><div class="price"><%- app.price %></div><% } %></div><div class="cf"></div></div></a></div></li><% }); %>';
		            this.init();
		        }
		    }

			 this.fetchAppCategories();
			 
			 
	};
	
	Plugin.prototype.onwindowresize = function() {
		var self=this;
		 window.onresize = function() {
		      self.$appCarouselCaption.each(function() {
		            var text = $(this).html();
		            $(this).truncate('update', text);
		            $(this).truncate('collapse');
		        });
		    };
	};

	Plugin.prototype.init = function() {

        var self = this;
        self.$sortfilter.selectmenu({
            change: function(event, data) {
            	//console.log("chnage fired");
                self.options.startValue = 0;
                self.options.sort = data.item.value;
               // console.log("chnage fired"+data.item.value);

                self.$appbox.html('');

                self.fetchApps();
            }
        });
        	
        	
        	
        
         self.ellipsisTitles();

      self.fetchApps();
    
		
	};

	Plugin.prototype.ellipsisTitles= function(){

        var title = ($('.app .title').length)? $('.app .title') : $('.game .title');
          $(title).each(function(index) {
              $(this).truncate('update', $(this).data('title'));
          });

          $(title).truncate('collapse');
      
		
	};
	
	Plugin.prototype.fetchApps= function(){

        var self = this;
        self.options.currentlyLoading = true;
        // activate loading image
        self.showLoadingImage();
        self.options.currentAppBatch = [];
        // hide no results if visible
        var loadingScreen = ($('.no-apps-results').length)? $('.no-apps-results') : $('.no-games-results');
        if ($(loadingScreen).is(':visible')) {
            $(loadingScreen).hide();
        }
        var baseURL = 'https://shield.nvidia.com/apps/';
        var localeStr = self.options.localeType;
        var language = localeStr.split("/")[0];
        var locale = localeStr.split("/")[1];
        if(language === 'gb'){
        	baseURL = 'https://shield.nvidia.co.uk/apps/';
        }else if(language === 'us'){
        	baseURL = 'https://shield.nvidia.com/apps/';
        }else{
        	baseURL = 'https://shield.nvidia.' + language + '/apps/';
        }
        
        $.get(self.makeAppURL(),
            function(response) {
                // Loop through each response per batch
                for (var i = 0; i < response.length; i++) {

                    // Creating a app object per app
                    var app = {};
                    // Getting all needed info
                    app.title = response[i].title;
                    app.id = response[i].id;
                    
                    // TODO change to live URL
                    if(self.options.gameType == 'app'){
                    	app.detailPageURL = baseURL + response[i].machine_name;
                    }
                    
                    app.price = response[i].price;

                    if (app.price) {
                        // ignore $ sign if included in response
                        if (app.price.charAt(0) === '$') {
                            
                        }
                    }

					app.only_on_shield = response[i].only_on_shield;
					app.grid_store_game = response[i].grid_store_game;
					app.included ='Included';
					
					 if ((typeof(response[i].feature_image) !== 'undefined' && response[i].feature_image !== '')){
                    if (self.options.gameType === 'app') {
                        app.feature_image = response[i].feature_image;
                    } else {
                      if(typeof(response[i].feature_image) !== 'undefined' && response[i].feature_image !== ''){
                        app.feature_image = response[i].feature_image;
                      }else if(typeof(response[i].hero_image) !== 'undefined' && response[i].hero_image !== ''){
                        app.feature_image = response[i].hero_image;
                      }else{
                        app.feature_image = "";
                      }
                    }
                    }
                    
                    try {
                        app.ratingAvgValue = self.getRatingClass(response[i].feedback.ratingAvgValue);
                    } catch (e) {
                        // do nothing
                    }

                    // Store to currentGameBatch objects for rendering/appending
                    self.options.currentAppBatch.push(app);
                }

                self.appendApps();
            });


    
		
	};
	Plugin.prototype.appendApps= function(){
		
var self=this;
        var template = _.template(
        		self.options.template
        );
        var templateData = {
            gameData: self.options.currentAppBatch
        };


        var loadingScreen = ($('.no-apps-results').length)? $('.no-apps-results') : $('.no-games-results');
        var resultsArea = ($('#app-boxes').length)? $('#app-boxes') : $('#game-boxes');
        //console.log(resultsArea);
        if (self.options.currentAppBatch.length > 0) {
            $(resultsArea).append(template(templateData));
            self.truncateTitle();
        } else {
            if (self.options.startValue === 0) { // only show when getting new set of results, not appending more.
                $(loadingScreen).show();
            }
        }

        self.options.currentlyLoading = false;

        // hide loading image
        self.hideLoadingImage();

        // analytics
        // watchout
        $('#app-boxes .android-app .app a').unbind();


        $('#app-boxes .android-app .app a').click(function(e) {
            //e.preventDefault();
            var title = $($(this).find('.info .title')[0]).attr('data-title');
            var url = $(this).attr('href');

        });

    
		
	};
	
	Plugin.prototype.fetchAppCategories= function(){
		var self=this;

       // var genreSelect = $('#genre');
        var appContext = '';
        var otherApps;
       
       if(self.options.gameType == 'app'){
       		otherApps = true;
       }
     	if(appContext !== ''){
          appContext = '&context=' + gameContext;
        }
        if(otherApps !== ''){
          otherApps = '&otherApps=true';
        }


        var baseURL = 'https://services.tegrazone.com/api/v3/otherapps/'+this.options.localeType+'/made2game/4.3.5?';
        $.get(baseURL + 'method=getAppCategories' + otherApps,
            function(response) {
            	                	
            	var genre_list_name = Array();
            	var genre_list = Array();
                // Loop through each response per batch
                for (var i = 0; i < response.length; i++) {
                	if (response[i].categories[0] != undefined){
                		
                		for (var j = 0; j < response[i].categories.length ; j ++){
                			
                			if ($.inArray(response[i].categories[j].name, genre_list_name)  === -1) {
                			genre_list_name.push(response[i].categories[j].name);
                			genre_list.push({"id":response[i].categories[j].id,"name":response[i].categories[j].name});
                			}
                		}

                	}


                }
               
              
				
				$.each(genre_list, function(i, el){
					
					 genre_list.sort(function(a,b){
						 	var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
							    if (nameA < nameB) //sort string ascending
							        return -1 
							    if (nameA > nameB)
							        return 1
							    return 0 //default return value (no sorting)
						 });
					
					 self.$genrefilter.append(
                            $('<option></option>').val(genre_list[i].id).html(genre_list[i].name)
                        );
				});
			

				self.$genrefilter.selectmenu({
                    change: function(event, data) {
                    	self.options.startValue = 0;
                        self.options.category = data.item.value;
                        // analytics
                        //m2g_analytics.games_sortFilter();
                        //$('#game-boxes').html('');
                        $('#app-boxes').html('');
                        // re-fetch games when genre is selected
                        self.fetchApps();
                    }
                });

                self.options.sort =self.$element.find('#sort option:selected').val();
                self.options.category = self.$element.find('#genre option:selected').val();

            });
    
		
	};
	
	Plugin.prototype.truncateTitle=function() {
        var that = this;

        // Init truncate Setup
        var title = ($('.app .title').length)? $('.app .title') : $('.game .title');
        $(title).truncate({
            lines: 2,
            lineHeight: 20
        });
    };
    
    Plugin.prototype.showLoadingImage= function() {
        var image = ($('.apps-loading').length)? $('.apps-loading') : $('.games-loading');
        $(image).addClass('active');
    };
    Plugin.prototype.hideLoadingImage= function() {
        var image = ($('.apps-loading').length)? $('.apps-loading') : $('.games-loading');
        $(image).removeClass('active');
    };
    Plugin.prototype.makeAppURL= function() {
       
        var selected_sort = this.$element.find('#sort option:selected').val();

         
        switch (selected_sort) {
            case 'title_asc':
                this.options.orderby = 'title';
                this.options.sort = "asc";
                break;
            case 'title_desc':
            	this.options.orderby = 'title';
            	this.options.sort = "desc";
                break;
            case 'featured':
            	this.options.orderby = 'feature_position';
            	this.options.sort = "desc";
                break;
            case 'release_date_asc':
            	this.options.orderby = 'release_date';
            	this.options.sort = "asc";
                break;
            case 'release_date_desc':
            	this.options.orderby = 'release_date';
            	this.options.sort = "desc";
                break;

            default:
            	this.options.orderby = 'feature_position';
            	this.options.sort = "desc";
        }
        
        // TODO: change api call url
        var baseURL ='https://services.tegrazone.com/api/v3/otherapps/'+this.options.localeType+'/made2game/4.3.5?';
        return baseURL + 'orderby=' + this.options.orderby + '&sort=' + this.options.sort + (this.options.category > 0 ? '&category=' + this.options.category : '');
    }
	

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'sectionEnhancedComponent',
	screenSize = $ (window ).width(),
	pixelSize = window.devicePixelRatio,
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint,  
	defaults = {
		imageDesktopUrl:"",
		imageLaptopUrl:"",
		imageTabletUrl:"",
		imageMobileUrl:"",
		secpageobpvalue:"",
        sectionurl:"",
        sectionurltarget:"",
		secCustBgColor:""
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		/*parent as mane object*/
		this.$element = $(this.element).parent();
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$sectionclass=this.$element.parent().find('.sectionbgclass');
        this.init();

	};

	Plugin.prototype.init = function() {

	    var self = this;
	    self.setImage();

	    //var sectionurl = self.getValidURL(this.options.sectionurl); 
	    var sectionurl = this.options.sectionurl;
	    var sectionurltarget = this.options.sectionurltarget;


	    this.$sectionclass.click(function() {

	    	if (event.target.nodeName === "SECTION" || event.target.nodeName === "P" || event.target.nodeName === "DIV" || event.target.nodeName === "H2" || event.target.nodeName === "H3" || event.target.nodeName === "H4" || event.target.nodeName === "SPAN") {

	            if ((sectionurltarget === "overlay") && (!sectionurl.startsWith("mailto:")) ) {
	                var modalWidth = "80%";
	                var modalHeight = "80%";

	                if (sectionurl.indexOf('#') != -1) {                        
	                	
	                	if ($(sectionurl).data("width")) {
		                    modalWidth = $(sectionurl).data("width");
		                }
		                if ($(sectionurl).data("height")) {
		                    modalHeight = $(sectionurl).data("height");
		                }

	                    $.colorbox({
	                        inline: true,
	                        href: sectionurl,
	                        width: modalWidth,
	                        maxHeight: modalHeight
	                    });

	                } else {

	                    $.colorbox({
	                        href: sectionurl,
	                        iframe: true,
	                        inline: false,
	                        width: modalWidth,
	                        maxHeight: modalHeight

	                    });
	                }

	            } else {

	                if ((sectionurl.startsWith("mailto:"))) {
	                    var iframestring = "<iframe  id='emailtrigger' src=\"" + sectionurl + "\">";
	                    $(iframestring).appendTo('body').css("display", "none");
	                    $("#emailtrigger").remove();

	                } else if ((sectionurl === "") || (sectionurl === "#")) {                        
	                    window.open(sectionurl, "_self");
	                } else if(sectionurltarget === "_blank"){
                        window.open(sectionurl, '_blank', 'noreferrer,noopener');
                    }else {
	                    window.open(sectionurl, sectionurltarget);
	                }
	            }

	        } else {
	        	/*do nothing*/
	        	//window.open(sectionurl, sectionurltarget);
	        }


	    });


	};
	
/*	Plugin.prototype.getValidURL= function(url){
		if (url == null) {
			return "";
		}
		// case of CQ path /content
		if (url.startsWith("/content")) {
			// if the url is from the dam like a .pdf or .jpg
			if (url.includes(".")) {
				return url;
			} else if (url.includes("?")) {
				return StringUtils.replace(url, "?", ".html?");
			} else {
				
				if((NVIDIAGDC.web.env).startsWith("a-")){				
					
					url += ".html";
	                return url;
                
				}else{
					var shortenurlstrings = url.split('/');
	                var localestring = "/"+shortenurlstrings[4].toLowerCase().replace("_", "-")+"/";
	                url = url.substring(28);
					var urlformed = location.protocol+'//'+window.location.hostname+localestring+url+".html";
	                return urlformed;
				}
                
                
                
			}

			// empty or hashtag, just return the url
		} else if ((url === "") || (url === "#") ) {
			return url;

		} else if (url.startsWith("//")) {
			return url;
		}
		else if (url.startsWith("mailto:")) {
			return url;
		}
		// if external url, make sure it starts with http://
		// don't modify a url that starts with javascript
		else if (!url.startsWith("http") && !url.startsWith("javascript") && !url.startsWith("HTTP") && !url.startsWith("#")) {
			return "http://" + url;

		} else {
            
			return url;
		}	

	} */

	Plugin.prototype.setImage= function(){

		// We load the mobile image for devices with a viewport of 767px or less
		// We load the desktop image for devices with a viewport betweek 768 and 1024 px
		// We load the desktop image for devices with a viewport of 1025px or bigger
		/* TODO: fix this once retina display issue is fixed.*/
		var secpgoldbreakpimg = this.options.secpageobpvalue;
        var secpgobpimgvalue = (secpgoldbreakpimg === "false");


		if (pixelSize > 5) {
			if (screenSize < tabletBreakpoint){	
				var highres = this.options.imageMobileUrl;

				if(highres.indexOf('@2x')>=0) {						
					this.$element.css({'background-image': 'url(' + highres + ')','background-color':  this.options.secCustBgColor });							
				} else {
					this.setValidImg(this.$element, this.options.imageMobileUrl.replace(".", "@2x."), this.options.imageMobileUrl,  this.options.secCustBgColor);
				}
			} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint){
				var highres = this.options.imageTabletUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css({'background-image': 'url(' + highres + ')','background-color':   this.options.secCustBgColor });				
				} else {
					this.setValidImg(this.$element, this.options.imageTabletUrl.replace(".", "@2x."), this.options.imageTabletUrl,  this.options.secCustBgColor);
				}
			} else if ( ((screenSize >= desktopBreakpoint) && (screenSize < largeDesktopBreakpoint)) && secpgobpimgvalue ) {
				var highres = this.options.imageLaptopUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css({'background-image': 'url(' + highres + ')','background-color':   this.options.secCustBgColor });
				} else {
					this.setValidImg(this.$element, this.options.imageLaptopUrl.replace(".", "@2x."), this.options.imageLaptopUrl,  this.options.secCustBgColor);
				}				
			} else {				
				var highres = this.options.imageDesktopUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css({'background-image': 'url(' + highres + ')','background-color':   this.options.secCustBgColor });
				} else {
					this.setValidImg(this.$element, this.options.imageDesktopUrl.replace(".", "@2x."), this.options.imageDesktopUrl,  this.options.secCustBgColor);
				}
			}    
	  } else {
		if (screenSize < tabletBreakpoint) {
            this.$element.css({'background-image': 'url(' + this.options.imageMobileUrl + ')','background-color':   this.options.secCustBgColor });			
		} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint) {
            this.$element.css({'background-image': 'url(' + this.options.imageTabletUrl + ')','background-color':   this.options.secCustBgColor });			
		} else if ( ((screenSize >= desktopBreakpoint) && (screenSize < largeDesktopBreakpoint)) && secpgobpimgvalue ) {	    	
			this.$element.css({'background-image': 'url(' + this.options.imageLaptopUrl + ')','background-color':   this.options.secCustBgColor });		    	
	    }  else {
            this.$element.css({'background-image': 'url(' + this.options.imageDesktopUrl + ')','background-color':   this.options.secCustBgColor });
			
		}
	  }
	}
	
	//Checks the image is available for public, if not fall back to published image
	  Plugin.prototype.setValidImg= function(imgelement, targetsrc, regimg, seccustbgcolor) {
		  $.get(targetsrc) 
			.done(function() {
                imgelement.css({'background-image': 'url(' + targetsrc + ')','background-color':  seccustbgcolor });
				}).fail(function() {
                imgelement.css({'background-image': 'url(' + regimg + ')','background-color':  seccustbgcolor });
				});
		}
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'sectionComponent',
	screenSize = $ (window ).width(),
	pixelSize = window.devicePixelRatio,
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint,  
	defaults = {
		imageDesktopUrl:"",
		imageTabletUrl:"",
		imageMobileUrl:""
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		/*parent as mane object*/
		this.$element = $(this.element).parent();
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		var self = this;
		self.setImage();
	};

	Plugin.prototype.setImage= function(){
		// We load the mobile image for devices with a viewport of 767px or less
		// We load the desktop image for devices with a viewport betweek 768 and 1024 px
		// We load the desktop image for devices with a viewport of 1025px or bigger
		/* TODO: fix this once retina display issue is fixed.*/
		if (pixelSize > 5) {
			if (screenSize < tabletBreakpoint){	
				var highres = this.options.imageMobileUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css('background-image', 'url(' + highres + ')');				
				} else {
					this.setValidImg(this.$element, this.options.imageMobileUrl.replace(".", "@2x."), this.options.imageMobileUrl);
				}
			} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint){
				var highres = this.options.imageTabletUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css('background-image', 'url(' + highres + ')');				
				} else {
					this.setValidImg(this.$element, this.options.imageTabletUrl.replace(".", "@2x."), this.options.imageTabletUrl);
				}
			} else {				
				var highres = this.options.imageDesktopUrl;
				if(highres.indexOf('@2x')>=0) {
					this.$element.css('background-image', 'url(' + highres + ')');
				} else {
					this.setValidImg(this.$element, this.options.imageDesktopUrl.replace(".", "@2x."), this.options.imageDesktopUrl);
				}
			}    
	  } else {
		if (screenSize < tabletBreakpoint) {
			this.$element.css('background-image', 'url(' + this.options.imageMobileUrl + ')');
			//this.$element.find('.responsive-image').attr("src",this.options.imageMobileUrl);
		} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint) {
			this.$element.css('background-image', 'url(' + this.options.imageTabletUrl + ')');
			//this.$element.find('.responsive-image').attr("src",this.options.imageTabletUrl);
		} else {
			this.$element.css('background-image', 'url(' + this.options.imageDesktopUrl + ')');
			//this.$element.find('.responsive-image').attr("src",this.options.imageDesktopUrl);
		}
	  }
	}
	
	//Checks the image is available for public, if not fall back to published image
	  Plugin.prototype.setValidImg= function(imgelement, targetsrc, regimg) {
		  $.get(targetsrc) 
			.done(function() {
				imgelement.css('background-image', 'url(' + targetsrc + ')');
				}).fail(function() {
					imgelement.css('background-image', 'url(' + regimg + ')');
				});
		}
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);
(function($, window, document, undefined) {

    // Default options
    var pluginName = 'searchResults',
        defaults = {
    		defaultPath : "https://images.nvidia.com/etc/designs/nvidiaGDC/clientlibs_search/images/icon-default.jpg"
    	};

    // Plugin constructor
    function Plugin(element, options) {

        //Cache references
        this.element = element;
        this.$element = $(this.element);
        this.$key = $(this.element).attr('id');
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    Plugin.prototype.init = function() {
    	var $resultDesc = $(".result-desc");
    	
    	$resultDesc.dotdotdot();
    	
    	$(window).resize(function() {
    		$resultDesc.dotdotdot();
    	});
    	
    	var $resultImage = $(".result-image"),
    		defaultPath = this.options.defaultPath;

    	$resultImage.each(function() { 
    		var 
	    		imagePath = this.style.backgroundImage.replace(/"/g,"").replace(/url\(|\)$/ig, ""),
				imageDefault = defaultPath,
				imageIndex = this.dataset.index - 1,
				image = new Image();	
	
			image.onerror = function() {
				$resultImage[this.dataset.index].style.backgroundImage = "url("+ imageDefault +")";
			};
	
			image.src = imagePath;
			image.dataset.index = imageIndex;
    	});
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
(function($, window, document, undefined) {

    // Default options
    var pluginName = 'searchBox',
        defaults = {    		
        	queryParameter: null,    		
    		autoComplete: false,
    		acFooterText: null,
    		acCharacterLimit: null,
    		acEnablePreloader: true,
    		acServiceUrl: null    		
        };

    // Plugin constructor
    function Plugin(element, options) {

        //Cache references
        this.element = element;
        this.$element = $(this.element);
        this.$key = $(this.element).attr('id');
        this.$navParent = this.$element.closest('#main-header'),
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function() {
    	    	    
    	//if search is within the header allow it to be expanded when in minimal view
    	if (this.$navParent.length) {
    		this.setupExpandableState();    		
    	}
    		    	
    	this.setupFormSubmission();
    	
    	if (this.options.autoComplete && this.options.acServiceUrl) {
    		this.setupAutoComplete();
    	}   	
    };
    
    Plugin.prototype.setupExpandableState = function() {
    	
    	var 
			$inputField = this.$element.find('input[type="search"]'),
			$inputSubmit = this.$element.find('input[type="submit"]'),
			$navParent = this.$navParent,
			$searchToggle = $navParent.find('.search-toggle');
    	
    	
    	$inputField.focusin(function() {
    		$navParent.removeClass('search-minimised').addClass('search-expanded');
    	}).blur(function() {

    		//only 'blur' if close button is not present and autocomplete is not open
    		if ($navParent.length && $searchToggle.is(":hidden") && !$navParent.hasClass('autocomplete-open')) {
    			$navParent.removeClass('search-expanded').addClass('search-minimised');    			
    		}
    		
    	});
    };
 
	
    Plugin.prototype.setupFormSubmission = function() {
    	var 
    		formUrl = this.$element.find('.form').data('href'),
    		queryParameter = this.options.queryParameter,
    		$inputField = this.$element.find('input[type="search"]'),
    		$inputSubmit = this.$element.find('input[type="submit"]');
    		$searchabort = this.$element.find('.search-abort');
	    	$searchabort.click(function() {
				$(".input-search-box").val("");
			});
        
    	$inputField.on('keypress', function(e) {    		    		
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13) {
            	$inputSubmit.trigger('click');
            }
        });
    	
    	$( "#search-icon-box" ).on('click', function(e){   
    		e.preventDefault();
    		if($inputField.val() != ""){
    			$( "#search-form" ).submit();
    		}
    	});
    	
        $inputSubmit.on('click', function(e){        	
            e.preventDefault();
            var 
            	value = $inputField.val(),
            	fullUrl = updateUrl(formUrl,queryParameter,value);
            
            
            if(value != ""){
            	window.location.href = fullUrl;
            }
        });

        /**
         * A private method to append the query parameter to the formUrl.
         */
        var updateUrl = function(actionUrl,queryParameter,value){

            if(actionUrl.indexOf("?")>0){
                return actionUrl + "&" + queryParameter + "=" + value;
            }else{
                return actionUrl + '?' + queryParameter + '=' + value;
            }
        };
            	
    };

    
    Plugin.prototype.setupAutoComplete = function() {
    	
    	//quit if third party autocomplete library not loaded
    	if(typeof YAHOO.widget.AutoComplete == "undefined") { 
    		return false; 
    	} 
    	
    	var 
    		$containerParent = this.$element,
    		$searchAutoComplete = this.$element.find('.search-autocomplete')[0],
    		$navParent = this.$navParent,
    		$inputField = this.$element.find('input[type="search"]')[0],
    		footerText = this.options.acFooterText,
    		characterLimit = this.options.acCharacterLimit,
    		$inputSubmit = this.$element.find('input[type="submit"]');
    	    	
    	//setup thirdparty data structure 
    	var 
    		g_staged = (document.getElementById("sp_staged") ? document.getElementById("sp_staged").value : 0),
    		protocol = (document.location.protocol == "https:" ? "https:" : "http:"),
    		postfix = (g_staged ? "-stage/" : "/"),
    		//acDS = new YAHOO.util.ScriptNodeDataSource((protocol + "//content.lon5.atomz.com/autocomplete/sp10/04/e2/21" + postfix));
    		acDS = new YAHOO.util.ScriptNodeDataSource((protocol + '//' + this.options.acServiceUrl + postfix));    		
    	
    	//autocomplete config
    	acDS.asyncMode="ignoreStaleResponses";
    	acDS.maxCacheEntries = 1000;
    	acDS.responseSchema = {resultsList: "ResultSet.Result",fields: ["phrase"]};    	    	
    	var acObj = new YAHOO.widget.AutoComplete($inputField, $searchAutoComplete, acDS);    	
    	
    	acObj.queryDelay = 0.5;
    	acObj.useShadow = false;
    	acObj.autoHighlight = false;
    	acObj.minQueryLength = 1;
    	acObj.maxResultsDisplayed = 6;
    	acObj.animVert = false;
    	acObj.queryQuestionMark = true;
    	acObj.resultTypeList = false;
    	acObj.alwaysShowContainer = false;
    	acObj.autoSnapContainer  = false;
    	acObj.typeAhead = true;
    	acObj.highlightClassName = 'hover';
    	
    	acObj.formatResult = function(oResultData, sQuery, sResultMatch) {
    		
			//truncate if character limit set
			if (characterLimit && (sResultMatch.length > characterLimit) ) {
				sResultMatch = sResultMatch.substring(0,characterLimit) + '...';		
			}
    		
			//highlight characters that match input
			var highlighted = sResultMatch.replace(new RegExp(sQuery, 'gi'), function highlight(x){ return '<b>'+ x +'</b>'; });     	   
			return highlighted;
    	};

    	
    	if (footerText)  {    		
    		var footerHtml =  '<span>' + footerText + '</span>';
    		acObj.setFooter(footerHtml);	
    	}
    	
    	acObj.generateRequest = function(q) {return "?query=" + q + "&max_results=" + acObj.maxResultsDisplayed;};
    	var acSH = function(){document.searchform.submit();};
    	acObj.itemSelectEvent.subscribe(acSH);    	
    	
    	//set class for autocomplete open state
    	if ($navParent) {
	    	acObj.containerExpandEvent.subscribe(function (acType, acInstance) {
	    		$navParent.addClass('autocomplete-open');    		
	    	});
	    	    	
	    	acObj.containerCollapseEvent.subscribe(function (acType, acInstance) {
	    		$navParent.removeClass('autocomplete-open');
	    	});
    	}
    	
    	//Submit search on click, enter, or tab
    	acObj.itemSelectEvent.subscribe(function (acType, acInstance) {
    		$inputSubmit.trigger('click');
    	});
    	    	
    	 //Preloader animation starts on query submission and ends on data return
    	if (this.options.acEnablePreloader) {
        	acObj.dataRequestEvent.subscribe(function (acEvent, acInstance) {
        		$containerParent.addClass('loading');
        	});

        	acObj.dataReturnEvent.subscribe(function (acEvent, acInstance) {
        		$containerParent.removeClass('loading');
        	});    		
    	}
    	    	
    	//set footer click behaviour to submit input  	
    	$containerParent.find('.yui-ac-ft').on('click', function(e) {
    		e.stopPropagation(); //bug fix - Disable YUI parent event which creates 'undefiend' input value.    		
    		$inputSubmit.trigger('click');
    	});
    	    	    
    }

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
;
(function($, window, document, undefined) {

    // Default options
    var pluginName = 'researchandpublications',
        screenSize = $(window).width(),
        largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
    	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
    	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
        defaults = {

        };

    // Plugin constructor
    function Plugin(element, options) {
        // Cache references
        this.element = element;
        this.$element = $(this.element);
        this.$key = $(this.element).attr('id');
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Plugin.prototype.init = function() {

        var self = this;
        var dialogrenderlist = $(self.element).find(".researchlistcontainer").data('mode');
        var researchtype = dialogrenderlist;        
        var researchareaid = $(self.element).find(".researchlistcontainer").data('rschid');
        var volerrmsg= $(self.element).find(".researchlistcontainer").data('volmsg');
        var appnvidiaurl = NVIDIAGDC.apps.endpoint;
        if (dialogrenderlist === "publications") {
            self.callListPublications(researchtype, researchareaid, appnvidiaurl, volerrmsg);
        }

        if (dialogrenderlist === "persons") {
            self.callListPersons(researchtype, researchareaid, appnvidiaurl, volerrmsg);
        }
    };

    Plugin.prototype.callListPublications = function(researchtype, researchareaid, appnvidiaurl, volerrmsg) {

       var callvltrnurl = appnvidiaurl + "/research-api/research-area/" + researchareaid + "/" + researchtype;       

        $.ajax({
            type: "GET",
            dataType: "json",
            url: callvltrnurl,
            success: function(result) {
                var pubobjlist = result.publications.list;                
                if(pubobjlist){
                	var keys = Object.keys(pubobjlist);
                    var half = Math.ceil(keys.length / 2);
	                for (var i = 0; i < half; i++) {
	                    if (pubobjlist[keys[i]].title) {
	                        $('#firsthalflist').append('<li><a href="' + pubobjlist[keys[i]].url + '"title="' + pubobjlist[keys[i]].title + '">' + pubobjlist[keys[i]].title + '</a></li>');
	                    }
	                }
	                for (var i = half; i < keys.length; i++) {
	                    if (pubobjlist[keys[i]].title) {
	                        $('#secondhalflist').append('<li><a href="' + pubobjlist[keys[i]].url + '"title="' + pubobjlist[keys[i]].title + '">' + pubobjlist[keys[i]].title + '</a></li>');
	                    }
	                }
                }
            },
            error: function(result) {
                console.log("Nvidia Logger:: API call got failed");
                $("#publicationlist").append('<div class="text-center"><h4 class="color-error-red">'+volerrmsg+'</h4></div>');
            }

        });
    };


    Plugin.prototype.callListPersons = function(researchtype, researchareaid, appnvidiaurl, volerrmsg) {
        var callvltrnurl = appnvidiaurl + "/research-api/research-area/" + researchareaid + "/" + researchtype;
       
        $.ajax({
            type: "GET",
            dataType: "json",
            url: callvltrnurl,
            success: function(result) {
            	 /* Function starts here  */
                function splitJsonToThreeColumn(columnlistArray, numcolmns){
	                var index = 0;
	                var arrayLength = columnlistArray.length;
	                var tempColumnArray = [];                
	                for (index = 0; index < arrayLength; index += numcolmns) {
	                    eachColumn = columnlistArray.slice(index, index+numcolmns);
	                    tempColumnArray.push(eachColumn);
	                }
	                return tempColumnArray;
                }
                /* Function Ends here */                
                	var personobjlist = result.persons.list;
                	if(personobjlist){
	                	var numberofcolumns = Math.ceil((Object.keys(personobjlist)).length / 3);
	                    var coumnlistdata = splitJsonToThreeColumn(personobjlist, numberofcolumns);
	                    if(coumnlistdata[0]){
	                    	for (var i = 0; i < coumnlistdata[0].length; i++) {
	                    		$('#firstpeoplelist').append('<li><a href="' + coumnlistdata[0][i].url + '"title="' + coumnlistdata[0][i].title + '">' + coumnlistdata[0][i].title + '</a></li>');
	                    	}
	                    }
		                if(coumnlistdata[1]){
		                	for (var i = 0; i < coumnlistdata[1].length; i++) {
		                    $('#secondpeoplelist').append('<li><a href="' +  coumnlistdata[1][i].url + '"title="' +  coumnlistdata[1][i].title + '">' +  coumnlistdata[1][i].title + '</a></li>');
		                	}
		                }
		                if(coumnlistdata[2]){                    
		                    for (var i = 0; i < coumnlistdata[2].length; i++) {
		                    $('#thirdpeoplelist').append('<li><a href="' + coumnlistdata[2][i].url + '"title="' + coumnlistdata[2][i].title + '">' +  coumnlistdata[2][i].title + '</a></li>');
		                    }
		                }
                	}
                
            },
            error: function(result) {
                console.log("Nvidia Logger:: API call got failed");
                $("#personlist").append('<div class="text-center"><h4 class="color-error-red">'+volerrmsg+'</h4></div>'); 
            }

        });

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
;
(function($, document, undefined) { 

	// Default options
	var pluginName = 'productTileComponent',
	defaults = {};
	
	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};	
	Plugin.prototype.init = function() {
		var self = this;
		self.showSpecsImg();	
	}	
	
	Plugin.prototype.showSpecsImg = function() {
		$('.specifications .button').each(function() {
			if($(this).find('.btn').length > 0) {  
				$(this).prev().show();
			}
		});
	}
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}
})(jQuery, document);
;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "newsFeed",
    defaults = {
        itemCountToShow: 3,
        feedFetchTimeout: 10000,
        modifierClass: '',
        messages: {
            feedNotAvailable: "The news feed is not available"
        },
        monthNames: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        feeds: []
    };

    function Plugin (element, options) {
        
        this.element = element;
        this.$element = $(this.element);

        this.$loader = this.$element.find('.news-feed__loading');
        this.$notAvailableMessage = this.$element.find('.news-feed__not-available');
        this.$feedContainer = this.$element.find('.news-feed__container');

        this.$template = $('#latestNewsTemplate')
        this.template = $('#latestNewsTemplate').html();

        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    $.extend( Plugin.prototype, {

        init: function() {

            var that = this;

            that.$loader.addClass('news-feed__loading__visable');

            var feedRequests = that.options.feeds.map(function(feedDefinition) {

                return that.createDeferredFromFeedDefinition(feedDefinition, that.options.feedFetchTimeout);

            });
            var combinedRequest = $.when.apply($, feedRequests).then(function() {

                var results = Array.prototype.slice.call(arguments);
                var mergedResults = [].concat.apply([], results);
                var sortedResults = that.sortNewsItems(mergedResults);
                return sortedResults.slice(0, that.options.itemCountToShow);

            }).then(function(newsItems) {

                var rendered = Mustache.render(that.template, {
                    modifierClass: that.options.modifierClass,
                    items: newsItems,
                    getFormattedDate: function() {
                        return that.options.monthNames[this.date.getMonth()] + " " + that.padDateString(this.date.getDate() + '') + ", " + this.date.getFullYear()
                    }
                });
                that.addItemsToPage(rendered);
                
            });

            combinedRequest.fail(function($newsItems) {

                that.$notAvailableMessage.show().text(that.options.messages.feedNotAvailable);

            }); 

            combinedRequest.always(function($newsItems) {

                that.$loader.removeClass('news-feed__loading__visable');

            });          
            
        },

        createDeferredFromFeedDefinition: function(feedDefinition, timeout) {

            return $.ajax({
                url: feedDefinition.url,
                dataType: "xml",
                timeout: timeout,
            }).then(function(data) {
                var $data = $(data);
                var items = $data.find("feed entry");
                var itemsArray = items.map(feedDefinition.parserFn).get();
                return itemsArray.filter(feedDefinition.filterFn);

            }).fail(function() {
                console.warn('Could not load news feed for: ', feedDefinition);
            });

        },

        sortNewsItems: function(newsItems) {

            return newsItems.slice(0).sort(function(a, b) {
            	return (a.date < b.date)?1:(a.date > b.date)?-1:0;
            }); 

        },

        addItemsToPage: function(html) {

            $(this.element).html(html);

        },

        padDateString: function(date) {

            var stringDate = date+'';
            if(stringDate.length < 2) {
                stringDate = '0' + stringDate;
                return stringDate;
            } else {
                return stringDate;
            }

        }        

    });

    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        });
    };

})(jQuery, window, document);
;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "geExperienceNewsFeed",
    defaults = {
        itemCountToShow: 3,
        feedFetchTimeout: 10000,
        modifierClass: '',
        messages: {
            feedNotAvailable: "The news feed is not available"
        },
        monthNames: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        feeds: []
    };

    function Plugin (element, options) {
        
        this.element = element;
        this.$element = $(this.element);

        this.$loader = this.$element.find('.news-feed__loading');
        this.$notAvailableMessage = this.$element.find('.news-feed__not-available');
        this.$feedContainer = this.$element.find('.news-feed__container');

        this.$template = $('#ge-force-experience-template')
        this.template = $('#ge-force-experience-template').html();

        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    $.extend( Plugin.prototype, {

        init: function() {

            var that = this;
            that.$loader.addClass('news-feed__loading__visable');

            var feedRequests = that.options.feeds.map(function(feedDefinition) {
                return that.createDeferredFromFeedDefinition(feedDefinition, that.options.feedFetchTimeout, that);
            });
            var combinedRequest = $.when.apply($, feedRequests).then(function() {
            	
            	var results = Array.prototype.slice.call(arguments[0][0].articlePagesList.map(that.parserjsonFn));
                var mergedResults = [].concat.apply([], results);
                // Results are already sorting by desc, so commented below sorting
                //var sortedResults = that.sortNewsItems(mergedResults);
                return mergedResults.slice(0, that.options.itemCountToShow);

            }).then(function(newsItems) {
                if(newsItems && newsItems !== 'undefined' && newsItems.length > 0 ) {
                    var item = JSON.parse(JSON.stringify(newsItems));
                    var rendered = '';
                    rendered = Mustache.render(that.template, { 
                        modifierClass: that.options.modifierClass,
                        items: item
                    });
    
                    /* var rendered = Mustache.render(that.template, {
                        modifierClass: that.options.modifierClass,
                        items: newsItems,
                        getFormattedDate: function() {
                            return that.options.monthNames[this.date.getMonth()] + " " + that.padDateString(this.date.getDate() + '') + ", " + this.date.getFullYear()
                        }
                    }); */
                    that.addItemsToPage(rendered);
                } else {
                    that.$loader.removeClass('news-feed__loading__visable');
					that.$notAvailableMessage.show().text(that.options.messages.feedNotAvailable);
				}
            });
			console.log($newsItems);

            combinedRequest.fail(function($newsItems) {
                that.$notAvailableMessage.show().text(that.options.messages.feedNotAvailable);
            }); 
            combinedRequest.always(function($newsItems) {
                that.$loader.removeClass('news-feed__loading__visable');
            });   
        },

        createDeferredFromFeedDefinition: function(feedDefinition, timeout, newsFeed) {
            return $.ajax({
                    url: feedDefinition.url, //"/etc/designs/nvidiaGDC/clientlibs-geforce/response/geforce-reponse.xml",
                    dataType: "json",
                    timeout: timeout,
                }).done(function(data) {
                	if(data) {
						var $data = $(data);
	                    var items = $data[0].articlePagesList;
	                	var itemsArray = items.map(feedDefinition.parserFn);
	                    return itemsArray.filter(feedDefinition.filterFn);
                    }
					else{
						newsFeed.$loader.removeClass('news-feed__loading__visable');
						newsFeed.$notAvailableMessage.show().text(newsFeed.options.messages.feedNotAvailable);
					}
                }).fail(function(data) {
					console.warn('Could not load news feed for: ', feedDefinition);
                });
        },

        sortNewsItems: function(newsItems) {
            return newsItems.slice(0).sort(function(a, b) {
            	return (a.date < b.date)?1:(a.date > b.date)?-1:0;
            }); 

        },

        addItemsToPage: function(html) {

            $(this.element).html(html);

        },

        padDateString: function(date) {

            var stringDate = date+'';
            if(stringDate.length < 2) {
                stringDate = '0' + stringDate;
                return stringDate;
            } else {
                return stringDate;
            }

        },
		parserjsonFn: function(item) {
            var $item = item,
                title = $item.articleTitle,
                link = $item.articlePath,
                description = $item.articleShortDescription,                   
                date = $item.articleDate,
                imgUrl = $item.featureImage,
                imgAlt = title;
            return {
                //source: '${newsfeed.geForceSourceURL}',
                title: title,
                date: date,
                description: description,
                link: link,
                img: {
                    url: imgUrl,
                    alt: imgAlt
                }                
            };            
        }        

    });

    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        });
    };

})(jQuery, window, document);
;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "blogsNewsFeed",
    defaults = {
        itemCountToShow: 3,
        feedFetchTimeout: 10000,
        modifierClass: '',
        messages: {
            feedNotAvailable: "The news feed is not available"
        },
        monthNames: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        feeds: []
    };

    function Plugin (element, options) {
        
        this.element = element;
        this.$element = $(this.element);

        this.$loader = this.$element.find('.news-feed__loading');
        this.$notAvailableMessage = this.$element.find('.news-feed__not-available');
        this.$feedContainer = this.$element.find('.news-feed__container');

		this.$loadmore = $('#newsfeed-load');

        this.$template = $('#blogs-feed-template')
        this.template = $('#blogs-feed-template').html();

        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    $.extend( Plugin.prototype, {

        init: function() {

            var that = this;

            that.$loader.addClass('news-feed__loading__visable');
			var sortedResults = [];
            var feedRequests = that.options.feeds.map(function(feedDefinition) {

                return that.createDeferredFromFeedDefinition(feedDefinition, that.options.feedFetchTimeout);

            });
            var combinedRequest = $.when.apply($, feedRequests).then(function() {

                var results = Array.prototype.slice.call(arguments);
                var mergedResults = [].concat.apply([], results);
                sortedResults = that.sortNewsItems(mergedResults);
					
				return sortedResults.slice(0, that.options.itemCountToShow);
				
            }).then(function(newsItems) {

                var rendered = Mustache.render(that.template, {
                    modifierClass: that.options.modifierClass,
                    items: newsItems,
                    getFormattedDate: function() {
                        return that.options.monthNames[this.date.getMonth()] + " " + that.padDateString(this.date.getDate() + '') + ", " + this.date.getFullYear()
                    }
                });
				
                that.addItemsToPage(rendered);
                sortedResults.splice(0, that.options.itemCountToShow);
            });

            combinedRequest.fail(function($newsItems) {

                that.$notAvailableMessage.show().text(that.options.messages.feedNotAvailable);

            }); 

            combinedRequest.always(function($newsItems) {

                that.$loader.removeClass('news-feed__loading__visable');

            });
			
			let clicks = 0;
			$('#newsfeed-load').click(function(){		
				
				let startidx = 0;
				if (clicks == 0){
				     startidx = that.options.itemCountToShow   // first click
				} else{
				     startidx = 0
				}
				let appendResults = sortedResults.splice(startidx, that.options.itemCountToShow);
				let renderedresult = Mustache.render(that.template, {
                    modifierClass: that.options.modifierClass,
                    items: appendResults,
                    getFormattedDate: function() {
                        return that.options.monthNames[this.date.getMonth()] + " " + that.padDateString(this.date.getDate() + '') + ", " + this.date.getFullYear()
                    }
                });
				
                let renderedhtml = $.parseHTML(renderedresult);
				let appenditems = $(renderedhtml).find('.latest-news__item');				
				$('.latest-news__items').append(appenditems);
				if(appendResults.length < that.options.itemCountToShow){
					$(this).addClass('btn-disabled');
				}
				++clicks;
			});
        },

		
        createDeferredFromFeedDefinition: function(feedDefinition, timeout) {

            return $.ajax({
                    url: feedDefinition.url, //"/etc/designs/nvidiaGDC/clientlibs-deep-learning/data/blogs-response.xml", //feedDefinition.url, //
                    dataType: "xml",
                    timeout: timeout,
                }).then(function(data) {
					var $data = $(data);
                    var items = $data.find("channel item");

                    var itemsArray = items.map(feedDefinition.parserFn).get();

                    return itemsArray.filter(feedDefinition.filterFn);
                }).fail(function(data) {

					console.warn('Could not load news feed for: ', feedDefinition);
                });

        },

        sortNewsItems: function(newsItems) {

            return newsItems.slice(0).sort(function(a, b) {
            	return (a.date < b.date)?1:(a.date > b.date)?-1:0;
            }); 

        },

        addItemsToPage: function(html) {

            $(this.element).html(html);

        },

        padDateString: function(date) {

            var stringDate = date+'';
            if(stringDate.length < 2) {
                stringDate = '0' + stringDate;
                return stringDate;
            } else {
                return stringDate;
            }

        }        

    });

    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        });
    };

})(jQuery, window, document);
; (function ($, window, document, undefined) {
    // Default options
    var pluginName = 'imageComparisonComponent',
        defaults = {};

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.preInit();
    };

    Plugin.prototype.preInit = function(){
        // Images loaded is zero because we're going to process a new set of images.
        var _self = this,
            imagesLoaded = 0,
            images = this.$element.find('img'),
            // Total images is still the total number of <img> elements on the page.
            totalImages = images.length;

        //setting device based images
        this.setImages();      

        // Step through each image in the DOM, clone it, attach an onload event
        // listener, then set its source to the source of the original image. When
        // that new image has loaded, fire the imageLoaded() callback.
        $(images).each(function (idx, img) {
            $('<img>').on('load', function () {
                imagesLoaded++;
                if (imagesLoaded == totalImages) {
                   _self.init();
                }
            }).attr('src', $(img).attr('src'));
        });
    }

    Plugin.prototype.setImages = function(){
        var device = NVIDIAGDC.Browser.getViewport(),
            leftImag = '#'+this.options.id+'-left',
            rightImag = '#'+this.options.id+'-right',
            customDesktopWidth = this.options.customDesktopWidth,
            customLaptopWidth = this.options.customLaptopWidth,
            customTabletWidth = this.options.customTabletWidth,
            customMobileWidth = this.options.customMobileWidth,
            customWidth = '';

        switch(device) {
            case 'mobile':  $(leftImag).attr('src', this.options.imageMobileUrl);
                            $(rightImag).attr('src', this.options.imageMobileBeforeUrl);
                            customWidth = customMobileWidth;
                break;
            case 'tablet':  $(leftImag).attr('src', this.options.imageTabletUrl);
                            $(rightImag).attr('src', this.options.imageTabletBeforeUrl);
                            customWidth = customTabletWidth;
                break;
            case 'laptop':  $(leftImag).attr('src', this.options.imageLaptopUrl);
                            $(rightImag).attr('src', this.options.imageLaptopBeforeUrl);
                            customWidth = customLaptopWidth;
                break;
            default: $(leftImag).attr('src', this.options.imageDesktopUrl);
                     $(rightImag).attr('src', this.options.imageDesktopBeforeUrl);
                     customWidth = customDesktopWidth;
            }
                    
        $(this.element).css('maxWidth', customWidth+"px");
    }

    Plugin.prototype.init = function () {
        var _self = this;

        this.$element.each(function () {
            var cur = $(this),
                sliderPositon = $(cur).data('sliderType'),

                // Adjust the slider
                width = cur.width() + 'px',
                height = cur.height() + 'px',
                resizeImg = cur.find('.resize img');

            //$(resizeImg).css('height', height);
            $(resizeImg).css('width', width);

            // Bind dragging events
            _self.drags(cur.find('.slider'), cur.find('.resize'), cur, sliderPositon);
        });

        this.resize();
    }

    Plugin.prototype.resize = function () {
        var _self = this,
            elem = this.$element;

        // Update sliders on resize. 
        $(window).resize(function () {
            _self.setImages();
            _self.$element.each(function () {
                var cur = $(this),
                    width = cur.width() + 'px';
                cur.find('.resize img').css('width', width);           
                if(elem.is(':visible')){
                    $.colorbox.resize();
                }
            });
        });
        $(document).on('cbox_complete', function(){
            $(window).resize();
        });
    }

    Plugin.prototype.drags = function (dragElement, resizeElement, container, sliderPositon) {
        container.on('click', function (e) {
            $(this).find('.handle').addClass('op0');

            if ($(e.target).hasClass('slider') || $(e.target).parents('.slider').length) { return; }

            var X = (typeof e.offsetX != 'undefined') ? e.offsetX : e.originalEvent.touches[0].offsetX,
                Y = (typeof e.offsetY != 'undefined') ? e.offsetY : e.originalEvent.touches[0].offsetY;

            // Set the new values for the slider and the handle. 
            // Bind mouseup events to stop dragging.
            if (sliderPositon == 'vertical') {
                container.find('.slider').animate({ 'left': X });
                container.find('.resize').animate({ 'width': X });
            } else {
                container.find('.slider').animate({ 'top': Y });
                container.find('.resize').animate({ 'height': Y });
            }
        });

        // Initialize the dragging event on mousedown.
        dragElement.on('mousedown touchstart', function (e) {

            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');
            $(this).find('.handle').addClass('op0');

            // Check if it's a mouse or touch event and pass along the correct value
            var startX = (typeof e.pageX != 'undefined') ? e.pageX : e.originalEvent.touches[0].pageX,
                startY = (typeof e.pageY != 'undefined') ? e.pageY : e.originalEvent.touches[0].pageY;
    
            // Get the initial position
            var dragWidth = dragElement.find('.handle').outerWidth(),
                posX = dragElement.offset().left + dragWidth - startX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),

                dragHeight = dragElement.find('.handle').outerHeight(),
                posY = dragElement.offset().top + dragHeight - startY,
                containerOffsetY = container.offset().top,
                containerHeight = container.outerHeight(),

                // Set limits
                minLeft = containerOffset,
                maxLeft = containerOffset + containerWidth - dragWidth,

                minTop = containerOffsetY,
                maxTop = containerOffsetY + containerHeight - dragHeight;

            // Calculate the dragging distance on mousemove.
            dragElement.parents().on("mousemove touchmove", function (e) {

                // Check if it's a mouse or touch event and pass along the correct value
                var moveX = (typeof e.pageX != 'undefined') ? e.pageX : e.originalEvent.touches[0].pageX,
                    moveY = (typeof e.pageY != 'undefined') ? e.pageY : e.originalEvent.touches[0].pageY,

                    leftValue = moveX + posX - dragWidth,
                    topValue = moveY + posY - dragHeight;

                // Prevent going off limits
                if (leftValue < minLeft) {
                    leftValue = minLeft;
                } else if (leftValue > maxLeft) {
                    leftValue = maxLeft;
                }

                if (topValue < minTop) {
                    topValue = minTop;
                } else if (topValue > maxTop) {
                    topValue = maxTop;
                }

                // Translate the handle's left value to masked divs width.
                widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';
                heightValue = (topValue + dragHeight / 2 - containerOffsetY) * 100 / containerHeight + '%';
                handleValue = (100 - ((topValue + dragHeight / 2 - containerOffsetY) * 100 / containerHeight)) + '%';

                // Set the new values for the slider and the handle. 
                // Bind mouseup events to stop dragging.
                var draggableElem = container.find('.draggable');

                if (sliderPositon == 'vertical') {
                    draggableElem.css('left', widthValue).on('mouseup touchend touchcancel', function () {
                        $(this).removeClass('draggable');
                        resizeElement.removeClass('resizable');
                    });
                    container.find('.resizable').css('width', widthValue);
                } else {
                    draggableElem.css('top', heightValue).on('mouseup touchend touchcancel', function () {
                        $(this).removeClass('draggable');
                        resizeElement.removeClass('resizable');
                    });
                    container.find('.draggable').css('bottom', handleValue);
                    container.find('.resizable').css('height', heightValue);
                }
            }).on('mouseup touchend touchcancel', function () {
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
            e.stopPropagation();
        }).on('mouseup touchend touchcancel', function (e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        dragElement.on('dragstart', function (e) {
            return false;
        })

        container.on('mouseleave', function(e){
            $(this).find('.handle').removeClass('op0');
        });        
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);

(function($, window, document, undefined) {

	// Default options
	var pluginName = 'herobanner',
	screenSize = $ (window ).width(),
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint,  
	defaults = {
		slidecount:1,
		period:5,
		ts:0,
		lastSlide:'slide1',
		pageoldbreakpointvalue:'',
		id:'',
		articleID: '',
		lazyloded:true
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$slides=this.$element.find("#slides");
		this.$slides1=this.$element.find("#slides1");
		this.timeouts = [];
		this.init();
	};

	Plugin.prototype.init = function() {
		var self = this;
		var slideCount = self.options.slidecount;
		self.options.lastSlide = 'slide'+ slideCount+"-"+self.options.id;

		if(slideCount>1){
			self.setImage(this.$slides);
			self.interval();
			self.$slides.bind('touchstart', function(e) {
				self.options.ts = e.originalEvent.touches[0].clientX;
			});
			self.$slides
			.bind(
					'touchend',
					function(e) {
						self.interval();
						var te = e.originalEvent.changedTouches[0].clientX;
						if (self.options.ts > te + 100) {
							self.nextSlide(self.$slides);
						} else if (self.options.ts < te - 100) {
							if (~(self.$slides.siblings('input:checked').attr('id')).indexOf('slide1')) {
								self.$slides.siblings('input#' + self.options.lastSlide).prop(
										'checked', true);
							} else {
								self.$slides.siblings('input:checked').prev(
								'.radio-switch').prop('checked', true);
							}
						}
					});
			self.$slides.find('label').on('click', function() {
				if(self.options.lazyloded){
					self.addLazyload(self.$slides,this);
				}
				self.interval();
			});
			
			/** on mouse hover pause carousel slide **/
			self.$slides
				.mouseover(function() {	               
	               self.clearAllTimeout();
	            })
	            .mouseout(function() {	             
	               self.interval();
	            });
			/** end of on mouse hover pause carousel slide **/
			
		}else{
			self.setImage(this.$slides1);
		}
        self.bannerButton();
        self.setArticleId(self.options.articleID);
	};
	
	Plugin.prototype.addLazyload= function($slides,$this){
    	var siblingindex=$($this).index();
		if(siblingindex>0){
			var activebanner=$slides.find("article")[siblingindex];
			var hasBCImage=$(activebanner).data('bcgimagemobile');
			if(!$(activebanner).hasClass("lazyloaded") && hasBCImage){
				$(activebanner).addClass("lazyload");
			}
		}
    	
    };
	
	Plugin.prototype.clearAllTimeout =function(){
		if(this.timeouts.length){
	        for (var i=0; i<this.timeouts.length; i++) {
	            window.clearTimeout(this.timeouts[i]); // clear all the timeouts
	        }
	        this.timeouts= [];//empty the id array
		}
    };

    Plugin.prototype.setImage= function($bannerslide){
        var pgoldbreakpimg = this.options.pageoldbreakpointvalue;
        var pgoldbreakpimgvalue = (pgoldbreakpimg === "false");
		var self=this;
		$bannerslide.find( "article" ).each(function() {
            var bcgCustomColor=$(this).attr("data-bcgCustomColor");
            if(self.options.lazyloded){
				$(this).css({'background-color': bcgCustomColor });
            }else{
                var imageMobileUrl=$(this).attr("data-bcgImageMobile");
                var imageLaptopUrl=$(this).attr("data-bcgImageLaptop");
                var imageTabletUrl=$(this).attr("data-bcgImageTablet");
                var imageDesktopUrl=$(this).attr("data-bcgImagePC");
                var isvideo= $(this).hasClass("video");
                if (screenSize < tabletBreakpoint){
                    $(this).css({'background-image': 'url(' + imageMobileUrl + ')','background-color':  bcgCustomColor });			
                    //this.$element.find('.responsive-image').attr("src",this.options.imageMobileUrl);
                } else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint){
                    $(this).css({'background-image': 'url(' + imageTabletUrl + ')' ,'background-color': bcgCustomColor });			
                    //this.$element.find('.responsive-image').attr("src",this.options.imageTabletUrl);
                } else if ( ((screenSize >= desktopBreakpoint) && (screenSize < largeDesktopBreakpoint)) && pgoldbreakpimgvalue ) {		    	
                    $(this).css({'background-image': 'url(' + imageLaptopUrl + ')' ,'background-color': bcgCustomColor });			    	
                } else {
                    //$(this).css('background-image', 'url(' + imageDesktopUrl + ')');
                    $(this).css({'background-image': 'url(' + imageDesktopUrl + ')' ,'background-color': bcgCustomColor });
                    //this.$element.find('.responsive-image').attr("src",this.options.imageDesktopUrl);
                }
                
                if(isvideo && screenSize >= tabletBreakpoint){
                	var e=$(this).find('video').get(0);
                	$(this).find( "video source" ).each(function() {
                		$(this).attr("src",$(this).data("src"));
                	});
					/*reload and play video*/
					 e.load();
					 e.play();
                }
            }
			
			});
		
		
	};
	

	/*Plugin.prototype.setBannerImage= function(){
        var pgoldbreakp = this.options.pageoldbreakpointvalue;
        var pgoldbreakpvalue = (pgoldbreakp === "false");
		var self=this;
		self.$slides1.find( "article" ).each(function() {
			var imageMobileUrl=$(this).attr("data-bcgImageMobile");
			var imageTabletUrl=$(this).attr("data-bcgImageTablet");
			var imageLaptopUrl=$(this).attr("data-bcgImageLaptop");
			var imageDesktopUrl=$(this).attr("data-bcgImagePC");
			var bcgCustomColor=$(this).attr("data-bcgCustomColor");

			if (screenSize < tabletBreakpoint){
				$(this).css({'background-image': 'url(' + imageMobileUrl + ')','background-color':  bcgCustomColor });				
				//this.$element.find('.responsive-image').attr("src",this.options.imageMobileUrl);
			} else if (screenSize >= tabletBreakpoint && screenSize < desktopBreakpoint){
				$(this).css({'background-image': 'url(' + imageTabletUrl + ')','background-color': bcgCustomColor});			
				//this.$element.find('.responsive-image').attr("src",this.options.imageTabletUrl);
			} else if ( ((screenSize >= desktopBreakpoint) && (screenSize < largeDesktopBreakpoint)) && pgoldbreakpvalue ) {	
                
				$(this).css({'background-image': 'url(' + imageLaptopUrl + ')','background-color': bcgCustomColor});			    	
		    } else {
                $(this).css({'background-image': 'url(' + imageDesktopUrl + ')' ,'background-color': bcgCustomColor });
				//this.$element.find('.responsive-image').attr("src",this.options.imageDesktopUrl);
			}
           

			});
		
	};*/

	Plugin.prototype.interval =function () {
		var disabledautoslide = this.options.autoslidedisable;
		var self = this;
		self.clearAllTimeout();
		/*var radioButtons=$(this).find('input');
		var slideTime=5000;
		if(radioButtons.length){
			var checkedIndex=radioButtons.index(radioButtons.find(':checked'));
			slideTime=parseInt($(this).find('article')[checkedIndex].attr("data-time"))*1000;
		}*/
		//clearInterval(self.options.period);
		if(!disabledautoslide){
			var windowIntervalID=window.setTimeout(function() {
				self.nextSlide(self.$slides);
				self.interval();
			}, self.options.period*1000);
	
			this.timeouts.push(windowIntervalID);
			}
		};

	Plugin.prototype.nextSlide=function($this) {
		var self=this;
		if ($this.siblings('input:checked').attr('id') == self.options.lastSlide) {
			$this.siblings('input#slide1-'+self.options.id).prop('checked', true);
			self.options.period=parseInt($this.siblings('input#slide1-'+self.options.id).attr("data-time"));
		} else {
			$this.siblings('input:checked').next('.radio-switch').prop(
					'checked', true);
			if(self.options.lazyloded){
				var siblingindex=$this.siblings('input:checked').index();
				if(siblingindex>0){
					var activebanner=$this.find("article")[siblingindex];
					var hasBCImage=$(activebanner).data('bcgimagemobile');
					if(!$(activebanner).hasClass("lazyloaded") && hasBCImage){
						$(activebanner).addClass("lazyload");
					}
				}
			}
			self.options.period=parseInt($this.siblings('input:checked').attr("data-time"));
		}
	}

	Plugin.prototype.bannerButton=function() {
		var self=this;
        var textButton;
        var textButtonAnchor;
		var slideCount = self.options.slidecount;
        if(slideCount == 1){
            self.$slides1.find( "article" ).each(function() {
                textButton = $(this).find('.text-button');
                textButtonAnchor = $(textButton).find('a');
                $(textButtonAnchor).attr("data-bannertype", $(this).prev().data('bannertype'));
                $(textButtonAnchor).attr("data-bannername", $(this).prev().data('bannername'));
                $(textButtonAnchor).addClass("bannerTracking");

            });
        }else{
			self.$slides.find( "article" ).each(function() {
                textButton = $(this).find('.text-button');
                textButtonAnchor = $(textButton).find('a');
                $(textButtonAnchor).attr("data-bannertype", $(this).prev().data('bannertype'));
                $(textButtonAnchor).attr("data-bannername", $(this).prev().data('bannername'));
                $(textButtonAnchor).addClass("bannerTracking");

            });
        }
        
    }
	
	/** Function to add id for each slide -> see AD-552 **/
	Plugin.prototype.setArticleId=function(bannerId) {
		var articleTag = $("#" + bannerId).find("article");
        for (var index = 0; index < articleTag.length; index++) {
            var inc = index + 1;
            articleTag.eq(index).attr("id", bannerId + "_sld" + inc);
        }
	}
	
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'hatchPartners',
	defaults = {
		//productLookupEndpoint: '//lens.prod.gb.ib.nvidia.com/v1/products/external',
		//productLookupEndpoint: 'https://api-stage.nvidia.com/in-ru-api-stage/hatch/json', //stage
		productLookupEndpoint: 'https://api-prod.nvidia.com/in-ru-api/hatch/json', //prod
		//productLookupEndpoint: 'https://0.0.0.0:8082/hatch/json', //local
		RGID: 'GB',
		source: 'shield'
	};

	// Plugin constructor
	function Plugin(element, options) {

		this.element = element;
		this.$element = $(this.element);

		this.$loader = this.$element.find('.hatch-product__loading');
		this.$notAvailableMessage = this.$element.find('.hatch-product__not-available');
		this.$retailersContainer = this.$element.find('.hatch-product__retailers');

		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init();

	}

	Plugin.prototype.addQueryParamToUrl = function(url, key, value) {

		if(!value) return url;

		url += (url.indexOf('?') == -1) ? '?' : '&';
	    url += key + '=' + value;

	    return url;

	}

	Plugin.prototype.init = function() {

		var request_path = "nRGID="+this.options.RGID+"&sModel="+this.options.hatchCode+"&source_icl="+this.options.source;
		var that = this;

		that.$loader.addClass('hatch-product__loading__visable');

		$.ajax({
			type: "GET",
			data: request_path,
			url: this.options.productLookupEndpoint,
			//dataType: 'jsonp',
			jsonp: "callBack",
			success: function(response) {
				var dealers = response.ci_data.dealers;
				var product_items = response.ci_data.product_items;

				var find_dealer = function(dealer_id, dealers) {

					var dealer = dealers.filter(function(dealer) {
						return dealer.dealer_id == dealer_id;
					});

					if(dealer.length > 0) {
						return dealer[0];
					} else {
						return null;
					}

				}

				if(product_items.length < 1) {

					that.$notAvailableMessage.show().text(that.options.messages.partnersNotAvailable);

				} else {

					var dealer_items = product_items[0].dealer_items;
					var icl_cid = Cookies.get('icl_cid');

					var complete_dealer_items = dealer_items.map(function(dealer_item) {

						var dealer = find_dealer(dealer_item.dealer_id, dealers);

						if(dealer != null) {

							dealer_item.dealer_logo = dealer.dealer_logo;
							dealer_item.dealer_name = dealer.name;

							if(icl_cid != false) {

								dealer_item.buy_url = that.addQueryParamToUrl(dealer_item.buy_url, 'cid', icl_cid);

							}

							return dealer_item;

						} else {

							return null;

						}

					}).filter(function(dealer_item) {

						return dealer_item != null;

					})

					complete_dealer_items.sort(function(a, b) {

						var nameA = a.dealer_name.toLowerCase(),
							nameB = b.dealer_name.toLowerCase();

						if(nameA < nameB) return -1;
					    if(nameA > nameB) return 1;
					    return 0;

					});

					var $product_elements = complete_dealer_items.map(function(dealer_item) {

						if(dealer_item.availability == 'NO') {

							return $('<div class="hatch-product__retailers__retailer"><a href="'+dealer_item.buy_url+'" target="_blank"><img src="'+dealer_item.dealer_logo+'" alt="'+dealer_item.dealer_name+'" /><br />'+that.options.messages.outOfStock+'</a></div>');

						} else {

							return $('<div class="hatch-product__retailers__retailer"><a href="'+dealer_item.buy_url+'" target="_blank"><img src="'+dealer_item.dealer_logo+'" alt="'+dealer_item.dealer_name+'" /></a></div>');

						}

					}).filter(function($product_element) {

						return $product_element != null;

					})

					that.$retailersContainer.append($product_elements);

				}

		    }, error: function() {
		    	that.$notAvailableMessage.show().text(that.options.messages.partnersNotAvailable);

		    }, complete: function() {

		    	that.$loader.removeClass('hatch-product__loading__visable');

		    }
		});

	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);

; (function ($, window, document, undefined) {
    // Default options
    var pluginName = 'imageGalleryComponent',
        defaults = {};

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

    Plugin.prototype.init = function(){   
        if(!this.$element.find('img').length) return;
        
        var customOptions = $.extend({}, { gallery_enable_lazyload: this.options.lazyload ,gallery_theme: this.options.theme, gallery_skin: this.options.skin}, this.options.custom),
            element = this.$element,
            api = element.unitegallery(customOptions),
            _self = this;

        api.on("item_change",function(num, data){ 
            $(element).find('.ug-videoplayer').hide();
        });

        $(element).find('.ug-default-button-fullscreen').attr("title", "Enter Full screen");
        $(element).find('.ug-open-in-new-window').attr("title", "Open Image in New Window");
        
        $(element).find('.ug-default-button-fullscreen').on('click', function(){ 
            if($(this).hasClass('ug-custom-fullscreen')){
                $(this).removeClass('ug-custom-fullscreen')
                       .removeClass('ug-fullscreenmode')
                       .attr("title", "Enter Full screen");
            }else{
                $(this).addClass('ug-custom-fullscreen')
                       .addClass('ug-fullscreenmode')
                       .attr("title", "Exit Full screen");
            }
        });

        $(element).find('.ug-default-button-play').attr("title", "Play Gallery");
        $(element).find('.ug-default-button-hidepanel').attr("title", "Show / Hide Panel");

        $(element).find('.ug-thumb-image').on('load', function(){
           _self.resizeThumbImages($(this));
        });

        $(element).find('.ug-thumb-image.lazyload, .ug-thumb-image.lazyloaded').each(function () {
            _self.resizeThumbImages($(this));
        });
    }

    Plugin.prototype.resizeThumbImages = function( thumbImage ) {
        var	thumbImageParent = thumbImage.closest('.ug-thumb-wrapper'),
            tIPTop = thumbImageParent.css('top'),
            tIPLeft = thumbImageParent.css('left'),
            tIPWidth = thumbImageParent.css('width'),
            tIPHeight = thumbImageParent.css('height');
        thumbImage.css({ 'top': tIPTop, 'width': tIPWidth, 'height': tIPHeight });
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);
;
(function($, window, document, undefined) {

    // Default options
    var pluginName = 'faqExpand',
        defaults = {
            
        };

    // Plugin constructor
    function Plugin(element, options) {

        // Cache references
        this.element = element;
        this.$element = $(this.element);
        this.$key = $(this.element).attr('id');
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();

    }

    Plugin.prototype.init = function() {
	
/** AD-2468 added AD-1587 FAQ open item with url parameter **/
		var defaultOpenItemId = (this.options.defaultOpenItemId).trim();

		let findFaqParams = new URLSearchParams(window.location.search);
        if((findFaqParams.has('faqid')) || defaultOpenItemId){
	        if(findFaqParams.has('faqid')){
                var param = findFaqParams.get('faqid');	
            }else{
                var param = defaultOpenItemId;	
            }


	        var anchormorelink = $("#"+param).closest("div.faqItem");            
            var faqid = $(anchormorelink).offset();
	        var scrollfaq = faqid.top - 110;
	
	        $("html, body").animate({
				scrollTop : scrollfaq + "px"
			}, 1000, "swing");
	
	 		var anchormorelink = $("#"+param).closest("div.faqItem");
	        $(anchormorelink).addClass('accordion-active');
	        $(anchormorelink).find('.accordion-section-container').show();
        }
		/** End of AD-1587 FAQ open item with url parameter **/
	
        var self = this,
            openLastOpened = this.options.openLastOpened;

        self.$element.on('click', 'a.toggleHeader', function() {
            var $this = $(this),
                top = $this.parents('.accordion.item').offset().top,
                subBrandNav = $(".sub-brand-nav"),
                subBrandNavHeight = subBrandNav.height(),
                
				breadCrumbOBj = $(".breadCrumbNav").find(".subnav"),
				breadCrumbOBjHeight = breadCrumbOBj.height();
	
				defaultOffset = subBrandNavHeight + breadCrumbOBjHeight;

            if (self.$lastOpened && self.$lastOpened.find('a').get(0) !== this && !openLastOpened) {
                
                self.$lastOpened.removeClass('accordion-active');
                self.$lastOpened.find('.accordion-section-container').slideUp(300);
            }

            var $parent = self.$lastOpened = $this.parent();
            $parent.toggleClass('accordion-active');
            var $accordSection = $parent.find('.accordion-section-container');

            if ($parent.hasClass('accordion-active')) {
                self.curOpenAccordHeight = $accordSection.outerHeight() ? $accordSection.outerHeight() : 0;
                $accordSection.slideDown(300, function(){
                    if(!self.elementInViewport(this)){
                        $("html, body").animate({
                            scrollTop :  top - defaultOffset +"px"
                        }, 500, "linear");
                    }
                });

            } else {
                self.curOpenAccordHeight = 0;
                $accordSection.slideUp(300);
            }       
            
            //self.showMoreFaqs();
        });
        
        self.$wrapper = self.$element.find('.wrapper');

       
 
       /* self.showMoreFaqs();
        $(window).on('resize',function(){
            self.showMoreFaqs();
        });
        $(window).on('orientationchange',function(){
            self.showMoreFaqs();
        });*/
    };

    Plugin.prototype.elementInViewport = function(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
      
        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }
      
        return (
          top >= window.pageYOffset &&
          left >= window.pageXOffset &&
          (top + height) <= (window.pageYOffset + window.innerHeight) &&
          (left + width) <= (window.pageXOffset + window.innerWidth)
        );
      }

   
    Plugin.prototype.showMoreFaqs = function() {
        var self = this;        
        var animDuration = 300;
        var totalHeight = 0;
        
        var $ul = self.$wrapper.find('.items > ul').eq(0); //eq 0 if it is wcm mode
        $ul.find('.item div > a').each(function() {
            totalHeight += $(this).outerHeight() + 2;
        });

        
        var $moreLinks = self.$element.find('.more-links');        
        totalHeight = totalHeight + ($moreLinks.outerHeight() ? $moreLinks.outerHeight(true)  : 0);
        totalHeight = totalHeight + (self.curOpenAccordHeight || 0);
        $ul.eq(0).animate({
            'height': totalHeight
        }, animDuration, function() {
            $ul.css('height','');
        });

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "diHouse",
    defaults = {};

    function Plugin (element, options) {
        
        this.element = element;
        this.$element = $(element);
        
        this.$price = this.$element.find('.di-house-product__price');
        this.$button = this.$element.find('.di-house-product__button');
        this.$stock = this.$element.find('.di-house-product__stock-status');

        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    
    }

    $.extend( Plugin.prototype, {
        
        init: function() {

            var that = this;
            var diHouseProductId = this.$element.attr("data-di-house-product-id");
            var nvProductId = this.$element.attr("data-nv-product-id");

            console.log(diHouseProductId, nvProductId);

            this.requestProductDetails(diHouseProductId).done(function(data) {
            	if(typeof data !== "undefined" && typeof data.Root !== "undefined" ) {
	                var price = data.Root.catalogPriceStockItems.catalogPriceStockItem.price;
	                var stock = data.Root.catalogPriceStockItems.catalogPriceStockItem.stockLevel;
	
	                that.$price.html(price + ' руб.');
	
	                if(stock > 0) {
	
	                    that.$button.attr('href', 'http://store.nvidia.ru/add-cart.html?products=' + nvProductId);
	                    that.$stock.html('в наличии');
	
	                } else {
	
	                    that.$element.addClass('di-house-product--out-of-stock');
	                    that.$stock.html('нет в наличии');
	
	                }
	
	                that.$element.addClass('di-house-product--ready');
            	}else{
            		console.log("Data not coming thr");
            	}

            }).fail(function() {
            	console.log("request failed");


            }).always(function() {



            });
           
        }, requestProductDetails: function(productId) {

            return $.ajax({
                url: "https://lens.prod.gb.ib.nvidia.com/v1/products/dihouse/"+productId+"/",
                dataType: "json"
            });

        } 

    });

    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        });
    };

})(jQuery, window, document);
;
(function($, window, document, undefined) {

    // Default options
    var pluginName = 'countrylistSelector',
        screenSize = $(window).width(),
        largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
    	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
    	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
        defaults = {

        };

    // Plugin constructor
    function Plugin(element, options) {
        // Cache references
        this.element = element;
        this.$element = $(this.element);
        this.$key = $(this.element).attr('id');
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Plugin.prototype.init = function() {
        var self = this;       
       		$('.country_link').click(function(){
               var countrylocalevalue = $(this).attr("data-clocale");                
               var cookieDomain = (window.location.origin.indexOf("nvidia.com") !== -1)? "nvidia.com": "nvidia.cn"
                $.cookie("nvuserpreflang", countrylocalevalue, { path: '/', domain: cookieDomain, expires: 20*365, secure: true });                
            });
       		
       		$( ".country_link" ).contextmenu(function() {
  				var countrylocalevalue = $(this).attr("data-clocale");                
               var cookieDomain = (window.location.origin.indexOf("nvidia.com") !== -1)? "nvidia.com": "nvidia.cn"
                $.cookie("nvuserpreflang", countrylocalevalue, { path: '/', domain: cookieDomain, expires: 20*365, secure: true });
			});
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
/*
* NVIDIA RTX COMPARISON SLIDER :: IMAGE-ONLY MODE :: KALEB WYMAN 2020 :: Naresh Sanagala
*/
; (function ($, window, document, undefined) {

    var pluginName = 'comparisonSliderEnhanced',
		defaults = {},
		NV = {};

	// NV.ww = $(window).width();
	// NV.wh = $(window).height();
	// NV.dw = $(document).width();
	// NV.dh = $(document).height();
	// NV.wi = $(window).innerWidth();
	NV.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	NV.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	// NV.winWidth = Math.max(NV.ww, NV.wi);
	NV.prevWidth = null;
	NV.responsiveIndex = 0;
	NV.responsiveNavigationScrollOffsetArray = [82, 101, 136, 136, 136];
	NV.comparisonSliderWidth = null;
	NV.comparisonSliderHeight = null;
	NV.comparisonSliderMobileWidth = 298;
	NV.comparisonSliderMobileHeight = 298 * 0.5625;
	NV.comparisonSliderTabletWidth = 625;
	NV.comparisonSliderTabletHeight = 625 * 0.5625;
	NV.comparisonSliderDesktopWidth = 954;
	NV.comparisonSliderDesktopHeight = 954 * 0.5625;
	NV.comparisonSliderUltraWidth = 2560;
	NV.comparisonSliderUltraHeight = 2560 * 0.5625;
	NV.comparisonSliderInRange = false;
	NV.comparisonSliderSide = "none";
	NV.comparisonSliderScreenMode = "fullscreenResponsiveHeight"; //"fullscreen"; // responsive || fullscreen || mixed || fullscreenResponsiveHeight;
	NV.comparisonSliderUnderMinHeight = undefined;
	NV.comparisonSliderCentered = false;
	NV.introPlayed = false;
	NV.outroPlayed = false;
	NV.cImg1 = null;
	NV.cImg2 = null;
	NV.cVideo1 = null;
	NV.cVideoSrc1 = null;
	NV.cVideo2 = null;
	NV.cVideoSrc2 = null;
	NV.imageOnlyMode = true;
	NV.canPlayVideos = false;
	NV.currentVideosTime = 0;
	NV.comparisonSliderScrollTriggerReady = false;
	NV.sceneController = null;
	NV.scene0 = null;
	NV.previousVideoSizeIndex = null;
	NV.currentVideoSizeIndex = 0;
	NV.imageResponsiveSizes = [320, 640, 768, 1024, 1280, 1350, 2048, 2560];
	NV.videoResponsiveSizes = [320, 640, 768, 1024, 1280, 1350, 2048, 2560];
	NV.videoSizes = [180, 360, 433, 576, 720, 760, 1152, 1440];
	NV.videoFormats = [".webm", ".mp4"];
	NV.videosPath = "videos/";
	NV.videosOff = [];
	NV.videosOn = [];
	NV.contentTitle = "comparison-slider-enhanced";
	NV.viewport = NVIDIAGDC.Browser.getViewport();

	function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, defaults, NV, options);
        this._defaults = defaults;
		this._name = pluginName;
		
		this.options.ww = this.$element.width();
		this.options.wi = this.$element.innerWidth();
		this.options.winWidth = Math.max(this.options.ww, this.options.wi);
		this.options.po = this.$element.position();

		this.options.vw = Math.max(this.$element.width(), this.$element.innerWidth());
		this.options.vh = Math.max(this.$element.height(), this.$element.innerHeight());

		this.options.comparisonSliderLeft = this.element.getBoundingClientRect().left;
		this.options.comparisonSliderRight = $(window).width() - this.element.getBoundingClientRect().right;

		this.options.comparisonSliderMobileWidth = this.options.mobileWidth || 298;
		this.options.comparisonSliderMobileHeight = this.options.comparisonSliderMobileWidth * 0.5625;
		this.options.comparisonSliderTabletWidth =  this.options.tabletWidth || 625;
		this.options.comparisonSliderTabletHeight = this.options.comparisonSliderTabletWidth * 0.5625;
		this.options.comparisonSliderDesktopWidth = this.options.desktopWidth || 954;
		this.options.comparisonSliderDesktopHeight = this.options.comparisonSliderDesktopWidth * 0.5625;
		this.options.comparisonSliderUltraWidth = this.options.ultraWidth || 2560;
		this.options.comparisonSliderUltraHeight = this.options.comparisonSliderUltraWidth * 0.5625;

		this.leftImag = this.$element.find(".comparison-img-left");
		this.rightImag = this.$element.find(".comparison-img-right");
		
		if( this.options.lazyloded ) {
			var leftImgSrc = this.leftImag.data("src"),
				rightImgSrc = this.rightImag.data("src");

			this.leftImag.attr("data-src-desktop", leftImgSrc)
						 .attr("data-src-tablet", leftImgSrc)
						 .attr("data-src-laptop", leftImgSrc)
						 .attr("data-src-mobile", leftImgSrc)
						 .attr("data-src-desktop-retina", leftImgSrc)
						 .attr("data-src-tablet-retina", leftImgSrc)
						 .attr("data-src-laptop-retina", leftImgSrc)
						 .attr("data-src-mobile-retina", leftImgSrc);

			this.rightImag.attr("data-src-desktop", rightImgSrc)
						 .attr("data-src-tablet", rightImgSrc)
						 .attr("data-src-laptop", rightImgSrc)
						 .attr("data-src-mobile", rightImgSrc)
						 .attr("data-src-desktop-retina", rightImgSrc)
						 .attr("data-src-tablet-retina", rightImgSrc)
						 .attr("data-src-laptop-retina", rightImgSrc)
						 .attr("data-src-mobile-retina", rightImgSrc);
		}
		
		this.LoadScripts(options.script_arr, options.path);
	}
	
	Plugin.prototype.LoadScripts = function (script_arr, path) {
		var _self = this;

		$.getMultiScripts(script_arr, path).done(function() {
			gsap.registerPlugin(Draggable, InertiaPlugin, ScrollToPlugin, ScrollTrigger);	
			gsap.defaults({ overwrite: "auto" });

			gsap.set(_self.$element.find(".gf-compare-caption-left")[0], { opacity: 0 });
			gsap.set(_self.$element.find(".gf-compare-caption-right")[0], { opacity: 0 });

			_self.init();
		});
	};

    Plugin.prototype.init = function () {
		var _self = this;

		// SETUP ASSET REFERENCES...
		this.options.cImg1 = this.$element.find(".comparison-img-left")[0];
		this.options.cImg2 = this.$element.find(".comparison-img-right")[0];

		this.options.cVideo1 = this.$element.find(".video-bg-left")[0];
		this.options.cVideo2 = this.$element.find(".video-bg-right")[0];

		if (!this.options.imageOnlyMode) {
			// Generate all video paths into arrays...
			for (var v = 0; v < this.options.videoSizes.length; v++) {
				this.options.videosOff.push([this.options.videosPath + this.options.contentTitle + "-" + this.options.videoSizes[v] + "p-rtx-off" + this.options.videoFormats[0], this.options.videosPath + this.options.contentTitle + "-" + this.options.videoSizes[v] + "p-rtx-off" + this.options.videoFormats[1]]);
				this.options.videosOn.push([this.options.videosPath + this.options.contentTitle + "-" + this.options.videoSizes[v] + "p-rtx-on" + this.options.videoFormats[0], this.options.videosPath + this.options.contentTitle + "-" + this.options.videoSizes[v] + "p-rtx-on" + this.options.videoFormats[1]]);
			}
		}

		// SETUP DRAGGABLES...
		Draggable.create(this.$element.find(".gf-compare-divider")[0], {
			bounds: this.$element.find(".comparison-slider")[0],
			inertia: true,
			type: "x",
			edgeResistance: 0.65,
			overshootTolerance: 0,
			lockAxis: true,
			throwProps: true,
			onDragStart: function () {
				switch(_self.options.viewport){
					case 'mobile':
					case 'tablet':
						gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)" }); // #666 transparent
						break;
					default:
						gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)" }); // #666
				}

				gsap.set([_self.$element.find(".gf-compare-divider")], { backgroundColor: "rgba(118,185,0,0.1)" }); // #666

				gsap.killTweensOf(_self.compareIntroAnimation.bind(this));
				gsap.killTweensOf(_self.compareOutroAnimation.bind(this));
			},
			onPress: function() {
				gsap.killTweensOf(_self.$element.find(".gf-compare-divider"));
				gsap.killTweensOf(_self.$element.find(".gf-compare-left"));
				this.update();
			},
			onThrowUpdate: function() {
				_self.compareSides(0, this.x);
				gsap.set([_self.$element.find(".gf-compare-left")], { clip: "rect(0px " + (this.x + (_self.options.comparisonSliderWidth * 0.5)) + "px " + _self.options.comparisonSliderHeight + "px 0px)" });
				this.update();
			},
			onDrag: function() {
				_self.compareSides(0, this.x);
				gsap.set([_self.$element.find(".gf-compare-left")], { clip: "rect(0px " + (this.x + (_self.options.comparisonSliderWidth * 0.5)) + "px " + _self.options.comparisonSliderHeight + "px 0px)" });
			},
			onDragEnd: function() {
				var _d = this.tween.duration();

				switch(_self.options.viewport){
					case 'mobile':
					case 'tablet':
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _d, backgroundColor: "rgba(118,185,0,0.01)", ease: "expo.out" });
						break;
					default:
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _d, backgroundColor: "rgba(118,185,0,1)", ease: "expo.out" });
				}

				gsap.to([_self.$element.find(".gf-compare-divider")], { duration: _d, backgroundColor: "rgba(118,185,0,1)", ease: "expo.out" });
				gsap.to([_self.$element.find(".gf-compare-left")], { duration: _d, clip: "rect(0px " + (this.endX + (_self.options.comparisonSliderWidth * 0.5)) + "px " + _self.options.comparisonSliderHeight + "px 0px)", ease: "expo.out" });
				_self.compareSides(_d, this.endX);
			},
			onThrowComplete: function() {
			}
		});

		this.$element.find('.gf-compare-caption-left').on('click touchend', function (e) { _self.toggleSides("left"); });
		this.$element.find('.gf-compare-caption-right').on('click touchend', function (e) { _self.toggleSides("right"); });

		// CHECK FOR HTML 5 VIDEO SUPPORT...

		_self.checkForVideoSupport();

		if (!this.options.imageOnlyMode) {
			// IF... IMAGE ONLY MODE IS FALSE
			this.options.cVideo1.style.opacity = 0;
			this.options.cVideo2.style.opacity = 0;
			this.options.cVideo1.addEventListener('ended', function () {
				//console.count('loop restart');
				_self.syncVideos();
			});
			this.options.cVideo1.oncanplaythrough = function () {
				this.options.canPlayVideos = true;
				if (this.options.cVideo1.style.opacity < 1) {
					//gsap.to(this.options.cVideo1, 1, {opacity: 1, ease: "expo.out", delay: 1});
					this.options.cVideo1.style.opacity = 1;
				}
			};
			this.options.cVideo2.oncanplaythrough = function () {
				this.options.canPlayVideos = true;
				if (this.options.cVideo2.style.opacity < 1) {
					//gsap.to(this.options.cVideo2, 1, {opacity: 1, ease: "expo.out", delay: 1});
					this.options.cVideo2.style.opacity = 1;
				}
			};
		} else {
			// ELSE... IMAGE ONLY MODE IS TRUE
			this.options.cVideo1.style.display = "none";
			this.options.cVideo2.style.display = "none";
		}

		// Check the browser window width on initial page load...
		_self.checkSizeComparison();

		// Check the browser window width on window resize event...
		$(window).resize(_self.checkSizeComparison.bind(_self));
		$(document).on('cbox_complete', function() {
			var comparisonSliderEnhanced = $("#colorbox").find(".comparisonSliderEnhanced");
			if( comparisonSliderEnhanced.length ) 
				$("#colorbox").find("#cboxClose").css("z-index", 1);
			_self.checkSizeComparison();
			$.colorbox.resize();
		});

		// Check the browser window width and height on orientation change...
		window.addEventListener('orientationchange', _self.onOrientationChange.bind(_self));
	};
	
	
	Plugin.prototype.compareIntroAnimation = function() { 
		var _self = this;

		if (this.options.introPlayed !== true) {
			gsap.set([_self.$element.find(".gf-compare-caption-left")], { opacity: 0, overwrite: true });
			gsap.set([_self.$element.find(".gf-compare-caption-right")], { opacity: 0, overwrite: true });
			gsap.fromTo([_self.$element.find(".gf-compare-caption-left")], { opacity: 0 }, { duration: 2, opacity: 1, ease: "back.inOut(0.6)", delay: 0.35, overwrite: true });
			gsap.fromTo([_self.$element.find(".gf-compare-caption-right")], { opacity: 0 }, { duration: 2, opacity: 1, ease: "back.inOut(0.6)", delay: 0.35, overwrite: true });
			gsap.fromTo([_self.$element.find(".gf-compare-left")], 
				{ clip: "rect(0px " + this.options.comparisonSliderWidth + "px " + this.options.comparisonSliderHeight + "px 0px)", overwrite: true },
				{ duration: 2, clip: "rect(0px, " + (this.options.comparisonSliderWidth * 0.30) + "px, " + this.options.comparisonSliderHeight + "px, 0px)", ease: "back.inOut(0.6)", overwrite: true });

			gsap.fromTo([_self.$element.find(".gf-compare-divider")], 
				{ backgroundColor: "#eee", x: ( ( this.options.comparisonSliderWidth ) * 0.5), overwrite: true }, 
				{ duration: 2, backgroundColor: "rgba(118,185,0,1)", x: -( ( this.options.comparisonSliderWidth ) * 0.20), ease: "back.inOut(0.6)", overwrite: true });

			switch(_self.options.viewport){
				case 'mobile':
				case 'tablet':
					gsap.fromTo([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)" }, { duration: 2, backgroundColor: "rgba(118,185,0,0.01)", ease: "back.inOut(0.6)", delay: 0.5, overwrite: true });
					break;
				default:
					gsap.fromTo([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)" }, { duration: 2, backgroundColor: "rgba(118,185,0,1)", ease: "back.inOut(0.6)", delay: 0.5, overwrite: true });
			}

			//gsap.to([_self.$element.find('.ray-tracing')], {duration: 2, text: "This is the new text", ease: "none"});

			if (!this.options.imageOnlyMode) {
				this.options.cVideo1.play();
				this.options.cVideo2.play();
				this.options.cVideo1.currentTime = 0;
				this.options.cVideo2.currentTime = 0;
			}
			this.options.introPlayed = true;
			this.options.comparisonSliderCentered = false;

		} else {
			this.options.comparisonSliderCentered = false;
			_self.resetToCenterAnimation();
			this.options.introPlayed = false;
		}
	};
	
	Plugin.prototype.refreshResponsiveValues = function () {

		this.options.prevWidth = this.options.winWidth;
		this.options.prevHeight = this.options.vh;
		// this.options.ww = $(window).width();
		// this.options.wh = $(window).height();
		// this.options.dw = $(document).width();
		// this.options.dh = $(document).height();
		// this.options.wi = $(window).innerWidth();

		this.options.ww = this.$element.width();
		this.options.wi = this.$element.innerWidth();
		this.options.winWidth = Math.max(this.options.ww, this.options.wi);

		this.options.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this.options.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		this.options.vw = Math.max(this.$element.width(), this.$element.innerWidth());
		this.options.vh = Math.max(this.$element.height(), this.$element.innerHeight());
		this.options.previousOrientation = this.options.orientation;
		this.options.orientation = (this.options.vw > this.options.vh) ? "landscape" : "portrait";		

		this.options.previousVideoSizeIndex = this.options.currentVideoSizeIndex;

		if (this.options.vw < 640) {
			// TARGET: MOBILE PHONES and PHABLETS...
			// MOBILE
			this.options.responsiveIndex = 0;
			if (this.options.vw <= 400) {
				// MIN PHONE (320 - 400)
				this.options.currentVideoSizeIndex = 0; // 180p ( 320 x 180 )
			} else if (this.options.vw > 400 && this.options.vw < 640) {
				// MAX PHONE or PHABLET (401 - 639)
				this.options.currentVideoSizeIndex = 1; // 360p ( 640 x 360 )
			}
		} else if (this.options.vw >= 640 && this.options.vw < 1024) {
			// TARGET: TABLETS...
			// TABLET
			this.options.responsiveIndex = 1;
			if (this.options.vw <= 768) {
				// PHABLET (640 - 768)
				this.options.currentVideoSizeIndex = 2; // 433p ( 768 x 433 )
			} else {
				// MAX PHONE TARGET ()
				this.options.currentVideoSizeIndex = 3; // 576p (1024 x 576 )
			}
		} else if (this.options.vw >= 1024 && this.options.vw < 1350) {
			// TARGET: LAPTOPS...
			// LAPTOP
			this.options.responsiveIndex = 2;
			if (this.options.vw <= 1280) {
				// MIN LAPTOP TARGET
				this.options.currentVideoSizeIndex = 4; // 720p ( 1280 x 720 )
			} else {
				// MAX LAPTOP TARGET
				this.options.currentVideoSizeIndex = 5; // 760p ( 1350 x 760 )
			}
		} else if (this.options.vw >= 1350) {
			// TARGET: DESKTOPS...
			this.options.responsiveIndex = 3; // DESKTOP
			if (this.options.vw == 1350) {
				// MIN DESKTOP TARGET
				this.options.currentVideoSizeIndex = 5; // 760p  ( 1350 x 760 )
			} else if (this.options.vw >= 1351 && this.options.vw <= 2048) {
				// MID DESKTOP TARGET
				this.options.currentVideoSizeIndex = 6; // 1152p ( 2048 x 1152 )
			} else if (this.options.vw > 2048) {
				// MAX DESKTOP TARGET
				this.options.currentVideoSizeIndex = 7; // 2560p ( 2560 x 1440 )
			}
		}

		if (this.options.vw - this.options.winWidth > 0) {
			this.options.scrollbarVisible = true;
			this.options.scrollbarWidth = this.options.vw - this.options.winWidth;
		} else {
			this.options.scrollbarVisible = false;
			this.options.scrollbarWidth = this.options.vw - this.options.winWidth;
		}

		//this.options.currentImageSizeIndex = this.options.responsiveIndex;
		this.options.responsiveNavigationScrollOffset = this.options.responsiveNavigationScrollOffsetArray[this.options.responsiveIndex];

	};

	Plugin.prototype.checkSizeComparison = function () {
		var _self = this;

		_self.refreshResponsiveValues();

		if (this.options.previousOrientation !== undefined && this.options.previousOrientation !== this.options.orientation) {
			_self.onOrientationChange();
			return;
		}

		if (!this.options.comparisonSliderScrollTriggerReady) {
			_self.initComparisonSliderScrollTrigger();
		}

		if (!this.options.imageOnlyMode) {
			if (this.options.canPlayVideos) _self.pauseVideos();
			this.options.cImg1.style.opacity = 1;
			this.options.cImg2.style.opacity = 1;
			this.options.cVideo1.style.opacity = 0;
			this.options.cVideo2.style.opacity = 0;
			if (this.options.previousVideoSizeIndex != this.options.currentVideoSizeIndex) {
				gsap.killTweensOf(_self.switchVideo);
				gsap.delayedCall(0.4, _self.switchVideo);
			}
		}

		if (this.options.comparisonSliderScreenMode === "mixed") {

			// MIXED MODE
			if (this.options.vw < 640) {

				// MOBILE
				this.options.comparisonSliderWidth = this.options.comparisonSliderMobileWidth;
				this.options.comparisonSliderHeight = this.options.comparisonSliderMobileHeight;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 20, height: 24, overwrite: true });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 24, height: 24, borderRadius: 12, marginLeft: -11, top: (this.options.comparisonSliderHeight * 0.5) - 12, overwrite: true }); // #666 transparent

			} else if (this.options.vw > 639 && this.options.vw < 1350) {

				if (this.options.vw > 639 && this.options.vw < 1024) {

					// TABLET
					this.options.comparisonSliderWidth = this.options.comparisonSliderTabletWidth;
					this.options.comparisonSliderHeight = this.options.comparisonSliderTabletHeight;
					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666 transparent

				} else {

					// LAPTOP
					this.options.comparisonSliderWidth = this.options.comparisonSliderDesktopWidth;
					this.options.comparisonSliderHeight = this.options.comparisonSliderDesktopHeight;
					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666
				}

			} else if (this.options.vw >= 1350) {

				if (this.options.vw <= 2560) {

					// DESKTOP
					this.options.comparisonSliderWidth = this.options.winWidth * 0.9999;
					this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;

					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666

				} else {

					// ULTRA-WIDE DESKTOP

					this.options.comparisonSliderWidth = this.options.comparisonSliderUltraWidth;
					this.options.comparisonSliderHeight = this.options.comparisonSliderUltraHeight;
					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666
				}
			}

		} else if (this.options.comparisonSliderScreenMode === "responsive") {

			// RESPONSIVE MODE

			if (this.options.vw < 640) {

				// MOBILE

				this.options.comparisonSliderWidth = this.options.comparisonSliderMobileWidth;
				this.options.comparisonSliderHeight = this.options.comparisonSliderMobileHeight;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 20, height: 24, overwrite: true });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 24, height: 24, borderRadius: 12, marginLeft: -11, top: (this.options.comparisonSliderHeight * 0.5) - 12, overwrite: true }); // #666 transparent

			} else if (this.options.vw >= 640 && this.options.vw < 1350) {

				if (this.options.vw >= 640 && this.options.vw < 1023) {

					// TABLET
					this.options.comparisonSliderWidth = this.options.comparisonSliderTabletWidth;
					this.options.comparisonSliderHeight = this.options.comparisonSliderTabletHeight;
					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666 transparent

				} else {

					// DESKTOP
					this.options.comparisonSliderWidth = this.options.comparisonSliderDesktopWidth;
					this.options.comparisonSliderHeight = this.options.comparisonSliderDesktopHeight;
					gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666
				}

			} else if (this.options.vw >= 1350) {

				// ULTRA WIDE
				this.options.comparisonSliderWidth = this.options.comparisonSliderUltraWidth;
				this.options.comparisonSliderHeight = this.options.comparisonSliderUltraHeight;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666
			}

		} else if (this.options.comparisonSliderScreenMode === "fullscreen") {

			// FULLSCREEN MODE

			if (this.options.vw < 1024) {

				// MOBILE, PHABLET, TABLET VIEWS ONLY...

				this.options.comparisonSliderWidth = (this.options.winWidth * 0.9999) - 60;
				this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 50, height: 100, left: 1 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 100, height: 100, borderRadius: 50, marginLeft: -50, top: (this.options.comparisonSliderHeight * 0.5) - 50, overwrite: true }); // #666 transparent

			} else if (this.options.vw > 1024 && this.options.vw < 2560) {

				// LAPTOP / DESKTOP...

				this.options.comparisonSliderWidth = this.options.winWidth * 0.9999;
				this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666

			} else {

				// ULTRA-WIDE DESKTOP...

				this.options.comparisonSliderWidth = this.options.comparisonSliderUltraWidth;
				this.options.comparisonSliderHeight = this.options.comparisonSliderUltraHeight;
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, overwrite: true }); // #666
			}

		} else if (this.options.comparisonSliderScreenMode === "fullscreenResponsiveHeight") {

			// FULLSCREEN RESPONSIVE HEIGHT MODE

			_self.checkHeightComparison();
		}

		// SET SIZES FOR COMPARISON SLIDER...

		gsap.set([_self.$element.find(".comparison-slider")], { width: this.options.comparisonSliderWidth, height: this.options.comparisonSliderHeight, overwrite: true });

		gsap.set([_self.$element.find(".gf-compare-left")], {
			width: this.options.comparisonSliderWidth,
			height: this.options.comparisonSliderHeight,
			clip: "rect(0px " + this.options.comparisonSliderWidth + "px " + this.options.comparisonSliderHeight + "px 0px)",
			overwrite: true
		});

		gsap.set([_self.$element.find(".gf-compare-right")], { width: this.options.comparisonSliderWidth, height: this.options.comparisonSliderHeight, overwrite: true });

		gsap.set([_self.$element.find(".gf-compare-divider")], { opacity: 1, backgroundColor: "rgba(110,110,110,0.9)", marginLeft: (this.options.comparisonSliderWidth * 0.5), x: (this.options.comparisonSliderWidth * 0.5), height: this.options.comparisonSliderHeight });

		if (this.options.comparisonSliderInRange) {
			gsap.killTweensOf(_self.compareIntroAnimation.bind(this));
			gsap.delayedCall(0.2, _self.compareIntroAnimation.bind(this));
		}
	};

	Plugin.prototype.checkHeightComparison = function () {
		var _self = this,
		    elementBoundaries = this.element.getBoundingClientRect();

		this.options.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this.options.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		
		this.options.responsiveNavigationScrollOffset = this.options.responsiveNavigationScrollOffsetArray[this.options.responsiveIndex];

		this.options.comparisonSliderWidth = this.options.winWidth; // - 60;
		this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;

		this.options.prevHeight = this.options.vh;

		this.options.comparisonSliderLeft = elementBoundaries.left;
		this.options.comparisonSliderRight = $(window).width() - elementBoundaries.right;

		gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { clearProps: "all" });
		//gsap.set([_self.$element.find(".game-logo")], { clearProps: "all" });
		gsap.set([_self.$element.find(".game-logo")], { backgroundImage: "url("+ this.options.gameLogo +")" });

		if (this.options.vw < 640) {

			// MOBILE PHONE...

			if (this.options.vh < ((this.options.winWidth * 0.5625) + 79) && this.options.comparisonSliderInRange == true || this.options.comparisonSliderEntered == true) {
				this.options.comparisonSliderUnderMinHeight = true;
			} else {
				this.options.comparisonSliderUnderMinHeight = false;
			}

			if (this.options.comparisonSliderUnderMinHeight == true) {

				// Lesser than minimum height...

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "fixed", left: this.options.comparisonSliderLeft + 45, top: "auto", bottom: 12 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "fixed", right: this.options.comparisonSliderRight + 45, top: "auto", bottom: 12 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 30, height: 30, top: 8 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { position: "absolute", backgroundColor: "rgba(118,185,0,0.01)", width: 48, height: 48, borderRadius: 50, marginLeft: -24, top: "calc(50vh - 105px)", bottom: "auto" });

			} else {

				// Greater than minimum height...

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "absolute", left: 15, top: "auto", bottom: 10 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "absolute", right: 15, top: "auto", bottom: 10 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 30, height: 30, top: 8 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 48, height: 48, borderRadius: 50, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 50 });

				this.options.comparisonSliderUnderMinHeight = false;
			}

		} else if (this.options.vw > 639 && this.options.vw < 1024) {

			// TABLET...

			if (this.options.vh < ((this.options.winWidth * 0.5625) + 100) && this.options.comparisonSliderInRange == true || this.options.comparisonSliderEntered == true) {
				this.options.comparisonSliderUnderMinHeight = true;
			} else {
				this.options.comparisonSliderUnderMinHeight = false;
			}

			if (this.options.comparisonSliderUnderMinHeight == true) {
				//console.log("checkHeight start :: TABLET HEIGHT :: this.options.vh", this.options.vh, "<", "(this.options.winWidth * 0.5625) + 100)", (this.options.winWidth * 0.5625) + 100);
				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "fixed", left: this.options.comparisonSliderLeft + 60, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "fixed", right: this.options.comparisonSliderRight + 60, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { position: "fixed", backgroundColor: "rgba(118,185,0,0.01)", width: 100, height: 100, borderRadius: 50, marginLeft: -50, top: "calc(50vh - 101px)", bottom: "auto" });
			} else {
				//console.log("checkHeight start :: TABLET HEIGHT :: this.options.vh", this.options.vh, ">=", "(this.options.winWidth * 0.5625) + 100)", (this.options.winWidth * 0.5625) + 100);
				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "absolute", left: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "absolute", right: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)", width: 100, height: 100, borderRadius: 50, marginLeft: -50, top: (this.options.comparisonSliderHeight * 0.5) - 50 });
			}

			gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 50, height: 100, left: 1 });
			gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "relative", width: "100%", height: 88, top: 65, right: "auto", bottom: "auto", left: 0 });
			//gsap.set([_self.$element.find(".game-logo")], { position: "relative", width: "100%", height: 88, top: 65, right: "auto", bottom: "auto", left: 0 });

		} else if (this.options.vw > 1023 && this.options.vw < 1350) {

			// LAPTOP...

			this.options.comparisonSliderWidth = this.options.winWidth; // * 0.9999
			this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;

			if (this.options.vh < (this.options.winWidth * 0.5625) + 100 && this.options.comparisonSliderInRange == true || this.options.comparisonSliderEntered == true) {
				this.options.comparisonSliderUnderMinHeight = true;
			} else {
				this.options.comparisonSliderUnderMinHeight = false;
			}

			if (this.options.comparisonSliderUnderMinHeight == true) {
				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "fixed", left: this.options.comparisonSliderLeft + 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "fixed", right: this.options.comparisonSliderRight + 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48, left: 1 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: "calc(50vh - 96px)", bottom: "auto" });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "fixed", width: 152, height: 80, right: this.options.comparisonSliderRight + 25, bottom: 60 });
				//gsap.set([_self.$element.find(".game-logo")], { position: "fixed", width: 152, height: 80, right: 25, bottom: 60 });
			} else {
				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "absolute", left: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "absolute", right: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48, left: 1 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24, bottom: "auto" });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "absolute", width: 192, height: 80, right: 25, bottom: 60 });
				//gsap.set([_self.$element.find(".game-logo")], { position: "absolute", width: 192, height: 80, right: 25, bottom: 60 });
			}

		} else if (this.options.vw > 1349 && this.options.vw < 2560) {

			// DESKTOP...

			this.options.comparisonSliderWidth = this.options.winWidth; // * 0.9999
			this.options.comparisonSliderHeight = this.options.comparisonSliderWidth * 0.5625;

			if (this.options.vh < (this.options.winWidth * 0.5625) + 136 && this.options.comparisonSliderInRange == true || this.options.comparisonSliderEntered == true) {
				this.options.comparisonSliderUnderMinHeight = true;
			} else {
				this.options.comparisonSliderUnderMinHeight = false;
			}

			if (this.options.comparisonSliderUnderMinHeight == true) {

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "fixed", left: this.options.comparisonSliderLeft + 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "fixed", right: this.options.comparisonSliderRight + 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: "calc(50vh - 96px)", bottom: "auto" });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "fixed", width: 245, height: 72, top: "auto", right: this.options.comparisonSliderRight + 30, bottom: 85, left: "auto" });
				//gsap.set([_self.$element.find(".game-logo")], { position: "fixed", width: 245, height: 72, top: "auto", right: 30, bottom: 85, left: "auto" });
			} else {

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "absolute", left: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "absolute", right: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24 });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "absolute", width: 245, height: 72, top: "auto", right: 30, bottom: 85, left: "auto" });
				//gsap.set([_self.$element.find(".game-logo")], { position: "absolute", width: 245, height: 72, top: "auto", right: 30, bottom: 85, left: "auto" });
			}

		} else if (this.options.vw >= 2560) {

			// ULTRA-WIDE DESKTOPS...

			this.options.comparisonSliderWidth = this.options.comparisonSliderUltraWidth;
			this.options.comparisonSliderHeight = this.options.comparisonSliderUltraHeight;

			if (this.options.vh < (this.options.winWidth * 0.5625) + 136 && this.options.comparisonSliderInRange == true || this.options.comparisonSliderEntered == true) {
				this.options.comparisonSliderUnderMinHeight = true;
			} else {
				this.options.comparisonSliderUnderMinHeight = false;
			}

			if (this.options.comparisonSliderUnderMinHeight == true) {

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "fixed", left: (30 + ((this.options.vw - 2560) * 0.5)), top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "fixed", right: (30 + ((this.options.vw - 2560) * 0.5)), top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: "calc(50vh - 96px)" });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "fixed", width: 245, height: 72, top: "auto", right: this.options.comparisonSliderRight + (30 + ((this.options.vw - 2560) * 0.5)), bottom: 85, left: "auto" });
				//gsap.set([_self.$element.find(".game-logo")], { position: "fixed", width: 245, height: 72, top: "auto", right: (30 + ((this.options.vw - 2560) * 0.5)), bottom: 85, left: "auto" });
			} else {

				gsap.set([_self.$element.find(".gf-compare-caption-left")], { position: "absolute", left: 30, top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-caption-right")], { position: "absolute", right: (30 + this.options.scrollbarWidth), top: "auto", bottom: 30 });
				gsap.set([_self.$element.find(".gf-compare-arrows")], { width: 36, height: 48 });
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)", width: 48, height: 48, borderRadius: 24, marginLeft: -24, top: (this.options.comparisonSliderHeight * 0.5) - 24 });
				gsap.set([_self.$element.find(".game-logo"), _self.$element.find(".game-text")], { position: "absolute", width: 245, height: 72, top: "auto", right: (30 + this.options.scrollbarWidth), bottom: 85, left: "auto" });
				//gsap.set([_self.$element.find(".game-logo")], { position: "absolute", width: 245, height: 72, top: "auto", right: (30 + this.options.scrollbarWidth), bottom: 85, left: "auto" });
			}
		}

	};

	Plugin.prototype.initComparisonSliderScrollTrigger = function () {
		var _self = this;

		ScrollTrigger.create({
			trigger: _self.options.id,
			start: "top bottom",
			end: "bottom 33%",
			onEnter: function () { _self.enterLeaveComparisonSection("enter"); },
			onEnterBack: function () { _self.enterLeaveComparisonSection("enterBack"); },
			onLeave: function () { _self.enterLeaveComparisonSection("leave"); },
			onLeaveBack: function () { _self.enterLeaveComparisonSection("leaveBack"); },
			id: "rtx",
			markers: false
		});

		ScrollTrigger.create({
			trigger: _self.$element.find(".comparison-slider")[0],
			start: "top 70%",
			end: "bottom bottom",
			onEnter: function () { _self.enterLeaveComparisonSlider("enter"); },
			onEnterBack: function () { _self.enterLeaveComparisonSlider("enterBack"); },
			onLeave: function () { _self.enterLeaveComparisonSlider("leave"); },
			onLeaveBack: function () { _self.enterLeaveComparisonSlider("leaveBack"); },
			id: "compare",
			markers: false
		});

		this.options.comparisonSliderScrollTriggerReady = true;
	};

	Plugin.prototype.enterLeaveComparisonSection = function (_e) {
		var _self = this;

		//console.log("enterLeaveComparisonSection :: _e =", _e);

		if (_e == "enter" || _e == "enterBack") {

			//console.log("enterLeaveComparisonSection ::", _e, ":: this.options.comparisonSliderInRange:", this.options.comparisonSliderInRange, "this.options.comparisonSliderEntered:", this.options.comparisonSliderEntered);

			gsap.killTweensOf(_self.compareIntroAnimation.bind(this));
			gsap.delayedCall(0.2, _self.compareIntroAnimation.bind(this));

		} else if (_e == "leave" || _e == "leaveBack") {

			//console.log("enterLeaveComparisonSection ::", _e, ":: this.options.comparisonSliderInRange:", "this.options.introPlayed:", this.options.introPlayed, "this.options.outroPlayed:", this.options.outroPlayed);

			gsap.killTweensOf(_self.compareOutroAnimation);
			gsap.delayedCall(0.2, _self.compareOutroAnimation);
		}
	};

	Plugin.prototype.enterLeaveComparisonSlider = function (_e) {
		
		if (_e == "enter" || _e == "enterBack") {
			this.options.comparisonSliderInRange = true;
			this.options.comparisonSliderEntered = (_e == "enter") ? true : false;
			//console.log("enterLeaveComparisonSlider :: onEnter :: this.options.comparisonSliderInRange:", this.options.comparisonSliderInRange, "this.options.comparisonSliderEntered:", this.options.comparisonSliderEntered);
		} else if (_e == "leave" || _e == "leaveBack") {
			this.options.comparisonSliderInRange = false;
			this.options.comparisonSliderEntered = false;
			//console.log("enterLeaveComparisonSlider :: onLeave :: this.options.comparisonSliderInRange:", this.options.comparisonSliderInRange, "this.options.comparisonSliderEntered:", this.options.comparisonSliderEntered);
		}

		this.checkHeightComparison();
	};

	Plugin.prototype.resetToCenterAnimation = function () {
		var _self = this;
		
		if (this.options.comparisonSliderCentered == true) return;

		gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: 1.5, opacity: 1, ease: "back.inOut(0.6)", delay: 0.35, overwrite: "auto" });
		gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: 1.5, opacity: 1, ease: "back.inOut(0.6)", delay: 0.35, overwrite: "auto" });
		gsap.to([_self.$element.find(".gf-compare-left")], { duration: 1.5, clip: "rect(0px, " + (this.options.comparisonSliderWidth * 0.5) + "px, " + this.options.comparisonSliderHeight + "px, 0px)", ease: "back.inOut(0.6)", overwrite: "auto" });
		gsap.to([_self.$element.find(".gf-compare-divider")], { duration: 1.5, backgroundColor: "rgba(118,185,0,1)", x: -(this.options.comparisonSliderWidth * 0), ease: "back.inOut(0.6)", overwrite: "auto" });

		if (this.options.vw < 1024) {
			gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 1.5, backgroundColor: "rgba(118,185,0,0.01)", ease: "back.inOut(0.6)", delay: 0.35 });
		} else {
			gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 1.5, backgroundColor: "rgba(118,185,0,1)", ease: "back.inOut(0.6)", delay: 0.35 });
		}
		if (!this.options.imageOnlyMode) {
			this.options.cVideo1.currentTime = this.options.currentVideosTime;
			this.options.cVideo2.currentTime = this.options.currentVideosTime;
			this.options.cVideo1.play();
			this.options.cVideo2.play();
		}
		this.options.comparisonSliderCentered = true;
	};

	Plugin.prototype.compareOutroAnimation = function() {
		var _self = this;

		_self.resetToCenterAnimation();

		if (!this.options.imageOnlyMode) {
			_self.pauseVideos();
			this.options.currentVideosTime = this.options.cVideo1.currentTime;
		}

		if (this.options.outroPlayed) {
			_self.resetToCenterAnimation();
		}

		this.options.outroPlayed = true;
	};

	Plugin.prototype.compareSides = function(_duration, _endX) {
		var _self = this;
		
		_duration = 0.5;

		if (_endX < -(this.options.comparisonSliderWidth * 0.25)) {

			if (_endX <= -((this.options.comparisonSliderWidth * 0.5) - 5)) {
				gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: _duration, opacity: 0.2, ease: "cubic.out" });
				gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: _duration, opacity: 1, ease: "cubic.out" });

				switch(_self.options.viewport){
					case 'mobile':
					case 'tablet':
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _duration, backgroundColor: "rgba(118,185,0,0.01)", ease: "cubic.out", delay: 0.9 });
						break;
					default:
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _duration, backgroundColor: "rgba(118,185,0,1)", ease: "cubic.out", delay: 0.9 });
				}

				gsap.to([_self.$element.find(".gf-compare-divider")], { duration: _duration, backgroundColor: "rgba(51,51,51,0.5)", ease: "cubic.out", delay: 0.9 }); // #333 half transparent

			} else {
				gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: _duration, opacity: 0.2, ease: "cubic.out" });
				gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: _duration, opacity: 1, ease: "cubic.out" });
			}

		} else if (_endX > (this.options.comparisonSliderWidth * 0.25)) {

			if (_endX >= ((this.options.comparisonSliderWidth * 0.5) - 5)) {
				gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: _duration, opacity: 1, ease: "cubic.out" });
				gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: _duration, opacity: 0.2, ease: "cubic.out" });

				switch(_self.options.viewport){
					case 'mobile':
					case 'tablet':
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _duration, backgroundColor: "rgba(118,185,0,0.01)", ease: "cubic.out", delay: 0.9 });
						break;
					default:
						gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: _duration, backgroundColor: "rgba(118,185,0,1)", ease: "cubic.out", delay: 0.9 });
				}

				gsap.to([_self.$element.find(".gf-compare-divider")], { duration: _duration, backgroundColor: "rgba(51,51,51,0.5)", ease: "cubic.out", delay: 0.9 }); // #333 half transparent
			} else {
				gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: _duration, opacity: 1, ease: "cubic.out" });
				gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: _duration, opacity: 0.2, ease: "cubic.out" });
			}
		} else {
			gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: _duration, opacity: 1, ease: "cubic.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: _duration, opacity: 1, ease: "cubic.out" });
		}
		
	};

	Plugin.prototype.toggleSides = function (side) {
		var _self = this;
		
		if (side === "left") {
			gsap.to([this.$element.find(".gf-compare-divider")], { duration: 1, x: (this.options.comparisonSliderWidth * 0.5), ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-left")], { duration: 1, clip: "rect(0px " + (this.options.comparisonSliderWidth) + "px " + this.options.comparisonSliderHeight + "px 0px)", ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: 0.5, opacity: 1, ease: "cubic.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: 0.5, opacity: 0.2, ease: "cubic.out" });
			this.options.comparisonSliderSide = "left";
		} else if (side === "right") {
			gsap.to([_self.$element.find(".gf-compare-divider")], { duration: 1, x: -(this.options.comparisonSliderWidth * 0.5), ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-left")], { duration: 1, clip: "rect(0px 0px " + this.options.comparisonSliderHeight + "px 0px)", ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: 0.5, opacity: 0.2, ease: "cubic.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: 0.5, opacity: 1, ease: "cubic.out" });
			this.options.comparisonSliderSide = "right";
		}
	};

	Plugin.prototype.switchSides = function (side) {
		var _self = this;

		if (side !== comparisonSliderSide) {

			switch(_self.options.viewport){
				case 'mobile':
				case 'tablet':
					gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)" });
					gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 0.2, backgroundColor: "rgba(153,153,153,0.01)", delay: 1.2 });
					break;
				default:
					gsap.set([_self.$element.find(".game-logo")], { backgroundColor: "rgba(118,185,0,1)" }); // #666
					gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 0.2, backgroundColor: "rgba(153,153,153,1)", delay: 1.2 }); // #999
			}

			gsap.set([_self.$element.find(".gf-compare-divider")], { backgroundColor: "rgba(51,51,51,0.5)" }); // #333 half transparent
		}
		if (side === "left") {
			// LEFT
			gsap.to([_self.$element.find(".gf-compare-divider")], { duration: 1, x: (this.options.comparisonSliderWidth * 0.5), ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-left")], { duration: 1, clip: "rect(0px " + (this.options.comparisonSliderWidth) + "px " + this.options.comparisonSliderHeight + "px 0px)", ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: 0.5, opacity: 1, ease: "cubic.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: 0.5, opacity: 0.2, ease: "cubic.out" });
			this.options.comparisonSliderSide = "left";
		} else {
			// RIGHT
			gsap.to([_self.$element.find(".gf-compare-divider")], { duration: 1, x: -(this.options.comparisonSliderWidth * 0.5), ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-left")], { duration: 1, clip: "rect(0px " + 0 + "px " + this.options.comparisonSliderHeight + "px 0px)", ease: "expo.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-left")], { duration: 0.5, opacity: 0.2, ease: "cubic.out" });
			gsap.to([_self.$element.find(".gf-compare-caption-right")], { duration: 0.5, opacity: 1, ease: "cubic.out" });
			this.options.comparisonSliderSide = "right";
		}
		if (!this.options.imageOnlyMode) {
			this.resyncVideos();
		}
	};

	Plugin.prototype.checkForVideoSupport = function() {
		if (document.all && !document.addEventListener) {
			this.options.imageOnlyMode = true;
		}
	};
	
	Plugin.prototype.onOrientationChange = function () {
		if (this.options.previousOrientation === this.options.orientation) return;
		this.checkSizeComparison();
	};

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	Plugin.prototype.pauseVideos = function () {
		if (this.options.imageOnlyMode) return;
		this.options.cVideo1.pause();
		this.options.cVideo2.pause();
	};

	Plugin.prototype.playVideos = function () {
		if (this.options.imageOnlyMode) return;
		this.options.cVideo1.play();
		this.options.cVideo2.play();
	};

	Plugin.prototype.resetVideos = function () {
		var _self = this;

		if (this.options.imageOnlyMode) return;
		this.pauseVideos();
		this.options.cVideo1.currentTime = this.options.cVideo2.currentTime = 0;

		switch(_self.options.viewport){
			case 'mobile':
			case 'tablet':
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,0.01)" }); // #666 transparent
				gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 0.5, backgroundColor: "rgba(153,153,153,0.01)", delay: 1.2 }); // #999 transparent
				break;
			default:
				gsap.set([_self.$element.find(".gf-compare-dragger")], { backgroundColor: "rgba(118,185,0,1)" }); // #666 opaque
				gsap.to([_self.$element.find(".gf-compare-dragger")], { duration: 0.5, backgroundColor: "rgba(153,153,153,1)", delay: 1.2 }); // #999 opaque
		}

		gsap.set([_self.$element.find(".gf-compare-divider")], { backgroundColor: "rgba(51,51,51,0.5)" }); // #333 half transparent
	};

	Plugin.prototype.syncVideos = function () {
		if (this.options.imageOnlyMode) return;
		if (this.options.cVideo1.currentTime > 0) {
			this.options.cVideo1.currentTime = 0;
			this.options.cVideo2.currentTime = 0;
		}
		this.options.cVideo2.currentTime = this.options.cVideo1.currentTime;
		this.options.cVideo1.currentTime = this.options.cVideo2.currentTime;
		this.options.cVideo1.play();
		this.options.cVideo2.play();
	};

	Plugin.prototype.resyncVideos = function () {
		if (this.options.imageOnlyMode) return;
		this.options.cVideo2.currentTime = this.options.cVideo1.currentTime;
		this.options.cVideo1.currentTime = this.options.cVideo2.currentTime;
		this.options.cVideo1.play();
		this.options.cVideo2.play();
	};

	Plugin.prototype.switchVideo = function () {
		if (this.options.imageOnlyMode) return;
		var v = this.options.currentVideoSizeIndex;
		this.options.cVideo1.style.opacity = 1;
		this.options.cVideo2.style.opacity = 1;
		if (Modernizr.video && Modernizr.video.webm) {
			this.options.cVideo1.setAttribute("src", this.options.videosOff[v][0]);
			this.options.cVideo1.setAttribute("type", "video/webm");
			this.options.cVideo1.setAttribute("preload", "auto");
			this.options.cVideo2.setAttribute("src", this.options.videosOn[v][0]);
			this.options.cVideo2.setAttribute("type", "video/webm");
			this.options.cVideo2.setAttribute("preload", "auto");

		} else if (Modernizr.video && Modernizr.video.mp4) {
			this.options.cVideo1.setAttribute("src", this.options.videosOff[v][1]);
			this.options.cVideo1.setAttribute("type", "video/mp4");
			this.options.cVideo1.setAttribute("preload", "auto");
			this.options.cVideo2.setAttribute("src", this.options.videosOn[v][1]);
		}
	};

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
	};
	
	$.getScriptCached = function( url, callback ){
		return $.ajax({
				url:url,
				dataType:"script",
				cache:true}).done(callback);
	};

	$.getMultiScripts = function(arr, path) {
		var _arr = $.map(arr, function(scr) {
			return $.getScriptCached( (path||"") + scr );
		});
			
		_arr.push($.Deferred(function( deferred ){
			$( deferred.resolve );
		}));
			
		return $.when.apply($, _arr);
	};
})(jQuery, window, document);
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'columnTiles',
	screenWidth,
	pixelSize = window.devicePixelRatio,
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		this.registerCallbacks();
		this.setBgImage();
	};

	Plugin.prototype.registerCallbacks= function(){
		var throttledSetBgImage = _.throttle(Plugin.prototype.setBgImage, 500);
		$(window).resize($.proxy(throttledSetBgImage, this));
	}

	Plugin.prototype.setBgImage= function() {
		
		// We load the mobile background image for devices with a viewport of 767px or less
		// We load the tablet background image for devices with a viewport betweek 768px and 1024px
		// We load the desktop background image for devices with a viewport between 1025px or 1280px
		// We load the large desktop background image for devices with a viewport of 1281px or more
		
		screenWidth = $(document).width();
		if (this.options.columnsNumber == 3){
			/* TODO: fix this once retina display issue is fixed.*/
			if(pixelSize > 5) {
				if (screenWidth < tabletBreakpoint) {
					var highres1 = this.options.imageMobileUrl1,
						highres2 = this.options.imageMobileUrl2,
						highres3 = this.options.imageMobileUrl3;
						
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-1').css("background-image", "url('"+highres1+"')");
					} else {					
						this.setValidImg(this.$element.find('.threecolumn-1'), this.options.imageMobileUrl1.replace(".", "@2x."), this.options.imageMobileUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-2').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-2'), this.options.imageMobileUrl2.replace(".", "@2x."), this.options.imageMobileUrl2);
					}
					if(highres3.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-3').css("background-image", "url('"+highres3+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-3'), this.options.imageMobileUrl2.replace(".", "@2x."), this.options.imageMobileUrl3);
					}
				} 
				else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
					var highres1 = this.options.imageTabletUrl1,
						highres2 = this.options.imageTabletUrl2,
						highres3 = this.options.imageTabletUrl3;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-1').css("background-image", "url('"+highres1+"')");
					} else {	
						this.setValidImg(this.$element.find('.threecolumn-1'), this.options.imageTabletUrl1.replace(".", "@2x."), this.options.imageTabletUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-2').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-2'), this.options.imageTabletUrl2.replace(".", "@2x."), this.options.imageTabletUrl2);
					}
					if(highres3.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-3').css("background-image", "url('"+highres3+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-3'), this.options.imageTabletUrl3.replace(".", "@2x."), this.options.imageTabletUrl3);
					}
				} 
				else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint) {
					var highres1 = this.options.imageDesktopUrl1,
						highres2 = this.options.imageDesktopUrl2,
						highres3 = this.options.imageDesktopUrl3;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-1').css("background-image", "url('"+highres1+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-1'), this.options.imageDesktopUrl1.replace(".", "@2x."), this.options.imageDesktopUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-2').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-2'), this.options.imageDesktopUrl2.replace(".", "@2x."), this.options.imageDesktopUrl2);
					}
					if(highres3.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-3').css("background-image", "url('"+highres3+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-3'), this.options.imageDesktopUrl3.replace(".", "@2x."), this.options.imageDesktopUrl3);
					}
				} 
				else {
					var highres1 = this.options.imageBigDesktopUrl1,
						highres2 = this.options.imageBigDesktopUrl2,
						highres3 = this.options.imageBigDesktopUrl3;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-1').css("background-image", "url('"+highres1+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-1'), this.options.imageBigDesktopUrl1.replace(".", "@2x."), this.options.imageBigDesktopUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-2').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-2'), this.options.imageBigDesktopUrl2.replace(".", "@2x."), this.options.imageBigDesktopUrl2);
					}
					if(highres3.indexOf('@2x')>=0) {
						this.$element.find('.threecolumn-3').css("background-image", "url('"+highres3+"')");
					} else {
						this.setValidImg(this.$element.find('.threecolumn-3'), this.options.imageBigDesktopUrl3.replace(".", "@2x."), this.options.imageBigDesktopUrl3);
					}
				}
			} else {
				if (screenWidth < tabletBreakpoint) {			
					this.$element.find('.threecolumn-1').css("background-image", "url('"+ this.options.imageMobileUrl1+"')");
					this.$element.find('.threecolumn-2').css("background-image", "url('"+ this.options.imageMobileUrl2+"')");
					this.$element.find('.threecolumn-3').css("background-image", "url('"+ this.options.imageMobileUrl3+"')");
				} else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
					this.$element.find('.threecolumn-1').css("background-image", "url('"+ this.options.imageTabletUrl1+"')");
					this.$element.find('.threecolumn-2').css("background-image", "url('"+ this.options.imageTabletUrl2+"')");
					this.$element.find('.threecolumn-3').css("background-image", "url('"+ this.options.imageTabletUrl3+"')");
				} else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint) {
					this.$element.find('.threecolumn-1').css("background-image", "url('"+ this.options.imageDesktopUrl1+"')");
					this.$element.find('.threecolumn-2').css("background-image", "url('"+ this.options.imageDesktopUrl2+"')");
					this.$element.find('.threecolumn-3').css("background-image", "url('"+ this.options.imageDesktopUrl3+"')");
				} else {
					this.$element.find('.threecolumn-1').css("background-image", "url('"+ this.options.imageBigDesktopUrl1+"')");
					this.$element.find('.threecolumn-2').css("background-image", "url('"+ this.options.imageBigDesktopUrl2+"')");
					this.$element.find('.threecolumn-3').css("background-image", "url('"+ this.options.imageBigDesktopUrl3+"')");
				}
			}
		
		
		} else if(this.options.columnsNumber == 2) {
			if (pixelSize > 1) {
				if (screenWidth < tabletBreakpoint) {
					var highres1 = this.options.imageMobileUrl1,
						highres2 = this.options.imageMobileUrl2;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
					} else{
						this.setValidImg(this.$element.find('.left-column'), this.options.imageMobileUrl1.replace(".", "@2x."), this.options.imageMobileUrl1);						
					}				
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.right-column'), this.options.imageMobileUrl2.replace(".", "@2x."), this.options.imageMobileUrl2);
					}
				} 
				else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
					var highres1 = this.options.imageTabletUrl1,
						highres2 = this.options.imageTabletUrl2;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
					} else {
						this.setValidImg(this.$element.find('.left-column'), this.options.imageTabletUrl1.replace(".", "@2x."), this.options.imageTabletUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.right-column'), this.options.imageTabletUrl2.replace(".", "@2x."), this.options.imageTabletUrl2);
					}
				} 
				else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint){
					var highres1 = this.options.imageDesktopUrl1,
						highres2 = this.options.imageDesktopUrl2;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
					} else {
						this.setValidImg(this.$element.find('.left-column'), this.options.imageDesktopUrl1.replace(".", "@2x."), this.options.imageDesktopUrl1);	
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.right-column'), this.options.imageDesktopUrl2.replace(".", "@2x."), this.options.imageDesktopUrl2);
					}
				} 
				else {
					var highres1 = this.options.imageBigDesktopUrl1,
						highres2 = this.options.imageBigDesktopUrl2;
					if(highres1.indexOf('@2x')>=0) {
						this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
					} else {
						this.setValidImg(this.$element.find('.left-column'), this.options.imageBigDesktopUrl1.replace(".", "@2x."), this.options.imageBigDesktopUrl1);
					}
					if(highres2.indexOf('@2x')>=0) {
						this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					} else {
						this.setValidImg(this.$element.find('.right-column'), this.options.imageBigDesktopUrl2.replace(".", "@2x."), this.options.imageBigDesktopUrl2);
					}
				}   
		  } else {			
				if (screenWidth < tabletBreakpoint) {			
					this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageMobileUrl1+"')");
					this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageMobileUrl2+"')");
				} else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
					this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageTabletUrl1+"')");
					this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageTabletUrl2+"')");
				} else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint) {
					this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageDesktopUrl1+"')");
					this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageDesktopUrl2+"')");
				} else {
					this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl1+"')");
					this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl2+"')");
				}
		  }	
		} else {
			return;
		}
	}
	
	//Checks the image is available for public, if not fall back to published image
	  Plugin.prototype.setValidImg= function(imgelement, targetsrc, regimg) {
		  $.get(targetsrc) 
			.done(function() {
				imgelement.css("background-image", "url('"+ targetsrc +"')");
				}).fail(function() {
					imgelement.css("background-image", "url('"+ regimg +"')");
				});
		}
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}
})(jQuery, window, document);

;
(function ($, window, document, undefined) {
	
	
 // Default options
    var pluginName = 'columnCarousel',
    screenWidth,
    pixelSize = window.devicePixelRatio,
    largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
    defaults = {};	

     var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), //$(window).width(),
		wi = window.innerWidth, //$(window).innerWidth(),
		st = $(window).scrollTop(),
		initWidth,
		allDraggables = [],
		draggableGridWidth,
		draggableGridHeight,
		draggablesEnabled = false,
		nvTileArrowsClickable,
		nvTileArrowsVisible = true,
		snapPoints = [],
		responsiveDraggableWidth,
		snapPointsTotalPages,
		snapGutter,
		snapIndex = 0,
		snapping = false,
		lockScroll = 0,
		clickFlag = false;

	var winWidth = Math.max(ww, wi),
		isResizing = false,
		isAutoScrolling = false,
		delayedVar1,
		delayedVar2;
	
	  function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };
	
	
	 Plugin.prototype.init = function() {
        this.carousel();
    };

	 Plugin.prototype.carousel= function(){

		$(function () {

		initDraggables();
		checkSize();
		$(window).resize(checkSize);
		enableClickablenvTileArrows();

	});


	function updateSnapPoints() {

		snapGutter = (winWidth < 1024) ? 10 : 30;

		//draggableGridWidth = 300 + snapGutter;

		if (winWidth < 768) {
			//snapGutter = 10;
			draggableGridWidth = 305; // - snapGutter;
		} else {
			//snapGutter = 30;
			draggableGridWidth = 325; // - snapGutter;
		}

		//draggableGridWidth = 300;

		draggableGridHeight = 252;

		for (var i = 0; i < 4; i++) {
			snapPoints[i] = -((draggableGridWidth) * i); //- (i * snapGutter)
		}

	}

	function updateSnapPointTotalPages(_target) {
 
		responsiveDraggableWidth = document.getElementById(_target).offsetWidth;

		snapPointsTotalPages = Math.min(Math.ceil(responsiveDraggableWidth / winWidth), 3);

		if (winWidth >= 1024) {
			snapPointsTotalPages = 1;
		};

	}

	function initDraggables() {

		updateSnapPoints();

		updateSnapPointTotalPages('draggable1');

		allDraggables = Draggable.create(".draggable", {
			type: "x",
			edgeResistance: 0.98,
			bounds: "",
			lockAxis: false,
			maxDuration: 1,
            dragClickables:true,
  			allowEventDefault: true,
			throwProps: true,
			snapIndex: 0,
			liveSnap: false,
			zIndexBoost: true,
			snap: {

				left: function (endValue) {

					if (!snapping) {

						snapping = true;

						// snapGutter = (ww < 768) ? 10 : 30;

						var lastEndValue = snapPoints[snapIndex];

						if (lastEndValue == undefined) {
							lastEndValue = 0;
						}

						//if (snapIndex == -1) snapIndex = 3;

						if (endValue < 0 && snapIndex >= 3) {
							// furthest right, going right, will become 0 next...
							snapIndex = snapPointsTotalPages;

						} else if (endValue > 0 && snapIndex == 0) {
							// furthest left and going left, stay at zero...
							snapIndex = 0;
						}

						if (endValue < lastEndValue && snapIndex < snapPointsTotalPages) {
							snapIndex++;
						} else if (endValue > lastEndValue && snapIndex > 0) {
							snapIndex--;
						}

					}

					//return snapPoints[snapIndex];

					return parseInt(Math.round(endValue / draggableGridWidth) * draggableGridWidth);
				}
			},
			onDragStart: function () {

				snapping = false;

			},

			onDragEnd: function () {

				//snapGutter = (ww < 768) ? 10 : 30;

				snapping = false;

				//$('body').removeClass('noscroll');

				if (snapPoints.indexOf(this.endX) != -1) {
					snapIndex = snapPoints.indexOf(this.endX);
				}
				//if (snapIndex == -1) snapIndex = 3; //Math.min( Math.abs(Math.round(this.endX)), snapPoints.indexOf(snapPoints[snapPoints.length-1] ); //for dynamic number of items, use snapPoints.indexOf(snapPoints[snapPoints.length-1]) instead of 3
				
				var _target = this.target.id;
				Draggable.get("#" + _target).vars.snapIndex = snapIndex;
				updateClickableArrowStates(_target, snapIndex);

			}
		});



		var i = allDraggables.length;
		while (i--) {
			Draggable.get('#draggable' + (i + 1)).vars.id = (i + 1);

		}

	}

	function disableDraggables() {

		if (!draggablesEnabled) return;

		hidenvTileArrows();

		snapIndex = 0; // TEMP REMOVAL
		draggableGridWidth = 325;

		//updateSnapPoints();

		var i = allDraggables.length;

		while (i--) {

			Draggable.get('#draggable' + (i + 1)).disable();
			if ($('#draggable' + (i + 1)).hasClass('draggable')) {
				$('#draggable' + (i + 1)).removeClass('draggable');
				$('#draggable' + (i + 1)).addClass('not-draggable');
				updateClickableArrowStates('draggable' + (i + 1), 0); // TEMP REMOVAL
			}


		}

		TweenMax.set('.draggable', {
			left: 10,
			transform: 'translate3d(0px, 0px, 0px)'
		}); // TEMP REMOVAL


		draggablesEnabled = false;
	}

	function enableDraggables() {

		if (draggablesEnabled) return;

		snapIndex = 0; // TEMP REMOVAL

		shownvTileArrows();

		updateSnapPointTotalPages('draggable1');

		if (winWidth < 767) {
			draggableGridWidth = 305;
		} else {
			draggableGridWidth = 325;
		}

		var i = allDraggables.length;

		while (i--) {

			allDraggables[i].enable();


			if ($('#draggable' + (i + 1)).hasClass('not-draggable')) {
				$('#draggable' + (i + 1)).removeClass('not-draggable');
				$('#draggable' + (i + 1)).addClass('draggable');
				Draggable.get('#draggable' + (i + 1)).vars.snapIndex = 0; // TEMP REMOVAL
				if (nvTileArrowsClickable) {
					updateClickableArrowStates('draggable' + (i + 1), 0);
				} // TEMP REMOVAL
			}


		}

		TweenMax.set('.draggable', {
			left: 0,
			transform: 'translate3d(0px, 0px, 0px)'

		}); // TEMP REMOVAL

		draggablesEnabled = true;

	}

	function updateDraggableDimensions() {

		updateSnapPointTotalPages('draggable1');

		if (winWidth < 767) {
			draggableGridWidth = 305;
		} else {
			draggableGridWidth = 325;
		}

		var i = allDraggables.length;

		while (i--) {

			allDraggables[i].enable();


			if ($('#draggable' + (i + 1)).hasClass('not-draggable')) {
				$('#draggable' + (i + 1)).removeClass('not-draggable');
				$('#draggable' + (i + 1)).addClass('draggable');

				// reset every snapIndex to zero...
				Draggable.get('#draggable' + (i + 1)).vars.snapIndex = 0; // TEMP REMOVAL
				if (nvTileArrowsClickable) {
					updateClickableArrowStates('draggable' + (i + 1), 0);
				} // TEMP REMOVAL
			}
		}

		TweenMax.set('.draggable', {
			left: 0,
			transform: 'translate3d(0px, 0px, 0px)'
		}); // TEMP REMOVAL

	}



	function enableClickablenvTileArrows() {

		if (nvTileArrowsClickable) {

			// only enable clickable nvTiles once, then return fast...
			return;

		} else {
			clickFlag = false;
			$(".sfg-btn-prev").bind('mousedown touchstart', function () {
				if (!clickFlag) {
					clickFlag = true;
					setTimeout(function () {
						clickFlag = false;
					}, 100);
					var targetId = $(this).attr('data-control');
					var targetCurrentSnapIndex = Draggable.get("#" + targetId).vars.snapIndex;
					snapIndex = targetCurrentSnapIndex;

					snapIndex--;
					updateSnapPoints();

					if (snapIndex <= 0) {
						snapIndex = 0;
						Draggable.get("#" + targetId).vars.snapIndex = snapIndex;

					} else {
						Draggable.get("#" + targetId).vars.snapIndex = snapIndex;
					}

					updateClickableArrowStates(targetId, snapIndex);
				}
				return false;
			});

			$(".sfg-btn-next").bind('mousedown touchstart', function () {
				if (!clickFlag) {
					clickFlag = true;
					setTimeout(function () {
						clickFlag = false;
					}, 100);
					var targetId = $(this).attr('data-control');
					var targetCurrentSnapIndex = Draggable.get("#" + targetId).vars.snapIndex;
					snapIndex = targetCurrentSnapIndex;

					snapIndex++;
					updateSnapPoints();

					if (snapIndex < snapPointsTotalPages) {
						Draggable.get("#" + targetId).vars.snapIndex = snapIndex;

					} else {

						snapIndex = snapPointsTotalPages; //3;
						Draggable.get("#" + targetId).vars.snapIndex = snapIndex; // 0;

					}

					updateClickableArrowStates(targetId, snapIndex);
				}
				return false;
			});

		}

		/*TweenMax.to($(".sfg-btn-prev"), 0, {autoAlpha: 0});*/

		nvTileArrowsClickable = true;

	}

	function hidenvTileArrows() {
		TweenMax.set('.sfg-btn-prev', {
			display: 'none'
		});
		TweenMax.set('.sfg-btn-next', {
			display: 'none'
		});
		nvTileArrowsVisible = false;
	}

	function shownvTileArrows() {
		TweenMax.set('.sfg-btn-prev', {
			display: 'block'
		});
		TweenMax.set('.sfg-btn-next', {
			display: 'block'
		});
		nvTileArrowsVisible = true;
	}

	function updateClickableArrowStates(_target, _snapIndex) {


		var targetArrowPrev = ".sfg-btn-prev[data-control=" + _target + "]";
		var targetArrowNext = ".sfg-btn-next[data-control=" + _target + "]";
		var targetCurrentSnapIndex = Draggable.get("#" + _target).vars.snapIndex;

		updateSnapPoints();

		var snapEdge = (winWidth < 768) ? (snapGutter * 3) : (winWidth > 1023) ? snapGutter * 2 : (snapGutter * 6);


		var targetTiming = (draggablesEnabled) ? 0.5 : 0;

		//updateSnapPoints();


		if (_snapIndex >= snapPointsTotalPages) {


			snapIndex = Math.min(_snapIndex, 3);

			//snapIndex = Math.min(_snapIndex, snapPointsTotalPages);

			//if (snapIndex < 3) {
			// If newX is less than lowest available snapPoint, snap to document edge...
			//var newX = snapPoints[snapIndex];
			//TweenMax.to($( "#" + _target ), 0.5, {x: newX, ease: Cubic.easeOut});
			//console.log("Condition1: newX is less than lowest available snapPoint, snap to document edge... newX: " + newX);
			//} else {
			// Otherwise, newX should snap to the last available snapPoint...

			var newEdgeX = ww - document.getElementById(_target).offsetWidth + snapEdge; ///*snapGutter + */ (ww - document.getElementById(_target).offsetWidth) + 30; /*- snapGutter;*/
			TweenMax.to($("#" + _target), targetTiming, {
				x: newEdgeX,
				ease: Cubic.easeOut
			});


		} else {

			var newSnapX = snapPoints[snapIndex]; //(snapIndex > 0) ? (snapGutter + snapPoints[snapIndex]) : snapPoints[snapIndex];
			TweenMax.to($("#" + _target), targetTiming, {
				x: newSnapX,
				ease: Cubic.easeOut
			});
			//console.log("Snap to newSnapX: " + newSnapX, "snapIndex: " + snapIndex, "snapPoints: " + snapPoints);

		}

		if (_snapIndex <= 0) {
			//console.log('ARROWED TO LEFT EDGE!  _snapIndex: ', _snapIndex, ' / ', snapPointsTotalPages);
			TweenMax.to($(targetArrowPrev), .2, {
				opacity: 0
			});
			TweenMax.to($(targetArrowNext), .2, {
				opacity: 0.8
			});

		} else if (_snapIndex >= snapPointsTotalPages) {
			//console.log('ARROWED TO RIGHT EDGE!  _snapIndex: ' + _snapIndex, ' / ', snapPointsTotalPages);
			TweenMax.to($(targetArrowPrev), .2, {
				opacity: 0.8
			});

			TweenMax.to($(targetArrowNext), .2, {
				opacity: 0
			});
		} else {
			//console.log('ARROWED TO SNAP INDEX: ', _snapIndex, ' / ', snapPointsTotalPages);
			TweenMax.to($(targetArrowPrev), .2, {
				opacity: 0.8
			});
			TweenMax.to($(targetArrowNext), .2, {
				opacity: 0.8
			});
		}
	}



	// Delayed Vars...
	function startDelayedVar(_n) {
		//console.log('startDelayedVar: ' + _n);
		if (_n == 1) {
			delayedVar1 = setTimeout(function () {
				isResizing = false;
			}, 100);
		} else {
			//delayedVar2 = setTimeout(function() { isScrolling = false; }, 500);
		}
	}

	function stopDelayedVar(_n) {
		//console.log('stopDelayedVar: ' + _n);
		if (_n == 1) {
			clearTimeout(delayedVar1);
		} else {
			clearTimeout(delayedVar2);
		}
	}

	function checkSize() {

		isResizing = true;

		ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		winWidth = Math.max($(window).width(), $(window).innerWidth());


		if (winWidth < 1024) {

			enableDraggables();

		} 
		else {

			// If DESKTOP or ULTRA-WIDE...

			if (winWidth > 1290) {

				disableDraggables();
			} else {
				enableDraggables();
			}
		}

		if (initWidth != ww) {

			updateDraggableDimensions();
 
			initWidth = ww;

		}

		if (winWidth > 1290) {
			disableDraggables();
		}

		stopDelayedVar(1);
		startDelayedVar(1);

		setTimeout(function () {
			isResizing = false;
		}, 500);

		}
		};
	
	
	// A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                        new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
// JavaScript Document
;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'columnlayoutenhanced',
	screenWidth,
	pixelSize = window.devicePixelRatio,
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {
			imagessetColHeight:true
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		this.registerCallbacks();
		this.setBgImage();
		this.resetColClasses();
		/*if(this.$element.hasClass("equial-h-col"))
		this.setColHeight();*/
		//this.setWidthFitContent();
	};

	Plugin.prototype.registerCallbacks= function(){
		var throttledSetBgImage = _.throttle(Plugin.prototype.setBgImage, 500);
		$(window).resize($.proxy(throttledSetBgImage, this));
	}

	Plugin.prototype.setBgImage= function(){
		

		// As of now, we only handle the case of two columns for background images
		if (this.options.columnsNumber != 2){
			return;
		}
		// We load the mobile background image for devices with a viewport of 767px or less
		// We load the tablet background image for devices with a viewport betweek 768px and 1024px
		// We load the desktop background image for devices with a viewport between 1025px or 1280px
		// We load the large desktop background image for devices with a viewport of 1281px or more
		screenWidth = $(document).width();
		/* TODO: fix this once retina display issue is fixed.*/
		if (pixelSize > 5) {
			if (screenWidth < tabletBreakpoint) {
				var highres1 = this.options.imageMobileUrl1,
				highres2 = this.options.imageMobileUrl2;
				if(highres1.indexOf('@2x')>=0){
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageMobileUrl1.replace(".", "@2x."), this.options.imageMobileUrl1);
				}				
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					//this.$element.find('.right-column').css("margin-top", "0px");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageMobileUrl2.replace(".", "@2x."), this.options.imageMobileUrl2);
					//this.$element.find('.right-column').css("margin-top", "0px");
				}
			} 
			else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
				var highres1 = this.options.imageTabletUrl1,
				highres2 = this.options.imageTabletUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageTabletUrl1.replace(".", "@2x."), this.options.imageTabletUrl1);					
				}
				if(highres2.indexOf('@2x')>=0){
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageTabletUrl2.replace(".", "@2x."), this.options.imageTabletUrl2);
				}
			} 
			else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint){
				var highres1 = this.options.imageDesktopUrl1,
				highres2 = this.options.imageDesktopUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageDesktopUrl1.replace(".", "@2x."), this.options.imageDesktopUrl1);					
				}
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageDesktopUrl2.replace(".", "@2x."), this.options.imageDesktopUrl2);
				}
			} 
			else {
				var highres1 = this.options.imageBigDesktopUrl1,
				highres2 = this.options.imageBigDesktopUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageBigDesktopUrl1.replace(".", "@2x."), this.options.imageBigDesktopUrl1);
				}
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageBigDesktopUrl2.replace(".", "@2x."), this.options.imageBigDesktopUrl2);					
				}
			}   
		} else {		
			if (screenWidth < tabletBreakpoint && (this.options.imageMobileUrl1!=="" || this.options.imageMobileUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageMobileUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageMobileUrl2+"')");
				//this.$element.find('.right-column').css("margin-top", "0px");
			} else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint && (this.options.imageTabletUrl1!=="" || this.options.imageTabletUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageTabletUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageTabletUrl2+"')");
			} else if ( screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint && (this.options.imageDesktopUrl1!=="" || this.options.imageDesktopUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageDesktopUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageDesktopUrl2+"')");
			} else if(this.options.imageBigDesktopUrl1!=="" || this.options.imageBigDesktopUrl2!=""){
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl2+"')");
			}
		}
	}

	//Checks the image is available for public, if not fall back to published image
	Plugin.prototype.setValidImg= function(imgelement, targetsrc, regimg) {
		$.get(targetsrc) 
		.done(function() {
			imgelement.css("background-image", "url('"+ targetsrc +"')");
		}).fail(function() {
			imgelement.css("background-image", "url('"+ regimg +"')");
		});
	}
	
	/*Plugin.prototype.setWidthFitContent= function() {
		var imgsvgtag = this.$element.find('.imgwidth>.responsive-image');
		
        $.each(imgsvgtag, function(index, value) {
        	
            var imgsrcval = $(value).attr('data-src-desktop');
            var svgstring = '.svg';
            
            if(imgsrcval.indexOf(svgstring) !=-1){				
                $(value).addClass("widthfitcontent");
        	}
		});
	}*/
	
	//removing card css if no content in column
	Plugin.prototype.resetColClasses= function() {
/*hidding unused cols*/
		
		if(this.$element.find('>.column >.equi-height-col').length) {
			this.$element.find('>.column').each(function() {
				if(!$(this).find('>div >.parsys').children().length){
					$(this).addClass("ht-0");
					
				}
			});
		}
    }

	//checks the height of section which is inside column and makes highest height to all sections
	//var imagessetColHeight = true;
	Plugin.prototype.setColHeight= function() {
		var _self=this;
		var count=0;
		screenWidth = $(document).width();
		var setEquiHeight=false;
		var colsize=this.$element.find('>.column').length;
		var twobytowinMobile=this.$element.find('>.column').hasClass("small-6") && this.$element.find('>.column').hasClass("large-3");
		if(screenWidth >= desktopBreakpoint || this.options.mobNoResponsive || (screenWidth >= tabletBreakpoint && colsize==2 && !this.options.tabSingleCol) || (screenWidth >= tabletBreakpoint && colsize==4) || (screenWidth >= tabletBreakpoint && colsize>2 && this.options.tabNoResponsive) ||(screenWidth < tabletBreakpoint && colsize==4 && twobytowinMobile)){
			setEquiHeight=true; 
		}
		if (setEquiHeight) {
			var columnHeightArr = [];
			var sectionHeightArr = [];
			var txtHeightArr = [];
			var CardHeightArr = [];
			this.$element.find('>.column').each(function() {
				var sectionHeight =0;
				var txtHeight =0;
				var cardHeight=0;
				if($(this).find('.sectionWrapper').length==1){
					sectionHeight = $(this).find('.sectionWrapper').find('.general-container').height();
				}else if($(this).find('.textcomp').length==1){
					//TODO: rethink this
					//txtHeight = $(this).find('.textcomp').find('.general-container-text').height();
				}
				sectionHeightArr[count]=sectionHeight;
				//TODO: rethink this
				//txtHeightArr[count]=txtHeight;

				if($(this).find('>.equi-height-col').length){
					cardHeight = $(this).find('>.equi-height-col').height();
				}
				CardHeightArr[count]=cardHeight;

				var columnHeight = $(this).height();
				columnHeightArr[count]= columnHeight;
				count++;		    			
				
			});
			if( this.$element.parent().hasClass("full-width")){
				columnHeightArr[count]= "360";
			}
			var maxSectionHeight=Math.max.apply(null, sectionHeightArr);
			var maxheight=Math.max.apply(null, columnHeightArr);
			var maxColCardHeight=Math.max.apply(null, CardHeightArr);
			//TODO: rethink this
			//var maxColTextHeight=Math.max.apply(null, txtHeightArr);
			
			
			if((NVIDIAGDC.Browser.getViewport() == "tablet" && this.options.columnsNumber == '4' && !this.options.tabNoResponsive)||(NVIDIAGDC.Browser.getViewport() == "mobile" && this.options.columnsNumber == '4' && !this.options.mobNoResponsive)) {	
				var columnsArray = this.$element.find('>.column' );
				$(columnsArray).addClass('tablet-clear');	
				var colCardArray=$(columnsArray).find('>.equi-height-col');
				var sectionArray=$(columnsArray).find('.sectionWrapper').find(".general-container");
				var textArray=$(columnsArray).find('.textcomp');
				for (i = 0; i < 4; i++) {
					if(i<2){							
						var firstRowColumns=Math.max.apply(Math,columnHeightArr.slice(0, 2));							
						$(columnsArray[i]).css('min-height',firstRowColumns);
                        // $(columnsArray[i]).css({'min-height': firstRowColumns,'border-color':  'red' });
						if(colCardArray.length){
							var firstRowCardCols=Math.max.apply(Math,CardHeightArr.slice(0, 2));								
							$(colCardArray[i]).css('min-height',firstRowCardCols);
                            // $(columnsArray[i]).css({'min-height': firstRowCardCols,'border-color':  'red' });
						}
						if(sectionArray.length){
							var firstRowSectionHeight=Math.max.apply(Math,sectionHeightArr.slice(0, 2));							
							$(sectionArray[i]).css('min-height',firstRowSectionHeight);
						}else if(textArray.length){
							//TODO: rethink this
							//var firstRowtextHeight=Math.max.apply(Math,txtHeightArr.slice(0, 2));							
							//$(textArray[i]).css('min-height',firstRowtextHeight);
						}
					}else {	
						var secondRowColumns=Math.max.apply(Math,columnHeightArr.slice(2, 4));							
						$(columnsArray[i]).css('min-height',secondRowColumns);
                       // $(columnsArray[i]).css({'min-height': secondRowColumns,'border-color':  'red' });	
						if(colCardArray.length){
							var secondRowCardCols=Math.max.apply(Math,CardHeightArr.slice(2, 4));							
							$(colCardArray[i]).css('min-height',secondRowCardCols);
						}
						if(sectionArray.length){
							var secondRowSectionHeight=Math.max.apply(Math,sectionHeightArr.slice(2, 4));							
							$(sectionArray[i]).css('min-height',secondRowSectionHeight);
						}else if(textArray.length){
							//TODO: rethink this
							//var secondRowtextHeight=Math.max.apply(Math,txtHeightArr.slice(0, 2));							
							//$(textArray[i]).css('min-height',secondRowtextHeight);
						}
					}						
				}
			}else {
				this.$element.find('>.column').css('min-height',maxheight);
                // this.$element.find('>.column').css({'min-height': maxheight,'border-color':  this.options.vdividercustcolor });
				if(this.$element.find('>.column').find('.sectionWrapper').length==colsize){
					this.$element.find('>.column').find('.sectionWrapper').find('.general-container').css('min-height',maxSectionHeight);
				}else if(this.$element.find('>.column').find('.textcomp').length==colsize){
					//TODO: rethink this
					//this.$element.find('>.column').find('.textcomp').find('.general-container-text').css('min-height',maxColTextHeight);
				}
				if(this.$element.find('>.column >.equi-height-col').length){
					this.$element.find('>.column >.equi-height-col').css('min-height',maxColCardHeight);
				}
			}
			
			
			
			/*if(colHeight!=0) {
				if(this.$element.find('.column').find('.sectionWrapper').length){
					this.$element.find('.column').find('.sectionWrapper').find('.general-container').css('min-height',colHeight);
				}else{

					this.$element.find('.column').find('.card').css('min-height',colHeight);
				}
			} else if(maxheight>50){
				this.$element.find('.column').css('min-height',maxheight);
			}else {
				setTimeout(function(){
					_self.setColHeight();
				},1200);
			}*/
			/* Setting the below variable to false to stop infinite recursive function */
			if(this.options.imagessetColHeight){
				 /*if(this.$element.find('>.column').find('.image-container').length || this.$element.find('>.column').find('.button').length){
					setTimeout(function(){
						_self.setColHeight();
					},1200);
					this.options.imagessetColHeight = false;					
				}*/
			}
		}

					
	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}
})(jQuery, window, document);

;
(function($, window, document, undefined) {

	// Default options
	var pluginName = 'columnLayout',
	screenWidth,
	pixelSize = window.devicePixelRatio,
	largeDesktopBreakpoint = NVIDIAGDC.largeDesktopBreakpoint,
	desktopBreakpoint = NVIDIAGDC.desktopBreakpoint,
	tabletBreakpoint = NVIDIAGDC.tabletBreakpoint, 
	defaults = {
			imagessetColHeight:true,
			hasSVGs:false
	};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		this.registerCallbacks();
		this.setBgImage();
		this.resetColClasses();
		this.checkForSVGs();
		if(this.options.hasSVGs)
			this.$element.addClass("d-block");
		if(this.$element.hasClass("equial-h-col"))
			this.setColHeight();
		
	};

	Plugin.prototype.registerCallbacks= function(){
		var throttledSetBgImage = _.throttle(Plugin.prototype.setBgImage, 500);
		$(window).resize($.proxy(throttledSetBgImage, this));
	}

	Plugin.prototype.setBgImage= function(){
		

		// As of now, we only handle the case of two columns for background images
		if (this.options.columnsNumber != 2){
			return;
		}
		// We load the mobile background image for devices with a viewport of 767px or less
		// We load the tablet background image for devices with a viewport betweek 768px and 1024px
		// We load the desktop background image for devices with a viewport between 1025px or 1280px
		// We load the large desktop background image for devices with a viewport of 1281px or more
		screenWidth = $(document).width();
		/* TODO: fix this once retina display issue is fixed.*/
		if (pixelSize > 5) {
			if (screenWidth < tabletBreakpoint) {
				var highres1 = this.options.imageMobileUrl1,
				highres2 = this.options.imageMobileUrl2;
				if(highres1.indexOf('@2x')>=0){
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageMobileUrl1.replace(".", "@2x."), this.options.imageMobileUrl1);
				}				
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
					//this.$element.find('.right-column').css("margin-top", "0px");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageMobileUrl2.replace(".", "@2x."), this.options.imageMobileUrl2);
					//this.$element.find('.right-column').css("margin-top", "0px");
				}
			} 
			else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint) {
				var highres1 = this.options.imageTabletUrl1,
				highres2 = this.options.imageTabletUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageTabletUrl1.replace(".", "@2x."), this.options.imageTabletUrl1);					
				}
				if(highres2.indexOf('@2x')>=0){
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageTabletUrl2.replace(".", "@2x."), this.options.imageTabletUrl2);
				}
			} 
			else if (screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint){
				var highres1 = this.options.imageDesktopUrl1,
				highres2 = this.options.imageDesktopUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageDesktopUrl1.replace(".", "@2x."), this.options.imageDesktopUrl1);					
				}
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageDesktopUrl2.replace(".", "@2x."), this.options.imageDesktopUrl2);
				}
			} 
			else {
				var highres1 = this.options.imageBigDesktopUrl1,
				highres2 = this.options.imageBigDesktopUrl2;
				if(highres1.indexOf('@2x')>=0) {
					this.$element.find('.left-column').css("background-image", "url('"+highres1+"')");
				} else {
					this.setValidImg(this.$element.find('.left-column'), this.options.imageBigDesktopUrl1.replace(".", "@2x."), this.options.imageBigDesktopUrl1);
				}
				if(highres2.indexOf('@2x')>=0) {
					this.$element.find('.right-column').css("background-image", "url('"+highres2+"')");
				} else {
					this.setValidImg(this.$element.find('.right-column'), this.options.imageBigDesktopUrl2.replace(".", "@2x."), this.options.imageBigDesktopUrl2);					
				}
			}   
		} else {		
			if (screenWidth < tabletBreakpoint && (this.options.imageMobileUrl1!=="" || this.options.imageMobileUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageMobileUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageMobileUrl2+"')");
				//this.$element.find('.right-column').css("margin-top", "0px");
			} else if (screenWidth >= tabletBreakpoint && screenWidth < desktopBreakpoint && (this.options.imageTabletUrl1!=="" || this.options.imageTabletUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageTabletUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageTabletUrl2+"')");
			} else if ( screenWidth >= desktopBreakpoint && screenWidth < largeDesktopBreakpoint && (this.options.imageDesktopUrl1!=="" || this.options.imageDesktopUrl2!="")) {
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageDesktopUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageDesktopUrl2+"')");
			} else if(this.options.imageBigDesktopUrl1!=="" || this.options.imageBigDesktopUrl2!=""){
				this.$element.find('.left-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl1+"')");
				this.$element.find('.right-column').css("background-image", "url('"+ this.options.imageBigDesktopUrl2+"')");
			}
		}
	}

	//Checks the image is available for public, if not fall back to published image
	Plugin.prototype.setValidImg= function(imgelement, targetsrc, regimg) {
		$.get(targetsrc) 
		.done(function() {
			imgelement.css("background-image", "url('"+ targetsrc +"')");
		}).fail(function() {
			imgelement.css("background-image", "url('"+ regimg +"')");
		});
	}
	
	Plugin.prototype.checkForSVGs= function() {
		var self=this;
		var imgsvgtag = this.$element.find('.responsive-image');
        $.each(imgsvgtag, function(index, value) {
            var imgsrcval = $(value).attr('data-src-desktop');
            var svgstring = '.svg';
            if(imgsrcval.indexOf(svgstring) !=-1) {	
            	/*Has SVGs so needs to be handled */
            	self.options.hasSVGs=true;
            	return false;
        	}
		});
        
	} 
	
	//removing card css if no content in column
	Plugin.prototype.resetColClasses= function() {
		
		/*hidding unused cols*/
		
		if(this.$element.find('>.column >.equi-height-col').length) {
			this.$element.find('>.column').each(function() {
				if(!$(this).find('>div >.parsys').children().length){
					$(this).addClass("ht-0");
					
				}
			});
		}
    }

	//checks the height of section which is inside column and makes highest height to all sections
	//var imagessetColHeight = true;
	Plugin.prototype.setColHeight= function() {
		var _self=this;
		var count=0;
		screenWidth = $(document).width();
		var setEquiHeight=false;
		var colsize=this.$element.find('>.column').length;
		/*take care of legacy equal ht columns*/
		var legecyEqualHtSection=(this.$element.find('>.column >.background-none').length===colsize) && (this.$element.find('>.column >.background-none >div >.sectionWrapper').length===colsize);
		
		/*handle Legacy SVGS files to have equal heights when in combination with text */
		var enableSVGEquiHeight =this.options.hasSVGs && (this.$element.find('>.column >.equi-height-col >div >.textcomponentenhanced').length || this.$element.find('>.column >.equi-height-col >div >.textcomp').length);
		var twobytowinMobile=this.$element.find('>.column').hasClass("small-6") && this.$element.find('>.column').hasClass("large-3");
		if((enableSVGEquiHeight || legecyEqualHtSection) && (screenWidth >= desktopBreakpoint || this.options.mobNoResponsive || (screenWidth >= tabletBreakpoint && colsize==2 && !this.options.tabSingleCol) || (screenWidth >= tabletBreakpoint && colsize==4) || (screenWidth >= tabletBreakpoint && colsize>2 && this.options.tabNoResponsive) ||(screenWidth < tabletBreakpoint && colsize==4 && twobytowinMobile))){
			setEquiHeight=true; 
		}
		if (setEquiHeight) {

			var columnHeightArr = [];
			var sectionHeightArr = [];
			var txtHeightArr = [];
			var CardHeightArr = [];
			this.$element.find('>.column').each(function() {
				var sectionHeight =0;
				var txtHeight =0;
				var cardHeight=0;
				if($(this).find('.sectionWrapper').length==1){
					sectionHeight = $(this).find('.sectionWrapper').find('.general-container').height();
				}else if($(this).find('.textcomp').length==1){
					//TODO: rethink this
					//txtHeight = $(this).find('.textcomp').find('.general-container-text').height();
				}
				sectionHeightArr[count]=sectionHeight;
				//TODO: rethink this
				//txtHeightArr[count]=txtHeight;

				if($(this).find('>.equi-height-col').length){
					cardHeight = $(this).find('>.equi-height-col').height();
				}
				CardHeightArr[count]=cardHeight;

				var columnHeight = $(this).height();
				columnHeightArr[count]= columnHeight;
				count++;		    			
				
			});
			if( this.$element.parent().hasClass("full-width")){
				columnHeightArr[count]= "360";
			}
			var maxSectionHeight=Math.max.apply(null, sectionHeightArr);
			var maxheight=Math.max.apply(null, columnHeightArr);
			var maxColCardHeight=Math.max.apply(null, CardHeightArr);
			//TODO: rethink this
			//var maxColTextHeight=Math.max.apply(null, txtHeightArr);
			
			
			if((NVIDIAGDC.Browser.getViewport() == "tablet" && this.options.columnsNumber == '4' && !this.options.tabNoResponsive)||(NVIDIAGDC.Browser.getViewport() == "mobile" && this.options.columnsNumber == '4' && !this.options.mobNoResponsive)) {	
				var columnsArray = this.$element.find('>.column' );
				$(columnsArray).addClass('tablet-clear');	
				var colCardArray=$(columnsArray).find('>.equi-height-col');
				var sectionArray=$(columnsArray).find('.sectionWrapper').find(".general-container");
				var textArray=$(columnsArray).find('.textcomp');
				for (i = 0; i < 4; i++) {
					if(i<2){							
						var firstRowColumns=Math.max.apply(Math,columnHeightArr.slice(0, 2));							
						$(columnsArray[i]).css('min-height',firstRowColumns);
						if(colCardArray.length){
							var firstRowCardCols=Math.max.apply(Math,CardHeightArr.slice(0, 2));								
							$(colCardArray[i]).css('min-height',firstRowCardCols);
						}
						if(sectionArray.length){
							var firstRowSectionHeight=Math.max.apply(Math,sectionHeightArr.slice(0, 2));							
							$(sectionArray[i]).css('min-height',firstRowSectionHeight);
						}else if(textArray.length){
							//TODO: rethink this
							//var firstRowtextHeight=Math.max.apply(Math,txtHeightArr.slice(0, 2));							
							//$(textArray[i]).css('min-height',firstRowtextHeight);
						}
					}else {	
						var secondRowColumns=Math.max.apply(Math,columnHeightArr.slice(2, 4));							
						$(columnsArray[i]).css('min-height',secondRowColumns);
						if(colCardArray.length){
							var secondRowCardCols=Math.max.apply(Math,CardHeightArr.slice(2, 4));							
							$(colCardArray[i]).css('min-height',secondRowCardCols);
						}
						if(sectionArray.length){
							var secondRowSectionHeight=Math.max.apply(Math,sectionHeightArr.slice(2, 4));							
							$(sectionArray[i]).css('min-height',secondRowSectionHeight);
						}else if(textArray.length){
							//TODO: rethink this
							//var secondRowtextHeight=Math.max.apply(Math,txtHeightArr.slice(0, 2));							
							//$(textArray[i]).css('min-height',secondRowtextHeight);
						}
					}						
				}
			}else {
				this.$element.find('>.column').css('min-height',maxheight);
				if(this.$element.find('>.column').find('.sectionWrapper').length==colsize){
					this.$element.find('>.column').find('.sectionWrapper').find('.general-container').css('min-height',maxSectionHeight);
				}else if(this.$element.find('>.column').find('.textcomp').length==colsize){
					//TODO: rethink this
					//this.$element.find('>.column').find('.textcomp').find('.general-container-text').css('min-height',maxColTextHeight);
				}
				if(this.$element.find('>.column >.equi-height-col').length){
					this.$element.find('>.column >.equi-height-col').css('min-height',maxColCardHeight);
				}
			}
			
			
			
			/*if(colHeight!=0) {
				if(this.$element.find('.column').find('.sectionWrapper').length){
					this.$element.find('.column').find('.sectionWrapper').find('.general-container').css('min-height',colHeight);
				}else{

					this.$element.find('.column').find('.card').css('min-height',colHeight);
				}
			} else if(maxheight>50){
				this.$element.find('.column').css('min-height',maxheight);
			}else {
				setTimeout(function(){
					_self.setColHeight();
				},1200);
			}*/
			/* Setting the below variable to false to stop infinite recursive function */
			if(this.options.imagessetColHeight){
				if(this.$element.find('>.column').find('.image-container').length || this.$element.find('>.column').find('.button').length){
					if(enableSVGEquiHeight) {
						/*lazyload svgs and reset column height*/
						this.$element.find(".lazyload").each(function(){
		                    lazySizes.loader.unveil(this);
						});
					}
					setTimeout(function(){
						_self.setColHeight();
					},1000);
					this.options.imagessetColHeight = false;					
				}
			}
		
		}

					
	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
	}
})(jQuery, window, document);

;
(function($, window, document, undefined) {
	// Default options
	var pluginName = 'articlesGuidesFeed',
	defaults = {
		articleCount : 30,
        pageType : 'news'
	};
	
	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

	Plugin.prototype.init = function() {
        var _self = this;
        var nextdata = $('#next-button').attr('data-name');
        _self.initLoad(nextdata);
        $('#next-button').click(function(){
			_self.initLoad($(this).attr('data-name'));
		});
        $('#prev-button').click(function(){
			_self.initLoad($(this).attr('data-name'));
		});
	}

    Plugin.prototype.initLoad = function(dataname) {
    	var _self = this;
    	var articleSource = $('#articleTemplate').html();
		var articleTemplate = Handlebars.compile(articleSource);
        var offset;
        if (dataname == 'next') {
            if (parseInt($('#next-button').attr('data-offset')) > 0) {
                offset = '&offset='+ $('#next-button').attr('data-offset');
            } else {
                offset = '&offset=0';
            }
        }  else {
			if (parseInt($('#prev-button').attr('data-offset')) > 0) {
            	offset = '&offset='+ (parseInt($('#prev-button').attr('data-offset')) - parseInt(this.options.articleCount));
			}
        }
        
        Handlebars.registerHelper('link', function(tag) {
        	tag = Handlebars.Utils.escapeExpression(tag);
        	tag = tag.toLowerCase().replace(/[^A-Za-z0-9]/gi,'-');
        	return new Handlebars.SafeString(tag);
		});
        
		var rv = -1; 
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat( RegExp.$1 );
			}
        }

        if (rv > -1 && window.XDomainRequest) {
			//console.log('d');
            // Use Microsoft XDR
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
               
                xdr.open("get", "http:"+ _self.getArticleServiceURL() + offset);
                xdr.onprogress = function() {
                    //Progress
                };
                xdr.ontimeout = function() {
                    //Timeout
                };
                xdr.onerror = function() {
                    //Error Occured
                };
                xdr.onload = function() {
                    //arrayjson = jQuery.parseJSON(xdr.responseText);
                	var output = xdr.responseText;
					var renderedHtml = articleTemplate({
					articlesList: response
					});
					$('#articleFeed-container').html(renderedHtml);					
                }
                setTimeout(function() {
                    xdr.send();
                }, 0);
            }
        } else {
            $.ajax({
                type: 'GET',
                url: _self.getArticleServiceURL() + offset,
                async: false,
				articleCount: this.options.articleCount,
                success: function(response) {
                if (response[0].articlePagesList.length > 0) {
	                var renderedHtml = articleTemplate({
	                		articlesList: response
	                });
	                if(response[0].articleLocalizedTag != null){	
						$('#title-tag').find('#localized-tag').text(response[0].articleLocalizedTag);
                    }
					var totalPages = Math.ceil(parseInt(response[0].articlesCount) / parseInt(this.articleCount)); 
					$('.articlesCount').find('#totalCount').text(totalPages);
					var dataoffset = parseInt($('#next-button').attr('data-offset'));									
					if(dataname == 'next') {	
						if (response[0].articlePagesList.length < this.articleCount || response[0].articlesCount == dataoffset+parseInt(this.articleCount)) {					
							$('#articleFeed-container').html(renderedHtml);
							$('#next-button').addClass('disabled');
							$('#prev-button').attr('data-offset', dataoffset);
							dataoffset = dataoffset + parseInt(this.articleCount);
							$('#next-button').attr('data-offset', dataoffset);
							if($('#prev-button').attr('data-offset') == 0) {
	                        	$('#prev-button').addClass('disabled');
	                        }
							else {
								if($('#prev-button').hasClass('disabled')) {
									$('#prev-button').removeClass('disabled');
								}
							}
						} else {
							$('#articleFeed-container').html(renderedHtml);
							$('#prev-button').attr('data-offset', dataoffset);
	                        if($('#prev-button').attr('data-offset') == 0) {
	                        	$('#prev-button').addClass('disabled');
	                        }else {
	                        	if($('#prev-button').hasClass('disabled')){
	                        		$('#prev-button').removeClass('disabled');
	                        	}
							}
	                        dataoffset = dataoffset + parseInt(this.articleCount);
	                        $('#next-button').attr('data-offset', dataoffset);
						}
						var pageCount = dataoffset / parseInt(this.articleCount);						
						$('.articlesCount').find('#pageCount').text(pageCount);
					} else {
						dataoffset = parseInt($('#prev-button').attr('data-offset'));
						var pageCount = dataoffset / parseInt(this.articleCount);
						$('.articlesCount').find('#pageCount').text(pageCount);
						if (dataoffset == this.articleCount) {												
							$('#articleFeed-container').html(renderedHtml);
							$('#prev-button').addClass('disabled');
							if($('#next-button').hasClass('disabled')){
								$('#next-button').removeClass('disabled');
							}
							$('#next-button').attr('data-offset', this.articleCount);
						} else {
							$('#articleFeed-container').html(renderedHtml);
							$('#next-button').attr('data-offset', dataoffset);
							dataoffset = dataoffset - parseInt(this.articleCount);
							$('#prev-button').attr('data-offset', dataoffset);
							if($('#next-button').hasClass('disabled')){
								$('#next-button').removeClass('disabled');
							}						
						}
					}
					_self.backToTop();
                } else {
                	$('#next-button').addClass('disabled');
                    $('#prev-button').addClass('disabled');
                }
                } 
            });
        }
    }
    
    Plugin.prototype.getArticleServiceURL = function() {
    	var currentdomain=(window.location.hostname === "localhost")?window.location.hostname+":"+window.location.port:window.location.hostname;
    	var locales= "en-us";
    	var querystr = '';    	
     	if ($('html').attr('lang') == undefined || $('html').attr('lang') == '') {
     		locales = document.documentElement.lang; 
     	} else {
     		locales = $('html').attr('lang'); 
     	}     	
     	locales =locales.split("-");
    	var localeStr= locales[0] + "_" + locales[1].toUpperCase();
        if (getParameterByName('tag') != null) {
			querystr = '&tag='+getParameterByName('tag');           
        }
    	return articleserviceurl = "//"+currentdomain+"/bin/nvidiaGDC/servlet/article.json?locale="+localeStr+"&region="+locales[1].toLowerCase()+"&limit="+this.options.articleCount+"&type="+this.options.pageType+""+querystr;
   } 
   
    Plugin.prototype.backToTop = function() {
		if ($(window).scrollTop() == 0) {
			return;
		}
		$("html, body").animate({
			scrollTop : 0
		}, 500, "linear");
	}
   
    
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
        setTimeout(function(){
		return $(this).each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
			}
		});
       },800);            
	}
})(jQuery, window, document);
;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "nvFileUpload",
    defaults = {
        successRedirect: '',
        contentLengthMin: '',
        contentLengthMax: '',
		contentType: '',
		filename:'',
		btnlabel: 'Upload'
        
    };

    function Plugin (element, options) {
        
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
		this.progressbar();

    }
	
	Plugin.prototype.init = function() {
		var _self = this;		
		
		var acl,
			bucketPath,
			amzMetaUUID,
			amzServerSideEncryption,
			amzMetaTag,
			amzAlgorithm,
			amzCredential,
			amzDate,
			policy,
			signature,
			type,
			min,
			max,
			redirect,
			expires,
			headers,
			butonlabel = this.options.btnlabel;
		
		var params = '?redirect=' + this.options.successRedirect +
					 '&type=' + this.options.contentType +
					 '&min=' +this.options.contentLengthMin +
					 '&max=' +this.options.contentLengthMax
		
		$.ajax({
                type: 'GET',
                url: NVIDIAGDC.apps.endpoint + '/aem-forms-api/api/v1/aws/signature/v4'+params,
                async: false,
				headers: {
					'form-submit-token' : NVIDIAGDC.Browser.getUrlParameter('form-submit-token')
				},
				xhrFields: {
				withCredentials: true
				},
                success: function(response) {
					
					acl = response.acl;
					bucketPath = response.bucketPath;
					amzMetaUUID = response.amzMetaUUID;
					amzServerSideEncryption = response.amzServerSideEncryption;
					amzMetaTag = response.amzMetaTag;
					amzAlgorithm = response.amzAlgorithm;
					amzCredential = response.amzCredential;
					amzDate = response.amzDate;
					policy = response.policy;
					signature = response.signature;
					type = response.contentType;
					min = response.contentLengthMin;
					max = response.contentLengthMax;
					redirect = response.successActionRedirect;
					expires = response.amzExpires;
					headers = response.amzSignedHeaders;
				},
				error: function(error) {
					console.log(error);
				}
		}); 
		
		var template = document.getElementById('nv-file-upload').innerHTML;
	  	var rendered = Mustache.render(template, { 
			
			acl: acl,
			bucketPath: bucketPath,
			amzMetaUUID: amzMetaUUID,
			amzServerSideEncryption: amzServerSideEncryption,
			amzMetaTag: amzMetaTag,
			amzAlgorithm: amzAlgorithm,
			amzCredential: amzCredential,
			amzDate: amzDate,
			policy: policy,
			signature: signature,
			contentType: type,
			contentLengthMin: min,
			contentLengthMax: max,
			successActionRedirect: redirect,
			amzSignedHeaders: headers,
			amzExpires: expires,
			butonText : butonlabel
		});
  		document.getElementById('nvfileupload').innerHTML = rendered;
	}
	
	Plugin.prototype.progressbar = function() {
		var uploadForm = document.getElementById('nv-upload-form');
			/*uploadInputFile = document.getElementById('nv-upload-file'),
			progressBarFill = document.querySelector('#progressBar > .progress-bar-fill'),
			progressBarText = progressBarFill.querySelector('.progress-bar-text');
			*/
			
			var bar = $('.bar');
    			var percent = $('.percent');
			    var status = $('#status');
			//uploadForm.addEventListener('submit', uploadFile);
			
			
			console.log('progressbar function');

			$(uploadForm).submit(function(e) {
			    e.preventDefault(); // prevent actual form submit
			    var form = $(this);
			    var url = form.attr('action'); //get submit url [replace url here if desired]
                var form_data = new FormData(this);
				console.log('Submit function');
			    $.ajax({
			         type: "POST",
			         url: url,
			         data: form_data, // serializes form input
                     contentType: false,
                     datatype: 'json',
        			 processData:false,
			         success: function(data){
                        console.log(data);
			         },
					error : function(errorData) {
						console.log(errorData.status);
                        console.log(errorData.responseText);
                        console.log(errorData);

					}
			    });
			});

			
		/*	function uploadFile(e) {
				console.log('progress bar inside');
				
				
				
								
				e.preventDefault();
				
				uploadForm.
			    $('#nv-upload-form').ajaxForm({
			        beforeSend: function() {
			            status.empty();
			            var percentVal = '0%';
			            bar.width(percentVal);
			            percent.html(percentVal);
			        },
			        uploadProgress: function(event, position, total, percentComplete) {
			            var percentVal = percentComplete + '%';
			            bar.width(percentVal);
			            percent.html(percentVal);
			        },
			        complete: function(xhr) {
			            status.html(xhr.responseText);
			        }
			    });
			}*/
			
			
			/*function uploadFile(e) {
				e.preventDefault();
				
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'https://nvdmo-formsprocessor.s3.amazonaws.com/');
				xhr.upload.addEventListener("progress", e => {
					console.log(e);
					var percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
					progressBarFill.style.width = percent.toFixed(2) + '%';
					progressBarFill.textContent = percent.toFixed(2) + '%';
				});
				
				xhr.setRequestHeader('Content-Type', 'multipart/form-data');
				xhr.send(new FormData(uploadForm));
			}*/
		
	}

    $.fn[ pluginName ] = function( options ) {
	setTimeout(function () {
        return $(this).each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        });
	},0.5);
    };

})(jQuery, window, document);
/* Define NVIDIAGDC namespace if it doesn't already exist! */
var NVIDIAGDC = NVIDIAGDC || {}, isAdmin = false;


/**
 * @desc Creates the Profile object where profile information is stored
 *       and functions related to the User Profiles
 *
 *       Profile Properties Include:
 *
 *       - isLoggedIn
 *
 *       - online_id
 *       - avatar_url_large
 *       - psnbeta
 *       - avatar_url_medium
 *
 **/
;
(function ($, window, document, undefined) {

	NVIDIAGDC['Profile'] = NVIDIAGDC['Profile'] || {};
	/**
	 * @desc Checks to see if the User is Logged in and sets the isLoggedIn Profile Property
	 **/
	NVIDIAGDC.Profile.setLoggedIn = function () {
		var isLoggedIn = false;
		var noissesData = null;
		var userid = null;
		var useremail = null;
		var sessiontoken = null
		try {
			//noissesData = JSON.parse($.base64.decode(localStorage.getItem("nv.nvidmNoissesData")));
			//get from cookie
			noissesData = JSON.parse($.base64.decode(Cookies.get('nv.nvidmNoissesDataExtended')));
			var useremail = noissesData.email;
			var userid = noissesData.id;
			var session = noissesData.session;
			isLoggedIn = true;
		} catch (ex) {
			isLoggedIn = false;
		}
		NVIDIAGDC.addProperty('Profile', 'loggedIn', isLoggedIn);
		NVIDIAGDC.addProperty('Profile', 'userID', userid);
		NVIDIAGDC.addProperty('Profile', 'userEmail', useremail);
		NVIDIAGDC.addProperty('Profile', 'sessionToken', session);
	};

	NVIDIAGDC.Profile.setLoggedIn();

	/**
	 * @desc Returns the LoggedIn Profile Property
	 * @return boolean isLoggedIn
	 **/
	NVIDIAGDC.Profile.isLoggedIn = function () {
		var isLoggedIn = false;
		if (NVIDIAGDC.Profile.hasOwnProperty('loggedIn') && (Cookies.get("nv.nvidmNoissesDataExtended") || Cookies.get("nv.nvidmNoissesData"))) {
			isLoggedIn = NVIDIAGDC.Profile.loggedIn;
		}
		return isLoggedIn;
	};

	NVIDIAGDC.Profile.isAdmin = function () {
		isAdmin = false;
		if (NVIDIAGDC.Profile.isActiveSession()) {
			NVIDIAGDC.Profile.fetchIsAdmin();
		}
		return isAdmin;
	};

	NVIDIAGDC.Profile.fetchIsAdmin = function () {
		///geforce/user?user_id=1
		if (NVIDIAGDC.Profile.isActiveSession()) {
			$.ajax({
				url: NVIDIAGDC.apps.endpoint + '/geforce/user?user_id=' + NVIDIAGDC.Profile.getUserID(),
				type: 'GET',
				async: false,
				success: function (data) {
					if (data.list && data.list.length && data.list[0].userRole[0] !== undefined) {
						if (data.list[0].userRole[0].role.role === "admin") {
							isAdmin = true;
						}
					}
					else {
						isAdmin = false;
					}
				},
				error: function (e) {
					// On mobile, page navigation that causes this request to fail is logging out the user. Specific to mobile
					// So check for error specifics
					if (e && e.status === 401) {
						NVIDIAGDC.Profile.logout();
					}
				}
			});
		}
	};



	/**
	 * @desc validated session token with Jarvis
	 * @return boolean isActive Session
	 **/
	NVIDIAGDC.Profile.isActiveSession = function () {
		NVIDIAGDC.Profile.fetchProfile();
		return NVIDIAGDC.Profile.isLoggedIn() && (Cookies.get("nv.nvidmNoissesDataExtended") || Cookies.get("nv.nvidmNoissesData"));
	};

	/**
	 * @desc Returns the LoggedIn Profile Property
	 * @return boolean isLoggedIn
	 **/
	NVIDIAGDC.Profile.logout = function () {
		// DONT RECKLESSLY CLEAR ALL LOCALSTORAGE, DELETE ONLY WHAT YOU NEED
		// localStorage.clear();
		delete NVIDIAGDC.Profile.loggedIn
		Cookies.remove("nv.aemSssn", { domain: 'nvidia.com' });
		Cookies.remove("nv.nvidmNoissesData", { domain: 'nvidia.com' });
		Cookies.remove("nv.nvidmNoissesDataExtended", { domain: 'nvidia.com' });
	};


	/**
	 * @desc Returns the LoggedIn Profile Property
	 * @return boolean isLoggedIn
	 **/
	NVIDIAGDC.Profile.loginRedirection = function (returnPage) {
		if (NVIDIAGDC.Profile.isLoggedIn()) {
			window.location.href = returnPage;
		} else {
			window.location.href = NVIDIAGDC.Accounts.LoginPage + "?redirectURL=" + returnPage;
		}
	};


	/**
	 * @desc Sets the Profile Values
	 **/
	NVIDIAGDC.Profile.fetchProfile = function () {
		if (NVIDIAGDC.Profile.isLoggedIn()) {
			var _this = this;
			$.ajaxSetup({
				beforeSend: function (xhr) {
					if (NVIDIAGDC.Accounts.accountsJarvisHeaderMagicValue) {
						xhr.setRequestHeader("MagicHeader", NVIDIAGDC.Accounts.accountsJarvisHeaderMagicValue);
					}
					xhr.setRequestHeader("referrer-id", NVIDIAGDC.Accounts.accountsJarvisHeaderCFGRefereID);
				}
			});
			var call = NVIDIAGDC.Profile.userProfileCall({
				url: NVIDIAGDC.Accounts.accountsJarvisSrvcBase + '/api/1/profile/user/' + NVIDIAGDC.Profile.getUserID(),
				method: 'GET'
			}, NVIDIAGDC.Profile.getUserID());
			call.done(function (data) {
				NVIDIAGDC.addProperty('Profile', 'displayName', data.core.displayName);
			});
			call.fail(function (e) {
				// On mobile, page navigation that causes this request to fail is logging out the user. Specific to mobile
				// So check for error specifics
				if (e && e.status === 401) {
					NVIDIAGDC.Profile.logout();
				}
			});
		}
	};

	NVIDIAGDC.Profile.userProfileCall = function (settings, userId) {
		var _this = this;
		var dfd = $.Deferred();
		if (userId === null) {
			console.error('UserId ' + '"' + userId + '" is invalid.');
			dfd.reject('UserId ' + '"' + userId + '" is invalid.');
		}
		else {
			var auth = null;
			try {
				auth = 'Basic ' + $.base64.encode(NVIDIAGDC.Profile.getSessionToken() + ':');
			}
			catch (ex) {
				nvidiaGDClog("this.activeUsers[userId].sessionToken:", ex.message);
				dfd.reject('UserId ' + '"' + userId + '" is invalid.');
			}
			settings.headers = { 'Authorization': auth, 'Accept-Language': 'en-US' };
			var call = $.ajax(settings);
			call.done(function (data) {
				dfd.resolve(data);
			});
			call.fail(function (xhr) {
				dfd.reject(xhr);
			});
		}
		return dfd.promise();
	};




	NVIDIAGDC.Profile.getUserID = function () {
		var userid = null;
		if (NVIDIAGDC.Profile.hasOwnProperty('userID')) {
			userid = NVIDIAGDC.Profile.userID;
		}
		return userid;
	};


	NVIDIAGDC.Profile.getSessionToken = function () {
		var sessiontoken = null;
		if (NVIDIAGDC.Profile.hasOwnProperty('sessionToken')) {
			sessiontoken = NVIDIAGDC.Profile.sessionToken;
		}
		return sessiontoken;
	};

	/**
	 * @desc Profile Property Getter
	 * @param string propName
	 * @return string propVal - Profile Property Value or null if property doesn't exist
	 **/
	NVIDIAGDC.Profile.getProfileProp = function (propName) {
		if (!propName) {
			return null;
		}

		var propVal = null;
		var profile = NVIDIAGDC.Profile;

		if (profile.hasOwnProperty(propName)) {
			propVal = profile[propName];
		}

		return propVal;
	};

	/**
	 * @desc Checks cookies, loggedIn property, and Jarvis Oauth for authentication
	 * @return Promise
	 **/
	NVIDIAGDC.Profile.isActive = function () {
		return NVIDIAGDC.Profile.isLoggedIn();
	}

})(jQuery, window, document);


