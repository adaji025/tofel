<script>
import Logo from "@/assets/svg/vtalk-logo.svg";
import UserAccount from "@/assets/svg/guest-user.svg";
import Button from "@/components/Button.vue";

export default {
  components: { UserAccount, Logo, Button },
};
</script>
<template lang="">
  <div class="bg-white">
    <nav
      class="max-w-[1400px] mx-auto sticky top-0 px-5 lg:px-10 min-h-[100px] sm:min-h-[100px] w-full flex items-center justify-center sm:justify-between z-20"
    >
      <img src="@/assets/svg/vtalk-logo.svg" />

      <div class="hidden sm:flex items-center gap-5 font-semibold">
        <div class="text-secondary cursor-pointer">Results</div>
        <div class="text-secondary">
          <a href="/contact-us">Contact</a>
        </div>
        <img src="@/assets/svg/guest-user.svg" />
      </div>
    </nav>
  </div>
</template>
<style></style>
