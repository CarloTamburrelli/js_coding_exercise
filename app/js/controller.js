var app = angular.module('js_coding_exercise', ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller('JsCodingExercise', ['$scope', '$http', function($scope, $http) {
  $scope.search_string = "";
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
    $http.post("update/" + note._id, note).then(function(response) {
      $scope.notes = response.data;
    }); 
  };

  $scope.delete = function(id) {
    $http.get("delete/" + id).then(function(response) {
      $scope.notes = response.data;
    });
  };





}]);
