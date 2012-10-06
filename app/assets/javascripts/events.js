

$(document).ready(function() {

  fparams = $.url().fparam();
  if (fparams.evid) {
    currentEventId = fparams.evid;
  }
  if (fparams.action && currentEventId) {
    $.getJSON("/events/" + currentEventId + "/" + fparams.action, function(response) {
      updateWorkspace(response);
    });
  }

  $("#save").live("click", function() {
    alert("l-am oprit");
    $.post("/events", $("#new_event").serialize(), function(data) {
      alert(data);
    });
  });

  $(".form-events").live("submit", function(event) {
    var data, url;
    if ($(".form-events").attr("id") !== "new_event") {
      url = $(this).attr("action");
      data = $(this).serialize();
      $.post(url, data, function(response) {
        updateWorkspace(response);
      }, "json");
      return false;
    }
  });

  $(".btn-volunteers").live("click", function() {
    var data, url;
    url = "/admin/volunteers";
    data = {
      type: "all"
    };
    $.post(url, data, function(response) {
      updateWorkspace(response);
    });
    return false;
  });

  $(".new_event").live("click", function() {
    $.getJSON("/events/new", function(response) {
      updateWorkspace(response);
    });
  });

  $(".edit_event").live("click", function() {
    if (currentEventId) {
      $.getJSON("/events/" + currentEventId + "/edit_step2", function(response) {
        updateWorkspace(response);
      });
    } else {
      $.getJSON("/events/new", function(response) {
        updateWorkspace(response);
      });
    }
  });

  $("#event_title").live("keyup change", function() {
    $("#_event_title").html(this.value);
  });
  $(".home_admin").click(function() {
    $.getScript("/admin/index");
  });
  updateWorkspace();

  if ($('.pagination').length) {
    $('.pagination').hide();
    $(window).scroll(function() {
      var url;
      url = $('.pagination .next_page').attr('href');
      if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        $('.pagination').text("Fetching more products...");
        $.getScript(url, function(data, textStatus, jqxhr) {
          $("ul li:nth-child(3n+1)").css("margin-left", "0px");
        }).fail(function(jqxhr, settings, exception) {
          console.log("ajax fail: get events");
        });
      }
    });
    $(window).scroll();
  }
  $('.carousel').carousel({
    interval: false
  });
});

var updateWorkspace = function(response) {
  
  for(var divClass in response){
    var divObj = $("." + divClass);
    if ( divObj.exists() ){
      divObj.html(response[divClass]);
    }
  } 

  //$("#workspace").html(response.workspace);
  /*
  	if (response.action)
  		action = response.action
  		window.location.hash += "action="+action
  	if (response.eventId)
  		@currentEventId = response.eventId
  		window.location.hash += "&evid="+currentEventId
  */

  $("#event_image").fileupload({
    dataType: 'json',
    done: function(e, data) {
      updateWorkspace(data.result);
    }
  });
  $("#event_date_start").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $("#event_date_end").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  
  initializeEvent();
};

