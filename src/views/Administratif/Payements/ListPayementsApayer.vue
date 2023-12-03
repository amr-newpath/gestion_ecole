<template>
    <section class="py-1 bg-blueGray-50 my-5">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <h6 class="text-blueGray-700 text-xl font-bold p-3">Liste Paiements à Payer</h6>
                <!-- Table responsive wrapper -->
                <div class="overflow-x-auto bg-white dark:bg-neutral-700 p-10">

                    <div class="relative m-[2px] mb-3 mr-5 float-left">
                        <label for="inputSearch" class="sr-only">Search </label>
                        <input id="inputSearch" type="text" placeholder="Search..." v-model="searchQuery" @input="search"
                            class="block w-52 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-4 w-4 text-neutral-500 dark:text-neutral-200">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                    </div>

                    <table class="min-w-full text-left text-xs whitespace-nowrap">

                        <thead
                            class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t">
                            <tr>

                                <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                                    v-for="(column, index) in columns" :key="index">{{ column }}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(Period, index) in displayedItems" :key="index"
                                class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">

                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.eleve.famille.nom }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.eleve.nom }}</td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.eleve.prenom }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.eleve.niveau }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.date_debit }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.date_fin }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.eleveservice.service.service }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.period }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.montant }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.echiance }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.date_payment }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    Period.Rest_payee }}
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                                    {{ Period.status }}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <pagination :totalItems="listPeriods.length" :itemsPerPage="itemsPerPage"
                        @page-changed="handlePageChange">
                    </pagination>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axiosClient from "../../../axios";
import Pagination from '@/components/Pagination.vue'
export default {
    components: {
        Pagination,
    },
    data() {
        return {

            columns: [
                'Nom Famille',
                'nom',
                'prenom',
                'niveau',
                'date debit',
                'date fin',
                'nom service',
                'Period',
                'Montant',
                'date echiance',
                'Date Paiment',
                'Rest à payer',
                'Status',
            ],
            // paiements
            listPeriods: [],
            eleve_service_period: {
                date_debit: null,
                date_fin: null,
                montant: null,
                period: null,
                status: null,
                Rest_payee: 0,
                isPayer: false,
                eleve_service_id: null,
                echiance: null,
                date_payment: null
            },
            searchQuery: '',
            itemsPerPage: 10,
            currentPage: 1,
        }
    },
    computed: {
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.listPeriods.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.getAllPeriods();
    },
    methods: {
        async getAllPeriods() {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period`);
                this.listPeriods = response.data;

            } catch (error) {
                console.error("Error fetching list Periods:", error);
            }
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                location.reload();
                return;
            }

            this.listPeriods = this.listPeriods.filter((period) => {
                const fullName = `${period.eleveservice.eleve.famille.nom} ${period.eleveservice.eleve.nom} ${period.eleveservice.eleve.prenom} ${period.eleveservice.eleve.niveau} ${period.eleveservice.date_debit} ${period.eleveservice.date_fin} ${period.eleveservice.service.service} ${period.period} ${period.montant} ${period.echiance} ${period.date_payment} ${period.Rest_payee} ${period.status}`.toLowerCase();
                return fullName.includes(query);
            });
        },
    },
}
</script>
<style scoped>
#btn1s {
    all: unset;
    background-color: #33d16d;
    padding-left: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 15px;
    margin-top: 10px;
    color: #fff;
    border-radius: 10px;
}

#btn2s {
    all: unset;
    background-color: #00c2d0;
    padding-left: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 15px;
    margin-top: 10px;
    color: #fff;
    border-radius: 10px;
}

#btn1s:hover {
    background-color: #33d970;
    cursor: pointer;
}

#btn2s:hover {
    background-color: #0ad1df;
    cursor: pointer;
}

#btn3s {
    all: unset;
    background-color: #ebc51d;
    padding-left: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 15px;
    margin-top: 10px;
    color: #fff;
    border-radius: 10px;
}

#btn3s:hover {
    background-color: #f5ce21;
    cursor: pointer;
}

/* .top-100 {
    top: 100%
}

.bottom-100 {
    bottom: 100%
}

.max-h-select {
    max-height: 300px;
} */
</style>