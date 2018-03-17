'use strict';
var ZsofiaPorzsoltApp = angular.module('ZsofiaPorzsoltApp');

ZsofiaPorzsoltApp.controller('mainController', ['$scope', '$http', 'lang', '$location', '$log', function($scope, $http, lang, $location, $log) {
  $scope.langCtrl = function(language) {
    $http({method: 'GET', url: 'language/' + language + '.json'})
    .success(function(data, status, headers, config) {
      $scope.lang = data[0];
    })
    .error(function(data, status, headers, config) {
    });
  };
  $scope.langCtrl('eng');
  $scope.getActiveNavItem = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'nav-active' : '';
  }

// close dropdown nav, buggy
  $(document).on("click", function(event){
      var $trigger = $(".collapse");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $('.collapse').collapse('hide');
      }
  })
}]);

ZsofiaPorzsoltApp.controller('homeController', ['$scope', 'lang', function($scope, lang) {
}]);

ZsofiaPorzsoltApp.controller('galleriesController', ['$scope', '$http', 'lang', function($scope, $http, lang) {
  // if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
  //     $('.animation-back').css('backface-visibility', 'visible');
  // }
  $(".carousel").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll:"vertical"
  });

  $scope.toggleView = function() {
    $scope.flipper = '';
  };
  $scope.gallerySelector = function(gallery) {
    $scope.pictures = [{"ref": "assets/imgs/" + gallery + "/00.jpg","class": "active"}];
    $http({method: 'GET', url: 'assets/imgs/' + gallery + '/list.json'})
    .success(function(data, status, headers, config) {
      $scope.pictures = data;
      $scope.galleriesCarouselContainerBackground = "galleries-carousel-container-background-" + gallery;
      $scope.flipper = 'animation-flipped';
    })
    .error(function(data, status, headers, config) {
    });
  };
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
    emailjs.send("gmail", "template1",{name: $scope.formData.inputName, email: $scope.formData.inputEmail, subject: $scope.formData.inputSubject, message: $scope.formData.inputMessage})
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
