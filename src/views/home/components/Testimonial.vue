<template>
  <div class="bg-light mt-32 py-32 text-secondary">
    <div
      class="app-width flex flex-col sm:flex-row justify-between gap-10 lg:gap-20"
    >
      <img
        src="@/assets/png/testimonial.png"
        alt=""
        class="w-1/2 sm:w-[unset]"
      />
      <div>
        <Rating />
        <div class="font-bold text-[24px] lg:text-[32px] mt-5">
          VTalk's AI coaching skyrocketed my IELTS speaking score! Immersive
          practice, instant feedback - I aced my goal!
        </div>
        <div class="font-bold mt-5">— Candice Wu</div>
        <div class="mt-2">Head of Design, Layers</div>
      </div>
    </div>
  </div>
</template>
<script>
import Rating from "./Rating.vue";
export default {
  components: {Rating}
}
</script>
<style></style>
