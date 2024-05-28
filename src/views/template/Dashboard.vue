<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen">
    <GuestHeaderVue />
    <div class="app-width">
      <div
        class="flex flex-col sm:flex-row justify-between items-center mt-20 pt-20 sm:pt-[unset] bg-white rounded-xl"
      >
        <div class="pl-5 lg:pl-10 pr-5 sm:pr-[unset]">
          <h2 class="text-[30px] lg:text-[40px] font-bold">
            Smart Learning Starts Here
          </h2>
          <div class="mt-1">
            Choose a topic that interests you and start learning today!
          </div>
        </div>
        <div>
          <img src="@/assets/png/guest.png" alt="vtalks" class="mt-10 w-full" />
        </div>
      </div>

      <div
        class="mt-10 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-5"
      >
        <div
          class="flex items-center gap-2 bg-white border border-[#a1a1df] p-3 rounded-md"
        >
          <img src="@/assets/svg/Search.svg" alt="" />
          <input
            type="text"
            placeholder="Search Lessons"
            class="outline-none w-full"
          />
          <img src="@/assets/svg/Microphone.svg" alt="" />
        </div>
        <select
          class="border border-primary p-3 rounded-md max-w-[100px] sm:max-w-[unset] sm:min-w-[100px]"
        >
          <option>Part 1</option>
          <option>Part 2</option>
        </select>
      </div>

      <div class="mt-10 grid gap-10 md:grid-cols-2">
        <div class="flex-1 border bg-white p-6 rounded-xl cursor-pointer" @click="$router.push('/temp/transition')" v-for="(data, index) in examsData" :key="index">
          <div class="flex items-center gap-5">
            <div :class="index % 2 === 0 ? 'box' : 'box-1'" class="max-w-[160px] w-full min-h-[160px] rounded-2xl p-3">
              <div
                class="border border-primary py-2 px-4 rounded-md text-sm font-bold text-primary bg-white w-max"
              >
                {{data.day}}
              </div>
              <div
                class="mt-4 font-bold text-white text-center text-sm font-mono"
              >
                {{data.title}}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-lg lg:text-2xl">
                {{data.title}}
              </h3>
              <div class="flex items-center gap-2 mt-3">
                <img src="@/assets/svg/user-icon.svg" alt="" />
                <div class="text-primary font-medium">{{data.author}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GuestHeaderVue from "../../components/Headers/GuestHeader.vue";
export default {
  components: {
    GuestHeaderVue,
  },
  data() {
    return {
      examsData: [
        {
          day: "Day 1",
          title: "Past Simple vs the Present Perfect",
          author: "Mark Parker",
        },
        {
          day: "Day 2",
          title: "Idioms with the Word Moon",
          author: "Mark Parker",
        },
        {
          day: "Day 3",
          title: "Active Verbs & Stative Verbs",
          author: "Mark Parker",
          desc: "",
        },
        {
          day: "Day 4",
          title: "Business Meetings",
          author: "Mark Parker",
        },
        {
          day: "Day 5",
          title: "B1 Comparative Adjectives",
          author: "Mark Parker",
        },
        {
          day: "Day 6",
          title: "B1 Superlative Adjectives",
          author: "Mark Parker",
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
.box-1 {
  background: url("@/assets/png/gradient-bg2.png");
  background-size: cover;
  background-position: center;
}
</style>
