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

  this._oauth.getOAuthRequestToken = function(extraParams, callback) {
    if (typeof extraParams == "function") {
      callback = extraParams;
      extraParams = {};
    }
     
    var requestUrl = this._requestUrl;
    if (extraParams.scope) {
      requestUrl = requestUrl += ('?scope=' + extraParams.scope);
      delete extraParams.scope;
    }

    if (this._authorize_callback)  {
      extraParams["oauth_callback"] = this._authorize_callback;
    }

    this._performSecureRequest(null, null, this._clientOptions.requestTokenHttpMethod, requestUrl, extraParams, null, null, function(error, data, response) {
      if (error)
        callback(error);
      else {
        var results = querystring.parse(data),
          oauth_token = results["oauth_token"],
          oauth_token_secret = results["oauth_token_secret"];

        delete results["oauth_token"]
        delete results["oauth_token_secret"]
        callback(null, oauth_token, oauth_token_secret, results)
      }
    })
  }
};

util.inherits(Strategy, OAuthStrategy);

Strategy.prototype.authenticate = function(req, options) {
  if (req.query && req.query.oauth_problem) {
    return this.fail();
  }

  OAuthStrategy.prototype.authenticate.call(this, req, options);
};


module.exports = Strategy;