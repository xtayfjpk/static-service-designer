var componentDefinitions = [
    {
        "bean" : {
            "id" : "fileNotifyComponent",//Bean ID
            "type" : "source", //组件类型
            "class" : "com.kingyea.esb.components.file.jnotify.FileNotifyComponent"//组件类名
        },//组件可配置属性
        "properties" : [{
            "name" : "notifyDirectory",//属性名称
            "value" : "",//属性默认值
            "type" : "string",//属性值类型
            "required" : true,//是否必须
            "inputType" : 0,//输入框类型
            "desc" : "监控目录"//属性描述
        }, {
            "name" : "notifySubtree",
            "value" : true,
            "type" : "boolean",
            "desc" : "监控子目录",
            "inputType" : 3,//如果是下拉列表框，要附加可选项信息
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "notifyMask",
            "value" : 15,
            "type" : "int",
            "desc" : "监控掩码"
        }, {
            "name" : "charset",
            "value" : "UTF-8",
            "type" : "int",
            "desc" : "字符编码"
        }, {
            "name" : "idempotent",
            "value" : "true",
            "type" : "boolean",
            "desc" : "使用幂等",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "idempotentRepository",
            "value" : "file",
            "type" : "ref-org.apache.camel.processor.idempotent.IdempotentRepository",//引用属性，以ref-开头
            "desc" : "幂等仓库",
            "inputType" : 4
        }]
    },
    {
        "bean" : {
            "id" : "filePollingComponent",
            "type" : "source",
            "class" : "com.kingyea.esb.components.file.FilePollingComponent"
        },
        "properties" : [{
            "name" : "directoryName",
            "value" : "",
            "type" : "string",
            "required" : true,
            "inputType" : 0,
            "desc" : "目录"
        }, {
            "name" : "delay",
            "value" : 1000,
            "type" : "int",
            "desc" : "延迟"
        }, {
            "name" : "noop",
            "value" : false,
            "type" : "boolean",
            "desc" : "noop"
        }, {
            "name" : "idempotentRepository",
            "value" : "",
            "type" : "ref-org.apache.camel.processor.idempotent.IdempotentRepository",
            "desc" : "密等仓库",
            "inputType" : 4
        }]
    },
    {
        "bean" : {
            "id" : "fileTargetComponent",
            "type" : "target",
            "class" : "com.kingyea.esb.components.file.FileTargetComponent"
        },
        "properties" : [{
            "name" : "directoryName",
            "value" : "",
            "type" : "string",
            "required" : true,
            "desc" : "目录名称"
        }, {
            "name" : "fileName",
            "value" : "",
            "type" : "string",
            "required" : true,
            "desc" : "文件名称"
        }, {
            "name" : "fileExist",
            "value" : "Override",
            "type" : "string",
            "desc" : "重名策略",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "覆盖",
                "value" : "Override"
            }, {
                "display" : "添加",
                "value" : "Append"
            }, {
                "display" : "抛出异常",
                "value" : "Fail"
            }, {
                "display" : "忽略",
                "value" : "Ignore"
            }, {
                "display" : "移走原有",
                "value" : "Move"
            }, {
                "display" : "生命名",
                "value" : "TryRename"
            }]
        }, {
            "name" : "tempFileName",
            "value" : "",
            "type" : "string",
            "desc" : "临时文件名称"
        }, {
            "name" : "moveExisting",
            "value" : "backup",
            "type" : "string",
            "desc" : "moveExisting"
        }, {
            "name" : "charset",
            "value" : "UTF-8",
            "type" : "string",
            "desc" : "字符编码"
        }]
    },
    {
        "bean" : {
            "id" : "jmsProducerComponent",
            "type" : "target",
            "class" : "com.kingyea.esb.components.protocol.jms.JmsProducerComponent"
        },
        "properties" : [{
            "name" : "componentName",
            "value" : "jms",
            "type" : "string",
            "desc" : "容器名称"
        }, {
            "name" : "destinationType",
            "value" : "queue",
            "type" : "string",
            "desc" : "目的类型",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "队列",
                "value" : "queue"
            }, {
                "display" : "主题",
                "value" : "topic"
            }]
        }, {
            "name" : "destinationName",
            "value" : "",
            "type" : "string",
            "desc" : "目的地名称",
            "required" : true
        }, {
            "name" : "connectionFactoryProvider",
            "value" : "hornetq",
            "type" : "ref-com.kingyea.esb.jms.ConnectionFactoryProvider",
            "desc" : "连接工厂提供者",
            "required" : false
        }]
    },
    {
        "bean" : {
            "id" : "mailSenderSourceComponent",
            "type" : "process",
            "class" : "com.kingyea.esb.components.protocol.mail.MailSenderSourceComponent"
        },
        "properties" : [{
            "name" : "host",
            "value" : "",
            "type" : "string",
            "required" : true,
            "desc" : "主机名"
        }, {
            "name" : "port",
            "value" : 25,
            "type" : "int",
            "desc" : "端口号"
        }, {
            "name" : "username",
            "value" : "",
            "type" : "string",
            "desc" : "用户名"
        }, {
            "name" : "password",
            "value" : "",
            "type" : "string",
            "desc" : "密码"
        }, {
            "name" : "name",
            "value" : "",
            "type" : "string",
            "desc" : "邮件标识"
        }, {
            "name" : "contentType",
            "value" : "text/plain",
            "type" : "string",
            "desc" : "内容类型"
        }, {
            "name" : "from",
            "value" : "",
            "type" : "string",
            "desc" : "发送者"
        }, {
            "name" : "to",
            "value" : "",
            "type" : "string",
            "desc" : "接收者"
        }, {
            "name" : "cc",
            "value" : "",
            "type" : "string",
            "desc" : "抄送"
        }, {
            "name" : "bcc",
            "value" : "",
            "type" : "string",
            "desc" : "密送"
        }, {
            "name" : "body",
            "value" : "",
            "type" : "string",
            "desc" : "邮件正文"
        }, {
            "name" : "freemarkerSupport",
            "value" : false,
            "type" : "boolean",
            "desc" : "FreeMarker支持",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "freemarkerMap",
            "value" : {"aaa":"bbb"},
            "type" : "map-string-string",
            "desc" : "freemarkerMap"
        }]
    },
    {
        "bean" : {
            "id" : "multicastComponent",
            "type" : "gateway",
            "class" : "com.kingyea.esb.components.gateway.MulticastComponent"
        },
        "properties" : [{
            "name" : "parallelProcessing",
            "value" : false,
            "type" : "boolean",
            "desc" : "parallelProcessing",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "stopOnException",
            "value" : false,
            "type" : "boolean",
            "desc" : "stopOnException",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "onPrepare",
            "value" : "",
            "type" : "ref-org.apahce.camel.Processor",
            "desc" : "onPrepare"
        }, {
            "name" : "executorService",
            "value" : "",
            "type" : "ref-java.util.concurrent.ExecutorService",
            "desc" : "executorService"
        }, {
            "name" : "timeout",
            "value" : "",
            "type" : "int",
            "desc" : "超时时间"
        }, {
            "name" : "aggregationStrategy",
            "value" : "",
            "type" : "ref-org.apache.camel.processor.aggregate.AggregationStrategy",
            "desc" : "聚合策略"
        }, {
            "name" : "shareUnitOfWork",
            "value" : false,
            "type" : "boolean",
            "desc" : "shareUnitOfWork",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "streaming",
            "value" : false,
            "type" : "boolean",
            "desc" : "streaming",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }]
    },
    {
        "bean" : {
            "id" : "MultiFileSplitComponent",
            "type" : "process",
            "class" : "com.kingyea.esb.components.file.multi.split.MultiFileSplitComponent"
        },
        "properties" : [{
            "name" : "backupDir",
            "value" : "",
            "type" : "string",
            "required" : true,
            "desc" : "备份目录"
        }, {
            "name" : "replaceIfExist",
            "value" : true,
            "type" : "boolean",
            "desc" : "是否覆盖",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        },{
            "name" : "repositoryDir",
            "value" : "",
            "type" : "string",
            "desc" : "db4o仓库目录"
        }, {
            "name" : "splitPackageSize",
            "value" : 1048756,
            "type" : "int",
            "desc" : "包大小"
        }, {
            "name" : "uncompliteSendbackDelay",
            "value" : 10000,
            "type" : "int",
            "desc" : "反馈延迟"
        }, {
            "name" : "poolSize",
            "value" : 50,
            "type" : "int",
            "desc" : "线程池大小"
        }, {
            "name" : "sendBlockingQueue",
            "value" : 100,
            "type" : "int",
            "desc" : "发送队列大小"
        }, {
            "name" : "trackerLevel",
            "value" : "INFO",
            "type" : "string",
            "desc" : "追踪级别",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "ERROR",
                "value" : "ERROR"
            }, {
                "display" : "INFO",
                "value" : "INFO"
            }, {
                "display" : "TRACE",
                "value" : "TRACE"
            }]
        }, {
            "name" : "feedbackStrategy",
            "value" : "jms",
            "type" : "ref-com.kingyea.esb.components.file.feedback.FeedbackStrategy",
            "desc" : "反馈策略",
            "required" : true
        }, {
            "name" : "splitProvider",
            "value" : "",
            "type" : "ref-com.kingyea.esb.components.file.multi.split.MultiSplitFileProvider",
            "desc" : "交换信息解析者"
        }]
    },
    {
        "bean" : {
            "id" : "TimerComponent",
            "type" : "source",
            "class" : "com.kingyea.esb.components.schedule.TimerComponent"
        },
        "properties" : [{
            "name" : "timerName",
            "value" : "",
            "type" : "string",
            "required" : true,
            "desc" : "名称"
        }, {
            "name" : "time",
            "value" : "",
            "type" : "string",
            "desc" : "触发模式"
        }, {
            "name" : "period",
            "value" : 1000,
            "type" : "int",
            "desc" : "触发周期"
        }, {
            "name" : "deply",
            "value" : 0,
            "type" : "int",
            "desc" : "延迟"
        }, {
            "name" : "fixedRate",
            "value" : false,
            "type" : "boolean",
            "desc" : "固定周期",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "daemon",
            "value" : true,
            "type" : "boolean",
            "desc" : "后台调度",
            "inputType" : 3,
            "selectValues" : [{
                "display" : "是",
                "value" : true
            }, {
                "display" : "否",
                "value" : false
            }]
        }, {
            "name" : "repeatCount",
            "value" : 0,
            "type" : "int",
            "desc" : "重复次数"
        }]
    }
];

var refMapping = {
    "org.apache.camel.processor.idempotent.IdempotentRepository": [
        {
            "type": "file",
            "definition": {
                "bean": {
                    "id": "fileIdempotentRepository",
                    "class": "org.apache.camel.processor.idempotent.FileIdempotentRepository"
                },
                "properties": [
                    {
                        "name": "fileStore",
                        "value": "",
                        "type": "string",
                        "required": true,
                        "desc": "文件路径"
                    },
                    {
                        "name": "maxFileStoreSize",
                        "value": 1048576,
                        "type": "int",
                        "desc": "最大大小"
                    }
                ]
            }
        },
        {
            "type": "memory",
            "definition": {
                "bean": {
                    "id": "fileIdempotentRepository",
                    "class": "org.apache.camel.processor.idempotent.MemoryIdempotentRepository"
                },
                "properties": [
                    {
                        "name": "cacheSize",
                        "value": 1000,
                        "type": "int",
                        "desc": "缓存大小"
                    }
                ]
            }
        }
    ],
    "org.apache.camel.processor.aggregate.AggregationStrategy": [],
    "com.kingyea.esb.jms.ConnectionFactoryProvider": [
        {
            "type": "hornetq",
            "definition": {
                "bean": {
                    "id": "hornetQConnectionFactoryProvider",
                    "class": "com.kingyea.esb.jms.hornetq.HornetQConnectionFactoryProvider"
                },
                "properties": [
                    {
                        "name": "sslEnabled",
                        "value": false,
                        "type": "boolean",
                        "desc": "启用SSL",
                        "inputType": 3,
                        "selectValues": [
                            {
                                "display": "是",
                                "value": true
                            },
                            {
                                "display": "否",
                                "value": false
                            }
                        ]
                    },
                    {
                        "name": "httpClientIdleTime",
                        "value": 500,
                        "type": "int",
                        "desc": "空闲时间"
                    },
                    {
                        "name": "servletPath",
                        "value": "",
                        "type": "string",
                        "desc": "Servlet路径"
                    },
                    {
                        "name": "host",
                        "value": "",
                        "type": "string",
                        "desc": "主机名",
                        "required": true
                    },
                    {
                        "name": "port",
                        "value": 5445,
                        "type": "int",
                        "desc": "端口号",
                        "required": true
                    },
                    {
                        "name": "maxConnections",
                        "value": 50,
                        "type": "int",
                        "desc": "最大连接数"
                    }
                ]
            }
        },
        {
            "type": "activemq",
            "definition": {
                "bean": {
                    "id": "activeMQConnectionFactoryProvider",
                    "class": "com.kingyea.esb.jms.activemq.ActiveMQConnectionFactoryProvider"
                },
                "properties": [
                    {
                        "name": "host",
                        "value": "",
                        "type": "string",
                        "desc": "主机名",
                        "required": true
                    },
                    {
                        "name": "port",
                        "value": 61616,
                        "type": "int",
                        "desc": "端口号"
                    },
                    {
                        "name": "protocol",
                        "value": "tcp",
                        "type": "string",
                        "desc": "协议"
                    },
                    {
                        "name": "username",
                        "value": "",
                        "type": "string",
                        "desc": "用户名"
                    },
                    {
                        "name": "password",
                        "value": "",
                        "type": "string",
                        "desc": "密码"
                    },
                    {
                        "name": "maxConnections",
                        "value": 50,
                        "type": "int",
                        "desc": "最大连接数"
                    }
                ]
            }
        }
    ],
    "java.util.concurrent.ExecutorService": [],
    "com.kingyea.esb.components.file.feedback.FeedbackStrategy": [
        {
            "type": "jms",
            "definition": {
                "bean": {
                    "id": "jmsFeedbackStrategy",
                    "class": "com.kingyea.esb.components.file.feedback.JmsFeedbackStrategy"
                },
                "properties": [
                    {
                        "name": "destinationName",
                        "value": "",
                        "type": "string",
                        "desc": "目的名称",
                        "required": true
                    },
                    {
                        "name": "connectionFactoryProvider",
                        "value": "hornetq",
                        "type": "ref-com.kingyea.esb.jms.ConnectionFactoryProvider",
                        "desc": "连接工厂提供者"
                    }
                ]
            }
        }
    ],
    "com.kingyea.esb.components.file.multi.split.MultiSplitFileProvider": [
        {
            "type": "XML",
            "definition": {
                "bean": {
                    "id": "xmlMultiSplitProvider",
                    "class": "com.kingyea.esb.components.file.multi.split.XMLMultiSplitProvider"
                },
                "properties": [
                    {
                        "name": "fileXpathExprs",
                        "value": [],
                        "type": "array-string",
                        "desc": "文件路径",
                        "required": true
                    },
                    {
                        "name": "destinationXpathExprs",
                        "value": [],
                        "type": "list-string",
                        "desc": "目的地路径",
                        "required": true
                    }
                ]
            }
        },
        {
            "type": "SingleFile",
            "definition": {
                "bean": {
                    "id": "singleFileSplitProvider",
                    "class": "com.kingyea.esb.components.file.multi.split.SingleFileSplitProvider"
                },
                "properties": [
                    {
                        "name": "receivers",
                        "value": [],
                        "type": "array-string",
                        "desc": "接收者",
                        "required": true
                    }
                ]
            }
        }
    ],
    "org.apahce.camel.Processor": []
};

var resourceMapping = {
    "com.kingyea.esb.jms.ConnectionFactoryProvider": [
        "defaultConnectionFactoryProvider",
        "disablePooledConnectionFactoryProvider"
    ]
};

var fragmentRegistry = {
    "com.kingyea.camel.runtime.ServiceDefination": "../data/fragment/ServiceDefinition.html",
    "com.kingyea.esb.components.file.jnotify.FileNotifyComponent": "../data/fragment/FileNotifyComponent.html",
    "com.kingyea.esb.components.protocol.jms.JmsProducerComponent": "../data/fragment/JmsProducerComponent.html",
    "org.apache.camel.processor.idempotent.FileIdempotentRepository": "../data/fragment/FileIdempotentRepository.html",
    "com.kingyea.esb.jms.hornetq.HornetQConnectionFactoryProvider": "../data/fragment/HornetQConnectionFactoryProvider.html",
    "com.kingyea.esb.components.file.multi.split.MultiFileSplitComponent": "../data/fragment/MultiFileSplitComponent.html",
    "com.kingyea.esb.components.file.feedback.JmsFeedbackStrategy": "../data/fragment/JmsFeedbackStrategy.html",
    "com.kingyea.esb.components.file.multi.split.XMLMultiSplitProvider": "../data/fragment/XMLMultiSplitProvider.html",
    "com.kingyea.esb.components.file.multi.split.SingleFileSplitProvider": "../data/fragment/SingleFileSplitProvider.html",
    "com.kingyea.esb.jms.activemq.ActiveMQConnectionFactoryProvider": "../data/fragment/ActiveMQConnectionFactoryProvider.html",
    "com.kingyea.esb.components.protocol.mail.MailSenderSourceComponent": "../data/fragment/MailSenderSourceComponent.html",
    "com.kingyea.esb.components.gateway.MulticastComponent": "../data/fragment/MulticastComponent.html",
    "com.kingyea.esb.components.file.FileTargetComponent": "../data/fragment/FileTargetComponent.html"
};
