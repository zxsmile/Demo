/**
 * Created by ss on 16-11-16.
 */
(function () {

    'use strict';

    angular
        .module('login', [])
        .controller('loginCtrl', ['$scope', 'httpServer', '$state', '$rootScope',
            function ($scope, httpServer, $state, $rootScope) {

                /**
                 * 初始化登录数据
                 * @type {{merchant_name: string, merchant_pwd: string, captcha: string}}
                 */
                $scope.loginParams = {
                    "username": '',
                    "password": '',
                    "captcha": ''
                };

                /**
                 * 验证码src
                 * @type {string}
                 */
                $scope.captchaUrl = '/auth/captcha?r=' + Date.parse(new Date());

                /**
                 * input绑定enter事件
                 */
                $scope.pressEnter = function () {
                    if (event.keyCode == '13' && !$scope.inLogining) {
                        $scope.userLogin();
                    }
                };

                /**
                 * 点击图片刷新验证码
                 */
                $scope.refreshCaptcha = function () {
                    document.getElementById('captcha').src = '/auth/captcha?r=' + Date.parse(new Date());
                };

                /**
                 * 后台响应等待效果
                 * @type {boolean}
                 */
                $scope.inLogining = false;

                /**
                 * 用户调用login接口登陆
                 */
                $scope.userLogin = function () {

                    /**
                     * 开启等待效果
                     * @type {boolean}
                     */
                    $scope.inLogining = true;

                    /**
                     * 清空错误信息
                     * @type {string}
                     */
                    $scope.loginError = '';
                    $rootScope.sessionLose = '';

                    httpServer
                        .login($scope.loginParams)
                        .then(function (result) {

                            $scope.inLogining = false;

                            if (result['response_code'] == '00') {

                                /**
                                 * 登录成功保存登录状态
                                 */
                                sessionStorage.setItem('user-x-x-x-x-LoginState', true);

                                /**
                                 * 登录成功跳转index页面
                                 */
                                $state.go('index');

                            } else {

                                /**
                                 * 输出错误信息
                                 */
                                $scope.loginError = result['response_msg'];

                                /**
                                 * 刷新验证码
                                 * @type {string}
                                 */
                                document.getElementById('captcha').src = '/auth/captcha?r=' + Date.parse(new Date());

                            }
                        });

                }

            }]);


})();