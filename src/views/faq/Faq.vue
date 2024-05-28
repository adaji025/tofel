<script>
import Button from "@/components/Button.vue";
import Testimonial from "@/views/home/components/Testimonial.vue";
import Footer from "@/components/Footer.vue";
import NavbarVue from "@/components/Headers/Navbar.vue";

export default {
  components: { NavbarVue, Button, Testimonial, Footer },
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
        // {
        //   title: "How much does this cost?",
        //   text: "Please click here for pricing plans.",
        //   url: "/#vtalk-pricing",
        // },
      ],
    };
  },
};
</script>
<template lang="">
  <div class="bg-[#F8F9FC]">
    <NavbarVue />
    <div class="mt-20 max-w-[1400px] mx-auto px-5 lg:px-10 text-secondary">
      <div class="text-[36px] lg:text-[48px] font-bold text-center">FAQs</div>
      <div class="max-w-[768px] mx-auto text-center md:text-lg">
        Everything you need to know about the product and billing. Can’t find
        the answer you’re looking for? Please chat to our friendly team.
      </div>
    </div>
    <div class="bg-white max-w-[1400px] mx-auto px-5 lg:px-10 mt-20">
      <div class="pt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <div
        class="bg-light max-w-[1200px] mx-auto p-5 rounded-xl mt-10 flex flex-col sm:flex-row gap-5 justify-between items-center"
      >
        <div>
          <div class="text-lg font-semibold">Still have questions?</div>
          <div>
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </div>
        </div>

        <Button @click="GetInTouchRoute()" class="py-4">Get In Torch</Button>
      </div>
    </div>

    <div class="bg-white pt-20">
      <div
        class="max-w-[1400px] mx-auto px-5 sm:pl-10 flex flex-col sm:flex-row items-center justify-between gap-10"
      >
        <div class="max-w-[576px]">
          <div class="text-[32px] lg:text-[48px] font-bold">
            Join 1,000+ People Improving with VTalk
          </div>
          <div class="flex gap-3 mt-5">
            <Button variant="outline" class="py-4 w-full sm:w-[unset]"
              >Learn More</Button
            >
            <Button class="py-4 w-full sm:w-[unset]">Get in Touch</Button>
          </div>
        </div>
        <div>
          <img src="@/assets/png/faq.png" class="hidden sm:inline" />
          <img src="@/assets/png/phone.png" class="sm:hidden" />
        </div>
      </div>
    </div>
    <Testimonial />
    <div class="mt-20 bg-[#0D0F1C]">
      <div
        class="py-20 text-white flex flex-col justify-center items-center px-5"
      >
        <h2 class="text-center font-bold text-[36px] lg:text-[48px]">
          Improve Your Speaking Skills Today
        </h2>
        <Button class="py-6 sm:py-5 mt-10 w-full sm:w-[unset]"
          >Sign Up/Login</Button
        >
      </div>
      <Footer />
    </div>
  </div>
</template>

<style></style>
