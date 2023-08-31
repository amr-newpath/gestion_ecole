<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Student Information</h2>
      <!-- Display user information here -->
      <div v-for="(value, key) in user" :key="key">
        <strong>{{ formatLabel(key) }}:</strong> {{ value }}
      </div>
      <button @click="generatePDF" class="print-button">Print PDF</button>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  props: {
    user: Object,
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Student Information', 10, 10);

      const userKeys = Object.keys(this.user);
      let yPos = 30;

      for (const key of userKeys) {
        doc.setFontSize(12);
        doc.text(`${this.formatLabel(key)}: ${this.user[key]}`, 10, yPos);
        yPos += 10;
      }

      doc.save('student_information.pdf');
    },
    formatLabel(label) {
      return label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    },
  },
};
</script>

<style scoped>
.modal {
  /* Add styles to center the modal on the screen */
  /* Example: */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Add other styles as needed */
}

.modal-content {
  /* Add styles for modal content */
  /* Example: */
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.print-button {
  /* Add styles for the print button */
  /* Example: */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
