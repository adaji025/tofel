/**
 * @author : Valingo | Ibrahim Isa, Mukhtar
 * @description : Auth Service
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import ChooseLanguage from "@/views/exam/ChooseLanguage.vue";
import ChooseCategory from "@/views/exam/ChooseCategory.vue";
import Transition from "@/views/exam/Transition.vue";
import Chat from "@/views/exam/Chat.vue";
import Login from "@/views/auth/Login.vue";
import Guest from "@/views/auth/Guest.vue";
import Register from "@/views/auth/Register.vue";
import Faq from "@/views/faq/Faq.vue";
import ContactUs from "@/views/contact/ContactUs.vue";
import AboutUs from "@/views/about/AboutUs.vue";
import Privacy from "@/views/landing/Privacy.vue";
import Feature from "@/views/feature/Feature.vue";
import Auth from  "@/service/AuthService.js";
import FeedbackResult from "@/views/account/ViewResult.vue";
import NotAuthorized from "@/views/auth/NotAuthorized.vue";

/**
 *  Templates Imports
 *  @description : to be deprecated after code cleaning
 */
import TempFeedbackResult from "@/views/template/ResultsTemp.vue";
import Learn from "../views/template/Learn.vue";
import Dashboard from "../views/template/Dashboard.vue";
import Transistion from "../views/template/Transistion.vue";
import TransistionTwo from "../views/template/TransistionTwo.vue";
import TransistionThree from "../views/template/TransistionThree.vue";
import StepOne from "../views/template/Exam/StepOne.vue";
import StepTwo from "../views/template/Exam/StepTwo.vue";
import StepThree from "../views/template/Exam/StepThree.vue";
import StepFour from "../views/template/Exam/StepFour.vue";
import Success from "../views/template/Success.vue";





const routes = [
  /**
   * Landing 
   * @description : consists of the home, about us, Features, Pricing & Contact us
   */
  { path: "/", name : 'Home' ,component: Home },
  { path: "/faq", name : 'Faq', component: Faq },
  { path: "/contact-us", name : 'ContactUs', component: ContactUs },
  { path: "/about-us", name : 'AboutUs', component: AboutUs },
  { path: "/privacy", name : 'Privacy', component: Privacy },
  { path: "/features", name : 'Feature', component: Feature },

  /**
   * Registration, Login & Guest
   * @description : auth 
   */
  { path: "/auth/login/:init", name : 'Login', component: Login },
  { path: "/auth/register", name : 'Register', component: Register },
  { path: '/auth/guest/access/:key/data/:secret', name : 'Guest', component : Guest},
  { path: '/auth/not-authorized', name : 'NotAuthorized', component : NotAuthorized },

  /**
   * Dashboard & Acounts
   * @description : result history, profile, upgrade plan & others 
   */
  { path: "/try", name : 'Dashboard' , component: Dashboard },
  { path: "/choose-language", name : 'ChooseLanguage' ,component: ChooseLanguage },
  { path: "/choose-category", name : 'ChooseCategory' ,component: ChooseCategory },
  { path: "/transition", name : 'Transition' , component: Transition },
  { path: "/chat", name : 'Chat' ,component: Chat },
  { path: "/feedback/result/:id", name : 'FeedbackResult', component: FeedbackResult },

  /**
   * Templating
   * @description : For development purposes
   */
  { path: "/temp/feedback/results", name: "TempFeedbackResult", component: TempFeedbackResult},
  { path: "/temp/learn", name: "TempLearn", component: Learn},
  { path: "/temp/guest", name: "TempDashboard", component: Dashboard},
  { path: "/temp/transition", name: "TempTransitionLearn", component: Transistion},
  { path: "/temp/transition-2", name: "TempTransistionTwo", component: TransistionTwo},
  { path: "/temp/transition-3", name: "TransistionThree", component: TransistionThree},
  { path: "/temp/exam-1", name: "StepOne", component: StepOne},
  { path: "/temp/exam-2", name: "StepTwo", component: StepTwo},
  { path: "/temp/exam-3", name: "StepThree", component: StepThree},
  { path: "/temp/exam-4", name: "StepFour", component: StepFour},
  { path: "/temp/exam/success", name: "Success", component: Success},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if(Auth.GetAuthAccess())
{
    router.beforeEach((to,from)=>{
      const canAccess = Auth.canUserAccess(to.name);
    
      if(canAccess=='back-to-login' || canAccess=='redirect-home')
      { 
        return '/';
      }
      else if(canAccess=='not-authorized')
      {
        return '/auth/not-authorized';
      }
    });  
}

export default router;
