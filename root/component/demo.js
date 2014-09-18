var soproTestModule = angular.module("soproTest", ['ngMaterial'])
.controller("soproTestCtrl", function ($scope, $rootScope, $element) {
  $scope.testVar = 'Test Scope Variable';
});