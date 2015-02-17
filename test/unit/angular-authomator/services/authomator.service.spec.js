'use strict';

describe('authomator', function() {

  var $rootScope;
  var authomatorProvider;
  var authomator;

  // Sample tokens generated on http://jwt.io/
  var tokenOneDecoded = {
    "sub": 1234567890,
    "name": "Jurgen Van de Moere",
    "admin": true
  };
  var tokenOneEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWV9.LIUWACi2-HTrH5aytl0GGVXH2kUorDOpYa2zODQeafs';


  var defaultOptions = {
    authomatorUrl: '',
    statePredicateFunction: function(){ return true; },
    routePredicateFunction: function(){ return true; },
    accessTokenQueryStringKey: 'at',
    identityTokenQueryStringKey: 'it',
    refreshTokenQueryStringKey: 'rt'
  };

  beforeEach(function(){

    // Define a fake module so we can configure the provider
    // before injecting the service
    var fakeModule = angular.module('fakeModule', function(){});
    fakeModule.config(['authomatorProvider', function(_authomatorProvider_){
      authomatorProvider = _authomatorProvider_;
    }]);

    // Load module
    module('authomator', 'fakeModule');

    // Instantiate service
    inject(function(_$rootScope_, _authomator_){
      $rootScope = _$rootScope_;
      authomator = _authomator_;
    });
  });

  describe('provider', function () {

    it('should exist', function () {
      expect(authomatorProvider).to.be.an('object');
    });

  });

  describe('service', function () {

    it('should exist', function () {
      expect(authomator).to.be.an('object');
    });

    it('should correctly initialize the default options', function () {
      expect(authomator._options.authomatorUrl).to.equal(defaultOptions.authomatorUrl);
      expect(authomator._options.accessTokenQueryStringKey).to.equal(defaultOptions.accessTokenQueryStringKey);
      expect(authomator._options.identityTokenQueryStringKey).to.equal(defaultOptions.identityTokenQueryStringKey);
      expect(authomator._options.refreshTokenQueryStringKey).to.equal(defaultOptions.refreshTokenQueryStringKey);
    });

    describe('#setAccessToken(token)', function(){

      it('should emit an authomator.accessTokenUpdated event on $rootScope and pass the decoded token contents', function(done){

        $rootScope.$on('authomator.accessTokenUpdated', function(event, decoded){
          expect(decoded).to.deep.equal(tokenOneDecoded);
          done();
        });
        authomator.setAccessToken(tokenOneEncoded);
      });

    });

    describe('#setAccessToken(invalidToken)', function(){

      it('should set the access token', function(){

        var token = "dummyToken";
        expect(authomator.getAccessToken()).to.not.equal(token);
        authomator.setAccessToken(token);
        expect(authomator.getAccessToken()).to.equal(token);

      });

    });

    describe('#setAccessToken(validToken)', function(){

      it('should set the access token', function(){

        var token = tokenOneEncoded;
        expect(authomator.getAccessToken()).to.not.equal(tokenOneEncoded);
        authomator.setAccessToken(token);
        expect(authomator.getAccessToken()).to.equal(tokenOneEncoded);

      });

    });

    describe('#setIdentityToken(token)', function(){

      it('should emit an authomator.identityTokenUpdated event on $rootScope and pass the decoded token contents', function(done){

        $rootScope.$on('authomator.identityTokenUpdated', function(event, decoded){
          expect(decoded).to.deep.equal(tokenOneDecoded);
          done();
        });
        authomator.setIdentityToken(tokenOneEncoded);
      });

    });

    describe('#setIdentityToken(invalidToken)', function(){

      it('should set the identity token', function(){

        var token = "dummyToken";
        expect(authomator.getIdentityToken()).to.not.equal(token);
        authomator.setIdentityToken(token);
        expect(authomator.getIdentityToken()).to.equal(token);

      });

    });

    describe('#setIdentityToken(validToken)', function(){

      it('should set the identity token', function(){

        var token = tokenOneEncoded;
        expect(authomator.getIdentityToken()).to.not.equal(tokenOneEncoded);
        authomator.setIdentityToken(token);
        expect(authomator.getIdentityToken()).to.equal(tokenOneEncoded);

      });

    });

    describe('#setRefreshToken(token)', function(){

      it('should emit an authomator.refreshTokenUpdated event on $rootScope and pass the decoded token contents', function(done){

        $rootScope.$on('authomator.refreshTokenUpdated', function(event, decoded){
          expect(decoded).to.deep.equal(tokenOneDecoded);
          done();
        });
        authomator.setRefreshToken(tokenOneEncoded);
      });

    });

    describe('#setRefreshToken(invalidToken)', function(){

      it('should set the refresh token', function(){

        var token = "dummyToken";
        expect(authomator.getRefreshToken()).to.not.equal(token);
        authomator.setRefreshToken(token);
        expect(authomator.getRefreshToken()).to.equal(token);

      });

    });

    describe('#setRefreshToken(validToken)', function(){

      it('should set the refresh token', function(){

        var token = tokenOneEncoded;
        expect(authomator.getRefreshToken()).to.not.equal(tokenOneEncoded);
        authomator.setRefreshToken(token);
        expect(authomator.getRefreshToken()).to.equal(tokenOneEncoded);

      });

    });

  });

});
