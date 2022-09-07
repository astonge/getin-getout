<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-4xl font-bold">Register</h1>
                <h2 class="text-xl font-semibold">Grocery shopping sucks..</h2>
                <form class="card card-body">
                    <input placeholder="Email..." v-model="email" type="email" class="p-2 rounded text-black"/>
                    <input @keyup.enter="register" placeholder="Password..." v-model="password" type="password" class="p-2 rounded text-black"/>
                    <button type="button" @click="register" class="btn btn-primary">Register</button>
                </form>
                <div class="text-center grid gap-2 w-full justify-center">
                    <span>Already have an account?</span>
                    <a href="/login" class="text-bold btn btn-secondary btn-md">Login</a>
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
