<script>
  import ExceptionCustom from '@/components/Exception/Custom.vue';

  export default 
  {
    props : {
      prep_type : {
          type : String,
          required : false
      }
    },

    components : { ExceptionCustom },
  }
</script>
<template>
  <div id="vt-not-authorized">
    <ExceptionCustom></ExceptionCustom>
  </div>
</template>