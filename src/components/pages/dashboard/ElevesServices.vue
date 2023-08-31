<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Bar Chart for number of eleves per service -->
    <div class="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h1 class="text-xl font-semibold my-5">Number of eleves per service</h1>
      <canvas id="serviceChart"></canvas>
      <!-- <div></div> -->
    </div>

    <!-- <div></div> -->


    <!-- Progress Bars for number of eleves per month -->
    <div class="grid gap-4">
      <div v-for="(month, index) in months" :key="index" class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-2">{{ month }}</h3>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                {{ numberCounts[index] }} Eleves
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-teal-600">
                {{ percentageCounts[index] }}%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-2 mb-2 text-xs flex rounded bg-teal-200">
            <div :style="{ width: percentageCounts[index] + '%' }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import Chart from "chart.js/auto";

// import SalesSection from '@/components/pages/dashboard/SalesSection.vue'


export default {
  // components(){
  //   return {
  //     SalesSection
  //   }
  // },
  data() {
    return {
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
      numberCounts: [],
      percentageCounts: [],
      totalElevesCount: 0, // Replace with actual total eleves count
    };
  },
  async mounted() {
    await this.fetchElevesWithServices();
    await this.fetchFraisScolariteNumber();

  },
  methods: {
    async fetchElevesWithServices() {
      try {
        const response = await axiosClient.get("/comptable/services");
        const services = response.data;

        const serviceNames = services.map((service) => service.service);
        const elevesCounts = services.map((service) => service.eleves.length);

        // Generate different colors for each service
        const backgroundColors = [
          "rgba(52, 144, 220, 0.8)",
          "rgba(85, 197, 106, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          // Add more colors if needed
        ];

        // Calculate the total number of eleves
        const totalEleves = elevesCounts.reduce(
          (total, count) => total + count,
          0,
        );

        this.totalElevesCount = totalEleves;

        // Calculate the percentage for each service
        const percentages = elevesCounts.map((count) =>
          ((count / totalEleves) * 100).toFixed(2),
        );

        // Create the Bar Chart
        const serviceCtx = document
          .getElementById("serviceChart")
          .getContext("2d");
        new Chart(serviceCtx, {
          type: "bar",
          data: {
            labels: serviceNames,
            datasets: [
              {
                label: "Number of Eleves",
                data: elevesCounts,
                backgroundColor: backgroundColors,
                borderRadius: 10, // Set border radius for the bars
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Eleves",
                },
              },
            },
            animation: {
              duration: 1500,
              easing: "easeInOutQuart",
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const count = context.parsed.y;
                    const percentage = percentages[context.dataIndex];
                    return `${count} Eleves (${percentage}%)`;
                  },
                },
              },
            },
          },
        });

        // Fetch and display the Line Chart for Frais Scolarité percentage per month
        await this.fetchFraisScolaritePercentage();
      } catch (error) {
        console.error("Error loading services:", error);
      }
    },
    async fetchFraisScolariteNumber() {
      try {
        const numberCounts = await Promise.all(
          this.months.map(async (month) => {
            const response = await axiosClient.get(`/comptable/services-frais-scolarite/${month}`);
            return response.data.paidElevesCount;
          })
        );

        const percentageCounts = numberCounts.map(count => ((count / this.totalElevesCount) * 100).toFixed(2));

        this.numberCounts = numberCounts;
        this.percentageCounts = percentageCounts;
      } catch (error) {
        console.error("Error loading Frais Scolarité data:", error);
      }
    }
  },
};
</script>
