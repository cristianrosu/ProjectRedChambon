// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.datepicker
//= require raphael
//= require morris
//= require blur.min
//= require twitter/bootstrap
//= require_tree .


    $("div.thumbnail-first").live({
        mouseenter: function () {
            $(".mask", this).fadeIn("fast");
            
        },
        mouseleave: function () {
            $(".mask", this).fadeOut("fast");
        }
    });


	/* Radial Menu */
    function PieMenuInit(){   
      $('#outer_container').PieMenu({
        'starting_angel':$('#s_angle').val(),
        'angel_difference' : $('#diff_angle').val(),
        'radius':$('#radius').val(),
      });     
    }
    $(function() {          
      $("#submit_button").click(function() {reset(); }); 
      // $( "#outer_container" ).draggable(); ..era draggable
      PieMenuInit();
      
    });
    function reset(){
      if($(".menu_button").hasClass('btn-rotate'))
      $(".menu_button").trigger('click');
      
      $("#info").fadeIn("slow").fadeOut("slow");
      PieMenuInit();
    }
 

//google analytics
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35826846-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

// end of google analytics
