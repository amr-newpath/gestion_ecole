<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Rapport des recettes</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <!-- Filter by date -->
              <input
                type="date"
                v-model="startDate"
                class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <input
                type="date"
                v-model="endDate"
                class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
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
                    <div class="font-semibold text-left">Date</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Nº Reçu</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Mode paiement</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Status</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Eleve</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Niveau</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Parent</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Montant</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(paiement, index) in filteredPaiements" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ formatDate(paiement.created_at) }}
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ paiement.num_recu }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <ul>
                      <li v-for="(mode, index) in paiement.modes" :key="index">
                        {{ mode.type }} - {{ mode.montant }}
                      </li>
                    </ul>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div
                      class="bg-green-200 text-green-800 rounded-full py-1 px-3 text-center"
                    >
                      {{ paiement.status }}
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-800">
                      {{ paiement.eleve.nom }} {{ paiement.eleve.prenom }}
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ paiement.eleve.niveau }}</div>
                  </td>

                  <!-- parent of eleve-->
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ parentNames[paiement.eleve.famille_id] }}
                    </div>
                  </td>

                  <!-- reference number of  Cheque -->

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ paiement.montant }} DHs</div>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="7"
                    class="p-4 whitespace-nowrap font-semibold just text-right text-yellow-500"
                  >
                    Total Montant:
                  </td>
                  <td class="p-4 whitespace-nowrap font-semibold text-left">
                    {{ calculateTotalMontant }}
                  </td>
                  <td class="p-4 whitespace-nowrap"></td>
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
  </section>
</template>

<script>
import axiosClient from "../../../axios";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      selectedStatus: "",
      isLoading: false,
      searchQuery: "",
      paiements: [],
      parentNames: {},
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    filteredPaiements() {
      const normalizedSearchQuery = this.searchQuery.trim().toLowerCase();

      return this.paiements.filter((paiement) => {
        const containsSearchQuery =
          paiement.eleve.nom.toLowerCase().includes(normalizedSearchQuery) ||
          paiement.eleve.prenom.toLowerCase().includes(normalizedSearchQuery) ||
          this.parentNames[paiement.eleve.famille_id]
            .toLowerCase()
            .includes(normalizedSearchQuery);

        const isInDateRange = this.isDateInRange(paiement.created_at);

        return containsSearchQuery && paiement.status === "Completed" && isInDateRange;
      });
    },

    calculateTotalMontant() {
      const total = this.filteredPaiements.reduce((acc, paiement) => {
        return acc + paiement.montant;
      }, 0);
      return total + " DHs";
    },
  },
  methods: {
    navigateToPayer() {
      this.$router.push({ name: "CreatePaiement" });
    },
    isDateInRange(dateString) {
      if (!this.startDate || !this.endDate) {
        return true; // If no start or end date is selected, consider all dates
      }

      const date = new Date(dateString);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      return date >= startDate && date <= endDate;
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    },
    clearFilters() {
      this.searchQuery = "";
      this.selectedStatus = "";
    },
    async fetchPaiements() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/comptable/paiements-modes");
        this.paiements = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching paiements:", error);
        this.isLoading = false;
      }
    },

    async fetchParentNames() {
      try {
        const response = await axiosClient.get("/comptable/parents"); // Adjust API endpoint
        const parents = response.data;

        this.parentNames = parents.reduce((names, parent) => {
          names[parent.id] = parent.nom_complet;
          return names;
        }, {});

        console.log(this.parentNames);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    },
  },
  watch: {},
  async mounted() {
    await Promise.all([this.fetchPaiements(), this.fetchParentNames()]);
  },
};
</script>
