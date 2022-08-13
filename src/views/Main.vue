<template>
    <div class="navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
        <label tabindex="0" class="btn btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-600 rounded-box w-52">
            <li><button type="button">Settings</button></li>
            <li><button type="button" @click="logout">Logout</button></li>
        </ul>
        </div>
    </div>
    <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl">Get in and Get Out</a>
    </div>
    <div class="navbar-end">
        <button class="btn btn-circle" @click="editMode"
        :class="edit ? 'bg-red-600' : 'bg-gray-600'">
        <div v-if="!edit" class="indicator">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
            </svg>
        </div>
        <div v-else class="indicator">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
        </div>
        </button>
    </div>
    </div>

    <div class="flex flex-col w-full">
        <div class="p-1 m-1" v-for="(groceryItem, index) in need()" :key="index">
            <ItemCard :item="groceryItem" @toggle="groceryItem.got = !groceryItem.got" :edit="edit" @remove="remove(index)"/>
        </div>
        <div v-if="need().length === 0">
            <div>
                <button class="btn btn-block btn-disabled bg-base-100 no-animate text-left">
                    Got 'em all.. get outta here!
                </button>
            </div>
        </div>
        <div class="divider"></div> 
        <div class="p-1 m-1" v-for="(groceryItem, index) in have()" :key="index">
            <ItemCard :item="groceryItem" @toggle="groceryItem.got = !groceryItem.got" :edit="edit" @remove="remove(index)"/>
        </div>
        <div v-if="have().length === 0">
            <div>
                <button class="btn btn-block btn-disabled bg-base-100 no-animate text-left">
                    One thing at a time, lets go!
                </button>
            </div>
        </div>
    </div>

    <div class="btm-nav p-2">
        <label for="my-modal-4" class="btn modal-button">
           <span class="text-4xl">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
            </svg>
           </span>
        </label>
    </div>

    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box bg-gray-700 relative" for="">
        <div class="grid gap-2">
            <input v-model="itemName" type="text" class="p-2 rounded" placeholder="Item name"/>
            <select v-model="itemCategory" class="select bg-white text-black w-full mt-4">
                <option disabled selected>Select Department</option>
                <option v-for="option in depts" :key="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="modal-action">
            <label for="my-modal-4" class="btn" @click="addItem">Add!</label>
        </div>
    </label>
    </label>
</template>

<script setup lang="ts">
    import ItemCard from '../components/Item.vue'
    import { useRouter } from 'vue-router' // import router
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import { ref, reactive } from 'vue'

    const router = useRouter()

    let groceryList = reactive([])

    let depts = reactive([
        'Bakery',
        'Deli',
        'Meat',
        'Produce',
        'Dairy',
        'Frozen',
        'Soft Drink / Chips',
        'Pasta / Sauce',
    ])

    let edit = ref(false)
    const itemName = ref("")
    const itemCategory = ref("")

    const logout = () => {
        firebase.auth().signOut()
        router.replace('/')
    }

    const need = () => {
        return groceryList.filter(need => need.got === false)
    }
    const have = () => {
        return groceryList.filter(have => have.got === true)
    }
    const addItem = () => {
        groceryList.push({
            name: itemName.value,
            dept: itemCategory.value,
            got: false
        })
        itemName.value = ""
        itemCategory.value = ""
    }

    const editMode = () => {
        edit.value = !edit.value
    }

    const remove = (index) => {
        groceryList.splice(index, 1)

        if (groceryList.length === 0)
            edit.value = false
    }
</script>