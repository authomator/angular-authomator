'use strict';

describe('queryStringHelpers', function() {

  var queryStringHelpers;

  var token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKdXJnZW4gVmFuIGRlIE1vZXJlIiwiYWRtaW4iOnRydWV9.LIUWACi2-HTrH5aytl0GGVXH2kUorDOpYa2zODQeafs';
  var token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiUmVmcmVzaCBUb2tlbiAyIiwibmFtZSI6Ikp1cmdlbiBWYW4gZGUgTW9lcmUiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoyNDI0MTg5MDE1ODM1fQ.hfLDIkU6fXoJLtp8yb3os-qCb1cIc2tZ_R1mrDZIj90';
  var token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInRpdGxlIjoiUmVmcmVzaCBUb2tlbiAxIiwibmFtZSI6Ikp1cmdlbiBWYW4gZGUgTW9lcmUiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoyNDI0MTg5MDE1ODM1fQ.FPmaXS5QhREqwhAt0e62tfo0Wt7dpRTwEzCzIh0wT9s';

  beforeEach(module('authomator'));

  beforeEach(inject(function(_queryStringHelpers_){
    queryStringHelpers = _queryStringHelpers_;
  }));

  it('should exist', function () {
    expect(queryStringHelpers).to.be.an('object');
  });

  describe('#parseQueryString(url)', function () {

    it('should correctly parse query string key value pairs', function () {
      var url = '?one=' + token1 + '&two=' + token2 + '&three=' + token3;
      var parsed = queryStringHelpers.parseQueryString(url);
      expect(parsed.one).to.equal(token1);
      expect(parsed.two).to.equal(token2);
      expect(parsed.three).to.equal(token3);
    });

  });

});
