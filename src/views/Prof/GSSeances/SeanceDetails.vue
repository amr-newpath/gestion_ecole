<template>
  <div class="mx-96 my-10 w-2/3">
    <!-- Display detailed seance information here -->
    <div class="seance-container">
      <div
        class="seance-widget"
        v-if="!showStudentList"
        :class="{ 'seance-widget-expanded': showStudentList }"
      >
        <h1 class="text-4xl font-semibold text-center mb-12">Seance Details</h1>

        <p class="seance-title text-center">📚 {{ selectedSeance.objet }}</p>
        <p class="text-center" v-if="selectedSeance.matiere.name">
          ({{ selectedSeance.matiere.name }} - {{ selectedSeance.classe.nom }})
        </p>

        <div class="seance-body mt-6">
          📌
          <div
            class="seance-contenu ml-8 my-4"
            v-html="selectedSeance.contenu"
          ></div>
          📌
        </div>

        <div class="seance-footer mt-10">
          <p class="seance-justification" v-if="selectedSeance.justification">
            💡 <strong>Justification:</strong>
            {{ selectedSeance.justification }}
          </p>
          <p
            :class="{
              'bg-blue-200 text-blue-800 rounded-full w-44 mt-2 text-center':
                selectedSeance.status === 'In progress',
              'bg-green-200 text-green-800 rounded-full w-44 mt-2 py-1 px-2 text-center':
                selectedSeance.status === 'Done',
              'bg-yellow-200 text-yellow-800 rounded-full w-44 mt-2 py-1 px-1 text-center':
                selectedSeance.status !== 'In progress' &&
                selectedSeance.status !== 'Done',
            }"
          >
            <strong>Status:</strong> {{ selectedSeance.status }}
          </p>
        </div>
        <div class="seance-actions mt-12 flex justify-center">
          <button
            @click="toggleStudentList"
            class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Declare the presence
          </button>
        </div>
      </div>

      <!-- Presence Declaration -->
      <transition name="seance-widget-slide">
        <div
          v-if="showStudentList"
          class="seance-widget"
          :class="{ 'seance-widget-expanded': showStudentList }"
        >
          <h1 class="text-4xl font-semibold text-center mb-12">
            Presence Declaration
          </h1>
          <div class="student-list">
            <div v-for="student in students" :key="student.id">
              <input
                class="mx-3"
                type="checkbox"
                v-model="selectedStudents"
                :value="student.id"
                :disabled="student.id"
              />
              <label>{{ student.nom_complet }}</label>
              <!-- <input
                v-if="selectedStudents.includes(student.id)"
                class="mx-2 border rounded-md"
                type="text"
                v-model="student.comments"
                placeholder="Comment"
              /> -->
            </div>
          </div>
          <button
            @click="toggleStudentList"
            class="bg-blue-500 text-white mt-12 px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Back
          </button>
          <button
            @click="declarePresence"
            class="bg-green-500 text-white mt-12 mx-10 px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      selectedSeance: null,
      showStudentList: false,
      students: [],
      selectedStudents: [],
    };
  },
  created() {
    // this.fetchAbsences();

    const seanceId = this.$route.params.id;

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
    toggleStudentList() {
      // Toggle the student list visibility
      this.showStudentList = !this.showStudentList;
      // Fetch the list of students when showing the list
      if (this.showStudentList) {
        axiosClient
          .get(`/prof/classes/${this.selectedSeance.classe.id}/students`)
          .then((response) => {
            this.students = response.data[0].eleves;
            this.fetchAbsences();
          })
          .catch((error) => {
            console.error("Error fetching students:", error);
          });
      }
    },
    declarePresence() {
      if (this.selectedStudents.length === 0) {
        return;
      }

      const requestData = {
        seance_id: this.selectedSeance.id,
        student_ids: this.selectedStudents,
      };

      axiosClient
        .post("/prof/create-absence", requestData)
        .then((response) => {
          $toast.success("Presece declared successfuly!", {
            position: "bottom-right",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error("Error creating absence:", error);
        });
    },
    fetchAbsences() {
      // Fetch absences for the selected seance
      if (this.selectedSeance) {
        const seanceId = this.selectedSeance.id;
        axiosClient
          .get(`/prof/seances/${seanceId}/absences`)
          .then((response) => {
            // Extract the absent student IDs from the response
            const absentStudentIds = response.data.map(
              (absence) => absence.eleve_id
            );

            // Update the selectedStudents array to mark absent students as checked
            this.selectedStudents = absentStudentIds;

            // Update the students array with comments
            this.students.forEach((student) => {
              if (absentStudentIds.includes(student.id)) {
                student.comments = ""; // Initialize comments for absent students
              }
            });
          })
          .catch((error) => {
            console.error("Error fetching absences:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.seance-widget-slide-enter-active,
.seance-widget-slide-leave-active {
  transition: all 0.5s;
}

.seance-widget-slide-enter, .seance-widget-slide-leave-to /* .seance-widget-slide-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}

.seance-widget-expanded {
  transform: translateX(0);
  opacity: 1;
}

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
