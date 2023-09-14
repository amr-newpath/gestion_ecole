<template>
  <div class="p-4">
    <div class="bg-white justify-center rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Eleve Profile</h2>

      <!-- Display Name -->
      <div class="flex items-center mb-2">
        <div class="w-1/3 font-medium">Nom:</div>
        <div class="w-2/3">
          <template v-if="!isEditingName">
            {{ eleveProfile.nom }}
            <button @click="toggleEdit('name')" class="ml-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14v5m0 0v-5m0 5h-5m5 0h5m-8-9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </template>
          <template v-else>
            <input v-model="tempName" class="border rounded-md px-2 py-1" />
            <button @click="saveEdit('name')" class="ml-2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button @click="cancelEdit('name')" class="ml-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </template>
        </div>
      </div>

      <!-- Display Prenom -->
      <div class="flex items-center mb-2">
        <div class="w-1/3 font-medium">Prenom:</div>
        <div class="w-2/3">
          <template v-if="!isEditingPrenom">
            {{ eleveProfile.prenom }}
            <button @click="toggleEdit('prenom')" class="ml-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14v5m0 0v-5m0 5h-5m5 0h5m-8-9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </template>
          <template v-else>
            <input v-model="tempPrenom" class="border rounded-md px-2 py-1" />
            <button @click="saveEdit('prenom')" class="ml-2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button @click="cancelEdit('prenom')" class="ml-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </template>
        </div>
      </div>

      <!-- Display Username -->
      <div class="flex items-center mb-2">
        <div class="w-1/3 font-medium">Username:</div>
        <div class="w-2/3">
          <template v-if="!isEditingUsername">
            {{ eleveProfile.username }}
            <button @click="toggleEdit('username')" class="ml-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14v5m0 0v-5m0 5h-5m5 0h5m-8-9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </template>
          <template v-else>
            <input v-model="tempUsername" class="border rounded-md px-2 py-1" />
            <button @click="saveEdit('username')" class="ml-2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button @click="cancelEdit('username')" class="ml-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </template>
        </div>
      </div>

      <!-- Display Password (Hidden) -->
      <div class="flex items-center mb-2">
        <div class="w-1/3 font-medium">Password:</div>
        <div class="w-2/3">
          <template v-if="!isEditingPassword">
            ********
            <button @click="toggleEdit('password')" class="ml-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14v5m0 0v-5m0 5h-5m5 0h5m-8-9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </template>
          <template v-else>
            <input
              v-model="tempPassword"
              type="password"
              class="border rounded-md px-2 py-1"
            />
            <button @click="saveEdit('password')" class="ml-2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button @click="cancelEdit('password')" class="ml-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </template>
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="submitChanges"
          class="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";
import { mapGetters } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      eleveProfile: {
        nom: "",
        prenom: "",
        username: "",
        password: "",
      },
      tempName: "",
      tempPrenom: "",
      tempUsername: "",
      tempPassword: "",
      isEditingName: false,
      isEditingPrenom: false,
      isEditingUsername: false,
      isEditingPassword: false,
    };
  },
  computed: {
    ...mapGetters(["profileId"]),
  },
  methods: {
    toggleEdit(field) {
      switch (field) {
        case "name":
          this.isEditingName = !this.isEditingName;
          break;
        case "prenom":
          this.isEditingPrenom = !this.isEditingPrenom;
          break;
        case "username":
          this.isEditingUsername = !this.isEditingUsername;
          break;
        case "password":
          this.isEditingPassword = !this.isEditingPassword;
          break;
        default:
          break;
      }
    },
    async fetchData() {
      try {
        const response = await axiosClient.get(`/eleve/profiles`);

        this.eleveProfile = response.data;
        this.eleveProfile.username = response.data.user.name;

        // Initialize temp values for editing
        this.tempName = this.eleveProfile.nom;
        this.tempPrenom = this.eleveProfile.prenom;
        this.tempUsername = this.eleveProfile.username;
        this.tempPassword = this.eleveProfile.password;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    saveEdit(field) {
      switch (field) {
        case "name":
          this.eleveProfile.nom = this.tempName;
          this.toggleEdit("name");
          break;
        case "prenom":
          this.eleveProfile.prenom = this.tempPrenom;
          this.toggleEdit("prenom");
          break;
        case "username":
          this.eleveProfile.username = this.tempUsername;
          this.toggleEdit("username");
          break;
        case "password":
          this.eleveProfile.password = this.tempPassword;
          this.toggleEdit("password");
          break;
        default:
          break;
      }
    },
    cancelEdit(field) {
      switch (field) {
        case "name":
          this.tempName = this.eleveProfile.nom;
          this.toggleEdit("name");
          break;
        case "prenom":
          this.tempPrenom = this.eleveProfile.prenom;
          this.toggleEdit("prenom");
          break;
        case "username":
          this.tempUsername = this.eleveProfile.username;
          this.toggleEdit("username");
          break;
        case "password":
          this.tempPassword = this.eleveProfile.password;
          this.toggleEdit("password");
          break;
        default:
          break;
      }
    },
    async submitChanges() {
      try {
        const response = await axiosClient.put(
          `/eleve/profiles/${this.eleveProfile.id}`,
          this.eleveProfile
        );

        $toast.success("Profile updated successfully", {
          position: "bottom-right",
          duration: 3000,
        });
      } catch (error) {
        // console.error('Error updating data:', error);
        $toast.error("Profile updated failed", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
