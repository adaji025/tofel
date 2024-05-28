import getBlobDuration from 'get-blob-duration';
import AuthService from '@/service/AuthService.js';

export default
{
    GetAudioDuration(blob)
    {
      (async () => {
          const duration = await getBlobDuration(blob);

          return this.ConvertSecondsToMinute(duration);
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

    GetDateTime()
    {
      return new Date().toLocaleString().replace(',','');
    },

    RoundNum(value, precision) 
    {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    },

    OrdinalSuffixOf(i) 
    {
       if(i==0)
       {
          return 'Latest';
       }
       else
       {
          var max = this.results.length;
          i   = max - i;
          var j = i % 10,
              k = i % 100;
          if (j == 1 && k != 11) {
              return i + "st";
          }
          if (j == 2 && k != 12) {
              return i + "nd";
          }
          if (j == 3 && k != 13) {
              return i + "rd";
          }
          return i + "th";
       }
    },

    PlayAudioSingle(base64string)
    {
      audio.player = new Audio("data:audio/mp3;base64," + base64string);

      return audio;
    },

    ConvertBlobToBase64(blob)
    {
      if(blob!==null)
      {
          var reader = new FileReader();
          reader.readAsDataURL(blob); 
          
          reader.onloadend = function() 
          {
            var base64data = reader.result;                

            var snd = new Audio(base64data);

            return snd;
          }

          return null
      }
    },

    ValidateEmail(email) 
    {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },

    isMobile() 
    {
      const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return regex.test(navigator.userAgent);
    },

    CheckDeviceType(type='iphone')
    {
      var status = false;

      if(this.isMobile())
      {

        if(type=='iphone')
        {
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) 
          {
              status = true;
              // console.log("# [ Debugger ] : This is an iOS device.");
          } 
        }

        if(type=='andriod')
        {
          let status = false;
          let userAgent = navigator.userAgent.toLowerCase(); 
          let Android = userAgent.indexOf("android") > -1;

          if(Android) { 
            status = true;
          }
        }

      }else{
        status = true;
      }

      return status;
    },

    IsDesktop()
    {
      var status = true;

      if(this.isMobile())
      {
        status = false;
      }

      return status;
    },

    GetRandomDifferent(arr, last = undefined) 
    {
      if (arr.length === 0) {
        return null;
      } else if (arr.length === 1) {
        return arr[0];
      } else {
        let num = 0;
        do {
          num = Math.floor(Math.random() * arr.length);
        } while (arr[num] === last);
        return arr[num];
      }
    },

    Vcrypt($type, $data)
    {
        let response = null;

        switch($type)
        {
            case 'encrypt' : response = btoa($data); break;
            case 'decrypt' : response = atob($data); break;
        }

        return response;
    },

    debug(status, data)
    {
        if(status)
        {
           console.log('# [ Debugger ] - '+data.msg); 
           
           if(data.obj!==null&&data.obj!=='')
           {
            console.log(data.obj);
           }
        }
    },

    UpdateBuild(status)
    {
      return AuthService.BuildCacheUpdate(status);
    },

    GetBuild()
    {
        return AuthService.BuildManager();
    },

    GetSiteLocation()
    {
      let local = window.location;
      let currentUrl = local.origin;

      return currentUrl;
    },

    GetMinWordCount(str)
    {
      const words = str.split(/\s+/);
      
      return words.length;
    },

    GetApiEndpoint()
    {
      let env = import.meta.env.VITE_VTALK_API_ENV;
      let url = import.meta.env.VITE_VTALK_API_URL_LOCAL;

      if(env=='prod')
      {  
        url = import.meta.env.VITE_VTALK_API_URL_PROD;
      }

      return url;
    },

    GetCustomRegexArray(desc, char)
    {
      const inputString = desc;
      const regex = new RegExp(`\\[${char}\\]([^\\[\\]]*)\\[\\/${char}\\]?`, 'g');
      const matches = inputString.match(regex);
      let extractedContent = [];
    
      if (matches) {
        extractedContent = matches.map(match => match.replace(new RegExp(`\\[${char}\\]|\\[\\/${char}\\]`, 'g'), ''));
      } else {
        if (inputString !== '') {
          extractedContent.push(inputString);
        }
      }

      return extractedContent;
    },

    AxiosHeaders(type = 'completion', base = '', auth = false, multipart = false)
    {
        let param = {};
        const baseEndpoint = this.GetApiEndpoint();

        /**
         * Open API 
         * 
         * @description : gpt completion chat 
         */
        if(type=='completion')
        {
          param = {
            baseURL : 'https://api.openai.com/v1/'+base,
            headers : { 
              'Content-Type' : 'application/json', 
              'Authorization' : `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`, 
              'OpenAI-Organization' : import.meta.env.VITE_ORG_ID,
            }};
        }

        /**
         * Google API
         * 
         * @description : Text to speech 
         */
        if(type=='speech')
        {
          param = {
            baseURL : 'https://texttospeech.googleapis.com',
            headers : {'Content-Type' : 'application/json'}
          };
        }

        /**
         * Google API
         * 
         * @description : Translation 
         */
        if(type=='translation')
        {
          param = {
            baseURL : 'https://translation.googleapis.com',
            headers : {'Content-Type' : 'application/json'}
          };
        }

        /**
         * Open AI 
         * 
         * @description : Tarnsacription 
         */
        if(type=='transcription')
        {
          param = {
            baseURL: 'https://api.openai.com/v1/'+base,
            headers: { 
              'Content-Type' : 'multipart/form-data', 
              'Authorization' : `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`, 
              'OpenAI-Organization' : import.meta.env.VITE_ORG_ID
          }};
        }

        /**
         * Vtalk API 
         * 
         * @description : Backend access and requests
         */
        if(type=='remote-api')
        {
          param = {
            baseURL : baseEndpoint+'/api'+base,
            headers : { 
              'Content-Type' : 'application/json', 
          }};

          if(auth)
          {
              param.headers['Authorization'] = 'Bearer '+AuthService.GetUserToken();
          }

          if(multipart)
          {
              param.headers['Content-Type'] = 'multipart/form-data'; 
          }
        }

        return param;
    },

    guestPath()
    {
      let secret = import.meta.env.VITE_VTALK_GUEST_SECRET;
      let key = import.meta.env.VITE_VTALK_GUEST_KEY;

      let guest_path = null;

      if(secret!==undefined&&key!==undefined)
      {
          guest_path = '/auth/guest/access/'+key+'/data/'+secret;
      }

      return guest_path;
    },

    GetDebugStatus()
    {
      let env = import.meta.env.VITE_VTALK_DEBUG;

      return (env=='true')? true : false;
    },

    GetClientId()
    {
       if(import.meta.env.VITE_VTALK_API_ENV=='prod')
       {
          return import.meta.env.VITE_VTALK_CLIENT_ID_LIVE;
       }
       else
       {
          return import.meta.env.VITE_VTALK_CLIENT_ID_LOCAL;
       }
    },
}