(function () {

    'use strict';

    angular
        .module('myApp', ['ui.router', 'ngMessages', 'ngSanitize', 'ui.bootstrap', 'ngTable', 'allCtrl', 'angularFileUpload', 'services', 'directives','angular-cache'])
        .config(['$stateProvider', '$urlRouterProvider', 'authTable',
            function ($stateProvider, $urlRouterProvider, authTable) {
                
                $urlRouterProvider.otherwise('/index');

                $stateProvider
                    .state('login', {
                        url: '/login',
                        views: {
                            '': {
                                templateUrl: 'app/home/main.html'
                            },
                            'header@login': {
                                templateUrl: 'app/home/header.html'
                            },
                            'main@login': {
                                templateUrl: 'app/login/login.html',
                                controller: 'loginCtrl'
                            }
                        },
                        data: authTable.login
                    })
                    .state('index', {
                        url: '/index',
                        views: {
                            '': {
                                templateUrl: 'app/home/main.html',
                                controller: 'mainCtrl'
                            },
                            'header@index': {
                                templateUrl: 'app/home/header.html'
                            },
                            'main@index': {
                                templateUrl: 'app/home/index.html'
                            },
                            'footer@index': {
                                templateUrl: 'app/home/footer.html'
                            }
                        },
                        data: authTable.index
                    })
                    .state('index.product1', {
                        url: '/product1/:p',
                        views: {
                            'main@index': {
                                templateUrl: 'app/p_credit/product/product1.html',
                                controller: 'product1Ctrl'
                            }
                        },
                        data: authTable.service
                    });
            }])
        /**
         * 拦截器拦截响应请求200005
        //  */
        .config(['$httpProvider', function ($httpProvider) {

            $httpProvider.interceptors.push('httpInterceptor');

        }])
        .factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {

            return {
                'response': function (response) {

                    if (response.data.response_code == '200005') {
                        console.log('sds')

                        location.href = 'https://sso-test.icekredit.com/login?redirect_uri=' + encodeURIComponent(window.location.href);

                        return $q.reject(response);

                    } else {

                        return response;

                    }

                }
            };

        }])
        .run(function ($rootScope, $http) {

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                /**
                 * 切换所有的item激活状态
                 * @type {*}
                 */
                $rootScope.active_item = toState.name.replace('index.', '').replace(/\.\w*/, '');
                $rootScope.active_last_item = toState.name.replace('index.', '').replace(/.*\./,'');

            });

            $rootScope.investFilterWords = '';

            $rootScope.info = {
                titleImg: 'img/logo_icon.png',
                headerImg: 'img/co-logo.png'
            };

            $rootScope.getHeight = function () {

                return {
                    "min-height": window.screen.availHeight - 100
                };

            };

        })
        .directive('updateTitle', ['$rootScope', '$timeout',
            function ($rootScope, $timeout) {
                return {
                    link: function (scope, element) {

                        var listener = function (event, toState) {

                            var title = 'Default Title';
                            if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                            $timeout(function () {
                                element.text(title);
                            }, 0, false);
                        };

                        $rootScope.$on('$stateChangeSuccess', listener);
                    }
                };
            }
        ]);
})();
