'use strict';

describe('authomator', function() {

  var authomatorProvider;
  var authomator;

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
    inject(function(_authomator_){
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

  });

});
