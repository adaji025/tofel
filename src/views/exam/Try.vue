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
          <div
            class="font-bold text-[24px] max-w-[230px] sm:max-w-[unset] sm:text-[32px] text-center"
          >
            What would you like to do Today?
          </div>
        </div>
        <div class="mt-10 max-w-[600px] grid gap-5 w-full mx-auto bg-white p-5 sm:p-10 rounded-[12px]">
          <div
            @click="handleAnchor('/choose-language')"
            class="font-bold text-lg smtext-xl p-5 bg-[#F8F9FC] rounded-[10px] cursor-pointer border">
            AI Speaking Sessions
          </div>
          <div
            @click="handleAnchor('https://ielts.vtalkai.com', true)"
            class="font-bold text-lg smtext-xl p-5 bg-[#F8F9FC] rounded-[10px] cursor-pointer border">
            IELTS Mock Exams
          </div>
          <div
            @click="handleAnchor('/temp/learn')"
            class="font-bold text-lg smtext-xl p-5 bg-[#F8F9FC] rounded-[10px] cursor-pointer border">
            Lessons
          </div>
          <!--
          <div
            class="font-bold p-5 bg-[#EAECF5] rounded-[10px] flex items-center cursor-not-allowed justify-between text-[#717BBC] border">
            <div class="text-lg sm:text-xl">Lessons</div>
            <div class="text-sm">COMING SOON</div>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderTwo from "@/components/Headers/HeaderTwo.vue";

export default {
  components: {
    HeaderTwo,
  },

  methods : 
  {
    handleAnchor(path, domain = false)
    {
       if(domain){
        window.location = path;
       }else{
        this.$router.push(path);
       }
    }
  }
};
</script>
<style></style>
