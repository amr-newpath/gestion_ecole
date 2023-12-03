<template>
    <section class="py-1 bg-blueGray-50 my-5">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <h6 class="text-blueGray-700 text-xl font-bold p-3">Liste Paiements en Retard</h6>
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
                    <div id="modal-group-p1" uk-modal>
                        <form method="post" @submit.prevent="addPayment" class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header">
                                <h4 class="uk-modal-title">Ajoute Paiment</h4>
                            </div>
                            <div class="uk-modal-body pb-0">
                                <div class="w-full px-3 mb-2 sm:h-1/2">
                                    <label class="block text-sm font-medium text-gray-600 mb-2">Montant:</label>
                                    <input v-model="payement.montant" class="w-full my-3 px-3 py-2 border rounded-md"
                                        required />
                                </div>
                                <div class="w-full px-3 mb-2 sm:h-1/2">
                                    <label class="block text-sm font-medium text-gray-600 mb-2">Date Payer:</label>
                                    <input v-model="payement.date_paye" class="w-full my-3 px-3 py-2 border rounded-md"
                                        type="date" />
                                </div>
                                <div class="w-full px-3 mb-2 sm:h-1/2">
                                    <label for="mode" class="block text-sm font-medium text-gray-600 mb-2">Modes</label>
                                    <select v-model="payement.payment_method_id" id="mode" required
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="mode in listPaymentMethod" :key="mode.id" :value="mode.id">{{
                                            mode.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-2 sm:w-3/3">
                                    <label for="remarque"
                                        class="block text-sm font-medium text-gray-600 mb-2">Remarque</label>
                                    <textarea id="remarque"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="payement.remarque" cols="30" rows="2" required></textarea>
                                </div>

                            </div>
                            <div class="w-full px-3  lg:p-0 sm:w-3/3 ">
                                <div class="uk-modal-footer uk-text-right">
                                    <button class="uk-button uk-button-default uk-modal-close" type="button"
                                        id="btn2s">Cancel</button>
                                    <button type="submit" class="uk-button uk-button-primary mx-3"
                                        id="btn2s">ajouter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <table class="min-w-full text-left text-xs whitespace-nowrap">

                        <thead
                            class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t">
                            <tr>
                                <th scope="col" class="px-6 py-6 border-x dark:border-neutral-600">
                                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox" id="checkboxNoLabel" v-model="isCheckAll" @change="checkAll"
                                            aria-label="..." />
                                    </div>
                                </th>
                                <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                                    v-for="(column, index) in columns" :key="index">{{ column }}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(Period, index) in displayedItems" :key="index"
                                class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                                <th scope="row" class="px-6 py-6 border-x dark:border-neutral-600">

                                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox" id="checkboxNoLabel" v-model="Period.eleveservice.eleve.checked"
                                            @change="checkaddone(Period)" aria-label="..." />
                                    </div>
                                </th>
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
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                                    <div class="btn mr-1" style="color:#0098ca;" type="button" @click="payer(Period.id)">
                                        <span>payer</span>
                                    </div>
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
            payement: {
                date_paye: null,
                montant: 0,
                remarque: null,
                eleve_service_period_id: null,
                payment_method_id: null,
            },
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
                'Action',
            ],
            // paiements
            currentDate: this.getCurrentDate(),
            listPaymentMethod: [],
            listFamilles: [],
            listEleves: [],
            listNiveaux: ['homme', 'femme', 'nv3'],
            listStatus: ['paiements en cours', 'paiements en retard', 'paiements à venir', 'paiements à partiel', 'payées en avances', 'payées à temps', 'payées en retards'],
            listPeriodsold: [],
            listPeriods: [],
            isCheckAll: false,
            selectedItems: [],
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
            f_famille_id: null,
            f_eleve_id: null,
            f_niveau: null,
            f_status: null,
            isFilter: false,
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
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        payer(id) {
            this.payement.eleve_service_period_id = id;
            UIkit.modal('#modal-group-p1').show();
        },
        async updatePeriod(id) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/${id}`);
                this.eleve_service_period = response.data;
                this.eleve_service_period.Rest_payee = this.eleve_service_period.montant - this.payement.montant;
                this.eleve_service_period.montant = this.eleve_service_period.Rest_payee;
                if (this.eleve_service_period.Rest_payee == 0) {
                    if (this.payement.date_paye < response.data.date_payment) {
                        this.eleve_service_period.status = 'payées en avances';
                    } else if (this.payement.date_paye >= this.eleve_service_period.date_payment && this.payement.date_paye < this.eleve_service_period.echiance) {
                        this.eleve_service_period.status = 'payées a temps';
                    } else if (this.payement.date_paye >= response.data.echiance) {
                        this.eleve_service_period.status = 'payées en retards';
                    }
                } else if (this.eleve_service_period.Rest_payee > 0) {
                    this.eleve_service_period.status = "paiements à partiel";
                }
                this.eleve_service_period.isPayer = true;
                try {
                    const response1 = await axiosClient.put(`/administratif/eleves-services-period/${id}`, this.eleve_service_period);
                } catch (error) {
                    console.error("Error fetching get eleve period:", error);
                }
            } catch (error) {
                console.error("Error fetching get eleve period:", error);
            }

        },
        async addPayment() {
            try {
                const response = await axiosClient.post(`/administratif/payements`, this.payement);
                console.log(response.data);
                this.updatePeriod(this.payement.eleve_service_period_id)
                UIkit.modal('#modal-group-p1').hide();
                location.reload();
            } catch (error) {
                console.error("Error fetching list Payment methods:", error);
            }
        },
        checkAll() {
            this.selectedItems = [];
            this.listPeriods.forEach((period) => {
                period.eleveservice.eleve.checked = this.isCheckAll;
                if (period.eleveservice.eleve.checked == true) {
                    this.selectedItems.push(period);
                }
            });
        },
        checkaddone(period) {
            console.log(this.selectedItems[period]);
            // if (period.eleveservice.eleve.checked == true) {
            //     this.selectedItems.push(period);
            // }else{

            // }
            console.log(this.selectedItems);
        },
        async getAllPaymentMethod() {
            try {
                const response = await axiosClient.get(`/administratif/payment_methods`);
                this.listPaymentMethod = response.data;
            } catch (error) {
                console.error("Error fetching list Payment methods:", error);
            }
        },
        async getAllPeriods() {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/bystatus/paiements en retard`);
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