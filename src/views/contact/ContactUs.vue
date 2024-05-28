<template>
  <Loading :active="loader.contact"></Loading>
  <div class="bg-[#0D0F1C]">
    <ContactNavbar />
    <Contact class="mt-20" />
    <div
      class="py-20 flex flex-col items-center justify-center mx-auto bg-white"
    >
      <div class="grid gap-2 mt-3 text-secondary max-w-[480px] mx-auto">
        <div class="grid sm:grid-cols-2 gap-5">
          <div class="grid gap-2">
            <label for="email">First Name *</label>
            <input
              v-model="firstname"
              placeholder="john"
              class="border outline-none p-3 rounded-lg"
            />
          </div>
          <div class="grid gap-2">
            <label for="email">Last Name *</label>
            <input
              v-model="lastname"
              placeholder="Doe"
              class="border outline-none p-3 rounded-lg"
            />
          </div>
        </div>
        <div class="grid gap-2">
          <label for="email">Email Address *</label>
          <input
            v-model="email"
            type="email"
            class="border outline-none p-3 rounded-lg"
            placeholder="johndoe@gmai.com"
          />
        </div>
        <div class="grid gap-2">
          <label for="email">Message *</label>
          <textarea
            v-model="message"
            class="border outline-none p-3 rounded-lg h-[100px]"
            placeholder="Leave us a message..."
            row="10"
          ></textarea>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="privacy"
            class="border outline-none p-3 rounded-lg"
          />
          <div>
            * You agree to our friendly
            <a href="/privacy" class="underline cursor-pointer"
              >privacy policy</a
            >.
          </div>
        </div>
        
        <Button @click="submitForm()" class="py-3 mt-2">Send message</Button>
      </div>
    </div>
    <Footer class="mt-5"></Footer>
  </div>
</template>
<script>
import ContactNavbar from "@/components/Headers/ContactNavbar.vue";
import Button from "@/components/Button.vue";
import Contact from "@/components/ContactUs.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "vtalk-contact-us",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      message: "",
      privacy: false,
      response: "",
      loader: {
        contact: false,
      },
    };
  },
  components: { ContactNavbar, Contact, Button, Footer },
};
</script>
<style lang=""></style>
