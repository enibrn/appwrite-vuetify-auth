<template>
  <v-container>
    <v-form @submit.prevent="resetPassword">
      <v-text-field
        v-model="email"
        label="Email"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
      >Reset Password</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const resetPassword = () => {
  // Logica di reset della password
};
</script>
