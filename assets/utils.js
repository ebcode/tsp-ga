canvas = function(w,h,className){	
    var canvas_element = document.createElement('canvas');
    canvas_element.width=w;
    canvas_element.height=h;
    canvas_element.className=className;
    return canvas_element;
}

span = function (color){
	sp = document.createElement('span');
	sp.style.color=color;
	return sp;
}

clearCanvas = function(g){
    g.clearRect(0,0,w,h);
}
