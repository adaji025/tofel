<script>
  import HeaderTwo from "@/components/Headers/HeaderTwo.vue";
  import EnFlag from "@/assets/svg/US.svg";
  import FrFlag from "@/assets/svg/FR.svg";
  import EsFlag from "@/assets/svg/ES.svg";

  export default {
    components: { HeaderTwo },
    data()
    {
        return{
            debug : false,
            languages : [],
            type : '',
            EnFlag,
            FrFlag,
            EsFlag
        }
    },

    created()
    {
        this.InitLanguages();
    },

    methods: 
    {
        InitLanguages()
        {
            this.languages = this.$store.state.languages.available;
        },

        SelectLanguage(source_lang)
        {
            this.$store.dispatch('SetDefaultLang', { lang : source_lang, type : 'source'});

            const target_lang = this.MutateTarget(source_lang);

            if(target_lang!=='')
            {
                this.$store.dispatch('SetDefaultLang', { lang : target_lang, type : 'target'});
                
                /**
                 * Debugger 
                 * 
                 * @description : N/A 
                 */
                console.log('# Dbugeer - check [ SetDefault ]');
                console.log(this.languages = this.$store.state.languages);

                this.$router.push('choose-category');
            }

        },

        getFlagUrl(lang)
        {
            var url = '';

            switch(lang)
            {
                case 'en' : url = this.EnFlag; break;
                case 'fr' : url = this.FrFlag; break;
                case 'es' : url = this.EsFlag; break;
            }

            return url;
        },

        MutateTarget(soruce)
        {
          let target = 'fr';

          if(soruce!=='en'){
            target = 'en';
          }

          return target
        }
    }

  };
</script>
<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <HeaderTwo />
    <div class="max-w-[1400px] mx-auto sm:px-5 lg:px-10">
      <div class="mt-10 flex items-center flex-col">
        <div class="flex w-full relative items-center justify-center">
          <img
            src="@/assets/svg/arrow-left-2.svg"
            alt=""
            class="absolute left-0 pl-5 sm:pl-[unset] cursor-pointer"
            @click="$router.back()"
          />
          <div class="font-bold text-[24px] max-w-[230px] sm:max-w-[unset] sm:text-[32px] text-center">
            Choose a language to learn
          </div>
        </div>
        <div class="mt-10 max-w-[600px] grid gap-5 w-full mx-auto bg-white p-5 sm:p-10 rounded-[12px]">
          <div
            v-for="(lang, index) in languages" :key="index"
            @click="SelectLanguage(lang.short_name)"
            class="flex items-center gap-5 bg-[#F8F9FC] p-5 rounded-[16px] border cursor-pointer">
            <img :src="getFlagUrl(lang.short_name)" alt="" class="h-5 w-5" />
            <div class="text-lg sm:text-xl cursor-pointer font-bold">
              {{ lang.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
