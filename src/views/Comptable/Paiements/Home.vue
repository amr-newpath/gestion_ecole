<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Paiements</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                @input="performSearch"
                placeholder="Search"
                class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
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

              <select
                v-model="selectedStatus"
                @change="performFilter"
                class="px-2 py-1 border rounded-md focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Not completed">Non completed</option>
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
                    <div class="font-semibold text-left">Date</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Eleve</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Montant</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Avance</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Reste</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Mode Paiement</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Status</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Pending</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Services</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Comment</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(payment, index) in filteredPayments" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      {{ formatDate(payment.created_at) }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-800">
                      {{ payment.eleve.prenom }} {{ payment.eleve.nom }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.montant }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.avance }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.reste }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.mode }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div :class="getStatusClass(payment)">
                      {{ payment.status }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.pending == 1 }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">
                      <ul>
                        <li
                          v-for="service in payment.services"
                          :key="service.id"
                        >
                          {{ service.service }} - {{ service.pivot.price }}
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ payment.comment }}</div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="printInvoice(payment)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-blue-500 bg-white hover:bg-blue-50 transition duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'print']"
                          class="h-5 w-5 mr-1"
                        />
                        Print
                      </button>
                      <button
                        v-if="payment.reste !== 0"
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

import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      isLoading: true,
      paginatedList: [],
      searchQuery: "",
      selectedType: "",
      selectedMode: "",
      selectedStatus: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    navigateToPayer() {
      this.$router.push({ name: "CreatePaiement" });
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    },
    async payPayment(payment) {
      if (payment.reste === 0) {
        alert("This payment is already completed.");
        return;
      }

      const updatedPayment = {
        avance: payment.montant,
        reste: 0,
        status: "Completed",
      };

      try {
        const response = await axiosClient.put(
          `/comptable/update-payment/${payment.id}`,
          updatedPayment,
        );

        // Find the index of the updated payment in the paginatedList array
        const updatedPaymentIndex = this.paginatedList.findIndex(
          (p) => p.id === payment.id,
        );

        if (updatedPaymentIndex !== -1) {
          // Update the paginatedList array element directly
          this.paginatedList[updatedPaymentIndex] = response.data;
        }

        alert("Payment completed successfully.");
      } catch (error) {
        console.error("Error completing payment:", error);
      }
    },
    printInvoice(payment) {
      const doc = new jsPDF();
      const fontSize = 14;
      const lineHeight = fontSize * 1.25;
      const titleFontSize = fontSize * 1.5;
      const headingFontSize = fontSize * 1.2;

      doc.setFontSize(fontSize);
      doc.setFontSize(titleFontSize * 1.25);
      doc.setTextColor("#f8ce03");
      doc.text("Payment Receipt", 105, 15, { align: "center" });

      let yPos = 40;

      // Title
      doc.setTextColor("#0096cb");
      doc.setFontSize(titleFontSize);
      doc.text("Payment Details", 15, yPos);
      yPos += lineHeight;

      // Content
      doc.setTextColor("#000000");
      doc.setFontSize(headingFontSize);
      doc.text(`Type de service: ${payment.type}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text("Services:", 15, yPos);
      yPos += lineHeight;

      payment.services.forEach((service) => {
        doc.text(`${service.service} - ${service.pivot.price}`, 20, yPos);
        yPos += lineHeight;
      });

      doc.setFontSize(headingFontSize);
      doc.text(`Price: ${payment.montant}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Avance: ${payment.avance}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Reste: ${payment.reste}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Mode de paiement: ${payment.mode}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Month: ${payment.mois}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Comment: ${payment.comment}`, 15, yPos);
      yPos += lineHeight;

      doc.setFontSize(headingFontSize);
      doc.text(`Status: ${payment.status}`, 15, yPos);
      yPos += lineHeight;

      // Save the PDF with a unique name
      doc.save(`payment_receipt_${payment.id}.pdf`);
    },

    formatHumanDate(date) {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    },
    getStatusClass(payment) {
      return payment.reste === 0
        ? "bg-green-200 text-green-800 rounded-full py-1 px-3  text-center"
        : "bg-yellow-200 text-yellow-800 rounded-full py-1 px-3 text-center";
    },
    async fetchPayments() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/comptable/paiements");
        this.paginatedList = response.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        this.isLoading = false;
      }
    },
    editPayment(index) {
      // Implement edit logic here
    },
    deletePayment(index) {
      // Implement delete logic here
    },
    performSearch() {
      if (this.searchQuery.trim() === "") {
        this.fetchPayments(); // Reset to full list if search query is empty
      } else {
        this.isLoading = true;
        axiosClient
          .get("/comptable/paiements", {
            params: { search: this.searchQuery },
          })
          .then((response) => {
            this.paginatedList = response.data;
          })
          .catch((error) => {
            console.error("Error searching payments:", error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },

    performFilter() {
      this.isLoading = true;
      const filterParams = {
        type: this.selectedType,
        mode: this.selectedMode,
        status: this.selectedStatus,
      };

      axiosClient
        .get("/comptable/paiements", {
          params: { ...filterParams, search: this.searchQuery },
        })
        .then((response) => {
          this.paginatedList = response.data;
        })
        .catch((error) => {
          console.error("Error filtering payments:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    clearFilters() {
      this.searchQuery = "";
      this.selectedType = "";
      this.selectedMode = "";
      this.selectedStatus = "";
      this.fetchPayments();
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
  },
  computed: {
    filteredPayments() {
      const filteredList = this.paginatedList.filter((payment) => {
        const statusMatch =
          !this.selectedStatus || payment.status === this.selectedStatus;
        const searchMatch =
          payment.eleve.prenom
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          payment.eleve.nom
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        const isInDateRange = this.isDateInRange(payment.created_at);

        return statusMatch && searchMatch && isInDateRange;
      });

      return filteredList;
    },
  },
  mounted() {
    this.fetchPayments();
  },
};
</script>
