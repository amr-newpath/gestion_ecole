<template>
  <div class="border p-4 my-4">
    <div>
      <button @click="toggleServiceType" class="bg-blue-500 text-white px-2 py-1 rounded-md mb-2">Service Type</button>
      <div v-if="showServiceType" class="mb-2">
        <label class="block font-semibold">Select Service Type:</label>
        <select v-model="selectedServiceType" class="border p-1 w-full">
          <option value="service_annuelle">Service Annuelle</option>
          <option value="service_menuelle">Service Menuelle</option>
        </select>
      </div>
    </div>
    <div>
      <label class="block font-semibold">Service:</label>
      <select v-model="selectedService" class="border p-1 w-full">
        <option v-for="service in availableServices" :key="service.id" :value="service">{{ service.name }}</option>
      </select>
    </div>
    <div class="mt-2">
      <label class="block font-semibold">Price:</label>
      <input v-model.number="payment.price" type="number" class="border p-1 w-full">
    </div>
    <div class="mt-4">
      <button @click="submitPayment" class="bg-green-500 text-white px-4 py-2 rounded-md">Submit Payment</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['eleve'],
  data() {
    return {
      showServiceType: false,
      selectedServiceType: '',
      selectedService: null,
      payment: {
        price: 0
      }
    };
  },
  computed: {
    availableServices() {
      // Fetch and return available services from your database
      // Replace this with your actual service fetching logic
      return [
        { id: 1, name: 'Frais d\'inscription' },
        // Add more services as needed
      ];
    }
  },
  methods: {
    toggleServiceType() {
      this.showServiceType = !this.showServiceType;
      this.selectedServiceType = '';
    },
    submitPayment() {
      // Create and submit the payment data to your backend
      const paymentData = {
        eleveId: this.eleve.id,
        serviceId: this.selectedService.id,
        price: this.payment.price
        // Add more fields as needed
      };

      // Send paymentData to your backend API
      // Example: axios.post('/api/payments', paymentData)
      console.log('Payment Data:', paymentData);
      
      // Clear form
      this.showServiceType = false;
      this.selectedServiceType = '';
      this.selectedService = null;
      this.payment.price = 0;
    }
  }
};
</script>
