<template>
  <div class="bg-[#0D0F1C] sticky top-0 z-50">
    <nav
      class="max-w-[1400px] bg-[#0D0F1C] z-50 mx-auto px-5 lg:px-10 min-h-[100px] w-full flex items-center justify-between"
    >
      <div>
        <a href="/">
          <img src="@/assets/svg/logo-2.svg" alt="logo" />
        </a>
      </div>

      <img
        src="@/assets/svg/menu-icon.svg"
        v-if="!showMenu"
        class="w-6 h-6 cursor-pointer md:hidden"
        v-on:click="toggleNavbar()"
      />
      <img
        src="@/assets/svg/x.svg"
        v-if="showMenu"
        class="w-6 h-6 cursor-pointer md:hidden"
        v-on:click="toggleNavbar()"
      />
      <div
        :class="[showMenu ? 'left-0' : 'left-[-100%]']"
        class="px-6 md:px-[unset] flex flex-col md:flex-row md:items-center justify-end gap-5 py-10 md:py-[unset] absolute left-0 top-[100px] md:static bg-light md:bg-[#0D0F1C] w-full transition-all duration-300 ease-in"
      >
      <ul
          class="font-medium text-secondary md:text-white flex flex-col md:flex-row gap-5 md:items-center"
        >
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/features">Features</a>
          </li>
          <li>
            <a href="/#vtalk-pricing">Pricing</a>
          </li>
          <li>
            <a href="/contact-us">Contact</a>
          </li>
          <li class="md:hidden">
            <a @click="ButtonRoute('/register')">Sign Up</a>
          </li>
          <li class="md:hidden">
            <a @click="ButtonRoute('/login')">Login</a>
          </li>
        </ul>

        <Button
          @click="ButtonRoute('/register')"
          class="hidden md:flex py-3"
        >
          Sign Up
        </Button>
        <Button
          @click="ButtonRoute('/login')"
          variant="outline"
          class="hidden md:flex py-3"
        >
          Login
        </Button>
        <!-- <Button
          @click="ButtonRoute('/exam/option/dashboard')"
          variant="outline"
          class="hidden md:flex py-3"
        >
          Dashboard
        </Button> -->
      </div>
    </nav>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  data() {
    return {
      showMenu: false,
      auth: null,
    };
  },

  components: { Button },

  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
