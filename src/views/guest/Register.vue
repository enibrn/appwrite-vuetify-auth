<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field
        v-model="name"
        label="Name"
        placeholder="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        placeholder="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        placeholder="Password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        :error-messages="passwordErrors"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
      >Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import useAppwrite from '@/composables/useAppwrite.js';

const { account, ID } = useAppwrite();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const passwordErrors = computed(() => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    return ['Password is different'];
  }
  return [];
});


const register = async () => {
  if (passwordErrors.value.length > 0) {
    return;
  }

  await account.create(ID.unique(), email.value, password.value, name.value);
  login(email.value, password.value);
};
</script>
