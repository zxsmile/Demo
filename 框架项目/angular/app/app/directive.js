(function () {

	angular
	.module('directives', [])

	/**
	 * 封装 e-charts
	 * 需要标签带有id和option两个属性
	 * 该指令适用于图不会再变化
	 */
	.directive('chart', function () {
		return {
			scope: {
				id: "@",
				option: "="
			},
			link: function (scope) {
				var option = scope.option;
				scope.$watch('option', function () {

					var myChart = echarts.init(document.getElementById(scope.id));
					myChart.setOption(option);

				})
			}
		};
	})

	/**
	 * 封装 e-charts
	 * 需要标签带有id和option两个属性
	 * 该指令适用于图根据用户过滤不断变化
	 * 设置了ngModel来监听图改变
	 */
	.directive('changeChart', function () {

		return {
			scope: {
				id: "@",
				option: "="
			},
			require: 'ngModel',
			link: function (scope, ele, attr, ngModel) {

				scope.$watch('option', function () {

					var myChart = echarts.init(document.getElementById(scope.id));
					myChart.setOption(ngModel.$modelValue);

				})
			}
		};

	})

	/**
	 * level danger\info\success\warning
	 * title 为模态框的标题
	 * name 为模态框的id
	 * <alert level="danger" mtitle="警告的内容" name="id" ></alert>
	 */
	.directive('alert', function () {

		return {
			restrict: 'E',
			scope: {
				name: '@',
				mtitle: '@',
				okFunc: '&',
				level: '@'
			},
			template: '<div class="modal fade in open" id="{{name}}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">' +
			'<div class="modal-dialog vdmc-alert">' +
			'<div class=" alert alert-{{level}} row">' +
			'<div class="modalimg">' +
			'<i ng-if=" level===\'danger\'" class="glyphicon glyphicon-remove-circle "></i>' +
			'<i ng-if=" level===\'info\'" class="glyphicon glyphicon-info-sign "></i>' +
			'<i ng-if=" level===\'success\'" class="glyphicon glyphicon-ok-circle "></i>' +
			'<i ng-if=" level===\'warning\'" class="glyphicon glyphicon-alert "></i>' +
			'</div>' +
			'<div class="modaltitle">' +
			'<a class="close"  ng-click="okFunc()">×</a>' +
			'<div>' +
			'<b ng-if=" level===\'danger\'">操作失败！</b>' +
			'<b ng-if=" level===\'info\'">提示：</b>' +
			'<b ng-if=" level===\'success\'">操作成功！</b>' +
			'<b ng-if=" level===\'warning\'">警告：</b>' +
			'</div>' +
			'<div>{{mtitle}}</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>',
			replace: true,
			link: function (scope, element) {
				var $ele = $(element), modalId = '#' + scope.name;
				$ele.on("click", ".close", function () {
					$(modalId).modal('hide');
					$(modalId).remove();
					var modalback = $('.modal-backdrop');
					if (modalback.length > 0) modalback[modalback.length - 1].remove();
				});
				$('.ice_panel_body').addClass('modal-open').append('<div class="modal-backdrop fade in"></div>');
			}
		}
	})
	/**
	 * 时间选择器
	 */
	.directive("datetimepicker", function () {
		return {
			restrict: "EA",
			require: "ngModel",
			replace: true,
			scope: {
				inputWidth: '@',
				ngModel: '=',
				functionName: '='
			},
			link: function (scope, element, attrs, ngmodel) {

				var unregister = scope.$watch('ngModel', function () {

					element.html("<input readonly='readonly'' name='+ attrs.dateid + ' id='date-" + attrs.dateid + "' class='input' style='width: " + (scope.inputWidth || '2rem') + "'>");

					$('#date-' + attrs.dateid).val(scope.ngModel);
					element.css("padding", "0");

					element.on('change', function () {
						scope.$apply(function () {
							ngmodel.$setViewValue($("#date-" + attrs.dateid).val());
						});
					});

					element.on('click', function () {
						$("#date-" + attrs.dateid).datetimepicker({
							format: attrs.format || 'Y-m-d h:i:s',
							yearStart: 1950,
							onClose: function () {
								element.change();
							}
						});
					});

					element.click();

					return ngmodel.$modelValue;

				}, initialize);

				function initialize(value) {
					ngmodel.$setViewValue(value);
					unregister();
				}
			}
		}
	})
	/**
	 * 时间选择器
	 */
	.directive("timePicker", function () {
		return {
			restrict: "EA",
			require: "ngModel",
			replace: true,
			scope: {
				inputWidth: '@',
				ngModel: '=',
				functionName: '='
			},
			link: function (scope, element, attrs, ngmodel) {

				var unregister = scope.$watch('ngModel', function () {

					element.html("<input id='date-" + attrs.dateid + "' class='input' style='width: " + (scope.inputWidth || '1.6rem') + "'>");

					$('#date-' + attrs.dateid).val(scope.ngModel);
					element.css("padding", "0");

					element.on('change', function () {
						scope.$apply(function () {
							ngmodel.$setViewValue($("#date-" + attrs.dateid).val());
						});
					});

					element.on('click', function () {
						$("#date-" + attrs.dateid).datetimepicker({
							datepicker: false,
							format: attrs.format || 'H:i:s',
							step: 5,
							onClose: function () {
								element.change();
							}
						});
					});

					element.click();

					return ngmodel.$modelValue;

				}, initialize);

				function initialize(value) {
					ngmodel.$setViewValue(value);
					unregister();
				}
			}
		}
	})
	/**
	 * 日期选择器
	 */
	.directive("datePicker", function () {
		return {
			restrict: "EA",
			require: "ngModel",
			replace: true,
			scope: {
				inputWidth: '@',
				ngModel: '=',
				functionName: '='
			},
			link: function (scope, element, attrs, ngmodel) {

				var unregister = scope.$watch('ngModel', function () {

					element.html("<input readonly='readonly' id='date-" + attrs.dateid + "' class='input' style='width: " + (scope.inputWidth || '1.6rem') + "'>");

					$('#date-' + attrs.dateid).val(scope.ngModel);
					element.css("padding", "0");

					element.on('change', function () {
						scope.$apply(function () {
							ngmodel.$setViewValue($("#date-" + attrs.dateid).val());
						});
					});

					element.on('click', function () {
						$("#date-" + attrs.dateid).datetimepicker({
							timepicker: false,
							format: attrs.format || 'Y-m-d',
							yearStart: 1950,
							step: 5,
							onClose: function () {
								element.change();
							}
						});
					});

					element.click();

					return ngmodel.$modelValue;

				}, initialize);

				function initialize(value) {
					ngmodel.$setViewValue(value);
					unregister();
				}
			}
		}
	})
    /**
     * 文件批量上传,触发 fileSelected
     */
        .directive('fileUpload', function () {
            return {
                scope: true,
                link: function (scope, el, attrs) {
                    el.bind('change', function (event) {
                        var files = event.target.files;
                        for (var i = 0; i < files.length; i++) {
                            scope.$emit("fileSelected", {file: files[i]});
                        }
                    });
                }
            };
        });

})();