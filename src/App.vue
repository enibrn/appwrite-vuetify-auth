<template>
  <v-app>
    <v-app-bar app v-if="user">
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/Account">Account</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import useAppwrite from '@/composables/useAppwrite.js';

const { user } = useAppwrite();

</script>