/**
 * Created by zj on 14-10-15.
 */
function BeanDefinition(_class) {
    this.class = _class;
    this.propertyDefinitions = [];
    this.id = "";
}

/**
 * 转换成服务定义相关数据
 * @returns {{}}
 */
BeanDefinition.prototype.toServiceDefinition = function() {
    var definition = {};
    definition.class = this.class;
    definition.id = this.id;
    for(var i in this.propertyDefinitions) {
        var propertyDefinition = this.propertyDefinitions[i];
        if(propertyDefinition.isRef()) {//如果是引用属性
            var result = propertyDefinition.toServiceDefinition();
            if(result) {
                definition[propertyDefinition.name] = result;
            }
        } else {
            var value = propertyDefinition.getValue();
            if(value!=null && value!=undefined && ""!==value) {
                definition[propertyDefinition.name] = value;
            }
        }
    }
    return definition;
};


BeanDefinition.prototype.getPropertyDefinition = function(_name) {
    for(var i in this.propertyDefinitions) {
        if(this.propertyDefinitions[i].name==_name) {
            return this.propertyDefinitions[i];
        }
    }
    return null;
};

BeanDefinition.prototype.addPropertyDefinition = function(_propertyDefinition) {
    //_propertyDefinition.belongToId = this;
    this.propertyDefinitions.push(_propertyDefinition);
};

BeanDefinition.prototype.addPropertyDefinition2 = function(_propertyData) {
    var propertyDefinition = BeanDefinitionBuilder.buildPropertyDefinition(_propertyData, this);
    this.propertyDefinitions.push(propertyDefinition);
};

/**
 * 根据BeanDefinition ID搜索BeanDefinition
 * @param _beanDefinitionId
 * @returns {*}
 */
BeanDefinition.prototype.searchById = function(_beanDefinitionId) {
    if(this.id==_beanDefinitionId) {
        return this;
    }
    return this.getRefPropertyBeanDefinitionById(_beanDefinitionId);
};

/**
 * 根据BeanDefinition ID在当前BeanDefinition的所有引用属性所引用的BeanDefinition查找
 * @param _beanDefinitionId
 */
BeanDefinition.prototype.getRefPropertyBeanDefinitionById = function(_beanDefinitionId) {
    var targetBeanDefinition = null;
    for(var i in this.propertyDefinitions) {
        var propertyDefinition = this.propertyDefinitions[i];
        if(propertyDefinition.type.indexOf("ref-")!=-1) {//该属性为引用属性
            targetBeanDefinition = propertyDefinition.getRefBeanDefinitionById(_beanDefinitionId);
            if(targetBeanDefinition) {//如果有值了，说明已经找到了
                return targetBeanDefinition;
            }
        }
    }
    return targetBeanDefinition;
};

/**
 *  ID为_beanDefinitionId的在BeanDefinition查找名为_name的引用属性
 * @param _beanDefinitionId
 * @param _name
 * @returns {*}
 */
BeanDefinition.prototype.getRefPropertyDefinition = function(_beanDefinitionId, _name) {
    var beanDefinition = this.searchById(_beanDefinitionId);
    if(beanDefinition) {
        for(var i in beanDefinition.propertyDefinitions) {
            var propertyDefinition = beanDefinition.propertyDefinitions[i];
            if(propertyDefinition.type.indexOf("ref-")!=-1) {
                if(propertyDefinition.name==_name) {
                    return propertyDefinition;
                }
            }
        }
    }
    return null;
};

/**
 * 设置BeanDefinition ID 并且联动的将其各属性所属BeanDefinition ID设置好
 * @param _id ID
 */
BeanDefinition.prototype.setId = function(_id) {
    this.id = _id;
    for(var i in this.propertyDefinitions) {
        var propertyDefinition = this.propertyDefinitions[i];
        propertyDefinition.setBelongToId(_id);
    }
};

/**
 * 刷新ComponentDefinition属性配置表单
 * @param _compId 当前配置的ComponentDefinition ID
 * @param _beanId 引用属性所属Bean ID
 */
BeanDefinition.prototype.refreshPropertiesConfigForm = function(_compId, _beanId) {
    var me = this;
    var url = getComponentFragmentUrl(me.class);
    loadPropsConfigForm(me.id, url, function() {
        var form = getPropsConfigForm(me.id);
        form.append(getCompAndBeanIdHiddenHtml(_compId, me.id));
        jQuery.each(me.propertyDefinitions, function(_index, _propDef) {
            var selector = 'input[name="' + _propDef.name + '"],select[name="' + _propDef.name + '"]';
            var results = form.find(selector);
            if(results.length===0) {
                alert("名为" + _propDef.name + "属性在表单中未找到");
            } else {
                var target = jQuery(results.get(0));
                var cssClass = "";
                if(_propDef.isRef()) {
                    cssClass = propCssClasses.ref;
                    _propDef.refreshHtml(target);
                } else if(_propDef.isArrayOrList()) {
                    cssClass = propCssClasses.arrayOrList;
                    target.val(_propDef.getDisplayString());
                } else if(_propDef.isMap()) {
                    cssClass = propCssClasses.map;
                    target.value = _propDef.getDisplayString();
                    target.val(_propDef.getDisplayString());
                } else {//普通属性
                    cssClass = propCssClasses.normal;
                    target.val(_propDef.getValue());
                }
                target.addClass(cssClass);//添加类别标记
            }
        });
    });
};


/**
 * 判断是否是组件定义
 * @returns {boolean}
 */
BeanDefinition.prototype.isComponentDefinition = function() {
    //因为ComponentDefinition是通过Jquery.extends方法克隆过来的，已经丢失了类信息
    //var is = this instanceof ComponentDefinition;return is;//为什么返回false
    return this.inputs!=null;
};



/**
 * 在BeanDefinition ID为_beanDefinitionId的BeanDefinition中搜寻名这_propName的ArrayOrListPropertyDefinition
 * @param _beanDefinitionId BeanDefinition ID
 * @param _propName 属性名称
 * @returns {*}
 */
BeanDefinition.prototype.getArrayOrListPropertyDefinition = function(_beanDefinitionId, _propName) {
    var beanDefinition = this.searchById(_beanDefinitionId);
    if(beanDefinition) {
        for(var i in beanDefinition.propertyDefinitions) {
            var propertyDefinition = beanDefinition.propertyDefinitions[i];
            if(propertyDefinition.isArrayOrList()) {
                if(propertyDefinition.name==_propName) {
                    return propertyDefinition;
                }
            }
        }
    }
    return null;
};

/**
 * 在BeanDefinition ID为_beanDefinitionId的BeanDefinition中搜寻名这_propName的MapPropertyDefinition
 * @param _beanDefinitionId BeanDefinition ID
 * @param _propName 属性名称
 * @returns {*}
 */
BeanDefinition.prototype.getMapPropertyDefinition = function(_beanDefinitionId, _propName) {
    var beanDefinition = this.searchById(_beanDefinitionId);
    if(beanDefinition) {
        for(var i in beanDefinition.propertyDefinitions) {
            var propertyDefinition = beanDefinition.propertyDefinitions[i];
            if(propertyDefinition.isMap()) {
                if(propertyDefinition.name==_propName) {
                    return propertyDefinition;
                }
            }
        }
    }
    return null;
};


/**
 * Bean定义还原，如果是组件，则要将组件相关数据还原放到该方法外部，目的是为了还原BeanDefinition
 * 与ComponentDefinition共用此方法
 * @param _beanDefinition 从远程加载的组件定义数据
 * @param _isComp 是否是组件，否则为普通BeanDefinition
 */
BeanDefinition.prototype.restore = function(_beanDefinition, _isComp) {
    this.id = _beanDefinition.id;
    for(var i in this.propertyDefinitions) {
        var propertyDefinition = this.propertyDefinitions[i];
        var propName = propertyDefinition.name;
        if(_beanDefinition[propName]!=null && _beanDefinition[propName]!=undefined) {
            var propValue = _beanDefinition[propName];
            if(propertyDefinition.isRef()) {//为引用属性
                //如果是资源类型
                if(("string"===typeof(propValue)) && propValue.indexOf(resourcePropPrefix)!=-1) {
                    propertyDefinition.valueMode = RefPropertyDefinition.VALUE_MODE_RESOURCE;
                    var selectedResource = _beanDefinition[propName].split(refPropertySeparator)[1];
                    propertyDefinition.selectedResource = selectedResource;
                } else {
                    propertyDefinition.valueMode = RefPropertyDefinition.VALUE_MODE_CONFIG;
                    for(var i in propertyDefinition.beanDefinitions) {//迭代引用属性中的beanDefinitions
                        var beanDefinitionData = propertyDefinition.beanDefinitions[i];
                        //如果类名相等，则表示找到了需要还原的beanDefinitionData
                        if(beanDefinitionData.definition.class==propValue.class) {
                            propertyDefinition.selectedBeanDefinitionType = beanDefinitionData.type;
                            var beanDefinition = beanDefinitionData.definition;
                            //还原引用属性引用的BeanDefinition
                            beanDefinition.restore(propValue, false);
                            break;
                        }
                    }
                }
            } else if(propertyDefinition.isArrayOrList()) {//数组或列表属性
                propertyDefinition.value = propValue;
            } else if(propertyDefinition.isMap()) {//Map属性
                propertyDefinition.value = propValue;//ArrayOrList与Map特意分开判断，方便以后区别
            } else {
                propertyDefinition.value = propValue;
            }
        }
    }

    //因为传回来的数据只有outputs，所以只处理输出
    if(_isComp) {//只组件才有outputs
        for(var i in _beanDefinition.outputs) {
            var outputTransition = _beanDefinition.outputs[i];//transition
            var targetRef = outputTransition.targetRef;
            var className = targetRef.class;
            var loader = ComponentDefinitionLoader.getInstance();
            var outputComponentDefinition = loader.getComponentDefinitionByClassName(className, true);
            addNode(targetRef.x, targetRef.y, outputComponentDefinition);
            outputComponentDefinition.restore(targetRef, true);
        }
    }

};


//-------------------------------- ComponentDefinition -------------------------
/**
 * 组件定义类
 * @param _class 类名
 * @constructor
 */
function ComponentDefinition(_class) {
    BeanDefinition.call(this, _class);
    this.x = 0;
    this.y = 0;
    this.type = "";//组件类型，源组件，目的组件，流程组件，处理组件
    this.inputs = [];
    this.outputs = [];
}
ComponentDefinition.prototype = new BeanDefinition();
ComponentDefinition.TYPE_SOURCE = "source";
ComponentDefinition.TYPE_TARGET = "target";
ComponentDefinition.TYPE_GATEWAY = "gateway";
ComponentDefinition.TYPE_PROCESS = "process";
ComponentDefinition.TYPE_START = "start";

/**
 * 转换成服务定义相关数据
 * @returns {*}
 */
ComponentDefinition.prototype.toServiceDefinition = function() {
    //调用父类方法
    var definition = BeanDefinition.prototype.toServiceDefinition.call(this);
    definition.x = this.x;
    definition.y = this.y;

    //如果是目的组件则没有输出
    if(this.type!=ComponentDefinition.TYPE_TARGET) {
        definition.outputs = [];
        for(var i in this.outputs) {
            var transitionOutput = this.outputs[i];
            definition.outputs.push(transitionOutput.toServiceDefinition());
        }
    }
    return definition;
};


/**
 * 返回组件输入标签
 * @returns {string}
 */
ComponentDefinition.prototype.getInputLabel = function() {
    if(this.type===ComponentDefinition.TYPE_START) {
        return "";
    } else {
        return 'input';
    }
};
/**
 * 返回组件输出标签
 * @returns {string}
 */
ComponentDefinition.prototype.getOutputLabel = function() {
    if(this.type===ComponentDefinition.TYPE_TARGET) {
        return "";//目的组件无输出
    } else {
        return 'output';
    }
};

/**
 * 获取用于显示的列表ID
 * @returns {string}
 */
ComponentDefinition.prototype.getUlId = function() {
    return "ul-" + this.type + "-component-list";
};

/**
 * 添加transitionInput
 * @param _input
 * @param _override 如果已经存在(id相同)，是否替换原有transitionInput
 */
ComponentDefinition.prototype.addInput = function(_input, _override) {
    if(_override) {
        this.removeInput(_input);
    }
    this.inputs.push(_input);

};

/**
 * 移除输入连线
 * @param _input
 * @returns {*}
 */
ComponentDefinition.prototype.removeInput = function(_input) {
    for(var i in this.inputs) {
        var input = this.inputs[i];
        if(input.id===_input.id) {
            this.inputs.splice(i, 1);
            return input;
        }
    }
    return null;
};

/**
 * 添加transitionOutput
 * @param _Output
 * @param _override 如果已经存在(id相同)，则替换原有transitionOutput
 */
ComponentDefinition.prototype.addOutput = function(_Output, _override) {
    if(_override) {
        this.removeOutput(_Output);
    }
    this.outputs.push(_Output);
};

/**
 * 移除 _transitionOutput
 * @param _output
 * @returns {*}
 */
ComponentDefinition.prototype.removeOutput = function(_output) {
    for(var i in this.outputs) {
        var output = this.outputs[i];
        if(output.id===_output.id) {
            this.outputs.splice(i, 1);
            return output;
        }
    }
    return null;
};





//-------------------------------- BeanDefinitionBuilder -------------------------
/**
 * BeanDefinition建造者
 * @param _definitionData
 * @param _isComp
 * @constructor
 */
function BeanDefinitionBuilder(_definitionData, _isComp) {
    this.definitionData = _definitionData;
    this.isComp = _isComp;
}

/**
 * 构建BeanDefinition
 * @returns {BeanDefinition}
 */
BeanDefinitionBuilder.prototype.build = function() {
    var className = this.definitionData.bean.class;
    var beanDefinition = new BeanDefinition(className);
    if(this.isComp) {
        beanDefinition = new ComponentDefinition(className);
        beanDefinition.type = this.definitionData.bean.type;
    }
    beanDefinition.id = this.definitionData.bean.id;
    var properties = this.definitionData.properties;
    for(var i in properties) {
        //var propertyDefinition = BeanDefinitionBuilder.buildPropertyDefinition(properties[i]);
        //beanDefinition.addPropertyDefinition(propertyDefinition);
        beanDefinition.addPropertyDefinition2(properties[i]);
    }

    return beanDefinition;
};

/**
 * 构建属性定义
 * @param _prop 属性定义数据
 * @returns {*} 属性定义
 */
BeanDefinitionBuilder.buildPropertyDefinition = function(_prop) {
    var propertyDefinition = null;
    var valueType = _prop.type;
    if(valueType.indexOf("ref-")!=-1) {//如果值类型是引用类型
        propertyDefinition = new RefPropertyDefinition(_prop.name, _prop.value, _prop.type);
    } else if(valueType.indexOf("list-")!=-1 || valueType.indexOf("array-")!=-1){
        propertyDefinition = new ArrayOrListPropertyDefinition(_prop.name, _prop.value, _prop.type);
    } else if(valueType.indexOf("map-")!=-1) {
        propertyDefinition = new MapPropertyDefinition(_prop.name, _prop.value, _prop.type);
    } else if(_prop.inputType==PropertyDefinition.input_type_combo) {
        propertyDefinition = new ComboPropertyDefinition(_prop.name, _prop.value, _prop.type, _prop.selectValues);
    } else {
        propertyDefinition = new PropertyDefinition(_prop.name, _prop.value, _prop.type);
    }
    if(propertyDefinition instanceof RefPropertyDefinition) {//如果是引用属性，则要加载引用BeanDefinition
        propertyDefinition.loadRefBeanDefinitions();
    }

    if(_prop.required) {
        propertyDefinition.required = _prop.required;
    }
    if(_prop.inputType) {
        propertyDefinition.inputType = _prop.inputType;
    }
    propertyDefinition.desc = _prop.desc;
    propertyDefinition.comment = _prop.comment ? _prop.comment : "";
    return propertyDefinition;
};

/**
 * 构建ServiceDefinition BeanDefinition
 * @returns {*}
 */
BeanDefinitionBuilder.buildServiceDefinitionData = function() {
    var jsonData = {
        "bean" : {
            "id" : serviceDefinitionId,
            "class" : serviceDefinitionClass
        },
        "properties" : [{
            "name" : "serviceId",
            "value" : "",
            "type" : "string",
            "desc" : "服务ID",
            "required" : true,
            "comment" : "服务定义ID，必须唯一"
        }, {
            "name" : "description",
            "value" : "",
            "type" : "string",
            "desc" : "描述",
            "comment" : "服务定义描述"
        }, {
            "name" : "serviceName",
            "value" : "",
            "type" : "string",
            "desc" : "服务名称"
        }, {
            "name" : "vendor",
            "value" : "",
            "type" : "string",
            "desc" : "提供商"
        }, {
            "name" : "businessType",
            "value" : "",
            "type" : "string",
            "desc" : "业务类型"
        }, {
            "name" : "autoStart",
            "value" : false,
            "type" : "boolean",
            "desc" : "自启动",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }],
            "comment" : "是否自动启动"
        }, {
            "name" : "trace",
            "value" : false,
            "type" : "boolean",
            "desc" : "启用跟踪",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }],
            "comment" : "是否启用跟踪功能"
        }, {
            "name" : "enableMonitor",
            "value" : true,
            "type" : "boolean",
            "desc" : "路由监控",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }],
            "comment" : "是否启用监控功能"
        }, {
            "name" : "businessSequence",
            "value" : 1,
            "type" : "int",
            "desc" : "业务序列号"
        }]
    };

    var builder = new BeanDefinitionBuilder(jsonData, false);
    return builder.build();
};