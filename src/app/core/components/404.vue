<template>
   <div class="h-screen w-screen flex flex-col justify-center items-center">
        <h1 class="bold lg:text-6xl text-3xl">404 Not Found ! </h1>
        <button class="bg-secondary-500 p-2 rounded-md text-white mt-2" @click="this.$router.push({name: 'landing'})">Go Home</button>
   </div>
</template>