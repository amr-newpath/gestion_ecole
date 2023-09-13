<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h2 class="modal-title">Declare Presence</h2>
      <div class="student-list">
        <div v-for="student in students" :key="student.id">
          <input type="checkbox" v-model="selectedStudents" :value="student.id" />
          <label>{{ student.nom_complet }}</label>
        </div>
      </div>
      <button @click="declarePresence" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";

export default {
  props: {
    showModal: Boolean,
    seance: Object, // Pass the selected seance data
  },
  data() {
    return {
      students: [], // Store the list of students
      selectedStudents: [], // Store the selected students
    };
  },
  watch: {
    showModal(newValue) {
      if (newValue) {
        // Fetch the list of students for the class related to the seance
        axiosClient
          .get(`/prof/classes/${this.seance.classe.id}/students`)
          .then((response) => {
            this.students = response.data[0].eleves;
            console.log('this.students, ', response.data[0].eleves[0]);
          })
          .catch((error) => {
            console.error("Error fetching students:", error);
          });
      }
    },
  },
  methods: {
    declarePresence() {
      // Implement your logic to declare presence for selected students
      // You can use this.selectedStudents array to get the IDs of selected students
      // and make an API request to record their presence for the seance
      // After successfully declaring presence, you can close the modal
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Define modal styles here */
</style>
