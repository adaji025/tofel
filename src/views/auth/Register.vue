<script>
import AuthHeader from "@/components/Headers/AuthHeader.vue";
import Button from "@/components/Button.vue";
import Country from "@/assets/json/country.json";
import Alert from "@/components/Alert.vue";
import GeneralService from "@/service/GeneralService.js";
import axios from "axios";

export default {
  components: {
    AuthHeader,
    Button,
    Alert
  },
  data() {
    return {
      step: true,
      country_json : Country,
      firstname : null,
      lastname : null,
      country_code : '',
      phone : null,
      email : null,
      password : null,
      test_id : null,
      confirm_pswd : null,
      response : {
        stage_1 : {
          error : false,
          msg : " Fill all required fields ( * )"
        },
        stage_2 : {
          error : false,
          msg : "Fill all required fields ( * )"
        }
      },
      loader : {
        active : false
      }
    };
  },
  created()
  {
    this.debug = GeneralService.GetDebugStatus();
    this.InitRegister();
  },
  methods: {

    InitRegister()
    {
      if(this.$store.state.test_sync?.id!==undefined)
      {
        this.test_id = this.$store.state.test_sync.id;
      }
    },

    requestHeader(type = null, base = '')
    {
      let param  = GeneralService.AxiosHeaders(type, base);
        
      return axios.create(param);
    },

    nextStep() 
    {
      if(this.firstname!==null&&this.lastname!==null&&this.country_code!==''&&this.phone!==null)
      { 
        if(this.firstname.trim()!==''&&this.lastname.trim()!==''&&this.country_code.trim()!==''&&this.phone.trim()!=='')
        {
          this.step = !this.step;
        }
      }else{
        this.response.stage_1.error = true;
      }
    },

    goBack()
    {
      this.step = !this.step;
      this.response.stage_1.error = this.response.stage_2.error;
      this.response.stage_1.msg = this.response.stage_2.msg;

    },

    SubmitForm()
    {
      this.response.stage_2.error = false;

      if(this.email!==null&&this.passowrd!==null)
      {
        if(this.email.trim()!==''&&this.password.trim()!==''&&this.confirm_pswd.trim()!=='')
        {
          if(this.password==this.confirm_pswd)
          {
            this.CreateAccount();
          }else{
            this.response.stage_2.error = true;
            this.response.stage_2.msg = ' Password and confrimation must match';
          }
        }
      }else{
        this.response.stage_2.error = true;
      }
    },

    async CreateAccount()
    {
      this.loader.active = true;

      const http  = this.requestHeader('remote-api');
      const param = { 
          firstname : this.firstname,
          lastname : this.lastname,
          email : this.email,
          phone : this.phone, 
          password : this.password, 
          repeat_password : this.confirm_pswd,
          country_code : this.country_code,
          client_id : GeneralService.GetClientId(),
          guest_test_id : this.test_id
      };

      /**
       * Debugger
       * 
       * @description : check request parameters
       */
      GeneralService.debug(this.debug, { msg : 'check [ param ] : ', obj : param });

      http.post('auth/register', param).then((response) => {

        let res = response.data;
        
        if(res.success==true)
        {
          GeneralService.UpdateBuild(true);
          this.$store.dispatch('Login', res.data);

          this.$router.push({ name : 'ExamOptionDashboard' });
        }

      }).catch((error) => {
        console.log(error);
        let err =  error.response.data;

        if(err.message=='Validation-Error')
        {
          let text = '';

          Object.entries(err.data).forEach( entry => {
              const [key, value] = entry;
              text += value[0]+' ';
          });

          this.response.stage_2.error = true;
          this.response.stage_2.msg = ' '+text;
        }
        else
        {
          alert('An error occured please try again later');
        }

      }).finally(() => {
        this.loader.active = false;;
      });
    },
  },
};
</script>

<template>
  <div class="bg-light min-h-screen">
    <Loading :active="loader.active"></Loading>
    <AuthHeader />
    <div v-if="step" class="max-w-[1200px] mx-auto px-5 lg:px-10">
      <div class="flex flex-col sm:flex-row mt-10 gap-5 sm:gap-2">
        <div class="w-full sm:w-1/2 text-primary">
          <div class="w-full h-1 bg-primary"></div>
          <div class="font-bold text-sm mt-2">Your details</div>
          <div class="text-sm">Please provide your name and number</div>
        </div>
        <div class="w-full sm:w-1/2">
          <div class="w-full h-1 bg-[#FFE4E8]"></div>
          <div class="font-bold text-sm mt-2">Protect your Vtalk account</div>
          <div class="text-sm">Enter your email and password</div>
        </div>
      </div>
      <div
        class="mt-10 max-w-[560px] mx-auto w-full p-7 bg-white sm:rounded-lg text-secondary">
        <h2 class="font-bold text-[24px] md:text-[32px]">
          Unlock your VTalk <br />
          Experience
        </h2>
        <div class="mt-1">Sign up in less than 2 minutes.</div>
        <Alert class="mt-3" v-if="response.stage_1.error" type="warning" :message="response.stage_1.msg"></Alert>
        <div class="grid gap-2 mt-3 text-secondary">
          <div class="grid sm:grid-cols-2 gap-5">
            <div class="grid gap-2">
              <label for="email">First Name *</label>
              <input
                v-model="firstname"
                placeholder="john"
                class="border outline-none p-3 rounded-lg"
              />
            </div>
            <div class="grid gap-2">
              <label for="email">Last Name *</label>
              <input
                v-model="lastname"
                placeholder="Doe"
                class="border outline-none p-3 rounded-lg"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <label for="email">Country *</label>
            <select 
              v-model="country_code"
              placeholder="" class="border outline-none p-3 rounded-lg overflow-hidden w-full text-sm">
              <option value="">. . .</option>
              <option
                class="text-ellipsis"
                :value="country.dial_code" v-for="(country, index) in country_json" :key="index">
                {{ country.name  }} ({{country.dial_code}})
              </option>
            </select>
          </div>
          <div class="grid gap-2">
            <label for="email">Phone *</label>
            <input v-model="phone" type="text" class="border outline-none p-3 rounded-lg" />
          </div>
          <Button class="py-4 mt-5" @click="nextStep()">Next</Button>
        </div>
        <div class="mt-5 text-center">
          Already have an account?
          <router-link to="/auth/login/start" class="text-primary font-semibold">Login</router-link>
        </div>
      </div>
    </div>
    <div v-else class="max-w-[1200px] mx-auto px-5 lg:px-10">
      <div class="flex flex-col sm:flex-row mt-10 gap-5 sm:gap-2">
        <div class="w-full sm:w-1/2 text-primary">
          <div class="w-full h-1 bg-primary"></div>
          <div class="font-bold text-sm mt-2">Your details</div>
          <div class="text-sm">Please provide your name and number</div>
        </div>
        <div class="w-full sm:w-1/2 text-primary">
          <div class="w-full h-1 bg-primary"></div>
          <div class="font-bold text-sm mt-2">Protect your Vtalk account</div>
          <div class="text-sm">Enter your email and password</div>
        </div>
      </div>
      <div
        class="mt-10 max-w-[560px] mx-auto w-full p-7 bg-white sm:rounded-lg text-secondary mb-5">
        <h2 class="font-bold text-[24px] md:text-[32px]">
          Unlock your VTalk <br />
          Experience
        </h2>
        <div class="mt-1">Sign up in less than 2 minutes.</div>
        <Alert class="mt-2" v-if="response.stage_2.error" type="warning" :message="response.stage_2.msg"></Alert>
        <div class="grid gap-2 mt-3 text-secondary">
          <div class="grid gap-2">
            <label for="email">Email Address </label>
            <input
              v-model="email"
              placeholder="johndoe@gmai.com"
              class="border outline-none p-3 rounded-lg"
            />
          </div>
          <div class="grid gap-2">
            <label for="email">Password </label>
            <input
              v-model="password"
              type="password"
              placeholder=""
              class="border outline-none p-3 rounded-lg"
            />
          </div>
          <div class="grid gap-2">
            <label for="email">Confirm Password </label>
            <input
              v-model="confirm_pswd"
              type="password"
              placeholder=""
              class="border outline-none p-3 rounded-lg"
            />
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <Button @click="goBack()" variant="outline" class="py-4 mt-5">Go Back</Button>
            <Button @click="SubmitForm()" class="py-4 mt-5">Get Started</Button>
          </div>
        </div>
        <div class="mt-5 text-center">
          Already have an account?
          <router-link to="/auth/login/start" class="text-primary font-semibold">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
