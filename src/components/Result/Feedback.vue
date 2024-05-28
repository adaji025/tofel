<script>
import BulbImage from "@/assets/svg/port/bulb.svg";
import ExclamationImage from "@/assets/svg/port/exclamation.svg";
import MarkGoodImage from "@/assets/svg/port/mark-good.svg";

export default 
{
    props : {
       data : {
        type : String,
        default : 'N/A'
      }
    },
    data()
    {
      return {
        BulbImage, ExclamationImage, MarkGoodImage
      }
    }
}
</script>

<template>
    <div id="holder">
        <div class="mt-10 bg-white rounded-[16px] p-5 text-secondary">
            <div class="flex items-center gap-2">
              <img :src="BulbImage" class="" />
              <h2 class="text-xl font-bold">Feedback :</h2>
            </div>
            <div class="mt-3 text-justify">
              <div v-html="data"></div>
            </div>
        </div>
    </div>
</template>