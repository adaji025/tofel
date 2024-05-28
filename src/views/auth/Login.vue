<script >
import axios from 'axios';
import AuthHeader from "@/components/Headers/AuthHeader.vue";
import Button from "@/components/Button.vue";
import OAuth from "@/components/OAuthLogin.vue";
import Alert from "@/components/Alert.vue";
import GeneralService from "@/service/GeneralService.js";

export default {
  data(){
    return {
      debug : false,
      username : null,
      password : null,
      loader : {
        active : false
      },
      response : {
        error : false,
        msg : "Invalid username or password"
      }
    }
  },

  components : { AuthHeader, Button, Alert, OAuth },

  created()
  {
    this.debug = GeneralService.GetDebugStatus();
    this.initLogin();
  },

  methods : {
    
    initLogin()
    {
       const handler = this.$route.params.init;

       if(handler!=='start')
       {
          this.manageProviderCallback(handler);
       }
    },

    requestHeader(type = null, base = '')
    {
      let param  = GeneralService.AxiosHeaders(type, base);
        
      return axios.create(param);
    },

    ProcessLogin()
    {
       if(this.username!==null&&this.password!==null)
       {
          if(this.username!==''&&this.password!=='')
          {
              this.Login(this.username, this.password);
          }
          else
          {
            this.response.error = true;
          }
       }
    },

    async Login(username, pswd)
    {
       this.loader.active = true;

        const http  = this.requestHeader('remote-api');
        const param = { email : username, password : pswd, client_id : GeneralService.GetClientId() };

        http.post('auth/login/user', param).then((response) => {
          
          let res = response.data;

          /**
           * Debugger
           * 
           * @description : check login response
           */
           GeneralService.debug(this.debug, { msg : 'login check [ response ] : ', obj : response.data });
          
          if(res.success==true)
          {
            GeneralService.UpdateBuild(true);
            this.$store.dispatch('Login', res.data);
            this.$router.push({ name : 'ExamOptionDashboard' });

            this.response.error = false;
            this.response.msg = null;
          }

        }).catch((error) => {
          console.error(error);
          this.response.msg = error.message;
          this.response.error = true;
        }).finally(() => {
          this.loader.active = false;
        });
    },

    /**
     * Manage provider
     * 
     * @description : this helps to manage provider callbacks from , facebook & google 
     *  - callback.success
     *  - callback.validation.error
     *  - callback.credentials.error
     *  - callback.error.login
     *  - callback.user.exist
     *  - redirect.not.validated
     */
    manageProviderCallback(type = null)
    {
       this.response.error = true;

       if(type=='callback.user.exist')
       {
          this.response.msg = 'User already exist. Please try to login';
       }else{
          this.response.msg = 'An error occured while processing your request';
       }
    }
  }
}
</script>

<template>
  <div class="bg-light min-h-screen">
    <Loading :active="loader.active"></Loading>
    <AuthHeader class="sticky top" />
    <div class="mt-20 max-w-[560px] mx-auto w-full p-7 bg-white sm:rounded-lg text-secondary">
      <h2 class="font-bold text-[24px] md:text-[32px]">Welcome to VTalk</h2>
      <div>Login and continue practicing</div>
      <form class="grid gap-5">
        <div class="grid gap-2">
          <label for="email">Email Address</label>
          <input
            type="email"
            v-model="username"
            placeholder="Enter email address"
            class="border outline-none p-3 rounded-lg"
          />
        </div>
        <div class="grid gap-2">
          <label for="email">Password </label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
            class="border outline-none p-3 rounded-lg"
          />
        </div>
        <Button class="py-3 mt-5" @click="ProcessLogin()">Login</Button>
        <OAuth></OAuth>
      </form>
      <div class="mt-5 text-center">
        Don’t have an account?
        <router-link to="/auth/register" class="text-primary font-semibold"
          >Sign Up</router-link
        >
      </div>
    </div>
  </div>
</template>
<style></style>
