import store from "@/store";
import GeneralService from "@/service/GeneralService.js";

const Build = { 
  debug : false,
  current : '0.0.1' 
};

export default 
{
    canUserAccess(routeName)
    { 
      const userIsLoggedIn = this.CheckUserLoggedIn();
      const exception = (this.CheckException(routeName))? false : true;
      var data = 'access-granted';
  
      if(!exception&&!userIsLoggedIn) 
      {
        data = 'back-to-login';
      }
      else
      {
          if(userIsLoggedIn)
          {
            if(this.CheckRedirect(routeName))
            {
                data = 'redirect-home';
            }
            else 
            {
                const userClass = store.getters.GetUser.primary_role;
                
                if(userClass=='user'||userClass=='staff')
                {
                  var access = this.userPermissions(userClass,routeName);
        
                  if(access==false)
                  {
                    data = 'not-authorized';
                  }
                }
            }
          }
      }

      console.log(data);
  
      return data;
    },

    CheckUserLoggedIn()
    {
      let check = this.beforeRouteEnter(store.getters.IsLoggedIn);
      let access = (check)? true : false;

      return access;
    },

    GetUserToken()
    { 
      return store.getters.IsLoggedIn;
    },

    GetUserLoggedIn()
    {
      return store.getters.GetUser;
    },
    
    GetBuild()
    {
      return (store.getters?.GetBuild!==undefined)? store.getters.GetBuild : null;
    },

    CheckException(route)
    {
       let exception = [
          'Login',
          'Home',
          'Register',
          'Guest',
          'Faq',
          'AboutUs',
          'ContactUs',
          'Privacy',
          'ForgetPasswordConfirm',
          'ForgetPasswordReset'];
       let grant = true;

       for(var i = 0; i<exception.length; i++)
       {
          if(route==exception[i])
          {
            grant = false;
          }
       }

       return grant;
    },

    CheckRedirect(route)
    {
      let redirect = ['Login','Register','Guest','ForgetPasswordRequest', 'ForgetPasswordConfirm', 'ForgetPasswordReset'];
      let grant = false;

      for(var i = 0; i<redirect.length; i++)
      {
        if(route==redirect[i])
        {
          grant = true;
        }
      }

      return grant;
    },
  
    userPermissions(user,route) 
    {
        var permissions = ['Home'];
        var access = false;
  
        switch(user)
        {
          case  'user' : case 'staff' :
            permissions.push(
                "Try", 
                "ChooseLanguage", 
                "ChooseCategory", 
                "Transition", 
                "Chat", 
                "FeedbackResult", 
                "TempFeedbackResult",
                "TempLearn",
                "TempSelectCEFR", 
                "TempDashboard", 
                "TempTransitionLearn", 
                "TempTransistionTwo", 
                "TempLesson",
                "TempFreeLesson");
          break;
        }
  
        for(var i=0; i<permissions.length; i++)
        {
          if(permissions[i]==route)
          {
              access = true;
          }
        }
  
        return access;
    },

    UserSettings()
    {
       let system_overide = (import.meta.env.VITE_VTALK_OVERIDE_SETTINGS=='true')? true : false;

       /**
        * Debugger
        * 
        * @description : check if overide is  
        */
       GeneralService.debug(Build.debug, {
          msg : 'check system overide status ', 
          obj : system_overide
       });

       let response = {
          user : this.CheckUserLoggedIn(),
          status : false,
          system : {
            overide : false
          },
          issue  : {
            trigger : false,
            info : null
          },
          settings : {
            guest : { active : false, instruct : null },
            user : null,
            client : {
              advert : {
                active : false, 
                instruct : null
              },
              ielts : {
                active : false, 
                instruct : null
              },
            }
          } 
        };
       
        /**
         * Access keys
         * 
         * @description : N/A 
         */
        let access = [
          'guest-system-access',
          'client-result-advert',
          'client-ielts-only'
        ];

       response.system.overide = system_overide;

       if(this.GetUserLoggedIn())
       {
          let settings = [];
          let client_settings = [];
          let clear_cache = false;

          /**
           * Run critical system check 
           */
          if(this.GetUserLoggedIn()?.settings!==undefined){ 
            settings = this.GetUserLoggedIn().settings;
          }else{
            clear_cache = true;
          }

          if(this.GetUserLoggedIn()?.client_settings!==undefined){
            client_settings =  this.GetUserLoggedIn().client_settings;
          }else{
            clear_cache = true;
          }

          if(clear_cache)
          {
            response.issue.trigger = true;
            response.issue.info   = 'Clear system storage activated';
          }

          if(!system_overide)
          {
            for(var i = 0; i<access.length; i++)
            {
              /**
               * User Settings Setup 
               */
              for(var j=0; j<settings.length; j++)
              {
                if(access[i]==settings[j].type)
                {
                    response.status = true;

                    /**
                     * @settings : / guest-system-access
                     * @sesc : This allows guest users access some authenicated routes
                     */
                    if(access[i]=='guest-system-access')
                    {
                      response.settings.guest.active = true;
                      response.settings.guest.instruct = settings[i].data;
                    }
                }
              }

              /**
               * @owner : client
               * @desc  : Client Settings Setups 
               */
              for(var k=0; k<client_settings.length; k++)
              {
                if(access[i]==client_settings[k].type)
                {
                  response.status = true;

                  /**
                    * @setting : / client-result-advert
                    * @desc : Client able to display advert
                    */
                  if(access[i]=='client-result-advert')
                  {
                      response.settings.client.advert.active = true;
                      response.settings.client.advert.instruct = client_settings[k].data
                  }

                  /**
                    * @setting : / client-ielts-only
                    * @desc : Client access only ielts
                    */
                  if(access[i]=='client-ielts-only')
                  {
                      response.settings.client.ielts.active = true;
                      response.settings.client.ielts.instruct = client_settings[k].data
                  }
                }
              }

            }
          }
       }

       GeneralService.debug(Build.debug, {
          msg : 'Check user settings :', 
          obj : response
       });

       return response;
    },
  
    beforeRouteEnter (token) 
    {
        if(token!==undefined&&token!=='') 
        {
          return true;
        } 
  
        return false;
    },

    BuildManager()
    {
      let response = {
        current : Build.current,
        status : false,
        settings : {
          build : { status : false, data : null }
        }
      };

      let build = this.GetBuild();

      if(build!==null)
      {
         response.status = true;

         if(build?.number!==undefined)
         {
            response.settings.build.data = build;
            response.settings.build.status = true;
         }
      }

      return response;
    },

    BuildCacheUpdate(status = false)
    {
        if(status)
        {
            let build_info = {
               number : Build.current,
               instruct : null,
               success : true
            }

            store.dispatch('RunBuild', build_info);
        }
    },

    GetAuthAccess()
    {
      let env = import.meta.env.VITE_VTALK_OVERIDE_AUTH;
  
      return (env=='true') ? false : true;
    }
}