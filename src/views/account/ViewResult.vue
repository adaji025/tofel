<script>
import Header from "@/components/Headers/AuthHeader.vue";
import LightingImage from "@/assets/svg/lightning.svg";
import HomeIcon from "@/assets/svg/port/home-icon.svg";
import ClipBoardIcon from "@/assets/svg/port/clipboard-alt.svg";
import UserIcon from "@/assets/svg/port/user-icon.svg";
import Feedback from "@/components/Result/Feedback.vue";
import ReviewAnswers from "@/components/Result/ReviewAnswers.vue";
import Button from "@/components/Button.vue";
import GeneralService from "@/service/GeneralService.js";
import axios from "axios";

export default {
  components : { Header, Feedback, Button, ReviewAnswers },

  data() {
    return {
      LightingImage,
      HomeIcon,
      ClipBoardIcon,
      UserIcon,
      tabs: { 
        active: "fluency",
        data : [
            'fluency',
            'grammar',
            'vocabulary',
            'review'
          ],
        index : 0
      },
      isOpen: true,
      result : {
        id : null,
        isLoading : false,
        data : null,
        fluency : null,
        grammar : null,
        vocabulary : null,
        score : {
          total : 0,
          breakdown : null,
        }
      }
    }
  },

created()
{
  this.initResult();
},

methods: {
  
  /**
   * General Methods
   * @description : N/A
   */
   initResult()
   {
     this.result.id = this.$route.params.id;
     this.getResult();
   },

   handleTabs(data) 
   {
     this.tabs.active = data;
   },

   closeModal() 
   {
     this.isOpen = false;
   },

   openModal() 
   {
     this.isOpen = true;
   },

   modalToggle()
   {
     this.isOpen = !this.isOpen;
   },

   updateContent(record)
   {
       if(record)
       {
           this.result.fluency = record.feedback.fluency;
           this.result.grammar = record.feedback.grammar;
           this.result.vocabulary = record.feedback.vocabulary;
           this.result.score.total = record.total_score;
           this.result.score.breakdown = record.breakdown.data;
       }

       console.log(this.result);
   },

   requestHeaders(type = 'completion', base = '', auth = false, multipart = false)
   {
       let param = GeneralService.AxiosHeaders(type, base, auth, multipart);
 
       return axios.create(param);
   },

   formattedContent(tabs) 
   {
       let response = null; 
       let tempFeed = '. . .';
       
       switch(tabs)
       {
         case'fluency' : response = this.result.fluency; break;
         case'grammar' : response = this.result.grammar; break;
         case'vocabulary': response = this.result.vocabulary; break;
       }

       console.log(response);
       
       if(response!==null)
       {
         tempFeed = response.replace(/\n+/g, "<br>");
         tempFeed = tempFeed.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
       }
 
       return tempFeed;
   },

  prevNextHandler(action = null) 
  {
      const { data, index } = this.tabs;
      const lastIndex = data.length - 1;

      if (action === 'next') {
        if (index < lastIndex) {
          this.updateActiveTab(index + 1);
        }
      } else if (action === 'prev') {
        if (index >0) {
          this.updateActiveTab(index - 1);
        }
      } else {
        console.error('Invalid action. Provide either "next" or "prev".');
      }
  },
  updateActiveTab(newIndex) 
  {
    const { data } = this.tabs;
    this.tabs.active = data[newIndex];
    this.tabs.index = newIndex;
  },
  /**
   * API Requests
   * @description : N/A
   */
   async getResult()
   {
     this.result.isLoading = true;
     const http = this.requestHeaders('remote-api','',true);
     const param = this.result.id;
 
     http.get('results/show/'+param).then((response)=>{
         let res = response.data;

         console.log(res);
 
         if(res.success==true)
         {
           this.result.data = res.data;
 
           if(res.data.data!==null)
           {
             const record = (res.data.data?.record !== undefined) ?  res.data.data?.record : null;
 
             this.updateContent(record);
           }
         }
 
     }).catch((error)=>{
       console.log(error);
     }).finally(() => {
       this.result.isLoading = false;
     })
   }
 }

};
</script>

<template lang="">
  <div id="vt-result-holder">
    <div id="loader-holder" v-if="result.isLoading">
      <loading :active="result.isLoading"  :is-full-page="true" ></loading>
    </div>
    <div class="bg-light min-h-screen" v-else>
      <Header class="sticky top-0 z-50" ></Header>
      <div class="sticky top-[90px] bg-white py-5 px-5 flex justify-between items-center sm:hidden">
        <div class="text-lg font-bold text-secondary">Estimated Band</div>
        <div
          class="p-5 bg-primary rounded-xl font-bold text-white text-[28px] z-[1]">
          {{ result.score.total.toFixed(1) }}
        </div>
      </div>
      <div class="max-w-[1400px] mx-auto px-5 lg:px-10 pb-10 text-secondary xl:text-lg">
        <div class="flex flex-col sm:flex-row items-center sm:items-start sm:mt-10 gap-10 z-[1]">
          <div class="sm:sticky pt-7 sm:top-[100px] sm:w-1/2">
            <div class="flex flex-col gap-5 items-center justify-center">
              <div class="max-w-[340px] min-h-[240px] mx-auto flex flex-col justify-center p-10 h-full bg-primary rounded-2xl text-white text-center">
                <div class="text-[96px] font-bold">{{ result.score.total.toFixed(1) }}</div>
                <div class="text-lg font-bold mt-10">Estimated Score</div>
              </div>
              <div class="mt-6 rounded-xl bg-black py-3 font-bold text-white px-6 flex items-center gap-2">
                <img :src="LightingImage" />
                Scoring
              </div>
              <div 
                class="font-semibold" v-for="(ValueAvg, KeyAvg) in result.score.breakdown.gpt" :key="KeyAvg">
                <span class="font-bold">{{KeyAvg}}</span>: {{ValueAvg}}
              </div>
              <div class="mt-5">
                <a href="/choose-category">
                  <Button>Try others</Button>
                </a>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex justify-center gap-3 text-secondary overflow-x-auto pb-3 w-full">
              <div
                @click="handleTabs('fluency')"
                class="cursor-pointer pb-2 border-b-2 font-bold"
                :class="tabs.active === 'fluency' && 'text-primary  border-primary'">
                Fluency
              </div>
              <div
                @click="handleTabs('grammar')"
                :class="tabs.active === 'grammar' && 'text-primary border-primary'"
                class="cursor-pointer pb-2 border-b-2 font-bold">
                Grammar
              </div>
              <div
                @click="handleTabs('vocabulary')"
                :class="tabs.active === 'vocabulary' && 'text-primary border-primary '"
                class="cursor-pointer pb-2 border-b-2 font-bold">
                Vocabulary
              </div>
            </div>
            <Feedback :data="formattedContent(tabs.active)"></Feedback> 
            <div class="button-holder mt-7">
              <Button @click="prevNextHandler('prev')" class="mr-3">
                Prev 
              </Button>
              <Button @click="prevNextHandler('next')" variant="outline">
                Next 
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky bottom-0 px-5 py-10 bg-white flex justify-between sm:hidden">
        <div class="flex gap-2 flex-col justify-center items-center">
          <img :src="HomeIcon" class="hover:text-primary cursor-pointer" />
          <div class="h-2 w-2 rounded-full bg-primary"></div>
        </div>
        <div class="flex gap-2 flex-col justify-center items-center">
          <img :src="ClipBoardIcon" class="hover:text-primary cursor-pointer" />
          <div class="h-2 w-2 rounded-full"></div>
        </div>
        <div class="flex gap-2 flex-col justify-center items-center">
          <img :src="UserIcon" class="hover:text-primary cursor-pointer" />
          <div class="h-2 w-2 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>