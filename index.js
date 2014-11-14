/**
 * Middleware for Express
 * Print YUI style userAgent info on html & req.ua
 * Classify browser type by modern/mobile/obsolete
 */

var useragent = require('useragent')
var perfix = 'ua-'

module.exports = function(req, res, next) {
  // html request only
  if (req.method !== 'GET' || !/(text\/html|application\/xhtml\+xml|application\/xml|application\/json|text\/plain)/.test(req.headers.accept)) return next()

  var userAgent = req.headers['user-agent'],
      agent = useragent.parse(userAgent),
      is = useragent.is(userAgent),
      ua = []

  // browser family
  var browser = ''
  if (is.ie) {
    browser = 'ie'
  } else if (is.webkit) {
    browser = 'wk'
  } else if (is.mozilla) {
    browser = 'ff'
  } else if (is.opera) {
    browser = 'op'
  } else {
    browser = agent.family.toLowerCase()
  }
  ua.push(perfix + browser)

  // browser family with version
  var ver = agent.major
  if (ver) ua.push(perfix + browser + ver)

  // OS
  var os = agent.os.family
  ua.push(perfix + os.toLowerCase().slice(0,3))

  // classify browser
  var isModern =  ( is.webkit || is.mozilla || is.opera || is.ie && ver > 7) ? true : false
  var isObsolete = !isModern
  var isMobile =  ( is.mobile_safari ) ? true : false

  // mount to req, res
  res.locals.ua = ua
  req.ua = {
    os: os,
    browser: browser,
    ver: ver,
    isModern: isModern,
    isMobile: isMobile,
    isObsolete: isObsolete
  }

  // device
  var device = agent.device.family
  if (device != 'Other') {
    req.ua.device = device
  }

  next()
}