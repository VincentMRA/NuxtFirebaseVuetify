import admin from 'firebase-admin'

const options = {"credential":"\u002Fhome\u002Fvincent\u002FProjects\u002Ftes\u002Fsrc\u002Fassets\u002FserviceAccount.json","config":{"apiKey":"AIzaSyALMtZF3WopNjQ-EwaZDKbxDq5Je1fwvXc","authDomain":"mra-vue.firebaseapp.com","databaseURL":"https:\u002F\u002Fmra-vue.firebaseio.com","projectId":"mra-vue","storageBucket":"mra-vue.appspot.com","messagingSenderId":"606160825857","appId":"1:606160825857:web:9e51bfed7565b25b06da00"}}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  if (options.credential) {
    const credential =
      typeof options.credential === 'boolean'
        ? admin.credential.applicationDefault()
        : admin.credential.cert(options.credential)

    admin.initializeApp({
      credential,
      ...options.config
    })
  } else {
    admin.initializeApp(options.config)
  }
}

export default async ({ req, res }) => {
  if (!req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = options.credential
        ? await admin.auth().getUser(decodedToken.uid)
        : simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
          allClaims: decodedToken
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
