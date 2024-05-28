<script>
import Header from "@/components/Headers/AuthHeader.vue";
import LightingImage from "@/assets/svg/lightning.svg";
import HomeIcon from "@/assets/svg/port/home-icon.svg";
import ClipBoardIcon from "@/assets/svg/port/clipboard-alt.svg";
import UserIcon from "@/assets/svg/port/user-icon.svg";
import Feedback from "@/components/Result/Feedback.vue";
import ReviewAnswers from "@/components/Result/ReviewAnswers.vue";
import Button from "@/components/Button.vue";

export default {
  data() {
    return {
      LightingImage,
      HomeIcon,
      ClipBoardIcon,
      UserIcon,
      tabs: {
        active: "fluency",
      },
      isOpen: true,
    };
  },
  components: {
    Header,
    Feedback,
    Button,
    ReviewAnswers,
  },

  methods: {
    handleTabs(data) {
      this.tabs.active = data;
    },
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
    modalToggle(){
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<template lang="">
  <div class="bg-light min-h-screen">
    <Header class="sticky top-0 z-50" ></Header>
    <div
      class="sticky top-[90px] bg-white py-5 px-5 flex justify-between items-center sm:hidden">
      <div class="text-lg font-bold text-secondary">Estimated Band</div>
      <div
        class="p-5 bg-primary rounded-xl font-bold text-white text-[28px] z-[1]">
        7.5
      </div>
    </div>
    <div
      class="max-w-[1400px] mx-auto px-5 lg:px-10 pb-10 text-secondary xl:text-lg">
      <div
        class="flex flex-col sm:flex-row items-center sm:items-start sm:mt-10 gap-10 z-[1]">
        <div class="sm:sticky pt-7 sm:top-[100px] sm:w-1/2">
          <div class="flex flex-col gap-5 items-center justify-center">
            <div
              class="max-w-[240px] flex flex-col justify-center pb-8 px-10 bg-primary rounded-2xl text-white text-center">
              <div class="text-[96px] leading-tight font-bold">7.5</div>
              <div class="text-lg font-bold mt-5">Estimated Band</div>
            </div>
            <div
              class="mt-6 rounded-xl bg-black py-3 font-bold text-white px-6 flex items-center gap-2">
              <img :src="LightingImage" />
              Scoring
            </div>
            <div class="font-semibold">
              <span class="font-bold">Grammar</span>: 6.5
            </div>
            <div class="font-semibold">
              <span class="font-bold">Vocabulary</span>: 6.5
            </div>
            <div class="font-semibold">
              <span class="font-bold">Fluency & Coherence</span>: 6.5
            </div>
            <div class="font-semibold">
              <span class="font-bold">Pronunciation</span>: 6.5
            </div>
            <div class="font-semibold">
              <span class="font-bold">Speed </span>: 125.8 wpm
            </div>
            <div class="mt-5">
              <Button>Try other exams</Button>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div
            class="flex justify-center gap-3 text-secondary overflow-x-auto pb-3 w-full">
            <!-- 
            <div class="flex justify-center gap-3">
              <div class="pb-2 border-b-2 border-primary text-primary font-bold">Fluency</div>
              <div class="pb-2 border-b-2 text-secondary font-bold">Grammar</div>
              <div class="pb-2 border-b-2 text-secondary font-bold">Vocabulary</div>
              <div class="pb-2 border-b-2 text-secondary font-bold">Review Your Answers</div>
            </div> 
            -->
            <div
              @click="handleTabs('fluency')"
              class="cursor-pointer pb-2 border-b-2 font-bold"
              :class="
                tabs.active === 'fluency' && 'text-primary  border-primary '
              "
            >
              Fluency
            </div>
            <div
              @click="handleTabs('grammar')"
              :class="
                tabs.active === 'grammar' && 'text-primary border-primary '
              "
              class="cursor-pointer pb-2 border-b-2 font-bold"
            >
              Grammar
            </div>
            <div
              @click="handleTabs('vocabulary')"
              :class="
                tabs.active === 'vocabulary' && 'text-primary border-primary '
              "
              class="cursor-pointer pb-2 border-b-2 font-bold"
            >
              Vocabulary
            </div>
            <div
              @click="handleTabs('Review')"
              :class="
                tabs.active === 'Review' && 'text-primary border-primary '
              "
              class="cursor-pointer pb-2 border-b-2 font-bold whitespace-nowrap"
            >
              Review Audio
            </div>
          </div>
          <!-- Component / Feedback-->
          <Feedback></Feedback> 
          <div class="button-holder mt-7">
            <Button class="mr-3">
              Prev 
            </Button>
            <Button variant="outline">
              Next 
            </Button>
          </div>
          <!-- <ReviewAnswers></ReviewAnswers> -->
        </div>
      </div>
    </div>

    <div
      class="sticky bottom-0 px-5 py-10 bg-white flex justify-between sm:hidden">
      <div class="flex gap-2 flex-col justify-center items-center">
        <img :src="HomeIcon" class="hover:text-primary cursor-pointer" />
        <div class="h-2 w-2 rounded-full bg-primary"></div>
      </div>
      <div class="flex gap-2 flex-col justify-center items-center">
        <img :src="ClipBoardIcon" class="hover:text-primary cursor-pointer" />
        <div class="h-2 w-2 rounded-full"></div>
      </div>
      <div class="flex gap-2 flex-col justify-center items-center">
        <img :src="UserIcon" class="hover:text-primary cursor-pointer" />
        <div class="h-2 w-2 rounded-full"></div>
      </div>
    </div>
  </div>
</template>
<style></style>
