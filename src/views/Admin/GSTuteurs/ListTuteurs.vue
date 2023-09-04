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

    <div class="parents-container m-10" v-else>
      <div
        v-for="(parent, index) in filteredParents"
        :key="index"
        class="parent-card"
      >
        <div class="parent-info">
          <div class="parent-name">{{ parent.nom_complet }}</div>
          <div class="parent-details">
            <div class="parent-info">
              <div><strong>Sexe:</strong> {{ parent.sexe }}</div>
              <div><strong>Nationalité:</strong> {{ parent.nat }}</div>
              <div><strong>Adresse:</strong> {{ parent.adresse }}</div>
              <div><strong>Tel:</strong> {{ parent.tel }}</div>
              <div><strong>Email:</strong> {{ parent.email }}</div>
              <div><strong>Profession:</strong> {{ parent.profession }}</div>
              <div><strong>Situation:</strong> {{ parent.situation }}</div>
              <div class="my-2">
                <strong>Status:</strong>
                <span
                  :class="
                    parent.completed
                      ? 'bg-green-200 text-green-800 rounded-full px-2 mx-4'
                      : 'bg-yellow-200 text-yellow-800 rounded-full  px-2 mx-4'
                  "
                >
                  {{ parent.completed ? "Completed" : "Uncompleted" }}
                </span>
              </div>
            </div>
            <div class="button-container my-4 text-center">
              <button
                v-if="parent.completed === 0"
                class="create-account-button"
                @click="createAccount(parent.id)"
              >
                Create account
              </button>
              <!-- <button v-else-if="parent.completed === 1" class="edit-button">
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
      parents: [],
      selectedStatus: "",
      searchQuery: "",
      selectedClasse: "",
      selectedNiveau: "",
      loading: false,
    };
  },
  created() {
    this.fetchParents();
  },
  computed: {
    filteredParents() {
      let filtered = this.parents;

      // Filter by status
      if (this.selectedStatus !== "") {
        const isCompleted = this.selectedStatus === "Completed" ? 1 : 0;
        filtered = filtered.filter(
          (parent) => parent.completed === isCompleted
        );
      }

      // Filter by search query
      if (this.searchQuery !== "") {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((parent) =>
          parent.nom_complet.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
  },

  methods: {
    fetchParents() {
      this.loading = true;

      axiosClient
        .get("/admin/parents")
        .then((response) => {
          this.parents = response.data;
        })
        .catch((error) => {
          console.error("Error fetching parents:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getImageUrl(parent) {
      if (parent.image) {
        return parent.image.path;
      } else {
        return "https://example.com/default-image.jpg";
      }
    },

    createAccount(parentId) {
      axiosClient
        .post(`/admin/parent-account/${parentId}`)
        .then((response) => {
          const createdUser = response.data;

          // console.log("Created user:", createdUser);

          $toast.success(response.data.message, {
            position: "bottom-right",
            duration: 3000,
          });

          // Optionally, update the parent's completed status if the user was successfully created
          this.fetchParents();
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
.parents-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.parent-card {
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

.parent-card:hover {
  transform: scale(1.05);
}

.parent-image {
  flex: 1;
}

.parent-image img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.parent-info {
  flex: 2;
  padding: 16px;
}

.parent-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.parent-details {
  font-size: 0.875rem;
  color: #4b5563;
}

.create-account-button {
  background-color: #0096cb;
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
