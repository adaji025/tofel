<template>
    <div class="main-exception-holder h-screen flex justify-center items-center">
      <div class="container mx-auto">
        <div class="row justify-center">
          <div class="col-md-4 text-center">
            <div class="mt-5">
              <h1 class="text-5xl font-bold text-[#F63D68]">{{ title }}</h1>
              <p class="mt-5">
                {{ content }}
              </p>
              <p class="mt-5">
                <Button @click="ContinueLink()" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Continue</Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import Button from "@/components/Button.vue";
export default {
    name : 'vtalk-exception-custom',
    props : {
        title : {
            type : String,
            default : '404'
        },
        content : {
            type : String,
            default : 'An error occured while processing your request at the momen',
        },
        url : {
            type : String,
            deafult : '/'
        }
    },
    components  : { Button }, 
    methods : {
        ContinueLink(){
            this.$router.push({ name : 'Home' });
        }
    }
}
</script>