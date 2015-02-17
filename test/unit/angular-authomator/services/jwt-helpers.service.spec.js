'use strict';

describe('jwtHelpers', function() {

  var jwtHelpers;

  // Sample tokens generated on http://jwt.io/
  var tokenOneDecoded = {
    "sub": 1234567890,
    "name": "Jurgen Van de Moere",
    "admin": true
  }
  var tokenOneEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWV9.LIUWACi2-HTrH5aytl0GGVXH2kUorDOpYa2zODQeafs';

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

});
