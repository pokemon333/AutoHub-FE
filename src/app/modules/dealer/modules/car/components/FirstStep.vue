<template>
        <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
            <Select
                :labelClass="errors?.car_brand_id ? 'text-red-500': ''"
                :selectClass="errors?.car_brand_id? 'border border-red-500' : ''"
                class="md:col-span-1 col-span-2 text-sm"
                title="Brand"
                v-model="firstStep.car_brand_id"
                @change="handleBrandChange"
            >
                <template v-slot:option>
                    <option  value="">Select  Brands</option>
                    <option v-for="brand in firstStepResource.brands" :value="brand.id" :key="brand.id">
                        {{ brand.name }}
                    </option>
                </template>
                <template v-slot:error>
                    <span  
                      class="text-red-500 text-sm "
                      v-if="errors?.car_brand_id"
                    >
                      {{ getValidationMessage(errors?.car_brand_id) }}
                    </span>
                </template>
            </Select>
            <Select
                :labelClass="errors?.car_model_id? 'text-red-500': ''"
                :selectClass="errors?.car_model_id? 'border border-red-500' : ''"
                v-model="firstStep.car_model_id"
                class="md:col-span-1 col-span-2 text-sm"
                title="Model"
            >
                <template v-slot:option>
                    <option  value="">Select Models</option>
                    <option :value="model.id" v-for=" model in models" :key="model.id">
                        {{ model.name }}
                    </option>
                </template>
                <template v-slot:error>
                    <span  
                      class="text-red-500 text-sm "
                      v-if="errors?.car_model_id"
                    >
                      {{ getValidationMessage(errors?.car_model_id) }}
                    </span>
                </template>
            </Select>
            <Select
                :labelClass="errors?.product_year_id ? 'text-red-500': ''"
                :selectClass="errors?.product_year_id ? 'border border-red-500' : ''"
                v-model="firstStep.product_year_id"
                class="md:col-span-1 col-span-2 text-sm"
                title="Product Year"
            >
                <template v-slot:option>
                    <option  value="">Select Product Year</option>
                    <option :value="year.id" v-for="year in firstStepResource.productYear" :key="year.id">
                        {{ year.name }}
                    </option>
                </template>
                <template v-slot:error>
                    <span  
                      class="text-red-500 text-sm "
                      v-if="errors?.product_year_id"
                    >
                      {{ getValidationMessage(errors?.product_year_id) }}
                    </span>
                </template>
            </Select>
            <Input
                v-model="firstStep.price"
                class="md:col-span-1 col-span-2 "
                :labelClass="errors?.price ? 'text-red-500': ''"
                :inputClass="errors?.price ? 'border border-red-500' : ''"
                type="number"
                title="price"
            >
              <span  
                class="text-red-500 text-sm "
                v-if="errors?.price"
              >
                {{ getValidationMessage(errors?.price) }}
              </span>
            </Input>
            <Input
                v-model="firstStep.trim_name"
                class="col-span-2"
                title="Trim Name"
                placeholder="Trim Name ( optional )"
            />
            <div class="col-span-2 relative">
                <div v-if="errors?.images" class="bg-red-100 border  text-secondary-500 border-secondary-200 p-2 w-full  mb-2 rounded-md">
                    <h1 v-if="errors?.images">{{ getValidationMessage(errors?.images) }}</h1>
                </div>
                <div id="error" class="bg-red-100 border hidden text-secondary-500 border-secondary-200 p-2 w-full  mb-2 rounded-md">
                </div>
                <div 
                    ref="dropRef" 
                    class="dropzone custom-dropzone h-32 "
                    :class="errors?.images ? 'border-secondary-500' : ''"
                  ></div>
                <div
                class="dropzone preview-container grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4  w-[100%]   justify-around  py-4"
                ></div>
            </div>
            <div class="col-span-2 ">
                <div class="flex space-x-3"> 
                  <input  
                    type="checkbox"
                    v-model="firstStep.is_soldout"
                  > 
                  <h1>Is Sold Out</h1>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
          <div
            v-if="loading"
            class="bg-secondary-500 cursor-pointer  flex justify-center items-center px-2 py-1  w-20 rounded-sm text-white"
          >
            <img :src="loadingImg" width="24" height="24" class="animate-spin"> 
          </div>
          <button 
              v-if="!loading"
              @click="handleNext"
              class="bg-secondary-500 cursor-pointer  px-2 py-1  w-20 rounded-sm text-white"
          >
            Next 
          </button>
        </div>
</template>

<script setup>

    import loadingImg from 'asset@/img/loading.png'
    import { useUserStore } from "@/app/core/store/UserStore";
    import { Dropzone } from "dropzone";
    import { ref, onMounted, watch, reactive } from "vue";
    import Select from "core@/components/Select.vue";
    import Input from "core@/components/Input.vue"
    import tokenService from "@/app/core/services/tokenService.ts";
    import DealerSellMyCarController from 'dealer@/modules/car/api/dealerSellMyCarController.ts'

    const userStore = useUserStore();


    let props = defineProps({
        firstStepResource : {
            type : Object,
            default : {}
        },
        firstStepEdit : {
            type : Object,
            default : null
        }
    })

    
    let { getToken } = tokenService;
    
    let firstStep = ref({
      car_brand_id : '',
      dealer_id: userStore.getUser.dealer_id,
      car_model_id: "",
      product_year_id: "",
      price: "",
      is_soldout: false,
      trim_name: "",
      images: [],
    });
    
    let dropRef = ref(null);

    let {firstStepValidation} = DealerSellMyCarController()

    let models = ref([])
    let errors = ref(null)
    let loading =ref(false)
    
    let imageMapper = ref({})

    let emit = defineEmits([
      'handleStepChange',
      'setFirstStepState'
    ])

    let getValidationMessage = (data) =>{
      return data[0];
    }

    let handleNext = async () =>{
      loading.value = true
      try{
        errors.value = null
        let res = await firstStepValidation(firstStep.value)
      }catch(error){
        errors.value = error.response.data.errors ;
      }
      if(firstStep.value.images.length == 0 ){
        errors.value.images = ["Images is required!"]
      }
      if(
        errors.value == null &&
          firstStep.value.images.length != 0 
      ){
        emit('handleStepChange','second')
        emit('setFirstStepState', firstStep.value)
      }
      loading.value = false
    }

    let handleBrandChange = () =>{
        let filteredModels = props.firstStepResource.models.filter((model)=>{
            return model.car_brand_id ==  firstStep.value.car_brand_id
        }) 
        models.value  = filteredModels
    }

    const customPreview = `
            <div class="relative dz-preview  text-xs dz-processing dz-image-preview dz-complete w-20 h-32  rounded-md">
              <div class="dz-imag5e">
                <img data-dz-thumbnail class="rounded-md">
              </div>
              <div class="dz-details">
              <div class="dz-size mt-2"><span data-dz-size></span></div>
              <div class="dz-progress">
                <span class="dz-upload" data-dz-uploadprogress></span>
              </div>
            </div>
          `;

    watch(() => props.firstStepEdit, (newVal) => {
      let modelId = newVal.car_model_id;
      firstStep.car_model_id = modelId;
      firstStep.value.product_year_id = newVal?.product_year_id
      firstStep.value.price           = newVal?.price 
      firstStep.value.trim_name       = newVal?.trim_name ?? ''
    });

    onMounted(() => {

      if (dropRef.value !== null) {
        let dropZone = new Dropzone(dropRef.value, {
          url: import.meta.env.VITE_CAR_MEDIA ,
          method: "POST",
          acceptedFiles: ".jpg,.png,.jpeg",
          addRemoveLinks: true,
          maxFilesize: 3,
          previewTemplate: customPreview,
          previewsContainer:
            dropRef.value.parentElement.querySelector(".preview-container"),
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            size: 3,
            width: 4096,
            height: 4096,
          },
        });

        dropZone.on("removedfile", (file) => {
            let fileName = file.name;
            firstStep.value.images = firstStep.value.images.filter((image)=>{
              return image !=  imageMapper.value[fileName]
            })
            delete imageMapper.value[fileName];
        });

        dropZone.on("success", (file, response) => {
          let fileName = response.name;
          firstStep.value.images.push(fileName)
          imageMapper.value[response.original_name] = fileName;
          //ToDo : handle image mapper
        });

        dropZone.on("error", (file, response) => {
          let message;
          // Check response type
          if (typeof response === "string") {
             message = response;
          } else {
             message = response.errors.file;
          }

          dropZone.removeFile(file);

          const errorDiv = document.querySelector("#error");

          // Show error div
          errorDiv.classList.remove("hidden");

          errorDiv.innerHTML = message;

          // Hide error div after 3 seconds
          setTimeout(() => {
            errorDiv.classList.add("hidden");
          }, 5000);



        });

        if (dropRef.value.querySelector(".dz-default")) {
          dropRef.value.querySelector(".dz-default").innerHTML = `
                <p 
                    style="text-align: center; margin: 0;"
                >
                    <strong >Drag and drop images to upload</strong>
                </p>
          `;
        }
      }
    });
</script>


<style scoped>
    .custom-dropzone {
      border-style: dashed;
      border-width: 3px;
      padding: 20px;
      color: rgb(114, 114, 114);
    }
</style>

