var hWidth = 780;
var hHeight = 520;
//var oHeight = 150;
var shift = 0;

$(window).load(function(){
	
	
	//get full width of all slides
	var width = 0;
	$('.holder ul li').each(function() {
	    width += $(this).outerWidth( true );
	});
	$(".holder ul").css({'width':width});//sel ul width (all slides together)

	//Click hold and scroll
	var x,y,top,left,down;

	$(".holder").mousedown(function(e){
	    e.preventDefault();
	    down=true;
	    x=e.pageX;
	    //y=e.pageY;
	    //top=$(this).scrollTop();
	    left=$(this).scrollLeft();
	});
	
	$("body").mousemove(function(e){
	    if(down){
	        var newX=e.pageX;
	        var newY=e.pageY;
	        
	        //console.log(y+", "+newY+", "+top+", "+(top+(newY-y)));
	        
	        $(".holder").scrollTop(top-newY+y);    
	        $(".holder").scrollLeft(left-newX+x);    
	    }
	});
	
	$("body").mouseup(function(e){down=false;});
	
	
	//double click to zoom
	var divdbl = $(".holder ul li");
	divdbl.dblclick(function () { 
		var position = $(this).parent().children().index(this);
		var lWidth = 0;
		$('.holder ul li').each(function(){
			var p = $(this).parent().children().index(this);
			(p<position) ? lWidth+=$(this).outerWidth( true ) : lWidth;
		});
		var tracker = $(this).attr("class");
		var tWidth = $(this).outerWidth( true );
		tracker = "."+tracker;
		tChild = tracker+" div";
		//alert(tWidth);
		//alert((hWidth-tWidth)+hWidth);
		shift = hWidth-tWidth;
		var mWidth = width + shift;
		$(".holder ul").animate({'width':mWidth},500);
		setTimeout(function(){
			$(tracker).animate({'width':hWidth, 'height':hHeight}, 500);
			$(".holder ul").animate({'left':(lWidth*(-1))}, 500);
			$(tChild).animate({'width':10,'height':10});
			$(tracker).addClass("active");
		}, 500);
	});
	
	$("#out").click(function(){		

		$('.holder ul li').each(function(){
			$(this).removeClass("active");
			var oWidth = $(this).attr("alt");
			var cChild = $(this).attr("class");
			cChild = "."+cChild+" .year";
			$(this).animate({'width':oWidth},500);
			$(".holder ul").animate({'width':width, 'left':0}, 500);
			$(cChild).animate({'width':2,'height':2}, 500);
		});

	});

});