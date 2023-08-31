<template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="w-full max-w-3xl p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Create User</h2>

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
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <label for="tel" class="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <input
          v-model="user.tel"
          type="tel"
          id="tel"
          name="tel"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
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
            required
          />
        </div>
        <div>
          <label for="code" class="block text-sm font-medium text-gray-700">
            Code
          </label>
          <input
            v-model="user.code"
            type="text"
            id="code"
            name="code"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <label for="address" class="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          v-model="user.address"
          id="address"
          name="address"
          rows="3"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <div class="mt-2 flex space-x-4">
          <label
            v-for="(role, index) in roles"
            :key="index"
            :class="{
              'border-2 border-indigo-600 rounded-lg bg-indigo-100':
                user.role === role,
              'border border-gray-300 rounded-lg': user.role !== role,
            }"
            class="flex items-center justify-center cursor-pointer h-12 w-1/2"
          >
            <input
              v-model="user.role"
              type="radio"
              :id="role"
              :value="role"
              class="hidden"
            />
            <span class="text-sm font-medium text-gray-700">{{ role }}</span>
          </label>
        </div>
      </div>

      <div class="mt-6">
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default {
  data() {
    return {
      user: {
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        cin: "",
        address: "",
        role: "",
        code: "",
        password: "",
      },
      roles: ["Administratif", "Comptable"],
    };
  },
  methods: {
    createUser() {
      axiosClient
        .post(`/admin/${this.user.role.toLowerCase()}`, this.user) // Update the API endpoint
        .then((response) => {
          console.log("User created:", response.data);
          // Reset the form
          this.user = {
            nom: "",
            prenom: "",
            tel: "",
            email: "",
            cin: "",
            address: "",
            role: "",
            code: "",
            password: "",
          };
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    },
  },
};
</script>

<!-- <template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="w-full max-w-3xl p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Create User</h2>

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
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <label for="tel" class="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <input
          v-model="user.tel"
          type="tel"
          id="tel"
          name="tel"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
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
            required
          />
        </div>
        <div>
          <label for="code" class="block text-sm font-medium text-gray-700">
            Code
          </label>
          <input
            v-model="user.code"
            type="text"
            id="code"
            name="code"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <label for="address" class="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          v-model="user.address"
          id="address"
          name="address"
          rows="3"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div> -->

<!-- <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <div class="mt-2">
          <div class="flex items-center">
            <input
              v-model="user.role"
              type="radio"
              id="administratif"
              value="Administratif"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label for="administratif" class="ml-3 block text-sm font-medium text-gray-700">
              Administratif
            </label>
          </div>
          <div class="mt-2 flex items-center">
            <input
              v-model="user.role"
              type="radio"
              id="comptable"
              value="Comptable"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label for="comptable" class="ml-3 block text-sm font-medium text-gray-700">
              Comptable
            </label>
          </div>
        </div>
      </div> -->

<!-- <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <div class="mt-2 flex space-x-4">
          <label
            v-for="(role, index) in roles"
            :key="index"
            :class="{
              'border-2 border-indigo-600 rounded-lg bg-indigo-100':
                user.role === role,
              'border border-gray-300 rounded-lg': user.role !== role,
            }"
            class="flex items-center justify-center cursor-pointer h-12 w-1/2"
          >
            <input
              v-model="user.role"
              type="radio"
              :id="role"
              :value="role"
              class="hidden"
            />
            <span class="text-sm font-medium text-gray-700">{{ role }}</span>
          </label>
        </div>
      </div>

      <div class="mt-6">
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click.prevent="createUser"
        >
          Create User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        cin: "",
        address: "",
        role: "",
        code: "",
        password: "",
      },
      roles: ["Administratif", "Comptable"],
    };
  },
  methods: {
    createUser() {
      axios
        .post("/api/users", this.user) // Update the API endpoint
        .then((response) => {
          console.log("User created:", response.data);
          // Reset the form
          this.user = {
            nom: "",
            prenom: "",
            tel: "",
            email: "",
            cin: "",
            address: "",
            role: "",
            code: "",
            password: "",
          };
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    },
  },
};
</script> -->
