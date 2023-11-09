<template>
    <div>
        <div class="w-full pb-[35%]  relative ">
            <img class="w-full h-full absolute " src="https://s.alicdn.com/@sc04/kf/H42e58f0f46ad4b64a3c1f8ea51c5a982Q.jpg_720x720q50.jpg"  alt="">
        </div>
        <div class="bg-white py-10 px-32 text-primary-300">
            <div class="flex space-x-8">
                <Back class="w-10 h-10 " style="fill:#5F5F5F"/>
                <h1 class="poppins text-3xl font-[500]">Silvia EVSE Satation</h1>
            </div>
            <div class="mt-2 text-2xl font-[200]">
              <h1> Open - 9:00 AM To 12:00 AM</h1>
            </div>
            <div class="mt-8 border-s-2 border-primary-300 p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend consectetur lacus in lacinia. Nam in dapibus arcu. Fusce finibus ex sed lorem fringilla, id tristique dui ornare. Vivamus massa arcu, hendrerit ut gravida ac, consectetur a metus. Sed aliquet, lorem sit amet dignissim lacinia, urna nisl fringilla lorem, at feugiat felis mi nec metus. Sed id nunc massa. Duis auctor, ligula at fringilla fringilla, est odio ornare neque, nec tincidunt ipsum mi at libero. Sed eu lorem sit amet tellus rutrum feugiat. Proin varius leo ac erat molestie, vitae blandit lectus suscipit. Nullam lacinia laoreet nulla, non aliquet dolor lacinia nec. 
            </div>
            <div class="mt-8 flex space-x-12">
                <Phone style="fill:#5F5F5F"/>
                <h1>09882937297</h1>
            </div>
            <div class="mt-8 flex space-x-12">
                <Address style="fill:#5F5F5F"/>
                <h1>Yangon</h1>
            </div>
            <div class="mt-8 w-full">
                <iframe  height="450" class="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d445808.6153936199!2d95.8497243010807!3d16.839710243949085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x56fbd271f8080bb4!2sYangon!5e0!3m2!1sen!2smm!4v1699540930628!5m2!1sen!2smm"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {Back,Phone,Address } from 'evse@/services/getEvseSvg'
</script>
