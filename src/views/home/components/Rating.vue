<template>
    <div class="rating">
      <span
        v-for="star in stars"
        :key="star"
        @click="setRating(star)"
        :class="{ filled: star <= currentRating }"
      >
        ★
      </span>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      maxRating: {
        type: Number,
        default: 5
      },
      initialRating: {
        type: Number,
        default: 0
      }
    },
    setup(props, { emit }) {
      const currentRating = ref(props.initialRating);
      const stars = Array(props.maxRating).fill(0).map((_, index) => index + 1);
  
      const setRating = (rating) => {
        if (rating >= 0 && rating <= props.maxRating) {
          currentRating.value = rating;
          emit('update:modelValue', rating);
        }
      };
  
      return {
        currentRating,
        stars,
        setRating
      };
    }
  };
  </script>
  
  <style scoped>
  .rating {
    font-size: 24px;
  }
  
  .rating span {
    cursor: pointer;
    color: gold;
  }
  
  .rating span.filled {
    color: gold;
  }
  </style>
  