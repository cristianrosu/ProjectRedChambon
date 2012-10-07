$(document).ready(function(){

	$(".btn-volunteers").click(function() {
		var data;
		$.post("/admin/volunteers", data, function(response) {
		  $("#workspace").html(response.workspace)
		}, "json");
	});


	$(".btn-sponsors").click(function() {
		var data;
		$.post("/admin/sponsors", data, function(response) {
		  $("#workspace").html(response.workspace)
		}, "json");
	});

});