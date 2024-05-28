<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen relative">
    <AuthHeader />
    <div class="min-h-[650px]">
      <div class="app-width text-center mt-10">
        <h3 class="text-lg md:text-2xl font-bold">Pronunciations Practice</h3>
        <div class="mt-2">Past Simple vs the Present Perfect</div>
        <div class="mt-5 font-bold text-[32px] lg:text-[40px]">
          Have you been to Mexico?
        </div>
        <div class="mt-10 flex justify-center">
          <img src="@/assets/svg/Volume-up.svg" alt="" />
        </div>
      </div>
      <div
        class="mt-10 max-w-[560px] mx-auto bg-white sm:rounded-xl p-5 sm:p-10 flex flex-col items-center"
      >
        <div
          class="flex h-[120px] w-[120px] bg-black rounded-full justify-center items-center"
        >
          <div
            class="flex w-[110px] h-[110px] border-4 border-white rounded-full justify-center items-center"
          >
            <img src="@/assets/svg/mic-1.svg" alt="" />
          </div>
        </div>
        <div class="text-center font-bold mt-5">Click to Speak</div>
      </div>
    </div>

    <div class="sticky w-full bottom-0 bg-white">
      <div class="h-1 w-[25%] bg-primary"></div>
      <div
        class="app-width py-5 flex flex-col sm:flex-row gap-2 justify-between items-center"
      >
        <div class="font-medium hidden sm:block">Question 1 of 4</div>
        <div class="max-w-[400px] w-full flex flex-col items-center">
          <div
            class="max-w-[380px] w-full border p-2 rounded flex gap-2 items-center"
          >
            <img src="@/assets/svg/success.svg" alt="" />
            <div class="font-medium">
              <span class="font-bold">Excellent!</span> you sound like a native
              speaker
            </div>
          </div>
          <div class="flex items-center mt-2 gap-2 w-full">
            <div class="flex-1 w-full h-1 bg-[#EAECF5] rounded">
              <div class="w-[65%] h-1 bg-primary"></div>
            </div>
            <div class="font-medium">62.4%</div>
          </div>
        </div>
        <div class="flex w-full sm:w-[unset] justify-between">
          <div class="font-medium sm:hidden">Question 1 of 4</div>
          <button
            disabled
            class="disabled:bg-[#EAECF5] bg-primary py-2 px-6 rounded-md text-white disabled:text-[#B3B8DB] flex gap-2"
          >
            <span class="hidden lg:inline"> Next </span>
            <img src="@/assets/svg/arrow-right-gray.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthHeader from "../../components/Headers/AuthHeader.vue";
export default {
  components: {
    AuthHeader,
  },
};
</script>
<style></style>
