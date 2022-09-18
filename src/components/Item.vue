<template>
    <div class="flex">
        <div v-if="item.editing" class="flex w-full">
            <input v-model="item.name" type="text" class="p-3 m-1 rounded rounded-lg text-black mr-1 w-1/2" placeholder="Item name"/>
            <select v-model="item.dept" class="select mt-2 p-3 select bg-white text-black w-1/2">
                <option disabled selected>Select Department</option>
                <option v-for="dept in props.depts" :key="dept">
                    {{ dept }}
                </option>
            </select>
        </div>
        <button v-else @click="toggle" class="btn btn-lg btn-block flex-grow w-1/3 shadow-sm text-center hover:bg-green-600" 
            :class="props.item.got ? 'bg-gray-900' : 'bg-green-700 text-black'">
            <div>
                <h2 class="font-bold" :class="edit ? 'text-md' : 'text-2xl'">{{ props.item.name }}</h2>
                <small v-if="!edit" class="text-md">{{ props.item.dept }}</small>
            </div>
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
    depts: {
        type: Object,
        default: () => ([])
    },
    edit: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(['toggle'])
let isToggled = ref(false)


const toggle = () => {
    isToggled.value = !isToggled.value
    emit('toggle', isToggled.value)
}

</script>