<template>
  <div id="">
    <div class="login">
      <h3>Login</h3>
      <form @submit.prevent="pressed">
        <div class="login">
          <input type="text" placeholder="Email" v-model="email">

        </div>
        <div class="login">
          <input type="password" placeholder="password" v-model="password">

        </div>
        <v-btn @click="pressed">Login</v-btn>
        <div class="error" v-if="error">
          {{error}}
        </div>
      </form>

    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    email:"",
    password:"",
    error:"",
  }),
  methods: {
    pressed() {
      console.log('do login');
      this.$store.dispatch('users/login', {email:this.email,password:this.password})
      .catch(err=>{
        console.log(err);
        this.error=err
      })
    }
  }
}
</script>
<style  scoped>
.login{
  margin-top:50px;
  display:flex;
  width:100%;
  justify-content: center;
  align-items: center;
  flex-direction:column;
}
</style>
