<template>
  <div class="text-secondary bg-[#F8F9FC] flex flex-col w-full min-h-screen">
    <AuthHeader />
    <div class="flex-1 flex items-center">
      <div class="max-w-[576px] mx-auto w-full p-10 bg-white">
        <img src="@/assets/svg/success-2.svg" alt="" class="mx-auto" />
        <h2 class="font-bold text-center text-2xl">Congratulations!</h2>
        <div class="mt-5 text-center max-w-[450px] mx-auto">
          You have completed the TOEFL SPEAKING SECTION Continue to get your
          final Score.
        </div>
        <button
          class="disabled:bg-[#EAECF5] bg-primary py-3 px-6 mx-auto mt-5 rounded-md text-white disabled:text-[#B3B8DB] flex gap-2"
          @click="$router.push('/temp/feedback/results')"
        >
          <span> View your results </span>
          <img src="@/assets/svg/arrow-right-white.svg" alt="" />
        </button>
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
