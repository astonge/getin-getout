<template>
    <div class="flex">
        <button @click="toggle" class="btn btn-lg btn-block flex-grow w-1/3 shadow-sm text-center hover:bg-green-600" 
            :class="props.item.got ? 'bg-gray-900' : 'bg-green-700 text-black'">
            <div>
                <h2 class="font-bold text-2xl">{{ props.item.name }}</h2>
                <small class="text-md">{{ props.item.dept }}</small>
            </div>
        </button>
        <button v-if="edit" class="btn btn-lg btn-wide bg-red-600 flex-none w-32 ml-2" type="button" @click="remove(props.item)">  
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
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