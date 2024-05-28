<script>
import HeaderTwo from "@/components/Headers/HeaderTwo.vue";
import Category from "@/components/Category/Main.vue"

export default {

  components: {
    HeaderTwo, Category
  },

  data() 
  {
    return {
      numbers: [1, 2, 3, 4, 5, 6],
      lang : 'en',
      presets : []
    };
  },

  created()
  {
    this.initCategory();
  },

  methods : 
  {
      initCategory()
      {
          this.lang = this.$store.state.languages.active_lang;
          const presets = this.$store.state.ai_speaking.presets;

          if(presets!==undefined)
          {
              switch(this.lang)
              {
                  case 'en' : this.presets = presets.en; break;
                  case 'fr' : this.presets = presets.fr; break;
                  case 'es' : this.presets = presets.es; break;
              }
          }

          console.log(this.presets);
      },

      selectCategory(category)
      { 
        this.$store.dispatch('SetCategory', category);

        let check_desc  = (this.presets[category].desc.length>0)? true : false;

        if(check_desc)
        {
          this.$router.push('/transition');
        }
        else
        {
          alert('An error occured please try again.')
        }
      }
  }
};
</script>
<template>
  <div class="text-secondary bg-[#F8F9FC] w-full min-h-screen">
    <HeaderTwo />
    <div class="max-w-[1400px] mx-auto sm:px-5 lg:px-10 pb-10">
      <div class="mt-10 flex items-center flex-col">
        <div class="flex w-full relative items-center justify-center">
          <img
            src="@/assets/svg/arrow-left-2.svg"
            alt=""
            class="absolute left-0 pl-5 sm:pl-[unset] cursor-pointer"
            @click="$router.back()"
          />
          <div class="font-bold text-[24px] ml-3 sm:ml-[unset] max-w-[230px] sm:max-w-[unset] sm:text-[32px] text-center">
            Choose a Category
          </div>
        </div>
        <div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 w-full p-3">
          <div
             v-for="(category, index) in presets" :key="index"
            class="border w-full bg-white p-5 rounded-[16px] cursor-pointer">
            <category 
              @click="selectCategory(index)" 
              :category_img="category.img" 
              :category_title="category.title">
            </category>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
