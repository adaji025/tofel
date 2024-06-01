<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <AuthHeader />
    <div class="mt-20 max-w-[560px] mx-auto sm:rounded-t-xl text-center">
      <h3 class="font-bold text-lg lg:text-2xl">TOFEL Speaking</h3>
      <div>Select your exam type</div>
    </div>

    <div
      class="max-w-[560px] mt-10 mx-auto bg-white py-5 px-6 grid gap-3 sm:rounded-b-xl"
    >
      <div
        class="p-4 bg-[#F8F9FC] rounded-md cursor-pointer"
        v-for="(data, index) in examsData"
        :key="index"
        @click="$router.push('/temp/transition-2')"
      >
        <div class="flex items-center gap-2">
          <img src="@/assets/svg/mic-2.svg" alt="" />
          <div class="font-bold text-xl">{{ data.title }}</div>
        </div>
        <div
          class="mt-6 border border-primary/90 text-primary font-semibold p-4 rounded-md bg-white flex gap-2 justify-center items-center"
        >
          <div>Start</div>
          <img src="@/assets/svg/arrow-right.svg" alt="" />
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
  data() {
    return {
      examsData: [
        {
          title: "Video Lesson",
          type: "video",
          time: 5,
        },
        {
          title: "Pronounciation ",
          type: "pronoun",
          time: 6,
        },
        {
          title: "Guided Speaking Practice ",
          type: "speaking",
          time: 7,
        },
        {
          title: "Free Speaking Practice",
          type: "speaking",
          time: 8,
        },
      ],
    };
  },
};
</script>
<style>
.box {
  background: url("@/assets/png/gradient-bg.png");
  background-size: cover;
  background-position: center;
}
</style>
