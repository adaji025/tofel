<template>
  <div class="sticky w-full bottom-0 bg-white">
    <div
      :class="
        mainStep === 1
          ? 'w-[25%]'
          : mainStep === '2'
          ? 'w-[50%]'
          : mainStep === 3
          ? 'w-[75%]'
          : 'w-[100%]'
      "
      class="h-1 w-[25%] bg-primary"
    ></div>
    <div
      class="app-width py-5 flex flex-col sm:flex-row gap-2 justify-between items-center"
    >
      <div class="font-medium hidden sm:block">
        Question {{ mainStep }} of 4
      </div>
      <div class="max-w-[400px] w-full">
        <div class="flex items-center mt-2 gap-2 w-full">
          <img src="@/assets/svg/play-1.svg" alt="" />
          <div class="flex-1 w-full h-1 bg-[#EAECF5] rounded">
            <div class="w-[65%] h-1 bg-primary"></div>
          </div>
          <img src="@/assets/svg/Volume-up.svg" alt="" />
          <div class="font-medium">0.04/0.09</div>
        </div>
      </div>
      <div class="flex w-full sm:w-[unset] justify-between">
        <div class="font-medium sm:hidden">Question 1 of 4</div>
        <button
          class="disabled:bg-[#EAECF5] bg-primary py-2 px-6 rounded-md text-white disabled:text-[#B3B8DB] flex gap-2"
          @click="
            step === 3 && mainStep === 1
              ? openModal()
              : step === 5 && mainStep === '2'
              ? openModal()
              : setStep()
          "
        >
          <span v-if="step === 0 && mainStep === 1" class="hidden lg:inline">
            start
          </span>
          <span v-else class="hidden lg:inline"> Next </span>
          <img src="@/assets/svg/arrow-right-gray.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
    },
    mainStep: {
      type: Number,
    },
    setStep: {
      type: Function,
    },
    openModal: {
      type: Function,
    },
  },
};
</script>
<style lang=""></style>
