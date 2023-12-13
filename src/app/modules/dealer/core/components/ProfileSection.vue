<template>
    <div class="lg:grid-cols-2 lg:px-20 pb-6  grid   gird-rows-6  px-2 shadow-lg border-b-2  ">
        <div class=" mt-3 flex items-center col-span-full row-span-1">
            <h1 class="lg:text-5xl lg:ms-0 md:ms-20 text-4xl my-auto">Profile</h1>
        </div>
        <div class="lg:mb-0 flex  justify-center mb-5  row-span-5">
            <img class="lg:mt-10 md:mt-2 mt-6 rounded-full   w-[300px] h-[300px] " :src="PorfileImg" alt="profile-img">
        </div>
        <div class="lg:px-20 md:px-24 flex  flex-col  space-y-5  row-span-5  px-3">
            <div class="relative w-full lg:mt-12">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2  bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400  shadow-sm ':''"
                >
                    Name
                </label>
                <input type="text" 
                    v-model="user.name" 
                    class="w-full h-12 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 rounded-md px-3 bg-white border caret-blue-500"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm   shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your name"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2  bg-white text-xs "
                    :class="mode == 'edit' ? 'text-blue-400 shadow-sm ':''"
                >
                    Email
                </label>
                <input 
                    type="text" 
                    v-model="user.email" 
                    class="w-full h-12 rounded-md px-3 bg-white border  focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your email"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2  bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400 shadow-sm ':''"
                >
                    Phone
                </label>
                <input 
                    type="text" 
                    v-model="user.phone_number" 
                    class="w-full h-12 rounded-md px-3 bg-white border   focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2"
                    :class="mode == 'edit' ? 'border-blue-300 shadow-sm shadow-blue-200':'border-gray-500'"
                    placeholder="Enter your phone"
                    :disabled="mode == 'profile'"
                >
            </div>
            <div class="relative w-full">
                <label 
                    for="type" 
                    class="absolute -top-2 left-3 px-2  bg-white text-xs"
                    :class="mode == 'edit' ? 'text-blue-400 shadow-sm ':''"
                >
                    Address
                </label>
                <textarea id="message" 
                    rows="4" 
                    v-model="user.address"
                    class="block   p-2.5 w-full border  focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 text-sm text-gray-900 bg-gray-50 rounded-lg   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

    function cancel(){
        mode.value = 'profile'
        user.value = {...userStore.user}
    }

</script>

  