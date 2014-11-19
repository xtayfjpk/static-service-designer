var preClassName = "";
var outlookbar = null; //初始化在leftNavFrame.jsp
var navViewType= 1; //0:图标视图  1:文字视图


function changeView(type){
    if(navViewType == type){
        //nothing
    } else {
        navViewType = type;
        if(!preClassName){
            var sortname = $("#cookie_sortname")[0].value;
            initinav(sortname,outlookbar)
        } else {
            var item = $("#cookie_currentItemId")[0].value;
            console.log(item);
            list_sub_detail(preClassName, item)
        }
    }
}
/**
 * 显示二级目录
 * @param id
 * @param item
 */
function list_sub_detail(id, item){
    if(preClassName != ""){
        $("#"+preClassName)[0].className = "left_back";
    }
    var obj = $("#"+id);
    if(obj[0].className == "left_back"){
        obj[0].className = "left_back_onclick";
        outlookbar.getbyitem(item);
        preClassName = id;
    };
};
/**
 * 目录对象
 * @param intitle
 * @param insort
 * @param inkey
 * @param inisdefault
 */
function theitem(intitle, insort, inkey, inisdefault){
    this.sortname = insort;
    this.key = inkey;
    this.title = intitle;
    this.isdefault = inisdefault ;
}
/**
 * 导航栏对象
 */
function outlook() {
    var outlookbar = this;

    this.titlelist 	= new Array();
    this.itemlist 	= new Array();
    /**
     * 添加专栏
     * @param intitle  栏目名称
     * @param sortname 栏目分类
     * @param inisdefault 是否是默认专栏(默认专栏在初始化时默认显示)
     * @returns 栏目序列号
     */
    this.addtitle 	= function(intitle, sortname, inisdefault){
        outlookbar.itemlist[outlookbar.titlelist.length] = new Array();
        outlookbar.titlelist[outlookbar.titlelist.length] = new theitem(intitle, sortname, 0, inisdefault);
        return(outlookbar.titlelist.length - 1)
    };
    /**
     * 添加专栏项目
     * @param intitle  项目所属专栏名称
     * @param parentid 项目所属专栏序列号
     * @param inkey    项目所属动作
     * @returns 项目序列号
     */
    this.additem 	= function(intitle, parentid, inkey){
        if(parentid >= 0 && parentid <= outlookbar.titlelist.length) {
            insort = "item_" + parentid;
            outlookbar.itemlist[parentid][outlookbar.itemlist[parentid].length] = new theitem(intitle, insort, inkey, 0);
            return(outlookbar.itemlist[parentid].length - 1)
        } else {
            additem = - 1
        }
    };
    /**
     * 显示某分类下栏目
     * @param sortname 分类标识
     */
    this.getbytitle = function(sortname) {
        var output = "<ul>";
        for(i = 0; i < outlookbar.titlelist.length; i ++ ) {
            if(outlookbar.titlelist[i].sortname == sortname) {
                output += "<li id=left_nav_" + i + " onclick=\"list_sub_detail(id, '"+outlookbar.titlelist[i].title+"')\" class=left_back>" + outlookbar.titlelist[i].title + "</li>"
            }
        }
        output += "</ul>";
        $('#left_main_nav').html(output);

        $("#cookie_sortname")[0].value = sortname;
    };

    /**
     * 显示某栏目下的项目
     * @param item 栏目名称
     */
    this.getbyitem 	= function(item) {
        var output = $('#right_main_nav_view').html();
        var i = 0;
        for(i = 0; i < outlookbar.titlelist.length; i ++ ) {
            if(outlookbar.titlelist[i].title == item) {
                output += "<div class=list_tilte id=sub_sort_" + i + " onclick=\"hideorshow('sub_detail_"+i+"')\">";
                output += "<span>" + outlookbar.titlelist[i].title + "</span>";
                output += "</div>";

                var clazz = "list_detail_text_view";
                if(item == "工程"){
                    clazz = "ztree";
                }
                if(navViewType == 1){ //文字视图
                    output += "<div class="+clazz+" id=sub_detail_" + i + " style='display:block;'>";
                } else { //图标视图
                    output += "<div class="+clazz+" id=sub_detail_" + i + " style='display:block;'>";
                }
                output += "<ul>";
                for(j = 0; j < outlookbar.itemlist[i].length; j ++ ) {
                    output += getItemHtml(navViewType, i, j);
                }
                output += "</ul>";
                output += "</div>";
                break;
            }
        }
        $('#right_main_nav').html(output);

        if(item == "工程"){
            displayProjectView(i);
        }
        $("#cookie_currentItemId")[0].value= item;
    };

    /**
     * 显示默认栏目和某分类栏目
     * @param sortname 分类标识
     */
    this.getdefaultnav = function(sortname) {
        var output = $('#right_main_nav_view').html();
        for(i = 0; i < outlookbar.titlelist.length; i ++ ) {
            if(outlookbar.titlelist[i].isdefault == 1 && outlookbar.titlelist[i].sortname == sortname){
                output += "<div class=list_tilte id=sub_sort_" + i + " onclick=\"hideorshow('sub_detail_"+i+"')\">";
                output += "<span>" + outlookbar.titlelist[i].title + "</span>";
                output += "</div>";

                var clazz = "list_detail_text_view";
                if(outlookbar.titlelist[i].title == "工程"){
                    clazz = "ztree";
                }
                if(navViewType == 1){ //文字视图
                    output += "<div class="+clazz+" id=sub_detail_" + i + " style='display:block;'>";
                } else { //图标视图
                    output += "<div class="+clazz+" id=sub_detail_" + i + " style='display:block;'>";
                }
                output += "<ul>";
                for(j = 0; j < outlookbar.itemlist[i].length; j ++ ) {
                    output += getItemHtml(navViewType, i, j);
                }
                output += "</ul>";
                output += "</div>";
            }
        }
        $('#right_main_nav').html(output);
    };
    return outlookbar;
};


/**
 * 面板切换
 * @param divid
 */
function hideorshow(divid) {
    subsortid = "sub_sort_" + divid.substring(11);
    var navDiv = $("#"+divid);

    if(navDiv.css("display") == "none") {
        navDiv.css("display","block");
        $("#"+subsortid)[0].className = "list_tilte";
    } else {
        navDiv.css("display","none");
        $("#"+subsortid)[0].className = "list_tilte_onclick";
    }
}

/**
 * 初始化
 * @param sortname
 * @param outlookbar
 */
function initinav(sortname,outlookbar) {
    outlookbar.getbytitle(sortname);
    outlookbar.getdefaultnav(sortname);
}

/**
 * 判断该标题是否是ComponentDefinition类别
 * @param {} _title item标题
 */
function notComponentDefinitionItem(_title) {
    //notComponentItemTitles定义在designer.js中
    for(var i in notComponentItemTitles) {
        if(notComponentItemTitles[i]==_title) {
            return true;
        }
    }
    return false;
}

/**
 * 一个item为组件列表显示的每一条目，如FileNotifyComponent等，一个option为一选项卡，即item所属类别，如工程、源组件
 * @param {} _navViewType 视图类型，文字视图或图标视图
 * @param {} _i item X索引
 * @param {} _j item Y索引
 * @return {}
 */
function getItemHtml(_navViewType, _i, _j) {
    var output = "";
    var item = outlookbar.itemlist[_i][_j];
    var key = item.key;
    var itemTitle = item.title;
    var optionTitle = outlookbar.titlelist[_i].title;
    if(_navViewType == 1){ //文字视图
        output += "<li id=" + item.sortname + "_" +_j+ ">" +getSpanHtml(optionTitle, key, itemTitle)+ "</li>";
    } else { //图标视图
        output += "<li id=" + item.sortname + "_" +_j+ ">" +getSpanHtml(optionTitle, key, "")+ "</li>";
    }
    return output;
}

/**
 * 获取item中span的html字符串
 * @param {} _optionTitle 选项卡标题
 * @param {} _key item.key
 * @param {} _itemTitle item标题
 * @return {}
 */
function getSpanHtml(_optionTitle, _key, _itemTitle) {
    var notComponentItem = notComponentDefinitionItem(_optionTitle);
    var classHtml = notComponentItem ? "" : ' class="drag-item" ';//如果不是组件类型则不加拖拽class
    return '<span' + classHtml + ' lang="' +_key+ '">' +_itemTitle+ '</span>';
}

function displayProjectView(projectOption){

    var settings = {
        showLine : true,                  //是否显示节点间的连线
        checkable : false,
        data:{
            simpleData:{
                enable:true,
                idKey:'id',
                pIdKey:'pId',
                rootPid:0
            }
        }
    };
    var treeNodes = [
        {"id":1, 	"pId":0, 	"name":"法院前置"},
        {"id":2, 	"pId":0, 	"name":"公安前置"},
        {"id":3, 	"pId":0, 	"name":"检察院前置"},

        {"id":11, 	"pId":1, 	"name":"services"},
        {"id":12, 	"pId":1, 	"name":"services"},
        {"id":13, 	"pId":1, 	"name":"services"},

        {"id":111, 	"pId":11, 	"name":"FT001_FY_SMALL_SEND_GA"},
        {"id":112, 	"pId":11, 	"name":"FT002_FY_SMALL_SEND_JCY"},
        {"id":113, 	"pId":11, 	"name":"FT003_FY_SINGLE_SEND_GA"},

        {"id":1111, "pId":111, 	"name":"FT001_FY_SMALL_SEND_GA.xml"},
        {"id":1121, "pId":112, 	"name":"FT002_FY_SMALL_SEND_JCY.xml"},
        {"id":1131, "pId":113, 	"name":"FT003_FY_SINGLE_SEND_GA.xml"},


        {"id":121, 	"pId":12, 	"name":"FT001_GA_SMALL_RECV_FY"},
        {"id":121, 	"pId":12, 	"name":"FT003_GA_SINGLE_RECV_FY"},
        {"id":1211, "pId":121, 	"name":"FT001_GA_SMALL_RECV_FY.xml"},
        {"id":1211, "pId":121, 	"name":"FT003_GA_SINGLE_RECV_FY.xml"},

        {"id":131,  "pId":13, 	"name":"FT003_JCY_SMALL_RECV_FY"},
        {"id":1311, "pId":131, 	"name":"FT003_JCY_SMALL_RECV_FY.xml"}
    ];

    $(function(){
        var id="sub_detail_"+projectOption;

        var t = $("#"+id +" ul");
        console.log(t);
        t = $.fn.zTree.init(t, settings, treeNodes);
    });
}