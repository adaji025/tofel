<script>
import AllTopic from  '@/assets/img/categories/01-all-topics.png';
import JobInterview from '@/assets/img/categories/02-job-interview.png';
import AtTheAirport from '@/assets/img/categories/03-at-the-airport.png';
import AtSchool from '@/assets/img/categories/04-at-school.png';
import AtTheRestaurant from '@/assets/img/categories/05-at-the-restaurant.png';
import DoctorsVisit from '@/assets/img/categories/06-doctors-visit.png';
import HotelCheckin from '@/assets/img/categories/07-hotel-checkin.png';
import ExamPrep from '@/assets/img/categories/08-exam-prep.png';

const ImageMap = {
    '01-all-topics.png' : AllTopic,
    '02-job-interview.png' : JobInterview,
    '03-at-the-airport.png' : AtTheAirport,
    '04-at-school.png' : AtSchool,
    '05-at-the-restaurant.png' : AtTheRestaurant,
    '06-doctors-visit.png' : DoctorsVisit,
    '07-hotel-checkin.png' : HotelCheckin,
    '08-exam-prep.png' : ExamPrep
};

export default 
{
    data()
    {
        return {
            debug : false,
            ImageMap,
            category_static_desc : 
            [
                "We'll give tips if needed, or a green check if your message is good.",
                "During the simulation, click the microphone to speak or just write your message if you can't talk."
            ]
        }
    },
    props : {
        category_title : {
            type : String,
            required : true,
        },

        category_img : {
            type : String,
            required : true,
        },

        category_desc : {
            type : Array,
            required : true
        }
    }
}
</script>
<template lang="">
        <img
            :src="ImageMap[category_img]" :alt="category_title"
            class="max-w-[200px] sm:max-w-[300px] mx-auto rounded-[12px]"
        />
        <div class="mt-10 font-bold text-[24px] max-w-[230px] sm:text-[32px]">
          {{ category_title }}
        </div>
        <div class="grid mt-10 gap-5">
          <div
            v-for="(desc, index) in category_desc" :key="index"
            class="flex gap-5">
            <div>
              <div class="flex items-center justify-center border border-primary h-[30px] w-[30px] sm:h-[48px] sm:w-[48px] rounded-md">
                <img src="@/assets/svg/check-1.svg" alt="" />
              </div>
            </div>
            <div>
                {{ desc }}
            </div>
          </div>
          <div
            v-for="(static_desc, index) in category_static_desc" :key="index"
            class="flex gap-5">
            <div>
              <div class="flex items-center justify-center border border-primary h-[30px] w-[30px] sm:h-[48px] sm:w-[48px] rounded-md">
                <img src="@/assets/svg/check-1.svg" alt="" />
              </div>
            </div>
            <div>
                {{ static_desc }}
            </div>
          </div>
        </div>
</template>