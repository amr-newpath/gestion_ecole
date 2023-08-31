<template>
  <section class="py-1 bg-blueGray-50">
    <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">My account</h6>
            <!-- <button
              class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button> -->
          </div>
        </div>
        <div v-if="!showPrintStep" class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <!-- Step 1: Pere Information -->
          <form v-if="step === 1">
            <!-- Pere Information -->
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Pere Information
            </h6>

            <!-- Select Parent Option (Search Bar) -->
            <div class="mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="selectedParentDisplay"
              >
                Selected Parent
              </label>
              <input
                id="selectedParentDisplay"
                v-model="selectedParentName"
                class="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                :placeholder="user.pereNomDisabled ? '' : 'Select a parent...'"
                :disabled="user.pereNomDisabled"
              />
            </div>

            <!-- Select Parent Option (Search Bar) -->
            <div class="relative w-full mb-3">
              <input
                id="parentSelect"
                v-model="selectedParent"
                @input="filterParents"
                @focus="filteredParents = []"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Search parent..."
              />
              <ul
                v-if="filteredParents.length"
                class="absolute z-10 mt-1 w-full bg-white border border-blueGray-300 rounded-lg shadow-md"
              >
                <li
                  v-for="parent in filteredParents"
                  :key="parent.id"
                  @click="selectParent(parent)"
                  class="cursor-pointer px-4 py-2 hover:bg-blue-100"
                >
                  {{ parent.nom_complet }}
                </li>
              </ul>
            </div>

            <!-- Pere Form Fields -->
            <div class="flex flex-wrap">
              <!-- ... rest of the form fields ... -->

              <!-- Nom -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="pereNom"
                  >
                    Nom
                  </label>
                  <input
                    id="pereNom"
                    type="text"
                    :value="user.pereNom"
                    :disabled="user.pereNomDisabled"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="pereNom"
                  >
                    Prenom
                  </label>
                  <input
                    id="perePrenom"
                    type="text"
                    :value="user.perePrenom"
                    :disabled="user.perePrenomDisabled"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="pereNom"
                  >
                    Profession
                  </label>
                  <input
                    id="perePrenom"
                    type="text"
                    :value="user.pereProfession"
                    :disabled="user.pereProfessionDisabled"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="pereNom"
                  >
                    Nat
                  </label>
                  <input
                    id="pereNat"
                    type="text"
                    :value="user.pereNat"
                    :disabled="user.pereNatDisabled"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <!-- ... rest of the form fields ... -->
            </div>

            <!-- ... rest of the form ... -->
          </form>

          <div class="flex justify-end mt-6">
            <button
              v-if="step > 1"
              @click="prevStep"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
            >
              Previous
            </button>
            <button
              v-if="step < 4"
              @click="nextStep"
              class="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
            >
              Next
            </button>
            <button
              v-if="step === 4"
              @click="submitForm"
              class="ml-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="showPrintStep"
        class="mt-8 p-6 border rounded-lg bg-white shadow"
      >
        <h4 class="text-lg font-semibold mb-2">Form submitted successfully!</h4>
        <p class="text-gray-600 mb-4">Print the form if you want:</p>
        <div class="flex space-x-4">
          <button
            @click="generatePDF"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            Print PDF
          </button>
          <button
            @click="goToHomePage"
            class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-gray-200"
          >
            Go to Home
          </button>
        </div>
      </div>
      <!-- <div
        v-if="showPrintStep"
        class="mt-8 p-6 border rounded-lg bg-white shadow"
      >
        <h4 class="text-lg font-semibold mb-2">Form submitted successfully!</h4>
        <p class="text-gray-600 mb-4">Print the form if you want:</p>
        <button
          @click="generatePDF"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Print PDF
        </button>
      </div> -->
    </div>
  </section>
</template>

<script>
import axiosClient from "../../../axios";
// import UserInfoModal from '@/components/UserInfoModal';
import jsPDF from "jspdf";

export default {
  data() {
    return {
      parentStatus: "",
      selectedParent: "",
      selectedParentName: "",
      parents: [],
      filteredParents: [],
      step: 1,
      showPrintStep: false,
      user: {
        // Step 1: Eleve Information
        nom: "",
        prenom: "",
        code: "",
        dateNaissance: "",
        sexe: "",
        nat: "",
        adresse: "",
        etablissementPre: "",
        anneeScolaire: "",
        classe: "",
        situationParents: "",
        niveau: "",

        // Step 2: Pere Information
        pereNom: "",
        perePrenom: "",
        pereCode: "",
        pereProfession: "",
        pereNat: "",
        pereQualite: "",
        pereEmail: "",
        pereTel: "",
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
    };
  },
  methods: {
    nextStep() {
      this.step = Math.min(this.step + 1, 4);
    },
    prevStep() {
      this.step = Math.max(this.step - 1, 1);
    },
    async fetchParents() {
      try {
        const response = await axiosClient.get("/administratif/parents");
        this.parents = response.data;
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    },
    // Filter parents based on search input
    filterParents() {
      if (!this.selectedParent) {
        this.filteredParents = [];
        return;
      }
      this.filteredParents = this.parents.filter((parent) =>
        parent.nom_complet
          .toLowerCase()
          .includes(this.selectedParent.toLowerCase()),
      );
    },

    // Select a parent and populate form
    selectParent(parent) {
      this.selectedParent = parent.id;
      this.selectedParentName = parent.nom_complet;
      this.populateParentForm();
      this.filteredParents = []; // Clear the filteredParents
      this.selectedParent = ''
    },
    
    async populateParentForm() {
      if (!this.selectedParent) {
        return;
      }

      try {
        const response = await axiosClient.get(
          `/administratif/parents/${this.selectedParent}`,
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
            // this.user.pereQualite = parent.qualite;
            // this.user.pereEmail = parent.email;
            // this.user.pereCivilite = parent.civilite;
            this.user[`${field}Disabled`] = true;
          }
        }
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    },
    // selectParent(parent) {
    //   this.selectedParent = parent.id;
    //   this.selectedParentName = parent.nom_complet;
    //   this.populateParentForm();
    //   this.selectParent = ''
    // },
    async submitForm() {
      try {
        let requestData = {
          ...this.user,
          parent_option: this.parentStatus,
          parentId: this.selectedParent,
        };

        const response = await axiosClient.post(
          "/administratif/inscription/create",
          requestData,
        );

        if (response.status === 200) {
          console.log("Form submitted successfully:", response.data);
          this.showPrintStep = true;
        } else {
          console.error("Form submission failed:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    goToHomePage() {
      this.$router.push({ name: "HomeInscription" });
    },
    generatePDF() {
      // Implement PDF generation logic here
    },
    formatLabel(label) {
      return label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },
  },
  created() {
    this.fetchParents();
  },
};
</script>

<style></style>
