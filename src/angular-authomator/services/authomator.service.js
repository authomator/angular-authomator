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

      // Keys to identify tokens in query string
      accessTokenQueryStringKey: 'at',
      identityTokenQueryStringKey: 'it',
      refreshTokenQueryStringKey: 'rt',

      // Url's
      urls: {
        login: 'login'
      }
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
    function authomatorServiceFactory($rootScope, $location, jwtHelpers, queryStringHelpers){
      return new AuthomatorService($rootScope, $location, jwtHelpers, queryStringHelpers, options);
    }

    // Inject dependencies
    authomatorServiceFactory.$inject = ['$rootScope', '$location', 'jwtHelpers', 'queryStringHelpers'];

  }

  /**
   * Authomator service
   *
   * @constructor
   */
  function AuthomatorService($rootScope, $location, jwtHelpers, queryStringHelpers, options) {

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
    };

    /**
     * Listen for keys in the query string and update
     * tokens if all keys are set
     */
    this._listenForQueryStringKeys = function listenForQueryStringKeys(){
      var self = this;
      $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl){
        var queryString = queryStringHelpers.parseQueryString(newUrl);
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
     * Remove access token
     *
     * @returns {AuthomatorService} self
     */
    this.removeAccessToken = function removeAccessToken(){
      this.setAccessToken(null);
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
     * Remove identity token
     *
     * @returns {AuthomatorService} self
     */
    this.removeIdentityToken = function removeIdentityToken(){
      this.setIdentityToken(null);
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

    /**
     * Remove refresh token
     *
     * @returns {AuthomatorService} self
     */
    this.removeRefreshToken = function removeRefreshToken(){
      this.setRefreshToken(null);
    };

    /**
     * Get login url
     *
     * @returns {*}
     */
    this.getLoginUrl = function getLoginUrl(){
      return this._prefixUrl(this._options.urls.login);
    };

    /**
     * Prefix a url with the authomator url
     *
     * @param url
     */
    this._prefixUrl = function prefixUrl(url){
      var prefix = this._options.authomatorUrl;
      if(!prefix){
        return url;
      }
      if(prefix.charAt(prefix.length - 1) !== '/'){
        prefix += '/';
      }
      return prefix + url;
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
