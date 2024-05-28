<template lang="">
  <div class="bg-white rounded-[12px] p-6 mt-4">
    <div class="flex font-bold text-lg gap-2 items-center">
      <MicImage />
      <div>Speaking Part 1:</div>
    </div>
    <div class="mt-5 grid gap-0 bg-light rounded-xl">
      <div class="px-5">
        <div class="flex justify-between gap-5">
          <div class="flex gap-2 items-center">
            <img :src=SpeakerImage />
            <div class="font-bold text-sm">What is Your Name</div>
          </div>
          <div class="flex gap-2 items-center">
            <img :src="ClockImage" />
            <div class="text-[10px]">3 mins</div>
          </div>
        </div>
        <Button
          variant="outline"
          class="w-full mt-5 flex justify-center items-center gap-3"
          >Start
          <img  :src="RightArrowImage" />
        </Button>
        <div class="h-[1px] mb-5 mt-8 w-full bg-gray-200"></div>
      </div>
      <div class="px-5">
        <div class="flex justify-between gap-2">
          <div class="flex gap-2 items-center">
            <img :src="SpeakerImage" />
            <div class="font-bold text-sm">Describe Where You Live</div>
          </div>
          <div class="flex gap-2 items-center">
            <img :src="ClockImage" />
            <div class="text-[10px]">3 mins</div>
          </div>
        </div>
        <Button
          variant="outline"
          class="w-full mt-5 flex justify-center items-center gap-3"
          >Start
          <img :src="RightArrowImage" />
        </Button>
      </div>
    </div>
    <div class="flex font-bold text-lg gap-2 items-center mt-5">
      <img :src="MicImage" />
      <div>Speaking Part 2:</div>
    </div>
    <div class="mt-5 grid gap-3 bg-light rounded-xl">
      <div class="p-5 ">
        <div class="flex justify-between gap-5">
          <div class="flex gap-2 items-center">
            <img :src="SpeakerImage" />
            <div class="font-bold text-sm lg:text-xl">What is Your Name</div>
          </div>
          <div class="flex gap-2 items-center">
            <img :src="ClockImage" />
            <div class="text-[10px]">3 mins</div>
          </div>
        </div>
        <Button
          variant="outline"
          class="w-full mt-5 flex justify-center items-center gap-3"
          >Start
          <img :src="RightArrowImage" />
        </Button>
      </div>
      <div class="p-5">
        <div class="flex justify-between gap-2">
          <div class="flex gap-2 items-center">
            <img :src="SpeakerImage" />
            <div class="font-bold text-sm lg:text-xl">Describe Where You Live</div>
          </div>
          <div class="flex gap-2 items-center">
            <img :src="ClockImage" />
            <div class="text-[10px]">3 mins</div>
          </div>
        </div>
        <Button
          variant="outline"
          class="w-full mt-5 flex justify-center items-center gap-3"
          >Start
          <img :src="RightArrowImage" />
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import ClockImage from "@/assets/svg/port/clock.svg";
import RightArrowImage from "@/assets/svg/port/play-2.svg";
import Button from "@/components/Button.vue";
import MicImage from "@/assets/svg/port/mic-2.svg";
import SpeakerImage from "@/assets/svg/port/speaker.svg";
import BulbImage from "@/assets/svg/port/bulb.svg";
export default {
  data()
  {
    return {
      ClockImage,
      RightArrowImage,
      Button,
      MicImage,
      BulbImage,
      SpeakerImage
    }
  }
};
</script>
<style lang=""></style>
