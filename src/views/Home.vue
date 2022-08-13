<template>
    <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <h2 class="text-2xl font-semibold">Grocery shopping sucks</h2>
            <p class="py-6">
                Hope this helps you get in and get out
            </p>
            <div v-if="isLoggedIn">
                <button type="button" @click="logout" class="btn btn-accent">Logout</button>
            </div>
            <div v-else>
                <router-link to="/register" class="btn btn-primary mr-4"> Register </router-link>
                <router-link to="/login" class="btn btn-secondary"> Login </router-link>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router' // import router
    import firebase from 'firebase/app';
    import 'firebase/auth';

    const router = useRouter()
    const isLoggedIn = ref(true)

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            isLoggedIn.value = true
        } else {
            isLoggedIn.value = false
        }
    })

    const logout = () => {
        firebase.auth().signOut()
        router.replace('/')
    }
</script>