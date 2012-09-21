# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
	$.getScript("/events/new")

	$("#save").live("click", ->
		alert "l-am oprit"
		$.post("/events", $("#new_event").serialize(), (data) -> 
			alert(data) 
		)
	)