import firebase from 'firebase/app'

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- END: Import Scripts ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

export default async ({ res }, inject) => {
  const options = {"config":{"apiKey":"AIzaSyALMtZF3WopNjQ-EwaZDKbxDq5Je1fwvXc","authDomain":"mra-vue.firebaseapp.com","databaseURL":"https:\u002F\u002Fmra-vue.firebaseio.com","projectId":"mra-vue","storageBucket":"mra-vue.appspot.com","messagingSenderId":"606160825857","appId":"1:606160825857:web:9e51bfed7565b25b06da00"},"onFirebaseHosting":true,"services":{"auth":{"persistence":"local","initialize":{"onAuthStateChangedMutation":"users\u002FSET_LOGGED","onAuthStateChangedAction":"users\u002FgetUserInfo"},"ssr":{"credential":"~\u002Fassets\u002FserviceAccount.json"}},"realtimeDb":true,"functions":{"location":"us-central1","emulatorPort":5001}}}
  const firebaseConfig = options.config

  // Resolve the firebase app corresponding to the server user
  let session
  if (process.server && res && res.locals && res.locals.user) {
    session = firebase.apps.find(a => a.name === res.locals.user.uid) || firebase.initializeApp({
      ...firebaseConfig,
      _created: Date.now()
    }, res.locals.user.uid)
    res.locals._session = session
  } else {
    session = firebase.apps.find(a => a.name === '[DEFAULT]') || firebase.initializeApp(firebaseConfig)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

    await import(/* webpackChunkName: 'firebase-auth' */'firebase/auth')

    const fireAuth = session.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)

    if (process.client && options.services.auth.persistence) {
      const persistence = options.services.auth.persistence

      try {
        await fireAuth.setPersistence(persistence)
      } catch (err) {
        if (err.code === 'auth/invalid-persistence-type') {
          console.warn(`[@nuxtjs/firebase]: Invalid persistence type '${persistence}' provided`)
        } else if (err.code === 'auth/unsupported-persistence-type') {
          console.warn(`[@nuxtjs/firebase]: Persistence type '${persistence}' is not supported in this environment.`)
        }
      }
    }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

    await import(/* webpackChunkName: 'firebase-database' */'firebase/database')

    const fireDb = session.database()
    const fireDbObj = firebase.database
    inject('fireDb', fireDb)
    inject('fireDbObj', fireDbObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FIRESTORE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------------ FIREBASE STORAGE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FUNCTIONS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

    await import(/* webpackChunkName: 'firebase-functions' */'firebase/functions')

    // If .location is undefined, default will be "us-central1"
    const fireFunc = session.functions(options.services.functions.location)
    const fireFuncObj = firebase.functions

    // Uses emulator, if emulatorPort is set.
    if (options.services.functions.emulatorPort) {
      fireFunc.useFunctionsEmulator(`http://localhost:${options.services.functions.emulatorPort}`)
    }

    inject('fireFunc', fireFunc)
    inject('fireFuncObj', fireFuncObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE ANALYTICS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side

  /** --------------------------------------------------------------------------------------------- **/
  /** --------------------------------- FIREBASE REMOTE CONFIG DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
}
