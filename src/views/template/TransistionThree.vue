<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen pb-5">
    <AuthHeader />

    <div
      class="max-w-[560px] mx-auto bg-white py-10 px-6 grid gap-3 sm:rounded-[16px] mt-20"
    >
      <img src="@/assets/svg/mic-button.svg" alt="" class="" />
      <div class="mt-5 leading-6">
        <div class="text-sm text-primary">Exam Prep</div>
        <div class="font-bold text-lg md:text-2xl max-w-[320px]">
          Turn on mic
        </div>
        <div class="text-secondary max-w-[464px] mt-1">
          You will need to answer four questions out loud using the microphone.
        </div>
        <div class="mt-10 grid gap-5">
          <img src="@/assets/png/transition-3.png" alt="" />
          <div class="mt-5 flex justify-end">
            <Button class="py-5" @click="$router.push('/temp/lesson')"
              >Allow mic access</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/Button.vue";
import AuthHeader from "../../components/Headers/AuthHeader.vue";

export default {
  components: {
    AuthHeader,
    Button,
  },
};
</script>
<style></style>
