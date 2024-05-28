<script>
import AllTopic from "@/assets/img/categories/01-all-topics.png";
import JobInterview from "@/assets/img/categories/02-job-interview.png";
import AtTheAirport from "@/assets/img/categories/03-at-the-airport.png";
import AtSchool from "@/assets/img/categories/04-at-school.png";
import AtTheRestaurant from "@/assets/img/categories/05-at-the-restaurant.png";
import DoctorsVisit from "@/assets/img/categories/06-doctors-visit.png";
import HotelCheckin from "@/assets/img/categories/07-hotel-checkin.png";
import ExamPrep from "@/assets/img/categories/08-exam-prep.png";

const ImageMap = {
  "01-all-topics.png": AllTopic,
  "02-job-interview.png": JobInterview,
  "03-at-the-airport.png": AtTheAirport,
  "04-at-school.png": AtSchool,
  "05-at-the-restaurant.png": AtTheRestaurant,
  "06-doctors-visit.png": DoctorsVisit,
  "07-hotel-checkin.png": HotelCheckin,
  "08-exam-prep.png": ExamPrep,
};

export default {
  props: {
    category_img: {
      type: String,
      required: true,
    },
    category_title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ImageMap,
    };
  },
};
</script>
<template lang="">
  <div class="flex gap-5 sm:gap-20 w-full justify-between">
    <div>
      <img :src="ImageMap[category_img]" alt="" class="rounded-2xl h-[160px] object-cover max-w-[180px] w-full" />
      <div class="mt-5 font-bold text-xl sm:text-2xl">{{ category_title }}</div>
    </div>
    <div>
      <div
        class="h-[48px] w-[48px] rounded-md bg-primary flex justify-center items-center"
      >
        <img src="@/assets/svg/arrow-right-white.svg" alt="" />
      </div>
    </div>
  </div>
</template>
