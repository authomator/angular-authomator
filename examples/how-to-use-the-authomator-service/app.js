(function () {

  // Modules
  angular.module('app', ['authomator']);

  angular
    .module('app')
    .config(function (authomatorProvider) {
      authomatorProvider.setOptions({});
    });

  angular
    .module('app')
    .controller('DemoCtrl', function ($rootScope, $scope, authomator) {

      $scope.sampleAccessToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiQWNjZXNzIFRva2VuIDEiLCJuYW1lIjoiSnVyZ2VuIFZhbiBkZSBNb2VyZSIsImFkbWluIjp0cnVlLCJleHAiOjI0MjQxODkwMTU4MzV9.WJtRiqDCcDittqoWhVIowZwCvnvCJ-EytaeUHXBI0sc';
      $scope.sampleAccessToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiQWNjZXNzIFRva2VuIDIiLCJuYW1lIjoiSnVyZ2VuIFZhbiBkZSBNb2VyZSIsImFkbWluIjp0cnVlLCJleHAiOjI0MjQxODkwMTU4MzV9.p-XgidxsXT43QVntdn_lroGz04m_rxbq4npn4Ty_W1Y';

      $scope.sampleIdentityToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiSWRlbnRpdHkgVG9rZW4gMSIsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWUsImV4cCI6MjQyNDE4OTAxNTgzNX0.dh5QNixw6JzSvpuu-QsJ7r4Loi5lyhwOC9UNxDmisvc';
      $scope.sampleIdentityToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiSWRlbnRpdHkgVG9rZW4gMiIsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWUsImV4cCI6MjQyNDE4OTAxNTgzNX0.78PSk_YQOlVELnVpAPclw6JQGvPdmiAvJPlWSe2Zr5s';

      $scope.sampleRefreshToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiUmVmcmVzaCBUb2tlbiAxIiwibmFtZSI6Ikp1cmdlbiBWYW4gZGUgTW9lcmUiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoyNDI0MTg5MDE1ODM1fQ.FPmaXS5QhREqwhAt0e62tfo0Wt7dpRTwEzCzIh0wT9s';
      $scope.sampleRefreshToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiUmVmcmVzaCBUb2tlbiAyIiwibmFtZSI6Ikp1cmdlbiBWYW4gZGUgTW9lcmUiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoyNDI0MTg5MDE1ODM1fQ.hfLDIkU6fXoJLtp8yb3os-qCb1cIc2tZ_R1mrDZIj90';

      $scope.accessToken = '';
      $scope.identityToken = '';
      $scope.refreshToken = '';

      $rootScope.$on('authomator.accessTokenUpdated', function(event, decoded){
        $scope.accessToken = decoded;
      });

      $rootScope.$on('authomator.identityTokenUpdated', function(event, decoded){
        $scope.identityToken = decoded;
      });

      $rootScope.$on('authomator.refreshTokenUpdated', function(event, decoded){
        $scope.refreshToken = decoded;
      });

    });

})();
