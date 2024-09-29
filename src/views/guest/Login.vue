<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="email"
        label="Email"
        placeholder="Email"
        type="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        placeholder="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
      >Login</v-btn>
      <v-btn
        text
        @click="$router.push('/forgot-password')"
      >Forgot Password?</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import useAppwrite from '@/composables/useAppwrite.js';
import { useRouter } from 'vue-router';

const { account } = useAppwrite();
const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await account.createEmailPasswordSession(email.value, password.value);
    router.push({ name: "Home" });
  } catch (error) {
    alert(error.message);
  }
};
</script>
