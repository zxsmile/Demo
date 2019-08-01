/**
 * Created by ss on 16-10-19.
 */
(function () {

    angular
        .module('main', [])
        .controller('mainCtrl', ['$scope', 'httpServer', '$rootScope', '$state','$stateParams', '$timeout',
            function ($scope, httpServer, $rootScope, $state,$stateParams, $timeout) {


                $scope.doClickLogo = function () {
                    location.href = '/'
                };
                $scope.headerNav = [{
                    name: '首页',
                    id: 'index'
                },{
                    name: '速达',
                    id: 'solve'
                },{
                    name: '金蝶',
                    id: 'jin'
                }, {
                    name: '下载中心',
                    id: 'download'
                }, {
                    name: '誉宏产品',
                    id: 'service',
                    children: [{
                        name: '条码系统',
                        id: 'service0'
                    },{
                        name: '远程接入系统',
                        id: 'service1'
                    },{
                        name: '短信接口',
                        id: 'service2'
                    },{
                        name: '誉宏设计',
                        id: 'service3'
                    }]
                }, {
                    name: '服务项目',
                    id: 'down',
                    children: [{
                        name: '热线项目',
                        id: 'down'
                    },{
                        name: '升级服务',
                        id: 'down'
                    },{
                        name: '现场服务',
                        id: 'down'
                    },{
                        name: '培训服务',
                        id: 'down'
                    }]
                }];
                $scope.isHeaderNav = 0;

                $scope.hMouseOver = function (i) {
                    $scope.isHeaderNav = i
                };
                $scope.hMouseOut = function (i) {
                    $scope.isHeaderNav = 0

                };

                $scope.doClick = function (id,$event) {


                    $event.stopPropagation();
                    console.log('main');
                    console.log(id);

                    $timeout(function () {
                        if (id === 'index'){
                            $.fn.fullpage.moveTo('page1', 1);
                            // mySwiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
                        }

                        if (id === 'service'){
                            $.fn.fullpage.moveTo('page2', 2)
                        }
                        if (id === 'service0'){
                            window.open('#/index/product1/0','_self');
                            location.reload()
                        }
                        if (id === 'service1'){
                            window.open('#/index/product1/1','_self');
                            location.reload()
                        }
                        if (id === 'service2'){
                            window.open('#/index/product1/2','_self');
                            location.reload()
                        }
                        if (id === 'service3'){
                            window.open('#/index/product1/3','_self');
                            location.reload()
                        }

                        if (id === 'solve'){
                            window.open('http://117.34.80.220:3001','_blank');
                        }
                        if (id === 'jin'){
                            window.open('http://117.34.80.220:3002','_blank');
                        }

                        if (id === 'down'){
                            $.fn.fullpage.moveTo('page3', 3)
                        }

                        if (id === 'download'){
                            $.fn.fullpage.moveTo('page4', 4)
                        }
                    })

                };


            }]);
})();