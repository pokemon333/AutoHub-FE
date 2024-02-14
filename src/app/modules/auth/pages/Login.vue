<template>
    <div class="w-screen flex  max-lg:flex-col h-screen ">
        <div class="lg:w-5/12 flex flex-col items-center lg:order-1  order-2 lg:items-end ">
            <div class="h-1/4 lg:w-10/12   md:w-1/2 w-full lg:px-0 max-md:max-w-md px-2 flex items-center">
               <img @click="back" :src="logo" class="w-48 cursor-pointer">
            </div>
            <div class="h-3/4 lg:w-10/12 lg:px-0  md:w-1/2 w-full  px-3 ">
                <div>
                    <h1 class="lg:text-6xl lg:mt-0 text-4xl mt-2 text-secondary-500">WELCOME !</h1>
                    <h3 class="lg:text-2xl lg:mt-3 lg:ml-2">to AUTO HUB</h3>
                </div>
                <div class="mt-11 lg:w-4/6 w-full ">
                    <div class="relative  mb-6">
                        <label 
                            for="type" 
                            class="absolute -top-2 left-3 px-2 bg-white  text-xs"
                            :class="errors.name ? 'text-secondary-500' : ''" 
                        >
                            Name
                        </label>
                        <input 
                            v-model="data.name" 
                            type="text"   
                            class="w-full h-12 rounded-md px-3  border "  
                            placeholder="Enter Name"
                             :class="errors.name ? 'border-secondary-500' : 'border-gray-500'" 
                        >
                        <span v-if="errors.name" class="text-secondary-500 text-sm mt-1">{{ errors.name[0] }}</span>
                    </div>
                    
                    <div class="relative ">
                        <label 
                            for="type" 
                            class="absolute -top-2 left-3 px-2  bg-white  text-xs"
                            :class="errors.password ? 'text-secondary-500' : ''" 
                        >
                            Password
                        </label>
                        <input 
                            v-model="data.password" 
                            @keyup.enter="submit" 
                            type="password"  
                            class="w-full h-12 rounded-md px-3  border border-gray-500"  
                            placeholder="Enter Password"
                            :class="errors.password ? 'border-secondary-500' : 'border-gray-500'" 
                        >
                        <span v-if="errors.password" class="text-secondary-500 text-sm mt-1">{{ errors.password[0] }}</span>
                    </div>
                    <div class=" mt-3  flex justify-center text-gray-500">
                        <a  class="underline cursor-pointer hover:text-gray-800">Forget Password</a>
                    </div>
                    <div class=" mt-3  flex justify-center pb-3">
                        <button @click="submit"  class="w-2/4 h-12 rounded-md bg-red-600 text-white">Login</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:w-7/12 lg:order-2 order-1">
            <img class="lg:cutEdgeImage  md:object-cover object-fit  w-full h-full"  :src="bgImage" alt="" >
        </div>
    </div>
</template>


<script setup>

import logo from 'asset@/img/logo-login.png'
import bgImage from 'asset@/img/login-bg-img.png'
import useAuthController from 'auth@/api/authController.ts'
import { ref } from 'vue'
import tokenService from 'core@/services/tokenService'
import { useUserStore  } from '@/app/core/store/UserStore';
import { useRouter } from 'vue-router';



let errors = ref({})

let data =  ref({
    name : '',
    password : ''
})

let router = useRouter();
let userStore = useUserStore()
let { setToken   } = tokenService
let { login , getUser  }  = useAuthController()

let submit = async () => {
    try {
        let res = await login(data.value)
        if(res.data.success){
            let { token , user  } = await res?.data.data
            setToken(token)
            userStore.setToken(token);
            userStore.setUser(user)
            userStore.changeLoginStatus(true)
            router.push({name:"landing"})
        }
    } catch (error) {
        // console.log(error)
        if (error.response.data.errors) {
            errors.value = error.response.data.errors
            console.log(errors.value);
        }
    }
}

function back() {
    router.back()
}



</script>