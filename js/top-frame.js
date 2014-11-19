$(function() {
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
    	if(getSwitchWindow().maskShown) {
	    	getSwitchWindow().showMask(false);
    	}
    });

	//添加提示
	$("#div-operations button").each(function(){
		var btn = $(this);
		btn.addClass("btn").addClass("btn-default").attr("data-toggle","tooltip").attr("data-placement","left");
	});
	
	//移除组件
	$("#remove-component-definition-button").click(function(){
		getCenterWindow().removeSelectedComponentNode();
	});
	
	//编辑服务定义
	$("#edit-service-definition-button").click(function(){
		getCenterWindow().editServiceDefinition();
	});
	
});


//-----------------------------------工具函数--------------------------------
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
//获取底部窗口window对象
function getBottomWindow() {
	return window.parent.frames["footFrame"];
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