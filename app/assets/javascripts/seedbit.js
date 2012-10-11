var typewatch = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  }  
})();


// Script for our wysiwyg

var editors		= new Array();

var photo_focus	= new Array();
var photo_step	= new Array();

var max_size	= 5767168;

var textEditors = new Array();
var uploaders = new Array();
var uploadRuntime = '';

var toggles = {};
toggles['align']	= 	[ 'align-left', 'align-center', 'align-right', 'align-justify' ];
toggles['size']		= 	[ 'size-large', 'size-medium', 'size-small' ];
toggles['column']	= 	[ 'column-one', 'column-two' ];
toggles['style']	= 	[ 'style-bullet', 'style-number' ];


function initializeSponsorship( id ) {
	var $element		= $( '#'+id );

}


function initializeText( id ) {

	var $element		= $( '#'+id ),
		$eleBody		= $('#'+id+'-body'),
		$eleEditable	= $('#'+id+' .redactor_editor');

	$eleBody.redactor({
		toolbar: false,
		resize: false,
		removeStyles: true,
		removeClasses: true,
		observeImages: false,
		shortcuts: false,
		allowedTags: ['a','b','i','strong','em','p','u','br'],
		keyupCallback: function( obj, event ) {
			if( event.keyCode != 9 && event.keyCode != 16 ){
				typewatch(function() {
					saveRedactor( id, 'text' );
				}, 1000);
			}
		}
	});
	
	var $editor	= $eleBody.getEditor();
	
	$editor.addClass( $eleBody.attr('class') );
	
	$('#'+id+' .element-toolbar').containedStickyScroll({ duration: 100, container: $('#'+id) });
	
	// On Focus / Blur for redactor:
	$editor.unbind('focus blur')
		.bind('focus',function(e){
			$element.addClass('onfocus-editing');
			if( $element.hasClass('defaultState') ) { $element.removeClass('defaultState').addClass('unsaved'); }
		})
		.bind('blur',function(e){
			$element.removeClass('onfocus-editing focused');
			if( $element.hasClass('unsaved') ) { $element.addClass('defaultState'); }
		})
		.bind("click",function(e){
			if( $element.hasClass('unsaved') || $element.hasClass('defaultState') ){
				if( !$element.hasClass("focused") ) {
					selectAllText( this );
				}
				$element.addClass("focused");
			}
		})
		.bind("keydown",function(e){
			// dont acknowledge tab:
			if( e.keyCode == 9 ) { return; }

			if( e.keyCode==66 && (e.metaKey || e.ctrlKey) ) {
				// Bold:
				$eleBody.execCommand('bold');
			}
			if( e.keyCode==73 && (e.metaKey || e.ctrlKey) ) {
				// Italic:
				$eleBody.execCommand('italic');
			}
			if( e.keyCode==85 && (e.metaKey || e.ctrlKey) ) {
				// Italic:
				$eleBody.execCommand('underline');
			}
		})
		.bind("keyup",function(e){
			// does code need to be cleaned?
			// trying to fight against code outside of a tag:
			var code 	= $eleBody.getCode(),
				tag		= 'p',
				clean	= null;
				
			// Browser will place caret at front...
			if( e.keyCode == 9 ) {
				if( $element.hasClass('unsaved') || $element.hasClass('defaultState') )
					selectAllText( this );
				else
					moveCaretToEnd( this );
			}
				
			// clean the html:
			clean = cleaner( tag, code );
			if( clean !== null ){
				$eleBody.setCode( clean );
				moveCaretToEnd( this );
				$eleBody.syncCode();
			}

		});
	
}


function initializeHeader (id){
	var $element		= $( '#'+id ),
		$eleBody		= $('#'+id+'-body'),
		$eleEditable	= $('#'+id+' .redactor_editor');

	$eleBody.redactor({
		toolbar: false,
		resize: false,
		removeStyles: true,
		removeClasses: true,
		observeImages: false,
		shortcuts: false,
		paragraphy: false,
		allowedTags: [],
		keyupCallback: function( obj, event ) {
			if( event.keyCode != 9 && event.keyCode != 16 ){
				typewatch(function() {
					saveRedactor( id, 'header' );
				}, 1000);
			}
		}
	});

	var $editor	= $eleBody.getEditor();
	
	$editor.addClass( $eleBody.attr('class') );
	
	$('#'+id+' .element-toolbar').containedStickyScroll({ duration: 100, container: $('#'+id) });
	
	// On Focus / Blur for redactor:
	$editor.unbind('focus blur')
		.bind('focus',function(e){
			$element.addClass('onfocus-editing');
			if( $element.hasClass('defaultState') ) { $element.removeClass('defaultState').addClass('unsaved'); }
		})
		.bind('blur',function(e){
			$element.removeClass('onfocus-editing focused');
			if( $element.hasClass('unsaved') ) { $element.addClass('defaultState'); }
		})
		.bind("click",function(e){
			if( $element.hasClass('unsaved') || $element.hasClass('defaultState') ){
				if( !$element.hasClass("focused") ) {
					selectAllText( this );
				}
				$element.addClass("focused");
			}
		})
		.bind("keydown",function(e){
			
			// check if code ends with <br></tag> ... if not, do it:
			if( e.keyCode == 13 && !e.shiftKey ){
				var code 	= $.trim( $eleBody.getCode() ),
					tag 	= 'h3';
					
				if( $eleBody.hasClass( 'header-size-large' ) ) 			
					tag = 'h1';
				else if( $eleBody.hasClass( 'header-size-medium' ) ) 	
					tag = 'h2';
				
				var lowCode = code.toLowerCase(),
					ending	= "<br></"+tag+">",
					endIX	= code.length - ending.length;

				// Webkit...
				if( $.browser.webkit && lowCode.lastIndexOf( ending ) < endIX ) {
					// make code end with <br> inside end tag:
					var endTagIX = lowCode.lastIndexOf( "</"+tag+">" ),
						newCode	= code.substr( 0, endTagIX ) + "<br></"+tag+">";
					$eleBody.setCode( '' );
					$eleBody.insertHtml( newCode );
				}
				
				// Mozilla...
				if( $.browser.mozilla ) {
					// only thing to do here is check for space at the
					// end of a line and hack the default behavior of 
					// double-spacing automatically (thats a redactor bug?)
					var mozEnd = " <br></"+tag+">",
						startIX = lowCode.lastIndexOf( mozEnd );
					if( startIX >= 0 ) {
						// add a space inside end tag:
						var newCode	= code.replace( mozEnd, "<br></"+tag+">" );
						$eleBody.setCode( '' );
						$eleBody.insertHtml( newCode );
					}
				}

			}
			
		})
		.bind("keyup",function(e){

			/**/
			// does code need to be cleaned?
			// trying to fight against code outside of a tag:
			var code 	= $eleBody.getCode(),
				tag		= 'h3',
				clean	= null;
				
			// Browser will place caret at front...
			if( e.keyCode == 9 ) {
				if( $element.hasClass('unsaved') || $element.hasClass('defaultState') )
					selectAllText( this );
				else
					moveCaretToEnd( this );
			}
				
			if( $eleBody.hasClass( 'header-size-large' ) ) 			
				tag = 'h1';
			else if( $eleBody.hasClass( 'header-size-medium' ) ) 	
				tag = 'h2';
				
			if( $.browser.msie && e.keyCode == 13 && !e.shiftKey ) {
				// MSIE will end in <p>&nbsp;</p> on return
				// hack this into a line break inside the header tag:
				
				// IE8: get rid of physical line-breaks in the code:
				if( $.browser.version < 9 ) code = code.replace(/(\r\n|\n|\r)/gm,"");
				
				var lowCode = code.toLowerCase(),
					ieEnd = "</"+tag+"><p>&nbsp;</p>",
					startIX = lowCode.lastIndexOf( ieEnd );
				if( startIX >= 0 ) {
					if( $.browser.version < 9 ) ieEnd = "</"+ tag.toUpperCase() +"><P>&nbsp;</P>";
					// add a break inside end tag:
					code = code.replace( ieEnd, "<br></"+tag+">" );;
					$eleBody.setCode( '' );
					$eleBody.insertHtml( code );
					moveCaretToEnd( this );
				}
			}

			clean = cleaner( tag, code );
			if( clean !== null ){
				$eleBody.setCode( '' );
				$eleBody.insertHtml( clean );
				
				// IE9+ at least:
				if( $.browser.msie ) moveCaretToEnd( this );
			}
			
			if( e.keyCode == 13 && !e.shiftKey ){

				// trick so cursor is at end....
				var clean = $eleBody.getCode();
				
				if( $.browser.mozilla ){
					var endTagIX = clean.lastIndexOf( "</"+tag+">" ),
						clean	= clean.substr( 0, endTagIX ) + "&nbsp;</"+tag+">";
				}
				
				$eleBody.setCode( '' );
				$eleBody.insertHtml( clean );
				
			}
			
			/**/
		});
}

// Redactor Utils:
// Example 1: cleaner('h1', '<h1>th</h1>is'); // Output: "<h1>this</h1"
// Example 2: cleaner( "p", "<p>this is the <b>worst</b> thing.</p><p>but th</p>is is even worse." ); // Output: "<p>this is the <b>worst</b> thing.</p><p>but this is even worse.</p>"
function cleaner( tag, string ) {
	var string = $.trim( string.replace(/(\r\n|\n|\r)/gm," ") ),
	    pattern = "^((?:(?!<"+tag+">).)*)(<"+tag+">)(.*)(</"+tag+">(?!.*</"+tag+">))(.*)$",
	    // pattern using "h1": ^((?:(?!<h1>).)*)(<h1>)(.*)(</h1>(?!.*</h1>))(.*)$
	    re = new RegExp( pattern, "gi" ),
	    matches = re.exec( string );
	    
	    //console.log( "string: "+ string );
	    //console.log( matches );
	    
	    if( matches === null ) {
	    	// @todo: enhance line:
	    	string = strip_tags( string, "<br>" );
	        // has no tags present. wrap it up:
	        return "<"+tag+">"+string+"</"+tag+">";
	    }
	    else if ( matches.length ) {
	        if( matches[1]=="" && matches[5]=="" )
	            return null; // no changes necessary
	        else
	        	matches_1 = strip_tags( matches[1], "<br>" );
	        	matches_5 = strip_tags( matches[5], "<br>" );
	            return matches[2]+matches_1+matches[3]+matches_5+matches[4];
	    }
}

function strip_tags(input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function getToggles( id ) {
	var myToggles = {},
		hasToggles = false;
	$( '#'+id ).find('.toggle').each(function(){
		var $this = $(this),
			field = $this.attr('data-field'),
			value = $this.attr('data-value');
			
		myToggles[field] = value;
		hasToggles = true;
	});
	return hasToggles ? myToggles : '';
}

function saveRedactor( id, type ) {
	var value = {
		id : id,
		type : type,
		value : $('#'+id+'-body').getCode(),
		toggles : getToggles( id )
	};
	$( '#'+id ).data( value );
	saveElement( id );
}
 function saveElement( id, isNew ) {
	
	var $element 		= $( "#"+id ),
		value					= $element.data('value') || '',
		type				= $element.data('type') || '',
		serverId	= id.substring(2) || '',
		// mioImages			= $element.data('images') || '',
		// mioLink				= $element.data('link') || '',
		toggles			= getToggles( id );
	
	showSaving();
	$('#btn-savenow').html('Save Now').removeClass('justsaved');
	
	if( type != '' ) {
		url = "/events/" + serverId + "/save_block";
		datas = { 
				id		: id,
				type 	: type,
				position: $element.parent().children().index($element), //$("#main").find(".element:visible").index( $element ),
				isNew 	: isNew || false,
				content	: value,
				details : toggles!='' ? JSON.stringify( toggles ) : ''
				//images 	: ( mioImages!='' ) ? JSON.stringify( {"images":mioImages} ) : '',
				//link 	: mioLink
			};

		$.post(url, datas, function( data, textStatus, jqXHR ) {

		});

		// $.ajax({
		// 	type: 'POST',
		// 	data: { 
		// 		tackk 	: $("#staticCode").text(),
		// 		id		: id,
		// 		type 	: type,
		// 		order 	: $("#main").find(".element:visible").index( $element ),
		// 		isNew 	: isNew || false,
		// 		value 	: value,
		// 		images 	: ( mioImages!='' ) ? JSON.stringify( {"images":mioImages} ) : '',
		// 		link 	: mioLink//,
		// 		//toggles : mioToggles!='' ? JSON.stringify( mioToggles ) : ''
		// 	},
		// 	url: 'php/ajax/saveElement.php',
		// 	success: function( data, textStatus, jqXHR ) {
			
		// 		var response = $.parseJSON( data );
		// 		if( response.error == 0 ) {
				
		// 			hideSaving();
		// 			$('#expires').html( response.expires );
		// 			if( !isNew ) $element.removeClass('defaultState unsaved');
					
		// 			if( strip_tags( value ).toLowerCase().replace(/[^a-z]+/g,'') == 'doabarrelroll' ) {
		// 				doABarrelRoll();
		// 			}
					
		// 		} else {
		// 			showError( response.description );
		// 		}
				
		// 	}
		// });

	} else {
		// no element type for some reason:
		hideSaving();
		//showError( "There was a problem saving your tackk info" );
	}
}

function showSaving(){

}

function hideSaving(){


}


/* 	Initialize my event 
		Usually called at document.ready, 
			but this must be called afer ajax call which bring the event from server
*/

var initializeEvent = function(){
	var $my_event = $(".event-timeline");

	//All links should open in a new window:
	$my_event.find("li.element.text,li.element.list").children("div:not(.element-edit)").find("a").attr("target","_blank");


	// initializeToggles:
	// takes care of all current & future elements:
	$my_event.on( "click", ".toggle", function(e){
		
		e.preventDefault();
	
		var $this		= $(this),
			$element	= $this.parents('.element'),
			elementId 	= $element.attr('id'),
			type 		= $element.attr('data-type'),
			field 		= $this.attr('data-field'),
			eleToggles 	= $.extend(true, {}, toggles); // Deep copy
			
		// Remove any toggles that arent allowed for this element type:
		switch( type ) {
			case 'header':
			case 'button':
				// remove justify:
				var ix = $.inArray( "align-justify", eleToggles['align'] );
				if( ix >= 0 ) {
					eleToggles['align'].splice( ix, 1 );
				}
				break;
		}
		
		var current		= $this.attr('data-value'),
			next		= eleToggles[field][($.inArray(current, eleToggles[field]) + 1) % eleToggles[field].length],
			$eleBody 	= $('#'+elementId+'-body');
		
		// Update the toggle attrs:
		$this.removeClass().addClass( "toggle tool-"+next );
		$this.attr( "data-value", next );
			
		// Some additional processing:
		if( type=='header' && field=='size' ) {
		
			// For change to header size...:
			var bodyCode = $eleBody.getCode();
			
			// Change <h1> to <h2>, etc
			switch ( next ) {
				case 'size-small':
					// turn <h2> into <h3>
					bodyCode = bodyCode.replace(/<h2/gi,'<h3').replace(/<\/h2>/gi,'</h3>');
				break;
				case 'size-medium':
					// turn <h1> into <h2>
					bodyCode = bodyCode.replace(/<h1/gi,'<h2').replace(/<\/h1>/gi,'</h2>');
				break;
				case 'size-large':
					// turn <h3> into <h1>
					bodyCode = bodyCode.replace(/<h3/gi,'<h1').replace(/<\/h3>/gi,'</h1>');
				break;
			}
			// Set editor contents to new code
			$eleBody.setCode( bodyCode );
			
		}
		
		
		// Check if the element has a body - add the new style:
		if( $eleBody.length > 0 ) {
			$eleBody.removeClass( type+'-'+current ).addClass( type+'-'+next );
			$eleBody.getEditor().removeClass( type+'-'+current ).addClass( type+'-'+next );
		}
		
		// Check if the element has a button area and add the new style:
		var $eleButton 		= $element.find('.button_show'),
			$eleEditButton 	= $element.find('.button-input_area');
		
		if( $eleButton.length > 0 ) {
			$eleButton.removeClass( type+'-'+current ).addClass( type+'-'+next );
		}
		if( $eleEditButton.length > 0 ) {
			$eleEditButton.removeClass( type+'-'+current ).addClass( type+'-'+next );
		}
		
		// Save appropriately, should be an easier way to do this
		switch( type ) {
			case 'button':
				saveButton( elementId );
				break;
			case 'header':
			case 'text':
			case 'list':
			default:
				saveRedactor( elementId, type );
				break;

		}
		
	});
	
	$my_event.on( "click", ".tool-text-underline a", function(e){
		
		e.preventDefault();
		
		var $this		= $(this),
			$element	= $this.parents('.element'),
			elementId 	= $element.attr('id'),
			$eleBody 	= $('#'+elementId+'-body');
		
		$eleBody.execCommand('underline');
		saveRedactor(elementId,'text');
		
	});
	// end of initializeToggles
	
	$my_event.on( "click", ".position-up", function(e){
			
		e.preventDefault();
		
		var $element = $(this).closest('li.element'),
			elementId	= $element.attr('id'),
			prevOrder	= $element.parent().children(".element:visible").index($element),
			nextOrder	= prevOrder > 0 ? prevOrder - 1 : 0;
		
		// already the first element, dont bother	
		if( prevOrder == 0 ) return;
		
		$element.insertBefore( $element.prevAll('li.element')[0] );
		saveElementOrder( elementId, prevOrder, nextOrder );
		 
	});
	
	$my_event.on( "click", ".position-down", function(e){

		e.preventDefault();
		
		var $element = $(this).closest('li.element'),
			elementId	= $element.attr('id'),
			numElements = $element.parent().children(".element:visible").length,
			prevOrder	= $element.parent().children(".element:visible").index($element),
			nextOrder	= prevOrder == numElements-1 ? prevOrder : prevOrder + 1;

		// already the last element, dont bother
		if( prevOrder >= numElements-1 ) return;
		
		$element.insertAfter( $element.nextAll('li.element')[0] );		
		saveElementOrder( elementId, prevOrder, nextOrder );
	});
	// End Position Change Functions

	$("#link-url").keyup(function(e){
		if (e.keyCode == '13') {
			e.preventDefault();
			$("#btn-add_link").click();
		}
	});

	$("input#url-input").blur(function(){
		setURL();
	});
	
	$("input#url-input").keyup( function() {
		$('#url-checker').removeClass().addClass('url-checking');
		$("input#url-input").val( $("input#url-input").val().replace(/ /g,'-') );
		typewatch(function() {
			checkURL();
		}, 1000);
	});
	
	$(document).keydown(function(e) {
		var input = $(document.activeElement).is("input");
		var text = $(document.activeElement).is("div");
		var textarea = $(document.activeElement).is("textarea");
        if(e.keyCode === 8 && !input && !text && !textarea){ 
			e.preventDefault(); 
		}; 
	});


	
	// $.mask.definitions['~']='[0-9A-Za-z- ]';
	// $("#url-input").mask(root+"~~~?" + str_repeat( "~", 125 ),{
	// 	placeholder:"",
	// 	completed:function(){alert("maximum url length!");}
	// });
	
 //    $("#custom-url input").autoGrowInput();
 //    $("#custom-url input").blur();
	
	// if( editable == true ) {
	initializeAdditor();
	// }
	
};


function saveElementOrder( id, prevOrder, nextOrder ) {
	
	showSaving();
	$('#btn-savenow').html('Save Now').removeClass('justsaved');
	
	if( prevOrder != nextOrder ){

		//erverBlockId = id.substring(2) || '';
		var $element		= $( '#'+id );
		var serverSectionId = $element.closest('article').attr('id').substring(3) || '';

		var url = "/events/" + serverSectionId + "/save_block_order";

		var data = {
				//sectionId : serverSectionId,
				oldOrder : prevOrder,
				newOrder : nextOrder
		}

		$.post(url, data, function( data, textStatus, jqXHR ) {
			}
		);
		
		// $.ajax({
		// 	type: 'POST',
		// 	data: { 
		// 		//tackk :	$("#staticCode").text(), 
		// 		block : id.substring(2) || '',
		// 		oldOrder : prevOrder,
		// 		newOrder : nextOrder
		// 	},
		// 	url: 'php/ajax/saveElementOrder.php',
		// 	success: function( data, textStatus, jqXHR ) {
			
		// 		var response = $.parseJSON( data );
		// 		if( response.error == 0 ) {
				
		// 			hideSaving();
		// 			$('#expires').html( response.expires );
					
		// 		} else {
		// 			showError( response.description );
		// 		}
				
		// 	}
		// });
		
	} else {
		hideSaving();
	}
	
}

function initializeAdditor() {
	$('.add_content-bar ul li.enabled').unbind( 'click' );
	$('.add_content-bar ul li.enabled').click(function(){
		var target = $(this);
		var type = $(this).attr( 'data-type' );
		
		var sectionId = target.closest('article').attr('id').substring(3) || '';
		var url = "/events/create_block";
		var datas = { 
				type : type,
				sectionId : sectionId 
		};
		
		$.post(url, datas, function( data, textStatus, jqXHR ) {
			target.closest(".layout").find(".blankcanvas").slideUp();
			target.closest('.add_content-bar').before( data );
			initializeAdditor();
			//saveElement( $(data).attr('id'), true ); // save after addition
			saveRedactor($(data).attr('id'), type);
		});

		// $.ajax({
		// 	type: 'POST',
		// 	data: { type : type },
		// 	url: 'php/elements/render/inject.php',
		// 	success: function( data, textStatus, jqXHR ) {
		// 		$("#blankcanvas").slideUp();
		// 		target.closest('.add_content-bar').before( data );
		// 		initializeAdditor();
		// 		saveElement( $(data).attr('id'), true ); // save after addition
		// 	}
		// });
		$(this).closest('.add_content-bar').find('.close-add_content').click();
	});
	
	$("div.element-add_mini").unbind( 'click' );
	$("div.element-add_mini").click(function() {
		$('#roam-bar').hide();
		$(this).closest('li.element').before($('#roam-bar'));
		$('#roam-bar').animate({ opacity: ['toggle', 'swing'], height: ['toggle', 'swing']}, 400, 'linear');
		//$(this).parent().parent().prev("li.add_content-bar").animate({ opacity: ['toggle', 'swing'], height: ['toggle', 'swing']}, 400, 'linear');
	});
	
	$("div.close-add_content").unbind( 'click' );
	$("div.close-add_content").click(function() {
		$(this).parent("li.add_content-bar").animate({ opacity: ['toggle', 'swing'], height: ['toggle', 'swing']}, 400, 'linear', function(){ $("#last-bar").after( $("#roam-bar") ); });
	});

	// $(".element-add_mini, .element-position div").tipsy({gravity: 'e', delayIn: 600, delayOut: 0});
	// $(".element-toolbar li").tipsy({gravity: 'w', delayIn: 600, delayOut: 0});

	$(".element-add_mini, .element-position div, .element-toolbar li, .add_content-bar li").disableSelection();


	$("li.last-bar").unbind('hover');
	$("li.last-bar").hover(function() {
			lastBar = this;
	    $(".add_more_stuff", lastBar).stop(true, true).fadeOut(0, function() {
	        $(".last-bar_icons", lastBar).animate({ opacity: ['show', 'swing']}, 200, 'linear', function(){ $(".add_more_stuff", lastBar).hide(); }); // just make sure they never show at same time
	    });
	}, function(){
		lastBar = this;
		$(".last-bar_icons", lastBar).stop(true, true).animate({ opacity: ['hide', 'swing']}, 200, 'linear', function() {
	        $(".add_more_stuff", lastBar).fadeIn(0);
	    });
	});

}