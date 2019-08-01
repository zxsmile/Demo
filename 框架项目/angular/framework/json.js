/**
 * Created by bowen on 2016/12/1.
 */


/**
 * 遍历list返回一个带有}或}]的数组
 * {或[{在getSymbol中已经输出
 * @param list
 * @returns {Array}
 */
var doJson = function (list) {

    var finalArray = [];
    var strLength = list.length;

    if (strLength > 0) {

        for (var i = 0; i < strLength - 1; i++) {

            finalArray.push(list[i]);

            if (getSymbolCount(list[i].field_expression) > getSymbolCount(list[i + 1].field_expression)) {

                var subCount = getSymbolCount(list[i].field_expression) - getSymbolCount(list[i + 1].field_expression),
                    subStr = list[i].field_expression;

                for (var time = 0; time < subCount; time++) {

                    for (var j = i - 1; j >= 0; j--) {
                        if (subStr.indexOf(list[j].field_expression) > -1) {

                            var symbol_expression = list[j].field_expression;
                            symbol_expression = symbol_expression.replace(/[^>]/g, '1');

                            if (list[j].data_type.data_type_alias == 'JSONObject') {
                                finalArray.push({
                                    "field_key": "} ,",
                                    "field_expression": symbol_expression
                                });
                            } else if (list[j].data_type.data_type_alias == 'JSONArray') {
                                finalArray.push({
                                    "field_key": "}] ,",
                                    "field_expression": symbol_expression
                                });
                            } else {
                                finalArray.push({
                                    "field_key": "",
                                    "field_expression": ""
                                });
                            }

                            subStr = subStr.substring(0, subStr.lastIndexOf('>') - 1);

                            break;
                        }
                    }
                }

            }

        }

        /**
         * 获取最后一个元素的field_expression
         * @type {any}
         */
        var tempStr = list[strLength - 1].field_expression;

        finalArray.push(list[strLength - 1]);

        /**
         * 通过判断 > 个数来确定最后要添加多少个}或者}]
         */
        for (var k = 0; k < getSymbolCount(list[strLength - 1].field_expression); k++) {

            for (var s = strLength - 2; s >= 0; s--) {

                /**
                 * 匹配到元素，删除一个 > ，循环break
                 */
                if (tempStr.indexOf(list[s].field_expression) > -1) {

                    var symbol_expression = list[s].field_expression;
                    symbol_expression = symbol_expression.replace(/[^>]/g, '1');

                    if (list[s].data_type.data_type_alias == 'JSONObject') {
                        finalArray.push({
                            "field_key": "}",
                            "field_expression": symbol_expression
                        });
                    } else if (list[s].data_type.data_type_alias == 'JSONArray') {
                        finalArray.push({
                            "field_key": "}]",
                            "field_expression": symbol_expression
                        });
                    } else {
                        finalArray.push({
                            "field_key": "",
                            "field_expression": ""
                        });
                    }

                    tempStr = tempStr.substring(0, tempStr.lastIndexOf('>') - 1);

                    break;
                }
            }

        }

    }

    return finalArray;
};

/**
 * 获取 > 符号个数
 * @param str
 * @returns {number}
 */
var getSymbolCount = function (str) {

    var count = 0;

    if (typeof str == 'string') {

        while (str.indexOf('>') > -1) {

            str = str.substring(str.indexOf('>') + 1);

            count++;
        }

    }

    return count;

};

/**
 * 展示json
 * @param json
 * @returns {*}
 */
var syntaxHighlight = function (json) {

    if (typeof json != 'string') {

        json = JSON.stringify(json, undefined, 2);

    }

    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });

    return json;
};