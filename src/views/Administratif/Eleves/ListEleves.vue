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
              <select
                v-model="selectedClasse"
                @change="filteredEleves"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">Classe</option>
              </select>
              <select
                v-model="selectedNiveau"
                @change="filteredEleves"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">Niveau</option>
                <option value="BAC">BAC1</option>
                <option value="BAC2">BAC2</option>
                <option value="CA1">CP</option>
              </select>
            </div>
            <button
              @click="clearFilters"
              class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Clear Filters
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Eleve</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Code</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Tuteur</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Date naissance</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Date inscription</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Status</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(eleve, index) in filteredEleves" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-800">
                      {{ eleve.nom }} {{ eleve.prenom }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.code }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.famille.nom_complet }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.date_naissance }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ formatDate(eleve.created_at) }}
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div :class="getStatusClass(eleve)">
                      {{ eleve.completed ? "COMPLETED" : "UNCOMPLETED" }}
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="editEleve(eleve)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'dollar-sign']"
                          class="h-5 w-5 mr-1"
                        />
                        Edit
                      </button>
                      <button
                        @click="deleteEleve(eleve.id)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-blue-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'dollar-sign']"
                          class="h-5 w-5 mr-1"
                        />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    class="p-8 whitespace-nowrap text-lg font-semibold text-right bg-gray-50"
                  >
                    Total Eleves:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredEleves.length }}</span
                    >
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

    <!-- Edit Eleve Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit Eleve</h3>
        <form @submit.prevent="updateEleve">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Nom:</label>
              <input
                v-model="selectedEleve.nom"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Prénom:</label>
              <input
                v-model="selectedEleve.prenom"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium"
                >Date de naissance:</label
              >
              <input
                v-model="selectedEleve.date_naissance"
                type="date"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="nat"
                >
                  Nat
                </label>
                <select
                  id="nat"
                  v-model="selectedEleve.nat"
                  class="w-full px-3 py-2 border rounded-md"
                >
                  <option
                    v-for="nationality in nationalities"
                    :key="nationality"
                    :value="nationality"
                  >
                    {{ nationality }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Sexe:</label>
              <select
                v-model="selectedEleve.sexe"
                class="w-full px-3 py-2 border rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Classe:</label>
              <input
                v-model="selectedEleve.classe"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Niveau:</label>
              <select
                v-model="selectedEleve.niveau"
                class="w-full px-3 py-2 border rounded-md"
              >
                <option value="CA1">CA1</option>
                <option value="BAC">BAC</option>
                <option value="BAC2">BAC2</option>
              </select>
            </div>
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
      selectedNiveau: "",
      selectedClasse: "",
      eleves: [],
      selectedEleve: null,
      isEditModalOpen: false,
      nationalities: [],
    };
  },
  computed: {
    filteredEleves() {
      let filteredEleves = this.eleves;

      if (this.searchQuery) {
        const lowercaseSearchQuery = this.searchQuery.toLowerCase();
        filteredEleves = filteredEleves.filter((eleve) => {
          return (
            eleve.nom.toLowerCase().includes(lowercaseSearchQuery) ||
            eleve.prenom.toLowerCase().includes(lowercaseSearchQuery) ||
            eleve.code.toLowerCase().includes(lowercaseSearchQuery)
          );
        });
      }

      if (this.selectedClasse) {
        filteredEleves = filteredEleves.filter((eleve) => {
          return eleve.classe.id === this.selectedClasse;
        });
      }

      if (this.selectedNiveau) {
        filteredEleves = filteredEleves.filter((eleve) => {
          return eleve.niveau === this.selectedNiveau;
        });
      }

      return filteredEleves;
    },
  },
  methods: {
    getStatusClass(eleve) {
      return eleve.completed === 1
        ? "bg-green-200 text-green-800 rounded-full py-1 px-2  text-center"
        : "bg-yellow-200 text-yellow-800 rounded-full py-1 px-2 text-center";
    },
    async fetchNationalities() {
      try {
        const response = await axiosClient.get(
          "https://restcountries.com/v3/all"
        );
        this.nationalities = response.data.map(
          (country) => country.name.common
        );
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    },
    async fetchEleves() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/administratif/eleves");
        this.eleves = response.data;
      } catch (error) {
        console.error("Error fetching eleves:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async editEleve(eleve) {
      // Open a modal or perform other actions to allow editing
      this.selectedEleve = { ...eleve };
      this.isEditModalOpen = true;
      // this.nationalities = this.selectedEleve.nat;
    },

    async deleteEleve(eleveId) {
      try {
        // Make an API call to delete the eleve
        await axiosClient.delete(`/administratif/eleves/${eleveId}`);

        // Remove the deleted eleve from the list
        this.eleves = this.eleves.filter((eleve) => eleve.id !== eleveId);

        $toast.success("Eleve deleted successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // window.location.reload();
        await this.fetchEleves();
      } catch (error) {
        console.error("Error deleting eleve:", error);

        // $toast.error("Error occured!", {
        //   position: "bottom-right",
        //   duration: 3000,
        // });
      }
    },

    async updateEleve() {
      try {
        // Make an API call to update the eleve
        await axiosClient.put(
          `/administratif/eleves/${this.selectedEleve.id}`,
          this.selectedEleve
        );

        // Update the eleve in the list with the edited data
        const index = this.eleves.findIndex(
          (eleve) => eleve.id === this.selectedEleve.id
        );
        if (index !== -1) {
          this.eleves[index] = { ...this.selectedEleve };
        }

        $toast.success("Eleve Info updated successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the edit modal
        this.isEditModalOpen = false;
        this.selectedEleve = null;

        // window.location.reload();
        await this.fetchEleves();
      } catch (error) {
        console.error("Error updating eleve:", error);

        // $toast.error("Error occured!", {
        //   position: "bottom-right",
        //   duration: 3000,
        // });
      }
    },
  },
  created() {
    this.fetchNationalities();
  },
  async mounted() {
    await this.fetchEleves();
  },
  watch: {
    selectedClasse: "filteredEleves",
    selectedNiveau: "filteredEleves",
  },
};
</script>
