$=jQuery;
var DEGREEFINDER = {}

DEGREEFINDER.Global = {
    urlParams:new URLSearchParams(window.location.search),
    searchBy: false,
    did: false,
    dept: false
};
DEGREEFINDER.Events = {
    scroll: function(){
        DEGREEFINDER.Utils.fixScrollOver();
    }
};
DEGREEFINDER.Utils = {
   
};

DEGREEFINDER.Init = {
    init: function(){
       //INIT
        $('body').on('click', '#degreeFinderModal .close-button', function(o){
            o.preventDefault();
            $('#degreeFinderModal').foundation('close');
       });
       $('#filterToggle').on('click', function(){
           $('#dfNavMobile').toggleClass('expanded');
       });
       //LEVEL 1 EVENTS
       $(document).on("show.zf.dropdownmenu", function(ev, $el) {
            //console.log("dropdown menu show "+ev.target.id+" / "+$el.attr('id'));
            var $first = $el.find('a.first');
            $first.trigger('click');
            console.info("level1 clicked");
       });
       
       $('body').on('click', '#degreeFinder .df-item.level2', function(o){
            o.preventDefault();
            var $this = $(this);
            var $parent = $this.parent();
            $('#degreeFinder .df-item.level2').removeClass('active');
            $this.addClass('active');
            console.info("level2 clicked");
            $('div#dfCell2').addClass('active');
            var program_id = $this.attr('data-degree-id');
		    var program_department = $this.attr('data-department');
		    var searchBy = $this.attr('data-searchby');
            var program_url = $this.attr('data-degree-url');
            $('#degreeLoader').html('');
            $('#degreeLoader').addClass('loading');
            $.ajax({
               type: "POST",
               url: program_url,
               data: "degree=0&location=houston",
               success: function(data){
                 $('#degreeLoader').html(data);
                 $('#degreeLoader').removeClass('loading');  
                 $("ul.tabs").foundation();   
               }
             });
             var minColHeight = $('ul.vertical.menu.nested.submenu.is-dropdown-submenu.first-sub.js-dropdown-active').height();
             $('.df-cell').css('min-height', minColHeight+'px');
             //$('div#dfCell2.active::after').css('height', minColHeight+'px');
		   	 if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchby='+searchBy+'&did=' + program_id + '&dept=' + program_department + '&l=1';
              console.info(newurl);
              window.history.pushState({path:newurl},'',newurl);
           	 }
        });
		/*$('body').on('click', '#degreeFinderMobile .df-item.level2', function(o){
            o.preventDefault();
            var $this = $(this);
            var $parent = $this.parent();
            $('#degreeFinderMobile .df-item.level2').removeClass('active');
            $this.addClass('active');
            console.info("level2 clicked");
            $('div#dfCell2').addClass('active');
            var program_id = $this.attr('data-degree-id');
		    var program_department = $this.attr('data-department');
		    var searchBy = $this.attr('data-searchby');
            var program_url = $this.attr('data-degree-url');
            $('.degree-loader-mobile').html('');
            $('.degree-loader-mobile').addClass('loading');
            $.ajax({
               type: "POST",
               url: program_url,
               data: "degree=0&location=houston",
               success: function(data){
                 $('.degree-loader-mobile').html(data);
                 $('.degree-loader-mobile').removeClass('loading');  
                 $("ul.tabs").foundation();   
               }
             });
             var minColHeight = $('ul.vertical.menu.nested.submenu.is-dropdown-submenu.first-sub.js-dropdown-active').height();
             $('.df-cell').css('min-height', minColHeight+'px');
             //$('div#dfCell2.active::after').css('height', minColHeight+'px');
		   	 if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchby='+searchBy+'&did=' + program_id + '&dept=' + program_department + '&l=2';
              console.info(newurl);
              window.history.pushState({path:newurl},'',newurl);
           	 }
        });*/
       $('body').on('click', '#dfCampusSelect li a', function(o){
            o.preventDefault();
            var $this = $(this);
            var $current = $('.current-campus');
            var selected = $this.html();
            $current.html(selected);
            $('.selected-campus-label').html(selected);
            $('.df-data li ul li').removeClass('avail');
            $('.df-data li ul li').each(function(){
               if($(this).hasClass(selected.toLowerCase().replace(' ', '-'))){
                  $(this).addClass('avail');
               }
            });  
           
        });
        $('body').on('click', '#dfDataSelect li a', function(o){
            o.preventDefault();
            var $this = $(this);
            var $current = $('.current-filter');
            var selected = $this.html();
            $current.html(selected);
            $('.selected-filter').html(selected);
            $('.df-data').removeClass('active');
            if(selected == 'DEGREE PROGRAM'){
               $('#byDegree').addClass('active');
            }else{
               $('#byProgram').addClass('active');
            }
            DEGREEFINDER.Init.resize();
        });
       
       $(document).on("open.zf.drilldown", function(ev, $el) {
            var $this = $(ev.target).find('.is-drilldown-submenu-item[aria-expanded="true"]  a.level2');
            if($this.hasClass('level2')){
               var program_id = $this.attr('data-degree-id');
               var program_url = $this.attr('data-degree-url');
			   console.info(program_url);
               $('.degree-loader-mobile').html('');
               $('.degree-loader-mobile').addClass('loading');
               $.ajax({
                  type: "POST",
                  url: program_url,
                  data: "degree=0&location=houston",
                  success: function(data){
                    $('.is-drilldown-submenu-item[aria-expanded="true"] .degree-loader-mobile').html(data);
                    $('.is-drilldown-submenu-item[aria-expanded="true"] .degree-loader-mobile').removeClass('loading');
					setTimeout(function(){
						 $('.is-drilldown-submenu-item[aria-expanded="true"] .degree-loader-mobile ul.tabs').foundation(); 
					}, 500);
                   
                  }
               }); 
            }
        });
       
        $('body').on('click', '#dfCampusSelectMobile li a', function(o){
            o.preventDefault();
            var $this = $(this);
            var $current = $('.current-campus');
            var selected = $this.html();
            $current.html(selected);
            $('.selected-campus').html(selected);
            $('.df-data li ul li').removeClass('avail');
            $('.df-data li ul li').each(function(){
               if($(this).hasClass(selected.toLowerCase().replace(' ', '-'))){
                  $(this).addClass('avail');
               }
            });  
           $('#dfCampusSelectMobile li a').removeClass('active');  
           $this.addClass('active');
           setTimeout(function(){$('#filterToggle').trigger('click');}, 1);
        });
        $('body').on('click', '#dfDataSelectMobile li a', function(o){
            o.preventDefault();
            var $this = $(this);
            var $current = $('.current-filter');
            var selected = $this.html();
            $current.html(selected);
            $('.selected-filter').html(selected);
            $('.df-data').removeClass('active');
            if(selected == 'DEGREE PROGRAM'){
               $('#byDegreeMobile').addClass('active');
            }else{
               $('#byProgramMobile').addClass('active');
            }
            $('.filter-select').html(selected);
            $('#dfDataSelectMobile li a').removeClass('active');  
            $this.addClass('active');
            setTimeout(function(){$('#filterToggle').trigger('click');}, 1);
        });
        DEGREEFINDER.Init.resize();
    },
    resize: function(){
        if( $('#degreeFinder').length ) {
        console.info('dg resize');
           var offset = $('#dfGrid').offset().top;
           $('#degreeFinder .dropdown.menu.vertical>li.opens-right>.is-dropdown-submenu').each(function(){
              var top = $(this).parent().offset().top;
             $(this).css('top', '-'+(top-offset)+'px');
           });
           $(".drilldown").foundation(); 
       }
    }
};

$(document).ready(function () {
    //CHECK IF DG MARK-UP IS ON PAGE BEFORE INIT
    if( $('#degreeFinder').length ){
        var ww = $(window).width();
        DEGREEFINDER.Init.init();
        DEGREEFINDER.Global.urlParams.get('searchby');
        DEGREEFINDER.Global.searchBy = DEGREEFINDER.Global.urlParams.get('searchby');
        DEGREEFINDER.Global.did = DEGREEFINDER.Global.urlParams.get('did');
        DEGREEFINDER.Global.dept = DEGREEFINDER.Global.urlParams.get('dept');
        if(DEGREEFINDER.Global.searchBy){
            setTimeout(function(){
                console.info('.'+DEGREEFINDER.Global.searchBy);
                //$('.'+DEGREEFINDER.Global.searchBy).trigger('click');
            }, 500);
        }
        console.info('did='+DEGREEFINDER.Global.did);
        console.info('dept='+DEGREEFINDER.Global.dept);
        if(DEGREEFINDER.Global.did && DEGREEFINDER.Global.dept){
			var $target;
			var $level1;
			var searchBy;
			var searchByEle;
			searchBy = 'dp';
		    searchByEle = 'byDegree'	
			if(DEGREEFINDER.Global.searchBy){
				if(DEGREEFINDER.Global.searchBy === 'aos'){
				   searchBy = 'aos';
				   searchByEle = 'byProgram'					  	
				}
			}
            setTimeout(function(){
                if(ww>811){
                    $target = $('#'+searchByEle+' a[data-degree-id="'+DEGREEFINDER.Global.did+'"][data-department="'+DEGREEFINDER.Global.dept+'"].df-item.level2');
					$level1 = $target.closest('.is-dropdown-submenu-parent').find('.level1');
					$level1.trigger('click');
				    setTimeout(function(){	
						$target.trigger('click');
					}, 250);
                  }else{
                    $target = $('#'+searchByEle+'Mobile a[data-degree-id="'+DEGREEFINDER.Global.did+'"][data-department="'+DEGREEFINDER.Global.dept+'"].df-item.level2');
					$level1 = $target.closest('.is-dropdown-submenu-parent').find('.level1');
					$level1.trigger('click');
				    setTimeout(function(){	
						$target.trigger('click');
					}, 250);
                  }
            }, 250);
        }
    	DEGREEFINDER.Init.resize();
        
	}
});

$(window).on('load', function () {
    if( $('#degreeFinder').length ){
        $('.degree-page-loader').addClass('complete');
        setTimeout(function(){$('.degree-page-loader').addClass('finished');}, 500);
         if(DEGREEFINDER.Global.searchBy){
             var ww = $(window).width();
            if(ww>811){
                setTimeout(function(){
                    console.info('.'+DEGREEFINDER.Global.searchBy);dfNavMobile
                    $('#dfDataSelect .'+DEGREEFINDER.Global.searchBy).trigger('click');
                }, 1000);
            }else{
                setTimeout(function(){
                console.info('.'+DEGREEFINDER.Global.searchBy);dfNavMobile
                $('#dfNavMobile .'+DEGREEFINDER.Global.searchBy).trigger('click');
                $('#filterToggle').trigger('click');
                }, 1000);
            } 
        }
    }
});

$(window).on('scroll',function(){

});

$(document).resize(function(){
    
	    DEGREEFINDER.Init.resize();
	
});