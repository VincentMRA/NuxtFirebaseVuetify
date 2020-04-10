import Cookie from "js-cookie"

const state = ()=>({
  user:null
})
export const mutations={
  SET_LOGGED:(state, {authUser,claims})=>{
    console.log('SETUSER');
    if (!authUser){
      console.log('no user');
      state.logged=false
    } else {
      state.logged=true
    }
  },
  SET_USER:(state,payload)=>{
    console.log('SETUSER:', payload);
    state.user=payload
  }
}




 export const actions = {
   async testing({commit, store, dispatch},info){
     console.log(info);
   },
   async getUserInfo({commit, store, dispatch},info){
     try {
       console.log(info.claims);
       if (!true.authUser) {
         return
       } else {
         const email=info.claims.email
         const uid=info.claims.uid
         const userref= await this.$fireDb.ref('users').orderByChild('email').equalTo(email).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot) {
             var childKey = childSnapshot.key;
             var user = childSnapshot.val();
             user['.key']=childKey
             user.uid=uid
             commit('SET_USER',user)
           });
         })
       }
     } catch (e) {
       console.log(e);
       throw e
     }
   },
   async logout({commit}){
     await this.$fireAuth.signOut()
     $nuxt.$router.push('/login')
   },
   async login({commit, dispatch, route}, account){
     try {
       // login with firebase
       console.log('try login');
       await this.$fireAuth.signInWithEmailAndPassword(account.email,account.password)
       console.log('LOGGED IN!');
       // dispatch('getUserInfo',info)
       let route=$nuxt.$router.currentRoute
       console.log($nuxt.$router.currentRoute.query);
       if(route.query && route.query.to){
         console.log(route.query.to);
         $nuxt.$router.push(route.query.to)
       } else {
         $nuxt.$router.push('/secret')
       }
     } catch (e) {
       console.error(e);
       throw e
     }
   }
 }
