$(window).load(function(){

 //$('#prev').animate({top: "150px"}, 2000); /*to make the #content div slide in */
  // $('body').css('overflow', 'hidden'); /* to remove the sidebar */


	$('#prevBtn').click(function() {
		var $prev = $('#prev'),
			extended = $prev.attr("data-extended");

		if (extended=="false"){
			$prev.animate({left: "10%"}, 400);
			$prev.attr("data-extended", "true");
		} 
		else {
			$prev.animate({left: "100%"}, 200);
			$prev.attr("data-extended", "false");
		}

	$.getJSON("/events/1/edit_step2", function(response) {
	      $('#prev').html(response.workspace);
	    });

		 /* to make the #content div slide out on click */
	});

	$("#editBtn").live("click", function() {
	    
    });


//     $('#prev').blurjs({
// 	source: 'body',
// 	overlay: 'rgba(255,255,255,0.4)',
// 	radius:10
// });
});




// $(document).ready(function(){
    
//     $('#prev').blurjs({
// 		source: 'body',
//         radius: 7,
//         overlay: 'rgba(255,255,255,0.4)',
//         optClass: 'blurred',
//         cache:false
//     });
    
// });

// });
