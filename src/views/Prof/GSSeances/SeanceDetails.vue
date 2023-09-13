<template>
  <div class="mx-96 my-12 w-2/3">
    <!-- Display detailed seance information here -->
    <div class="seance-widget" v-if="selectedSeance">
      <h1 class="text-4xl font-semibold text-center mb-12">Seance Details</h1>

      <!-- Display seance title -->
      <p class="seance-title text-center">📚 {{ selectedSeance.objet }}</p>
      <p class="text-center" v-if="selectedSeance.matiere.name">
        ({{ selectedSeance.matiere.name }} - {{ selectedSeance.classe.nom }})
      </p>

      <!-- Display seance body -->
      <div class="seance-body mt-6">
        📌 
         <div class="seance-contenu ml-8 my-4" v-html="selectedSeance.contenu"></div>
         📌
      </div>

      <!-- Display justification and status at the bottom -->
      <div class="seance-footer mt-10">
        <p class="seance-justification" v-if="selectedSeance.justification">
          💡 <strong>Justification:</strong> {{ selectedSeance.justification }}
        </p>
        <p
          :class="{
            'bg-blue-200 text-blue-800 rounded-full w-44 mt-2 text-center':
              selectedSeance.status === 'In progress',
            'bg-green-200 text-green-800 rounded-full w-44 mt-2 py-1 px-2  text-center':
              selectedSeance.status === 'Done',
            'bg-yellow-200 text-yellow-800 rounded-full w-44 mt-2 py-1 px-1  text-center':
              selectedSeance.status !== 'In progress' &&
              selectedSeance.status !== 'Done',
          }"
        >
          <strong>Status:</strong> {{ selectedSeance.status }}
        </p>
      </div>
      <div class="seance-actions mt-12 flex justify-center">
        <!-- Buttons for Edit and Delete -->
        <button
          @click="declarePresence"
          class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
        >
          Declare the precence
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";

export default {
  data() {
    return {
      selectedSeance: null, // Track the selected seance for display
    };
  },
  created() {
    // Fetch the seance details based on the route parameter :id
    const seanceId = this.$route.params.id;

    // Implement your logic to fetch the seance details here
    // For example, you can make an API request to get seance details
    axiosClient
      .get(`/prof/seances/${seanceId}`)
      .then((response) => {
        this.selectedSeance = response.data;
      })
      .catch((error) => {
        console.error("Error fetching seance details:", error);
      });
  },
  methods: {

  },
};
</script>

<style scoped>
/* Add your CSS styling for the widget here */
.seance-widget {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
}

.seance-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.seance-body {
  margin-bottom: 10px;
}

.seance-footer {
  display: flex;
  flex-direction: column;
}

.seance-justification {
  margin: 0;
  font-size: 1rem;
}

/* Add your button styles here */
.seance-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.edit-button {
  background-color: #3490dc;
  color: #fff;
}

.delete-button {
  background-color: #e3342f;
  color: #fff;
}
</style>
