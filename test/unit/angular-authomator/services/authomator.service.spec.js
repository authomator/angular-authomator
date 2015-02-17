'use strict';

describe('authomator', function() {

  var authomatorProvider;
  var authomator;

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

  });

});
