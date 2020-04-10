// export default function({store, route, redirect}){
//
//
//   const user=store.state.users.user
//   const blockedRoute="secret"
//   const homeRoute="/login"
//   console.log( console.log(route.path),route.path.includes(blockedRoute), user);
//
//
//
//   if (!user && route.path.includes(blockedRoute) ){
//     console.log('redirect');
//     redirect('/login')
//   }
//
//   if (user && route.path.includes(homeRoute)){
//     redirect("/secret")
//   }
// }
