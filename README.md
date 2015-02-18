# angular-authomator

AngularJS module to authenticate against an [Authomator](https://github.com/authomator/authomator) service.

[![Build Status](https://travis-ci.org/authomator/angular-authomator.svg?branch=master)](https://travis-ci.org/authomator/angular-authomator)

- lightweight (< 5KB minified)
- no external dependencies
- automatically handles Authomator query string parameters

## Usage

First install the module using bower:
 
```bash
$ bower install angular-authomator
```

and add the library to your application:

```xml
<script type="text/javascript" charset="utf-8" src="bower_components/angular-authomator/dist/angular-authomator.min.js"></script>
```

Then add the `authomator` module to the dependencies of your AngularJS application module:

```javascript
angular.module('yourApp', ['authomator']);
```

and configure the `authomator` service in a config block using the provider:

```javascript
angular
  .module('yourApp')
  .config(function(authomatorProvider){
    authomatorProvider.setOptions({
        authomatorUrl: 'http://your.authomator-service.com'
    });
  });
```

Now you can use the `authomator` service anywhere in your application code:

```javascript
angular
  .module('yourApp')
  .controller('SomeCtrl', function(authomator){
    
    var token = authomator.getAccessToken();
    
    // ...
    
  });
```

and listen for Authomator events on `$rootScope`:

```javascript
angular
  .module('yourApp')
  .controller('SomeCtrl', function($rootScope){
    
    $rootScope.$on('authomator.accessTokenUpdated', function(){
      // ...
    });
    
    $rootScope.$on('authomator.identityTokenUpdated', function(){
      // ...
    });
    
    $rootScope.$on('authomator.refreshTokenUpdated', function(){
      // ...
    });
    
  });
```

## The authomator service

The `authomator` service can be injected anywhere in your application and exposes the following API:

```javascript
// Set access token
authomator.setAccessToken(token);

// Get access token
var accessToken = authomator.getAccessToken();

// Set identity token
authomator.setIdentityToken(token);

// Get access token
var identityToken = authomator.getIdentityToken();

// Set refresh token
authomator.setRefreshToken(token);

// Get access token
var refreshToken = authomator.getRefreshToken();
```

## jwtHelpers service

The `jwtHelpers` service is mainly used internally but can also be injected anywhere in your application and exposes the following API:

```javascript
// Check if token is expired
jwtHelpers.isTokenExpired(token); // true/false

// Decode a token
var decoded = jwtHelpers.decodeToken(token); // Decoded token
```

## Events

The following events are emitted on `$rootScope`:

```javascript
// Listen for an updated access token
$rootScope.$on('authomator.accessTokenUpdated', function(event, decoded){
  // ...
});

// Listen for an updated identity token
$rootScope.$on('authomator.identityTokenUpdated', function(event, decoded){
  // ...
});

// Listen for an updated refresh token
$rootScope.$on('authomator.refreshTokenUpdated', function(event, decoded){
  // ...
});

```

For optimal performance, events are **emitted** on `$rootScope`, not **broadcasted**,
so you have to listen on `$rootScope` to hear them.

Listening on child `$scope` instances will not work.

## Change log

### v0.1.0

- Added example page
- Added query string parsing
- Added authomator service
- Added jwtHelpers service
- Added unit tests
- Added initial documentation

## License

Copyright (c) 2015 Jurgen Van de Moere

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

