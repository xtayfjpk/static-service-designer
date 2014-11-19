$(function(){
	//关闭其它遮罩
    $("body").click(function(){
    	if(getLeftWindow().maskShown) {
	    	getLeftWindow().showMask(false);
    	}
    	if(getBottomWindow().maskShown) {
	    	getBottomWindow().showMask(false);
    	}
    	if(getCenterWindow().maskShown) {
	    	getCenterWindow().showMask(false);
    	}
    	if(getTopWindow().maskShown) {
	    	getTopWindow().showMask(false);
    	}
    });
});

function Submit_onclick(){
	var frameset = parent.document.getElementsByTagName("frameset");
	$(frameset).each(function(index){
		if(frameset[index].id == "contentFrame" ){
			var frame = $(this);
			if(frame.attr("cols") == "240,7,*") {
				var midWidth = frame.width()*0.6+240;
				frame.attr("cols","0,7,*");
				$("#ImgArrow").attr("src", "../sketch/images/switch_right.gif").attr("alt","打开左侧导航栏");
			} else {
				frame.attr("cols","240,7,*");
				$("#ImgArrow").attr("src", "../sketch/images/switch_left.gif").attr("alt","隐藏左侧导航栏");
			}
		}
	});
}

var maskShown = false;
//显示或隐藏遮罩
function showMask(_show) {
	if(_show) {
   		$('#myModal').modal("show");
   		maskShown = true;
	} else {
		$('#myModal').modal("hide");
		maskShown = false;
	}
}

//获取左侧组件列表窗口window对象
function getLeftWindow() {
	return window.parent.frames["leftNavFrame"];
}
//获取中央画布窗口window对象
function getCenterWindow() {
	return window.parent.frames["midCavasFrame"];
}
//获取顶部窗口window对象
function getTopWindow() {
	return window.parent.frames["topFrame"];
}
//获取底部窗口window对象
function getBottomWindow() {
	return window.parent.frames["footFrame"];
}