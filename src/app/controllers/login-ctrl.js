'use strict';

angular.module('MisterXAdmin')
.controller('LoginCtrl', function($scope, $auth) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
  $scope.logout = function() {
    localStorage.removeItem('satellizer_token');
  };
  $scope.loggedIn = $auth.isAuthenticated();

});

