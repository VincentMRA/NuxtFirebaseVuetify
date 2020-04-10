import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit: (process.server && !process.static) ? async function ({commit},{req,store,context}){
    console.log('server init');
  } : () => { },
}
