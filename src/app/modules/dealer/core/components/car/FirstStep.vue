<template>
        <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
            <Select
                class="md:col-span-1 col-span-2"
                title="Brand"
                v-model="brand_id"
                @change="handleBrandChange"
                :options="option"
            >
                <template v-slot:option>
                    <option  value="">Select  Brands</option>
                    <option v-for="brand in firstStepResource.brands" :value="brand.id" :key="brand.id">
                        {{ brand.name }}
                    </option>
                </template>
            </Select>
            <Select
                v-model="firstStep.car_model_id"
                class="md:col-span-1 col-span-2"
                title="Model"
                :options="option"
            >
                <template v-slot:option>
                    <option  value="">Select Models</option>
                    <option :value="model.id" v-for=" model in models" :key="model.id">
                        {{ model.name }}
                    </option>
                </template>
            </Select>
            <Select
                v-model="firstStep.product_year_id"
                class="md:col-span-1 col-span-2"
                title="Product Year"
                :options="option"
            >
                <template v-slot:option>
                    <option>Somthing</option>
                </template>
            </Select>
            <Input
                v-model="firstStep.price"
                class="md:col-span-1 col-span-2"
                type="number"
                title="price"
            />
            <Input
                v-model="firstStep.trim_name"
                class="col-span-2"
                title="Trim Name"
            />
            <div class="col-span-2 relative">
                <div id="error" class="bg-red-100 border hidden text-secondary-500 border-secondary-200 p-2 w-full  mb-2 rounded-md"></div>
                <div ref="dropRef" class="dropzone custom-dropzone h-32"></div>
                <div
                class="dropzone preview-container grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4  w-[100%]   justify-around  py-4"
                ></div>
            </div>
            <button @click="()=>console.log(firstStep)">
                click
            </button>
        </div>
</template>

<script setup>

    import { useUserStore } from "@/app/core/store/UserStore";
    import { Dropzone } from "dropzone";
    import { ref, onMounted } from "vue";
    import Select from "core@/components/Select.vue";
    import Input from "core@/components/Input.vue"
    import tokenService from "@/app/core/services/tokenService.ts";

    const userStore = useUserStore();
    let dropRef = ref(null);

    let props = defineProps({
        firstStepResource : {
            type : Object,
            default : {}
        }
    })
    
    let { getToken } = tokenService;

    let firstStep = ref({
      dealer_id: userStore.getUser.dealer_id,
      car_model_id: "",
      product_year_id: "",
      price: "",
      is_soldout: false,
      trim_name: "",
      images: [],
    });

    let brand_id = ref('')
    let models = ref([])

    let handleBrandChange = () =>{
        let filteredModels = props.firstStepResource.models.filter((model)=>{
            return model.car_brand_id =  brand_id.value
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
            delete firstStep.value.images[fileName];
        });

        dropZone.on("success", (file, response) => {
          let fileName = response.name;
          firstStep.value.images[response.original_name] = fileName;
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
                <div style="display: flex; justify-content: center;">
                  <i class="bi bi-cloud-arrow-up-fill" style="font-size: 5rem;"></i>
                </div>
                <p style="text-align: center; margin: 0;"><strong>Drag and drop files to upload</strong></p>
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