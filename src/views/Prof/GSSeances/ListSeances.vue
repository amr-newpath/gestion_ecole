<template>
  <div
    class="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg max-w-screen-lg"
  >
    <h1 class="text-2xl font-semibold mb-4">Seances</h1>
    <div class="mb-8 flex justify-center">
      <button
        @click="openCreateSeanceModal"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create New Seance
      </button>
    </div>
    <div class="flex mb-10 justify-center space-x-4">
      <select
        v-model="selectedClasse"
        class="px-8 py-2 border rounded-md focus:outline-none"
      >
        <option value="">Filter by Classe</option>
        <option v-for="classe in classes" :key="classe.id" :value="classe.id">
          {{ classe.nom }} ({{ classe.niveau }})
        </option>
      </select>
      <select
        v-model="selectedMatiere"
        @change="filteredSeances"
        class="px-8 py-2 border rounded-md focus:outline-none"
      >
        <option value="">Filter by Matiere</option>
        <option
          v-for="matiere in matieres"
          :key="matiere.id"
          :value="matiere.id"
        >
          {{ matiere.name }}
        </option>
      </select>
    </div>
    <hr class="mb-10" />

    <!-- Create Seance Modal -->
    <div
      v-if="isCreateSeanceModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white w-full md:max-w-xl p-6 rounded-lg shadow-lg z-10">
        <h2 class="text-2xl font-semibold mb-4">Create New Seance</h2>
        <form @submit.prevent="createSeance">
          <div class="mb-4">
            <label for="objet" class="block text-sm mb-2 font-medium"
              >Objet</label
            >
            <input
              v-model="newSeance.objet"
              type="text"
              id="objet"
              class="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="contenu" class="block text-sm mb-2 font-medium"
              >Contenu</label
            >
            <QuillEditor
              v-model:content="newSeance.contenu"
              contentType="html"
              placeholder="Write your content here..."
              theme="snow"
              style="height: 100px; max-height: 150px; overflow-y: auto"
            ></QuillEditor>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-sm mb-2 font-medium"
              >Type</label
            >
            <select
              v-model="newSeance.type"
              id="type"
              class="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="Cours">Cours</option>
              <option value="Exercices">Exercices</option>
              <option value="TP">TP</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="matiere" class="block text-sm mb-2 font-medium"
              >Matiere</label
            >
            <select
              v-model="newSeance.matiere_id"
              id="matiere"
              class="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Matiere</option>
              <option
                v-for="matiere in matieres"
                :key="matiere.id"
                :value="matiere.id"
              >
                {{ matiere.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="classe" class="block text-sm mb-2 font-medium"
              >Classe</label
            >
            <select
              v-model="newSeance.classe_id"
              id="classe"
              class="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Classe</option>
              <option
                v-for="classe in classes"
                :key="classe.id"
                :value="classe.id"
              >
                {{ classe.nom }}
              </option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              @click="closeCreateSeanceModal"
              class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>

    <transition-group
      name="fade"
      tag="div"
      class="flex flex-col items-center justify-center"
    >
      <div
        v-for="seance in filteredSeances"
        :key="seance.id"
        class="w-2/4 bg-gray-100 p-4 rounded-lg shadow-md mb-4 transition-transform transform hover-list"
        @click="showSeanceDetails(seance)"
      >
        <router-link
          :to="{ name: 'seance-details', params: { id: seance.id } }"
        >
          <div class="mb-4 cursor-pointer">
            <p class="text-lg text-center font-semibold mb-4">
              Objet: {{ seance.objet }}
            </p>
            <p><strong>Matiere:</strong> {{ seance.matiere.name }}</p>
            <p><strong>Classe:</strong> {{ seance.classe.nom }}</p>
            <p v-if="seance.justification">
              <strong>Justification:</strong> {{ seance.justification }}
            </p>
            <p
              :class="
                seance.status === 'In progress'
                  ? 'bg-blue-200 text-blue-800 rounded-full w-44 mt-2 text-center'
                  : seance.status === 'Done'
                  ? 'bg-green-200 text-green-800 rounded-full w-44 mt-2 py-1 px-2  text-center'
                  : 'bg-yellow-200 text-yellow-800 rounded-full w-44 mt-2 py-1 px-1  text-center'
              "
            >
              <strong>Status:</strong> {{ seance.status }}
            </p>
          </div>
        </router-link>
        <div class="flex mt-10 space-x-2">
          <!-- Display the "Delayed" button only if the status is "In progress" -->
          <button
            v-if="seance.status === 'In progress'"
            @click="delaySeance(seance)"
            class="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Delayed
          </button>
          <button
            v-if="seance.status === 'In progress'"
            @click="completeSeance(seance)"
            class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Done
          </button>
        </div>
        <div
          v-if="
            seance.status === 'In progress' && seance.showJustificationInput
          "
        >
          <input
            v-model="seance.justification"
            placeholder="Enter justification"
            class="border p-2 mt-2 w-full rounded-md"
          />
          <button
            @click="saveJustification(seance)"
            class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import axiosClient from "@/axios";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      selectedSeance: null,
      selectedClasse: "",
      selectedMatiere: "",
      isCreateSeanceModalOpen: false,
      seances: [],
      matieres: [],
      classes: [],
      newSeance: {
        objet: "",
        contenu: "",
        type: "Cours",
        matiere_id: "",
        classe_id: "",
      },
    };
  },
  created() {
    this.fetchMatieres();
    this.fetchClasses();
    this.fetchSeances();
  },
  computed: {
    showSeanceDetails(seance) {
      this.selectedSeance = seance;
    },
    filteredSeances() {
      let filteredSeances = this.seances;

      if (this.selectedClasse) {
        filteredSeances = filteredSeances.filter(
          (seance) => seance.classe.id === this.selectedClasse
        );

        console.log("filteredSeances, ", filteredSeances);
      }

      // console.log("filteredSeances,", filteredSeances);

      if (this.selectedMatiere) {
        filteredSeances = filteredSeances.filter(
          (seance) => seance.matiere.id === this.selectedMatiere
        );
      }

      return filteredSeances;
    },
  },
  methods: {
    showSeanceDetails(seance) {
      this.selectedSeance = seance;
    },

    fetchClasses() {
      axiosClient
        .get("/prof/classes")
        .then((response) => {
          this.classes = response.data;

          this.selectedClasse = this.classes[0].id;
          // console.log(this.selectedClasse.nom);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    },
    async fetchMatieres() {
      try {
        const response = await axiosClient.get("/prof/matieres");
        this.matieres = response.data;
      } catch (error) {
        console.error("Error fetching Matieres:", error);
      }
    },
    async fetchSeances() {
      try {
        const response = await axiosClient.get("/prof/seances");
        this.seances = response.data;
      } catch (error) {
        console.error("Error fetching seances:", error);
      }
    },
    openCreateSeanceModal() {
      this.isCreateSeanceModalOpen = true;
      this.newSeance.classe_id = this.selectedClasse;
      this.newSeance.matiere_id = this.selectedMatiere;

      console.log(
        "newSeance.contenu when modal opens:",
        this.newSeance.contenu
      );
    },
    closeCreateSeanceModal() {
      this.isCreateSeanceModalOpen = false;
    },
    createSeance() {
      const requestData = {
        objet: this.newSeance.objet,
        contenu: this.newSeance.contenu,
        status: "In progress",
        justification: "",
        type: this.newSeance.type,
        matiere_id: this.newSeance.matiere_id,
        classe_id: this.newSeance.classe_id,
      };

      axiosClient
        .post("/prof/create-seance", requestData)
        .then((response) => {
          $toast.success("Seance created successfuly!", {
            position: "bottom-right",
            duration: 3000,
          });

          this.isCreateSeanceModalOpen = false;

          this.newSeance = {
            objet: "",
            contenu: "",
            type: "Cours",
            matiere_id: "",
            classe_id: "",
          };

          this.fetchSeances();
        })
        .catch((error) => {
          console.error("Error creating seance:", error);
        });
    },

    delaySeance(seance) {
      seance.showJustificationInput = true;
    },

    async completeSeance(seance) {
      try {
        const response = await this.updateSeance(seance.id, { status: "Done" });

        Object.assign(seance, response.data);
      } catch (error) {
        console.error("Error updating seance status:", error);
      }
    },

    async saveJustification(seance) {
      try {
        const response = await this.updateSeance(seance.id, {
          status: "Delayed",
          justification: seance.justification,
        });

        Object.assign(seance, response.data);

        seance.showJustificationInput = false;
      } catch (error) {
        console.error("Error updating seance status and justification:", error);
      }
    },

    async updateSeance(seanceId, data) {
      try {
        const response = await axiosClient.put(
          `/prof/seances/${seanceId}`,
          data
        );

        $toast.success("Seance updated successfuly!", {
          position: "bottom-right",
          duration: 3000,
        });

        this.fetchSeances();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style>
.hover-list:hover {
  transform: scale(1.01);
  transition: transform 0.2s ease;
}
</style>
