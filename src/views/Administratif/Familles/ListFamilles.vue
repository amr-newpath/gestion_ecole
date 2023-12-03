<template>
    <section class="py-1 bg-blueGray-50 my-5">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <h6 class="text-blueGray-700 text-xl font-bold p-3">Famille</h6>

                <!-- Table responsive wrapper -->
                <div class="overflow-x-auto bg-white dark:bg-neutral-700 p-10">

                    <!-- Search input -->
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
                        <a class="btn px-3 py-1 h-9 mt-1 rounded-lg text-dark-eval-3" style="background-color: #016563;"
                            href="#modal-group-1" uk-toggle><i class="bi bi-person-plus-fill text-white"></i></a>
                    </p>

                    <div id="modal-group-1" uk-modal>
                        <form method="post" @submit.prevent="addFamile" class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" @click="cleanid" uk-close></button>
                            <div class="uk-modal-header">
                                <h4 class="uk-modal-title font-semibold">Ajouter Famille</h4>
                            </div>
                            <div class="uk-modal-body">
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom :</label>
                                    <input type="text" id="nom" v-model="famille.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" required />
                                </div>
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="situation" class="block text-sm font-medium text-gray-600 mb-2">Situation
                                        :</label>
                                    <select v-model="famille.situation" id="situation" required
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Marié">Marié</option>
                                        <option value="Divorcé">Divorcé</option>
                                    </select>
                                </div>
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" @click="cleanid" id="btn2s"
                                    type="button">Cancel</button>
                                <button type="submit" class="uk-button uk-button-primary mx-3" id="btn1s">Ajouter</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal-group-2" class="uk-modal-container" uk-modal>
                        <div class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" @click="cleanid" uk-close></button>
                            <div class="uk-modal-header">
                                <h2 class="uk-modal-title" v-if="famile_info != null">{{ famile_info.nom }}</h2>
                                <h2 class="uk-modal-title" v-else>Famile Nom</h2>
                            </div>
                            <div class="uk-modal-body overflow-x-auto bg-white dark:bg-neutral-700" style="height: 60vh;">

                                <ul uk-tab>
                                    <li class="uk-active"><a type="button" @click="show1">Parents</a></li>
                                    <li><a type="button" @click="show2">Eleves</a></li>
                                    <li><a type="button" @click="show3">Services</a></li>
                                </ul>
                                <div class="" v-if="id_famile != null">
                                    <ParentComponents class="my-5" :FamilleId="id_famile" v-show="div1" />
                                    <ElevesComponents class="my-5" :FamilleId="id_famile" v-show="div2" />
                                    <SouscriptionComponent class="my-5" :FamilleId="id_famile" v-show="div3" />
                                </div>

                            </div>
                            <div class="uk-modal-footer uk-text-right">
                            </div>
                        </div>
                    </div>
                    <div id="modal-edit-Famille" uk-modal>
                        <form method="post" @submit.prevent="update" class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" @click="cleanid" uk-close></button>
                            <div class="uk-modal-header">
                                <h4 class="uk-modal-title font-semibold">Edit Famille</h4>
                            </div>
                            <div class="uk-modal-body">
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom :</label>
                                    <input type="text" id="nom" v-model="famille.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" required />
                                </div>
                                <div class="w-full px-3 mb-4 sm:h-1/2">
                                    <label for="situation" class="block text-sm font-medium text-gray-600 mb-2">Situation
                                        :</label>
                                    <select v-model="famille.situation" id="situation" required
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Marié">Marié</option>
                                        <option value="Divorcé">Divorcé</option>
                                    </select>
                                </div>
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" @click="cleanid" id="btn2s"
                                    type="button">Cancel</button>
                                <button type="submit" class="uk-button uk-button-warning mx-3" id="btn1s">Edit</button>
                            </div>
                        </form>
                    </div>
                    <table class="min-w-full text-left text-xs whitespace-nowrap mt-4">
                        <thead
                            class="uppercase tracking-wider border-b-2 dark:border-neutral-600 dark:bg-neutral-800 border-t"
                            style="background-color: #0098ca;color: #fff;">
                            <tr>
                                <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                                    v-for="(column, index) in columns" :key="index">{{ column }}</th>
                                <th scope="col" class="py-3 border-x text-center dark:border-neutral-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(famille, index) in displayedItems" :key="index"
                                class="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                                <td class="px-2 text-center  border-x dark:border-neutral-600">{{ famille.nom }}</td>
                                <td class="px-2 text-center border-x dark:border-neutral-600">{{ famille.situation }}</td>
                                <td class="px-2 text-center dark:border-neutral-600">
                                    <div class="row" v-for="(parent, index) in famille.parente" :key="index"><span
                                            class="py-2" v-show="index < 3">{{ parent.nom }}</span></div>
                                </td>
                                <td class="px-6 text-center border-x dark:border-neutral-600">
                                    <div class="row" v-for="(parent, index) in famille.parente" :key="index"><span
                                            class="py-2" v-show="index < 3">{{ parent.liendeparente.type }}</span></div>
                                </td>
                                <td class="px-6 text-center border-x dark:border-neutral-600">
                                    <div class="row" v-for="(eleve, index1) in famille.eleves" :key="index1"><span
                                            class="py-2" v-show="index1 < 3">{{ eleve.nom }}</span></div>
                                </td>
                                <td class="px-6 text-center border-x dark:border-neutral-600">
                                    <div class="row" v-for="(eleve, index1) in famille.eleves" :key="index1"><span
                                            class="py-2" v-show="index1 < 3">{{ eleve.niveau }}</span></div>
                                </td>
                                <td class=" text-center border-x dark:border-neutral-600">
                                    <router-link class="btn text-info mr-1"
                                        :to="{ name: 'FamilleDetails', params: { id: famille.id } }">
                                        <i class="bi bi-info-lg"></i>
                                    </router-link>
                                    <!-- <router-link class="btn text-warning mr-1"
                                        :to="{ name: 'EditFamilleInscription', params: { id: famille.id } }">
                                        <i class="bi bi-brush-fill"></i>
                                    </router-link> -->
                                    <div class="btn text-warning" @click="this.edit(famille.id)">
                                        <i class="bi bi-brush-fill"></i>
                                    </div>
                                    <div class="btn text-danger" @click="this.delete(famille.id)">
                                        <i class="bi bi-trash3-fill"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination :totalItems="familles.length" :itemsPerPage="itemsPerPage" @page-changed="handlePageChange">
                    </pagination>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import axiosClient from "../../../axios";
import removeIteme from "../../../GlobalFunctions";

import jsPDF from "jspdf";
// import axios from 'axios';
import ParentComponents from '@/components/parents/ParentsComponents.vue'
import ElevesComponents from '@/components/eleves/ElevesComponents.vue'
import SouscriptionComponent from '@/components/souscriptions/SouscriptionComponent.vue'
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Swal from 'sweetalert2';
import Pagination from '@/components/Pagination.vue'
const $toast = useToast();

export default {
    mounted() {
        this.id_famile = null;
        this.getAllFamilles();
    },
    components: {
        // VueToast,
        ParentComponents,
        ElevesComponents,
        SouscriptionComponent,
        Pagination,
    },
    data() {
        return {
            div1: true,
            div2: false,
            div3: false,
            isCheckAll: false,
            searchQuery: '',
            itemsPerPage: 10,
            currentPage: 1,
            selectedItems: [],
            columns: [
                "nom",
                "situation familiale",
                "parents",
                "lien de parenté",
                "eleve",
                "niveaux",
            ],
            familles: [],
            famille: {
                nom: '',
                situation: 'Marié',
            },
            famile_info: null,
            id_famile: null,
            famille_id: null,
        };
    },
    computed: {
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.familles.slice(startIndex, endIndex);
        },
    },
    methods: {
        async edit(id) {
            this.famille_id = null;
            this.famille_id = id;
            try {
                const respons = await axiosClient.get("/administratif/familles/" + this.famille_id);
                console.log(respons.data);
                this.famille = respons.data;
                console.log(this.famille);
                UIkit.modal('#modal-edit-Famille').show();
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        async update() {
            try {
                const response = await axiosClient.put("/administratif/familles/" + this.famille_id, this.famille);
                this.famille_id = null;
                this.getAllFamilles();
                UIkit.modal('#modal-edit-Famille').hide();
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        cleanid() {
            this.id_famile = null;
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        async addFamile() {
            this.id_famile = null;
            console.log(this.famille);
            try {
                const response = await axiosClient.post("/administratif/familles", this.famille);
                this.famile_info = response.data.data.famille;
                this.id_famile = response.data.data.famille.id;
                this.famille = {
                    nom: '',
                    situation: 'Marié',
                };
                UIkit.modal('#modal-group-1').hide();
                UIkit.modal('#modal-group-2').show();
                console.log(this.famile_info);
                $toast.success("créez une famille avec succès !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            } catch (error) {
                console.error("Error fetching parents:", error);
                $toast.warning("créer une famille a échoué !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            }
        },

        show1() {
            this.div1 = true;
            this.div2 = false;
            this.div3 = false;
        },
        show2() {
            this.div1 = false;
            this.div2 = true;
            this.div3 = false;
        },
        show3() {
            this.div1 = false;
            this.div2 = false;
            this.div3 = true;
        },
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.getAllFamilles();
                return;
            }

            this.familles = this.familles.filter((famille) => {
                const fullName = `${famille.nom} ${famille.situation}`.toLowerCase();
                return fullName.includes(query);
            });
        },

        async getAllFamilles() {
            try {
                const response = await axiosClient.get("/administratif/familles");
                this.familles = response.data;
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        delete(id) {
            removeIteme(id, "Are you sure?", "/administratif/familles/", this.familles, this.getAllFamilles);
        }
    },

};
</script>
  
<style scoped>
.d1 {
    display: flex;
}

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
  
  