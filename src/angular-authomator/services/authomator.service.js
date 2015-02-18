(function (angular) {

  /**
   * Authomator service provider
   */
  function authomatorServiceProvider(){

    // Default options
    var options = {

      // Url of Authomator service
      authomatorUrl: '',

      // Whether or not to automatically refresh token
      automaticallyRefreshTokens: true,

      // Function to check if state can be accessed
      // Use in combination with ui-router
      // Returns true to grant access, false to deny access
      statePredicateFunction: null,

      // Function to check if route can be accessed
      // Used in combination with ngRoute
      // Returns true to grant access, false to deny access
      routePredicateFunction: null,

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
    function authomatorServiceFactory($rootScope, $location, jwtHelpers){
      return new AuthomatorService($rootScope, $location, jwtHelpers, options);
    }

    // Inject dependencies
    authomatorServiceFactory.$inject = ['$rootScope', '$location', 'jwtHelpers'];

  }

  /**
   * Authomator service
   *
   * @constructor
   */
  function AuthomatorService($rootScope, $location, jwtHelpers, options) {

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
      this._listenForQueryStringKeys();
      this._listenForRouteChanges();
      this._listenForStateChanges();
    };

    /**
     * Listen for route changes when using ngRoute
     */
    this._listenForRouteChanges = function listenForRouteChanges(){
      var self = this;
      if(!angular.isFunction(this._options.routePredicateFunction)){
        return;
      }
      $rootScope.$on('$routeChangeStart', function(event, to, from){
        self._options.routePredicateFunction(event, to, from);
      });
    };

    /**
     * Listen for state changes when using ui-router
     */
    this._listenForStateChanges = function listenForStateChanges(){
      var self = this;
      if(!angular.isFunction(this._options.statePredicateFunction)){
        return;
      }
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        self._options.statePredicateFunction(event, toState, toParams, fromState, fromParams);
      });
    };

    /**
     * Listen for keys in the query string and update
     * tokens if all keys are set
     */
    this._listenForQueryStringKeys = function listenForQueryStringKeys(){
      var self = this;
      $rootScope.$on('$locationChangeStart', function(event){
        var queryString = $location.search();
        if(!queryString.hasOwnProperty(self._options.accessTokenQueryStringKey)){
          return;
        }
        if(!queryString.hasOwnProperty(self._options.identityTokenQueryStringKey)){
          return;
        }
        if(!queryString.hasOwnProperty(self._options.refreshTokenQueryStringKey)){
          return;
        }
        self.setAccessToken(queryString[self._options.accessTokenQueryStringKey]);
        self.setIdentityToken(queryString[self._options.identityTokenQueryStringKey]);
        self.setRefreshToken(queryString[self._options.refreshTokenQueryStringKey]);
      });
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
