<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Gestion des classes</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block ww-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              @click="createNewclasse"
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Create New Classe
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Classe</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Number of eleves</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Niveau</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr
                  v-for="(classe, index) in filteredclasses"
                  :key="index"
                  class="transition-transform hover:scale-101 hover:bg-gray-100"
                >
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ classe.nom }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="bg-green-500 text-white ml-10 rounded-full w-7 text-center">{{ classe.eleves.length }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ classe.niveau }}</div>
                  </td>

                  

                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="editclasse(classe)"
                        class="flex items-center justify-center px-5 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <i class="fa fa-edit mx-2"></i> Edit
                      </button>

                      <button
                        @click="deleteclasse(classe.id)"
                        class="flex items-center justify-center px-3 py-2 rounded-md text-blue-500 bg-white hover:bg-red-50 transition duration-300 focus:outline-none focus:ring focus:ring-red-200"
                      >
                        <i class="fa fa-trash mx-2"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr
                  class="transition-transform hover:scale-101 hover:bg-gray-100"
                >
                  <td
                    colspan="3"
                    class="p-8 whitespace-nowrap text-lg font-semibold text-right bg-gray-50"
                  >
                    Total classes:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredclasses.length }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex justify-center items-center h-32" v-else>
              <div
                class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit classe Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit classe</h3>
        <form @submit.prevent="updateclasse">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Classe Name:</label>
              <input
                v-model="selectedclasse.nom"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium" for="niveau">
                Niveau
              </label>

              <select
                id="niveau"
                v-model="selectedclasse.niveau"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <!-- <option value="" disabled selected>Select</option> -->

                <option value="CA1">CA1</option>
                <option value="BAC">BAC</option>
                <option value="BAC2">BAC2</option>
              </select>
            </div>
            <div class="flex justify-end mt-4">
              <button
                type="button"
                @click="isEditModalOpen = false"
                class="mr-2 px-4 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Create New classe Modal -->
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Classe</h3>
        <form @submit.prevent="submitNewclasse">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Classe name:</label>
              <input
                v-model="newclasse.nom"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium" for="niveau">
                Niveau
              </label>

              <select
                id="niveau"
                v-model="newclasse.niveau"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <!-- <option value="" disabled selected>Select</option> -->

                <option value="CA1">CA1</option>
                <option value="BAC">BAC</option>
                <option value="BAC2">BAC2</option>
              </select>
            </div>
            <div class="flex justify-end mt-4">
              <button
                type="button"
                @click="closeCreateModal"
                class="mr-2 px-4 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axiosClient from "@/axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      isLoading: false,
      searchQuery: "",
      classes: [],
      selectedclasse: null,
      isEditModalOpen: false,
      isCreateModalOpen: false,
      newclasse: {
        nom: "",
        niveau: "",
      },
    };
  },
  computed: {
    filteredclasses() {
      let filteredclasses = this.classes;

      if (this.searchQuery) {
        const lowercaseSearchQuery = this.searchQuery.toLowerCase();
        filteredclasses = filteredclasses.filter((classe) => {
          return (
            classe.nom.toLowerCase().includes(lowercaseSearchQuery) ||
            classe.niveau.toLowerCase().includes(lowercaseSearchQuery)
          );
        });
      }

      return filteredclasses;
    },
  },

  methods: {
    createNewclasse() {
      // Open the Create New classe modal
      this.isCreateModalOpen = true;
    },

    closeCreateModal() {
      // Close the Create New classe modal and reset the newclasse data
      this.isCreateModalOpen = false;
      this.newclasse = {
        nom: "",
        niveau: "",
      };
    },

    async submitNewclasse() {
      try {
        // Make an API call to create the new classe
        const response = await axiosClient.post(
          "/admin/classe",
          this.newclasse
        );

        // Add the newly created classe to the list
        this.classes.push(response.data);

        $toast.success("Classe created successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the Create New classe modal and reset the newclasse data
        this.closeCreateModal();
        await this.fetchclasses();
      } catch (error) {
        console.error("Error creating classe:", error);
        $toast.error("An error occurred while creating the classe.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    },

    async fetchclasses() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/admin/classes");
        this.classes = response.data;
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async editclasse(classe) {
      // Open a modal or perform other actions to allow editing
      this.selectedclasse = { ...classe };
      this.isEditModalOpen = true;
    },

    async deleteclasse(classeId) {
      try {
        // Make an API call to delete the eleve
        await axiosClient.delete(`/admin/classes/${classeId}`);

        // Remove the deleted eleve from the list
        // this.classes = this.classes.filter((classe) => classe.id !== classeId);
        // this.fetchclasses();

        $toast.success("classe deleted successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // window.location.reload();
        await this.fetchclasses();
      } catch (error) {
        console.error("Error deleting classe:", error);
      }
    },

    async updateclasse() {
      try {
        // Make an API call to update the eleve
        await axiosClient.put(
          `/admin/classes/${this.selectedclasse.id}`,
          this.selectedclasse
        );

        // Update the eleve in the list with the edited data
        const index = this.classes.findIndex(
          (classe) => classe.id === this.selectedclasse.id
        );
        if (index !== -1) {
          this.classes[index] = { ...this.selectedclasse };
        }

        $toast.success("classe Info updated successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the edit modal
        this.isEditModalOpen = false;
        this.selectedclasse = null;

        // window.location.reload();
        await this.fetchclasses();
      } catch (error) {
        console.error("Error updating classe:", error);
      }
    },
  },
  async mounted() {
    await this.fetchclasses();
  },
};
</script>
