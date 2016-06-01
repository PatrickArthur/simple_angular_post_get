// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require angular

var app = angular.module('myApp', []);

app.controller('peopleCtrl', function($scope, $http) {
  getPeople();
  $scope.errors = [];
  $scope.msgs = [];

  $scope.createPerson = function() {
  $scope.errors.splice(0, $scope.errors.length); // remove all error messages
  $scope.msgs.splice(0, $scope.msgs.length);

  $http.post('/api/people', {'first_name': $scope.first_name, 'last_name': $scope.last_name, 'email': $scope.email}
    ).success(function(data, status, headers, config) {
      if (data.msg != '')
      {
        $scope.msgs.push(data.msg);
        getPeople();
      }
      else
      {
        $scope.errors.push(data.error);
      }
    }).error(function(data, status) {
      $scope.errors.push(status);
    });
  }

  function getPeople() {
    $http.get("/api/people").then(function(response) {
      var people_data = response.data
      $scope.myData = onlyEmailendcom(people_data,true);
      $scope.myData2 = onlyEmailendcom(people_data,false);
      $scope.countPeople = people_data.length
      $scope.countPeopleNoCom = onlyEmailendcom(people_data,false).length;
      $scope.countPeopleCom = onlyEmailendcom(people_data,true).length;
    });
  }

  function onlyEmailendcom(data,email) {
    array = []
    array2 = []
    loopData(data,array,array2)
    return switchArray(array,array2,email)
  }

  function loopData(input,arr,arr2) {
    for (i=0; i< input.length; i++){
      if (input[i].email.search(".com") >= 0) {
        arr.push(input[i].email)
      }
      else {
        arr2.push(input[i].email)
      }
    }
  }

  function switchArray(arr,arr2,em) {
    if (em == true)
      return arr
    else {
      return arr2
    }
  }
});
