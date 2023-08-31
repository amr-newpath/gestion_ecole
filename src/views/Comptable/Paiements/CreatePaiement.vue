<template>
  <div>
    <!-- Search Input -->
    <div class="w-full px-4 py-8 mx-80">
      <span class="text-base font-semibold mx-4">Selectionner un eleve</span>

      <input
        id="eleveSearch"
        v-model="selectedEleveName"
        @input="filterEleves"
        @focus="filteredEleves = []"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/3 ease-linear transition-all duration-150"
        placeholder="Search Eleve..."
      />
      <ul
        v-if="filteredEleves.length"
        class="absolute z-10 mt-1 w-1/4 bg-white border border-blueGray-300 rounded-lg shadow-md mx-48"
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

    <!-- Search Input for Groupe -->
    <!-- !! <div class="w-full px-4 py-2">
      <input
        id="groupeSearch"
        v-model="selectedGroupeName"
        @input="filterGroupes"
        @focus="filteredGroupes = []"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Search Groupe Familiale..."
      />
      <ul
        v-if="filteredGroupes.length"
        class="absolute z-10 mt-1 w-full bg-white border border-blueGray-300 rounded-lg shadow-md"
      >
        <li
          v-for="groupe in filteredGroupes"
          :key="groupe.id"
          @click="selectGroupe(groupe)"
          class="cursor-pointer px-4 py-2 hover:bg-blue-100"
        >
          {{ groupe.nom_complet }}
        </li>
      </ul>
    </div> -->

    <div class="flex justify-center items-center h-screen bg-gray-100">
      <!-- !! <div
        v-if="selectedGroupe"
        class="max-w-lg w-full md:w-1/2 mx-2 my-8 mb-4 md:mb-0 overflow-y-auto h-auto"
      >
        <div
          class="p-4 bg-white rounded-md shadow cursor-pointer"
          @click="toggleDropdown"
        >
          <h3 class="text-lg font-semibold">
            {{ selectedGroupe.nom_complet }}
          </h3>
        </div>
        <div v-if="isDropdownOpen" class="p-4 mt-2 bg-white rounded-md shadow">
          <div v-for="eleve in selectedGroupe.eleves" :key="eleve.id">
            <h4>{{ eleve.prenom }} {{ eleve.nom }}</h4>
            <div class="flex justify">
              <label class="flex items-center mb-2">
                <input
                  type="checkbox"
                  v-model="eleve.selectedFraisInscription"
                  class="mr-2 cursor-pointer"
                  :disabled="isFraisInscriptionExisting()"
                  :style="{
                    'background-color': isFraisInscriptionExisting()
                      ? 'green'
                      : '',
                  }"
                />
                Frais d'inscription
              </label>
              <div class="flex mx-16">
                <span class="text-gray-600"
                  >{{ fraisInscriptionPrice }} DHs</span
                >
              </div>
            </div>
            <hr class="my-2 border-gray-300" />

          </div>
        </div>
      </div> -->

      <!-- Dropdown Content -->
      <div
        v-if="isEleveSelected"
        class="max-w-lg w-full md:w-1/2 mx-2 my-8 mb-4 md:mb-0 overflow-y-auto h-auto"
      >
        <!-- Dropdown header -->
        <div
          class="p-4 bg-white rounded-md shadow cursor-pointer"
          @click="toggleDropdown"
        >
          <h3 class="text-lg font-semibold">
            {{ selectedEleve.prenom }} {{ selectedEleve.nom }}
          </h3>
          <p class="text-gray-600">{{ selectedEleve.niveau }}</p>
        </div>
        <!-- Dropdown Content -->
        <div v-if="isDropdownOpen" class="p-4 mt-2 bg-white rounded-md shadow">
          <div class="flex justify">
            <label class="flex items-center mb-2">
              <input
                type="checkbox"
                v-model="selectedEleve.selectedFraisInscription"
                class="mr-2 cursor-pointer"
                :disabled="isFraisInscriptionExisting()"
                :style="{
                  'background-color': isFraisInscriptionExisting()
                    ? 'green'
                    : '',
                }"
              />
              <span
                :class="{
                  'text-gray-700': !isFraisInscriptionPending(),
                  'text-yellow-500': isFraisInscriptionPending(),
                }"
              >
                Frais d'inscription
                <span
                  v-if="isFraisInscriptionPending()"
                  class="text-yellow-500 ml-1"
                >
                  (pending ...)
                </span>
              </span>
            </label>
            <div class="flex mx-16">
              <span class="text-gray-600">
                {{ fraisInscriptionPrice }} DHs 
                <span v-if="resteFraisInscription" class="text-yellow-500"
                  >- (Reste: {{ resteFraisInscription }})</span
                ></span
              >
            </div>
          </div>
          <hr class="my-2 border-gray-300" />

          <div class="flex justify">
            <div class="flex-none mr-4">
              <div v-for="(month, monthIndex) in months" :key="monthIndex">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="selectedEleve.selectedMonths"
                    :value="month"
                    class="mr-2 cursor-pointer"
                    :disabled="isMonthExisting(month)"
                    :style="{
                      'background-color': isMonthExisting(month) ? 'green' : '',
                    }"
                  />
                  <!-- <span
                    :class="{
                      'text-gray-600': !isMonthPending(month),
                      'text-yellow-500': isMonthPending(month),
                    }"
                  > -->
                  {{ month }}
                  <span
                    v-if="isMonthPending(month)"
                    class="text-yellow-500 ml-2"
                  >
                    (pending ...)
                  </span>
                  <!-- </span> -->
                </label>
              </div>
            </div>
            <div class="flex-grow mx-24">
              <div v-for="(month, monthIndex) in months" :key="monthIndex">
                <span class="text-gray-600">
                  {{ getPriceForMonth(month)
                  }}<span class="mx-2"
                    >DHs 
                    <span v-if="getRestePriceMonth(month)" class="text-yellow-500"
                      >- (Reste: {{ getRestePriceMonth(month) }})</span
                    >
                  </span>
                </span>
              </div>
            </div>
          </div>

          <hr class="my-2 border-gray-300" />

          <label v-if="hasUncompletedPayments" class="flex items-center mb-2">
            <input
              type="checkbox"
              v-model="selectedEleve.selectedCredit"
              class="mr-2 cursor-pointer"
              @change="handleCreditCheckboxChange"
            />
            Crédit
            <span class="mx-28 text-red-600">
              Reste: {{ getTotalUncompletedReste() }} DHs
            </span>
          </label>
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
            <div class="flex flex-wrap">
              <label
                v-for="(paymentMethod, index) in paymentMethods"
                :key="index"
                class="flex items-center mr-4 mb-2"
              >
                <input
                  type="checkbox"
                  v-model="selectedPaymentMethods"
                  :value="paymentMethod"
                  class="mr-2 cursor-pointer"
                />
                {{ paymentMethod }}
                <input
                  v-if="selectedPaymentMethods.includes(paymentMethod)"
                  v-model="paymentMethodPrices[paymentMethod]"
                  type="text"
                  class="ml-2 w-20 border rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
                  placeholder="Price"
                />
                <input
                  v-if="
                    selectedPaymentMethods.includes('Chèque') &&
                    paymentMethod === 'Chèque'
                  "
                  v-model="referenceNumber"
                  type="text"
                  class="ml-2 w-40 border rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-300"
                  placeholder="Réference number"
                />
              </label>
            </div>
          </div>
          <div class="mt-4">
            <label class="block mb-1">Progress</label>
            <div class="relative h-5 bg-gray-300 rounded-md flex items-center">
              <div
                class="absolute h-full bg-green-500 rounded-md"
                :style="{ width: (parseInt(avance) * 100) / totalAmount + '%' }"
              ></div>
              <div
                class="absolute inset-0 flex items-center justify-center text-white"
              >
                {{
                  totalAmount > 0
                    ? ((parseInt(avance) * 100) / totalAmount).toFixed(2)
                    : "0.00"
                }}% ({{ avance }} / {{ totalAmount || "0.00" }})
              </div>
            </div>
          </div>
          <button
            class="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition ease-in-out duration-300"
            @click="submitPayment"
          >
            Payer
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

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      selectedEleve: {
        selectedMonths: [],
        selectedCredit: false,
        services: [], // Initialize services array for the selected eleve
      },
      fraisInscriptionPrice: "",
      resteFraisInscription: "",
      selectedEleveName: "",
      isEleveSelected: false,
      isDropdownOpen: false,
      eleves: [],
      selectedGroupeName: "", // The input field value for Groupe familiale search
      filteredGroupes: [], // Filtered Groupe familiale results
      selectedGroupe: null, // Selected Groupe familiale object
      familles: [],
      paiements: [],
      paymentMethods: ["Espèce", "Chèque", "TPE"],
      selectedPaymentMethods: [],
      paymentMethodPrices: {
        Espèce: "",
        Chèque: "",
        TPE: "",
      },
      fraisInscriptionPaid: false,
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
      avance: "0.00",
      reste: "0.00",
      modePaiement: "",
      referenceNumber: "",
    };
  },
  computed: {
    totalAmount() {
      let sum = 0;

      this.selectedEleve.selectedMonths.forEach((month) => {
        sum += parseFloat(this.selectedEleve[month]);
      });

      if (this.selectedEleve.selectedFraisInscription) {
        sum += parseFloat(this.fraisInscriptionPrice);
      }

      if (this.selectedEleve.selectedCredit) {
        sum += parseFloat(this.creditPrice);
      }

      this.avance = sum.toFixed(2);
      return sum.toFixed(2);
    },

    reste() {
      return (parseFloat(this.totalAmount) - parseFloat(this.avance)).toFixed(
        2
      );
    },

    hasUncompletedPayments() {
      return this.paiements.some(
        (paiement) => paiement.status === "Not completed"
      );
    },

    creditPrice() {
      return this.hasUncompletedPayments
        ? parseFloat(this.getTotalUncompletedReste())
        : 0;
    },
  },
  methods: {
    isMonthPending(month) {
      if (
        this.selectedEleve &&
        this.selectedEleve.selectedMonths &&
        this.paiements
      ) {
        // const paymentData = this.paiements[1]

        // console.log('pending', paymentData);

        const pendingPayments = this.paiements.filter(
          (paiement) => paiement.pending === 1
        );

        // console.log("pendingPayments, ", pendingPayments);

        for (const paiement of pendingPayments) {
          const monthlyService = paiement.services.find(
            (service) =>
              (service.type === "mensuel" &&
                service.service === "Frais scolarité" &&
                service.pivot.month === month) ||
              (service.type === "mensuel" &&
                service.service === "Transport" &&
                service.pivot.month === month)
          );

          if (monthlyService) {
            return true;
          }
        }
      }
      return false;
    },

    isFraisInscriptionPending() {
      if (this.selectedEleve && this.paiements) {
        const pendingPayments = this.paiements.filter(
          (paiement) => paiement.pending === true
        );

        for (const paiement of pendingPayments) {
          const service = paiement.services.find(
            (service) =>
              service.type === "annuel" &&
              service.service === "Frais d'inscription" &&
              service.pivot.month === "Sept"
          );

          if (service) {
            return true;
          }
        }
      }
      return false;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown state
    },
    handleCreditCheckboxChange() {
      if (this.selectedEleve.selectedCredit) {
        this.avance = this.creditPrice.toFixed(2); // Set avance to creditPrice
        this.reste = "0.00";
      } else {
        this.avance = "0.00";
        this.reste = (
          parseFloat(this.totalAmount) - parseFloat(this.avance)
        ).toFixed(2);
      }
    },
    async submitPayment() {
      // Calculate the total avance for the payment
      let totalAvance = parseFloat(this.avance);

      if (this.selectedEleve.selectedCredit) {
        let originalTotalAvance = totalAvance; // Store the original totalAvance value

        const sortedPaiements = this.paiements.slice().sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });

        for (const paiement of sortedPaiements) {
          if (totalAvance <= 0) {
            break; // No more credit to distribute
          }

          if (paiement.status === "Not completed") {
            // Calculate the remaining amount needed to complete this paiement
            const remainingAmount = parseFloat(paiement.reste);

            // Calculate the avance to be applied to this paiement
            const avanceToApply = Math.min(totalAvance, remainingAmount);

            // Update the paiement's avance and reste
            paiement.avance = (
              parseFloat(paiement.avance) + avanceToApply
            ).toFixed(2);
            paiement.reste = (remainingAmount - avanceToApply).toFixed(2);

            // Update the paiement status to "Completed" if the reste becomes zero
            if (paiement.reste <= 0) {
              paiement.status = "Completed";
            }

            await axiosClient.put(`/comptable/update-payment/${paiement.id}`, {
              avance: paiement.avance,
              reste: paiement.reste,
              status: paiement.status,
            });

            totalAvance -= avanceToApply;
          }
        }

        const sortedServices = this.selectedEleve.services
          .slice()
          .sort((a, b) => {
            const priorityOrder = [
              "Frais d'inscription",
              "Frais scolarité",
              "Transport",
            ];

            return (
              priorityOrder.indexOf(a.service) -
              priorityOrder.indexOf(b.service)
            );
          });

        for (const paiement of sortedPaiements) {
          console.log("originalTotalAvance, ", originalTotalAvance);
          if (originalTotalAvance <= 0) {
            break; // No more credit to distribute
          }

          for (const paiementService of paiement.services) {
            if (paiementService.pivot.status === "Not Completed") {
              const remainingServiceAmount = parseFloat(
                paiementService.pivot.reste
              );

              const avanceToApplyToService = Math.min(
                originalTotalAvance,
                remainingServiceAmount
              );

              paiementService.pivot.avance = (
                parseFloat(paiementService.pivot.avance) +
                avanceToApplyToService
              ).toFixed(2);
              paiementService.pivot.reste = (
                remainingServiceAmount - avanceToApplyToService
              ).toFixed(2);

              if (paiementService.pivot.reste <= 0) {
                paiementService.pivot.status = "Completed";
              }

              await axiosClient.put(
                `/comptable/paiementService/${paiementService.pivot.id}`,
                {
                  avance: paiementService.pivot.avance,
                  reste: paiementService.pivot.reste,
                  status: paiementService.pivot.status,
                }
              );

              // Reduce the original total avance by the amount applied to this service paiement
              originalTotalAvance -= avanceToApplyToService;
            }
          }
        }
      }

      if (totalAvance > 0) {
        // Calculate the avance distribution based on the priority
        const avanceDistribution = {};

        let hasChequeMode = false;
        for (const method of this.selectedPaymentMethods) {
          if (method === "Chèque") {
            hasChequeMode = true;
            break;
          }
        }

        // Create a new payment entry in the paiement table
        const paymentData = {
          montant: this.totalAmount,
          avance: this.avance,
          reste: this.reste,
          mode: this.modePaiement,
          num_cheque: this.referenceNumber,
          status: this.reste > 0 ? "Not completed" : "completed",
          pending: hasChequeMode,
          eleve_id: this.selectedEleve.id,
        };

        try {
          const response = await axiosClient.post(
            "/comptable/create-paiement",
            paymentData
          );

          if (response.status === 201) {
            $toast.success("Payment created successfully!", {
              position: "bottom-right",
              duration: 3000,
            });
          }

          const paiementId = response.data.id; // Get the created paiement_id

          // console.log("paiementId, ", paiementId);

          // Create entries in modes table for selected payment methods
          for (const selectedPaymentMethod of this.selectedPaymentMethods) {
            const price = this.paymentMethodPrices[selectedPaymentMethod];
            if (price > 0) {
              const modeData = {
                type: selectedPaymentMethod, // Assuming selectedPaymentMethod is "Espèce", "Chèque", or "TPE"
                montant: price,
                paid: selectedPaymentMethod === "Chèque" ? false : true, // You might need to adjust this based on your logic
                ref:
                  selectedPaymentMethod === "Chèque"
                    ? this.referenceNumber
                    : null,
                paiement_id: paiementId,
              };

              await axiosClient.post("/comptable/create-mode", modeData);
            }
          }

          console.log("paiementId, ", this.selectedEleve.selectedMonths);
          // Create entries in paiement_service table based on selected services and months
          for (const month of this.selectedEleve.selectedMonths) {
            // Check if "Frais d'inscription" checkbox is selected and it's Sept month

            console.log(this.selectedEleve.selectedFraisInscription);
            if (
              this.selectedEleve.selectedFraisInscription &&
              month === "Sept"
            ) {
              const fraisInscriptionService = this.selectedEleve.services.find(
                (service) =>
                  service.type === "annuel" &&
                  service.service === "Frais d'inscription"
              );

              console.log("fraisInscriptionService, ", fraisInscriptionService);

              if (fraisInscriptionService) {
                const price = fraisInscriptionService.pivot.price;
                const avance = Math.min(totalAvance, price);
                const reste = price - avance;

                const status = reste > 0 ? "Not Completed" : "Completed";

                // console.log('fraisInscriptionService.id, ', fraisInscriptionService.id);

                const paiementServiceData = {
                  paiement_id: paiementId,
                  service_id: fraisInscriptionService.id,
                  month: month,
                  price: price,
                  avance: avance,
                  reste: reste,
                  status: status,
                  paid: avance > 0,
                };

                await axiosClient.post(
                  "/comptable/create-paiement-service",
                  paiementServiceData
                );

                totalAvance -= avance;
              }
            }

            // Distribute avance on "Frais scolarité" service
            const selectedFraisScolariteService =
              this.selectedEleve.services.find(
                (service) =>
                  service.type === "mensuel" &&
                  service.service === "Frais scolarité"
              );

            if (selectedFraisScolariteService) {
              const avance = Math.min(
                totalAvance,
                selectedFraisScolariteService.pivot.price
              );
              avanceDistribution[selectedFraisScolariteService.id] = avance;
              totalAvance -= avance;
            }

            // Distribute avance on "Transport" service
            const selectedTransportService = this.selectedEleve.services.find(
              (service) =>
                service.type === "mensuel" && service.service === "Transport"
            );

            if (selectedTransportService) {
              const avance = Math.min(
                totalAvance,
                selectedTransportService.pivot.price
              );
              avanceDistribution[selectedTransportService.id] = avance;
              totalAvance -= avance;
            }

            // Create entries in paiement_service table for selected services and month
            for (const service of this.selectedEleve.services) {
              if (
                avanceDistribution.hasOwnProperty(service.id) ||
                (service.type === "mensuel" &&
                  (service.service === "Frais scolarité" ||
                    service.service === "Transport"))
              ) {
                const price = service.pivot.price;
                const avance = avanceDistribution[service.id] || 0;
                const reste = price - avance;

                const status = reste > 0 ? "Not Completed" : "Completed";

                const paiementServiceData = {
                  paiement_id: paiementId,
                  service_id: service.id,
                  month: month,
                  price: price,
                  avance: avance,
                  reste: reste,
                  status: status,
                  paid: avance > 0,
                };

                await axiosClient.post(
                  "/comptable/create-paiement-service",
                  paiementServiceData
                );
              }
            }
          }

          // goToHomePage();

          // Payment and paiement_service entries created successfully
          // console.log("Payment created:", response.data);
          $toast.success("Payment created successfully!", {
            position: "bottom-right",
            duration: 3000,
          });
          // You might want to perform additional actions, show a success message, etc.
        } catch (error) {
          // console.error("Error creating payment:", error);
          $toast.error("An error occurred", {
            position: "bottom-right",
            duration: 3000,
          });
        }
      }
    },

    // goToHomePage() {
    //   this.$router.push({ name: "ComptableDashboard" });
    // },

    // getResteFraisInscription() {
    //   for (const paiement of this.paiements) {
    //     if (
    //       paiement.status === "Not completed" &&
    //       paiement.services &&
    //       paiement.services.length > 0
    //     ) {
    //       let fraisInscriptionService = paiement.services.find(
    //         (service) => service.service === "Frais d'inscription"
    //       );

    //       if (fraisInscriptionService && fraisInscriptionService.pivot) {
    //         console.log(
    //           "fraisInscriptionService, ",
    //           fraisInscriptionService.pivot.reste
    //         );

    //         this.resteFraisInscription = fraisInscriptionService.pivot.reste;
    //       }
    //     }
    //   }

    //   return this.resteFraisInscription;
    // },

    async fetchPaiementsWithServices() {
      try {
        const response = await axiosClient.get(
          `/comptable/eleves/${this.selectedEleve.id}/paiements`
        );
        this.paiements = response.data;

        // console.log("this.paiements, ", this.paiements);

        for (const paiement of this.paiements) {
          if (
            paiement.status === "Not completed" &&
            paiement.services &&
            paiement.services.length > 0
          ) {
            let fraisInscriptionService = paiement.services.find(
              (service) => service.service === "Frais d'inscription"
            );

            if (fraisInscriptionService && fraisInscriptionService.pivot) {
              // console.log(
              //   "fraisInscriptionService, ",
              //   fraisInscriptionService.pivot.reste
              // );

              this.resteFraisInscription = fraisInscriptionService.pivot.reste;
            }
          }
        }

        // console.log("resteFraisInscription, ", this.resteFraisInscription);

        // this.getResteFraisInscription();

        // Check if "Frais d'inscription" is already paid
        // this.fraisInscriptionPaid = this.isF raisInscriptionPaid();
      } catch (error) {
        console.error("Error fetching paiements:", error);
      }
    },

    isFraisInscriptionExisting() {
      for (const paiement of this.paiements) {
        for (const paiementService of paiement.services) {
          // console.log('paiementService.service, ', paiementService.service);

          if (
            paiementService.type === "annuel" &&
            paiementService.service === "Frais d'inscription"
          ) {
            return true;
          }
        }
      }
      return false;
    },

    isMonthExisting(month) {
      // Iterate through the paiement_service data associated with each paiement
      for (const paiement of this.paiements) {
        for (const paiementService of paiement.services) {
          if (paiementService.pivot.month === month) {
            // console.log(
            //   "paiementService.pivot.month, ",
            //   paiementService.pivot.month,
            // );

            return true;
          }
        }
      }
      return false;
    },

    getTotalUncompletedReste() {
      let totalReste = 0;
      for (const paiement of this.paiements) {
        if (paiement.status === "Not completed") {
          totalReste += parseFloat(paiement.reste);
        }
      }
      return totalReste.toFixed(2);
    },

    async fetchFamilles() {
      try {
        const response = await axiosClient.get("/comptable/parents");
        this.familles = response.data; // Assuming the API response is an array of famille objects
      } catch (error) {
        console.error("Error loading familles:", error);
      }
    },

    // selectGroupe(groupe) {
    //   this.selectedGroupe = groupe;
    //   this.selectedEleve = null; // Clear selected eleve
    //   this.fetchElevesForGroupe(groupe.id); // Fetch eleves for the selected groupe
    // },

    // filterGroupes() {
    //   if (!this.selectedGroupeName) {
    //     this.filteredGroupes = [];
    //     return;
    //   }

    //   // Filter the famille results based on the search input
    //   this.filteredGroupes = this.familles.filter((famille) =>
    //     famille.nom_complet
    //       .toLowerCase()
    //       .includes(this.selectedGroupeName.toLowerCase()),
    //   );
    // },

    // async fetchElevesForGroupe(groupeId) {
    //   try {
    //     const response = await axiosClient.get(
    //       `/comptable/parents/${groupeId}/eleves`,
    //     );
    //     this.selectedGroupe.eleves = response.data;
    //     // Fetch paiements for each eleve
    //     for (const eleve of this.selectedGroupe.eleves) {
    //       await this.fetchPaiementsForEleve(eleve);
    //     }
    //   } catch (error) {
    //     console.error("Error loading eleves for groupe:", error);
    //   }
    // },

    async fetchPaiementsForEleve(eleve) {
      try {
        const response = await axiosClient.get(
          `/comptable/paiements/${eleve.id}`
        );
        eleve.paiements = response.data;

        // console.log('eleve.paiements, ', eleve.paiements);
      } catch (error) {
        console.error("Error loading paiements for eleve:", error);
      }
    },

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
          eleve.nom.toLowerCase().includes(this.selectedEleveName.toLowerCase())
      );
    },

    async selectEleve(eleve) {
      this.selectedEleve = {
        ...eleve,
        selectedMonths: [],
        services: [], // Initialize services array for the selected eleve
      };
      this.selectedEleveName = `${eleve.prenom} ${eleve.nom}`;
      this.filteredEleves = [];
      await this.fetchServicesForEleve();
      await this.fetchPaiementsWithServices();
      this.isEleveSelected = true;
      this.isDropdownOpen = true;
    },

    async fetchServicesForEleve() {
      try {
        const response = await axiosClient.get(
          `/comptable/eleves/${this.selectedEleve.id}/services`
        );
        this.selectedEleve.services = response.data;
        this.calculateTotalPrice();
        this.calculateFraisInscriptionPrice();
      } catch (error) {
        console.error("Error loading services:", error);
      }
    },

    calculateFraisInscriptionPrice() {
      const fraisInscriptionService = this.selectedEleve.services.find(
        (service) =>
          service.type === "annuel" && service.service === "Frais d'inscription"
      );

      // console.log("fraisInscriptionService, ", fraisInscriptionService);

      // getResteFraisInscription()

      if (fraisInscriptionService) {
        this.fraisInscriptionPrice = parseFloat(
          fraisInscriptionService.pivot.price
        );
      } else {
        this.fraisInscriptionPrice = 0;
      }
    },

    getRestePriceMonth(month) {
      for (const paiement of this.paiements) {
        if (
          paiement.status === "Not completed" &&
          paiement.services &&
          paiement.services.length > 0
        ) {
          const mensuelServices = paiement.services.filter(
            (service) =>
              service.type === "mensuel" && service.pivot.month === month
          );

          let totalPrice = 0;

          // console.log("this.selectedEleve[month], ", this.selectedEleve[month]);

          // if(mensuelServices === []){
          //   return this.selectedEleve[month]
          // }

          // console.log('mensuelServices, ', this.isMonthExisting(month));

          // let totarRest = 0;
          mensuelServices.forEach((service) => {
            if (service.pivot.month)
              totalPrice += parseFloat(service.pivot.reste);
            // totalReste += parseFloat(service.pivot.reste)
          });

          console.log(this.selectedEleve.selectedMonths);

          if (this.isMonthExisting(month) && totalPrice === 0) return this.selectedEleve[month];

          // console.log('mensuelServices, ', totalPrice);

          // this.selectedEleve.totalPrice = totalPrice;

          return totalPrice;

          // this.months.forEach((month) => {
          //   this.selectedEleve[month] = totalPrice;
          // });
        } else {
          return 0;
        }
      }
    },

    calculateTotalPrice() {
      if (
        this.selectedEleve.services &&
        this.selectedEleve.services.length > 0
      ) {
        const mensuelServices = this.selectedEleve.services.filter(
          (service) => service.type === "mensuel"
        );
        let totalPrice = 0;

        // let totarRest = 0;
        mensuelServices.forEach((service) => {
          totalPrice += parseFloat(service.pivot.price);
          // totalReste += parseFloat(service.pivot.reste)
        });
        this.selectedEleve.totalPrice = totalPrice;

        this.months.forEach((month) => {
          this.selectedEleve[month] = totalPrice;
        });
      } else {
        this.selectedEleve.totalPrice = 0;
      }
    },

    getPriceForMonth(month) {
      return this.selectedEleve ? this.selectedEleve[month] : "";
    },

    async loadEleves() {
      try {
        const response = await axiosClient.get("/comptable/eleves");
        this.eleves = response.data;
      } catch (error) {
        console.error("Error loading eleves:", error);
      }
    },
  },

  async mounted() {
    this.loadEleves();
    await this.fetchPaiementsWithServices();
    this.handleCreditCheckboxChange();
    // await this.fetchFamilles();
  },
};
</script>

<style scoped>
/* Add any additional styles you want here */
</style>
