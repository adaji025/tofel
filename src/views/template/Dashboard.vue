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
          <ButtonVue
            @click="handleTryIt()"
            class="w-full md:w-1/2 mt-7 py-5"
          >
            <div class="font-bold">Take Your First Mock Exam</div>
          </ButtonVue>
        </div>
        <div>
          <img src="@/assets/png/guest.png" alt="vtalks" class="mt-10 w-full" />
        </div>
      </div>

      <div class="mt-10">
        <h3 class="text-[24px] sm:text-[32px] font-bold">Mock Speaking Exam</h3>
        <div>Sign up in less than 2 minutes.</div>
      </div>

      <div class="mt-10 grid gap-10 md:grid-cols-2 pb-10">
        <div
          class="flex-1 border bg-white p-6 rounded-xl cursor-pointer"
          @click="$router.push('/temp/transition')"
          v-for="(data, index) in examsData"
          :key="index"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <h3 class="font-bold text-xl">
              {{ data.title }}
            </h3>
            <div
              class="w-full sm:w-[unset] flex items-center justify-center gap-3 border border-primary px-6 py-3 rounded-md"
            >
              Start

              <img src="@/assets/svg/arrow-right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonVue from '../../components/Button.vue';
import GuestHeaderVue from "../../components/Headers/GuestHeader.vue";

export default {
  components: {
    GuestHeaderVue,
    ButtonVue
  },
  data() {
    return {
      examsData: [
        {
          title: "Implicit and Explicit Memory",
        },
        {
          title: "Swarm Intelligence",
        },
        {
          title: "Entertainment Merchandising",
        },
        {
          title: "Business Meetings",
        },
        {
          title: "B1 Comparative Adjectives",
        },
        {
          title: "B1 Superlative Adjectives",
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
