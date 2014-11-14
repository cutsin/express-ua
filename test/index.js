var expressUA = require('../')
var assert = require('assert')
var async = require('async')

var req = {
  "method": "GET",
  "headers": {
    "accept": "*/*",
    "user-agent": ""
  }
}
var res = { locals: {} }
var next = function(){}


async.waterfall([

  // discard non-html
  function(cb){
    expressUA(req, res, function(){
      cb(null, assert.equal(req.ua, undefined))
    })
  },

  // should be an object
  function(msg, cb) {
    req.headers.accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    expressUA(req, res, function(){
      assert.equal(typeof req.ua, 'object')
      assert.equal(typeof res.locals.ua, 'object')
      cb(null, true)
    })
  },

  // PC, Windows, Chrome
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/5.0 (Windows NT 6.4; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.5 Safari/537.36"
    expressUA(req, res, function(){
      assert.equal(req.ua.browser, 'wk')
      assert.equal(req.ua.ver, '40')
      assert.equal(req.ua.os, 'Windows')
      assert.equal(res.locals.ua.join(' '), 'ua-wk ua-wk40 ua-win')
      assert.ok(!req.ua.device)
      assert.ok(req.ua.isModern)
      cb(null, true)
    })
  },

  // PC, Windows, IE7
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.40607; .NET CLR 1.0.3705)"
    expressUA(req, res, function(){
      assert.equal(res.locals.ua.join(' '), 'ua-ie ua-ie6 ua-win')
      assert.ok(req.ua.isObsolete)
      cb(null, true)
    })
  },

  // PC, Windows, IE8
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648)"
    expressUA(req, res, function(){
      cb(null, assert.ok(req.ua.isModern))
    })
  },

  // PC, Windows, Firefox
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/5.0 (Windows; U; Windows NT 6.0; ja; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6 (.NET CLR 3.5.30729)"
    expressUA(req, res, function(){
      assert.equal(res.locals.ua.join(' '), 'ua-ff ua-ff3 ua-win')
      cb(null, true)
    })
  },

  // Mac, OS X, Safari
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ja-jp) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"
    expressUA(req, res, function(){
      assert.equal(res.locals.ua.join(' '), 'ua-wk ua-wk3 ua-mac')
      cb(null, true)
    })
  },

  // Mac, OS X, Opera
  function(msg, cb) {
    req.headers['user-agent'] = "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; ja) Presto/2.10.289 Version/12.00"
    expressUA(req, res, function(){
      assert.equal(res.locals.ua.join(' '), 'ua-op ua-op12 ua-mac')
      cb(null, true)
    })
  },

  // PC, Windows, Lunascape
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MAGW; .NET4.0C; Lunascape 6.5.8.24780)"
    expressUA(req, res, function(){
      cb(null, assert.ok(req.ua.isObsolete))
    })
  },

  // Mobile, Symbian, Lunascape
  function(msg, cb) {
    req.headers['user-agent'] = "Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/013.016; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.2.8.10 3gpp-gba"
    expressUA(req, res, function(){
      cb(null, assert.equal(req.ua.device, 'Nokia N8'))
    })
  }

], function(err, res){
  console.log('test ok.')
})

