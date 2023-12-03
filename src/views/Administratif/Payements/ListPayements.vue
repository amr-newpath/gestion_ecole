<template>
    <section class="py-1 bg-blueGray-50 my-5">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <h6 class="text-blueGray-700 text-xl font-bold p-3">Effectué à paiements</h6>
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
                    <div class="relative m-[2px] mb-3 mr-5 float-left">
                        <label for="inputSearch" class="sr-only">Search </label>
                        <select v-model="f_famille_id" @change="HandlefilterByFamille"
                            class="block w-44 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-5 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
                            <option value="0" selected>Familles</option>
                            <option v-for="famile in listFamilles" :key="famile.id" :value="famile.id">{{ famile.nom }}
                            </option>
                        </select>
                    </div>
                    <!-- <div class="flex flex-col items-center">
                        <div class="w-full md:w-1/2 flex flex-col items-center h-64">
                            <div class="w-full px-4">
                                <div class="flex flex-col items-center relative">
                                    <div class="w-full">
                                        <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                                            <div class="flex flex-auto flex-wrap"></div>
                                            <input placeholder="Search by position"
                                                class="p-1 px-2 appearance-none outline-none w-full text-gray-800">
                                            <div
                                                class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                                <button
                                                    class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-chevron-up w-4 h-4">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                                        <div class="flex flex-col w-full">
                                            <div
                                                class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
                                                <div
                                                    class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div class="w-6 flex flex-col items-center">
                                                        <div
                                                            class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                                                            <img class="rounded-full" alt="A"
                                                                src="https://randomuser.me/api/portraits/men/62.jpg">
                                                        </div>
                                                    </div>
                                                    <div class="w-full items-center flex">
                                                        <div class="mx-2 -mt-1  ">Jack jhon
                                                            <div
                                                                class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                                                                CEO &amp; managin director</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                                <div
                                                    class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div class="w-6 flex flex-col items-center">
                                                        <div
                                                            class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                                                            <img class="rounded-full" alt="A"
                                                                src="https://randomuser.me/api/portraits/women/62.jpg">
                                                        </div>
                                                    </div>
                                                    <div class="w-full items-center flex">
                                                        <div class="mx-2 -mt-1  ">Liza Blue
                                                            <div
                                                                class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                                                                COO &amp; co-founder</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                                <div
                                                    class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div class="w-6 flex flex-col items-center">
                                                        <div
                                                            class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                                                            <img class="rounded-full" alt="A"
                                                                src="https://randomuser.me/api/portraits/men/65.jpg">
                                                        </div>
                                                    </div>
                                                    <div class="w-full items-center flex">
                                                        <div class="mx-2 -mt-1 w-1/2 ">Brian White
                                                            <div
                                                                class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                                                                CTO &amp; technical manager</div>
                                                        </div>
                                                        <div class="w-1/2 flex">
                                                            <div
                                                                class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                                                <div
                                                                    class="text-xs font-normal leading-none max-w-full flex-initial">
                                                                    Hiring!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
                                                <div
                                                    class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div class="w-6 flex flex-col items-center">
                                                        <div
                                                            class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                                                            <img class="rounded-full" alt="A"
                                                                src="https://randomuser.me/api/portraits/men/85.jpg">
                                                        </div>
                                                    </div>
                                                    <div class="w-full items-center flex">
                                                        <div class="mx-2 -mt-1  ">Eric Dripper
                                                            <div
                                                                class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                                                                CMO &amp; marketing manager</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="relative m-[2px] mb-3 mr-5 float-left">
                        <label for="inputSearch" class="sr-only">Search </label>
                        <select v-model="f_eleve_id" @change="HandlefilterByEleve"
                            class="block w-44 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-5 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
                            <option value="0">Eleves</option>
                            <option v-for="eleve in listEleves" :key="eleve.id" :value="eleve.id">{{ eleve.nom }} {{
                                eleve.prenom }}</option>
                        </select>
                    </div>
                    <div class="relative m-[2px] mb-3 mr-5 float-left">
                        <label for="inputSearch" class="sr-only">Search </label>
                        <select v-model="f_niveau" @change="HandlefilterByNiveau"
                            class="block w-44 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-5 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
                            <option value="0">Niveaux</option>
                            <option v-for="(niveau, index) in listNiveaux" :key="index" :value="niveau">{{ niveau }}
                            </option>
                        </select>
                    </div>
                    <div class="relative m-[2px] mb-3 mr-3 float-left">
                        <label for="inputSearch" class="sr-only">Search </label>
                        <select v-model="f_status" @change="HandlefilterByStatus"
                            class="block w-44 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-5 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
                            <option value="0">Effectué à paiements</option>
                            <option v-for="(status, index) in listStatus" :key="index" :value="status">{{ status }}</option>
                        </select>
                    </div>
                    <div class="relative m-[2px] mb-3 mr-5 float-left">
                        <button class="btn btn-info text-white px-3" @click="filter">{{ isFilter ? 'Clear Filter' : 'Filter'
                        }}</button>
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
                                    <div class="btn mr-1" style="color:#0098ca;" type="button" @click="payer(Period.id)"
                                        v-if="!Period.status.includes('payées en avances') && !Period.status.includes('payées a temps') && !Period.status.includes('payées en retards')">
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
        this.getAllPeriodstest();
        this.getAllPeriods();
        this.getAllFamilles();
        this.getAllEleves();
        this.getAllPaymentMethod();
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
                console.log(response.data.payements);
                if (this.eleve_service_period.Rest_payee == 0) {
                    this.eleve_service_period.Rest_payee = this.eleve_service_period.montant - this.payement.montant;
                    console.log("rest : " + this.eleve_service_period.Rest_payee);
                    if (this.eleve_service_period.Rest_payee > 0) {
                        this.eleve_service_period.status = "paiements à partiel";
                    } else {
                        if (this.payement.date_paye < response.data.date_payment) {
                            console.log("payées en avances");
                            this.eleve_service_period.status = 'payées en avances';
                        } else if (this.payement.date_paye >= this.eleve_service_period.date_payment && this.payement.date_paye < this.eleve_service_period.echiance) {
                            this.eleve_service_period.status = 'payées a temps';
                            console.log("payées a temps");
                        } else if (this.payement.date_paye >= response.data.echiance) {
                            console.log("payées en retards");
                            this.eleve_service_period.status = 'payées en retards';
                        }
                    }
                } else {
                    this.eleve_service_period.Rest_payee = this.eleve_service_period.Rest_payee - this.payement.montant;
                    if (this.eleve_service_period.Rest_payee == 0) {
                        this.eleve_service_period.isPayer = true;
                        if (this.payement.date_paye < response.data.date_payment) {
                            console.log("payées en avances");
                            this.eleve_service_period.status = 'payées en avances';
                        } else if (this.payement.date_paye >= this.eleve_service_period.date_payment && this.payement.date_paye < this.eleve_service_period.echiance) {
                            this.eleve_service_period.status = 'payées a temps';
                            console.log("payées a temps");
                        } else if (this.payement.date_paye >= response.data.echiance) {
                            console.log("payées en retards");
                            this.eleve_service_period.status = 'payées en retards';
                        }
                    } else {
                        this.eleve_service_period.status = "paiements à partiel";
                    }
                }
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
                await this.updatePeriod(this.payement.eleve_service_period_id);
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
                const response = await axiosClient.get(`/administratif/eleves-services-period`);
                this.listPeriods = response.data;

                // for (const per of this.listPeriodsold) {
                //     this.eleve_service_period = per;
                //     if (!per.isPayer) {
                //         const currentDate = new Date();  // Assuming currentDate is a Date object
                //         const eleveServicePeriod = { ...per };  // Create a copy to avoid modifying the original object

                //         if (currentDate > eleveServicePeriod.date_payment && currentDate < eleveServicePeriod.echiance) {
                //             eleveServicePeriod.status = 'paiements en cours';
                //         } else if (currentDate < eleveServicePeriod.date_payment) {
                //             eleveServicePeriod.status = 'paiements à venir';
                //         } else if (currentDate > eleveServicePeriod.echiance) {
                //             eleveServicePeriod.status = 'paiements en retard';
                //         }

                //         try {
                //             await axiosClient.put(`/administratif/eleves-services-period/${eleveServicePeriod.id}`, eleveServicePeriod);
                //         } catch (error) {
                //             console.error("Error updating eleve period:", error);
                //         }
                //     }else{
                //         try {
                //             await axiosClient.put(`/administratif/eleves-services-period/${per.id}`, this.eleve_service_period);
                //         } catch (error) {
                //             console.error("Error updating eleve period:", error);
                //         }
                //     }
                // this.listPeriods.push(this.eleve_service_period);
                // }

                // console.log(this.listPeriods);
            } catch (error) {
                console.error("Error fetching list Periods:", error);
            }
        },
        async getAllPeriodstest() {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period`);
                this.listPeriodsold = response.data;
                this.listPeriodsold.map(async (per) => {
                    if (per.payements == null && !per.isPayer) {
                        console.log("currentdate : " + this.currentDate);
                        this.eleve_service_period.date_debit = per.date_debit;
                        this.eleve_service_period.date_fin = per.date_fin;
                        this.eleve_service_period.date_payment = per.date_payment;
                        this.eleve_service_period.montant = per.montant;
                        this.eleve_service_period.Rest_payee = per.Rest_payee;
                        this.eleve_service_period.echiance = per.echiance;
                        this.eleve_service_period.period = per.period;
                        this.eleve_service_period.isPayer = per.isPayer;
                        this.eleve_service_period.eleve_service_id = per.eleve_service_id;
                        if (this.currentDate > per.date_payment && this.currentDate < per.echiance) {
                            this.eleve_service_period.status = 'paiements en cours';
                            console.log("a1" + this.eleve_service_period.status);

                            try {
                                await axiosClient.put(`/administratif/eleves-services-period/${per.id}`, this.eleve_service_period);
                            } catch (error) {
                                console.error("Error fetching get eleve period:", error);
                            }
                        } else if (this.currentDate < per.date_payment) {
                            this.eleve_service_period.status = 'paiements à venir';
                            console.log("a2" + this.eleve_service_period.status);
                            try {
                                await axiosClient.put(`/administratif/eleves-services-period/${per.id}`, this.eleve_service_period);
                            } catch (error) {
                                console.error("Error fetching get eleve period:", error);
                            }
                        } else if (this.currentDate > per.echiance) {
                            this.eleve_service_period.status = 'paiements en retard';
                            console.log("a3" + this.eleve_service_period.status);
                            try {
                                await axiosClient.put(`/administratif/eleves-services-period/${per.id}`, this.eleve_service_period);
                            } catch (error) {
                                console.error("Error fetching get eleve period:", error);
                            }
                        }
                    }
                    // if (!per.isPayer) {

                    //     console.log(per);


                    // }
                    this.listPeriods.push(per);
                });
                console.log(this.listPeriods);
            } catch (error) {
                console.error("Error fetching list Periods:", error);
            }
        },


        // by famille 
        async getAllPeriodsbyfamilles(id) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${id}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by eleve 
        async getAllPeriodsbyeleves(id) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byeleve/${id}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by status 
        async getAllPeriodsbystatus(status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau 
        async getAllPeriodsbyniveau(niveau) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byniveaux/${niveau}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by famille + eleve
        async getAllPeriodsbyfamilleandeleve(idf, ide) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${idf}/byeleve/${ide}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + status
        async getAllPeriodsbyNiveauandStatus(niveau, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byniveaux/${niveau}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + eleve
        async getAllPeriodsbyNiveauandeleve(id, niveau) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byeleve/${id}/byniveaux/${niveau}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + famille
        async getAllPeriodsbyNiveauandfamille(id, niveau) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${id}/byniveaux/${niveau}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by status + eleve
        async getAllPeriodsbystatusandeleve(id, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byeleve/${id}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by status + famille
        async getAllPeriodsbystatusandfamille(id, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${id}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + status + eleve
        async getAllPeriodsbyNiveauandStatusandeleve(id, niveau, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byeleve/${id}/byniveaux/${niveau}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + famille + eleve
        async getAllPeriodsbyNiveauandfamilleandeleve(idf, ide, niveau) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${idf}/byeleve/${ide}/byniveaux/${niveau}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by status + famille + eleve
        async getAllPeriodsbyfamilleandStatusandeleve(idf, ide, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${idf}/byeleve/${ide}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + status + eleve + famille
        async getAllPeriodsbyNiveauandStatusandeleveandfamille(idf, idE, niveau, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${idf}/byeleve/${idE}/byniveaux/${niveau}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        // by niveau + status + famille
        async getAllPeriodsbyNiveauandStatusandfamille(id, niveau, status) {
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byfamile/${id}/byniveaux/${niveau}/bystatus/${status}`);
                this.listPeriods = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        async getAllFamilles() {
            try {
                const response = await axiosClient.get("/administratif/familles");
                this.listFamilles = response.data;
            } catch (error) {
                console.error("Error fetching list familles:", error);
            }
        },
        async getAllEleves() {
            try {
                const response = await axiosClient.get("/administratif/elevess");
                this.listEleves = response.data;
            } catch (error) {
                console.error("Error fetching list eleves:", error);
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
        filter() {
            this.isFilter = !this.isFilter;
            if (this.isFilter) {
                if (this.f_famille_id != null && this.f_eleve_id != null && this.f_niveau != null && this.f_status != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_eleve_id);
                    console.log(this.f_niveau);
                    console.log(this.f_status);
                    this.getAllPeriodsbyNiveauandStatusandeleveandfamille(this.f_famille_id, this.f_eleve_id, this.f_niveau, this.f_status);
                } else if (this.f_famille_id != null && this.f_eleve_id != null && this.f_status != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_eleve_id);
                    console.log(this.f_status);
                    this.getAllPeriodsbyfamilleandStatusandeleve(this.f_famille_id, this.f_eleve_id, this.f_status);
                } else if (this.f_status != null && this.f_eleve_id != null && this.f_niveau != null) {
                    console.log(this.f_status);
                    console.log(this.f_eleve_id);
                    console.log(this.f_niveau);
                    this.getAllPeriodsbyNiveauandStatusandeleve(this.f_eleve_id, this.f_niveau, this.f_status);
                } else if (this.f_famille_id != null && this.f_status != null && this.f_niveau != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_status);
                    console.log(this.f_niveau);
                    this.getAllPeriodsbyNiveauandStatusandfamille(this.f_eleve_id, this.f_niveau, this.f_status);
                } else if (this.f_famille_id != null && this.f_eleve_id != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_eleve_id);
                    this.getAllPeriodsbyfamilleandeleve(this.f_famille_id, this.f_eleve_id);
                } else if (this.f_famille_id != null && this.f_status != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_status);
                    this.getAllPeriodsbystatusandfamille(this.f_famille_id, this.f_status);
                } else if (this.f_famille_id != null && this.f_niveau != null) {
                    console.log(this.f_famille_id);
                    console.log(this.f_niveau);
                    this.getAllPeriodsbyNiveauandfamille(this.f_famille_id, this.f_niveau);
                } else if (this.f_eleve_id != null && this.f_niveau != null) {
                    console.log(this.f_niveau);
                    console.log(this.f_eleve_id);
                    this.getAllPeriodsbyNiveauandeleve(this.f_eleve_id, this.f_niveau);
                } else if (this.f_eleve_id != null && this.f_status != null) {
                    console.log(this.f_status);
                    console.log(this.f_eleve_id);
                    this.getAllPeriodsbystatusandeleve(this.f_eleve_id, this.f_status);
                } else if (this.f_niveau != null && this.f_status != null) {
                    console.log(this.f_status);
                    console.log(this.f_niveau);
                    this.getAllPeriodsbyNiveauandStatus(this.f_niveau, this.f_status);
                } else if (this.f_famille_id != null) {
                    console.log(this.f_famille_id);
                    this.getAllPeriodsbyfamilles(this.f_famille_id);
                } else if (this.f_eleve_id != null) {
                    console.log(this.f_eleve_id);
                    this.getAllPeriodsbyeleves(this.f_eleve_id);
                } else if (this.f_niveau != null) {
                    console.log(this.f_niveau);
                    this.getAllPeriodsbyniveau(this.f_niveau);
                } else if (this.f_status != null) {
                    console.log(this.f_status);
                    this.getAllPeriodsbystatus(this.f_status);
                } else {
                    console.log("none");
                }
            } else {
                console.log("clear");
                this.f_famille_id = null;
                this.f_eleve_id = null;
                this.f_niveau = null;
                this.f_status = null;
                this.getAllPeriods();
            }
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