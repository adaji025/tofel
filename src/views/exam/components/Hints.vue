<script>
import Button from "@/components/Button.vue";
import RecordRTC from 'recordrtc';
import DefLoader from "@/components/Loader/Default.vue";
import GeneralService from '@/service/GeneralService.js';
import axios from 'axios';

export default {
  props : {
    hint : {
      type : String,
      required : true,
    },
    voices : {
      type : Object,
      required : true
    },
    target : {
      type : String,
      required : true
    },
    source : {
      type : String,
      required : true
    }
  },

  components: { Button, DefLoader },

  data() {
    return {
      transcription : {
        placeholder : {
          txt : '',
          def : 'Please repeat message above ...'
        },
        text : null,
      },
      speech : {
        audio : {
          isLoading : false,
          isActive : false,
          playing : false,
          player : null,
          data : null
        },
      },
      recording : {
        recordRTC : {},
        working : false,
        blobObj : null,
        isApiLoading : false,
      },
      translation : {
        text : {
          isLoading : false,
          isActive : false,
          data : null
        }
      },
      timer : null
    };
  },

  beforeUnmount()
  {
    this.runSpeechDeactivation('active');
    this.clearTimers();
  },

  beforeDestroy() 
  {
    this.clearTimers();
  },

  created()
  {
    this.initHints();
    this.timer = setInterval(this.miniCron, 1000);
  },

  methods: {

    miniCron()
    {
      this.runSpeechDeactivation('stream');
    },

    initHints()
    { 
      this.transcription.placeholder.txt = this.transcription.placeholder.def;
    },

    clearTimers()
    {
      clearInterval(this.timer);
    },

    requestHeaders(type = 'completion', base = '', auth = false, multipart = false)
    {
      let param = GeneralService.AxiosHeaders(type, base, auth, multipart);

      return axios.create(param);
    },

    blobToFile(theBlob, fileName)
    {
        let formData = new FormData();
        let file = new File([theBlob], fileName, {type: theBlob.type});

        formData.append('file', file, fileName);
        formData.append('model', 'whisper-1');
        formData.append('language', this.source);

        return formData;
    },

    startRecording()
    {
        this.recording.working = true;
        this.recording.blobObj = null;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(async (stream) => {

              const options = {
                checkForInactiveTracks: true,
                mimeType: 'audio/wav',
                numberOfAudioChannels: 2,
                recorderType: RecordRTC.StereoAudioRecorder,
                type: 'audio',
              }

              this.recording.recordRTC = RecordRTC(stream.clone(), options);
              this.recording.recordRTC.startRecording();
          });
    },

    stopRecording()
    {
      this.recording.recordRTC.stopRecording(()=> {
        let blob = this.recording.recordRTC.getBlob();
        let file = this.blobToFile(blob, 'trans.mp4');
        this.recording.blobObj = blob;
        this.getTranscription(file);
        this.recording.working = false;
      });
    },

    runSpeechAudio(action, data = null)
    {
      if(action=='play')
        {
          if(data!==null)
          {
            const audio = new Audio("data:audio/mp3;base64," + data);
            this.speech.audio.player = audio;
            this.speech.audio.player.play();
            this.speech.audio.playing = true;
            this.speech.audio.isActive = true;
          }
             
        }
        else if(action=='stop')
        {
            if(this.speech.audio.isActive)
            {
              this.speech.audio.player.pause();
              this.speech.audio.playing = false;
              this.speech.audio.isActive = false;
            }            
        }
    },

    runSpeech(hint)
    {
      if(this.speech.audio.data==null&&hint!==null)
      {
        this.getTextToSpeech(hint);
      }else{
        this.runSpeechAudio('play', this.speech.audio.data);
      }
    },

    runSpeechDeactivation(type = 'stream')
    {
      if(type=='stream')
      {
        if(this.speech.audio.isActive)
        {
            const isAudioPlaying = () => {
              return !this.speech.audio.player.paused;
            }

            if(!isAudioPlaying()){
              this.speech.audio.playing = false;
              this.speech.audio.isActive = false;
            }
        }
      }else if(type=='active'){
        if(this.speech.audio.isActive)
        {
          this.speech.audio.player.pause();
          this.speech.audio.playing = false;
          this.speech.audio.isActive = false;
        }
      }
    },

    runTranslation(status)
    {
       if(status)
       {
         if(this.translation.text.data==null&&this.hint!==null)
         {
          this.getTranslation(this.hint);
         }
         else
         {
          this.translation.text.isActive = true;
         }
       }
       else
       {
         this.translation.text.isActive = false;
       }
    },

    htmlDecodeEntity(str) 
    {
      let txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    },

    sendHint()
    {
      if(this.transcription.text!==''&&this.transcription.text!==null)
      {
        this.$emit('send-hint', this.transcription.text);
      }
    },

    cancelHint()
    {
      this.$emit('close-hint');
    },

    /**
     * API - Sub systems request
     * @description : N/A 
     */
    async getTranscription(param)
    {
      this.recording.isApiLoading = true;
      this.transcription.placeholder.txt  = 'Processing ...';
      const http = this.requestHeaders('transcription');
      const runPlaceholder = () =>{
        this.transcription.placeholder.txt = this.transcription.placeholder.def;
      }

      http.post('/audio/transcriptions', param).then((response) => {

        if(response.data.text !== null)
        {
          let transcription = response.data.text;
          this.transcription.text = transcription;
          runPlaceholder();
        }
        else
        {
          alert('Sorry there is an issue with your request. Please try again');
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.recording.isApiLoading = false;
        this.recording.working = false;
        runPlaceholder();
      });
    },
    
    async getTextToSpeech(text)
    {
      this.speech.audio.isLoading = true;

      const http = this.requestHeaders('speech');
      const voice = this.voices;
      const key = import.meta.env.VITE_GOOGLE_API_KEY;
      
      const param = {
        "input":{
          "text": text
        },
        "voice": voice[this.source],
        "audioConfig":{
          "audioEncoding":"MP3"
        }
      }

      http.post(`/v1/text:synthesize?key=${key}`, param).then((response) => { 
        if(response.data.audioContent!==null)
        {
          this.speech.audio.data = response.data.audioContent;
          this.runSpeechAudio('play', this.speech.audio.data);
        }
      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        this.speech.audio.isLoading = false;
      });
    },

    async getTranslation(txt)
    {
      this.translation.text.isLoading = true;

      const param = {
        "q": txt,
        "target": this.target,
        "source": this.source
      }

      const http = this.requestHeaders('translation');

      http.post(`/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, param).then((response) => { 
        
        if(response.data!==null)
        {
          console.log('# Debugger - check [ getTranslation() ]');
          console.log(response.data);

          let dataTemp = response.data.data;
          let textTemp = this.htmlDecodeEntity(dataTemp.translations[0].translatedText);
          this.translation.text.data = textTemp;
          this.translation.text.isActive = true;
          console.log(textTemp);

          this.runSpeechDeactivation('active');
        }

      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        this.translation.text.isLoading = false;
      }); 
    }
  },
};
</script>
<template>
    <div class="text-secondary">
      <div class="grid gap-2 mt-4 p-3 text-center text-xl">
        <b v-if="!translation.text.isActive">
          "{{ hint }}"
        </b>
        <b v-else>
          "{{ this.translation.text.data }}"
        </b>
      </div>
      <div class="grid gap-3 mb-5">
        <div class="flex gap-2 items-center justify-center">
          <img
            @click="runSpeech(hint)"
            v-if="!speech.audio.isLoading&&!translation.text.isActive&&!speech.audio.playing" 
            src="@/assets/svg/Volume-up.svg" alt="volume"  
          />
          <img
            @click="runSpeechAudio('stop')"
            v-else-if="!speech.audio.isLoading&&!translation.text.isActive&&speech.audio.playing" 
            src="@/assets/svg/volume-off.svg" alt="volume"  
          />
          <DefLoader 
            v-else-if="speech.audio.isLoading&&!translation.text.isActive&&!speech.audio.playing" 
            size="md">
          </DefLoader>
          <img
            @click="runTranslation(true)"
            v-if="!translation.text.isLoading&&!translation.text.isActive"
            src="@/assets/svg/sign.svg" alt="translation-off"  
          />
          <img
            @click="runTranslation(false)"
            v-else-if="!translation.text.isLoading&&translation.text.isActive"
            src="@/assets/svg/sign-primary.svg" alt="translation-on"  
          />
          <DefLoader 
            v-else-if="translation.text.isLoading&&!translation.text.isActive" 
            size="md">
          </DefLoader>
        </div>
      </div>
      <div class="grid gap-2 mt-5">
        <label for="email">Transciption </label>
        <textarea
          :readonly="(transcription.text!==null&&transcription.text!=='')? false : true"
          v-model="transcription.text"
          :placeholder="transcription.placeholder.txt"
          rows="3"
          class="border outline-none p-3 rounded-lg overflow-hidden">{{ transcription.text }}</textarea>
      </div>
      <div class="flex gap-5 items-center justify-center py-5 mt-3">
        <img
          @click="startRecording()"
          v-if="!recording.working&&!recording.isApiLoading" 
          class="cursor-pointer mr-3 w-[74px]" 
          src="@/assets/svg/audio-btn.svg" 
          alt="record" 
        />
        <img
          @click="stopRecording()"
          v-else-if="recording.working&&!recording.isApiLoading" 
          class="cursor-pointer mr-3 w-[74px] animate-pulse" 
          src="@/assets/svg/audio-stop.svg" 
          alt="record" 
        />
        <DefLoader 
            v-else size="xxl">
        </DefLoader>
      </div>
      <div class="flex gap-5 mt-5">
        <Button @click="cancelHint()" class="flex-1" variant="outline">Cancel</Button>
        <Button @click="sendHint()" class="flex-1">Send</Button>
      </div>
    </div>
</template>
  <style></style>
  