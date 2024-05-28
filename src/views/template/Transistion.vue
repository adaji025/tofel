<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <AuthHeader />
    <div class="mt-10 max-w-[560px] mx-auto bg-[#FCFCFD] sm:rounded-t-xl">
      <div class="flex-1 p-6">
        <div class="flex items-center gap-5">
          <div class="box max-w-[120px] w-full min-h-[120px] rounded-2xl p-3">
            <div
              class="mt-4 font-bold text-white text-center text-sm font-mono"
            >
              Past Simple vs the Present Perfect
            </div>
          </div>
          <div>
            <h3 class="font-bold text-lg lg:text-2xl">
              Past Simple vs the Present Perfect
            </h3>
            <div class="flex items-center gap-2 mt-3">
              <img src="@/assets/svg/user-icon.svg" alt="" />
              <div class="text-primary font-medium">Mark Parker</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-[560px] mx-auto bg-white py-5 px-6 grid gap-3 sm:rounded-b-xl"
    >
      <div
        class="p-4 bg-[#F8F9FC] rounded-md cursor-pointer"
        v-for="(data, index) in examsData"
        :key="index"
        @click="
          index === 3
            ? $router.push('/temp/free-lesson')
            : $router.push('/temp/transition-2')
        "
      >
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <img
              src="@/assets/svg/play.svg"
              alt=""
              v-if="data.type === 'video'"
            />
            <img
              src="@/assets/svg/speak.svg"
              alt=""
              v-if="data.type === 'pronoun'"
            />
            <img
              src="@/assets/svg/mic-2.svg"
              alt=""
              v-if="data.type === 'speaking'"
            />
            <div class="font-bold text-xl">{{ data.title }}</div>
          </div>
          <div class="flex items-center gap-2">
            <img src="@/assets/svg/clock.svg" alt="" />
            <div class="whitespace-nowrap">{{ data.time }} mins</div>
          </div>
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
