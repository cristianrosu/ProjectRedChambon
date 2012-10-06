function GetEventOnClick(id){
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

	$.getJSON("/events/"+id+"/edit_step2", function(response) {
	      $('#prev').html(response.workspace);
    });

}

$(window).load(function(){
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
	});
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
