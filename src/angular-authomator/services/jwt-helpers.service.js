(function (angular) {

  /**
   * JWT helpers service
   *
   * Inspired by
   * https://github.com/auth0/angular-jwt/blob/master/src/angularJwt/services/jwt.js
   *
   * @constructor
   */
  function JwtHelpersService($window) {

    /**
     * Decode string
     *
     * @param str
     * @returns {string}
     */
    this.urlBase64Decode = function (str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0:
        {
          break;
        }
        case 2:
        {
          output += '==';
          break;
        }
        case 3:
        {
          output += '=';
          break;
        }
        default:
        {
          throw 'Illegal base64url string!';
        }
      }
      //polifyll https://github.com/davidchambers/Base64.js
      return $window.decodeURIComponent($window.escape($window.atob(output)));
    };


    /**
     * Decode token
     *
     * @param token
     * @returns {object} - Decoded token
     */
    this.decodeToken = function (token) {
      var parts = token.split('.');
      var decoded;
      if (parts.length !== 3) {
        return null;
      }
      decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
        return null;
      }
      return JSON.parse(decoded);
    };

    /**
     * Get expiration date of token
     *
     * @param token
     * @returns {*}
     */
    this.getTokenExpirationDate = function (token) {
      var decoded = this.decodeToken(token);

      if (!decoded.exp) {
        return null;
      }

      // The 0 here is the key, which sets the date to the epoch
      var d = new Date(0);
      d.setUTCSeconds(decoded.exp);
      return d;
    };

    /**
     * Check if token is expired
     *
     * @param token
     * @returns {boolean} - Whether or not token is expired
     */
    this.isTokenExpired = function (token) {
      var d = this.getTokenExpirationDate(token);
      if (!d) {
        return false;
      }
      return (d.valueOf() <= new Date().valueOf());
    };

  }

  JwtHelpersService.$inject = ['$window'];

  // Export
  angular
    .module('authomator')
    .service('jwtHelpers', JwtHelpersService);

})(angular);
