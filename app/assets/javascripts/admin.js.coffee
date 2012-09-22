# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->

	$("#save").live("click", ->
		alert "l-am oprit"
		$.post("/events", $("#new_event").serialize(), (data) -> 
			alert(data) 
		)
	)

	$(".new_event").live("click", ->
		$.getJSON("/events/new", (response) ->
			$("#workspace").html(response.body)
		)
	)

	$("#event_title").live("keyup change", ->
		$("#_event_title").html(this.value)
	)

	$(".home_admin").click ->
		$.getScript("/admin/index")
