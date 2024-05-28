<template>
  <div class="text-secondary">
    <div class="grid gap-2 mt-4">
      <label for="email">Translate from *</label>
      <select
        v-model="source.new"
        class="border outline-none p-3 rounded-lg overflow-hidden">
        <option
          v-for="(lang, index) in languages"
          :key="index"
          :value="lang.short_name"
          :disabled="(lang.short_name!==target.new)? false : true"
          >
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="grid gap-2 mt-4">
      <label for="email">Translate To *</label>
      <select
        v-model="target.new"
        class="border outline-none p-3 rounded-lg overflow-hidden">
        <option 
          v-for="(lang, index) in languages" 
          :key="index"
          :value="lang.short_name"
          :disabled="(lang.short_name!==source.new)? false : true">
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="grid gap-2 mt-5">
      <div>Voice Speed</div>
      <div class="grid grid-cols-5 border rounded-md">
        <div
          @click="handleChangeTab('0.5x')"
          :class="tab === '0.5x' ? 'bg-secondary text-white rounded-l-md' : ''"
          class="border-r py-3 flex justify-center items-center cursor-pointer">
          0.5x
        </div>
        <div
          @click="handleChangeTab('0.75x')"
          :class="tab === '0.75x' ? 'bg-secondary text-white' : ''"
          class="border-r py-3 flex justify-center items-center cursor-pointer">
          0.75x
        </div>
        <div
          @click="handleChangeTab('normal')"
          :class="tab === 'normal' ? 'bg-secondary text-white' : ''"
          class="border-r py-3 flex justify-center items-center cursor-pointer">
          Normal
        </div>
        <div
          @click="handleChangeTab('1.25x')"
          :class="tab === '1.25x' ? 'bg-secondary text-white' : ''"
          class="border-r py-3 flex justify-center items-center cursor-pointer">
          1.25x
        </div>
        <div
          @click="handleChangeTab('1.5x')"
          :class="tab === '1.5x' ? 'bg-secondary text-white rounded-r-md' : ''"
          class="py-3 flex justify-center items-center cursor-pointer">
          1.5x
        </div>
      </div>
    </div>

    <div class="grid gap-2 mt-5">
      <div>Change Translation Language Level</div>
      <div class="grid grid-cols-3 border rounded-md">
        <div
          @click="handleChangeLangTab('normal')"
          :class="langTab === 'normal' ? 'bg-secondary text-white rounded-l-md' : ''"
          class="border-r py-4 flex flex-col justify-center items-center cursor-pointer">
          <div>Normal</div>
          <div>A1-A2</div>
        </div>
        <div
          @click="handleChangeLangTab('intermediate')"
          :class="langTab === 'intermediate' ? 'bg-secondary text-white' : ''"
          class="border-r py-4 flex flex-col justify-center items-center cursor-pointer">
          <div>Intermediate</div>
          <div>B1-B2</div>
        </div>
        <div
          @click="handleChangeLangTab('advanced')"
          :class="langTab === 'advanced' ? 'bg-secondary text-white rounded-r-md' : ''"
          class="border-r py-4 flex flex-col justify-center items-center cursor-pointer">
          <div>Advanced</div>
          <div>C1-C2</div>
        </div>
      </div>
    </div>
    <div class="flex gap-5 mt-5">
      <div class="flex-1 text-center py-4 font-semibold text-primary cursor-pointer hover:scale-105 duration-300 transition-all" @click="cancelSettings()">Cancel</div>
      <Button @click="saveSettings()" class="flex-1">Save</Button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  components: { Button },
  data() {
    return {
      languages : [],
      source : {
        new : '',
        old : ''
      },
      target : {
        new : '',
        old : ''
      },
      tab: "normal",
      langTab: "normal",
    };
  },
  created()
  {
    this.initSettings();
  },

  methods: {
    initSettings()
    { 
      const dataLang  = this.$store.state.languages;
      this.languages  = dataLang.available;
      this.source.new = dataLang.active_lang;
      this.source.old = dataLang.active_lang;
      this.target.new = dataLang.active_target;
      this.target.old = dataLang.active_target;
    },

    handleChangeTab(value) 
    {
      this.tab = value;
    },

    handleChangeLangTab(value) 
    {
      this.langTab = value;
    },

    saveSettings()
    {
      let update_trans = true;
      let trigger_src  = false;

      if(this.source.new!==this.source.old)
      {
        const confirmMessage = "Are you sure you want to your 'Translate From' ? you will have to start speaking progress from begining.";

        if(window.confirm(confirmMessage)) 
        {
          trigger_src = true;
        }else{
          update_trans = false;
        }
      }

      if(update_trans)
      {
        this.$store.dispatch('SetDefaultLang', { lang : this.source, type : 'source'});
        this.$store.dispatch('SetDefaultLang', { lang : this.target, type : 'target'});

        if(trigger_src){
          this.$emit('saved-settings-source');
        }else{
          this.$emit('saved-settings');
        }
      }
    },

    cancelSettings()
    {
      this.$emit('toggle-settings');
    }
  },
};
</script>
<style></style>
