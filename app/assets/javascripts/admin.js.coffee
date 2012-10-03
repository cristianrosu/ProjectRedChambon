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

	$(".form-events").live("submit", (event)->
		url = $(this).attr("action")
		data = $(this).serialize()
		$.post(url, data, (response) ->
			updateWorkspace(response)
		)
		return false
	)

	$(".btn-volunteers").live("click", ->
		url = "/admin/volunteers"
		data = {
			type : "all"
		}
		$.post(url, data, (response) ->
			updateWorkspace(response)
		)
		return false
	)

	$(".new_event").live("click", ->
		$.getJSON("/events/new", (response)->
			updateWorkspace(response)
		)
	)

	$(".edit_event").live("click", ->
		$.getJSON("/events/10/edit_step2", (response)->
			updateWorkspace(response)
		)
	)

	$("#event_title").live("keyup change", ->
		$("#_event_title").html(this.value)
	)

	$(".home_admin").click ->
		$.getScript("/admin/index")


updateWorkspace = (response) ->

	$("#workspace").html(response.workspace)

	$("#event_image").fileupload({
		dataType: 'json',
		done: (e, data) -> 
			updateWorkspace(data.result)
	})
	
	$( "#event_date_start" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#event_date_end" ).datepicker({ dateFormat: 'yy-mm-dd' });
	initializeEvent()


	