<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Gestion des matières</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block ww-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <select
                v-model="selectedNiveau"
                @change="filteredmatieres"
                class="px-8 py-1 border rounded-md focus:outline-none"
              >
                <option value="">Niveau</option>
                <option value="BAC">BAC1</option>
                <option value="BAC2">BAC2</option>
                <option value="CA1">CP</option>
              </select>
            </div>

            <button
              @click="createNewMatiere"
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Create New Matière
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Matières</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Shortcut</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Description</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Comment</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr
                  v-for="(matiere, index) in filteredmatieres"
                  :key="index"
                  class="transition-transform hover:scale-101 hover:bg-gray-100"
                >
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ matiere.name }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ matiere.shortcut }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ matiere.description }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ matiere.comment }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="editmatiere(matiere)"
                        class="flex items-center justify-center px-5 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <i class="fa fa-edit mx-2"></i> Edit
                      </button>

                      <button
                        @click="deletematiere(matiere.id)"
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
                    Total Matières:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredmatieres.length }}
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

    <!-- Edit matiere Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit matière</h3>
        <form @submit.prevent="updatematiere">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Matière:</label>
              <input
                v-model="selectedmatiere.name"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Description:</label>
              <input
                v-model="selectedmatiere.description"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Comment:</label>
              <input
                v-model="selectedmatiere.comment"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium" for="niveau">
                Niveau
              </label>

              <select
                id="niveau"
                v-model="selectedmatiere.niveau"
                class="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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

    <!-- Create New matiere Modal -->
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Matiere</h3>
        <form @submit.prevent="submitNewmatiere">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Matière:</label>
              <input
                v-model="newmatiere.name"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Description:</label>
              <input
                v-model="newmatiere.description"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Comment:</label>
              <input
                v-model="newmatiere.comment"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium" for="niveau">
                Niveau
              </label>

              <select
                id="niveau"
                v-model="newmatiere.niveau"
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
import axiosClient from "../../../axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      isLoading: false,
      searchQuery: "",
      matieres: [],
      selectedmatiere: null,
      selectedNiveau: "",
      isEditModalOpen: false,
      isCreateModalOpen: false,
      newmatiere: {
        name: "",
        description: "",
        comment: "",
        niveau: "",
      },
    };
  },
  computed: {
    filteredmatieres() {
      let filteredmatieres = this.matieres;

      if (this.searchQuery) {
        const lowercaseSearchQuery = this.searchQuery.toLowerCase();
        filteredmatieres = filteredmatieres.filter((matiere) => {
          return (
            matiere.name.toLowerCase().includes(lowercaseSearchQuery) ||
            matiere.shortcut.toLowerCase().includes(lowercaseSearchQuery)
          );
        });
      }

      // Filter by niveau
      if (this.selectedNiveau !== "") {
        filteredmatieres = filteredmatieres.filter(
          (matiere) => matiere.niveau === this.selectedNiveau
        );
      }

      return filteredmatieres;
    },
  },

  methods: {
    createNewMatiere() {
      // Open the Create New matiere modal
      this.isCreateModalOpen = true;
    },

    closeCreateModal() {
      // Close the Create New matiere modal and reset the newmatiere data
      this.isCreateModalOpen = false;
      this.newmatiere = {
        name: "",
        description: "",
        comment: "",
        niveau: "",
      };
    },

    async submitNewmatiere() {
      try {
        // Make an API call to create the new matiere
        const response = await axiosClient.post(
          "/admin/create-matiere",
          this.newmatiere
        );

        // Add the newly created matiere to the list
        this.matieres.push(response.data);

        $toast.success("matiere created successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the Create New matiere modal and reset the newmatiere data
        this.closeCreateModal();
        await this.fetchmatieres();
      } catch (error) {
        console.error("Error creating matiere:", error);
        $toast.error("An error occurred while creating the matiere.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    },

    async fetchmatieres() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/admin/matieres");
        this.matieres = response.data;
      } catch (error) {
        console.error("Error fetching matieres:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async editmatiere(matiere) {
      // Open a modal or perform other actions to allow editing
      this.selectedmatiere = { ...matiere };
      this.isEditModalOpen = true;
    },

    async deletematiere(matiereId) {
      try {
        // Make an API call to delete the eleve
        await axiosClient.delete(`/admin/matieres/${matiereId}`);

        // Remove the deleted eleve from the list
        this.matieres = this.matieres.filter(
          (matiere) => matiere.id !== matiereId
        );

        $toast.success("matiere deleted successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // window.location.reload();
        await this.fetchmatieres();
      } catch (error) {
        console.error("Error deleting matiere:", error);
      }
    },

    async updatematiere() {
      try {
        // Make an API call to update the eleve
        await axiosClient.put(
          `/admin/matieres/${this.selectedmatiere.id}`,
          this.selectedmatiere
        );

        // Update the eleve in the list with the edited data
        const index = this.matieres.findIndex(
          (matiere) => matiere.id === this.selectedmatiere.id
        );
        if (index !== -1) {
          this.matieres[index] = { ...this.selectedmatiere };
        }

        $toast.success("matiere Info updated successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the edit modal
        this.isEditModalOpen = false;
        this.selectedmatiere = null;

        // window.location.reload();
        await this.fetchmatieres();
      } catch (error) {
        console.error("Error updating matiere:", error);
      }
    },
  },
  async mounted() {
    await this.fetchmatieres();
  },
};
</script>
