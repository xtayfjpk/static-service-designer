$(function(){
    //关闭其它遮罩    
    $("body").click(function(){
    	if(getLeftWindow().maskShown) {
	    	getLeftWindow().showMask(false);
    	}
    	if(getCenterWindow().maskShown) {
	    	getCenterWindow().showMask(false);
    	}
    	if(getTopWindow().maskShown) {
	    	getTopWindow().showMask(false);
    	}
    	if(getSwitchWindow().maskShown) {
	    	getSwitchWindow().showMask(false);
    	}
    });
});

var frameNames = ["topFrame", "leftNavFrame", "switchFrame", "midCavasFrame", "footFrame"];
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

//获取中央画布窗口window对象
function getCenterWindow() {
	return window.parent.frames["midCavasFrame"];
}
//获取左侧组件列表窗口window对象
function getLeftWindow() {
	return window.parent.frames["leftNavFrame"];
}
//获取折叠窗口window对象
function getSwitchWindow() {
	return window.parent.frames["switchFrame"];
}
//获取顶部窗口window对象
function getTopWindow() {
	return window.parent.frames["topFrame"];
}