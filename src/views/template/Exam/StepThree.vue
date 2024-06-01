<template>
  <div
    class="text-secondary bg-[#F8F9FC] flex flex-col justify-between h-screen"
  >
    <AuthHeader />

    <div class="py-20 bg-[#F8F9FC]">
      <div v-if="step === 0" class="blur">
        <div class="text-center px-5">
          <div class="mt-5 text-sm text-primary text-center">Directions</div>
          <div class="text-2xl font-bold">Speaking Question 1</div>
          <div class="mt-3 max-w-[576px] mx-auto">
            In psychology, the feeling of complete and energized focus in an
            activity is called flow. People who enter a state of flow lose their
            sense of time and have a feeling of great satisfaction. They become
            completely involved in an activity for its own sake rather than for
            what may result from the activity, such as money or prestige.
            Contrary to expectation, flow usually happens not during relaxing
            moments of leisure and entertainment, but when we are actively
            involved in a difficult enterprise, in a task that stretches our
            mental or physical abilities.”
          </div>
        </div>
      </div>

      <div v-if="step === 1">
        <div class="text-center px-5">
          <div
            class="mt-5 text-sm text-primary text-center flex items-center justify-center gap-2"
          >
            <div>Suggested Reading time: 45 seconds</div>
            <img src="@/assets/svg/book.svg" alt="" />
          </div>
          <div class="mt-3 max-w-[576px] mx-auto">
            In psychology, the feeling of complete and energized focus in an
            activity is called flow. People who enter a state of flow lose their
            sense of time and have a feeling of great satisfaction. They become
            completely involved in an activity for its own sake rather than for
            what may result from the activity, such as money or prestige.
            Contrary to expectation, flow usually happens not during relaxing
            moments of leisure and entertainment, but when we are actively
            involved in a difficult enterprise, in a task that stretches our
            mental or physical abilities.”
          </div>
        </div>
      </div>

      <div v-if="step === 2" class="max-w-[576px] mx-auto text-center">
        <img src="@/assets/png/direction.png" alt="" class="mx-auto" />
        <div class="text-xl md:text-2xl font-bold mt-3">
          Listen to this lecture
        </div>
      </div>

      <div v-if="step === 3" class="max-w-[576px] mx-auto text-center px-5">
        <div class="text-xl md:text-2xl font-bold">Speaking Question 3</div>
        <div class="mt-3">
          Explain flow and how the example used by the professor illustrates the
          concept.
        </div>
      </div>

      <div v-if="step === 4" class="max-w-[576px] mx-auto text-center px-5">
        <div class="text-xl md:text-2xl font-bold">Speaking Question 3</div>
        <div class="mt-3">
          Some people enjoy taking risks and trying new things. Others are not
          adventurous; they are cautious and prefer to avoid danger. Which
          behavior do you think is better? Explain why.
        </div>

        <div class="mt-5 text-sm font-bold text-black grid gap-1">
          <div>Preparation Time - 15 seconds</div>
          <div>Response Time - 15 seconds</div>
        </div>

        <div
          class="mt-10 w-full rounded-[16px] py-7 px-5 bg-white flex flex-col items-center justify-center"
        >
          <div class="font-bold text-xl">Preparation Time</div>
          <div class="flex items-center gap-3">
            <img src="@/assets/svg/clock.svg" alt="" class="w-[44px]" />
            <div class="font-bold text-[40px] md:text-[56px] text-[#293056]">
              00:06
            </div>
          </div>
        </div>
      </div>

      <div v-if="step === 5" class="max-w-[576px] mx-auto text-center px-5">
        <div class="text-xl md:text-2xl font-bold">Speaking Question 3</div>
        <div class="mt-3">
          Some people enjoy taking risks and trying new things. Others are not
          adventurous; they are cautious and prefer to avoid danger. Which
          behavior do you think is better? Explain why.
        </div>

        <div class="mt-5 text-sm font-bold text-black grid gap-1">
          <div>Preparation Time - 15 seconds</div>
          <div>Response Time - 15 seconds</div>
        </div>

        <div
          class="mt-10 w-full rounded-[16px] py-7 px-5 text-white bg-[#293056] flex flex-col items-center justify-center"
        >
          <div class="font-bold text-xl">Response Time</div>
          <div class="flex items-center gap-5">
            <img src="@/assets/svg/mic-4.svg" alt="" class="w-[34px]" />
            <div class="font-bold text-[40px] md:text-[56px]">00:06</div>
          </div>
        </div>
      </div>
    </div>
    <ModalVue :isOpen="isOpen" :title="title" :closeModal="closeModal">
      <img src="@/assets/svg/check.svg" alt="" class="mx-auto" />
      <div class="text-center mt-5 font-bold text-xl text-secondary">
        Response Submitted
      </div>
      <div class="mt-3 text-secondary text-center max-w-[345px] mx-auto">
        Response time is over. Please wait while we save your response.
      </div>
      <button
        class="disabled:bg-[#EAECF5] bg-primary py-2 px-6 mx-auto mt-5 rounded-md text-white disabled:text-[#B3B8DB] flex gap-2"
        @click="$router.push('/temp/exam-4')"
      >
        <span class="hidden lg:inline"> Next </span>
        <img src="@/assets/svg/arrow-right-white.svg" alt="" />
      </button>
    </ModalVue>
    <ExamFooter
      mainStep="3"
      :setStep="setStep"
      :step="step"
      :openModal="openModal"
    />
  </div>
</template>
<script>
import AuthHeader from "../../../components/Headers/AuthHeader.vue";
import ExamFooter from "../components/ExamFooter.vue";
import ModalVue from "../components/Modal.vue";

export default {
  components: {
    AuthHeader,
    ExamFooter,
    ModalVue,
  },

  data() {
    return {
      step: 0,
      mainStep: 1,
      isOpen: false,
      title: "Response Submitted",
    };
  },

  methods: {
    setStep() {
      this.step += 1;
      console.log(this.step);
    },
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
};
</script>
<style>
.blur {
  filter: blur(5px);
}
</style>
