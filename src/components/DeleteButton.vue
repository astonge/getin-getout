<template>
    <button class="btn btn-lg bg-red-600 text-white disabled:bg-gray-900" :disabled="edit" type="button" @click="remove(props.item)">  
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
    </button>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    
    const props = defineProps({
        item: {
            type: Object,
            default: () => ([])
        }
    })

    let edit = ref(false)

    const emit = defineEmits(['remove'])
    const remove = (item) => {
        emit('remove', props.item)
    }
</script>