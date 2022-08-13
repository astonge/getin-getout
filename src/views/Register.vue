<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
            <h1 class="text-5xl font-bold">Register..</h1>
            <h2 class="text-2xl font-semibold">Grocery shopping sucks</h2>
                <form class="card card-body">
                <input placeholder="Email..." v-model="email" type="email" class="p-2 rounded"/>
                <input placeholder="Password..." v-model="password" type="password" class="p-2 rounded"/>
                <button type="button" @click="register" class="btn btn-primary">Register</button>
            </form>
            <div class="text-center">
                Already have an account? <a href="/login" class="text-bold btn btn-secondary btn-sm">Login</a>
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

    let email = ref('')
    let password = ref('')
    const router = useRouter()

    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((data) => {
                router.push('/list')
            })
            .catch(error => {
                alert(error.message)
            })
    }
</script>
