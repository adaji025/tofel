<template lang="">
  <div class="bg-white sticky top-0 z-50">
    <nav class="max-w-[1400px] mx-auto px-5 lg:px-10 min-h-[100px] sm:min-h-[100px] w-full flex items-center  justify-between">
      <img src="@/assets/svg/vtalk-logo.svg" />
      <img src="@/assets/svg/x.svg" @click="BackToHome()" />
    </nav>
  </div>
</template>
<script>

export default
{
  methods : {
    BackToHome()
    {
       this.$router.push('/');
    }
  }
}
</script>
<style lang=""></style>
