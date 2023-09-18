<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Gestion des chèques</h2>
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
                v-model="selectedStatus"
                @change="filteredPaiements"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">Status</option>
                <option value="Payé">Payé</option>
                <option value="Impayé">Impayé</option>
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
                    <div class="font-semibold text-left">Parent</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Ref</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Montant</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(paiement, index) in filteredPaiements" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-800">
                      {{ paiement.eleve.nom }} {{ paiement.eleve.prenom }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ paiement.eleve.code }}</div>
                  </td>

                  <!-- parent of eleve-->
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ parentNames[paiement.eleve.famille_id] }}</div>
                  </td>

                  <!-- reference number of  Cheque -->
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ getPaiementChequeReference(paiement) }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ getPaiementChequeMontant(paiement) }} DHs
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="pay(paiement)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'dollar-sign']"
                          class="h-5 w-5 mr-1"
                        />
                        Pay
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="4"
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
    };
  },
  computed: {
    filteredPaiements() {
      const normalizedSearchQuery = this.searchQuery.trim().toLowerCase();

      return this.paiements.filter((paiement) => {
        const containsSearchQuery = (
          paiement.eleve.nom.toLowerCase().includes(normalizedSearchQuery) ||
          paiement.eleve.prenom.toLowerCase().includes(normalizedSearchQuery) ||
          this.parentNames[paiement.eleve.famille_id].toLowerCase().includes(normalizedSearchQuery) ||
          this.getPaiementChequeReference(paiement).toLowerCase().includes(normalizedSearchQuery)
        );

        return containsSearchQuery && paiement.modes.some((mode) => {
          return mode.type === "Chèque" && mode.paid === 0;
        });
      });
    },
    
    calculateTotalMontant() {
      const total = this.filteredPaiements.reduce((acc, paiement) => {
        return acc + this.calculatePaiementMontant(paiement);
      }, 0);
      return total + " DHs";
    },
  },
  methods: {
    async pay(paiement) {
      try {
        await axiosClient.put(`/comptable/update-payment/${paiement.id}`, {
          // pending: false,
          chequePaid: true, 
        });

        await this.fetchPaiements();
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    },
    navigateToPayer() {
      this.$router.push({ name: "CreatePaiement" });
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
    getPaiementChequeMontant(paiement) {
      const chequeModes = paiement.modes.filter((mode) => {
        return mode.type === "Chèque" && mode.paid === 0;
      });

      return chequeModes.reduce((totalMontant, mode) => {
        return totalMontant + mode.montant;
      }, 0);
    },

    getPaiementChequeReference(paiement) {
      const chequeMode = paiement.modes.find((mode) => {
        return mode.type === "Chèque" && mode.paid === 0;
      });

      return chequeMode ? chequeMode.ref : '';
    },
    calculatePaiementMontant(paiement) {
      return paiement.modes.reduce((totalMontant, mode) => {
        if (
          (mode.type === "Chèque") &&
          mode.paid === 0
        ) {
          totalMontant += mode.montant;
        }
        return totalMontant;
      }, 0);
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
  watch: {
  },
  async mounted() {
    await Promise.all([this.fetchPaiements(), this.fetchParentNames()]);
  },
};
</script>