<template>
    <Button
        v-if="active"
        @click="handleProviderRedirects()"
        variant="outline"
        class="py-4 mt-5 flex justify-center font-bold items-center gap-2">
        Continue with {{ provider }}
    </Button>
</template>
<script>
import GeneralService from "@/service/GeneralService.js";
import Button from "@/components/Button.vue";


export default {
    data(){
        return{
            active : false
        }
    },
    props : {
        provider : {
            type : String,
            default : 'google'
        }
    },

    components : { Button },

    methods : {
        handleProviderRedirects()
        {
            const baseUrl = () => {
                const url = GeneralService.GetApiEndpoint()+'/auth/provider/login/'+this.provider+'/client/'+GeneralService.GetClientId();

                return url;
            }

            if(this.provider=='google')
            {
                window.location.replace(baseUrl());
            }
        }
    }
}
</script>