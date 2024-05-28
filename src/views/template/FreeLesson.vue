<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen relative">
    <AuthHeader />

    <div class="app-width text-center mt-10">
      <h3 class="text-lg md:text-2xl font-bold">Free Speaking Practice</h3>
      <div class="mt-2">
        Have a conversation with your AI avatar simulating real life.
      </div>

      <div class="mt-10 flex justify-center">
        <img src="@/assets/png/tutor.png" alt="" />
      </div>
    </div>

    <div
      class="max-w-[560px] mx-auto bg-white sm:rounded-xl p-5 sm:p-10 flex flex-col items-center"
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
