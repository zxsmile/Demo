/**
 * Created by zhtwu on 2016/9/14.
 */
(function () {

    angular
        .module('services', [])
        /**
         * 服务列表
         */
        .factory('httpServer', ['$http','httpFunction','CacheFactory', function ($http,httpFunction,CacheFactory) {

            var objToString = function (obj) {

                var str = '?';
                for (var i in obj) {
                    str = str + i + '=' + obj[i] + '&';
                }

                return str;
            };

            return {

                /**
                 * 通过hive数据库表名获得该表的所有域信息
                 * @param obj
                 * @returns {*|Promise}
                 */
                get_hive_data_domain: function (obj) {

                    return httpFunction.http_no_catch('/xx/xx' + objToString(obj))
                    // return httpFunction.http_no_catch('data/hive.json' + objToString(obj))
                }
            };

        }])

        /**
         * 接口方法
         */
        .factory('httpFunction', ['$http', '$q', 'CacheFactory',
            function ($http, $q, CacheFactory) {

                CacheFactory('dataCache', {
                    /**
                     * 15分钟缓存过期
                     */
                    maxAge: 15 * 60 * 1000,
                    /**
                     * 缓存过期移除内容
                     */
                    cacheFlushInterval: 60 * 60 * 1000,
                    deleteOnExpire: 'aggressive'
                });


                var transFn = function (data) {
                        return serializeData(data);
                    },
                    /**
                     * 此操作将post设置为form-data
                     */
                    postCfg = {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transFn
                    },
                    postFile = {
                        headers: {'Content-Type': 'multipart/form-data'},
                        transformRequest: transFn
                    },
                    postCfgFile = {
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    };

                function serializeData(data) {

                    if (!angular.isObject(data)) {
                        return ( ( data == null ) ? "" : data.toString() );
                    }
                    var buffer = [];

                    for (var name in data) {
                        if (!data.hasOwnProperty(name)) {
                            continue;
                        }
                        var value = data[name];
                        buffer.push(
                            encodeURIComponent(name) + "=" + encodeURIComponent(( value == null ) ? "" : value)
                        );
                    }

                    var source = buffer.join("&").replace(/%20/g, "+");
                    return ( source );
                }

                return {
                    /**
                     * 调用该函数的所有请求将会缓存数据
                     * @param str
                     * @returns {Promise}
                     */
                    http_catch: function (str) {

                        /**
                         * 返回promise异步对象
                         */
                        var deferred = $q.defer();
                        var dataCache = CacheFactory.get('dataCache');

                        if (dataCache.get(str)) {

                            deferred.resolve(dataCache.get(str));

                        } else {

                            $http
                                .get(str)
                                .success(function (data) {

                                    if (data['response_code'] == '00') {
                                        dataCache.put(str, data);
                                    }

                                    deferred.resolve(data);

                                });

                        }

                        return deferred.promise;

                    },
                    /**
                     * 调用该函数的所有请求不会缓存数据
                     * @param str
                     * @param obj
                     * @returns {Promise}
                     */
                    http_no_catch: function (str, obj) {

                        var deferred = $q.defer();

                        if (obj) {

                            $http
                                .post(str, obj)
                                .success(function (data) {

                                    deferred.resolve(data);

                                })

                        } else {

                            $http
                                .get(str)
                                .success(function (data) {

                                    deferred.resolve(data);

                                })

                        }

                        return deferred.promise;
                    },
                    /**
                     * 该请求将会在成功的时候清除指定缓存数据
                     * @param str
                     * @param obj
                     * @param cat
                     * @returns {Promise}
                     */
                    http_remove_catch: function (str, obj, cat) {

                        var deferred = $q.defer();
                        var dataCache = CacheFactory.get('dataCache');

                        if (obj) {

                            $http
                                .post(str, obj)
                                .success(function (data) {

                                    if (dataCache.get(cat)) {
                                        dataCache.remove(cat);
                                    }

                                    deferred.resolve(data);

                                })

                        } else {

                            $http
                                .get(str)
                                .success(function (data) {

                                    if (dataCache.get(cat)) {
                                        dataCache.remove(cat);
                                    }

                                    deferred.resolve(data);

                                })

                        }

                        return deferred.promise;
                    },
                    /**
                     * post form data格式的数据
                     * @param str
                     * @param obj
                     * @returns {Promise}
                     */
                    http_form_data: function (str, obj) {

                        var deferred = $q.defer();

                        $http
                            .post(str, obj, postCfg)
                            .success(function (data) {

                                deferred.resolve(data);

                            });

                        return deferred.promise;
                    },
                    http_form_data_file: function (str, obj) {

                        var deferred = $q.defer();

                        $http
                            .post(str, obj, postFile)
                            .success(function (data) {

                                deferred.resolve(data);

                            });

                        return deferred.promise;
                    },
                    /**
                     * post form data格式的带文件数据-单个文件
                     * @param str
                     * @param obj
                     * @returns {Promise}
                     */
                    http_form_file_data_one: function (str, obj) {

                        var deferred = $q.defer();

                        var data = new FormData();
                        angular.forEach(obj, function (value, key) {

                            if (key == 'file') {
                                data.append(key, value);
                                return;
                            }

                            data.append(key, value);
                        });

                        $http
                            .post(str, data, postCfgFile)
                            .success(function (data) {

                                deferred.resolve(data);

                            });

                        return deferred.promise;
                    }
                }

            }])
        /**
         * 多选框、全选
         */
        .factory('getCheckboxSelected', ['$q', function ($q) {

            return {

                /**
                 * 全选、全不选
                 * @param select、是否全选按钮选中
                 * @param checked、已选按钮列表
                 * @param all、所有数据类别
                 * @returns {Promise}
                 */
                selectAll: function (select, checked, all) {

                    if (select) {
                        checked = [];
                        angular.forEach(all, function (i) {
                            i.checked = true;
                            checked.push(i);
                        })
                    } else {
                        angular.forEach(all, function (i) {
                            i.checked = false;
                            checked = [];
                        })
                    }

                    return {isAll: select, checked: checked, all: all}

                },

                /**
                 * 选择某一个
                 * @param select、是否全选按钮选中
                 * @param checked、已选按钮列表
                 * @param all、所有数据类别
                 * @returns {Promise}
                 */
                selectOne: function (select, checked, all) {

                    angular.forEach(all, function (i) {
                        var index = checked.indexOf(i);
                        if (i.checked && index == -1) {
                            checked.push(i);
                        } else if (!i.checked && index != -1) {
                            checked.splice(index, 1);
                        }
                    });

                    if (all.length == checked.length) {

                        select = true;

                    } else {

                        select = false;

                    }

                    return {isAll: select, checked: checked, all: all};

                }

            }

        }])
        /**
         * 选出文中需要高亮的词
         */
        .filter("highlight", function ($sce) {

            return function (text) {

                var result = text.replace(/red/gi, 'span');

                return $sce.trustAsHtml(result);
            };

        })
        /**
         * 页面权限表
         */
        .constant('authTable', {
            login: {
                pageTitle: '登录',
                auth: {
                    loginCheck: false,
                    firstLoginCheck: false
                }
            },
            index: {
                pageTitle: '西安誉宏电子科技有限公司',
                auth: {
                    loginCheck: true
                }
            },
            binding: {
                pageTitle: '西安誉宏电子科技有限公司',
                auth: {
                    loginCheck: true
                }
            },
            service: {
                pageTitle: '西安誉宏电子科技有限公司',
                auth: {
                    loginCheck: true
                }
            }
        })
        /**
         * 过滤器：过滤空为 -
         */
        .filter('emptyTo', function () {
            return function (input) {
                if (input === '' || input == null) {
                    return '-';
                } else {
                    return input;
                }
            }
        });

})();
