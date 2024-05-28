<template>
    <button
      :class="[baseClass, sizeClasses[size], variantClasses[variant]]"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: "Button",
    props: {
      size: {
        type: String,
        default: "medium", // default size
        validator: (value) => ["small", "medium", "large"].includes(value),
      },
      variant: {
        type: String,
        default: "primary", // default variant
        validator: (value) =>
          ["primary", "secondary", "success", "outline"].includes(value),
      },
    },
    computed: {
      baseClass() {
        return "rounded-md px-4 py-2 font-semibold focus:outline-none";
      },
      sizeClasses() {
        return {
          small: "text-sm",
          medium: "text-base",
          large: "text-lg",
        };
      },
      variantClasses() {
        return {
          primary: "bg-[#F63D68] text-white hover:bg-[#F63D68]/80",
          secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
          success: "bg-green-500 text-white hover:bg-green-600",
          outline:
            "bg-white text-[#F63D68] border border-[#F63D68] hover:bg-red-100",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can add additional styles here if needed */
  </style>
  