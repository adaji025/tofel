<template>
  <div class="bg-[#0D0F1C] p-5">
    <div class="bg-primary rounded-[20px]">
      <div class="app-width px-5 sm:px-10 py-20 rounded-[24px]">
        <div
          class="text-white flex flex-col sm:flex-row justify-between gap-10"
        >
          <div class="max-w-[300px]">
            <img src="@/assets/svg/logo.svg" />
            <div class="text-sm mt-5">
              AI Speaking Practice Empowering Your Future ! Speak confidently
              and boost your language learning with Vtalk
            </div>
            <div class="mt-10 text-sm">
              © {{ currentYear }} VTalk All rights reserved.
            </div>
          </div>

          <div class="flex sm:justify-end gap-10 text-sm">
            <div>
              <h3 class="font-bold">Useful Links</h3>
              <ul class="grid gap-2 mt-4">
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold">Useful Links</h3>
              <ul class="grid gap-2 mt-4">
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/features">Features</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="text-center mt-5 text-white">
          <div>Find us on Socials</div>
          <div class="flex items-center justify-center gap-5 mt-2">
            <img src="@/assets/svg/facebook.svg" />
            <img src="@/assets/svg/ig.svg" />
            <img src="@/assets/svg/twitter.svg" />
            <img src="@/assets/svg/LinkedIn.svg" />
            <img src="@/assets/svg/tiktok.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const currentYear = ref(null);

onMounted(() => {
  // Get the current year
  currentYear.value = new Date().getFullYear();
});
</script>
<style></style>
