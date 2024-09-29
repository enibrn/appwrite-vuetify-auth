<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          v-if="user"
          type="success"
        >
          Logged in as {{ user.name }}
        </v-alert>
        <v-alert
          v-else
          type="error"
        >
          Not logged in
        </v-alert>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            placeholder="Email"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            placeholder="Password"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Name"
            v-model="name"
            type="text"
            placeholder="Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <v-btn
            :disabled="user"
            @click="login(email, password)"
            color="primary"
          >
            Login
          </v-btn>
        </v-col>

        <v-col>
          <v-btn
            :disabled="user"
            @click="register"
            color="secondary"
          >
            Register
          </v-btn>
        </v-col>

        <v-col>
          <v-btn
            :disabled="!user"
            @click="logout"
            color="error"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAppwrite from './composables/useAppwrite.js';

const { account, user, ID, evaluateUser } = useAppwrite();

const email = ref('');
const password = ref('');
const name = ref('');

onMounted(() => {
  evaluateUser();
})

const login = async (email, password) => {
  await account.createEmailPasswordSession(email, password);
};

const register = async () => {
  await account.create(ID.unique(), email.value, password.value, name.value);
  login(email.value, password.value);
};

const logout = async () => {
  await account.deleteSession('current');
};
</script>