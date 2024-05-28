<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <AuthHeader />
    <div class="max-w-[1400px] mx-auto sm:px-5 lg:px-10">
      <div class="mt-10 text-center">
        <h3 class="text-[24px] md:text-[32px] font-bold">CEFR Level</h3>
        <div>Select your CEFR level</div>
      </div>
      <div
        class="mt-10 max-w-[560px] mx-auto bg-white py-5 px-6 grid gap-3 sm:rounded-xl"
      >
        <div
          class="p-4 bg-[#F8F9FC] rounded-md"
          v-for="(number, index) in [...Array(5)]"
          :key="number"
          @click="$router.push('/temp/guest')"
        >
          <div class="flex items-center gap-2">
            <img src="@/assets/svg/a1.svg" alt="" />
            <div class="font-bold text-xl">A{{ index + 1 }} Elementary</div>
          </div>
          <div
            class="mt-6 border border-primary/90 text-primary font-semibold p-4 rounded-md bg-white flex gap-2 justify-center items-center"
          >
            <div>Next</div>
            <img src="@/assets/svg/arrow-right.svg" alt="" />
          </div>
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
