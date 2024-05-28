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
  <Testimonial />
  <ImproveSkill />
  <Faq>
    <div class="text-center mt-10">
      <div class="font-semibold">How much does this cost?</div>
      <div
        @click="$router.push('/#vtalk-pricing')"
        class="cursor-pointer text-primary font-semibold mt-2 flex justify-center items-center gap-2"
      >
        Pricing Options
        <img src="@/assets/svg/arrow-right.svg" alt="arrow right" />
      </div>
    </div>
  </Faq>
  <ContactUs />
  <Footer></Footer>
</template>

<style scoped></style>
