<script>
  import HeaderTwo from "@/components/Headers/HeaderTwo.vue";
  import Button from "@/components/Button.vue";
  import CategoryDesc from "@/components/Category/Description.vue";
  import GeneralService from "@/service/GeneralService.js";
  import axios from 'axios';

  export default {
    
    components: {
      HeaderTwo,
      Button,
      CategoryDesc
    },

    data()
    {
      return {
          debug : false,
          lang : 'en',
          title : '',
          preset : null,
          desc : null,
          img : null,
          loader : {
            tests : false
          }
      }
    },

    created()
    {
      this.debug = GeneralService.GetDebugStatus();
      this.initCategoryDesc();
    },

    methods : 
    {
      initCategoryDesc()
      {
          /**
           * Language
           * 
           * @description : Select active language 
           */
          this.lang = this.$store.state.languages.active_lang;

          /**
           * Presets 
           * 
           * @description : Get preset category - title, descriptions e.t.c 
           */
          const presets = this.$store.state.ai_speaking.presets;
          const active  = presets.active;
          this.preset = presets[this.lang][active];
          this.title = this.preset.title;
          this.img = this.preset.img;
          this.desc = this.preset.desc;
      },

      requestHeaders(type = 'completion', base = '', auth = false, multipart = false)
      {
        let param = GeneralService.AxiosHeaders(type, base, auth, multipart);

        return axios.create(param);
      },

      async createTestDeatils(test_url) 
      {
        this.loader.tests = true;

        const http  = this.requestHeaders('remote-api','',true);
        const prep  = this.preset;
        const param = {
          title : "AI Language Speking - "+this.title,
          type  : "ai-speking-test",
          details: prep,
        };

        http.post("tests/parent/store", param).then((response) => {
            let res = response.data;

            if (res.success == true) {
              this.$store.dispatch("UpdateTestSync", res.data);
              this.$router.push(test_url);
            }
        }).catch((error) => {
            console.log(error);
            alert("An error occured please try again");
        }).finally(() => {
            this.loader.tests = false;
        });
      },
    
      startChat(path)
      {
        this.createTestDeatils(path)
      }
    }
  };
</script>
<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <Loading :active="loader.tests"></Loading>
    <HeaderTwo></HeaderTwo>
    <div class="max-w-[1400px] mx-auto sm:px-5 lg:px-10 mt-10 pb-10">
      <div
        class="flex gap-2 w-full relative items-center px-5 sm:px-[unset] cursor-pointer"
        @click="$router.back()">
        <img src="@/assets/svg/arrow-left-2.svg" alt="back" />
        <div class="font-bold">back</div>
      </div>
      <div class="mt-10 max-w-[560px] mx-auto border bg-white rounded-[12px] p-5 sm:p-10">
        <category-desc :category_title="title" :category_img="img" :category_desc="desc"></category-desc>
        <div class="flex justify-end mt-10">
          <Button
            class="max-w-[140px] w-full py-4 flex gap-2 items-center justify-center"
            @click="startChat('/chat')">
            <div class="font-bold text-2xl">Start</div>
            <img src="@/assets/svg/arrow-right-white.svg" alt="" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
