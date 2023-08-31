
<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Consultation mensualité</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <select
                v-model="selectedMonth"
                @change="filteredEleves"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <!-- <option value=""></option> -->
                <option v-for="month in months" :key="month" :value="month">
                  {{ month }}
                </option>
              </select>
              <select
                v-model="selectedNiveau"
                @change="filteredEleves"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">All Niveau</option>
                <option value=""></option>
              </select>
              <select
                v-model="selectedNiveau"
                @change="filteredEleves"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">Anneé Scolaire</option>
                <option value=""></option>
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
                    <div class="font-semibold text-left">Niveau</div>
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
                <tr v-for="(eleve, index) in filteredEleves" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-800">
                      {{ eleve.nom }} {{ eleve.prenom }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.code }}</div>
                  </td>

                  <!-- parent of eleve-->
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.famille.nom_complet }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ eleve.niveau }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ getFraisScolariteMontant(eleve) }} DHs
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="navigateToPayer"
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
      selectedMonth: "Sept",
      selectedNiveau: "", // Add selectedNiveau
      isLoading: false,
      searchQuery: "",
      eleves: [],
      months: [
        "Sept",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
      ],
    };
  },
  computed: {
    filteredEleves() {
      const query = this.searchQuery.toLowerCase();
      const filteredBySearch = this.eleves.filter((eleve) => {
        return (
          eleve.nom.toLowerCase().includes(query) ||
          eleve.prenom.toLowerCase().includes(query) ||
          eleve.famille.nom_complet.toLowerCase().includes(query)
        );
      });

      if (!this.selectedMonth && !this.selectedNiveau) {
        return filteredBySearch;
      }

      return filteredBySearch.filter((eleve) => {
        return eleve.paiements.some((paiement) => {
          return (
            paiement.status === "Not completed" &&
            paiement.services.some((service) => {
              return (
                service.service === "Frais scolarité" &&
                (!this.selectedMonth ||
                  service.pivot.month === this.selectedMonth) &&
                (!this.selectedNiveau || eleve.niveau === this.selectedNiveau)
              );
            })
          );
        });
      });
    },
    calculateTotalMontant() {
      // Calculate the sum of all montant values in filteredEleves
      const total = this.filteredEleves.reduce(
        (acc, eleve) => acc + this.getFraisScolariteMontant(eleve),
        0,
      );
      return total + " DHs";
    },
  },
  methods: {
    navigateToPayer() {
      this.$router.push({ name: "CreatePaiement" });
    },
    clearFilters() {
      this.searchQuery = "";
    },

    async fetchPaiementsForEleve(eleveId) {
      try {
        const response = await axiosClient.get(
          `/comptable/eleves/${eleveId}/paiements`,
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching paiements:", error);
        return [];
      }
    },
    async fetchEleves() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/comptable/eleves");
        this.eleves = response.data;

        // Fetch associated paiements with services for each eleve
        for (const eleve of this.eleves) {
          eleve.paiements = await this.fetchPaiementsForEleve(eleve.id);
        }

        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching eleves:", error);
        this.isLoading = false;
      }
    },

    getFraisScolariteMontant(eleve) {
      const fraisScolariteService = "Frais scolarité";
      const paiements = eleve.paiements.filter((paiement) => {
        return (
          paiement.status === "Not completed" &&
          paiement.services.some((service) => {
            return (
              service.service === fraisScolariteService &&
              service.pivot.month === this.selectedMonth &&
              service.pivot.paid === 0
            );
          })
        );
      });

      // Get the montant for the frais scolarité service
      const montant = paiements.reduce((totalMontant, paiement) => {
        const fraisScolarite = paiement.services.find((service) => {
          return (
            service.service === fraisScolariteService &&
            service.pivot.month === this.selectedMonth &&
            service.pivot.paid === 0
          );
        });

        // console.log("fraisScolarite, ", fraisScolarite);

        if (fraisScolarite) {
          return totalMontant + fraisScolarite.pivot.price;
        } else {
          return totalMontant;
        }
      }, 0);

      return montant;
    },
  },
  watch: {
    selectedMonth: function (newMonth) {
      this.filteredEleves = this.eleves; // Reset the filteredEleves when the selectedMonth changes
    },
    searchQuery: debounce(function (newQuery) {
      // No need to call performSearch anymore, as computed property handles this
    }, 300),
  },
  mounted() {
    this.fetchEleves(); // Fetch eleves data when the component is mounted
  },
};
</script>
