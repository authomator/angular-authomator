(function (angular) {

  /**
   * Authomator provider
   */
  function authomatorProvider(){

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
    this.$get = function () {

      /**
       * Constructor
       *
       * @constructor
       */
      function Authomator() {
        this._options = options;
      }

      return new Authomator();

    };

  }

  // Export
  angular
    .module('authomator')
    .provider('authomator', authomatorProvider);

})(angular);
