/**
 * Created by zj on 14-10-15.
 */

//var contextPath = "/static-service-designer";
var serviceDefinitionClass = "com.kingyea.camel.runtime.ServiceDefination";
var startComponentClass = "com.kingyea.camel.runtime.component.StartComponent";
var nodeCode = "intranet-switchin";

var resourceMappingUrl = "../data/ResourceMapping.json";
var componentRegistryUrl = "../data/ComponentRegistry.json";
var refRegistryUrl = "../data/RefRegistry.json";
var fragmentRegistryUrl = "../data/FragmentRegistry.json";

var manualConfigRefPropValue = "__ref-prop-from-manual-config__";
var resourceRefPropValue = "__ref-prop-from-resource__";
var resourcePropPrefix = "resource-";
var serviceDefinitionId = "serviceDefinition";
var refPropertySeparator = "-";
var transitionIdSeparator = "_to_";
var expressionLanguages = ["ognl", "javascript", "el", "xpath"];
var transitionClass = "com.kingyea.camel.runtime.Transition";
var expressionTransitionClass = "com.kingyea.camel.runtime.ExpressionTransition";

var refConfigButtonCssClass = "ref-config";

var notComponentItemTitles = ["工程"];

var propCssClasses = {
    ref : "ref-prop",
    normal : "normal-prop",
    arrayOrList : "array-or-list-prop",
    map : "map-prop"
};

function ComponentDefinitionLoader() {
    this.loadSuccess = null;
    this.loadRefSuccess = null;
    this.componentRegistry = null;
    this.refMapping = null;
    this.resourceMapping = null;
    this.componentDefinitions = [];
    this.fragmentRegistry = {};
}

ComponentDefinitionLoader.instance = null;
ComponentDefinitionLoader.getInstance = function() {
    if(ComponentDefinitionLoader.instance==null) {
        ComponentDefinitionLoader.instance = new ComponentDefinitionLoader();
    }
    return ComponentDefinitionLoader.instance;
};

ComponentDefinitionLoader.prototype.load = function() {
    var loader = this;
    loader.refMapping = refMapping;
    loader.resourceMapping = resourceMapping;
    //加载代码片段注册表
    loader.fragmentRegistry = fragmentRegistry;
};

/** 加载所有组件定义 **/
ComponentDefinitionLoader.prototype.loadComponentDefinitions = function (){
    var loader = this;
    for(var i in componentDefinitions) {
        var componentDefinitionData = componentDefinitions[i];
        var builder = new BeanDefinitionBuilder(componentDefinitionData, true);
        var componentDefinition = builder.build();
        loader.componentDefinitions.push(componentDefinition);
    }
};


ComponentDefinitionLoader.prototype.getRefBeanDefinitionDatasByClassName = function(_class) {
    return this.refMapping[_class];
};

ComponentDefinitionLoader.prototype.getComponentDefinitionByClassName = function(_class, _clone) {
    for(var i in this.componentDefinitions) {
        var componentDefinition = this.componentDefinitions[i];
        if(componentDefinition.class==_class) {
            var clonedComponentDefinition = _clone ? jQuery.extend(true, {}, componentDefinition) : componentDefinition;
            return clonedComponentDefinition;
        }
    }
    return null;
};

ComponentDefinitionLoader.prototype.getResourcesByClassName = function(_class) {
    for(var key in this.resourceMapping) {
        if(key===_class) {
            var resources = this.resourceMapping[key];
            return resources.length==0 ? null : resources;
        }
    }
    return null;
};


//---------------------------------------------------工具函数------------------------------------------------
function getSimpleClassName(_class) {
    var lastIndex = _class.lastIndexOf(".");
    return _class.substr(lastIndex+1);
}