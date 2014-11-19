jQuery(function(){
	var loader = ComponentDefinitionLoader.getInstance();
    loader.load();
    loader.loadComponentDefinitions();
    listComponents();
    //关闭其它遮罩
    $("body").click(function(){
    	if(getBottomWindow().maskShown) {
	    	getBottomWindow().showMask(false);
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

function listComponents() {
	var loader = ComponentDefinitionLoader.getInstance();
	var componentDefinitions  = loader.componentDefinitions.sort(function(_definition1, _definition2){
        var class1 = getSimpleClassName(_definition1.class);
        var class2 = getSimpleClassName(_definition2.class);
        return class1.localeCompare(class2);
    });

	//导航栏配置文件
	outlookbar=new outlook();
	
	var projectOption = outlookbar.addtitle('工程', '系统设置', 1);
	//outlookbar.additem('文件交换', projectOption, "service-id");
	
	var allOption = outlookbar.addtitle('全部组件','系统设置',2);
	var sourceOption = outlookbar.addtitle('源组件','系统设置',2);
	var processOption = outlookbar.addtitle('处理组件','系统设置',2);
	var targetOption = outlookbar.addtitle('目的组件','系统设置',2);
	var gatewayOption = outlookbar.addtitle('流程组件','系统设置',2);
	jQuery.each(componentDefinitions, function(_index, _def) {
		outlookbar.additem(getSimpleClassName(_def.class), allOption , _def.class);
		if(_def.type===ComponentDefinition.TYPE_SOURCE) {
			outlookbar.additem(getSimpleClassName(_def.class), sourceOption , _def.class);
		} else if(_def.type===ComponentDefinition.TYPE_PROCESS) {
			outlookbar.additem(getSimpleClassName(_def.class), processOption , _def.class);
		} else if(_def.type===ComponentDefinition.TYPE_TARGET) {
			outlookbar.additem(getSimpleClassName(_def.class), targetOption , _def.class);
		} else if(_def.type===ComponentDefinition.TYPE_GATEWAY) {
			outlookbar.additem(getSimpleClassName(_def.class), gatewayOption , _def.class);
		} 
	});
	
	initinav("系统设置", outlookbar);

    //显示工程树图
    displayProjectView(projectOption);
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


//---------------------------------------关于拖拽代码------------------------------------
var dragReady = false;
var proxyHtml = "";
var currentDraggable = null;
var proxy = null;
var centerWindow = null;
jQuery(function() {
    proxy = jQuery('#proxy');
    centerWindow = getCenterWindow();
    jQuery('span.drag-item').live("mousedown", function(_event){
        dragReady = true;
        proxyHtml = '<span lang="' +$(this).attr("lang")+ '">' +$(this).html()+ '</span>';
        _event.preventDefault();
    });
    $(document).mousemove(function(_event){
        if(dragReady) {
            if(jQuery("#proxy:visible").length===0) {
                proxy.show();//两个proxy互斥显示
                centerWindow.hideProxy();
            }
            proxy.html(proxyHtml).css("left",_event.pageX).css("top", _event.pageY);
        }
    });

    jQuery(document).click(function(){
        stopDrag();
    });
    jQuery(document).mouseup(function(){
        stopDrag();
    });

});

function stopDrag() {
    proxy.hide();
    dragReady = false;
    proxyHtml = "";
}
function hideProxy() {
    proxy.hide();
}

function getCenterWindow() {
    return window.parent.frames["midCavasFrame"];
}
//获取底部窗口window对象
function getBottomWindow() {
	return window.parent.frames["footFrame"];
}
//获取折叠窗口window对象
function getSwitchWindow() {
	return window.parent.frames["switchFrame"];
}
//获取顶部窗口window对象
function getTopWindow() {
	return window.parent.frames["topFrame"];
}