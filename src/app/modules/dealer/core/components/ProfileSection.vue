<template>
    <div class="lg:grid-cols-2 lg:px-20 pb-6  grid   gird-rows-6  px-2  ">
        <div class=" mt-3 flex items-center justify-between col-span-full row-span-1">
            <h1 class="lg:text-5xl lg:ms-0 md:ms-20 text-4xl ">Profile</h1>
            <button @click="goToMySaleCar" class="lg:me-0 md:me-20 border border-red-500 bg-primary-500 flex  px-2 py-1 rounded-md text-white">
                <carIcon 
                    class="w-6 h-6 md:me-2 fill-white"
                />
                <h1 class="md:block hidden">
                    My Sale Car
                </h1>
            </button>
        </div>
        <div class="lg:mb-0 flex  justify-center mb-5  row-span-5">
            <img class="lg:mt-10 md:mt-2 mt-6 rounded-full   w-[300px] h-[300px] " :src="PorfileImg" alt="profile-img">
        </div>
        <div class="lg:px-20 md:px-24 flex  flex-col  space-y-5  row-span-5  px-3">
            <div class="relative w-full lg:mt-12">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2 z-10  bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400   ':''"
                >
                    Name
                </label>
                <input type="text" 
                    v-model="user.name" 
                    class="w-full h-12 z-0  focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 rounded-md px-3 bg-white border caret-blue-500"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm   shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your name"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2  z-10 bg-white text-xs "
                    :class="mode == 'edit' ? 'text-blue-400  ':''"
                >
                    Email
                </label>
                <input 
                    type="text" 
                    v-model="user.email" 
                    class="w-full h-12 z-0 rounded-md px-3 bg-white border  focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your email"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2 z-10  bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400  ':''"
                >
                    Phone
                </label>
                <input 
                    type="text" 
                    v-model="user.phone_number" 
                    class="w-full h-12 z-0 rounded-md px-3 bg-white border   focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your phone"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2 z-10   bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400  ':''"
                >
                    Address
                </label>
                <textarea id="message" 
                    rows="4" 
                    v-model="user.address"
                    class="block   p-2.5 w-full border  focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 text-sm text-gray-900  rounded-lg"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your address"
                    :disabled="mode == 'profile'"
                >
                </textarea>
            </div>
            <div class="flex justify-start items-center w-full space-x-5">
                <CustomButton
                    v-if="mode === 'profile' "
                    @click="mode = 'edit'"
                    text="Edit Profile"
                />
                <CustomButton
                    v-if="mode === 'edit'"
                    :text="!loading ? 'Save' : 'Saving...'"
                    :isLoading="loading"
                    :class="!loading? 'w-1/4' : 'w-4/12'"
                    @click="submit()"
                />
                <button 
                    v-if="mode === 'edit' && !loading"
                    @click="cancel()"
                    class="rounded-md text-center w-1/4 p-2 border border-primary-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

    import PorfileImg from 'asset@/img/profile.png'
    import {useUserStore} from 'core@/store/UserStore'
    import {computed ,ref } from 'vue'
    import CustomButton from 'dealer@/core/components/Button.vue'
    import usedealerController from 'dealer@/core/api/dealerController'
    import carIcon from 'asset@/icon/car.svg'
    import { useRouter } from 'vue-router'

    const router = useRouter()
   
    const userStore = useUserStore()
    const user = ref({...userStore.user})
    let mode = ref('profile')
    let loading = ref(false)
    let dealerController = usedealerController()

    function submit(){
        loading.value = true
        let condition = dealerController.editProfile(user.value)
        if(condition){
            mode.value = 'profile'
            loading.value = false
        }
    }

    function goToMySaleCar(){
        router.push({name:'car-for-sale'})
    }

    function cancel(){
        mode.value = 'profile'
        user.value = {...userStore.user}
    }

</script>

  