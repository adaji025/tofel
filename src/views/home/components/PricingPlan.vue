<template>
  <div class="app-width mt-32 text-secondary">
    <h2 class="text-center font-bold text-[24px] md:text-[30px] lg:text-[40px]">
      Pricing Plans
    </h2>
    <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="bg-white hover:bg-primary border-4 border-transparent hover:border-primary pt-10 rounded-lg transition-all duration-300"
      >
        <div class="bg-light border rounded-lg p-5">
          <div class="text-lg font-semibold">{{ item.title }}</div>
          <div class="font-bold text-[56px]">${{ item.price }}</div>
          <div class="text-lg">Every {{ item.duration }}</div>
          <Button variant="outline" class="mt-5 py-3">Purchase</Button>
          <div class="grid gap-3 mt-5">
            <div
              v-for="(item, index) in item.features"
              :key="index"
              class="flex items-center gap-2"
            >
              <img src="@/assets/svg/d-mark.svg" />
              <div>{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";

export default {
  name: "vtalk-pricing-plan",
  data() {
    return {
      items: [
        {
          title: "Weekly",
          duration: "Week",
          price: "3.99",
          features: [
            "Unlimited access for 1 week",
            "Practice over 600 IELTS questions",
            "Over 75 different IELTS topics",
            "More than 40 Full Mock Speaking Exams",
          ],
        },
        {
          title: "Monthly",
          duration: "Month",
          price: "9.99",
          features: [
            "Unlimited access for 1 Month",
            "Practice over 600 IELTS questions",
            "Over 75 different IELTS topics",
            "More than 40 Full Mock Speaking Exams",
          ],
        },
        {
          title: "Quarterly",
          duration: "3 months",
          price: "19.99",
          features: [
            "Unlimited access for 3 months",
            "Practice over 600 IELTS questions",
            "Over 75 different IELTS topics",
            "More than 40 Full Mock Speaking Exams",
          ],
        },
      ],
    };
  },
  components: {
    Button,
  },
};
</script>
<style></style>
