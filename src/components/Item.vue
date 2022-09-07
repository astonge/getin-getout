<template>
    <div class="flex">
        <button @click="toggle" class="btn btn-lg btn-block flex-grow w-1/3 shadow-sm text-center hover:bg-green-600" 
            :class="props.item.got ? 'bg-gray-900' : 'bg-green-700 text-black'">
            <div>
                <h2 class="font-bold" :class="edit ? 'text-md' : 'text-2xl'">{{ props.item.name }}</h2>
                <small v-if="!edit" class="text-md">{{ props.item.dept }}</small>
            </div>
        </button>
        <button v-if="edit" class="btn btn-lg btn-primary flex-none ml-1" type="button">  
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
        </button>
        
        <button v-if="edit" class="btn btn-lg bg-red-600 text-white flex-none ml-1" type="button" @click="remove(props.item)">  
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
            
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        default: () => ([]),
    },
    edit: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(['toggle', 'remove'])
let isToggled = ref(false)

const toggle = () => {
    isToggled.value = !isToggled.value
    emit('toggle', isToggled.value)
}

const remove = (item) => {
    emit('remove', item)
}
</script>