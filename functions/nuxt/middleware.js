const middleware = {}

middleware['auth'] = require('../../src/middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['authenticated'] = require('../../src/middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

export default middleware
