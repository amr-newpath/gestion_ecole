<template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="w-full max-w-3xl p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Create Professeur</h2>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="nom" class="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            v-model="user.nom"
            type="text"
            id="nom"
            name="nom"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter Nom"
            required
          />
        </div>
        <div>
          <label for="prenom" class="block text-sm font-medium text-gray-700">
            Prenom
          </label>
          <input
            v-model="user.prenom"
            type="text"
            id="prenom"
            name="prenom"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter Prenom"
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          name="email"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter Email"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="cin" class="block text-sm font-medium text-gray-700">
            CIN
          </label>
          <input
            v-model="user.cin"
            type="text"
            id="cin"
            name="cin"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter CIN"
            required
          />
        </div>
        <div>
          <label for="tel" class="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            v-model="user.tel"
            type="tel"
            id="tel"
            name="tel"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter Téléphone"
            required
          />
        </div>
      </div>


      <div class="mt-6">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click.prevent="createUser"
        >
          Create User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      user: {
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        cin: "",
      },
    };
  },
  methods: {
    createUser() {
      axiosClient
        .post(`/admin/create-prof`, this.user) // Update the API endpoint
        .then((response) => {
          console.log("User created:", response.data);
          // Reset the form
          this.user = {
            nom: "",
            prenom: "",
            tel: "",
            email: "",
            cin: "",
          };

          $toast.success("Prof created successfully", {
            position: "bottom-right",
            duration: 3000,
          });
        })
        .catch((error) => {
          // console.error("Error creating user:", error);
          $toast.error("An error occurred", {
            position: "bottom-right",
            duration: 3000,
          });
        });
    },
  },
};
</script>
