/**
 * Module dependencies.
 */
var util = require('util')
  , url = require('url')
  , querystring = require('querystring')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


function Strategy(options, verify) {

  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'http://api.naturallycurly.com/uas/oauth/requestToken';
  options.accessTokenURL = options.accessTokenURL || 'http://api.naturallycurly.com/uas/oauth/accessToken';
  options.userAuthorizationURL = options.userAuthorizationURL || 'http://api.naturallycurly.com/uas/oauth/authenticate';
  options.sessionKey = options.sessionKey || 'oauth:naturallycurly';

  OAuthStrategy.call(this, options, verify);
  this.name = "naturallycurly";
};

util.inherits(Strategy, OAuthStrategy);

Strategy.prototype.authenticate = function(req, options) {
  if (req.query && req.query.oauth_problem) {
    return this.fail();
  }

  OAuthStrategy.prototype.authenticate.call(this, req, options);
};


Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {

  var profile = {
    provider: 'naturallycurly',
    id: '1',
    name: {
      familyName: "Morales",
      givenName: "Ivan"
    },
    email: "ivan@imorales.com",
    displayName: "Ivan Morales"
  };
  done(null, profile);
};

module.exports = Strategy;