<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toast-notification"; // Import the toast library
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

const router = useRouter();

let errorMsg = ref("");

const user = {
  code: "",
  password: "",
};

const errors = {
  code: null,
  password: null,
};

function login(e) {
  e.preventDefault();

  // Reset errors
  errors.code = null;
  errors.password = null;

  // Validate code and password
  if (!user.code) {
    errors.code = "Code is required";
  }

  if (!user.password) {
    errors.password = "Password is required";
  }

  // Check if there are validation errors
  if (errors.code || errors.password) {
    // If there are errors, do not proceed with login
    return;
  }

  store
    .dispatch("login", user)
    .then(() => {
      router.push({ name: `${store.getters["userRole"]}Dashboard` });

      $toast.success("You are Logging successfully!", {
        position: "bottom-right",
        duration: 3000,
      });
    })
    .catch((err) => {
      errorMsg.value = err.response.data.error;
      $toast.warning("username or password field", {
        position: "bottom-right",
        duration: 3000,
      });
    });
}
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-30 w-32"
        src="../assets/images/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="login">
        <div v-if="errorMsg" class="py-3 px-5 bg-red-500 text-white rounded">
          {{ errorMsg }}
        </div>
        <div>
          <label
            for="code"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Code</label
          >
          <div class="mt-2">
            <input
              id="code"
              name="code"
              type="code"
              autocomplete="code"
              required=""
              v-model="user.code"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <div v-if="errors.code" class="text-red-500">{{ errors.code }}</div>
            <!-- Display error message -->
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              v-model="user.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <div v-if="errors.password" class="text-red-500">
              {{ errors.password }}
            </div>
            <!-- Display error message -->
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}
        <router-link
          :to="{ name: 'Register' }"
          class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >Regiser for free</router-link>
      </p>
    </div>
  </div>
</template>
