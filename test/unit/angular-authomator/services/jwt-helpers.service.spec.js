'use strict';

describe('jwtHelpers', function() {

  var jwtHelpers;

  // Sample tokens generated on http://jwt.io/
  var tokenOneDecoded = {
    "sub": 1234567890,
    "name": "Jurgen Van de Moere",
    "admin": true
  };
  var tokenOneEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWV9.LIUWACi2-HTrH5aytl0GGVXH2kUorDOpYa2zODQeafs';

  var tokenExpiredDecoded = {
    "sub": 1234567890,
    "name": "Jurgen Van de Moere",
    "admin": true,
    "exp": 100
  };
  var tokenExpiredEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWUsImV4cCI6MTAwfQ.TyLjDCcAvsGbF2cAqUkfwDJwS6qyDapuAszTgnHqe1M';

  var tokenUnexpiredDecoded = {
    "sub": 1234567890,
    "name": "Jurgen Van de Moere",
    "admin": true,
    "exp": 2424189015835
  };
  var tokenUnexpiredEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWUsImV4cCI6MjQyNDE4OTAxNTgzNX0.q6cI51q04htnQQfemJhbksfnTkR3Q1hC-LZM5jqv1_o';

  beforeEach(module('authomator'));

  beforeEach(inject(function(_jwtHelpers_){
    jwtHelpers = _jwtHelpers_;
  }));

  it('should exist', function () {
    expect(jwtHelpers).to.be.an('object');
  });

  describe('#decodeToken(validToken)', function () {

    it('should correctly decode token', function () {
      expect(jwtHelpers.decodeToken(tokenOneEncoded)).to.deep.equal(tokenOneDecoded);
    });

  });

  describe('#isTokenExpired(tokenWithoutExpiryDate)', function(){

    it('should return false', function(){
      expect(jwtHelpers.isTokenExpired(tokenOneEncoded)).to.equal(false);
    });

  });

  describe('#isTokenExpired(unexpiredToken)', function(){

    it('should return false', function(){
      expect(jwtHelpers.isTokenExpired(tokenUnexpiredEncoded)).to.equal(false);

    });

  });

  describe('#isTokenExpired(expiredToken)', function(){

    it('should return true', function(){
      expect(jwtHelpers.isTokenExpired(tokenExpiredEncoded)).to.equal(true);
    });

  });


});
