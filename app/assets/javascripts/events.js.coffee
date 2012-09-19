# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
	$( "#event_date_start" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#event_date_end" ).datepicker({ dateFormat: 'yy-mm-dd' });

	if $('.pagination').length
		$('.pagination').hide()
		$(window).scroll ->
			url = $('.pagination .next_page').attr('href')
			if url && $(window).scrollTop() > $(document).height() - $(window).height() - 50
				$('.pagination').text("Fetching more products...")
				$.getScript(url, (data, textStatus, jqxhr) ->
					).fail (jqxhr, settings, exception) -> 
						console.log "ajax fail: get events"
		$(window).scroll()

