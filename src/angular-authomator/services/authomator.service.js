(function (angular) {

  /**
   * Authomator service provider
   */
  function authomatorServiceProvider(){

    /**
     * Dummy predicate function that
     * always returns true and thus
     * always allows access
     *
     * Can be overridden using options.
     *
     * @returns {boolean}
     */
    function alwaysAllowAccess(){
      return true;
    }

    // Default options
    var options = {

      // Url of Authomator service
      authomatorUrl: '',

      // Whether or not to automatically refresh token
      automaticallyRefreshTokens: true,

      // Function to check if state can be accessed
      // Use in combination with ui-router
      // Returns true to grant access, false to deny access
      statePredicateFunction: alwaysAllowAccess,

      // Function to check if route can be accessed
      // Used in combination with ngRoute
      // Returns true to grant access, false to deny access
      routePredicateFunction: alwaysAllowAccess,

      // Keys to identify tokens in query string
      accessTokenQueryStringKey: 'at',
      identityTokenQueryStringKey: 'it',
      refreshTokenQueryStringKey: 'rt'
    };

    /**
     * Provider method to change default options
     *
     * @param newOptions
     */
    this.setOptions = function (newOptions) {
      angular.extend(options, newOptions);
      return this;
    };

    /**
     * Factory method
     *
     * @param $timeout
     * @param $rootScope
     * @returns {GrowlNotifications}
     */
    this.$get = authomatorServiceFactory;

    /**
     * Service factory
     *
     * @constructor
     */
    function authomatorServiceFactory($rootScope, jwtHelpers){
      return new AuthomatorService($rootScope, jwtHelpers, options);
    }

    // Inject dependencies
    authomatorServiceFactory.$inject = ['$rootScope', 'jwtHelpers'];

  }

  /**
   * Authomator service
   *
   * @constructor
   */
  function AuthomatorService($rootScope, jwtHelpers, options) {

    /**
     * Placeholder for internal options
     */
    this._options = options;

    /**
     * Placeholder for tokens
     *
     * @type {null}
     * @private
     */
    this._accessToken = null;
    this._identityToken = null;
    this._refreshToken = null;

    /**
     * Initializes the service and attaches required hooks
     * during run phase of angular module
     */
    this.init = function init(){
    };

    /**
     * Set access token
     *
     * @param {string} - Access token
     * @returns {AuthomatorService} self
     */
    this.setAccessToken = function setAccessToken(token){
      var decoded = jwtHelpers.decodeToken(token);
      this._accessToken = token;
      $rootScope.$emit('authomator.accessTokenUpdated', decoded);
      return this;
    };

    /**
     * Get access token
     *
     * @returns {string} token
     */
    this.getAccessToken = function getAccessToken(){
      return this._accessToken;
    };

    /**
     * Set identity token
     *
     * @param {string} - Identity token
     * @returns {AuthomatorService} self
     */
    this.setIdentityToken = function setIdentityToken(token){
      var decoded = jwtHelpers.decodeToken(token);
      this._identityToken = token;
      $rootScope.$emit('authomator.identityTokenUpdated', decoded);
      return this;
    };

    /**
     * Get identity token
     *
     * @returns {string} token
     */
    this.getIdentityToken = function getIdentityToken(){
      return this._identityToken;
    };

    /**
     * Set refresh token
     *
     * @param {string} - Refresh token
     * @returns {AuthomatorService} self
     */
    this.setRefreshToken = function setRefreshToken(token){
      var decoded = jwtHelpers.decodeToken(token);
      this._refreshToken = token;
      $rootScope.$emit('authomator.refreshTokenUpdated', decoded);
      return this;
    };

    /**
     * Get refresh token
     *
     * @returns {string} token
     */
    this.getRefreshToken = function getRefreshToken(){
      return this._refreshToken;
    };

  }

  /**
   * Initalize authomator during run phase
   *
   * @param authomator
   */
  function initializeAutomatorService(authomator){
    authomator.init();
  }

  // Inject dependencies
  initializeAutomatorService.$inject = ['authomator'];

  // Make sure init() is called during run phase
  // to set up required hooks
  angular
    .module('authomator')
    .run(initializeAutomatorService);

  // Export
  angular
    .module('authomator')
    .provider('authomator', authomatorServiceProvider);

})(angular);
