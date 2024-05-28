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
            @click="$router.push('/temp/select-cefr')"
            class="flex items-center gap-5 bg-[#F8F9FC] p-5 rounded-[16px] border cursor-pointer">
            <img src="@/assets/svg/US.svg" alt="" class="h-5 w-5" />
            <div class="text-lg sm:text-xl cursor-pointer font-bold">
              English
            </div>
          </div>
          <div
            @click="$router.push('/temp/select-cefr')"
            class="flex items-center gap-5 bg-[#F8F9FC] p-5 rounded-[16px] border cursor-pointer">
            <img src="@/assets/svg/FR.svg" alt="" class="h-5 w-5" />
            <div class="text-lg sm:text-xl cursor-pointer font-bold">
              France
            </div>
          </div>
          <div
            @click="$router.push('/temp/select-cefr')"
            class="flex items-center gap-5 bg-[#F8F9FC] p-5 rounded-[16px] border cursor-pointer">
            <img src="@/assets/svg/ES.svg" alt="" class="h-5 w-5" />
            <div class="text-lg sm:text-xl cursor-pointer font-bold">
              Spainish
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderTwo from "@/components/Headers/HeaderTwo.vue";
import EnFlag from "@/assets/svg/US.svg";
  import FrFlag from "@/assets/svg/FR.svg";
  import EsFlag from "@/assets/svg/ES.svg";

export default {
  components: { HeaderTwo },
};
</script>
<style></style>
