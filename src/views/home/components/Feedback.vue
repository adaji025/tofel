<script>
export default {};
</script>

<template>
  <div class="app-width flex flex-col md:flex-row gap-5 mt-3">
    <div
      class="border rounded-[24px] h-full p-5 lg:p-10 text-secondary md:w-2/3"
    >
      <div class="max-w-[400px] mx-auto flex flex-col gap-5">
        <div class="order-1 sm:order-2">
          <div class="text-center text-xl font-bold">Get Feedback</div>
          <div class="max-w-[300px] mx-auto text-center mt-3">
            Get feedback, track progress, speak with confidence.
          </div>
        </div>

        <img
          src="@/assets/svg/chart.svg"
          class="max-w-[200px] sm:max-w-[unset] mx-auto order-2 sm:order-1"
        />
      </div>
    </div>
    <div
      class="border border-primary rounded-[24px] p-5 lg:p-10 text-primary flex flex-col justify-center flex-1 min-h-[300px]"
    >
    <div
    class="max-w-[248px] mx-auto text-center font-bold text-[30px] lg:text-[40px]"
    >
    Estimated Score
  </div>
  <div class="text-center text-[80px] lg:text-[100px] font-bold">20-24</div>
    </div>
  </div>
</template>

<style></style>
