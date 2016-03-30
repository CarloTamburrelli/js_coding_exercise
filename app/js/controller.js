var myApp = angular.module('js_coding_exercise', []);

myApp.controller('JsCodingExercise', ['$scope', '$http', function($scope, $http) {
  $scope.new = {};

  $scope.create = function(note) {
    $http.post("create/", note).then(function(response) {
      $scope.notes = response.data;
    });
  }

  $http.get("read").then(function(response) {
    $scope.notes = response.data;
  });

  $scope.update = function(note) {
    $http.post("update/" + note.id, note).then(function(response) {
      $scope.notes = response.data;
    });
  }

  $scope.delete = function(id) {
    $http.get("delete/" + id).then(function(response) {
      $scope.notes = response.data;
    });
  };





}]);
