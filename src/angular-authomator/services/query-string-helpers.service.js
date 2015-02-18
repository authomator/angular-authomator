(function (angular) {

  /**
   * Query string helpers service
   *
   * @constructor
   */
  function QueryStringHelpersService($window) {

    /**
     * Decode URI component and make sure no
     * errors are thrown
     *
     * @param value
     * @returns {string}
     */
    this.tryDecodeURIComponent = function tryDecodeURIComponent(value) {
      try {
        return decodeURIComponent(value);
      } catch (e) {
        // Ignore any invalid uri component
      }
    };

    /**
     * Parse an escaped url query string into key-value pairs
     *
     * @returns {Object.<string,boolean|Array>}
     */
    this.parseKeyValue = function parseKeyValue(/**string*/keyValue) {
      var self = this;
      var obj = {}, keyValuePair, key;
      angular.forEach((keyValue || '').split('&'), function(keyValue) {
        if (keyValue) {
          keyValuePair = keyValue.replace(/\+/g,'%20').split('=');
          key = self.tryDecodeURIComponent(keyValuePair[0]);
          if (angular.isDefined(key)) {
            var val = angular.isDefined(keyValuePair[1]) ? self.tryDecodeURIComponent(keyValuePair[1]) : true;
            if (!Object.hasOwnProperty.call(obj, key)) {
              obj[key] = val;
            } else if (angular.isArray(obj[key])) {
              obj[key].push(val);
            } else {
              obj[key] = [obj[key],val];
            }
          }
        }
      });
      return obj;
    };

    /**
     * Parse query string
     *
     * Grab part after ? and delegate to parseKeyValue
     *
     * @param url
     * @returns {Object.<string, boolean|Array>}
     */
    this.parseQueryString = function parseQueryString(url){
      var queryString = '';
      if(url && url.split){
        queryString = url.split('?')[1];
      }
      return this.parseKeyValue(queryString);
    };

  }

  QueryStringHelpersService.$inject = ['$window'];

  // Export
  angular
    .module('authomator')
    .service('queryStringHelpers', QueryStringHelpersService);

})(angular);
