<template>
  <div
    class="my-20 text-white mx-auto px-5 lg:px-10 improve min-h-[500px] flex flex-col gap-3 justify-center items-center"
  >
    <div class="max-w-[550px]">
      <div
        class="text-[24px] sm:text-[30px] lg:text-[48px] text-center font-bold"
      >
        Improve Your Speaking Skills Today
      </div>
      <div class="text-center mt-5">
        Sign up for VTalk and get personalized AI-powered practice for the TOFEL
        speaking exam.
      </div>
      <div class="flex justify-center">
        <Button class="mt-10 py-5" @click="SignUpLogin()">Sign Up/Login</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../../components/Button.vue";
export default {
  components: { Button },
};
</script>
<style scoped>
.improve {
  background: url(@/assets/png/improve-image.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
