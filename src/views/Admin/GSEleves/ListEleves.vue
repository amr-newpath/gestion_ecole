<template>
  <div class="my-8">
    <div class="p-3">
      <div class="flex mx-11 items-center justify-between">
        <div class="flex space-x-4">
          <input
            v-model="searchQuery"
            placeholder="Search"
            class="block ww-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <select
            v-model="selectedClasse"
            @change="filteredEleves"
            class="px-8 py-1 border rounded-md focus:outline-none"
          >
            <option value="">Classe</option>
          </select>
          <select
            v-model="selectedNiveau"
            @change="filteredEleves"
            class="px-8 py-1 border rounded-md focus:outline-none"
          >
            <option value="">Niveau</option>
            <option value="BAC">BAC1</option>
            <option value="BAC2">BAC2</option>
            <option value="CA1">CP</option>
          </select>

          <select
            v-model="selectedStatus"
            class="px-8 py-1 border rounded-md focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center h-32" v-if="loading">
      <div
        class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
      ></div>
    </div>

    <div class="eleves-container m-10" v-else>
      <div
        v-for="(eleve, index) in filteredEleves"
        :key="index"
        class="eleve-card"
      >
        <div class="eleve-info">
          <div class="eleve-name">{{ eleve.nom_complet }}</div>
          <div class="eleve-details">
            <div class="eleve-info">
              <!-- <div class="eleve-name">{{ eleve.nom_complet }}</div> -->
              <div>
                <strong>Date de Naissance:</strong> {{ eleve.date_naissance }}
              </div>
              <div><strong>Sexe:</strong> {{ eleve.sexe }}</div>
              <div><strong>Nationalité:</strong> {{ eleve.nat }}</div>
              <div><strong>Adresse:</strong> {{ eleve.adresse }}</div>
              <div><strong>Classe:</strong> {{ eleve.classe }}</div>
              <div><strong>Niveau:</strong> {{ eleve.niveau }}</div>
              <div>
                <strong>Année Scolaire:</strong> {{ eleve.annee_scolaire }}
              </div>
              <div class="my-2">
                <strong>Status:</strong>
                <span
                  :class="
                    eleve.completed
                      ? 'bg-green-200 text-green-800 rounded-full px-2 mx-4'
                      : 'bg-yellow-200 text-yellow-800 rounded-full  px-2 mx-4'
                  "
                >
                  {{ eleve.completed ? "Completed" : "Uncompleted" }}
                </span>
              </div>
            </div>
            <div class="button-container my-4 text-center">
              <button
                v-if="eleve.completed === 0"
                class="create-account-button"
                @click="createAccount(eleve.id)"
              >
                Create account
              </button>
              <!-- <button v-else-if="eleve.completed === 1" class="edit-button">
              Edit account
            </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      eleves: [],
      selectedStatus: "",
      searchQuery: "",
      selectedClasse: "",
      selectedNiveau: "",
      loading: false,
    };
  },
  created() {
    this.fetchEleves();
  },
  computed: {
    filteredEleves() {
      let filtered = this.eleves;

      // Filter by status
      if (this.selectedStatus !== "") {
        const isCompleted = this.selectedStatus === "Completed" ? 1 : 0;
        filtered = filtered.filter((eleve) => eleve.completed === isCompleted);
      }

      // Filter by search query
      if (this.searchQuery !== "") {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((eleve) =>
          eleve.nom_complet.toLowerCase().includes(query)
        );
      }

      // Filter by classe
      if (this.selectedClasse !== "") {
        filtered = filtered.filter(
          (eleve) => eleve.classe === this.selectedClasse
        );
      }

      // Filter by niveau
      if (this.selectedNiveau !== "") {
        filtered = filtered.filter(
          (eleve) => eleve.niveau === this.selectedNiveau
        );
      }

      return filtered;
    },
  },

  methods: {
    fetchEleves() {
      this.loading = true;

      axiosClient
        .get("/admin/eleves")
        .then((response) => {
          this.eleves = response.data;
        })
        .catch((error) => {
          console.error("Error fetching eleves:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getImageUrl(eleve) {
      if (eleve.image) {
        return eleve.image.path;
      } else {
        return "https://example.com/default-image.jpg";
      }
    },

    createAccount(eleveId) {
      axiosClient
        .post(`/admin/eleve-account/${eleveId}`)
        .then((response) => {
          const createdUser = response.data;

          // console.log("Created user:", createdUser);

          $toast.success(response.data.message, {
            position: "bottom-right",
            duration: 3000,
          });

          // Optionally, update the eleve's completed status if the user was successfully created
          this.fetchEleves();
        })
        .catch((error) => {
          // console.error("Error creating account:", error);
          $toast.error(error.message, {
            position: "bottom-right",
            duration: 3000,
          });
        });
    },
    performFilter() {
      // You can perform additional filtering logic here if needed
    },
  },
};
</script>

<style scoped>
.eleves-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.eleve-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  max-width: 300px;
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.eleve-card:hover {
  transform: scale(1.05);
}

.eleve-image {
  flex: 1;
}

.eleve-image img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.eleve-info {
  flex: 2;
  padding: 16px;
}

.eleve-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.eleve-details {
  font-size: 0.875rem;
  color: #4b5563;
}

.create-account-button {
  background-color: #309bc3;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #f8ce03;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status-completed {
  background-color: #3bbf3b; /* Green background color for completed */
  color: white; /* White text color for completed */
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.status-uncompleted {
  background-color: #f8ce03; /* Yellow background color for uncompleted */
  color: white; /* White text color for uncompleted */
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

/* Add hover effect to buttons */
.create-account-button:hover,
.edit-button:hover {
  filter: brightness(1.2);
}
</style>

<!-- Edit Account Modal -->
<!-- <div v-if="isEditModalOpen" class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
    <h3 class="text-lg font-semibold mb-4">Edit Account</h3>
    <form @submit.prevent="updateAccount">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-1/2 px-2 mb-4">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="name" class="w-full my-3 px-3 py-2 border rounded-md" />
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <label class="block text-sm font-medium">Code</label>
          <input v-model="code" class="w-full my-3 px-3 py-2 border rounded-md" />
        </div>
        <div class="flex justify-end mt-4">
          <button type="button" @click="isEditModalOpen = false" class="mr-2 px-4 py-2 text-gray-500">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</div> -->
