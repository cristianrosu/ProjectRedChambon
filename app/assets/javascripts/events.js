var steps = ['guidelines', 'basics', 'event'];

var navigateStep = function(increment){
    var nextStep = ($.inArray(window.location.hash.substring(1), steps) + increment) % steps.length
    $(".steps-nav li a.active").removeClass("active");
    $(this).addClass("active");
    $('#carousel-edit').carousel(step);
}

//initialize carousel, update URL hash and set active link
var navigateInit = function(){
  if( $.inArray(window.location.hash.substring(1), steps) < 0 ){
    window.location.hash = steps[1];
  }
    
  $('#slide' + $.inArray(window.location.hash.substring(1), steps)).addClass("active");
  $('#carousel-edit .car-' + window.location.hash.substring(1) ).addClass("active");

  $('#carousel-edit').carousel({
    interval: false
  });

  $(".steps-nav .active").removeClass("active");
  $(".steps-nav li a[href='" + window.location.hash + "']").parent().addClass("active");

  $(".steps-nav li a").click(function() {
    var step = $.inArray(this.hash.substring(1), steps);
    $(".steps-nav .active").removeClass("active");
    $(this).parent().addClass("active");
    $('#carousel-edit').carousel(step);
    $('#slide' + step).addClass("active");
  });
}

var paginationInit = function(){
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
  }
}

$(document).mouseup(function (e) {
  var container = $(".popover");
  if (container.exists && !container.is(e.target) && container.has(e.target).length === 0) {
    closePopover(container);
  }
});

var closePopover = function(container) {
  var callerSelector = $(container).attr("data-caller-id");
  $(".btn-close", container).unbind("click");
  $(".btn-save", container).unbind("click");
  $(".square", container).unbind("click");
  $("#" + callerSelector).popover('hide');
}

$(document).ready(function() {

  //popover for creating a new event section
  $("#new_section").popover({
      placement : 'right', //placement of the popover. also can use top, bottom, left or right
      title     : '',
      trigger   : 'manual',
      html      : 'true', //needed to show html of course
      content   : function(){
          return $('#new_section_wrapper').html();
      }
    }).unbind("click").bind("click", function(e) {
      $(this).popover('show');
      var container = $(".popover");

      $(container).attr("data-caller-id", this.id);

      $(".square", container).bind("click", function() {
          $(this).siblings(".selected").removeClass("selected");
          $(this).addClass("selected");
      });

      $(".btn-close", container).bind("click", function() {
        closePopover(container);
      });

      $(".btn-save", container).bind("click", function() {
        var url = "/events/create_section";
        var data = {
          section : {
            name      : $("#section_name", container).val(),
            type_id   : $(".square.selected", container).data("type"),
            position  : $("#event-content > article[id]").index() + 1,
            event_id  : $("#event-content").attr("data-event-id")
          }
        };
        if (data.section.name && data.section.type_id) {
          $(this).html("Saving...").addClass("disabled");
          $(this).unbind("click");

          $.post(url, data, function(response) {
              closePopover(container);
              $("#event-content > article.post[id]").last().after(response.new_section);
              $("#event-content > article.post.hide").fadeIn().removeClass("hide");
              updateWorkspace();
          }, "json");
        }
      });

      e.preventDefault();
    });
});


// var resetModal = function(modalPopup){
//   $("input", modalPopup).val("");
//   $(".selected", modalPopup).removeClass("selected");
//   $(".disabled", modalPopup).removeClass("disabled");
//   $(".btn-save_section").html("Save");
// }

var updateWorkspace = function(response) {
  
  //for each property of 'response' search for a div with that name 
  // and update it's contents
  for(var divClass in response){
    var divObj = $("." + divClass);
    if ( divObj.exists() ){
      divObj.html(response[divClass]);
    }
  } 

  //prevent form to submit normally, send and update page using ajax
  $(".form-events").unbind("submit")
    .bind("submit", function(event) {
      if ($(this).attr("id") !== "new_event") {
        url = $(this).attr("action");
        data = $(this).serialize();
        $.post(url, data, function(response) {
          updateWorkspace(response);
        }, "json");
      
        return false;
      }
  });

  //event handlers
  $("#event_title").unbind("keyup change")
    .bind("keyup change", function() {
      $("#_event_title").html(this.value);
  });

  $("#event_description").unbind("keyup change")
    .bind("keyup change", function() {
      $("#_event_description").html(this.value);
  });

  $(".btn-event-save").unbind("click")
    .bind("click", function() {
      $(".form-events").submit();
  });

  // $(".btn-save_section").unbind("click")
  //   .bind("click", function() {
  //     var modalPopup = $("#new_section_modal"),
  //       form = $("#new_section", modalPopup),
  //       url = "/events/create_section",
  //       button = this;

  //     var data = {
  //       section : {
  //         name      : $("#section_name", form).val(),
  //         type_id   : $(".markerfilter .selected", form).data("type"),
  //         position  : $("#event-content > article[id]").index() + 1,
  //         event_id  : $("#event-content").attr("data-event-id")
  //       }
  //     };

  //     $(button).html("Saving...").addClass("disabled");

  //     $.post(url, data, function(response) {
  //         $(modalPopup).modal('hide');
  //         resetModal();

  //         updateWorkspace(response);
  //     }, "json");
  // });

  $("#new_sponsorship .btn-save").unbind("click")
    .bind("click", function() {
      var modalPopup = $("#new_sponsorship"),
        form = $("#new_section", modalPopup),
        url = "/events/create_section",
        button = this;

      var data = {
        sponsorship : {
          name      : "",//$("#section_name", form).val(),
          type_id   : 3, //$(".markerfilter .selected", form).data("type"),
          position  : 0, //$("#event-content > article[id]").index() + 1,
          section_id : $("#event-content").attr("data-event-id")
        }
      };

      $(button).html("Saving...").addClass("disabled");

      $.post(url, data, function(response) {
          $(modalPopup).modal('hide');
          resetModal();

          updateWorkspace(response);
      }, "json");
  });

  $(".add_content-sponsorship").unbind("click")
    .bind("click", function() {
      $("#new_sponsorship").modal('show');
  });

  //initialize fileuploader and date fields
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
  
  //initialize wyswig
  initializeEvent();


  // Charts
  // dead simple donut charts
  // Morris.Donut({
  //   element: 'pipali',
  //   data: [
  //     {label: "Download Sales", value: 12},
  //     {label: "In-Store Sales", value: 30},
  //     {label: "Mail-Order Sales", value: 20}
  //   ]
  // });

  


};

