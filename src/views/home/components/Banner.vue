<script>
import Button from "@/components/Button.vue";
import AuthService from "@/service/AuthService.js";
import GeneralService from "@/service/GeneralService.js";

export default {
  components: { Button },

  data() {
    return {
      debug: false,
    };
  },

  created() {
    this.debug = true; //GeneralService.GetDebugStatus();
  },

  methods: {
    handleTryIt() {
      const auth = AuthService.UserSettings();
      const pass = AuthService.GetAuthAccess();

      /**
       * Debugger
       *
       * @description : check login response
       */
      GeneralService.debug(this.debug, {
        msg: "access check [ auth ] : ",
        obj: auth,
      });

      if (auth.user || auth.settings.guest.active || !pass) {
        this.$router.push("/try");
      } else {
        const path = GeneralService.guestPath();

        if (path !== null) {
          this.$router.push(path);
        }
      }
    },

    handlePermission() {
      /**
       * Mic Permissions
       *
       * @description : request for mic access
       */
      /*
        navigator.mediaDevices.getUserMedia({
            video : false , audio: true
        }).then(async () => {
            this.handleTryIt();
        });
        */

      this.handleTryIt();
    },
  },
};
</script>

<template>
  <div class="bg-[#F8F9FC]">
    <div
      class="app-width flex flex-col md:flex-row gap-10 justify-between items-start text-secondary"
    >
      <div class="md:w-1/2 xl:w-1/3">
        <div class="max-w-[530px]">
          <h2
            class="font-bold text-[28px] mt-20 sm:text-[32px] lg:text-[48px] xl:text-[48px] 2xl:text-[56px]"
          >
            Master Any Language with AI Coaching!
          </h2>
          <div class="mt-5 text-lg text-secondary">
            Practice speaking in real-world scenarios with our Language Learning
            Al tool.
          </div>
          <Button
            @click="handleTryIt()"
            class="w-full md:w-1/2 lg:w-full mt-12 py-6"
          >
            <div class="font-bold text-2xl">Try it out now</div>
          </Button>
        </div>
      </div>
      <div class="flex-1 mx-auto">
        <picture>
          <source
            srcset="@/assets/png/banner-image.png"
            media="(min-width: 400px)"
          />
          <source
            srcset="@/assets/png/iPhone-12.png"
            media="(max-width: 600px)"
          />
          <img src="@/assets/png/Results.png" alt="Description of the image" />
        </picture>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
