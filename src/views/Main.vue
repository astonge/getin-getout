<template>
    <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content flex flex-col">
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" for="my-drawer-3">
                            <div class="avatar placeholder">
                                <div class="bg-neutral-focus text-neutral-content rounded-full w-16 btn btn-ghost btn-lg hover:bg-purple-600">
                                    <span class="text-xl uppercase">{{ userInitials }}</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
        
                <div class="navbar-center text-center grid flex">
                    <span v-if="addMode" class="text-xl uppercase">Add New Item</span>
                    <span v-else-if="editMode" class="text-xl uppercase">Edit Your Items</span>
                    <span v-else class="text-xl uppercase">Get in and Get Out</span>
                </div>
                <div class="navbar-end">
                    <div v-if="addMode">
                        <button class="btn btn-circle bg-red-600" @click="addMode = false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div v-else>
                        <button class="btn btn-circle" @click="toggleEditMode" :disabled="edit" :class="editMode ? 'bg-red-600' : 'bg-gray-600'">
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
            </div>

            <div v-if="addMode" class="p-4">
                <input v-model="itemName" type="text" class="p-3 rounded rounded-lg text-black w-full" placeholder="Item name"/>
                <select v-model="itemCategory" class="select bg-white text-black w-full mt-4">
                    <option disabled selected>Select Department</option>
                    <option v-for="option in depts" :key="option">
                        {{ option }}
                    </option>
                </select>
                <button :disabled="!itemName || !itemCategory" @click="addItem" class="btn btn-wide mt-4 w-full bg-green-600 text-black">Add</button>
            </div>

            <div v-else>
                <div class="p-1 m-1 flex flex-row" v-for="groceryItem in need()" :key="groceryItem.dept">
                    <item-card 
                        :item="groceryItem"
                        :depts="depts"
                        @toggle="groceryItem.got = !groceryItem.got"
                        :edit="edit"
                        class="basis-full"
                    />
                    <EditButton v-if="editMode" :edit="groceryItem.editing" @click="groceryItem.editing = !groceryItem.editing" class="ml-2 basis-auto"/>
                    <DeleteButton v-if="editMode" 
                        :item="groceryItem" 
                        class="ml-2 basis-auto" 
                        @remove="remove"
                        :disabled="edit"
                    />
                </div>
                <div v-if="need().length === 0">
                    <div>
                        <button class="btn btn-block btn-disabled bg-base-100 text-gray-500 no-animate text-left">
                            Got 'em all.. get outta there!
                        </button>
                    </div>
                </div>
                <div class="divider"></div> 
                <div class="p-1 m-1 flex flex-row" v-for="groceryItem in have()" :key="groceryItem.dept">
                    <item-card 
                        :item="groceryItem"
                        :edit="edit"
                        :depts="depts"
                        @toggle="groceryItem.got = !groceryItem.got"
                        class="basis-full"
                    />
                    <EditButton v-if="editMode" @click="edit = !edit" class="ml-2 basis-auto"/>
                    <DeleteButton v-if="editMode" 
                        :item="groceryItem" 
                        class="ml-2 basis-auto" 
                        @remove="remove"
                        :disabled="edit"
                    />
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
                <button :disabled="addMode || editMode" class="btn modal-button bg-blue-600" @click="add">
                    <span class="text-4xl">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>

        <div class="drawer-side">
            <label for="my-drawer-3" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 gap-2">
                <button type="button" class="bg-gray-700 font-bold rounded rounded-2xl p-4 text-center">
                    {{ firebase.auth().currentUser.email }}
                </button>
                <!-- <li><button type="button">Settings</button></li> -->
                <li><button type="button" @click="logout">Logout</button></li>
            </ul>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import { ref, reactive, onMounted, computed } from 'vue'
    import ItemCard from '../components/Item.vue'
    import EditButton from '../components/EditButton.vue'
    import DeleteButton from '../components/DeleteButton.vue'

    const router = useRouter()

    const userInitials = computed(() => {
        return firebase.auth().currentUser.email?.substring(0,2)
    })

    let depts = reactive([
        'Bakery',
        'Deli',
        'Meat',
        'Produce',
        'Dairy',
        'Frozen',
        'Soft Drink / Chips',
        'Pasta / Sauce',
        'Sporting Goods',
        'Electronics',
        'Stationary',
        'Pets',
        'Paper Goods',
    ])

    let groceryList     = ref([])
    let edit            = ref(false)
    let addMode         = ref(false)
    let editMode        = ref(false)
    const itemName      = ref("")
    const itemCategory  = ref("")

    const logout = () => {
        firebase.auth().signOut()
        router.replace('/')
    }

    const need = () => {
        return groceryList.value.filter(need => need.got === false)
    }
    const have = () => {
        return groceryList.value.filter(have => have.got === true)
    }
    const addItem = () => {
        addMode.value = !addMode.value
        
        if (!itemName.value || !itemCategory.value) {
            return
        }
        
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("list")
            .add({
                name: itemName.value,
                dept: itemCategory.value,
                got: false,
                editing: false,
                createdAt: new Date()
            })
        itemName.value = ''
        itemCategory.value = ''
    }

    const toggleEditMode = () => {
        editMode.value = !editMode.value
    }

    const add = () => {
        addMode.value = true
    }

    const remove = (item: { id: string|undefined; }) => {
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("list")
        .doc(item.id)
        .delete()

        if (groceryList.value.length <= 1)
            edit.value = false
    }

    const getListForUser = () => {
        let list = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("list")
        
        list.onSnapshot(snap => {
            groceryList.value = []            
            snap.forEach(doc => {
                let listItem = doc.data()
                listItem.id = doc.id
                groceryList.value.push(listItem)
            })
        })
    }

    getListForUser()

    onMounted(() => {
        getListForUser()
    })
</script>