(function ($) {
  "use strict";

  //preloader
$(window).on('load', function () {
	$("#rts__preloader").delay(500).fadeOut(500);
  })
  
  // Common-slider
  var swiper = new Swiper(".rts-cmmnSlider", {
	slidesPerView: 4,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1200: {
		slidesPerView: 4,
	  },
	  900: {
		slidesPerView: 3,
	  },
	  768: {
		slidesPerView: 3,
	  },
	  580: {
		slidesPerView: 2,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	autoplay: {
	  delay: 2500,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  // Common-slider-over
  var swiper = new Swiper(".rts-cmmnSlider-over", {
	slidesPerView: 4,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1200: {
		slidesPerView: 4,
	  },
	  900: {
		slidesPerView: 3,
	  },
	  768: {
		slidesPerView: 2,
	  },
	  633: {
		slidesPerView: 2,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	autoplay: {
	  delay: 2500,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  // feature-slider
  var swiper = new Swiper(".rts-featureSlider", {
	slidesPerView: 4,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1200: {
		slidesPerView: 4,
	  },
	  1093: {
		slidesPerView: 4,
		spaceBetween: 0,
	  },
	  991: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	  800: {
		slidesPerView: 3,
	  },
	  575: {
		slidesPerView: 2,
		spaceBetween: 0,
  
	  },
	  520: {
		slidesPerView: 2,
		spaceBetween: 10,
  
	  },
	  0: {
		slidesPerView: 1,
		spaceBetween: 0,
	  }
	},
	autoplay: {
	  delay: 25000,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  // feature-slider
  var swiper = new Swiper(".rts-featureSlider1", {
	slidesPerView: 3,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1200: {
		slidesPerView: 3,
	  },
	  1093: {
		slidesPerView: 3,
		spaceBetween: 0,
	  },
	  991: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },
	  800: {
		slidesPerView: 2,
	  },
	  575: {
		slidesPerView: 2,
		spaceBetween: 0,
  
	  },
	  520: {
		slidesPerView: 1,
		spaceBetween: 10,
  
	  },
	  0: {
		slidesPerView: 1,
		spaceBetween: 0,
	  }
	},
	autoplay: {
	  delay: 25000,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  // feature-slider
  var swiper = new Swiper(".rts-featureSlider2", {
	slidesPerView: 3,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1200: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },
	  1093: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },
	  991: {
		slidesPerView: 2,
		spaceBetween: 10,
	  },
	  800: {
		slidesPerView: 2,
		spaceBetween: 10,
	  },
	  575: {
		slidesPerView: 2,
		spaceBetween: 10,
  
	  },
	  520: {
		slidesPerView: 1,
		spaceBetween: 10,
  
	  },
	  0: {
		slidesPerView: 1,
		spaceBetween: 0,
	  }
	},
	autoplay: {
	  delay: 25000,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  // three-slider
  var swiper = new Swiper(".rts-threeSlider", {
	slidesPerView: 3,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1500: {
		slidesPerView: 3,
	  },
	  991: {
		slidesPerView: 3,
	  },
	  880: {
		slidesPerView: 3,
	  },
	  575: {
		slidesPerView: 2,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	autoplay: {
	  delay: 2500,
	  disableOnInteraction: false
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  // One Group slider
  var swiper = new Swiper(".rts-oneGroupSlider", {
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1500: {
		slidesPerView: 1,
	  },
	  991: {
		slidesPerView: 1,
	  },
	  767: {
		slidesPerView: 1,
	  },
	  575: {
		slidesPerView: 1,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  // banner slider
  var swiper = new Swiper(".bannerSlide", {
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1500: {
		slidesPerView: 1,
	  },
	  991: {
		slidesPerView: 1,
	  },
	  767: {
		slidesPerView: 1,
	  },
	  575: {
		slidesPerView: 1,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pag",
	  clickable: true,
	}
  });
  
  
  // banner slider
  var swiper = new Swiper(".bannerSlidehome", {
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1500: {
		slidesPerView: 1,
	  },
	  991: {
		slidesPerView: 1,
	  },
	  767: {
		slidesPerView: 1,
	  },
	  575: {
		slidesPerView: 1,
	  },
	  0: {
		slidesPerView: 1,
	  }
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	pagination: {
	  el: ".swiper-pagination-home",
	  clickable: true,
	}
  });
  
  // No gap slide
  var swiper = new Swiper(".noGapSlide", {
	slidesPerView: 5,
	spaceBetween: 10,
	slidesPerGroup: 1,
	speed: 1500,
	loop: true,
	loopFillGroupWithBlank: true,
	centeredSlides: false,
	breakpoints: {
	  1500: {
		slidesPerView: 5,
	  },
	  992: {
		slidesPerView: 4,
	  },
	  991: {
		slidesPerView: 3,
	  },
	  600: {
		slidesPerView: 3,
	  },
	  450: {
		slidesPerView: 2,
	  },
	  0: {
		slidesPerView: 2,
	  }
	},
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	}
  });
  
  // Video Popup
  if ($(".play-video").length) {
	$('.play-video').magnificPopup({
	  delegate: 'a',
	  type: 'iframe',
	  removalDelay: 0,
	  callbacks: {
		beforeOpen: function () {
		  this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		  this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  closeOnContentClick: true,
	  midClick: true
	});
  }
  
  // Filter item
  $(document).on('click', '.filter-navigation-btn', function () {
	var show = $(this).data('show');
	$(show).removeClass("hide").siblings().addClass("hide");
  });
  
  $(document).on('click', '.filter-navigation-btn', function () {
	$(this).addClass('active').siblings().removeClass('active')
  })
  
  // Search Bar show & hide
  $(document).on('click', '.search-icon', function () {
	$(".search-input-area").addClass("show");
	$(".anywere").addClass("show");
	$("#searchInput").focus();
  });
  $(document).on('click', '.search-close-icon', function () {
	$(".search-input-area").removeClass("show");
	$(".anywere").removeClass("show");
  });
  $(document).on('click', '.anywere', function () {
	$(".search-input-area").removeClass("show");
	$(".anywere").removeClass("show");
  });
  $(document).on('click', '.search-input-area-close', function () {
	$(".search-input-area").removeClass("show");
	$(".anywere").removeClass("show");
  });
  
  // Catagory Menu show & hide
  $(document).on('click', '.catagory-menu-icon', function () {
	$(".catagory-menu").addClass("show");
	$(".catagory-menu-area").addClass("visible");
	$(".anywere").addClass("bgshow");
  });
  $(document).on('click', '.search-close-icon', function () {
	$(".catagory-menu").removeClass("show");
	$(".catagory-menu-area").removeClass("visible");
	$(".anywere").removeClass("bgshow");
  });
  $(document).on('click', '.anywere', function () {
	$(".catagory-menu").removeClass("show");
	$(".catagory-menu-area").removeClass("visible");
	$(".anywere").removeClass("bgshow");
  });
  $(document).on('click', '.search-input-area-close', function () {
	$(".catagory-menu").removeClass("show");
	$(".catagory-menu-area").removeClass("visible");
	$(".anywere").removeClass("bgshow");
  });
  
  
  $('.custom-select').each(function () {
	var $this = $(this),
	  numberOfOptions = $(this).children('option').length;
  
	$this.addClass('select-hidden');
	$this.wrap('<div class="select"></div>');
	$this.after('<div class="select-styled"></div>');
  
	var $styledSelect = $this.next('div.select-styled');
	$styledSelect.text($this.children('option').eq(0).text());
  
	var $list = $('<ul />', {
	  'class': 'select-options'
	}).insertAfter($styledSelect);
  
	for (var i = 0; i < numberOfOptions; i++) {
	  $('<li />', {
		text: $this.children('option').eq(i).text(),
		rel: $this.children('option').eq(i).val()
	  }).appendTo($list);
	}
  
	var $listItems = $list.children('li');
  
  
	$styledSelect.on('click', function (e) {
	  e.stopPropagation();
	  $('div.select-styled.active').not(this).each(function () {
		$(this).removeClass('active').next('ul.select-options').hide();
	  });
	  $(this).toggleClass('active').next('ul.select-options').toggle();
	});
  
	$listItems.on('click', function (e) {
	  e.stopPropagation();
	  $styledSelect.text($(this).text()).removeClass('active');
	  $this.val($(this).attr('rel'));
	  $list.hide();
	});
  
	$(document).click(function () {
	  $styledSelect.removeClass('active');
	  $list.hide();
	});
  
  });

  $(function () {
    var header = $(".start-style");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 10) {
        header.removeClass('start-style').addClass("scroll-on");
      } else {
        header.removeClass("scroll-on").addClass('start-style');
      }
    });
  });

  //Animation
  $(document).ready(function () {
    $('body.hero-anime').removeClass('hero-anime');
  });

  //Menu On Hover
  $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
    if ($(window).width() > 750) {
      var _d = $(e.target).closest('.nav-item');
      _d.addClass('show');
      setTimeout(function () {
        _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
      }, 1);
    }
  });
  //Switch light/dark

  $("#switch").on('click', function () {
    if ($("body").hasClass("dark")) {
      $("body").removeClass("dark");
      $("#switch").removeClass("switched");
    } else {
      $("body").addClass("dark");
      $("#switch").addClass("switched");
    }
  });


  // Image popup
  $(document).ready(function () {
    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },

      zoom: {
        enabled: true,

        duration: 300,
        easing: 'ease-in-out',

        opener: function (openerElement) {

          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });


  // Sidebar open & close
  $('.hamburger').click(function () {
    $(".hamburger").toggleClass("active");
  });

  $('.hamburger').click(function () {
    $(".slide-bar").toggleClass("show");
    $(".anywere").addClass("bgshow");
    $(".hamburger").addClass("move");
  });

  $('.mobile-hamburger').click(function () {
    $(".slide-bar").removeClass("show");
    $(".anywere").removeClass("bgshow");
    $(".hamburger").addClass("move");
  });

  $('.anywere').click(function () {
    $(".slide-bar").removeClass("show");
    $(".anywere").removeClass("bgshow");
    $(".hamburger").removeClass("active");
  });

  $(function () {
    $('.toggle-menu').focus(function () {
      $('.rts-menu').toggleClass('display');
    });
  });


  /*------------------------------------
		Mobile Menu
	--------------------------------------*/

  $('#mobile-menu-active').metisMenu();

  $('#mobile-menu-active .has-dropdown > a').on('click', function (e) {
    e.preventDefault();
  });


  $(".hamburger-menu > a").on("click", function (e) {
    e.preventDefault();
    $(".slide-bar").toggleClass("show");
    $("body").addClass("on-side");
    $('.body-overlay').addClass('active');
    $(this).addClass('active');
  });

  /* Search
  	-------------------------------------------------------*/
  var $searchWrap = $('.search-wrap');
  var $navSearch = $('.nav-search');
  var $searchClose = $('#search-close');

  $('.search-trigger').on('click', function (e) {
    e.preventDefault();
    $searchWrap.animate({
      opacity: 'toggle'
    }, 500);
    $navSearch.add($searchClose).addClass("open");
  });

  $('.search-close').on('click', function (e) {
    e.preventDefault();
    $searchWrap.animate({
      opacity: 'toggle'
    }, 500);
    $navSearch.add($searchClose).removeClass("open");
  });

  function closeSearch() {
    $searchWrap.fadeOut(200);
    $navSearch.add($searchClose).removeClass("open");
  }

  $(document.body).on('click', function (e) {
    closeSearch();
  });

  $(".search-trigger, .main-search-input").on('click', function (e) {
    e.stopPropagation();
  });


  //sticky-menu
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 200) {
      $(".navbar-sticky").removeClass("sticky-menu");
      $(".navbar-sticky-mobile").removeClass("sticky-menu-mobile");
    } else {
      $(".navbar-sticky").addClass("sticky-menu");
      $(".navbar-sticky-mobile").addClass("sticky-menu-mobile");
    }
  });

  // Scroll to top
  var btn = $('.scroll-top-btn');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('jumpTop');
    } else {
      btn.removeClass('jumpTop');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });

  $("#nav ul li a[href^='#']").on('click', function (e) {
    e.preventDefault();
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function () {
      window.location.hash = hash;
    });
  });

  $("#nav div div a[href^='#']").on('click', function (e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function () {
      window.location.hash = hash;
    });

  });

  $("#nav ul li a[href^='#']").on('click', function (e) {
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function () {
      window.location.hash = hash;
    });

  });

  $("#nav div div a[href^='#']").on('click', function (e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function () {
      window.location.hash = hash;
    });

  });



  //Dark & Light jQuery
  var rts_go_dark = $('.rts-go-dark');
  if (rts_go_dark.length) {
    let rtstheme = localStorage.getItem('rtstheme');
    const godarkrts = document.querySelector('.rts-go-dark')
    const golightrts = document.querySelector('.rts-go-light')    

    const darkTheme = function () {
      document.documentElement.classList.add('rts-dark');
      localStorage.setItem('rtstheme', 'rts-dark');
    }
    const lightTheme = function () {
      document.documentElement.classList.remove('rts-dark');
      localStorage.setItem('rtstheme', 'light');
    }
    document.addEventListener('DOMContentLoaded', function () {
      localStorage.getItem('rtstheme');
      if (localStorage.rtstheme === 'rts-dark') {
        darkTheme();
      } else if (localStorage.rtstheme === 'light') {
        lightTheme();
      }
    });
    godarkrts.addEventListener('click', function () {
      darkTheme();
    });
    golightrts.addEventListener('click', function () {
      lightTheme();
    });
   
  }

})(jQuery);