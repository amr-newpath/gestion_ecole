<template>
    <div>
        <div class="relative m-[2px] mb-3 mr-5 float-left" v-if="!periodserv">
            <label for="inputSearch" class="sr-only">Search </label>
            <input id="inputSearch" type="text" placeholder="Search..." v-model="searchQuery" @input="search"
                class="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-4 w-4 text-neutral-500 dark:text-neutral-200">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

        </div>
        <!-- Button trigger modal -->

        <p uk-margin v-if="!periodserv">
            <a class="btn px-3 py-1 h-9 mt-1 rounded-lg text-dark-eval-3" style="background-color: #016563;"
                href="#modal-group-5" @click="vide" uk-toggle><i class="bi bi-person-plus-fill text-white"></i></a>
        </p>

        <div id="modal-group-5" uk-modal>
            <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h4 class="uk-modal-title" v-if="!idEleveService">Ajouter services par eleves</h4>
                    <h4 class="uk-modal-title" v-else>Edite services par eleves {{ this.eleve_service.id }}</h4>
                </div>
                <div class="uk-modal-body pb-0">
                    <div class="w-full px-3 mb-4 sm:h-1/2">
                        <label for="situation" class="block text-sm font-medium text-gray-600 mb-2">Service</label>
                        <select v-model="eleve_service.service_id" id="situation" required
                            @change="handleService(eleve_service.service_id)"
                            class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.service }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full px-3 mb-4 sm:h-1/2">
                        <label for="situation" class="block text-sm font-medium text-gray-600 mb-2">Eleve</label>
                        <select v-model="eleve_service.eleve_id" id="situation" required
                            class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option v-for="eleve in eleves" :key="eleve.id" :value="eleve.id">{{ eleve.nom }} {{
                                eleve.prenom }} / {{ eleve.niveau }}</option>
                        </select>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-1 sm:px-3">
                        <div class="w-full px-3 mb-2 sm:w-1/2">
                            <label class="block text-sm font-medium text-gray-600 mb-2">date debit:</label>
                            <input v-model="eleve_service.date_debit" class="w-full my-3 px-3 py-2 border rounded-md"
                                type="date" />
                        </div>
                        <div class="w-full px-3 mb-2 sm:w-1/2">
                            <label class="block text-sm font-medium text-gray-600 mb-2">date fin:</label>
                            <input v-model="eleve_service.date_fin" class="w-full my-3 px-3 py-2 border rounded-md"
                                type="date" required />
                        </div>
                    </div>
                    <div class="w-full px-3 mb-4 sm:h-1/3">
                        <label class="block text-sm font-medium text-gray-600 mb-2">remise:</label>
                        <input v-model="eleve_service.remise" class="w-full my-3 px-3 py-2 border rounded-md" required />
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                        <div class="w-full px-3 mb-4 sm:w-1/2">
                            <label class="block text-sm font-medium text-gray-600 mb-2">
                                Montant : {{
                                    eleve_service.service_id != null && service.annee_scolaire_services != null
                                    ? service.annee_scolaire_services.price
                                    : null
                                }}
                            </label>
                            <label class="block text-sm font-medium text-gray-600 mb-2" v-if="eleve_service.remise != null">
                                Montant après remise : {{
                                    eleve_service.service_id != null && service.annee_scolaire_services != null
                                    ? service.annee_scolaire_services.price - eleve_service.remise
                                    : null
                                }}
                            </label>
                            <!-- <label class="block text-sm font-medium text-gray-600 mb-2">Montant : {{
                                eleve_service.service_id != null ? service.annee_scolaire_services != null ?
                                service.annee_scolaire_services.price : null : null }}</label>
                            <label class="block text-sm font-medium text-gray-600 mb-2"
                                v-if="eleve_service.remise != null">Montant aprés remise : {{ eleve_service.service_id !=
                                    null ? service.annee_scolaire_services != null ? service.annee_scolaire_services.price -
                                        eleve_service.remise : null : null
                                }}</label> -->
                        </div>
                    </div>
                </div>
                <div class="w-full px-3 lg:p-0 sm:w-3/3 ">
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                            @click="redirect">Cancel</button>
                        <!-- <button type="button" @click.prevent="add" class="uk-button uk-button-primary mx-3" id="btn1s"
                            v-show="idEleveService == 0">ajouter</button> -->
                        <button type="button" @click.prevent="suivant(eleve_service.service_id, eleve_service.eleve_id)"
                            class="uk-button uk-button-primary mx-3" id="btn1s"
                            v-show="idEleveService == 0">suivant</button>
                        <button type="button" @click.prevent="suivantEdit(eleve_service.service_id, eleve_service.eleve_id)"
                            id="btn3s" class="uk-button btn-warning mx-3" v-show="idEleveService != 0">suivant</button>
                    </div>
                </div>
            </form>
        </div>
        <div id="modal-group-6" class="uk-modal-container" uk-modal>
            <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>

                <div class="uk-modal-body pb-0">
                    <dl class="uk-description-list uk-description-list-divider mb-2">
                        <dt class="mb-3" style="font-size: xx-large;" v-if="eleve">{{ eleve.nom }} {{ eleve.prenom }}</dt>
                        <dd class="ml-1" v-if="eleve">Code : {{ eleve.code }}</dd>
                        <dd class="ml-1" v-if="eleve">Niveau : {{ eleve.niveau }}</dd>
                        <!-- <li v-for="date in monthlyDateRange" :key="date">
                            {{ date.toISOString().split('T')[0] }}
                        </li> -->
                        <table class="uk-table uk-table-divider uk-table-hover">
                            <thead class="" style="background-color: #0098ca;">
                                <tr>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Service</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Date Debit</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Date Fin</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Périod</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Montant</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Date Limite Paiement</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Date echiance</th>
                                    <th class=" text-white font-bold text-center" style="font-weight: bold;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(eleve_servperiod, index) in eleve_service_periods" :key="index">
                                    <td class="text-center">{{ service.service }}</td>
                                    <td class="text-center">{{ eleve_servperiod.date_debit }}</td>
                                    <td class="text-center">{{ eleve_servperiod.date_fin }}</td>
                                    <td class="text-center">{{ eleve_servperiod.period }}</td>
                                    <td class="text-center">{{ eleve_servperiod.montant }}</td>
                                    <td class="text-center">{{ eleve_servperiod.echiance }}</td>
                                    <td class="text-center">{{ eleve_servperiod.date_payment }}</td>
                                    <td class="text-center">
                                        <!-- <button class="uk-button uk-button-default  px-3  h-9 mt-1 rounded-lg text-dark-eval-3 "
                                    style="background-color: #0098ca;" uk-toggle><span
                                        class="text-white">pay</span></button> -->
                                        <div class="btn mr-1" style="color:#ff8201;" type="button"
                                            @click="editPeriod(index)">
                                            <i class="bi bi-brush-fill"></i>
                                        </div>
                                        <div class="btn" style="color: #a00042;"
                                            @click="getdeletePeriod(index, eleve_servperiod.id)">
                                            <i class="bi bi-trash3-fill"></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </dl>
                </div>
                <div class="w-full px-3 lg:p-0 sm:w-3/3 ">
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                            @click="redirect">Cancel</button>
                        <!-- <button type="button" @click.prevent="add" class="uk-button uk-button-primary mx-3" id="btn1s"
                            v-show="idEleveService == 0">ajouter</button> -->
                        <button type="button" @click.prevent="savePeriod" class="uk-button uk-button-primary mx-3"
                            id="btn1s" v-show="idEleveService == 0">save</button>
                        <button type="button" @click.prevent="savePeriodUpdate" class="uk-button uk-button-primary mx-3"
                            id="btn1s" v-show="idEleveService != 0">save</button>
                    </div>
                </div>
            </form>
        </div>
        <div id="modal-group-7" uk-modal>
            <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h4 class="uk-modal-title" v-if="!idEleveService">Ajouter services par eleves</h4>
                    <h4 class="uk-modal-title" v-else>Edite services par eleves</h4>
                </div>
                <div class="uk-modal-body pb-0">
                    <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                        <div class="w-full px-3 mb-4 sm:w-1/2">
                            <label class="block text-sm font-medium text-gray-600 mb-2">Date Echiance:</label>
                            <input v-model="eleve_service_period.echiance" class="w-full my-3 px-3 py-2 border rounded-md"
                                type="date" />
                        </div>
                        <div class="w-full px-3 mb-4 sm:w-1/2">
                            <label class="block text-sm font-medium text-gray-600 mb-2">Date Payment:</label>
                            <input v-model="eleve_service_period.date_payment"
                                class="w-full my-3 px-3 py-2 border rounded-md" type="date" required />
                        </div>
                    </div>
                </div>
                <div class="w-full px-3 lg:p-0 sm:w-3/3 ">
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                            @click="redirect">Cancel</button>
                        <!-- <button type="button" @click.prevent="add" class="uk-button uk-button-primary mx-3" id="btn1s"
                            v-show="idEleveService == 0">ajouter</button> -->
                        <button type="button" @click.prevent="updatePeriod(eleve_service_period)"
                            class="uk-button uk-button-warning mx-3" id="btn1s">edit</button>
                    </div>
                </div>
            </form>
        </div>
        <div id="modal-group-8" uk-modal>
            <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h4 class="uk-modal-title">Delete Period</h4>
                </div>
                <div class="uk-modal-body pb-0">
                    <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                        <h2>Are you sure delete ?</h2>
                    </div>
                </div>
                <div class="w-full px-3 lg:p-0 sm:w-3/3 ">
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                            @click="redirect">Non</button>
                        <!-- <button type="button" @click.prevent="add" class="uk-button uk-button-primary mx-3" id="btn1s"
                            v-show="idEleveService == 0">ajouter</button> -->
                        <button type="button" @click.prevent="deletePeriod" class="uk-button uk-button-warning mx-3"
                            id="btn1s">Oui</button>
                    </div>
                </div>
            </form>
        </div>
        <table class="min-w-full text-left text-xs whitespace-nowrap" v-if="!periodserv">

            <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 dark:bg-neutral-800 border-t"
                style="color: #fff;background-color: #a00042;">
                <tr>

                    <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                        v-for="(column, index) in columns" :key="index">{{ column }}</th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="(eleves_serv, index) in displayedItems" :key="index"
                    class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                        <img v-if="eleves_serv.eleve.image" :src="eleves_serv.eleve.image.path" alt="Image"
                            style="border-radius: 8em;width: 3em;height: 3em;display: flex;justify-content: center;align-items: center;" />
                    </td>
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{ eleves_serv.eleve.nom }}</td>
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{ eleves_serv.eleve.prenom }}
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleves_serv.date_debit }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleves_serv.date_fin }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleves_serv.remise }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                        eleves_serv.service.annee_scolaire_services.annee_scolaire.annee_scolaire }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleves_serv.service.service }}
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                        eleves_serv.service.annee_scolaire_services.price }}</td>

                    <td class="px-6 text-center border-x dark:border-neutral-600">
                        <div class="btn mr-1" style="color:#ff8201;" type="button" @click="edit(eleves_serv.id)">
                            <i class="bi bi-brush-fill"></i>
                        </div>
                        <div class="btn" style="color: #a00042;" @click="deleteServiceEleve(eleves_serv.id)">
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination :totalItems="eleves_services.length" :itemsPerPage="itemsPerPage" @page-changed="handlePageChange">
        </pagination>


    </div>
</template>
<script>
import axiosClient from "../../axios";
import removeIteme from "../../GlobalFunctions";
import Pagination from '@/components/Pagination.vue'
import { tr } from "date-fns/locale";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
export default {
    props: {
        FamilleId: Number,
    },
    components: {
        Pagination,
    },
    data() {
        return {
            inde: null,
            iddelete: null,
            idFamille: null,
            idEleveService: 0,
            periodserv: false,
            eleve_service: {
                date_debit: null,
                date_fin: null,
                remise: null,
                eleve_id: null,
                service_id: null,
                annee_scolaire_id: null,
            },
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
            linedeparentes: [],
            nationalities: [],
            searchQuery: '',
            itemsPerPage: 10,
            currentPage: 1,
            columns: [
                'image',
                'nom',
                'prenom',
                'date debit',
                'date fin',
                'remise',
                'annee scolaire',
                'nom service',
                'prix service',
                'Action',
            ],
            eleves_services: [],
            eleve_service_periods: [],
            services: [],
            service: null,
            eleve: null,
            eleves: [],
            annee_scolaires: [],
            monthlyDateRange: [],
            newService: {
                service: "",
            },
        }
    },
    computed: {
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.eleves_services.slice(startIndex, endIndex);
        },
    },
    mounted() {
        // this.idFamille = localStorage.getItem('id_famile');
        this.idFamille = this.FamilleId;
        console.log(this.FamilleId);
        console.log(this.idFamille);
        console.log("id: " + this.idFamille);
        this.getEleveServices(this.idFamille);
        this.fetchServices();
    },
    methods: {
        deleteServiceEleve(id) {
            removeIteme(id, "Are you sure?", "/administratif/eleves-services/");
        },
        updatePeriod(elevserper) {
            this.eleve_service_periods[this.inde] = elevserper;
            UIkit.modal('#modal-group-7').hide();
            UIkit.modal('#modal-group-6').show();
        },
        handleService(id) {
            this.getServiceByid(id);
        },
        getdeletePeriod(index, id) {
            console.log("delete " + id);
            this.iddelete = id;
            this.inde = index;
            UIkit.modal('#modal-group-6').hide();
            UIkit.modal('#modal-group-8').show();
        },
        async deletePeriod() {
            if (this.iddelete != null) {
                try {
                    const res = await axiosClient.delete(`/administratif/eleves-services-period/${this.iddelete}`);
                    console.log(res.data);
                } catch (error) {
                    console.error("Error fetching parents:", error);
                }
            }
            this.eleve_service_periods.splice(this.inde, 1);
            UIkit.modal('#modal-group-8').hide();
            UIkit.modal('#modal-group-6').show();
        },
        editPeriod(index) {
            this.inde = index;
            this.eleve_service_period = this.eleve_service_periods[index];
            console.log(this.eleve_service_period);

            UIkit.modal('#modal-group-6').hide();
            UIkit.modal('#modal-group-7').show();
        },
        generateMonthlyDateRange(startDate, endDate) {
            const dateRange = [];
            let currentMonth = new Date(startDate);

            // Iterate through the months from start to end
            while (currentMonth <= new Date(endDate)) {
                dateRange.push(new Date(currentMonth));
                // Move to the next month
                currentMonth.setMonth(currentMonth.getMonth() + 1);
            }

            this.monthlyDateRange = dateRange;
        },
        nextpageperiod() {
            this.periodserv = true;
        },
        oldpageperiod() {
            this.periodserv = false;
        },
        getPeriod(n) {
            var perd = "";
            switch (n) {
                case '01':
                    perd = "Janvier";
                    break;
                case '02':
                    perd = "Février";
                    break;
                case '03':
                    perd = "Mars";
                    break;
                case '04':
                    perd = "Avril";
                    break;
                case '05':
                    perd = "Mai";
                    break;
                case '06':
                    perd = "Juin";
                    break;
                case '07':
                    perd = "Juillet";
                    break;
                case '08':
                    perd = "Août";
                    break;
                case '09':
                    perd = "septembre";
                    break;
                case '10':
                    perd = "Octobre";
                    break;
                case '11':
                    perd = "Novembre";
                    break;
                case '12':
                    perd = "Décembre";
                    break;
                default:
                    break;
            }
            return perd;
        },
        async suivant(serviceid, eleveid) {
            await this.getServiceByid(serviceid);
            await this.getElevebyId(eleveid);
            this.eleve_service_periods = [];
            this.generateMonthlyDateRange(this.eleve_service.date_debit, this.eleve_service.date_fin);
            this.monthlyDateRange.map(date => {
                const newDate = new Date(date);
                const newDate1 = new Date(date);
                const formattedDate = newDate.toISOString().split('T')[0];
                const month = formattedDate.split('-')[1];
                let eleve_service_period = {
                    period: this.getPeriod(month),
                    date_debit: formattedDate,
                    date_fin: new Date(newDate.setDate((this.getLastDayOfMonth(newDate.getFullYear(), newDate.getMonth())))).toISOString().split('T')[0],
                    echiance: new Date(newDate.setDate(newDate1.getDate() + 4)).toISOString().split('T')[0],
                    montant: this.service.annee_scolaire_services == null ? null : this.service.annee_scolaire_services.price - this.eleve_service.remise,
                    status: 'paiements à venir',
                    Rest_payee: 0,
                    isPayer: false,
                    eleve_service_id: null,
                    date_payment: formattedDate
                };

                this.eleve_service_periods.push(eleve_service_period);
            });

            console.log(this.eleve_service_periods);

            UIkit.modal('#modal-group-5').hide();
            UIkit.modal('#modal-group-6').show();
        },
        async suivantEdit(serviceid, eleveid) {
            await this.getServiceByid(serviceid);
            await this.getElevebyId(eleveid);
            this.eleve_service_periods = [];
            try {
                const response = await axiosClient.get(`/administratif/eleves-services-period/byservice/${serviceid}/byeleve/${eleveid}/bydatedebit/${this.eleve_service.date_debit}/bydatefin/${this.eleve_service.date_fin}`);
                this.eleve_service_periods = response.data;
                console.log(this.eleve_service_periods);
            } catch (error) {
                console.error("Error fetching parents:", error);
            }

            UIkit.modal('#modal-group-5').hide();
            UIkit.modal('#modal-group-6').show();
        },
        async savePeriodUpdate() {
            this.eleve_service_periods.map(async (elevp) => {
                try {
                    const responsepre = await axiosClient.put(
                        "/administratif/eleves-services-period/" + elevp.id,
                        elevp
                    );
                    console.log("edit s");
                    console.log(responsepre.data);

                } catch (error) {
                    console.error("Error fetching eleve_service_period:", error);
                }
            });
            UIkit.modal('#modal-group-5').hide();
            UIkit.modal('#modal-group-6').show();
        },
        async savePeriod() {
            // save eleve service
            await this.getServiceByid(this.eleve_service.service_id);
            console.log(this.eleve_service);
            this.eleve_service.annee_scolaire_id = this.service.annee_scolaire_services.annee_scolaire.id;
            try {
                const response = await axiosClient.post(
                    "/administratif/eleves-services",
                    this.eleve_service
                );
                console.log("add");
                console.log(response.data);
                this.eleve_service_periods.map((el) => {
                    el.eleve_service_id = response.data.id;
                });
            } catch (error) {
                console.error("Error fetching eleve_service:", error);
            }
            console.log(this.eleve_service_periods);
            // save eleve service period
            this.eleve_service_periods.map(async (elevp) => {
                try {
                    const responsepre = await axiosClient.post(
                        "/administratif/eleves-services-period",
                        elevp
                    );
                    console.log("add s");
                    console.log(responsepre.data);

                } catch (error) {
                    console.error("Error fetching eleve_service_period:", error);
                }
            });

            this.vide2();
            UIkit.modal('#modal-group-6').hide();
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.show();
            }
            this.getEleveServices(this.idFamille);
        },
        getLastDayOfMonth(year, month) {
            const lastDay = new Date(year, month + 1, 0);
            return lastDay.getDate();
        },
        addFourDaysToDates() {
            this.monthlyDateRange.map(date => {
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + 4);
                return newDate;
            });
        },
        async getEleveFromFammilles(id) {
            try {
                const response = await axiosClient.get("/administratif/familles/" + id);
                this.eleves = response.data.eleves;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        redirect() {
            UIkit.modal('#modal-group-5').hide();
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.show();
            }
        },
        async fetchServices() {
            try {
                const response = await axiosClient.get("/administratif/services");
                this.services = response.data;
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
            }
        },
        async vide() {
            this.idEleveService = 0;
            this.eleve_service = {
                date_debit: null,
                date_fin: null,
                remise: null,
                eleve_id: null,
                service_id: null,
                annee_scolaire_id: null,
            };
            await this.getEleveFromFammilles(this.idFamille);
        },
        vide2() {
            this.idEleveService = 0;
            this.eleve_service = {
                date_debit: null,
                date_fin: null,
                remise: null,
                eleve_id: null,
                service_id: null,
                annee_scolaire_id: null,
            };
            this.eleve_service_period = {
                date_debit: null,
                date_fin: null,
                montant: null,
                period: null,
                eleve_service_id: null,
                echiance: null,
                date_payment: null
            };
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.getEleveServices();
                return;
            }

            this.eleves_services = this.eleves_services.filter((eleves_service) => {
                const fullName = `${eleves_service.eleve.nom} ${eleves_service.eleve.prenom}
                 ${eleves_service.date_debit} ${eleves_service.date_fin} 
                 ${eleves_service.remise} 
                 ${eleves_service.service.annee_scolaire_services.annee_scolaire.annee_scolaire} ${eleves_service.service.service}
                 ${eleves_service.service.type} ${eleves_service.service.annee_scolaire_services.price} 
                 `.toLowerCase();
                return fullName.includes(query);
            });
        },
        async getEleveServices(id) {
            try {
                const response = await axiosClient.get("/administratif/eleves-services/byfamile/" + this.idFamille);
                this.eleves_services = response.data;
                console.log("elec");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },
        async getServiceByid(id) {
            try {
                const res = await axiosClient.get(`/administratif/services/${id}`);
                console.log("res");
                console.log(res.data);
                this.service = res.data;
            } catch (error) {
                console.error("Error fetching service:", error);
            }
        },
        async getElevebyId(id) {
            try {
                const rest = await axiosClient.get(`/administratif/elevess/${id}`);
                console.log("rest");
                console.log(rest.data);
                this.eleve = rest.data;
            } catch (error) {
                console.error("Error fetching service:", error);
            }
        },
        async add() {
            await this.getServiceByid(this.eleve_service.service_id);
            console.log(this.eleve_service);
            this.eleve_service.annee_scolaire_id = this.service.annee_scolaire_services.annee_scolaire.id;
            try {
                const response = await axiosClient.post(
                    "/administratif/eleves-services",
                    this.eleve_service
                );
                console.log(response.data);
                this.vide2();
                UIkit.modal('#modal-group-5').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                this.getEleveServices(this.idFamille);
            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },
        async edit(id) {
            this.vide();
            this.idEleveService = id;
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.hide();
            }
            try {
                const response = await axiosClient.get("/administratif/eleves-services/" + id);
                this.eleve_service = response.data;
                console.log("..............................");
                console.log(this.eleve_service);
                UIkit.modal('#modal-group-5').show();

            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(
                    "/administratif/eleves-services/" + this.idEleveService,
                    this.eleve_service
                );
                this.vide();
                UIkit.modal('#modal-group-5').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                this.getEleveServices(this.idFamille);

            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },

    },
}
</script>
<style scoped>
#btn1s {
    all: unset;
    background-color: #016563;
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
    background-color: #0098ca;
    padding-left: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 15px;
    margin-top: 10px;
    color: #fff;
    border-radius: 10px;
}

#btn1s:hover {
    background-color: #038886;
    cursor: pointer;
}

#btn2s:hover {
    background-color: #05a4d8;
    cursor: pointer;
}

#btn3s {
    all: unset;
    background-color: #fdcd00;
    padding-left: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 15px;
    margin-top: 10px;
    color: #fff;
    border-radius: 10px;
}

#btn3s:hover {
    background-color: #fdcf00ea;
    cursor: pointer;
}
</style>