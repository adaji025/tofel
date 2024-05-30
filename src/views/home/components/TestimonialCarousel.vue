<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(item, index) in testimonialData" :key="{ index }">
      <TestimonialVue :name="item.name" :image="item.image" :text="item.text" />
    </swiper-slide>
  </swiper>
</template>
<script>
import TestimonialVue from "./Testimonial.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    TestimonialVue,

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
<style></style>
