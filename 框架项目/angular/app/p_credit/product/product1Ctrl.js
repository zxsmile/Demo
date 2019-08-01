(function () {

    angular
        .module('product1', [])
        .controller('product1Ctrl', ['$scope', '$http', '$rootScope', 'httpServer', 'ngTableDefaults', 'NgTableParams', '$state','$stateParams',
            function ($scope, $http, $rootScope, httpServer, ngTableDefaults, NgTableParams, $state,$stateParams) {


                $scope.tabs = [{
                    name: '条码系统'
                },{
                    name: '远程接入系统'
                },{
                    name: '短信接口'
                },{
                    name: '誉宏设计'
                }];


                if ($stateParams.p){
                    $scope.tabsActive =  $stateParams.p;
                }else {
                    $scope.tabsActive = 0
                }

                console.log($scope.tabsActive);

                $scope.doTabsCheck = function (i) {
                    $scope.tabsActive = i
                }


            }]);
})();