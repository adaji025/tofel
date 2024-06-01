<template>
  <div class="text-secondary bg-[#F8F9FC] min-h-screen pb-5">
    <AuthHeader />

    <div
      class="max-w-[560px] mx-auto bg-white py-10 px-6 grid gap-3 sm:rounded-[16px] mt-20"
    >
      <img src="@/assets/png/transition-2.png" alt="" class="mx-auto" />
      <div class="mt-10">
        <div class="text-sm text-primary">Exam Prep</div>
        <div class="font-bold text-lg md:text-2xl max-w-[320px]">
          Ready to Take Control of Your Speaking!
        </div>
        <div class="text-secondary max-w-[464px] mt-2">
          In this part, you can show how well you can talk about different
          topics. There are four questions in this section.
        </div>
        <div class="mt-10 grid gap-5">
          <div class="flex items-start gap-5">
            <img src="@/assets/svg/prep-time.svg" alt="" />
            <div>
              <div class="font-bold text-lg md:text-xl">Prep time</div>
              <div class="mt-1">
                Before you answer each question, you'll get some time to get
                ready.
              </div>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <img src="@/assets/svg/take-note.svg" alt="" />
            <div>
              <div class="font-bold text-lg md:text-xl">Take Notes</div>
              <div class="mt-1">
                You can write down notes to help you think of your answers, but
                remember, your notes won't be graded.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthHeader from "../../components/Headers/AuthHeader.vue";
export default {
  components: {
    AuthHeader,
  },
};
</script>
<style></style>
