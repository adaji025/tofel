<template lang="">
  <div class="bg-[#F8F9FC] text-secondary">
    <NavbarVue />
    <div
      class="max-w-[1400px] mx-auto px-5 lg:px-10 mt-20 flex flex-col sm:flex-row items-end gap-10"
    >
      <div class="sm:w-[65%]">
        <h3 class="text-primary">About us</h3>
        <div class="font-bold text-[40px] lg:text-[56px]">
          Master TOFEL Speaking
        </div>
        <div class="mt-2 lg:text-xl max-w-[750px]">
          VTalk is your personalized AI-powered coach for IELTS speaking
          preparation, boosting your confidence and scores.
        </div>
      </div>
      <div class="flex-1 w-full">
        <Button class="w-full py-6">
          <div @click="HandlePermission()" class="font-bold">
            Try it out now
          </div>
        </Button>
      </div>
    </div>

    <div class="mt-20 pt-20 bg-white">
      <div class="max-w-[560px] mx-auto text-center mt-20">
        <div class="text-[24px] lg:text-[32px] font-bold">
          Empowering You to Excel in the TOFEL Speaking Exam
        </div>
        <div class="text-lg mt-2">
          VTalk helps you ace the IELTS speaking test! Get personalized
          practice, live feedback, and score estimates.
        </div>
      </div>

      <div
        class="relative mt-20 max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row gap-10"
      >
        <div class="md:w-1/2">
          <img src="@/assets/svg/mic-3.svg" />
          <div class="text-2xl font-bold mt-2">WHO ARE WE?</div>
          <div class="mt-3 text-lg md:max-w-[550px]">
            Our team, a blend of dedicated educators, language specialists, and
            technologists from across the globe, is on a mission to transform
            the landscape of education and career advancement. We boast an elite
            team, rich in decades of expertise in language education and
            recognized exams like IELTS, TOEFL, TOEIC, OET, and PTE.
            <br />
            <br />
            At the heart of our philosophy is the conviction that education must
            be universally accessible. We endeavor to realize this through the
            innovative use of Artificial Intelligence (AI), offering
            cost-effective educational solutions to individuals from diverse
            backgrounds worldwide.
            <br />
            <br />
            While our company is headquartered in Delaware, USA, our team's
            footprint extends across four continents, underlining our commitment
            to the global democratization of education.
          </div>
        </div>
        <div class="flex-1">
          <img src="@/assets/png/about-1.png" class="mx-auto" />
        </div>
        <!-- <img
          src="@/assets/png/line-pattern.png"
          class="absolute right-0 bottom-0 hidden md:inline-block"
        /> -->
      </div>
      <div
        class="relative mt-20 max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row gap-10"
      >
        <div class="md:w-1/2 order-1 md:order-2">
          <div class="text-lg md:max-w-[550px] ml-auto">
            <img src="@/assets/svg/file.svg" />
            <div class="text-2xl font-bold mt-2">WHAT iS VTALK?</div>
            <div class="mt-3">
              VTalk is an AI-powered Speaking app focusing on Exam
              preparation(IELTS, TOEFL, TOEC, OET & PTE) and Language learning.
              <br /><br />
              We offer mock exams simulating a real test environment and upon
              completion provide personalised feedback on grammar, vocabulary,
              fluency and pronunciation with an estimated score.
            </div>
          </div>
        </div>
        <div class="flex-1 order-2 md:order-1">
          <img src="@/assets/png/about.png" class="mx-auto" />
        </div>
        <!-- <img
          src="@/assets/png/line-pattern.png"
          class="absolute left-0 bottom-0 hidden md:inline-block"
        /> -->
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
        <Button @click="SignUp()" class="py-6 sm:py-5 mt-10 w-full sm:w-[unset]"
          >Sign Up/Login</Button
        >
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import NavbarVue from "@/components/Headers/Navbar.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import Testimonial from "../home/components/Testimonial.vue";

export default {
  components: {
    NavbarVue,
    Button,
    Testimonial,
    Footer,
  },
  methods: {
    handleTryIt() {
      const auth = Auth.UserSettings();

      if (auth.user || auth.settings.guest.active) {
        this.$router.push("/exam/option/dashboard");
      } else {
        let path = this.guestPath();

        if (path !== null) {
          this.$router.push(path);
        }
      }
    },

    HandlePermission() {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then(async () => {
          this.handleTryIt();
        });
    },

    guestPath() {
      let secret = import.meta.env.VITE_VTALK_GUEST_SECRET;
      let key = import.meta.env.VITE_VTALK_GUEST_KEY;

      let guest_path = null;

      if (secret !== undefined && key !== undefined) {
        guest_path = "/guest/access/" + key + "/data/" + secret;
      }

      return guest_path;
    },

    SignUp() {
      this.$router.push("/auth/register");
    },
  },
};
</script>
<style lang=""></style>
