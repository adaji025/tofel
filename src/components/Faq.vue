<template lang="">
  <div class="max-w-[1400px] mx-auto px-5 lg:px-10 mt-32 text-secondary">
    <div class="max-w-[540px]">
      <div class="font-bold text-[24px] sm:text-[32px] lg:text-[48px]">
        Frequently Asked Questions
      </div>
      <div class="mt-5 text-xl">
        Find answers to commonly asked questions about VTalk and the
        <span class="font-semibold">IELTS</span> speaking test.
      </div>
    </div>
    <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="(item, index) in items" :key="index">
        <div class="text-lg font-semibold">{{ item.title }}</div>
        <div class="mt-5">
          <a :href="item.url" v-if="item.url !== null">
            {{ item.text }}
          </a>
          <a v-else>
            {{ item.text }}
          </a>
        </div>
      </div>
    </div>
    <slot></slot>
    <div
      class="bg-light p-5 rounded-xl mt-10 flex flex-col sm:flex-row gap-5 justify-between items-center"
    >
      <div>
        <div class="text-lg font-semibold">Still have questions?</div>
        <div>
          Can’t find the answer you’re looking for? Please chat to our friendly
          team.
        </div>
      </div>

      <Button @click="GetInTouchRoute()" class="py-3">Get In Torch</Button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";

export default {
  data() {
    return {
      items: [
        {
          title: "Is the IELTS app suitable for all proficiency levels?",
          text: "Primarily designed for users at an intermediate proficiency level or above (B2), the app offers valuable practice and feedback. While not suitable for absolute beginners, it supports learners with foundational English skills preparing for the IELTS exam or aiming to improve their language proficiency.",
          url: null,
        },
        {
          title:
            "How accurate are the estimated scores provided by the IELTS app?",
          text: "Scores are meticulously analyzed, considering grammar, vocabulary, fluency, and pronunciation. Trained by IELTS experts, the AI simulates the exam environment closely. It continually improves based on data from thousands of exams, providing reliable performance indicators.",
          url: null,
        },
        {
          title: "Are these official IELTS questions?",
          text: "While not officially endorsed as genuine IELTS material, our questions closely resemble content from respected sources like The British Council, IDP, IELTS Australia, and the University of Cambridge ESOL Examinations. They offer a rigorous preparatory experience, often surpassing the complexity of the real test.",
          url: null,
        },
        {
          title: "How does the IELTS app work?",
          text: "Experience an AI-driven IELTS exam simulation where you engage with an AI avatar in 3 parts, mimicking the actual exam structure. Record your responses using your device's microphone. Your answers are then analyzed and scored, providing personalized feedback aligned with the IELTS rubric.",
          url: null,
        },
        {
          title: "Can I access the IELTS app offline?",
          text: "No, the app requires an internet connection for all functionalities, including practice, feedback review, and mock exams. Ensure you're connected to utilize the app's capabilities fully.",
          url: null,
        },
        {
          title: "What do I need to use the IELTS app?",
          text: "All you need is a mobile phone, tablet, or computer and a quiet environment for clear responses to the AI avatar's questions.",
          url: null,
        },
      ],
    };
  },
  components: { Button },
  methods: {
    GetInTouchRoute() {
      this.$router.push("/contact-us");
    },
  },
};
</script>
<style></style>
