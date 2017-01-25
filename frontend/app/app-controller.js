'use strict';
var ZsofiaPorzsoltApp = angular.module('ZsofiaPorzsoltApp');

ZsofiaPorzsoltApp.controller('homeController', ['$scope', 'lang', function($scope, lang) {
}]);

ZsofiaPorzsoltApp.controller('galleriesController', ['$scope', 'lang', function($scope, lang) {
}]);

ZsofiaPorzsoltApp.controller('mainController', ['$scope', '$http', 'lang', function($scope, $http, lang) {
  $scope.langCtrl = function(language) {
    $http({method: 'GET', url: 'language/' + language + '.json'}).
    success(function(data, status, headers, config) {
      $scope.lang = data[0];
    })
    .error(function(data, status, headers, config) {
    });
  };
  $scope.langCtrl('eng');
}]);

ZsofiaPorzsoltApp.controller('contactController', ['$scope', '$http', 'lang', function($scope, $http, lang) {
  var answerData;
  $http.get('/email').success(function(data) {
    answerData = data.email;
  });
  $scope.resultMessage;
  $scope.formData;
  $scope.submitButtonDisabled = false;
  $scope.submitted = false;
  $scope.submit = function() {
    $scope.submitted = true;
    $scope.submitButtonDisabled = true;
    emailjs.send("default_service",answerData,{name: $scope.formData.inputName, email: $scope.formData.inputEmail, subject: $scope.formData.inputSubject, message: $scope.formData.inputMessage})
      .then(function(response) {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        $scope.submitButtonDisabled = true;
        $scope.resultMessage = $scope.lang.contactSuccess;
        $scope.$applyAsync();
        $scope.result='bg-success';
      }, function(err) {
        console.log("FAILED. error=", err);
        $scope.submitButtonDisabled = false;
        $scope.resultMessage = $scope.lang.contactError + err.status;
        $scope.$applyAsync();
        $scope.result='bg-danger';
      });
    $scope.resultMessage = $scope.lang.sending;
    $scope.result='bg-info';
  }
}]);
