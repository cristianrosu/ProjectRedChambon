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
    
  $('#carousel-edit .car-' + window.location.hash.substring(1) ).addClass("active");

  $('#carousel-edit').carousel({
    interval: false
  });

  $(".steps-nav li a.active").removeClass("active");
  $(".steps-nav li a[href='" + window.location.hash + "']").addClass("active");

  $(".steps-nav li a").click(function() {
    var step = $.inArray(this.hash.substring(1), steps);
    $(".steps-nav li a.active").removeClass("active");
    $(this).addClass("active");
    $('#carousel-edit').carousel(step);
  });
}

$(document).ready(function() {

  updateWorkspace();
  navigateInit();

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
});

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

