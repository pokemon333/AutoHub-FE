<template>
    <!-- Dealer Car list section -->
    <div class="pt-2">
        <!-- Car for sales  wrapper-->
        <div class="px-3 pt-3 pb-2 flex justify-between items-center ">
            <h1 class="md:text-3xl text-2xl">Car For Sales</h1>
            <button class="bg-secondary-500 md:py-2 py-1 px-2 text-white rounded-md ">
                Sell My Car
            </button>
        </div>

        <!-- search wrapper -->
        <div class="px-3 py-2 flex justify-between space-x-2 items-center">
            <input 
                class="border border-gray-300 px-2  w-10/12  rounded-md h-12" 
                type="text"
                v-model="filterText"
                @keyup="overallSearch()"
                placeholder="Overall Search"
            >
            <div
                class="flex cursor-pointer justify-center   border-red-800  w-12 h-12  border  rounded-md items-center "
            >
                <advanceFilter :class="false ? 'fill-gray-100' : 'fill-secondary-700'" />
            </div>
        </div>

        <!-- Car list parts -->
        <div class="px-3 py-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-3 grid-cols-1 ">
            <CarCard 
                @car-detail="detail(car.id)"
                v-for="car in cars" 
                :car="car" 
                :key="car.id"
            />
        </div>


    </div>
</template>

<script setup>

    import { ref }              from 'vue'
    import { advanceFilter }    from 'car@/core/services/getCarCardSvg';
    import   CarCard            from 'dealer@/core/components/CarCard.vue';
    import { onMounted }        from 'vue'
    import { useUserStore  }    from '@/app/core/store/UserStore';
    import   apiService         from '@/app/core/services/apiService';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const userStore = useUserStore();

    const originalData = ref([]);

    const cars = ref([]);

    const filterText  = ref('');

    let detail = (id) => {
        return router.push({ name: "car-detail", params: { id: id } })
    }

    const getDealerCar = () => {
        apiService.get(`dealer/cars/${userStore.user.dealer_id}`).then(res => {
           cars.value = res.data.data
           originalData.value = res.data.data
        })
    }

    const overallSearch = () => {
      let filteredCars = originalData.value.filter((car)=>{
                    let trim_name = car.trim_name ? car.trim_name : ''
                    let nameString = car.car_model.car_brand.name +' '+ car.car_model.name +' '+  car.product_year.name +' '+ trim_name;
                    const regex = new RegExp(filterText.value.toLowerCase(), 'i');
                    if (regex.test(nameString.toLowerCase())) {
                        return car;
                    };
                })
        if(filterText.value == '') {
            cars.value = originalData.value
        }else{
            cars.value = filteredCars
        }
    }

    onMounted(() => {
        getDealerCar();
    })
</script>