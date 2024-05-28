<template>
  <div class="bg-[#0D0F1C] p-5 mt-32">
    <div class="app-width py-20">
      <div class="font-semibold text-primary">Contact us</div>
      <div
        class="text-[24px] md:text-[30px] lg:text-[40px] font-bold text-white"
      >
        We’d love to hear from you
      </div>
      <div class="text-lg text-white">
        Our friendly team is always here to chat.
      </div>
      <div class="mt-10 gap-10 grid sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="border p-5 rounded-xl border-[#30374F] text-white"
        >
          <img src="@/assets/png/email.png" alt="" v-if="index === 0" />
          <img src="@/assets/png/location.png" alt="" v-if="index === 1" />
          <img src="@/assets/png/call.png" alt="" v-if="index === 2" />
          <div class="mt-5 text-white font-bold">{{ item.title }}</div>
          <div class="mt-2">{{ item.text1 }}</div>
          <div class="mt-5 text-primary max-w-[250px]">{{ item.text2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const items = ref([
  {
    title: "Chat to support",
    text1: "We’d love to hear from you",
    text2: "contact@vtalkai.com",
    image: "@/assets/png/email.png",
  },
  {
    title: "Visit us",
    text1: "Visit our office location.",
    text2: "8 the Green suite BDover, Delaware, 19901USA",
    image: "@/assets/png/location.png",
  },
  {
    title: "Whatsapp Number",
    text1: "Mon-Fri from 8am to 5pm.",
    text2: "+1 3476961035",
    image: "@/assets/png/call.png",
  },
]);
</script>
<style></style>
