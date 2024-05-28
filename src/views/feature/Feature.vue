<template lang="">
  <div class="bg-[#F8F9FC] text-secondary">
    <NavbarVue />
    <div
      class="max-w-[1400px] mx-auto pb-28 px-5 lg:px-10 mt-20 flex flex-col sm:flex-row items-end gap-10"
    >
      <div class="sm:w-[65%]">
        <div class="font-bold text-[40px] lg:text-[56px]">Discover IELTS</div>
        <div class="mt-2 lg:text-xl max-w-[750px]">
          Learn about the International English Language Testing System and its
          benefits for test-takers.
        </div>
      </div>
      <div class="flex-1 w-full">
        <Button class="w-full py-6">
          <div class="font-bold text-2xl">Try it our now </div>
        </Button>
      </div>
    </div>
  </div>
  <div class="bg-white text-secondary py-10">
    <div
      class="max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row justify-between gap-10">
      <div class="md:w-1/2">
        <h3 class="font-bold text-[40px]">What is IELTS?</h3>
        <div class="text-lg mt-5">
          The International English Language Testing System (IELTS) is the world
          most popular English language test for higher education and global
          migration. It assesses your ability to communicate effectively in
          English for study, work, and migration purposes.
        </div>
        <div class="flex flex-col sm:flex-row gap-5 mt-5">
          <div>
            <h3 class="font-bold text-xl">Why IELTS?</h3>
            <div>
              IELTS opens doors to international education, career
              opportunities, and global mobility.
            </div>
          </div>
          <div>
            <h3 class="font-bold text-xl">Why IELTS?</h3>
            <div>
              IELTS opens doors to international education, career
              opportunities, and global mobility.
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <img src="@/assets/img/feature/features-1.png" class="mx-auto" />
      </div>
    </div>

    <div
      class="max-w-[1400px] text-secondary mt-32 mx-auto px-5 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10"
    >
      <div class="w-full sm:w-1/2 order-2 sm:order-1">
        <img src="@/assets/img/feature/features-2.png" class="mx-auto" />
      </div>
      <div class="flex-1 order-1 sm:order-2">
        <h2 class="font-bold text-[32px] lg:text-[40px]">
          The Global Standard for Language Proficiency
        </h2>
        <div class="text-lg mt-2">
          The IELTS exam is a globally recognised benchmark for assessing the
          language proficiency of non-native english speakers. It is widely
          accepted by educational institutions, immigration authorities, and
          employers as a reliable measure of an individual ability to
          communicate effectively in English.
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#0D0F1C] text-white py-20">
    <div
      class="max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row justify-between gap-10"
    >
      <div class="sm:w-1/2">
        <h2 class="text-[36px] lg:text-[40px] max-w-[400px] font-bold">
          How the IELTS Test Works
        </h2>
        <div class="text-xl mt-2">
          The IELTS exam measures English language provision in 4 key areas;
          speaking, writing, reading, and listening.
          <br /><br />
          In the speaking section, you will have a face-to-face interview to
          assess your ability to communicate clearly, accurately, and fluently.
        </div>
      </div>
      <div class="flex-1">
        <div class="mt-10 gap-10 grid">
          <div
            v-for="(item, index) in featuresData"
            :key="index"
            class="border p-5 rounded-xl border-[#30374F] text-white"
          >
            <img :src="item.image" alt="" />
            <div class="mt-5 text-white font-bold">{{ item.title }}</div>
            <div class="mt-2">{{ item.text1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="max-w-[1400px] text-secondary mt-32 mx-auto px-5 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10"
  >
    <div class="w-full sm:w-1/2 order-2">
      <img src="@/assets/img/feature/features-3.png" class="mx-auto" />
    </div>
    <div class="flex-1 order-1">
      <h2 class="font-bold text-[32px] lg:text-[40px]">
        Open Doors to Global Opportunities
      </h2>
      <div class="text-lg mt-3">
        Taking the IELTS test opens up a world of possibilities. Whether you're
        looking to study abroad, immigrate to a new country, or gain
        professional certification, the IELTS exam is your key to success.
      </div>
      <Button class="py-5 sm:py-4 mt-10 w-full sm:w-[unset]"
        >Try VTalk Now</Button
      >
    </div>
  </div>
  <Faq />
  <div class="mt-20 pt-10 bg-[#0D0F1C]">
    <Footer />
  </div>
</template>
<script>
import NavbarVue from "@/components/Headers/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Faq from "@/components/Landing/Faq.vue";
import ListeningImage from "@/assets/img/faq/listening.png";
import ReadingImage from "@/assets/img/faq/reading.png";
import WritingImage from "@/assets/img/faq/writing.png";
import TalkImage from "@/assets/img/faq/talk.png";
export default {
  components: {
    NavbarVue,
    Button,
    Footer,
    Faq
  },

  data() {
    return {
      featuresData: [
        {
          title: "Listening Test",
          text1:
            "This section tests your ability to use accurate grammar, vocabulary, and pronunciation, when discussing everyday topics, sharing experiences, or expressing opinions.",
          image: ListeningImage,
        },
        {
          title: "Reading Test",
          text1:
            "The writing test measures your ability to express yourself clearly and accurately in written English.",
          image: ReadingImage,
        },
        {
          title: "Writting Test",
          text1:
            "The reading test evaluates your reading comprehension skills through a range of text from everyday life and academic journals.",
          image: WritingImage,
        },
        {
          title: "Speaking Test",
          text1:
            "This section tests your ability to understand native speakers of English in everyday settings and in academic environments.",
          image: TalkImage,
        },
      ]
    };
  },
};
</script>
<style lang=""></style>
