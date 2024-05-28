<script>
import axios from 'axios';
import GeneralService from '@/service/GeneralService.js';
import ExceptionCustom from '@/components/Exception/Custom.vue';

export default {

  props : {
    prep_type : {
        type : String,
        required : false
    }
  },

  data() {
    return {
      debug : false,
      username : null,
      password : null,
      deafult_msgs : 
      {
        general : 'An error occured, please try again',
      },
      setup :
      {
         error : {status : false, msg : null},
         info  : [],
         data  : null,
      },
      is_loader : 
      {
        active : false,
        full_page : true
      },
    };
  },

  components : { ExceptionCustom },

  created ()
  {
    this.debug = true; // GeneralService.GetDebugStatus();
    this.initLogin();
  },

  methods: 
  {
    initLogin()
    {
      this.setup.error.msg = this.deafult_msgs.general;
      let secret = this.$route.params.secret;
      let key = this.$route.params.key;

      if(secret!==undefined&&key!==undefined)
      {
        this.username = GeneralService.Vcrypt('decrypt', key);
        this.password = GeneralService.Vcrypt('decrypt', secret);

        this.processLogin();
      }
    },

    requestHeaders(type = 'completion', base = '', auth = false, multipart = false)
    {
      let param = GeneralService.AxiosHeaders(type, base, auth, multipart);

      return axios.create(param);
    },

    processLogin()
    {
       if(this.username!==null&&this.password!==null)
       {
          if(this.username!==''&&this.password!=='')
          {
              this.login(this.username, this.password);
          }
          else
          {
            this.setup.error.status = true;
          }
       }
    },

    async login(username, pswd)
    {
        this.is_loader.active = true;

        const http  = this.requestHeaders('remote-api');

        const param = { 
          email : username, 
          password : pswd, 
          client_id : GeneralService.GetClientId() 
        };

        /**
         * Debugger
         * 
         * @description : login parameters quick check 
         */
        GeneralService.debug(this.debug, { msg : ' Check login param', obj : param});

        http.post('auth/login/user', param).then((response) => {
          
          /**
           * Debugger
           * 
           * @description : is login check successfull 
           */
          GeneralService.debug(this.debug, { msg : 'Check login page successfull :', obj : response.data });

          let res = response.data;
          
          if(res.success==true)
          {
            this.setup.data = res.data;

            GeneralService.UpdateBuild(true);
            this.$store.dispatch('Login', res.data);
            this.$router.push({ name : 'Try' });

            this.setup.error.msg = this.deafult_msgs.general;
            this.setup.error.status = false;
          }

        }).catch((error) => {
          console.log(error);

          this.setup.error.msg = 'Invalid email or password';
          this.setup.error.status = true;
        }).finally(() => {
          this.is_loader.active = false;
        });
    }
  }
}
</script>
<template>
  <div id="vt-guest-holder">
    <loading :active="is_loader.active"  :is-full-page="is_loader.full_page" ></loading>
    <ExceptionCustom v-if="!is_loader.active"></ExceptionCustom>
  </div>
</template>