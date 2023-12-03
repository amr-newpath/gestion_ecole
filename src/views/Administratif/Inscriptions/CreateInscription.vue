<template>
  <section class="py-1 bg-blueGray-50">
    <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
      <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">My Famille</h6>
          </div>
        </div>
        <div v-if="!showPrintStep" class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="my-3">
            <input id="selectedParentDisplay" v-model="selectedParentName"
              class="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              :placeholder="user.pereNomDisabled ? '' : 'Select a Famille...'" :disabled="user.pereNomDisabled" />
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th class="px-4 py-2">Nom Famille</th>
                  <th class="px-4 py-2">Nom Parent</th>
                  <th class="px-4 py-2">Nom eleve</th>
                  <th class="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-4 py-2">
                    <div class="flex items-center">
                      <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                        alt="Avatar">
                      <div class="ml-2 items-center">lahyani</div>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <div class="flex items-center">
                      <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                        alt="Avatar">
                      <div class="ml-2">lahyani</div>
                    </div>
                    <div class="flex items-center">
                      <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                        alt="Avatar">
                      <div class="ml-2">lahyani</div>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <div class="flex items-center">
                      <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                        alt="Avatar">
                      <div class="ml-2">lahyani</div>
                    </div>
                    <div class="flex items-center">
                      <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                        alt="Avatar">
                      <div class="ml-2">lahyani</div>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <div class="btn-group">
                      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-200">more info</button>
                      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-200">modifier</button>
                      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-200">delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="showPrintStep" class="mt-8 p-6 border rounded-lg bg-white shadow">
        <h4 class="text-lg font-semibold mb-2">Form submitted successfully!</h4>
        <p class="text-gray-600 mb-4">Print the form if you want:</p>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button @click="generatePDF"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-200">
            Print PDF
          </button>
          <button @click="goToHomePage"
            class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-gray-200">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axiosClient from "../../../axios";
import jsPDF from "jspdf";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  components: {
    // VueToast,
  },
  data() {
    // console.log(this.selectedParent);

    return {
      parentStatus: "",
      selectedParent: "",
      selectedParentName: "",
      parentId: "",
      annualServices: [],
      monthlyServices: [],
      selectedMonthlyServices: new Set(), // Use a Set to store selected service IDs
      selectedAnnualServices: [],
      // selectedMonthlyServices: [],
      customAnnualPrices: {},
      customMonthlyPrices: {},
      totalMonthlyBudget: 0,
      nationalities: [],
      parents: [],
      filteredParents: [],
      classes: [],
      step: 1,
      showPrintStep: false,
      user: {
        // Step 1: Eleve Information
        nom: "",
        prenom: "",
        code: "",
        dateNaissance: "",
        sexe: "Male",
        nat: "Morocco",
        image: "",
        adresse: "",
        etablissementPre: "",
        anneeScolaire: "",
        classe_id: "",
        situationParents: "Marié",
        niveau: "BAC",

        // Step 2: Pere Information
        pereNom: "",
        perePrenom: "",
        pereCode: "",
        pereProfession: "Enseignant",
        pereNat: "Morocco",
        pereAdresse: "ffff",
        pereSituation: "",
        pereQualite: "",
        pereEmail: "",
        pereTel: "+212 ",
        pereCivilite: "",
        pereGenre: "",

        // Step 3: Mere Information
        mereNom: "",
        merePrenom: "",
        mereCode: "",
        mereProfession: "",
        mereNat: "",
        mereQualite: "",
        mereEmail: "",
        mereTel: "",
        mereCivilite: "",
        mereGenre: "",
      },
      yearOptions: ["2023/2024", "2024/2025", "2025/2026", "2026/2027"],
    };
  },
  computed: {
    // defaultYear() {
    //   const currentYear = new Date().getFullYear();
    //   return this.yearOptions.find((option) => {
    //     return option.split("/")[0] === currentYear.toString();
    //   });
    // },
  },
  watch: {
    yearOptions: {
      immediate: true,
      handler(options) {
        const currentYear = new Date().getFullYear();
        const defaultYear = options.find((option) =>
          option.startsWith(currentYear.toString())
        );
        this.user.anneeScolaire = defaultYear;
      },
    },
  },
  methods: {
    openImageUploader() {
      // Access the file input directly using the ref
      this.$refs.imageInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // You can display the uploaded image, for example:
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.image = e.target.result;
        };

        reader.readAsDataURL(file);

        // You can also handle the file upload here and send it to your server if needed.
      }
    },
    formatDateForDatabase() {
      if (this.user.dateNaissance) {
        const dateParts = this.user.dateNaissance.split("-");
        this.user.dateNaissance = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      }
    },
    nextStep() {
      this.step = Math.min(this.step + 1, 4);
    },
    prevStep() {
      this.step = Math.max(this.step - 1, 1);
    },
    fetchServices() {
      axiosClient
        .get("/services")
        .then((response) => {
          const services = response.data;
          this.annualServices = services.filter(
            (service) => service.type === "annuel"
          );

          // for (const service of this.annualServices) {
          //   this.customAnnualPrices[service.id] = (2000.0).toFixed(2);
          // }

          this.monthlyServices = services.filter(
            (service) => service.type === "mensuel"
          );

          // for (const service of this.monthlyServices) {
          //   if (service.service === "Transport")
          //     this.customMonthlyPrices[service.id] = (400.0).toFixed(2);
          //   else {
          //     this.customMonthlyPrices[service.id] = (1700.0).toFixed(2);
          //   }
          // }
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
        });
    },
    toggleMonthlyService(serviceId) {
      if (this.selectedMonthlyServices.has(serviceId)) {
        this.selectedMonthlyServices.delete(serviceId);
      } else {
        this.selectedMonthlyServices.add(serviceId);
      }
      this.calculateTotalMonthlyBudget();
    },

    calculateTotalMonthlyBudget() {
      let total = 0;
      for (const serviceId of this.selectedMonthlyServices) {
        if (this.customMonthlyPrices[serviceId]) {
          total += parseFloat(this.customMonthlyPrices[serviceId]);
        }
      }
      this.totalMonthlyBudget = total.toFixed(2); // Update total monthly budget
    },
    // async fetchNiveaux(){
    //   try {
    //     const response = await axiosClient.get("/classes"); // Replace with your Laravel API endpoint
    //     this.classes = response.data;
    //     this.user.classe = this.classes[0].nom
    //   } catch (error) {
    //     console.error("Error fetching niveaux:", error);
    //   }
    // },
    fetchClasses() {
      axiosClient
        .get("/classes")
        .then((response) => {
          this.classes = response.data;
          this.user.classe_id = this.classes[0].id;
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    },
    async fetchParents() {
      try {
        const response = await axiosClient.get("/administratif/parents"); // Replace with your Laravel API endpoint
        this.parents = response.data;

        // console.log(this.parents);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    },
    filterParents() {
      if (!this.selectedParent) {
        this.filteredParents = [];
        return;
      }
      this.filteredParents = this.parents.filter((parent) =>
        parent.nom_complet
          .toLowerCase()
          .includes(this.selectedParent.toLowerCase())
      );
    },
    selectParent(parent) {
      this.selectedParent = parent.id;
      this.parentId = parent.id

      // console.log("parentId, ",);
      this.selectedParentName = parent.nom_complet;
      this.populateParentForm();
      this.filteredParents = []; // Clear the filteredParents
      this.selectedParent = "";
    },

    async populateParentForm() {
      if (!this.selectedParent) {
        return;
      }

      try {
        const response = await axiosClient.get(
          `/administratif/parents/${this.selectedParent}`
        );
        const parent = response.data;

        // Populate and disable Pere Information fields
        for (const field in this.user) {
          if (field.startsWith("pere")) {
            // this.user[field] = parent[field];
            this.user.pereNom = parent.nom;
            this.user.perePrenom = parent.prenom;
            this.user.pereProfession = parent.profession;
            this.user.pereNat = parent.nat;
            this.user.pereQualite = parent.qualite;
            this.user.pereAdresse = parent.adresse;
            this.user.pereSituation = parent.situation;
            this.user.pereEmail = parent.email;
            this.user.pereTel = parent.tel;
            this.user.pereCivilite = parent.civilite;
            this.user.nom = parent.nom;
            this.user.adresse = parent.adresse;
            // this.user.situationParents = parent.situation;
            this.user[`${field}Disabled`] = true;
          }
        }
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
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
    async submitForm() {
      try {
        // console.log("parentId, ");

        this.user.nom = this.user.pereNom;
        this.user.adresse = this.user.pereAdresse;
        // this.user.situationParents = this.user.pereSituation;
        // this.user.classe_id = 1

        // console.log(this.user.image);

        this.formatDateForDatabase();

        let requestData = {
          ...this.user,

          parent_option: this.parentStatus,
          parentId: this.parentId,
          selectedAnnualServices: this.selectedAnnualServices,
          customAnnualPrices: this.customAnnualPrices,
          selectedMonthlyServices: Array.from(this.selectedMonthlyServices),
          customMonthlyPrices: this.customMonthlyPrices,
          // code: this.user.code,
          // nom: this.user.nom,
          // prenom: this.user.prenom
        };

        console.log("requestData, ", requestData);

        const response = await axiosClient.post(
          "/administratif/inscription/create",
          requestData
        );

        // console.log('response, ', response);

        if (response.status === 200) {
          console.log("Form submitted successfully:", response.data);
          this.showPrintStep = true;

          $toast.success("Form submitted successfully", {
            position: "bottom-right",
            duration: 3000,
          });
        } else {
          console.error("Form submission failed:", response.data);

          $toast.error("Form submission failed", {
            position: "bottom-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);

        $toast.error("An error occurred", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    },
    goToHomePage() {
      this.$router.push({ name: "AdministratifDashboard" });
    },
    generatePDF() {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor("#0096cb");
      doc.text("Student Information", 10, 10);

      const userData = this.user;
      const userKeys = Object.keys(userData);

      let yPos = 30;

      // Eleve Information
      doc.setFontSize(16);
      doc.setTextColor("#f8ce03");
      doc.text("Eleve Information", 10, yPos);
      yPos += 10;

      for (const key of userKeys) {
        if (
          key !== "parentStatus" &&
          key !== "parentId" &&
          key !== "pereNom" &&
          key !== "perePrenom" &&
          key !== "mereNom" &&
          key !== "merePrenom"
        ) {
          doc.setFontSize(12);
          doc.setTextColor("#000000");
          doc.text(`${this.formatLabel(key)}: ${userData[key]}`, 15, yPos);
          yPos += 10;
        }
      }

      // Pere Information
      // if (this.user.parentStatus === "new")   {
      yPos += 5;
      doc.setFontSize(16);
      doc.setTextColor("#0096cb");
      doc.text("Pere Information", 10, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Nom: ${this.user.pereNom}`, 15, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Prénom: ${this.user.perePrenom}`, 15, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Code: ${this.user.pereCode}`, 15, yPos);
      yPos += 10;

      // Add more Pere Information fields here
      // }

      // Mere Information
      // if (this.user.parentStatus === "new") {
      yPos += 5;
      doc.setFontSize(16);
      doc.setTextColor("#0096cb");
      doc.text("Mere Information", 10, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Nom: ${this.user.mereNom}`, 15, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Prénom: ${this.user.merePrenom}`, 15, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Code: ${this.user.mereCode}`, 15, yPos);
      yPos += 10;

      // Add more Mere Information fields here
      // }

      // Save the PDF document
      doc.save("fiche_de_renseignements.pdf");
    },

    formatLabel(label) {
      return label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },
  },
  created() {
    this.fetchParents();
    this.fetchNationalities();
    this.fetchServices();
    this.fetchClasses();
    // this.fetchNiveaux()
  },
};
</script>

<style scoped>
.d1 {
  display: flex;
}
</style>

<!-- !! Step 3: Mere Information -->
<!-- <form v-if="step === 3">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Mere Information
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereNom"
                  >
                    Nom
                  </label>
                  <input
                    id="mereNom"
                    type="text"
                    v-model="user.mereNom"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="merePrenom"
                  >
                    Prénom
                  </label>
                  <input
                    id="merePrenom"
                    type="text"
                    v-model="user.merePrenom"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereCode"
                  >
                    Code
                  </label>
                  <input
                    id="mereCode"
                    type="text"
                    v-model="user.mereCode"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereProfession"
                  >
                    Profession
                  </label>
                  <input
                    id="mereProfession"
                    type="text"
                    v-model="user.mereProfession"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereNat"
                  >
                    Nat
                  </label>
                  <input
                    id="mereNat"
                    type="text"
                    v-model="user.mereNat"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereQualite"
                  >
                    Qualité
                  </label>
                  <input
                    id="mereQualite"
                    type="text"
                    v-model="user.mereQualite"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereEmail"
                  >
                    Email
                  </label>
                  <input
                    id="mereEmail"
                    type="email"
                    v-model="user.mereEmail"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereTel"
                  >
                    Tel
                  </label>
                  <input
                    id="mereTel"
                    type="tel"
                    v-model="user.mereTel"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereCivilite"
                  >
                    Civilité
                  </label>
                  <input
                    id="mereCivilite"
                    type="text"
                    v-model="user.mereCivilite"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="mereGenre"
                  >
                    Genre
                  </label>
                  <input
                    id="mereGenre"
                    type="text"
                    v-model="user.mereGenre"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
          </form> -->
