var steps = ['guidelines', 'basics', 'event'];
var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");
var generatedId = 1;

var navigateStep = function(increment){
    var nextStep = ($.inArray(window.location.hash.substring(1), steps) + increment) % steps.length
    $(".steps-nav li a.active").removeClass("active");
    //$(this).addClass("active");
    $('#carousel-edit').carousel(step);
    $("#carousel-header").carousel();
}

//initialize carousel, update URL hash and set active link
var navigateInit = function(){
  if( $.inArray(window.location.hash.substring(1), steps) < 0 ){
    window.location.hash = steps[2];
  }
    
  $('#slide' + $.inArray(window.location.hash.substring(1), steps)).addClass("active");
  $('#carousel-edit .car-' + window.location.hash.substring(1) ).addClass("active");

  $('#carousel-edit').carousel({
    interval: false
  });

  $(".steps-nav .active").removeClass("active");
  $(".steps-nav li a[href='" + window.location.hash + "']").parent().addClass("active");

  $(".steps-nav li a").click(function(e) {
    e.preventDefault();
    var step = $.inArray(this.hash.substring(1), steps);
    $(".steps-nav .active").removeClass("active");
    $(this).parent().addClass("active");
    $('#carousel-edit').carousel(step);
    $('#slide' + step).addClass("active");
    window.location.hash = this.hash;

    //hack for second carousel  -- fuck it (won't work)
    //$("#carousel-header .item").removeClass("active").first().addClass("active");
    donutInit();
  });
  donutInit();
  $("#carousel-header").carousel();
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

var donutInit = function() {
  if (window.location.hash.substring(1) == steps[2]) {
    Morris.Donut({
      element: 'pipali',
      data: [
        {label: "Competitors", value: 32},
        {label: "Media & Bloggers", value: 15},
        {label: "Mentors & Experts", value: 10}
      ]
    });
  }
}

var getElementId = function(element){
  //generatedId ++;
  var ret;
  if (typeof element === "undefined") {
    generatedId ++;
    return "gen-" + generatedId;
  }
  else {
    if (!element.id){
      generatedId ++;
      element.id = "gen-" + generatedId;
    }
    return element.id;
  }
}

$(document).mousedown(function (e) {
  var container = $(".popover");
  if (container.exists && !container.is(e.target) && container.has(e.target).length === 0) {
    closePopover(container);
  }
});

var closePopover = function(container) {
  var callerSelector = ($(container).attr("id") || '').substring(8);
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
      html      : 'true', 
      content   : function(){
          return $('#new_section_wrapper').html();
      }
    }).unbind("click").bind("click", function(e) {
      $(this).popover('show');
      var container = $(".popover");

      $(container).attr("id", "popover_" + this.id);

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

  //popover for editing an event section
  $("article[id] aside").popover({
      placement : 'right', //placement of the popover. also can use top, bottom, left or right
      title     : '',
      trigger   : 'manual',
      html      : 'true', 
      content   : function(){
          return $('#new_section_wrapper').html();
      }
  }).unbind("click").bind("click", function(e) {

    
  })



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

  //popover for adding a sponsorship
  $(".add_content-other").popover({
      placement : 'bottom', 
      title     : '',
      trigger   : 'manual',
      html      : 'true', 
      content   : function(){
          return $('#new_custom_block_wrapper').html();
      }
    }).unbind("click").bind("click", function(e) {
      $(this).popover('show');
      var container = $(".popover");
      var caller = this;
      $(container).attr("id", "popover_" + getElementId(this));
      var sectionId = ($(this).closest('article').attr('id') || '').substring(3)

      $(".square", container).bind("click", function() {
        $(this).siblings(".selected").removeClass("selected");
        $(this).addClass("selected");

        var url = "/events/create_block";
        var data = {
            type      : $(".square.selected", container).data("type"),
            sectionId : sectionId
        };

        $.post(url, data, function(response) {
            closePopover(container);
            $(caller).closest('.add_content-bar').before( response );
            updateWorkspace();
            saveBlock( $(response).attr("id") );
        });    

      });

      $(".btn-close", container).bind("click", function() {
        closePopover(container);
      });

      e.preventDefault();
  });

  $(".add_content-sponsorship").unbind("click")
    .bind("click", function() {
      $("#new_sponsorship").modal('show');
  });

  //initialize fileuploader and date fields
  // $("#event_image").fileupload({
  //   dataType: 'json',
  //   done: function(e, data) {
  //     updateWorkspace(data.result);
  //   }
  // });

  $("#event_images").fileupload({
    dataType: 'json',
    add: function(e, data) {
      //console.log(data);
      //data.context = 
      data.contextId = getElementId();  //<div id="' + data.contextId + '" style="height:150px; width:260px; border:1px solid black"></div>'); 
      $("#event-pictures").append('<div id="' + data.contextId + '" class="event-picture-preview" style="height: 50px; width: 75px; float:left; margin:5px; cursor:pointer"></div> ');
      data.submit();
    },
    progress: function(e, data) {
      progress = parseInt(data.loaded / data.total * 100, 10)
      $("#" + data.contextId).html(progress + "%");
    },
    done: function(e, data) {
      //updateWorkspace(data.result);
      $("#" + data.contextId).html('<img src="' + data.result.image.url + '" />');
      console.log(data);
    }
  });

  $(".event-picture-preview").live("click", function() {
    $("#event_image").val( $("img", this).attr("src") );
    $(".form-events").submit();
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


  


};

