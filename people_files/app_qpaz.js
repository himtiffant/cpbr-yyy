$=jQuery;
var SITE = {}

SITE.Global = {
    
};
SITE.Events = {
    scroll: function(){
        SITE.Utils.fixScrollOver();
    }
};
SITE.Utils = {
    fixScrollOver: function(){
		console.info('fix');
		$('.hero').css("height", "100vh");
    }
};
SITE.DynamicList = {
    init: function(){
        if( $('.dynamic-list').length ){
            $('.dynamic-list .filters .filter').on('click', function(){
                var $this = $(this);
                var query = $this.attr('data-query');
                if($this.hasClass('active')){
                    $('.dynamic-list').removeClass('filtered');  
                    $this.removeClass('active');
                }else{
                    $('.dynamic-list').addClass('filtered');  
                    $('.dynamic-list .filters .filter').removeClass('active');
                    $this.addClass('active');
                    $('.dynamic-list .items .item').removeClass('active');
                    $('.dynamic-list .items .item').each(function(){
                        var campus = $(this).attr('data-campus');
                        if(campus.indexOf(query) > -1){
                            $(this).addClass('active');
                        }else{
                            $(this).removeClass('active');
                        }
                    });
                }
            });
        }
    }
}
SITE.DegreeFinder = {
    init: function(){
        $(document).on("open.zf.reveal", function(ev, $el) {
            
            if( $('#degreeFinder').length ){
                console.info('DF Open in Modal');
                $('body').addClass('no-scroll');
        //        $(document).foundation();
                setTimeout(function(){
                     console.info('DF INIT');
                     //DEGREEFINDER.Init.init();
    	             //DEGREEFINDER.Init.resize();
                }, 500);
               
    	    }
        });
        $(document).on("close.zf.reveal", function(ev, $el) {
            if( $('#degreeFinder').length ){
                console.info('DF Close in Modal');
                
    	    }
    	    
    	    $('body').removeClass('no-scroll');
    	    $('html').removeClass('is-reveal-open');
        });
        $('body').on('click', '.open-degree-finder', function(o){
            o.preventDefault();  
            $('#degreeFinderModal').addClass('loading');
                $('#degreeFinderModalContent').html('');
                $('#degreeFinderModal').foundation('open');
                $.ajax('/global/modals/modal-degree-finder')
                .done(function(resp){
                    $('#degreeFinderModalContent').html(resp);
                    $('#degreeFinderModalContent').foundation();
                    $('#degreeFinderModal').removeClass('loading');
                    DEGREEFINDER.Init.init();
    	            DEGREEFINDER.Init.resize();
            });
        });  
        
	}
};
SITE.Slider = {
	init: function(){
		$('.owl-thumbs .owl-thumb-item').on("click", function(o){
			o.preventDefault();
			var $this = $(this);
			var id = $this.attr('data-id');
			$('.owl-thumbs .owl-thumb-item').removeClass('active');
			$this.addClass('active');
			var slides = $('.owl-dots').children('.owl-dot');
			console.info(slides);
			$(slides[id]).trigger("click");
		});
	}
	
};
SITE.Search = {
	init: function(){
		$(".search-input").on("keydown", function(){
			var $input = $(this);
			var val = $input.val();
			var type = $input.attr('data-type'); 
			SITE.Search.searchSuggest(val, type);
		});
		$(".drawer-header").on("click", function(){
			SITE.Nav.Drawers.closeDrawes();
		});
		$('#searchDrawer a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		  	var $tab = $(e.target);
			var type = $tab.attr('data-type');
		    $("#searchSuggest .results").removeClass('active');
			$('#'+type).addClass('active');
		})
	},
	searchSuggest: function(val, type){
		$("#searchSuggest .results").removeClass('active');
		$('#'+type).addClass('active'); 
		if(val.length>4){
			$("#searchSuggest").addClass("open");
		}else{
			$("#searchSuggest").removeClass("open");
		}
	}
};
SITE.Nav = {
}
/*
SITE.Nav.Campus = {
	init: function(){
		$("#campusDrawer .quicklink a").on('click', function(o){
			o.preventDefault();
			var $this = $(this);
			var campus = $this.attr('data-campus');
			var campusl = campus.toLowerCase().replace(' ', '');
			var target = $this.attr("data-target");
			var $target = $(target);
			$("#campusDrawer .quicklink a").removeClass('active');
			$(".selected-campus").html(campus);
			$this.addClass('active');
			var delay = SITE.Nav.Drawers.closeDrawes();
			$('.owl-thumb-item.'+campusl).trigger('click');
			$(".hero").removeClass('active');
			$(".hero").removeClass('loaded');
			$(".secimg").removeClass('active');
			$('.secimg.'+campusl).addClass('active');
			$(".itext").removeClass('active');
			$('.itext.'+campusl).addClass('active');
			$target.addClass('active');
			$target.addClass('loaded');
			$('.parallax').jarallax('destroy');
			setTimeout(function(){
					$('.parallax').jarallax({
            			speed: 0.4,
        	});
			}, 500);
		});
	}
};
*/
SITE.Nav.Drawers = {
	init: function(){
		$(".campus-open").on("click", function(o){
			o.preventDefault();
			var $this = $(this);
			var active = $this.hasClass('active');
			var delay = SITE.Nav.Drawers.closeDrawes();
			if(!active){
				setTimeout(function(){
					$("body").addClass('drawer-open');
					$("body").addClass('tab-campus-open');
				}, delay);
				$this.addClass('active');
			}else{
				$this.removeClass('active');
			}
		});
		
		$(".search-open").on("click", function(o){
			o.preventDefault();
			var $this = $(this);
			var active = $this.hasClass('active');
			var delay = SITE.Nav.Drawers.closeDrawes();
			if(!active){
				setTimeout(function(){
					$("body").addClass('drawer-open');
					$("body").addClass('tab-search-open');
				}, delay);
				$this.addClass('active');
			}else{
				$this.removeClass('active');
			}
		});
		
		$(".dashboard-open").on("click", function(o){
			o.preventDefault();
			var $this = $(this);
			var active = $this.hasClass('active');
			var delay = SITE.Nav.Drawers.closeDrawes();
			if(!active){
				setTimeout(function(){
					$("body").addClass('drawer-open');
					$("body").addClass('tab-dashboard-open');
					$("body").addClass('tab-campus-open');
				}, delay);
				$this.addClass('active');
			}else{
				$this.removeClass('active');
			}			
		});
	},
	closeDrawes: function(){
		$("#searchSuggest .results").removeClass('active');
		$('.extra-nav a').removeClass('active');
		if($("body").hasClass('drawer-open')){
			$("body").removeClass('drawer-open');
			$("body").removeClass('tab-dashboard-open');
			$("body").removeClass('tab-campus-open');
			$("body").removeClass('tab-search-open');
		   return 500;
		}
		$("body").removeClass('drawer-open');
		$("body").removeClass('tab-dashboard-open');
		$("body").removeClass('tab-campus-open');
		$("body").removeClass('tab-search-open');
		return 0;
	}
};
SITE.Nav.CTA = {
	init: function(){
		/* CTA MENU */
		if($('.tabs-wrapper').length){
            $('.fixed-cta-nav').addClass('static');
        }
		$(".fixed-cta-nav").on('mouseenter', function(o){
			o.preventDefault();
			$(this).addClass('open');
		});
		$(".fixed-cta-nav").on('mouseleave', function(o){
			o.preventDefault();
			$(this).removeClass('open');
		});
		/* MAIN MENU */	
		$('.off-canvas-open, .off-canvas-close').on('click', function() {
			var $this = $(this);
			var octype = $this.attr('data-type');
	
		$('.inner-canvas').removeClass('active');
		$('.inner-canvas.'+octype).addClass('active');
			var delay = SITE.Nav.Drawers.closeDrawes();
			setTimeout(function(){
					$('body').toggleClass('off-canvas-sidebar-open');
			}, delay);            
            return false;
        }).resize();

        $(document).on('click', function(e) {
            var container = $('.off-canvas-sidebar');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('body').removeClass('off-canvas-sidebar-open');
            }
        }).resize();
	},
	scroll: function(){
	    var ww = $(window).width();
        var wh = $(window).height();
        var scrollTop = $(window).scrollTop();
         if($('.heroHeader').length){
            var stickyNavTop = $('.heroHeader').offset().top;
	        if(!$('.tabs-wrapper').length){
            	if (scrollTop > stickyNavTop) { 
            		$('.fixed-cta-nav').addClass('collapsed');
            	} else {
            		$('.fixed-cta-nav').removeClass('collapsed'); 
            	}   
    	    }
    	}else{
    	    if($('.layout-basic').length){
    	       $('.fixed-cta-nav').addClass('collapsed'); 
    	    }else{
    		    $('.fixed-cta-nav').hide();   
    	    }
	    }
	}
}

$(document).ready(function () {
   	SITE.Nav.CTA.init(); 
   	SITE.Nav.Drawers.init();
   	SITE.Search.init();
//	SITE.Nav.Campus.init();
	SITE.DegreeFinder.init();
	if (window.top!=window.self){
     $('body').addClass('dotcms');
    } 
	
});

$(window).on('load', function () {
	SITE.Slider.init();
	setTimeout(function(){
		var page = $('body').attr('data-page'); 
		$('.owl-thumb-item.'+page).trigger('click');
	},500);
});

$(window).on('scroll',function(){
	SITE.Nav.CTA.scroll(); 
});

$(document).resize(function(){
	SITE.Nav.CTA.scroll();
	SITE.Utils.fixScrollOver();
	SITE.DynamicList.init();
});