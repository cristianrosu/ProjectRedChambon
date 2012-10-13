
var circ = Math.PI * 2;
var quart = Math.PI / 2;

function animateCircle(canvas) {
    var canv = $(canvas)
    var value = $(canv.children('.iv')[0]).text();
    var winJosAbs = $(window).scrollTop() + $(window).height();
    if (winJosAbs > $(canv).position().top + 80) {
        if ($(canv.children('.ia')[0]).text() == 0) {
            $(canv.children('.ia')[0]).text("1");
            canvas.addEvents({
                mouseenter: function () {
                    animate2(canvas, value / 1.25, value, drawCircle, 0);
                }
            });
            animate2(canvas, 0, value, drawCircle, 0);
        }
    }
}

function animateSeeds(canvas) {
    canvas = canvas[0];
    animate2(canvas, 0, 100, drawSeed, 1);
}

function drawSeed(canv, progress) {
    var ctx = canv.getContext('2d');
    var canv = $(canv);

    $(seedsData.Bars).each(function (index, bar) {
        var heightTotal = bar.total * (-progress / 60);
        var heightAvailable = bar.available * (-progress / 60);

        ctx.fillStyle = getColorById("" + bar.category);
        ctx.fillRect(44 * index, 170, 30, heightTotal);

        ctx.fillStyle = getColorById("" + bar.category);
        ctx.fillRect(44 * index, 170, 30, heightAvailable);

    });

}

function drawCircle(canv, value) {
    var ctx = canv.getContext('2d');
    var cType = $(canv).attr("data-type");

    var cSize = $(canv).attr("data-size");
    switch (cSize) {
        case "medium":
            var canvSize = 120;
            var circleRadius = 57;
            var textX = 35;
            var textY = 60;
            var text2X = textX + 2;
            var text2Y = textY + 20;
            var lineWidth = 6;
            var textMic = 14;
            var textMare = 27;
            break;
        case "small":
            var canvSize = 90;
            var circleRadius = 40;
            var textX = 25;
            var textY = 44;
            var text2X = textX - 1;
            var text2Y = textY + 15;
            var lineWidth = 5;
            var textMic = 12;
            var textMare = 21;
            break;
        case "mini":
            var canvSize = 66;
            var circleRadius = 30;
            var textX = 15;
            var textY = 40;
            var text2X = textX + 100;
            var text2Y = textY + 100;
            var lineWidth = 5;
            var textMic = 12;
            var textMare = 21;
            break;
        case "large":
        default:
            var canvSize = 156;
            var circleRadius = 70;
            var textX = 50;
            var textY = 80;
            var text2X = textX + 2;
            var text2Y = textY + 20;
            var lineWidth = 10;
            var textMic = 17;
            var textMare = 30;
            break;
    }
    var canvCenter = canvSize / 2;

    if (cType == "score") {
        var cText = "score";
        var cSemn = "";
        var textX = 60;
        var textY = 80;
        var text2X = textX - 3;
        var text2Y = textY + 20;
    } else {
        // var cText = "seeded";
        // var cSemn = "%";
        var cText = "SCORE";
        var cSemn = "%";
        var textX = 35;
        var textY = 60;
        var text2X = textX + 2;
        var text2Y = textY + 20;
    }

	var canv = $(canv);
	var colorId = $(canv.children('.ic')[0]).text();

	ctx.clearRect(0, 0, canvSize, canvSize);

	ctx.strokeStyle = getColorById(colorId);
	ctx.lineCap = 'triangle';
	ctx.lineWidth = lineWidth;
	
	ctx.beginPath();
	ctx.arc(canvCenter, canvCenter, circleRadius, -(quart), ((circ) * value / 100) - quart, false);
	ctx.stroke();

	if (value < 100) {
	    if (value == 0) {
	        value = 0.01;
	    }
	    ctx.beginPath();
	    ctx.strokeStyle = "#ddd";
	    ctx.arc(canvCenter, canvCenter, circleRadius, -(quart), ((circ) * value / 100) - quart, true);
	    ctx.stroke();
	    if (value < 10) {
	        textX += 5;
	    }
	}

	ctx.fillStyle = "#808080";
	ctx.font = "bold " + textMare + "px sans-serif"
	ctx.fillText(Math.floor(value).toString() + cSemn, textX, textY);

	ctx.font = textMic + "px sans-serif"
	ctx.fillText(cText, text2X, text2Y);
}

function animate2(canv, start, stop, func, effect) {

    var transition = 'bounce:out';
    var duration = 40 * stop

    if (effect == 1) {
        transition = 'cubic:out';
        duration = 2000;
    }

    var myFx = new Fx({
	    duration: duration,
		transition: transition,
		onStep: function(step){
			func(canv, step);
		}
	});
	
	myFx.set = function(now){
		var ret = Fx.prototype.set.call(this, now);
		this.fireEvent('step', now);
		return ret;
	};
	
	myFx.start(start, stop);
}

function getColorById(catID) {
    switch (catID) {
        case "1":
            return "#6ed811";
        case "2":
            return "#E90126";
        case "3":
            return "#008AE5";
        case "4":
            return "#FFCE00";
        case "5":
            return "#FE5D06";
        case "6":
            return "#5133AB"; 
            
        case "_1":
            return "#b7ec89";
        case "_2":
            return "#f58193";
        case "_3":
            return "#80c5f3";
        case "_4":
            return "#ffe780";
        case "_5":
            return "#ffaf83";
        case "_6":
            return "#a99ad6";
        default:
            return "#000000";
    }
}
