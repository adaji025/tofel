<script>
import Navbar from "@/components/Headers/Navbar.vue";
import Banner from "@/views/home/components/Banner.vue";
import AiPowered from "@/views/home/components/AiPowered.vue";
import Master from "@/views/home/components/Master.vue";
import Feedback from "@/views/home/components/Feedback.vue";
import Proficiency from "@/views/home/components/Proficiency.vue";
import PricingPlanVue from "@/views/home/components/PricingPlan.vue";
import ContactUs from "@/views/home/components/ContactUs.vue";
import ImproveSkill from "@/views/home/components/ImproveSkill.vue";
import Faq from "@/components/Faq.vue";
import Footer from "@/components/Footer.vue";
import TestimonialCarousel from "./components/TestimonialCarousel.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: {
    Navbar,
    Banner,
    AiPowered,
    Master,
    Feedback,
    Proficiency,
    PricingPlanVue,
    ImproveSkill,
    Faq,
    Footer,
    ContactUs,
    TestimonialCarousel,
    Swiper,
    SwiperSlide,

    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log("slide change");
      };
      return {
        onSwiper,
        onSlideChange,
      };
    },
  },

  data() {
    return {
      testimonialData: [
        {
          image: "@/assets/png/testimonial.png",
          text: "VTalk's AI coaching skyrocketed my IELTS speaking score! Immersive practice, instant feedback - I aced my goal!",
          name: "Candice Wu",
        },
        {
          image: "@/assets/png/testimonial.png",
          text: "VTalk's AI coaching turned my IELTS speaking prep around!",
          name: "James Franko",
        },
        {
          image: "@/assets/png/testimonial.png",
          text: "VTalk's AI coaching turned TOEFL prep into a breeze!",
          name: "Wu Tang",
        },
      ],
    };
  },
};
</script>

<template lang="">
  <Navbar />
  <Banner />
  <Master />
  <AiPowered />
  <Feedback />
  <Proficiency />
  <PricingPlanVue />
  <TestimonialCarousel />
  <ImproveSkill />
  <Faq> </Faq>
  <ContactUs />
  <Footer></Footer>
</template>

<style scoped></style>
