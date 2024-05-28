<script>
import Navbar from "@/components/Headers/Navbar.vue";
import Banner from "@/views/home/components/Banner.vue";
import AiPowered from "@/views/home/components/AiPowered.vue";
import Master from "@/views/home/components/Master.vue";
import Feedback from "@/views/home/components/Feedback.vue";
import Proficiency from "@/views/home/components/Proficiency.vue";
import PricingPlanVue from "@/views/home/components/PricingPlan.vue";
import Testimonial from "@/views/home/components/Testimonial.vue";
import ContactUs from "@/views/home/components/ContactUs.vue";
import ImproveSkill from "@/views/home/components/ImproveSkill.vue";
import Faq from "@/components/Faq.vue";
import Footer from "@/components/Footer.vue";
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
    Testimonial,
    ImproveSkill,
    Faq,
    Footer,
    ContactUs,
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
  <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(item, index) in testimonialData" :key="{ index }">
      <Testimonial :name="item.name" :image="item.image" :text="item.text" />
    </swiper-slide>
  </swiper>
  <ImproveSkill />
  <Faq> </Faq>
  <ContactUs />
  <Footer></Footer>
</template>

<style scoped></style>
