<template>
    <section class="py-1 bg-blueGray-50 my-5">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <h6 class="text-blueGray-700 text-xl font-bold p-3">Souscription</h6>
                <!-- Table responsive wrapper -->
                <div class="overflow-x-auto bg-white dark:bg-neutral-700 p-10">

                    <div class="relative m-[2px] mb-3 mr-5 float-left">
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
                    <p uk-margin>
                        <a class="btn bg-info px-3 py-1 h-9 mt-1 rounded-lg text-dark-eval-3" href="#modal-group-5"
                            @click="vide" uk-toggle><i class="bi bi-person-plus-fill text-white"></i></a>
                    </p>
                    <div id="modal-group-5" uk-modal>
                        <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header">
                                <h4 class="uk-modal-title" v-if="!idEleveService">Ajouter Souscription</h4>
                                <h4 class="uk-modal-title" v-else>Edite Souscription</h4>
                            </div>
                            <div class="uk-modal-body pb-0">
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="situation"
                                        class="block text-sm font-medium text-gray-600 mb-2">Service</label>
                                    <select v-model="eleve_service.service_id" id="situation" required
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="service in services" :key="service.id" :value="service.id">{{
                                            service.service }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="situation"
                                        class="block text-sm font-medium text-gray-600 mb-2">Eleve</label>
                                    <select v-model="eleve_service.eleve_id" id="situation" required
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="eleve in eleves" :key="eleve.id" :value="eleve.id">{{ eleve.nom }} {{
                                            eleve.prenom }}</option>
                                    </select>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                    <div class="w-full px-3  sm:w-1/2">
                                        <label class="block text-sm font-medium text-gray-600 mb-2">date debit:</label>
                                        <input v-model="eleve_service.date_debit"
                                            class="w-full my-3 px-3 py-2 border rounded-md" type="date" />
                                    </div>
                                    <div class="w-full px-3  sm:w-1/2">
                                        <label class="block text-sm font-medium text-gray-600 mb-2">date fin:</label>
                                        <input v-model="eleve_service.date_fin"
                                            class="w-full my-3 px-3 py-2 border rounded-md" type="date" required />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                    <div class="w-full px-3 mb-4 sm:w-1/2">
                                        <label class="block text-sm font-medium text-gray-600 mb-2">frequence
                                            price:</label>
                                        <!-- <input v-model="eleve_service.frequence_paiment"
                                            class="w-full my-3 px-3 py-2 border rounded-md" required /> -->
                                    </div>
                                    <div class="w-full px-3 mb-4 sm:w-1/2">
                                        <label class="block text-sm font-medium text-gray-600 mb-2">remise:</label>
                                        <input v-model="eleve_service.remise"
                                            class="w-full my-3 px-3 py-2 border rounded-md" required />
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-3  lg:p-0 sm:w-3/3 ">
                                <div class="uk-modal-footer uk-text-right">
                                    <button class="uk-button uk-button-default uk-modal-close" type="button"
                                        id="btn2s">Cancel</button>
                                    <button type="button" @click.prevent="add" class="uk-button uk-button-primary mx-3"
                                        id="btn2s" v-show="idEleveService == 0">ajouter</button>
                                    <button type="button" @click.prevent="update" class="uk-button btn-warning mx-3"
                                        id="btn3s" v-show="idEleveService != 0">edit</button>
                                </div>
                            </div>
                        </form>
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

                            <tr v-for="(eleves_service, index) in displayedItems" :key="index"
                                class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                                    <img v-if="eleves_service.eleve.image" :src="eleves_service.eleve.image.path"
                                        alt="Image"
                                        style="border-radius: 8em;width: 3em;height: 3em;display: flex;justify-content: center;align-items: center;" />
                                </td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    eleves_service.eleve.nom }}</td>
                                <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{
                                    eleves_service.eleve.prenom }}
                                </td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                                    eleves_service.date_debit }}</td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                                    eleves_service.date_fin }}</td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleves_service.remise
                                }}</td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                                    eleves_service.service.annee_scolaire_services.annee_scolaire.annee_scolaire }}</td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                                    eleves_service.service.service }}
                                </td>
                                <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{
                                    eleves_service.service.annee_scolaire_services.price }}</td>

                                <td class="px-6 text-center border-x dark:border-neutral-600">
                                    <div class="btn text-warning mr-1" type="button" @click="edit(eleves_service.id)">
                                        <i class="bi bi-brush-fill"></i>
                                    </div>
                                    <div class="btn text-danger" @click="">
                                        <i class="bi bi-trash3-fill"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination :totalItems="eleves_services.length" :itemsPerPage="itemsPerPage"
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
            idEleveService: 0,
            eleve_service: {
                date_debit: null,
                date_fin: null,
                remise: null,
                eleve_id: null,
                service_id: null,
                annee_scolaire_id: null,
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
            eleves: [],
            services: [],
            service: null,
            eleves: [],
            annee_scolaires: [],
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
        this.getEleveServices();
        this.getEleves();
        this.fetchServices();
    },
    methods: {
        async getEleves() {
            try {
                const response = await axiosClient.get("/administratif/elevess");
                this.eleves = response.data;
            } catch (error) {
                console.error("Error fetching parents:", error);
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
        vide() {
            this.idEleveService = 0;
            this.eleve_service = {
                date_debit: null,
                date_fin: null,
                remise: null,
                eleve_id: null,
                service_id: null,
                annee_scolaire_id: null,
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
                 ${eleves_service.service.annee_scolaire_services.price} 
                 `.toLowerCase();
                return fullName.includes(query);
            });
        },
        async getEleveServices() {
            try {
                const response = await axiosClient.get("/administratif/eleves-services");
                this.eleves_services = response.data;
            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },
        async getServiceByid(id) {
            try {
                const res = await axiosClient.get(`/administratif/services/${id}`);
                this.service = res.data;
            } catch (error) {
                console.error("Error fetching service:", error);
            }
        },
        async add() {
            await this.getServiceByid(this.eleve_service.service_id);
            this.eleve_service.annee_scolaire_id = this.service.annee_scolaire_services.annee_scolaire.id;
            try {
                const response = await axiosClient.post(
                    "/administratif/eleves-services",
                    this.eleve_service
                );
                this.vide();
                UIkit.modal('#modal-group-5').hide();
                this.getEleveServices();
            } catch (error) {
                console.error("Error fetching eleves_services:", error);
            }
        },
        async edit(id) {
            this.idEleveService = id;
            UIkit.modal('#modal-group-5').show();
            try {
                const response = await axiosClient.get("/administratif/eleves-services/" + id);
                this.eleve_service = response.data;
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
                this.getEleveServices();

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
</style>