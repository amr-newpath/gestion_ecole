<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-24 py-8">
      <h1 class="text-3xl font-semibold mb-4">Add Payment</h1>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label class="block font-semibold mb-2">Select Eleve:</label>
          <!-- <div class="relative">
            <select
              v-model="selectedEleve"
              @change="fetchPaymentHistory"
              class="border rounded-md p-2 w-full appearance-none bg-white focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
            >
              <option value="">Select an Eleve</option>
              <option v-for="eleve in eleves" :key="eleve.id" :value="eleve.id">
                {{ eleve.prenom }} {{ eleve.nom }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 00-.707.293L6.586 6.586a1 1 0 101.414 1.414L10 5.414l2.293 2.293a1 1 0 101.414-1.414L10.707 3.293A1 1 0 0010 3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div> -->

          <div class="relative w-full mb-8">
            <input
              v-model="selectedEleve"
              @input="filterEleves"
              @focus="filteredEleves = []"
              class="border rounded-md p-2 w-full appearance-none bg-white focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
              placeholder="Search for an Eleve..."
            />
            <ul
              v-if="filteredEleves.length"
              class="absolute z-10 mt-1 w-full bg-white border border-blue-300 rounded-lg shadow-md"
            >
              <li
                v-for="eleve in filteredEleves"
                :key="eleve.id"
                @click="selectEleve(eleve)"
                class="cursor-pointer px-4 py-2 hover:bg-blue-100"
              >
                {{ eleve.prenom }} {{ eleve.nom }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-4">
          <button
            @click="showForm = true"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create New Payment
          </button>
        </div>

        <div v-if="showForm" class="mt-4 p-4 border rounded-md">
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Type de service:</label>
            <select v-model="selectedType" class="border p-2 w-full rounded-md">
              <option value="Annuelle">Annuelle</option>
              <option value="Mensuel">Mensuel</option>
            </select>
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Select a Service:</label>
            <select
              v-model="selectedService"
              class="border p-2 w-full rounded-md"
            >
              <option value="">Select a Service</option>
              <option
                v-for="service in filteredServices"
                :key="service.id"
                :value="service.id"
              >
                {{ service.service }}
              </option>
            </select>
          </div>
          <div v-if="isMensuel" class="border-t pt-4">
            <label class="block font-semibold mb-2"
              >Select Multiple Services:</label
            >
            <div
              class="mt-2"
              v-for="(service, index) in selectedServices"
              :key="index"
            >
              <div class="flex items-center">
                <label class="mr-2">{{ service.name }}</label>
                <input
                  v-model="service.price"
                  type="number"
                  class="border p-2 w-16 text-center"
                  placeholder="Price"
                />
                <button
                  @click="removeSelectedService(index)"
                  class="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              @click="addOtherService"
              class="mt-2 text-blue-500 underline cursor-pointer"
            >
              Add Other Service
            </button>
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Total Price:</label>
            <input
              v-model="totalServicePrice"
              type="number"
              class="border p-2 w-full rounded-md"
              disabled
            />
          </div>
          <div v-if="!isMensuel" class="border-t pt-4">
            <label class="block font-semibold mb-2">Price:</label>
            <input
              v-model="price"
              type="number"
              class="border p-2 w-full rounded-md"
            />
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Avance:</label>
            <input
              v-model="avance"
              type="number"
              class="border p-2 w-full rounded-md"
              @input="calculateRest"
            />
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Reste:</label>
            <input
              v-model="reste"
              type="number"
              class="border p-2 w-full rounded-md"
              disabled
            />
          </div>

          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Mode de paiement:</label>
            <select v-model="modePaiement" class="border p-2 w-full rounded-md">
              <option value="Espèce">Espèce</option>
              <option value="Chèque">Chèque</option>
              <option value="TPE">TPE</option>
            </select>
            <input
              v-if="modePaiement === 'Chèque'"
              v-model="referenceNumber"
              type="text"
              class="border p-2 w-full rounded-md mt-2"
              placeholder="Chèque Reference"
            />
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Select Month:</label>
            <select
              v-model="selectedMonth"
              class="border p-2 w-full rounded-md"
            >
              <option v-for="month in months" :key="month">{{ month }}</option>
            </select>
          </div>
          <div class="border-t pt-4">
            <label class="block font-semibold mb-2">Comment:</label>
            <textarea
              v-model="comment"
              class="border p-2 w-full rounded-md"
            ></textarea>
          </div>
          <div class="mt-4">
            <button
              @click="submitPayment"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Payment
            </button>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold mb-2">Payment History:</h2>
          <transition-group name="fade" mode="out-in">
            <div
              v-for="(payment, index) in paymentHistory"
              :key="index"
              class="border p-4 mt-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
            >
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="font-semibold text-blue-500"
                    >Type de service:</span
                  >
                  {{ payment.type }}
                </div>
                <span v-if="payment.paid" class="text-green-500">&#10003;</span>
              </div>
              <div>
                <span class="font-semibold">Services:</span>
                <ul>
                  <li v-for="service in payment.services" :key="service.id">
                    {{ service.service }} - {{ service.pivot.price }}
                  </li>
                </ul>
              </div>
              <div>
                <span class="font-semibold">Price:</span> {{ payment.montant }}
              </div>
              <div>
                <span class="font-semibold">Avance:</span> {{ payment.avance }}
              </div>
              <div>
                <span class="font-semibold">Reste:</span> {{ payment.reste }}
              </div>
              <div>
                <span class="font-semibold">Mode de paiement:</span>
                {{ payment.mode }}
              </div>
              <div>
                <span class="font-semibold">Month:</span> {{ payment.mois }}
              </div>
              <div>
                <span class="font-semibold">Comment:</span>
                {{ payment.comment }}
              </div>
              <span v-bind:class="getStatusClass(payment)">
                {{ getStatusText(payment) }}
              </span>
              <span class="ml-2 text-xl">{{
                getPaymentStatusIcon(payment)
              }}</span>
              <div class="flex items-center space-x-2 mt-4">
                <button
                  @click="printInvoice(payment)"
                  class="flex items-center justify-center px-4 py-2 rounded-md text-blue-500 bg-white hover:bg-blue-50 transition duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <font-awesome-icon
                    :icon="['fas', 'print']"
                    class="h-5 w-5 mr-1"
                  />
                  Print Invoice
                </button>
                <button
                  v-if="payment.reste !== 0"
                  @click="payer(payment)"
                  class="flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                >
                  <font-awesome-icon
                    :icon="['fas', 'dollar-sign']"
                    class="h-5 w-5 mr-1"
                  />
                  Payer
                </button>
              </div>
            </div>
          </transition-group>
          <div
            v-if="isLoadingHistory"
            class="flex justify-center items-center h-32"
          >
            <div
              class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      selectedEleve: "",
      isLoadingHistory: true,
      eleves: [], // Load eleves from API in mounted()
      services: [], // Load services from API in mounted()
      payments: [],
      paymentHistory: [],
      showForm: false,
      selectedType: "",
      selectedService: "",
      price: "",
      totalPrice: "",
      avance: "",
      reste: null,
      selectedServices: [],
      totalServicePrice: 0,
      selectedEleve: "",
      filteredEleves: [],
      modePaiement: "Espèce",
      referenceNumber: "",
      selectedMonth: "",
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
      comment: "",
    };
  },
  computed: {
    isMensuel() {
      return this.selectedType === "Mensuel";
    },
  },
  methods: {
    async fetchEleves() {
      try {
        const response = await axios.get('YOUR_ELEVES_API_ENDPOINT');
        this.eleves = response.data;
      } catch (error) {
        console.error('Error fetching eleves:', error);
      }
    },
    filterEleves() {
      if (!this.selectedEleveName) {
        this.filteredEleves = [];
        return;
      }
      this.filteredEleves = this.eleves.filter(
        (eleve) =>
          eleve.prenom.toLowerCase().includes(this.selectedEleveName.toLowerCase()) ||
          eleve.nom.toLowerCase().includes(this.selectedEleveName.toLowerCase())
      );
    },
    selectEleve(eleve) {
      this.selectedEleve = eleve.id;
      this.selectedEleveName = `${eleve.prenom} ${eleve.nom}`;
      this.filteredEleves = []; // Clear the filteredEleves
      this.fetchPaymentHistory(); // Fetch payment history for the selected eleve
    },
    fetchPaymentHistory() {
      // Implement your payment history fetching logic here
    },
    // filterEleves() {
    //   if (this.selectedEleve === "") {
    //     this.filteredEleves = [];
    //     return;
    //   }

    //   this.filteredEleves = this.eleves.filter((eleve) => {
    //     const fullName = `${eleve.prenom} ${eleve.nom}`.toLowerCase();
    //     return fullName.includes(this.selectedEleve.toLowerCase());
    //   });
    // },
    // selectEleve(eleve) {
    //   this.selectedEleve = eleve.id;
    //   this.filteredEleves = []; 
    //   this.fetchPaymentHistory(); 
    // },
    async payer(payment) {
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

        // Find the index of the updated payment in the paymentHistory array
        const updatedPaymentIndex = this.paymentHistory.findIndex(
          (p) => p.id === payment.id,
        );

        if (updatedPaymentIndex !== -1) {
          // Update the paymentHistory array element directly
          this.paymentHistory[updatedPaymentIndex] = response.data;
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
      doc.text(this.getStatusText(payment), 15, yPos);
      yPos += lineHeight;

      doc.save(`payment_receipt_${payment.id}.pdf`);
    },

    addOtherService() {
      if (this.selectedService) {
        const service = this.services.find(
          (s) => s.id === this.selectedService,
        );
        if (service) {
          this.selectedServices.push({
            id: service.id,
            name: service.service,
            price: 0, // Default price is set to 0, user can input the price
          });
          this.calculateTotalServicePrice();
        }
      }
    },

    removeSelectedService(index) {
      this.selectedServices.splice(index, 1);
      this.calculateTotalServicePrice();
    },

    calculateRest() {
      if (this.price !== "" && this.avance !== "") {
        this.reste = this.price - this.avance;
      } else {
        this.reste = null; // Set "reste" to null if either "price" or "avance" is empty
      }
    },

    calculateTotalServicePrice() {
      this.totalServicePrice = this.selectedServices.reduce(
        (total, service) => total + parseFloat(service.price),
        0,
      );
      this.calculateRest();
    },

    calculateRestMensuel() {
      this.reste = this.totalServicePrice - this.avance;
    },

    getPaymentStatusClass(payment) {
      return payment.reste === 0 ? "border-green-500" : "border-yellow-500";
    },

    getPaymentStatusIcon(payment) {
      return payment.reste === 0 ? "✔️" : "";
    },

    getStatusClass(payment) {
      return payment.reste === 0 ? "text-green-600" : "text-yellow-600";
    },

    getStatusText(payment) {
      return payment.reste === 0 ? "Completed" : "Not completed";
    },

    handleModePaiementChange() {
      if (this.modePaiement !== "Chèque") {
        this.referenceNumber = "";
      }
    },
    async loadEleves() {
      try {
        const response = await axiosClient.get("/comptable/eleves");
        this.eleves = response.data;
      } catch (error) {
        console.error("Error loading eleves:", error);
      }
    },
    async loadServices() {
      try {
        const response = await axiosClient.get("/comptable/services");
        this.services = response.data;
      } catch (error) {
        console.error("Error loading services:", error);
      }
    },
    submitPayment() {
      if (
        this.selectedEleve &&
        this.selectedType &&
        this.avance &&
        this.selectedMonth &&
        this.comment
      ) {
        // Calculate the "reste" property based on the selected payment type
        if (this.isMensuel) {
          this.calculateRestMensuel();
        } else {
          this.calculateRest();
        }

        // Calculate the payment status
        const paymentStatus = this.reste === 0 ? "Completed" : "Not completed";

        // Prepare the data to send to the backend
        const paymentData = {
          eleveId: this.selectedEleve,
          type: this.selectedType,
          avance: this.avance,
          reste: this.reste,
          status: paymentStatus, // Include the payment status
          modePaiement: this.modePaiement,
          selectedMonth: this.selectedMonth,
          comment: this.comment,
        };

        if (this.isMensuel) {
          paymentData.services = this.selectedServices.map((service) => ({
            serviceId: service.id,
            price: service.price,
          }));
          paymentData.totalPrice = this.totalServicePrice; // Add the total price
        } else {
          paymentData.serviceId = this.selectedService;
          paymentData.price = this.price;
          paymentData.totalPrice = this.price; // Add the total price for Annuelle
        }

        // Add the 'numero of cheque' for mode 'Chèque'
        if (this.modePaiement === "Chèque") {
          paymentData.numeroCheque = this.referenceNumber;
        }

        // Send the payment data to the backend
        axiosClient
          .post("/comptable/create-payment", paymentData)
          .then((response) => {
            this.clearForm();
          })
          .catch((error) => {
            // Handle error
            console.error("Error submitting payment:", error);
          });

        this.fetchPaymentHistory();
      } else {
        alert("Please fill in all fields.");
      }
    },
    async fetchPaymentHistory() {
      if (this.selectedEleve) {
        try {
          this.isLoadingHistory = true;
          const response = await axiosClient.get(
            `/comptable/paiements/${this.selectedEleve}`,
          );
          this.paymentHistory = response.data;
        } catch (error) {
          console.error("Error fetching payment history:", error);
        } finally {
          this.isLoadingHistory = false;
        }
      } else {
        this.paymentHistory = []; // Clear payment history when no eleve is selected
      }
    },

    clearForm() {
      this.selectedType = "";
      this.selectedService = "";
      this.price = "";
      this.avance = "";
      this.reste = null; // Reset "reste" to null
      this.modePaiement = "Espèce";
      this.selectedMonth = "";
      this.comment = "";
      this.totalPrice = "";
      this.numeroCheque = "";
    },
  },

  computed: {
    isMensuel() {
      return this.selectedType === "Mensuel";
    },
    filteredServices() {
      if (this.selectedType === "Annuelle") {
        return this.services.filter(
          (service) => service.service === "Frais d'inscription",
        );
      } else if (this.selectedType === "Mensuel") {
        return this.services.filter((service) => service.type === "Mensuel");
      } else {
        return [];
      }
    },
  },

  mounted() {
    this.loadEleves();
    this.loadServices();
    this.fetchPaymentHistory();
  },
};
</script>

<style scoped>
/* Add your Tailwind CSS styles here */

/* 
<template>
  <div>
    <!-- Search Input -->
    <div class="w-full px-4 py-2">
      <input
        id="eleveSearch"
        v-model="selectedEleveName"
        @input="filterEleves"
        @focus="filteredEleves = []"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Search Eleve..."
      />
      <ul
        v-if="filteredEleves.length"
        class="absolute z-10 mt-1 w-full bg-white border border-blueGray-300 rounded-lg shadow-md"
      >
        <li
          v-for="eleve in filteredEleves"
          :key="eleve.id"
          @click="selectEleve(eleve)"
          class="cursor-pointer px-4 py-2 hover:bg-blue-100"
        >
          {{ eleve.prenom }} {{ eleve.nom }}
        </li>
      </ul>
    </div>

    <div class="flex justify-center items-center h-screen bg-gray-100">
      <!-- Selected Eleve Info -->

      <!-- Dropdown Content -->
      <div
        v-if="selectedEleve"
        class="max-w-lg w-full md:w-1/2 mx-2 my-8 mb-4 md:mb-0 overflow-y-auto h-96"
      >
        <div class="p-4 bg-white rounded-md shadow">
          <h3 class="text-lg font-semibold">{{ selectedEleve.name }}</h3>
          <p class="text-gray-600">{{ selectedEleve.niveau }}</p>
          <div class="flex">
            <div class="flex-none mr-4">
              <div v-for="(month, monthIndex) in months" :key="monthIndex">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="selectedEleve.selectedMonths"
                    :value="month"
                    class="mr-2 cursor-pointer"
                  />
                  {{ month }}
                </label>
              </div>
            </div>
            <div class="flex-grow mx-52">
              <div v-for="(month, monthIndex) in months" :key="monthIndex">
                <span class="text-gray-600">{{ getPriceForMonth(month) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Widget: Payment Form -->
      <div class="max-w-xl w-full md:w-1/2 mx-3 p-4 bg-white rounded-md shadow">
        <h3 class="text-lg font-semibold">Payment Form</h3>
        <div class="mt-4">
          <div class="mb-2">
            Total Amount: <span class="font-semibold">{{ totalAmount }}</span>
          </div>
          <div class="flex">
            <div class="flex-grow mr-2">
              <label class="block mb-1">Avance</label>
              <input
                v-model="avance"
                type="text"
                class="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
              />
            </div>
            <div class="flex-grow">
              <label class="block mb-1">Reste</label>
              <input
                v-model="reste"
                type="text"
                class="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="block mb-1">Mode de paiement</label>
            <div class="flex">
              <label class="flex items-center mr-4">
                <input
                  type="radio"
                  v-model="modePaiement"
                  value="Espèce"
                  class="mr-2 cursor-pointer"
                />
                Espèce
              </label>
              <label class="flex items-center mr-4">
                <input
                  type="radio"
                  v-model="modePaiement"
                  value="Chèque"
                  class="mr-2 cursor-pointer"
                />
                Chèque
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="modePaiement"
                  value="TPE"
                  class="mr-2 cursor-pointer"
                />
                TPE
              </label>
            </div>
            <div v-if="modePaiement === 'Chèque'" class="mt-2">
              <label class="block mb-1">Réference number</label>
              <input
                v-model="referenceNumber"
                type="text"
                class="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="block mb-1">Progress</label>
            <div class="relative h-4 bg-gray-300 rounded-md flex items-center">
              <div
                class="absolute h-full bg-green-500 rounded-md"
                :style="{ width: (parseInt(avance) * 100) / totalAmount + '%' }"
              ></div>
              <div
                class="absolute inset-0 flex items-center justify-center text-white"
              >
                {{ (parseInt(avance) * 100) / totalAmount }}% ({{ avance }} /
                {{ totalAmount }})
              </div>
            </div>
          </div>
          <button
            class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition ease-in-out duration-300"
            @click="pay"
          >
            Pay
          </button>
        </div>
      </div>

      <!-- !! Table Form: Services -->
      <!-- <div class="max-w-xl w-full mx-3 mt-6 p-4 bg-white rounded-md shadow">
        <h3 class="text-lg font-semibold">Services</h3>
        <div class="mt-4">
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Service</th>
                <th class="px-4 py-2">Designation</th>
                <th class="px-4 py-2">Frais</th>
              </tr>
            </thead>
            <tbody> -->
      <!-- Add rows dynamically here -->
      <!-- <tr>
                <td class="border px-4 py-2">Service 1</td>
                <td class="border px-4 py-2">Designation 1</td>
                <td class="border px-4 py-2">Frais 1</td>
              </tr> -->
      <!-- ... more rows ... -->
      <!-- </tbody>
          </table>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axiosClient from "../../../axios";

export default {
  data() {
    return {
      selectedEleve: null,
      selectedEleveName: "",
      eleves: [],
      filteredEleves: [],
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
      avance: "",
      reste: "",
      modePaiement: "",
      referenceNumber: "",
    };
  },
  computed: {
    totalAmount() {
      let total = 0;

      return `$${total}`;
    },
  },
  methods: {
    filterEleves() {
      if (!this.selectedEleveName) {
        this.filteredEleves = [];
        return;
      }
      this.filteredEleves = this.eleves.filter(
        (eleve) =>
          eleve.prenom
            .toLowerCase()
            .includes(this.selectedEleveName.toLowerCase()) ||
          eleve.nom
            .toLowerCase()
            .includes(this.selectedEleveName.toLowerCase()),
      );
    },
    async selectEleve(eleve) {
      this.selectedEleve = {
        ...eleve,
        selectedMonths: [], // Initialize selectedMonths for the selected eleve
      };
      this.selectedEleveName = `${eleve.prenom} ${eleve.nom}`;
      this.filteredEleves = []; // Clear the filteredEleves
      await this.fetchServicesForEleve(); // Fetch related services for the selected eleve
    },
    async fetchServicesForEleve() {
      try {
        const response = await axiosClient.get(
          `/comptable/eleves/${this.selectedEleve.id}/services`,
        );
        this.selectedEleve.services = response.data;
        this.calculateTotalPrice();
      } catch (error) {
        console.error("Error loading services:", error);
      }
    },
    calculateTotalPrice() {
      if (
        this.selectedEleve.services &&
        this.selectedEleve.services.length > 0
      ) {
        const mensuelServices = this.selectedEleve.services.filter(
          (service) => service.type === "mensuel",
        );
        let totalPrice = 0;
        mensuelServices.forEach((service) => {
          totalPrice += parseFloat(service.price);
        });
        this.selectedEleve.totalPrice = totalPrice;

        // Calculate the total price for each month based on the total price of services
        this.months.forEach((month) => {
          this.selectedEleve[month] = this.selectedEleve.totalPrice;
        });
      } else {
        this.selectedEleve.totalPrice = 0;
      }
    },
    async loadEleves() {
      try {
        const response = await axiosClient.get("/comptable/eleves");
        this.eleves = response.data;
      } catch (error) {
        console.error("Error loading eleves:", error);
      }
    },
    toggleDropdown(eleve) {
      if (this.selectedEleve === eleve) {
        this.selectedEleve = null; // Close the dropdown
      } else {
        // Hide the previous selectedEleve's dropdown
        if (this.selectedEleve) {
          this.selectedEleve.showDropdown = false;
        }
        // Show the dropdown for the clicked eleve
        this.selectedEleve = eleve;
        this.selectedEleve.showDropdown = true;
      }
    },
    getPriceForMonth(month) {
      return this.selectedEleve ? this.selectedEleve[month] : "";
    },
    pay() {
      console.log("Payment details:", this.avance, this.reste);
    },
  },
  async mounted() {
    await this.loadEleves();
  },
};
</script>

<style scoped>
/* Add any additional styles you want here */


.border-green-500 {
  border-color: #48bb78;
}

.border-yellow-500 {
  border-color: #ecc94b;
}
</style>


