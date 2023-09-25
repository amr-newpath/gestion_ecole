<template>
  <div
    class="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg max-w-screen-lg"
  >
    <h1 class="text-2xl font-semibold mb-4">Seances</h1>
    <div class="flex mb-10 justify-center space-x-4">
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
          :to="{ name: 'eleve-seance-details', params: { id: seance.id } }"
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
      </div>
    </transition-group>
  </div>
</template>

<script>
import axiosClient from "@/axios";

export default {
  data() {
    return {
      selectedSeance: null,
      selectedMatiere: "",
      seances: [],
      matieres: [],
    };
  },
  mounted() {
    // window.Echo.private(
    //   // "notification"
    //   "App.Models.User." + sessionStorage.getItem("userId")
    // ).notification((notification) => {
    //   $toast.success("Payment created successfully!", {
    //         position: "bottom-right",
    //         duration: 3000,
    //       });
    // });
  },
  created() {
    this.fetchMatieres();
    this.fetchSeances();

    // window.Echo.private(
    //   // "notification"
    //   "notification"
    // ).notification((notification) => {
    //   console.log(notification);
    //   alert("notification, ", notification)
    // });
  },
  computed: {
    showSeanceDetails(seance) {
      this.selectedSeance = seance;
    },
    filteredSeances() {
      let filteredSeances = this.seances;

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

    async fetchMatieres() {
      try {
        const response = await axiosClient.get("/eleve/matieres");
        this.matieres = response.data;
      } catch (error) {
        console.error("Error fetching Matieres:", error);
      }
    },
    async fetchSeances() {
      try {
        const response = await axiosClient.get("/eleve/seances");
        this.seances = response.data;
      } catch (error) {
        console.error("Error fetching seances:", error);
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
