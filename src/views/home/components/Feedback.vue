<script>
export default {};
</script>

<template>
  <div class="app-width flex flex-col md:flex-row gap-5 mt-3">
    <div
      class="border rounded-[24px] h-full p-5 lg:p-10 text-secondary md:w-2/3"
    >
      <div class="max-w-[400px] mx-auto">
        <div class="text-center text-xl font-bold">Get Feedback</div>
        <div class="max-w-[300px] mx-auto text-center">
          Get feedback, track progress, speak with confidence.
        </div>

        <img
          src="@/assets/svg/chart.svg"
          class="max-w-[200px] sm:max-w-[unset] mx-auto"
        />
      </div>
    </div>
    <div
      class="bg-primary rounded-[24px] p-5 lg:p-10 text-white flex flex-col justify-center flex-1 min-h-[300px]"
    >
      <div class="text-center text-[100px] lg:text-[200px] font-bold">67</div>
      <div
        class="max-w-[248px] mx-auto text-center font-bold text-[30px] lg:text-[40px]"
      >
        VTalk Score
      </div>
    </div>
  </div>
</template>

<style></style>
