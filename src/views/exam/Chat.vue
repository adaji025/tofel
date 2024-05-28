<script>
  import Header from "@/components/Headers/AuthHeader.vue";
  import Modal from "./components/Modal.vue";
  import Settings from "./components/Settings.vue";
  import Hints from "./components/Hints.vue";
  import GeneralService from '@/service/GeneralService.js';
  import EnFlag from "@/assets/svg/US.svg";
  import FrFlag from "@/assets/svg/FR.svg";
  import EsFlag from "@/assets/svg/ES.svg";
  import DefLoader from "@/components/Loader/Default.vue";
  import axios from 'axios';
  import RecordRTC from 'recordrtc';

  export default {
    components: {
      Header,
      Modal,
      Settings,
      DefLoader,
      Hints
    },

    data() {
      return {
        debug : false,
        setup : {},
        init : {
          instruction : {
            active : false,
            msg : ''
          }
        },
        task: {
          isLoading : false,
          data : null,
          active: "task one",
          prompt: null,
          category : ""
        },
        hint : {
          done : false,
          isLoading : false,
          response : null,
          data : {
            new : null,
            old : null
          },
          modal : {
            isOpen : false,
            text : null
          }
        },
        translate : {
          active : true,
          data : {
            source : {
              init : null,
              placeholder : 'Type message here',
              response  :  {
                text : null,
                data : null,
              },
              isLoading : false,
              img : null,
              audio : {
                data : null,
                isLoading : false,
                working : false
              }
            },
            target : {
              init : null,
              placeholder : 'Type message here',
              response  : {
                text : null,
                data : null
              },
              isLoading : false,
              img : null,
              audio : {
                data : null,
                isLoading : false,
                working : false
              }
            },
          },
          controls : {
              audio :{
                player : null,
                id : null,
                active : false
              }
          }
        },
        student_message : {
          working : false,
          preset  : false,
          recent  : "",
          feedback_working : false
        },
        teacher_message : {
          working : false,
          preset  : false,
          recent  : ""
        },
        audio_control : {
          speaker_on: true,
          recording: false,
          recorder: null,
          chunks: [],
          device: null,
          blobObj: null,
          fileObj: null,
          ObjURL: '',
          recordRTC : {},
          audio_ready : false,
          isPlayAudioActive : false,
          activate_panel : false,
          isSpeechTransActive : false,
          recording_duration : '',
          player : {
            id : 0,
            is_active : false
          },
        },
        media_control : {
          stream : null,
          blob : [],
          file : null,
          mediaRecorder : null,
          recording : false,
        },
        progress : {
          target : 7,
          sent : 0,
          percentage : 0,
          end : false
        },
        result : {
          worker : {
            active : true
          },
          score : {
            total : 0,
            breakdown : null,
            done : false,
            working : false,
            sync_id : null,
          },
          feedback : {
            grammar : {
              response : 'N/A',
              working  : false,
              done : false,
              data : null
            },
            fluency : {
              response : 'N/A',
              working  : false,
              done : false,
              data : null              
            },
            vocabulary : {
              response : 'N/A',
              working  : false,
              done : false,
              data : null
            }
          },
          final : {
            working : false,
            ready : false,
            data  : null
          }
        },
        remote : {
          prompts : {
            types : [
              "ielts-gpt-fluency-feedback", 
              "ielts-gpt-grammer-feedback",
              "ielts-gpt-vocabulary-feedback",
              "ai-language-score",
              "ai-language-hints"
            ],
            done : false,
            loading : false,
            data : null,
          }
        },
        voices : {
          en : {
            "languageCode":"en-US",
            "name": "en-US-Neural2-F",
            "ssmlGender":"FEMALE"
          },
          fr : {
            "languageCode":"fr-FR",
            "name": "fr-FR-Standard-C",
            "ssmlGender":"FEMALE"
          },
          es : {
            "languageCode":"es-ES",
            "name": "es-ES-Neural2-A",
            "ssmlGender":"FEMALE"
          }

        },
        isOpen: false,
        lang : 'en',
        target_lang : 'fr',
        presets : [],
        chat_history: [],
        feedbacks : [],
        ai_messages : [],
        initPreset : [],
        feeback_user_role : '',
        type_message : '',
        lesson_id : '',
        lesson_title : '',
        tab : '',
        test_id : null,
        trans_audio : true,
        EnFlag, EsFlag, FrFlag,
        timer : null
      };
    },

    created ()
    {
      this.initChat();
      this.timer = setInterval(this.miniCron, 1000);
    },

    beforeUnmount()
    {
      this.DeactivateAudio('active');
    },

    methods: {
      /**
       * Major Methods
       * @description : N/A
       */
      miniCron()
      {
        this.DeactivateAudio();
        this.resultProcessHandler();
        this.runTransDeactivateAudio();
      },

      initChat(id = 'ai-speaking')
      {
        this.lang = this.$store.state.languages.active_lang;
        this.target_lang = this.$store.state.languages.active_target;
        this.setup = this.$store.state.speaking_setup;
        this.initPreset = [];
        this.lesson_id = id;
        this.feedbacks.push(this.setup[this.lang].feedback.system_role[0]);
        this.feeback_user_role = this.setup[this.lang].feedback.user_pre_prompt[1];
        this.task.prompt = this.setup[this.lang].tasks;
        this.ai_messages.push(this.setup[this.lang].ai_message);
        this.test_id = this.$store.state.test_sync.id;

        if(this.init.instruction.active)
        {
          this.init.instruction.msg = this.setup[this.lang].init_teacher_msg;
        }

        if(id=='ai-speaking')
        {
            const presets = this.$store.state.ai_speaking.presets;
            const active  = presets.active;
            const select_preset = presets[this.lang][active];

            this.task.category = select_preset.title;
            this.setPreset(select_preset.prompt, 'active', select_preset.title, select_preset.msg);
            this.initTranslation(this.lang, this.target_lang);
            this.getTask();
            this.getRemoteSystems();
            
            if(this.setup.background!==null)
            {
              const backgroundAudio = this.setup.background.audio;
              const initAudio = backgroundAudio.find(
                (audio) => audio.lang === this.lang && audio.active
              )?.preset;

              if (initAudio) {
                this.startSpeechSynthesis(initAudio, null);
              }
            }
        }
      },

      resetInit(){
        this.translate.data.source.response.text = null;
        this.translate.data.target.response.text = null;
      },

      handleChangeTab(value) 
      {
        this.tab = value;

        const handlers = {
          hints: this.runHints,
          reset: this.resetInit
        };

        if (handlers[value]) {
          handlers[value]();
        }
      },

      handleChangeActiveTask(value) {
        this.task.active = value;
      },

      openModal() {
        this.isOpen = true;
      },

      closeModal() {
        this.isOpen = false;
      },

      openHintModal(text)
      {
        if(text){
          this.hint.modal.text = text;
          this.hint.modal.isOpen = true;
        }
      },

      closeHintModal(){
        this.hint.modal.isOpen = false;
      },

      closeSettings()
      {
        this.closeModal();
      },

      closeHints()
      {
        this.closeHintModal();
      },

      sendHint(message)
      {
        if(message)
        {
          this.ManualMessageSend(message, false);
          this.closeHintModal();
        }
      },

      /**
       * API & Sub Systems Request
       * @description : N/A 
       */
      async getChatGPTResponse(msg)
      {
          var param = this.gptParam('gpt-3.5-turbo',msg);

          this.teacher_message.working = true;
          const http = this.requestHeaders('completion', param.base);
          this.scrollToBottom();

          http.post('/completions', param.model).then((response) => {
            
            var message = 'An error orcurred while processing your request. Please try again later';

            switch(param.model.model)
            {
              case 'text-davinci-003' : message = response.data.choices[0].text ;break;
              case 'gpt-3.5-turbo': 
                message = response.data.choices[0].message.content;

                if(message!==undefined&&message!=="")
                {
                  this.ai_messages.push(response.data.choices[0].message);
                }
              break; 
            }

            this.teacher_message.recent = message;
            this.addMsgToHistory(message, 'teacher');

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            if(this.audio_control.speaker_on==false)
            {
                this.teacher_message.working = false;
            }
          });
      },

      async getTransGPTResponse(param)
      {
          this.student_message.working = true;

          const http = this.requestHeaders('transcription');
          http.post('/audio/transcriptions', param).then((response) => {

            if(response.data.text !== null)
            {
              var transciption = response.data.text;

              this.student_message.recent = transciption;
              this.addMsgToHistory(this.student_message.recent, 'student');
              this.removePreset();
              
              /**
               * Deprecated
               * 
               * @description :  to be removed
               */
              // this.getChatGPTResponse(this.student_message.recent);
              
              this.manageResult(this.student_message.recent);
              this.audio_control.audio_ready = true;
  
            }
            else
            {
              alert('Sorry there is an issue with your request. Please try again');
            }

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            this.student_message.working = false;
            this.audio_control.recording = false;
          });
      },

      async getSpeechGPTResponse(text, chat=null, index=null)
      {
          const http  = this.requestHeaders('speech');
          const voice = this.voices;
          const param = {
            "input":{
              "text": text
            },
            "voice": voice[this.lang],
            "audioConfig":{
              "audioEncoding":"MP3"
            }
          }
          
          if(index!==null)
          {
            this.chat_history[index].audio.is_loading = true;
          }

          http.post(`/v1/text:synthesize?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, param).then((response) => { 
            if(response.data.audioContent!==null)
            {
                if(chat!==null)
                {
                  this.chat_history.push(chat); this.scrollToBottom();
                  
                  index =  this.chat_history.length - 1;
                }

                if(index!==null)
                {
                  this.chat_history[index].audio.file = response.data.audioContent;
                  this.PlayAudioSingle(response.data.audioContent, index);
                }
                else
                {
                  this.playAudio(response.data.audioContent);
                }
            }
          }).catch((error)=>{
            console.log(error);
          }).finally(()=>{
            this.teacher_message.working = false;

            if(index!==null)
            {
              this.chat_history[index].audio.is_loading = false;
            }
          })
      },

      async getFeedbackGPTResponse(index, msg)
      {
          // # Debug
          // console.log('# Debug check index :'+index);

          var param = this.gptParam('gpt-3.5-turbo-feedback',msg);

          this.student_message.feedback_working = true;
          const http = this.requestHeaders('completion', param.base);
          this.scrollToBottom();

          http.post('/completions', param.model).then((response) => {

            var message = response.data.choices[0].message.content;

            if(message!==undefined&&message!=="")
            {
              this.feedbacks.push(response.data.choices[0].message);
            }

            console.log('# Debug : check feedback response [ index ] : '+index);
            console.log(message)

            this.chat_history[index].feedback = message;

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            this.student_message.feedback_working = false;
          });
      },

      async getTextTranslation(txt,target,source,index=null)
      {
        const http = this.requestHeaders('translation');

        this.chat_history[index].translation.is_loading = true;
      
          const param = {
            "q": txt,
            "target": target,
            "source": source
          }

          http.post(`/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, param).then((response) => { 
            
            if(response.data!==null)
            {
                var data =  response.data.data;

                if(index!==null)
                {
                  this.chat_history[index].translation.data = this.HtmlDecodeEntity(data.translations[0].translatedText);
                  this.chat_history[index].translation.setting.source = source;
                  this.chat_history[index].translation.setting.target = target;
                  this.chat_history[index].translation.prev_data = this.chat_history[index].translation;
                  this.chat_history[index].translation.active = true;

                  this.DeactivateAudio('active');
                }
            }

          }).catch((error)=>{
            console.log(error);
          }).finally(()=>{
            this.chat_history[index].translation.is_loading = false;
          })

      },

      async getTask()
      {
          this.task.isLoading = true;
          
          let param = this.gptParam('gpt-task');
          const http = this.requestHeaders('completion', param.base);
          this.scrollToBottom();

          http.post('/completions', param.model).then((response) => {
            
            let message = response.data.choices[0].message.content;

            if(message!==undefined&&message!==""&&message!==null)
            {
              let task = JSON.parse(message);

              if(task!==undefined)
              {
                this.task.data = task;
              }
            }

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            this.task.isLoading = false;
          });
      },

      async getHint(msg)
      {
        this.hint.isLoading = true;
          
        const param = this.gptParam('gpt-general', msg);
        const http  = this.requestHeaders('completion', param.base);

        http.post('/completions', param.model).then((response) => {
          
          let message = response.data.choices[0].message.content;

          if(message!==undefined&&message!==""&&message!==null)
          {
            let hints = JSON.parse(message);
            const hdo = this.hint.data.new; // old hints

            if(hints!==undefined)
            {
              this.hint.data.old = hdo; 
              this.hint.data.new = hints;
              this.hint.response = response.data;
            }
          }

        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          this.hint.isLoading = false;
        });        
      },

      async getRemoteFeedback(msg, preset = null, temp = 0)
      {
          /**
           * : Presets
           * @description : type, model & api 
           */
          this.runResultFeedbackLoader(preset.type, 'start');
          const param = this.gptParam(preset.model, msg, temp);
          const auth  = (preset.api=='Claude')? true : false;
          const env   = (preset.api=='Claude')? 'remote-api' : 'completion'; 
          const http  = this.requestHeaders(env, param.base, auth);
          const url   = (preset.api=='Claude')? '/systems/speech/claude/completion' : '/completions';

          /**
           * Debugger 
           * @description : N/A 
           */
          GeneralService.debug(this.debug, {msg : 'GetGrammarResponse [ started ] :'+preset.api, obj : param});

          http.post(url, param.model).then((response) => {
              
              let message = null;

              /**
               * Debugger
               * @description : Check clause / gpt response 
               */
              GeneralService.debug(this.debug, {msg : 'Check  [ response.data ] : ', obj : response.data});

              if(preset.api=='Claude')
              {
                message = response.data.data.completion;
              }
              else
              {
                message = response.data.choices[0].message.content;
              }
              
              if(message!==null)
              {
                this.updateResultFeedback(preset.type, this.HtmlDecodeEntity(message));
              }

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            this.runResultFeedbackLoader(preset.type, 'stop');
          });
      },

      async getScore(msg)
      {
        this.result.score.working = true;

        let param  = this.gptParam('gpt-general', msg);
        const http = this.requestHeaders('completion', param.base);

        http.post('/completions', param.model).then((response) => {
                    
            let message = response.data.choices[0].message.content;

            if(message!==null)
            {
              let temp_score = JSON.parse(message);

              /**
               * Debuger
               * 
               * @description : Check response.data 
               */
              GeneralService.debug(this.debug, {msg : 'getScore - check [ response.data ] :', obj : response.data});

              if(temp_score!==undefined)
              {
                this.result.score.breakdown = temp_score;
                this.result.score.done = true;
              }
            }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          this.result.score.working = false;
        });
      },

      async getRemoteSystems()
      {
        this.remote.prompts.loading = true;

        const http = this.requestHeaders('remote-api','',true);
        const param = {
              slug_type : this.remote.prompts.types
        };
       
        http.post('systems/prompts/bulk', param).then((response)=>{
            let res = response.data;

            if(res.success==true)
            {
              this.remote.prompts.data = res.data;
              this.remote.prompts.done = true;

              /**
               * Debugger
               * 
               * @description : Check remote systems response / online 
               */
              GeneralService.debug(this.debug, {msg : 'check remote systems [ prompt ] :' , obj : this.remote.prompts.data });

              // : Deprecated
              // this.result_setup.working.active = true;
              // this.ProcessFeedback();
              // this.ProcessResult();
            }

        }).catch((error)=>{
          console.log(error);
        }).finally(() => {
          this.remote.prompts.loading = false;
        });
      },

      async updateUsersRecord()
      {
        this.result.final.working = true;

        const http  = this.requestHeaders('remote-api','',true);
        const param = {
            type : 'ai-speaking-results',
            data : this.result.final.data,
            test_id : this.test_id
        };
        
        http.post('results/store', param).then((response)=>{
            let res = response.data;

            if(res.success==true)
            {
              this.result.final.ready = true;

              const msg  = 'Here’s your Vtalk score';
              const type = 'teacher';
              this.addMsgToHistory(msg, type, false, false, false, true);

              this.teacher_message.working = false;
              this.result.worker.active = false;
              this.result.score.sync_id = res.data.id
            }

        }).catch((error)=>{
          console.log(error);
        }).finally(() => {
          this.result.final.working = false;
        });
      },

      async getSingleTextTranslation(txt, target, source, type, action)
      {
          this.runTransSingleLoader(type, action, true);
          
          const param = {
            "q": txt,
            "target": target,
            "source": source
          }

          const http = this.requestHeaders('translation');

          http.post(`/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, param).then((response) => { 
            
            if(response.data!==null)
            {
              let dataTemp = response.data.data;

              const data = {
                text : this.HtmlDecodeEntity(dataTemp.translations[0].translatedText),
                data : dataTemp
              }

              this.runTransSingleUpdate(type, action, data);
            }

          }).catch((error)=>{
            console.log(error);
          }).finally(()=>{
            this.runTransSingleLoader(type, action, false);
          });       
      },

      async getSingleSpeechTranslation(text, soruce, type, action)
      {
        this.runTransSingleLoader(type, action, true);

        const http  = this.requestHeaders('speech');
        const voice = this.voices;
        const param = {
          "input":{
            "text": text
          },
          "voice": voice[soruce],
          "audioConfig":{
            "audioEncoding":"MP3"
          }
        }

        http.post(`/v1/text:synthesize?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, param).then((response) => { 

          if(response.data.audioContent!==null)
          {
            this.runTransSingleUpdate(type, action, response.data.audioContent);
          }

        }).catch((error)=>{
          console.log(error);
        }).finally(()=>{
          this.runTransSingleLoader(type, action, true);
        });
      },

      /**
       * Deprecated methods
       * @description : To be removed 
       */
      replaceCategory(text, category) 
      {
        return text.replace(/{Category}/g, category);
      },

      /**
       * Refined methods
       * @description : Extensive review before adding to main logic 
       */
      startSpeechSynthesis(msg, chat)
      {
        if(this.audio_control.speaker_on==true){
            this.getSpeechGPTResponse(msg, chat);
        }
      },

      setPreset(data, prompt = 'not-active', title = '', msg = '', no_feedback_active = false )
      {
          let message = '';
          const altMsg = { active : false, msg : ''}

          if(prompt==='active')
          {
              message = title;
              this.ai_messages.push({"role":"system", "content": data})
              altMsg.active = true;
              altMsg.msg = msg;
          }
          else if(prompt==='not-active')
          {
            // : Deprecated
            // if(data=='random')
            // {
            //   const random = Math.floor(Math.random() * this.presets[data].length);
            //   message = this.presets[data][random];
            // }
            // else
            // {
            //   message = this.presets[data];
            // }
            message = data === 'random' ? this.presets[data][Math.floor(Math.random() * this.presets[data].length)] : this.presets[data];
          }

          this.student_message.recent = message;
          this.addMsgToHistory(message, 'student', no_feedback_active, false, false);
          this.removePreset();
          
          if(altMsg.active){
            this.getChatGPTResponse(altMsg.msg);          
          }
          else{
            this.getChatGPTResponse(message);
          }
      },

      removePreset()
      {
        if(this.chat_history[0].preset==true)
        {
          this.chat_history[0].preset = false;
        }
      },

      requestHeaders(type = 'completion', base = '', auth = false, multipart = false)
      {
        let param = GeneralService.AxiosHeaders(type, base, auth, multipart);

        return axios.create(param);
      },

      gptParam(type,msg)
      {
          let param  = {};
          const temp = 0.7;

          if(type=='gpt-3.5-turbo')
          {
            let messages = this.ai_messages;
            messages.push({"role": "user", "content": msg});

            param = {
              base  : 'chat',
              model : {
                "model": "gpt-3.5-turbo",
                "messages": messages,
                "temperature": temp,
                "top_p": 1,
              }
            }
          }

          if(type=='gpt-3.5-turbo-feedback')
          {
            let messages = this.feedbacks;

            messages.push({"role": "user", "content": this.feeback_user_role+msg});

            param = {
              base  : 'chat',
              model : {
                "model": "gpt-3.5-turbo",
                "messages": messages,
                "temperature": temp,
                "top_p": 1,
              }
            }
          }

          if(type=='gpt-task')
          {
            let tasks = this.task.prompt;
            let messages = [];

            messages.push(tasks.system_role[0]);
            messages.push({"role": "user", "content": this.replaceCategory(tasks.user_pre_prompt[0], this.task.category)});

            param = {
                base  : 'chat',
                model : {
                  "model": "gpt-3.5-turbo",
                  "messages": messages,
                  "temperature": temp,
                  "top_p": 1,
                }
            }            
          }

          if(type=='gpt-general')
          {
            param = {
                base  : 'chat',
                model : {
                  "model": "gpt-3.5-turbo",
                  "messages": msg,
                  "temperature": temp,
                  "top_p": 1,
                }
            }
          }

          if(type=='Claud')
          {
              param = {
                  base  : '',
                  model : {
                    "prompt": "\n\nHuman: "+msg[1].content+", Claude\n\nAssistant:",
                    "max_tokens_to_sample": 1024,
                  }
              }
          }

          return param;
      },

      addMsgToHistory(message, type, feedback_active_status = true, push_only = false, show = true, result = false)
      {

        let chat = {
            by : type,
            preset : false, 
            msg : message,
            msg_trans : "",
            feedback : "",
            feedback_active : feedback_active_status,
            created_at : this.getDateTime(),
            audio : {
              file : "",
              is_loading : false,
              player : {},
              active : false
            },
            translation : {
              setting : {
                source : '',
                target : ''
              },
              data : "",
              prev_data : {},
              is_loading : false,
              active : false,
            },
            isResult : result,
            notification : false,
            isShowActive : show
        };

        if(type=='teacher')
        { 
          if(push_only)
          {
            this.chat_history.push(chat);
          }else
          {     
            if(this.audio_control.speaker_on==true)
            { 
              this.startSpeechSynthesis(message, chat);
            }
            else
            { 
              this.chat_history.push(chat)
              this.scrollToBottom();
            }
          }
        }
        else if(type=='student')
        {
          if(push_only)
          {
            this.chat_history.push(chat);
          }
          else
          {
            this.chat_history.push(chat);
            this.manageStop();
            this.scrollToBottom();
          }
        }
      },

      getDateTime()
      {
        return new Date().toLocaleString().replace(',','');
      },

      muteTxtToSpeech(action)
      {

        if(action=='on')
        {
              this.audio_control.speaker_on = true;
        }

        if(action=='off')
        {
    
            const answer = window.confirm('Do you really want mute the text to audio ?');
          
            if (answer) 
            {
              this.audio_control.speaker_on = false;
            } 
        }

        console.log(this.audio_control.speaker_on);
      },

      ManualMessageSend(message, isManualInput = true)
      {
        // : Previous message Input
        // - this.type_message

        if(message.trim()!=="")
        {
          this.removePreset();
          this.addMsgToHistory(message, 'student');
          this.manageResult(message);

          if(isManualInput)
          {
            this.type_message = "";
          }
        }
      },

      startRecordRTC()
      {
        this.audio_control.recording = true;
        this.audio_control.blobObj = null;
        this.audio_control.fileObj = null;
        this.student_message.recent = "";
        this.audio_control.audio_ready = false;

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

              this.audio_control.recordRTC = RecordRTC(stream.clone(), options);
              this.audio_control.recordRTC.startRecording();
          });
      },

      stopRecordRTC()
      {
          this.audio_control.recordRTC.stopRecording(()=> {

                let blob = this.audio_control.recordRTC.getBlob();
                let file = this.blobToFile(blob, 'trans.mp4');
                this.audio_control.blobObj = blob;
                this.audio_control.fileObj = file;
                this.getTransGPTResponse(file);
                this.audio_control.chunks = [];
                this.audio_control.recording = false;
          });
      },

      blobToFile(theBlob, fileName)
      {
        let formData = new FormData();
        let file = new File([theBlob], fileName, {type: theBlob.type});

        formData.append('file', file, fileName);
        formData.append('model', 'whisper-1');
        formData.append('language', this.lang);

        return formData;
      },

      playAudio(base64string)
      {
        var snd = new Audio("data:audio/mp3;base64," + base64string);
        snd.play();
      },

      controlAudioDevice(status)
      {
        this.audio_control.device = navigator.mediaDevices.getUserMedia({ audio: status });
      },

      scrollToBottom() {
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      },

      checkDeviceType() 
      {
        const getMobileOS = () => {
          const ua = navigator.userAgent
          if (/android/i.test(ua)) 
          {
            return "Android"
          }
          else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
          {
            return "iOS";
          }
          
          return "Other";
        }

        return getMobileOS();
      },

      convertBlobToBase64(blob)
      {
        if(blob!==null)
        {
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() 
            {
              var base64data = reader.result;                
              // # Debug
              // console.log('# Debug base 64 url :');
              // console.log(base64data);

              var snd = new Audio(base64data);
              snd.play();
            }
        }
      },

      RecordingPanel(type)
      {
          if(type=='open')
          {
            this.audio_control.activate_panel = true;
          }
          else
          {
            this.audio_control.activate_panel = false;
            this.audio_control.audio_ready = false;
          }
      },

      RecordWidgetStyle(isRecording, style)
      {
        var data = '';
        var type = (isRecording)? 'stop' : 'start';

        if(type=='start')
        {
            switch(style)
            {
              case 'wave': data = this.WaveGrey; ;break;
              case 'record': data = this.MicGrey ;break;
            }
        }
        else if(type=='stop')
        {
            switch(style)
            {
              case 'wave': data = this.WaveRed; ;break;
              case 'record': data = this.MicRed; break;
            }
        }

        return data;
      },

      GetAudioDuration(blob)
      {
        (async () => {
            const duration = await getBlobDuration(blob);
            
            // # Debug
            console.log('# Debug show getBlobDuration :');
            console.log(duration + ' seconds');

            this.audio_control.recording_duration = this.ConvertSecondsToMinute(duration);
        })()
      },

      ConvertSecondsToMinute(seconds)
      {
          var minutes = '';

          if(seconds<3600)
          {
            minutes = new Date(seconds * 1000).toISOString().substring(14, 19)
          }
          else
          {
            minutes = new Date(seconds * 1000).toISOString().substring(11, 16);
          }

          return minutes;
      },

      RunFeedback(feedback, index, msg)
      {
        var status = true;

        if(feedback=='')
        {
            // # Debug
            // console.log('# Debug Check Feedback Params :');
            // console.log('Index : '+index);
            // console.log('Msg : '+msg);
            if(this.student_message.feedback_working==false)
            {
              this.getFeedbackGPTResponse(index, msg);
            }

            status = false;
        }

        return status;
      },

      CheckFeedBack(feedback)
      {
          var status   = false;
          const checks = ["GREAT","Great","Great.","GREAT.","GREAT!","Great!"];

          if(checks.includes(feedback))
          {
            status = true;
          }

          return status;
      },

      RunTranslate(index, status=false)
      {
        var trans = this.chat_history[index].translation;

        if(status==true)
        {
          var is_data =  this.chat_history[index].translation.data;

          if(is_data!=="")
          {
              this.DeactivateAudio('active');
              trans.active = status;
          }
          else
          {
            var target = this.target_lang;
            var source = this.lang;
            var txt    = this.chat_history[index].msg;

            this.getTextTranslation(txt, target, source, index);
          }
        }
        else
        {
          trans.active = status;
        }

        this.chat_history[index].translation = trans;
      },

      CheckAudioActive()
      {
        var check = (this.audio_control.player.id>=0&&this.audio_control.player.is_active)? true : false;

        return check;
      },

      DeactivateAudio(type='playing')
      {
        if(type=='playing')
        {
          var check = this.CheckAudioActive();

          if(check)
          {
              var isAudioPlaying = (index) => {
                  return !this.chat_history[index].audio.player.paused;
              }

              var index = this.audio_control.player.id;

              if(!isAudioPlaying(index))
              {
                this.chat_history[index].audio.active = false;
              }
          }
        }

        if(type=='active')
        {
          if(this.audio_control.player.is_active==true)
          {
            this.chat_history[this.audio_control.player.id].audio.player.pause();
            this.chat_history[this.audio_control.player.id].audio.active = false;
          }
        }
      },

      RunAudioSingle(index, action='play')
      { 
        var chat = this.chat_history[index];

        if(action=='play')
        {
            if(chat.audio.file!=="")
            { 
              var base64string = chat.audio.file;

              this.PlayAudioSingle(base64string, index)
            }
            else
            {
              var txt = chat.msg;
              this.getSpeechGPTResponse(txt, null, index);
            } 
        }
        else if(action=='stop')
        {
            this.StopAudioSingle(index);
        }
      },

      PlayAudioSingle(base64string, index)
      {
        var audio = this.chat_history[index].audio;

        this.DeactivateAudio('active');

        audio.player = new Audio("data:audio/mp3;base64," + base64string);
        audio.player.play();
        audio.active = true;
        this.audio_control.player.id = index;
        this.audio_control.player.is_active = true;

        this.chat_history[index].audio = audio;
      },

      StopAudioSingle(index)
      {
        var audio = this.chat_history[index].audio;
        audio.player.pause();
        audio.active = false;

        this.chat_history[index].audio = audio;
        this.audio_control.player.id = index;
        this.audio_control.player.is_active = false;
      },

      HtmlDecodeEntity(str) 
      {
        let txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
      },

      getChatConv()
      {
        const conv  = this.chat_history;
        let message = '';

        /**
         * Debugger
         * 
         * @descriptin : N/A 
         */
        GeneralService.debug(this.debug, { msg : 'Check [ conversations ] :', obj : conv});

        if(conv.length>0)
        {
          conv.forEach((chat) => {
            if(chat.by=='teacher'&&chat.msg!==''&&chat.isShowActive)
            { 
              message += 'Question :'+chat.msg;
            }
            else if(chat.by=='student'&&chat.msg!==''&&chat.isShowActive)
            {
              message += 'Answer :'+chat.msg;
            }
          });
        }

        return message;
      },

      processResult()
      {
        this.teacher_message.working = true;

        const conversation = this.getChatConv();

        if(conversation!=='')
        {
            /**
             * Run Feedbacks
             * @description : N/A
             */
            this.runResultFeedback(conversation);

            /**
             * Run Score
             * @description : N/A
             */
            this.runResultScore(conversation);
        }
      },

      prepareFinalResult()
      {
        
       if(this.result.final.working==false)
       {
          let average_score = 0;


          /**
           * Debugger 
           * 
           * @description : N/A 
           */
          GeneralService.debug(this.debug, {msg : 'prepareFinalResult [ score.breakdown ] : ', obj : this.result.score.breakdown});

          if(this.result.score.breakdown!==null)
          {
              const temp_score = this.result.score.breakdown;
              let total_score = 0;
              let denum_count = 0;

              Object.entries(temp_score).forEach( entry => {
                const [key, value] = entry;
                if(value!==null)
                {
                  total_score += parseFloat(value);
                  denum_count++;
                }
              });

              if(denum_count>0)
              {
                  average_score = total_score / denum_count;
                  this.result.score.total = average_score;
              }
          }

            const pronuncation = 0;
            const speed = 0;
            const score = this.result.score.breakdown;

            let result = {
              prep_id : 'ai-speaking-prep-id',
              exam_id : 'ai-speaking-exam-id',
              record  : {
              total_score : average_score,
              breakdown : {
                data :{
                    pr  : pronuncation,
                    gpt : score,
                    spd : speed
                },
                response : null
              },
              feedback : {
                fluency : this.result.feedback.fluency.response,
                grammar : this.result.feedback.grammar.response,
                vocabulary : this.result.feedback.vocabulary.response
              },
              speaking_part_1 : [],
              speaking_part_2 : [],
              speaking_part_3 : []
              }
            }

            this.result.final.data = result;

           /**
            * User Update
            * @description : trigger 
            */
            this.updateUsersRecord();
         }
      },

      replaceTags(text, tag, type)
      {
        const replacementMap = {
          conversation: '{Conversation}',
          category: '{Category}',
        };

        return text.replace(new RegExp(replacementMap[type], 'g'), tag);
      },

      settingsUpdate(overide = false)
      {
        if(overide)
        {
          this.setup = {}
          this.presets = [];
          this.chat_history = [];
          this.feedbacks = [];
          this.ai_messages = [];
          this.initPreset = [];
          this.initChat();
        }else{
          this.target_lang = this.$store.state.languages.active_target;
        }
        
        this.closeModal();
      },

      manageStop()
      {
        if(this.progress.end==false)
        {
          this.progress.sent++;

          /**
           * & Debugger 
           * @description : Hints prompt check  
           */
          GeneralService.debug(this.debug, {msg : 'check [sent] :', obj : this.progress.sent});
          GeneralService.debug(this.debug, {msg : 'check [target] :', obj : this.progress.target});

          if(this.progress.sent<=this.progress.target)
          {
            this.manageProgress();

            if(this.progress.sent==this.progress.target)
            {
              this.progress.end = true;
            }
          }else{
            this.progress.end = true;
          }
        }
      },

      manageProgress()
      {
        const progress = (this.progress.sent / this.progress.target) * 100;
        const roundedUp = Math.ceil(progress);
        this.progress.percentage = roundedUp;
      },

      manageResult(msg)
      {
         if(this.progress.end)
         {
           this.processResult();
         }
         else
         {
           this.getChatGPTResponse(msg);
         }
      },

      handleModelPreset(type, overide = null)
      {
        let res = null;

        if(type=='Claude')
          {
              res = type;
          }else{
            if(overide!==null){
              res = overide;
            }else{
              res = 'gpt-3.5-turbo';
            }
          }

        return res;
      },

      runResultFeedback(conversation)
      {
        let prompt_g = this.singlePrompt('grammer');
        let prompt_v = this.singlePrompt('vocabulary');
        let prompt_f = this.singlePrompt('fluency');

        prompt_g.prompt[1].content = prompt_g.prompt[1].content + conversation;
        prompt_v.prompt[1].content = prompt_v.prompt[1].content + conversation;
        prompt_f.prompt[1].content = prompt_f.prompt[1].content + conversation;

        /**
         * & Debuger
         * @description : N/A 
         */
        GeneralService.debug(this.debug, {msg : 'grammer feedback Final [ prompt ] :', obj : prompt_g});
        GeneralService.debug(this.debug, {msg : 'Vocabulary feedback Final [ prompt ] :', obj : prompt_v});
        GeneralService.debug(this.debug, {msg : 'Fluency feedback Final [ prompt ] :', obj : prompt_f});

        /**
         * # Presets : Grammar, Vocabulary & Fluency
         * @description : type, model & api 
         */
        this.getRemoteFeedback(prompt_g.prompt, { 
              type : 'grammar', 
              model : this.handleModelPreset(prompt_g.api, 'gpt-general'), 
              api : prompt_g.api
        });
        this.getRemoteFeedback(prompt_v.prompt, { 
            type : 'vocabulary', 
            model : this.handleModelPreset(prompt_v.api, 'gpt-general'), 
            api : prompt_v.api
        });
        this.getRemoteFeedback(prompt_f.prompt, { 
            type : 'fluency', 
            model : this.handleModelPreset(prompt_f.api, 'gpt-general'), 
            api : prompt_f.api
        });

      },

      runResultFeedbackLoader(type, action)
      {
        switch(type)
        {
            case 'grammar' :
              this.result.feedback.grammar.working = (action=='start')? true : false;
            break;
            case 'fluency' :
              this.result.feedback.fluency.working = (action=='start')? true : false;
            break;
            case 'vocabulary' : 
              this.result.feedback.vocabulary.working = (action=='start')? true : false;
            break;
        }
      },

      updateResultFeedback(type = null, message, data = null)
      {
        switch(type)
        {
          case 'grammar' : 
            this.result.feedback.grammar.response = message;
            this.result.feedback.grammar.done = true;
            this.result.feedback.grammar.data = data;
          break;
          case 'fluency' :
            this.result.feedback.fluency.response = message;
            this.result.feedback.fluency.done = true;
            this.result.feedback.fluency.data = data;
          break;
          case 'vocabulary' : 
            this.result.feedback.vocabulary.response = message;
            this.result.feedback.vocabulary.done = true;
            this.result.feedback.vocabulary.data = data;
          break;
        }
      },

      runResultScore(conversation)
      {
        const prompt = this.singlePrompt('score'); 
        const temp_c = prompt.prompt[1].content + conversation;
        const temp_d = prompt.prompt[0].content;

        /**
         * Debugger
         * @description : Check prompt 
         */
         GeneralService.debug(this.debug, {msg : 'check hints [ prompt ] :', obj : prompt});

        const new_prompt  = [
          {"role" : "system", "content" : temp_d},
          {"role" : "user", "content" : temp_c}
        ];

        /**
         * Debugger 
         * @description : Hints prompt check  
         */
        GeneralService.debug(this.debug, {msg : 'check hints [ new_prompt ] :', obj : new_prompt});

        this.getScore(new_prompt);
      },

      singlePrompt(slug = null)
      {
          let temp_prompt = null;
          let temp_api =  null;
          let slug_id = null;
          const data = this.remote.prompts.data;
          const types = this.remote.prompts.types;

          switch(slug)
          {
            case 'fluency': slug_id = types[0]; break;
            case 'grammer': slug_id = types[1]; break;
            case 'vocabulary': slug_id =  types[2]; break;
            case 'score': slug_id =  types[3]; break;
            case 'hints': slug_id = types[4]; break;
          }

          /**
            * Debugger 
            * @description : Check remote systems objects 
            */
          GeneralService.debug(this.debug, {msg : 'check [ slug_id ] : '+slug_id, obj : null});
          GeneralService.debug(this.debug, {msg : 'check [ types ] : ', obj :types});
          GeneralService.debug(this.debug, {msg : 'check [ data ]: ', obj : data});
          

          for(var i = 0; i<data.length; i++)
          {
              if(slug_id==data[i].type)
              {
                if(data[i].data?.prompt!==undefined)
                {
                  temp_prompt = data[i].data.prompt;

                  if(data[i].data?.api!==undefined)
                  {
                    temp_api = data[i].data.api;
                  }
                }else{
                  temp_prompt = data[i].data;
                }
              }
          }

          /**
            * Debugger
            * 
            * @description : check remote temp prompt 
            */
          GeneralService.debug(this.debug, {msg : 'check [ temp_prompt ] : ', obj : temp_prompt});

          return { prompt : temp_prompt, api : temp_api }
      },

      runHints()
      {
        const conversation = this.getChatConv();
        const prompt = this.singlePrompt('hints');
        const [temp_d, temp_c] = prompt.prompt.map((item, index) => 
          index === 0 ? item.content : this.replaceTags(item.content, conversation, 'conversation')
        );

        GeneralService.debug(this.debug, { msg: 'check hints [prompt]:', obj: prompt });

        const new_prompt = [
          { role: 'system', content: temp_d },
          { role: 'user', content: temp_c }
        ];

        GeneralService.debug(this.debug, { msg: 'check hints [new_prompt]:', obj: new_prompt });

        this.getHint(new_prompt);
      },

      runTranslation(origin, type)
      {
        const isSource = origin === 'source';
        const txt = isSource ? this.translate.data.source.response.text : this.translate.data.target.response.text;
        const target = isSource ? this.target_lang : this.lang;
        const source = isSource ? this.lang : this.target_lang;
        const loaderType = origin;
        const loaderAction = type;

        if (txt) {
          if(type=='send'){
            this.getSingleTextTranslation(txt, target, source, loaderType, loaderAction);
          }
          else if(type=='audio'){
            this.getSingleSpeechTranslation(txt, source, loaderType, loaderAction);
          }
        }
      },

      initTranslation(source, target)
      {
        if(this.translate.active) 
        {
          this.translate.data.source.init = source;
          this.translate.data.source.img = this.getFlagUrl(source);

          this.translate.data.target.init = target;
          this.translate.data.target.img = this.getFlagUrl(target);
        }
      },

      resultProcessHandler() 
      {
        if (this.result.worker.active && this.result.score.done && 
            this.result.feedback.fluency.done && this.result.feedback.grammar.done && 
            this.result.feedback.vocabulary.done) {
          this.prepareFinalResult();
        }
      },

      getFlagUrl(lang)
      {
          const url = {
            en : this.EnFlag,
            fr : this.FrFlag,
            es : this.EsFlag
          }

          return url[lang];
      },

      runTransSingleLoader(type, action, status) 
      {
        const isLoadingProperty = action === 'send' ? 'isLoading' : 'audio.isLoading';
        const placeholderProperty = action === 'send' ? 'placeholder' : null;

        if (type === 'source' || type === 'target') 
        {
          this.translate.data[type][isLoadingProperty] = status;

          if (placeholderProperty) 
          {
            const placeholderTxt = (status)? 'Loading ...' : 'Type message here';
            const altType = type === 'source' ? 'target' : 'source';

            if(status){
              this.translate.data[altType].response.text = null;
            }

            this.translate.data[altType][placeholderProperty] = placeholderTxt;
          }
        }
      },

      runTransSingleUpdate(type, action, data)
      {
        const isLoadingProperty = action === 'send' ? 'response' : 'audio.data';

        if (type === 'source' || type === 'target') 
        {
          const altType = (type === 'source') ? 'target' : 'source';
          this.translate.data[altType][isLoadingProperty] = data;

          if(action === 'audio'){
            this.runTransAudio(data, type, 'play');
          }
        }
      },

      runTransAudio(data, source, action)
      {
        if(action=='play')
        {
            if(data)
            { 
              this.runTransDeactivateAudio('active');

              const audio = new Audio("data:audio/mp3;base64," + data);
              this.translate.controls.audio.player = audio;
              this.translate.controls.audio.player.play();
              this.translate.controls.audio.active = true;
              this.translate.controls.audio.id = source;
              this.translate.data[source].audio.working = true;
            }
             
        }
        else if(action=='stop')
        {
            if(this.translate.controls.audio.active){
              this.translate.controls.audio.player.pause();
              this.translate.controls.audio.active = false;
              this.translate.data[source].audio.working = false;
            }            
        }
      },

      runTransDeactivateAudio(type='stream')
      {
        if(type=='stream'){
          if(this.translate.controls.audio.id&&this.translate.controls.audio.active)
          {
              const isAudioPlaying = () => {
                  return !this.translate.controls.audio.player.paused;
              }

              if(!isAudioPlaying()){
                const id  = this.translate.controls.audio.id;
                this.translate.data[id].audio.working = false;
              }
          }
        }
        else if(type=='active'){
          if(this.translate.controls.audio.active){ 
            const id = this.translate.controls.audio.id;
            this.translate.controls.audio.player.pause();
            this.translate.controls.audio.active = false;
            this.translate.data[id].audio.working = false;
          }
        }
      }
    },
  };
</script>
<template>
  <div class="text-secondary bg-[#F8F9FC] w-full min-h-screen">
    <Header></Header>
    <div class="max-w-[1400px] w-full mx-auto sm:px-5 lg:px-10 mt-10 pb-10">
      <div class="max-w-[1000px] mx-auto border sm:rounded-[16px] flex flex-col items-start w-full">
        <div class="p-5 lg:p-10 bg-[#EAECF5] sm:rounded-t-[16px] border-b sticky top-24 sm:top-20 w-full">
          <div class="flex justify-between items-start gap-10 w-full">
            <div>
              <div class="font-bold text-xl mdtext-2xl mb-2">
                Speaking Progress
              </div>
              <div>
                {{ init.instruction.msg }}
              </div>
            </div>
            <img
              src="@/assets/svg/Settings-alt.svg"
              alt="settings"
              class="cursor-pointer"
              @click="openModal"
            />
          </div>
          <div class="w-full h-2 rounded bg-[#FFE4E8] mt-5">
            <div
              :style="{ width: `${progress.percentage}%` }"
              class="h-2 bg-primary rounded"></div>
          </div>
        </div>

        <div class="p-5 lg:p-10 bg-white w-full border-b grid gap-10">
          <!-- Dynamic : Msg History -->
          <div id="vt-dynamic-history" >
            <div id="vt-msg-strem" v-for="(history, index) in chat_history" :key="index">
              
              <!-- Teacher : Vicky -->
              <div id="vt-teacher-stream" v-if="history.by=='teacher'">
                <!-- : Normal -->
                <div
                  v-if="history.isResult==false"
                  id="vt-msg-teacher-normal" 
                  class="flex mt-5 gap-5">
                  <div class="w-min-[24px] h-min-[24px] rounded-full">
                    <img
                      src="@/assets/png/vicky.png"
                      alt="vicky"
                      class="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div>Vicky</div>
                    <div
                      class="p-5 bg-[#F8F9FC] rounded-md w-[90%] mt-2 text-secondary">
                      <div class="target-message" v-if="history.translation.active">
                        {{history.translation.data}}
                      </div>
                      <div class="source-message" v-else>
                        {{history.msg}}
                      </div>

                      <!-- Audio & Translations -->
                      <div class="flex justify-end mt-1" v-if="trans_audio">
                        <!-- : Audio -->
                        <img 
                          v-if="!history.translation.active&&!history.audio.is_loading&&!history.audio.active"
                          @click="RunAudioSingle(index, 'play')"
                          src="@/assets/svg/Volume-up.svg" alt="volume" 
                          class="mr-3" 
                        />
                        <img 
                          v-if="!history.translation.active&&!history.audio.is_loading&&history.audio.active"
                          @click="RunAudioSingle(index, 'stop')"
                          src="@/assets/svg/volume-off.svg" alt="volume" 
                          class="mr-3" 
                        />
                        <DefLoader size="md" v-if="!history.translation.active&&history.audio.is_loading"></DefLoader>
                        
                        <!-- : Translation -->
                        <img
                          v-if="!history.translation.is_loading&&!history.translation.active"
                          @click="RunTranslate(index, true)" 
                          src="@/assets/svg/sign.svg" alt="sign"
                        />
                        <img
                          v-if="!history.translation.is_loading&&history.translation.active"
                          @click="RunTranslate(index, false)" 
                          src="@/assets/svg/sign-primary.svg" alt="sign"
                        />
                        <DefLoader size="md" v-if="history.translation.is_loading"></DefLoader>
                      </div>
                    </div>
                  </div>
                </div> 
                <!-- : Result, Feedback -->
                <div 
                  v-else
                  class="flex flex-col mt-5">
                  <div class="text-sm text-left">Vicky</div>
                  <div class="p-5 text-white bg-secondary rounded-md max-w-[343px] w-full mt-2">
                    <div class="flex items-start gap-5">
                      <img src="@/assets/svg/feedback.svg" alt="bulb" />
                      <div>
                        <div class="p-2 bg-[#4E5BA6] border border-gray-400 font-bold rounded w-max">
                          FEEDBACK
                        </div>
                        <div class="mt-3">Here's your Vtalk score :</div>
                        <div class="flex flex-col items-center">
                          <div class="py-5 max-w-[259px] w-full text-white bg-primary rounded-[24px] text-center mt-3 font-bold text-[56px]">
                            <!-- 67 -->
                            {{ result.score.total.toFixed(1) }}
                          </div>
                          <a :href="'/feedback/result/'+result.score.sync_id">
                            <div class="mt-3 bg-white px-3 w-max py-2 rounded-xl text-primary text-center font-semibold">
                              Learn more
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Student - You -->
              <div id="vt-student-stream" v-else-if="history.by=='student'">
                <!-- : Normal -->
                <div class="flex items-end flex-col mt-5" v-if="history.isShowActive">
                  <div class="text-sm text-left">You</div>
                  <div class="p-5 text-white bg-primary rounded-md mt-2 max-w-[92%]">
                    {{ history.msg }}
                  </div>
                </div>
                <!-- : Suggestion -->
                <div id="vt-msg-student-suggestion" v-if="history.feedback_active&&history.isShowActive">
                  <div id="vt-msg-student-runcheck" v-if="RunFeedback(history.feedback, index, history.msg)">
                    <div class="flex items-end flex-col" v-if="CheckFeedBack(history.feedback)">
                      <div class="text-white w-max mt-2">
                        <img src="@/assets/svg/check-ok.svg"/>
                      </div>
                    </div>                    
                    <div  class="flex flex-col mt-5" v-else>
                      <div class="text-sm text-left">Vicky</div>
                      <div class="p-5 text-white bg-secondary rounded-md w-[85%] mt-2">
                        <div class="flex items-start gap-5">
                          <img src="@/assets/svg/vicky-bulb-btn.svg" alt="bulb" />
                          <div>
                            <div class="p-2 bg-[#4E5BA6] border border-gray-400 font-bold rounded w-max">
                              SUGGESTION
                            </div>
                            <div class="mt-3">
                              {{history.feedback}}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div> 
              </div>
            </div>
          </div>
            
          <!-- Static : msg , loaders -->
          <div id="vt-static-holder" v-if="student_message.working||teacher_message.working">
            <!-- Loading : You -->
            <div class="flex items-end flex-col" v-if="student_message.working==true">
              <div class="text-sm text-left">You</div>
              <div class="p-5 text-white bg-primary rounded-md w-max mt-2">
                 Processing ...
              </div>
            </div>
            <!-- Loading : Vicky -->
            <div class="flex gap-5" v-if="teacher_message.working==true">
              <div class="w-[48px] h-[48px] rounded-full">
                <img
                  src="@/assets/png/vicky.png"
                  alt="vicky"
                  class="rounded-full object-cover"
                />
              </div>
              <div>
                <div>Vicky</div>
                <div
                  class="p-5 bg-[#F8F9FC] rounded-md w-full mt-2 text-secondary">
                  <div>
                    Processing ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- select either task, hint, translate -->
        <div class="p-5 lg:p-10 bg-white rounded-b-[16px] w-full">
          <div class="flex gap-5 overflow-auto pb-5">
            <div
              @click="handleChangeTab('task')"
              :class="tab === 'task' ? 'bg-secondary text-white' : 'text-primary border border-primary'"
              class="flex cursor-pointer gap-2 rounded-full font-medium px-5 py-2 justify-center min-w-[124px]">
              <img v-if="tab === 'task'" src="@/assets/svg/menu-white.svg" alt="task"/>
              <img v-else src="@/assets/svg/menu.svg"  alt="task" />
              <div>Tasks</div>
            </div>
            <div 
              @click="handleChangeTab('hints')"
              :class="tab === 'hints' ? 'bg-secondary text-white' : 'text-primary border border-primary'"
              class="flex cursor-pointer gap-2 rounded-full font-medium px-5 py-2 justify-center min-w-[124px]">
              <img v-if="tab === 'hints'" src="@/assets/svg/lightbulb-white.svg" alt="light bulb white" />
              <img v-else src="@/assets/svg/Lightbulb.svg" alt="light bulb color" />
              <div>Hints</div>
            </div>
            <div
              class="flex cursor-pointer gap-2 rounded-full font-medium px-5 py-2 justify-center min-w-[124px]"
              @click="handleChangeTab('translate')"
              :class="tab === 'translate' ? 'bg-secondary text-white' : 'text-primary border border-primary'">
              <img v-if="tab === 'translate'" src="@/assets/svg/translate-white.svg" alt="hint"/>
              <img v-else src="@/assets/svg/translate.svg" alt="task" />
              <div>Translate</div>
            </div>
          </div>

          <!-- Task -->
          <div v-if="tab === 'task'" 
            class="border p-5 rounded-md bg-[#FCFCFD] max-w-[480px] w-full grid gap-5 mt-10">
            <div>
              <img class="cursor-pointer" src="@/assets/svg/x.svg" @click="handleChangeTab('reset')" />
            </div>
            <div v-if="task.isLoading" class="text-center pb-5">
              loading please wait ...
            </div>
            <div v-else>
              <div v-if="task.data!==null">
                <div
                  v-for="(data, index) in task.data" :key="index"
                  class="flex items-center gap-2 cursor-pointer mb-3"
                  @click="handleChangeActiveTask(index)">
                  <img v-if="task.active === index" src="@/assets/svg/task-checked.svg" alt="" />
                  <img v-else src="@/assets/svg/task-uncheck.svg" alt="" />
                  <div class="text-sm">{{ data }}</div>
                </div>
              </div>
              <div @click="getTask()" class="text-center cursor-pointer pb-5" v-else>
                click to try again !
              </div>
            </div>
          </div>

          <!-- Hints -->
          <div v-if="tab === 'hints'" 
            class="grid gap-3 mt-10">
            <div>
              <img class="cursor-pointer" src="@/assets/svg/x.svg" @click="handleChangeTab('reset')" />
            </div>
            <div v-if="hint.isLoading" class="text-center pb-5">
              loading please wait ...
            </div>
            <div v-else>
              <div v-if="hint.data.new!==null">
                <div 
                  v-for="(data, index) in hint.data.new" :key="index"
                  class="border px-3 rounded-xl bg-[#FCFCFD] max-w-[480px] w-full gap-3 flex mb-3">
                  <input :value="data" readonly type="text" placeholder="Type message here" class="py-3 w-full outline-none"/>
                  <img @click="openHintModal(data)"  src="@/assets/svg/Send.svg" alt="send" />
                  <img src="@/assets/svg/sign.svg" alt="translate" />
                </div>
              </div>
              <div @click="runHints()" class="text-center cursor-pointer pb-5" v-else>
                click to try again !
              </div>
            </div>
          </div>

          <!-- Translate -->
          <div v-if="tab === 'translate'" 
            class="grid gap-3 mt-10">
            <div>
              <img class="cursor-pointer" src="@/assets/svg/x.svg" @click="handleChangeTab('reset')" />
            </div>
            <!-- : Target -->
            <div class="border px-3 rounded-xl bg-[#FCFCFD] max-w-[480px] w-full gap-3 flex">
              <img :src="translate.data.target.img" alt="soruce-flag"  />
              <input 
                v-model="translate.data.target.response.text" 
                type="text" 
                :placeholder="translate.data.target.placeholder" 
                class="py-3 flex-1 outline-none"
              />
              <img
                v-if="!translate.data.target.isLoading"
                @click="runTranslation('target','send')"
                class="cursor-pointer" 
                src="@/assets/svg/Send.svg" 
                alt="send" 
              />
              <DefLoader class="py-3" size="md" v-if="translate.data.target.isLoading" />
              <img
                v-if="!translate.data.target.audio.isLoading&&!translate.data.target.audio.working"
                @click="runTranslation('target','audio')" 
                class="cursor-pointer" 
                src="@/assets/svg/Volume-up.svg" alt="speaker-on" 
              />
              <img 
                v-if="!translate.data.target.audio.isLoading&&translate.data.target.audio.working"
                @click="runTransAudio(null,'target','stop')"
                src="@/assets/svg/volume-off.svg" alt="speaker-off" 
              />
              <DefLoader 
                class="py-3" size="md" 
                v-if="translate.data.target.audio.isLoading&&!translate.data.target.audio.working">
              </DefLoader>
            </div>
            <!-- : Source -->
            <div class="border px-3 rounded-xl bg-[#FCFCFD] max-w-[480px] w-full gap-3 flex">
              <img :src="translate.data.source.img" alt="target-flat"  />
              <input 
                v-model="translate.data.source.response.text" 
                type="text" 
                :placeholder="translate.data.source.placeholder" 
                class="py-3 w-full outline-none"
              />
              <img
                v-if="!translate.data.source.isLoading"
                @click="runTranslation('source','send')"
                class="cursor-pointer" 
                src="@/assets/svg/Send.svg" 
                alt="send" 
              />
              <DefLoader class="py-3" size="md" v-if="translate.data.source.isLoading" />
              <img
                v-if="!translate.data.source.audio.isLoading&&!translate.data.source.audio.working"
                @click="runTranslation('source','audio')" 
                class="cursor-pointer" 
                src="@/assets/svg/Volume-up.svg" alt="speaker-on" 
              />
              <img 
                v-if="!translate.data.source.audio.isLoading&&translate.data.source.audio.working"
                @click="runTransAudio(null,'source','stop')"
                src="@/assets/svg/volume-off.svg" alt="speaker-off"  
              />
              <DefLoader 
                class="py-3" size="md" 
                v-if="translate.data.source.audio.isLoading&&!translate.data.source.audio.working">
              </DefLoader>
            </div>
          </div>

          <!-- Input field -->
          <div
            @click="handleChangeTab('reset')"
            :class="(this.progress.end)? 'blur-lg' : ''" 
            class="flex gap-2 border items-center px-3 rounded-xl py-3 mt-10">
            <input v-model="type_message" type="text" placeholder="Type message here" class="pl-2 py-3 flex-1 outline-none"/>
            <img
              @click="ManualMessageSend(type_message)" 
              class="cursor-pointer" 
              src="@/assets/svg/Send.svg" alt="send" 
            />
            <img 
              @click="stopRecordRTC()" v-if="audio_control.recording==true"
              class="animate-pulse cursor-pointer" 
              src="@/assets/svg/audio-stop.svg" 
              alt="record" 
            />
            <img
              @click="startRecordRTC()" v-else 
              class="cursor-pointer" 
              src="@/assets/svg/audio-btn.svg" 
              alt="record" 
            />
          </div>
        </div>
      </div>
    </div>
    <Modal :isOpen="isOpen" :closeModal="closeModal">
      <Settings 
        @toggle-settings="closeSettings" 
        @saved-settings="settingsUpdate"
        @saved-settings-source="settingsUpdate(true)">
      </Settings>
    </Modal>
    <Modal title="Hint" :isOpen="hint.modal.isOpen" :closeModal="closeHintModal">
      <Hints
        :target="target_lang"
        :source="lang"
        :voices="voices" 
        :hint="hint.modal.text"
        @close-hint="closeHints"
        @send-hint="sendHint">
      </Hints>
    </Modal>
  </div>
</template>
