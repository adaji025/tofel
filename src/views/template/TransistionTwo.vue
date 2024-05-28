<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <AuthHeader />
    <div
      class="mt-10 max-w-[560px] mx-auto bg-[#FCFCFD] sm:rounded-t-xl p-5 sm:p-10 border-b"
    >
      <div class="text-lg md:text-2xl font-bold">Pronunciations Practice</div>
      <div class="mt-2">Past Simple vs the Present Perfect</div>
    </div>
    <div
      class="max-w-[560px] mx-auto bg-white py-5 px-6 grid gap-3 sm:rounded-b-xl"
    >
      <div
        @click="$router.push('/temp/lesson')"
        class="px-5 py-3 flex gap-10 items-center justify-between rounded-xl bg-[#F8F9FC] cursor-pointer"
        v-for="number in [...Array(5)]"
        :key="number"
        
      >
        <div class="font-bold">Have you been to Mexico?</div>
        <img src="@/assets/svg/arrow-outline.svg" alt="" />
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
