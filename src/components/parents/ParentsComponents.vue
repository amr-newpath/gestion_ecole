<template>
    <div>
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
        <p class="flex" uk-margin>
            <a class="btn px-3 py-1 h-9 mt-1 rounded-lg text-dark-eval-3" style="background-color: #016563;"
                href="#modal-group-3" @click="vide" uk-toggle><i class="bi bi-person-plus-fill text-white"></i></a>
            <!-- <span class="px-3 py-1 h-9 mt-1 w-full text-end">
                <a class="btn px-3 py-1 h-9 mt-1 ml-3 rounded-lg text-dark-eval-3" style="background-color: #0098ca;"
                    href="#modal-group-3" @click="vide" uk-toggle><i class="bi bi-caret-right-fill text-white"></i></a>
            </span> -->
        </p>

        <div id="modal-group-3" class="w-full lg:w-12/12 px-4 mx-auto mt-6 uk-modal-container" uk-modal>
            <div
                class=" uk-modal-dialog relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="rounded-t bg-white mb-0 px-6 py-3">
                    <div class="text-center flex justify-between uk-modal-header">
                        <h6 class="text-blueGray-700 text-xl font-bold uk-modal-title">Ajouter Parent</h6>
                    </div>
                </div>
                <form method="post" class="flex-auto px-4 lg:px-10  pt-0 uk-modal-body">
                    <div class="row  mt-1">
                        <div class="col-lg-3 my-3">
                            <!-- upload image -->
                            <div class="flex items-center justify-center w-full mt-3 mb-4">
                                <label for="dropzone-file" v-if="!parent.image"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                    </div>
                                    <input id="dropzone-file" type="file" accept="image/*" ref="imageInput"
                                        @change="handleImageUpload" class="hidden" />
                                </label>
                                <img v-if="parent.image" :src="parent.image" alt="Uploaded Image" @click="test"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="my-3" />
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="civilite" class="block text-sm font-medium text-gray-600 mb-2">Civilité
                                        :</label>
                                    <select v-model="parent.civilite"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="M.">M.</option>
                                        <option value="Mme">Mme</option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom :</label>
                                    <input type="text" id="nom" v-model="parent.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Prénom
                                        :</label>
                                    <input type="text" id="prenom" v-model="parent.prenom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Prénom" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="profession" class="block text-sm font-medium text-gray-600 mb-2">Profession
                                        :</label>
                                    <input type="text" id="profession" v-model="parent.profession"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Profession" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="country" class="block text-sm font-medium text-gray-600 mb-2">Nationalité
                                        :</label>
                                    <select v-model="parent.nat"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="nationality in nationalities" :key="nationality"
                                            :value="nationality">
                                            {{ nationality }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Lien
                                        De
                                        Parenté :</label>
                                    <select v-model="parent.liendeparente_id"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="linedeparente in linedeparentes" :key="linedeparente.id"
                                            :value="linedeparente.id">{{ linedeparente.type }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <ul
                            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="vue-checkbox-list" type="checkbox" v-model="parent.authorisationderecup"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Autorisation
                                        de Récupération</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="react-checkbox-list" type="checkbox" v-model="parent.responsablelegale"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="react-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Responsable
                                        Légale</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.Gardelegale"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Garde
                                        Légale</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.payeur"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Payeur</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.contacturgence"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Contact
                                        d'Urgence</label>
                                </div>
                            </li>
                        </ul>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3 mt-3">
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email :</label>
                                <input type="text" id="email" v-model="parent.email"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="email" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="telephone" class="block text-sm font-medium text-gray-600 mb-2">Téléphone
                                    1 :</label>
                                <input type="text" id="telephone" v-model="parent.tel"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="telephone" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="telephone" class="block text-sm font-medium text-gray-600 mb-2">Téléphone
                                    2 :</label>
                                <input type="text" id="telephone" v-model="parent.phone"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="telephone" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Genre :</label>
                                <select v-model="parent.genre"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                </select>
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-3/3">
                                <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                                <textarea
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    v-model="parent.adresse" cols="30" rows="2"></textarea>
                            </div>
                            <div class="uk-modal-footer uk-text-right w-full px-3 sm:w-3/3">
                                <button class="uk-button uk-button-default uk-modal-close" @click="redirect" id="btn2s"
                                    type="button">Annuler</button>
                                <button type="button" @click.prevent="add" id="btn1s"
                                    class="uk-button uk-button-primary mx-3" v-if="idParent == 0">Ajouter</button>
                                <button type="button" @click.prevent="update" id="btn3s" class="uk-button btn-warning mx-3"
                                    v-else>Mettre à jour</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>



        <table class="min-w-full text-left text-xs whitespace-nowrap">

            <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 dark:bg-neutral-800 border-t"
                style="color: #fff;background-color: #0098ca;">
                <tr>

                    <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                        v-for="(column, index) in columns" :key="index">{{ column }}</th>
                    <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"><button
                            @click="refreshData">Action</button></th>

                </tr>
            </thead>

            <tbody>

                <tr v-for="(parent, index) in displayedItems" :key="index"
                    class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                        <img v-if="parent.image" :src="parent.image.path" alt="Image"
                            style="border-radius: 8em;width: 3em;height: 3em;display: flex;justify-content: center;align-items: center;" />
                    </td>
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{ parent.nom }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.prenom }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.profession }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.nat }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.email }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.phone }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.tel }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.adresse }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.civilite }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ parent.genre }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600"><i
                            :class="parent.authorisationderecup == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600"><i
                            :class="parent.responsablelegale == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600"><i
                            :class="parent.Gardelegale == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600"><i
                            :class="parent.payeur == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                    </td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600"><i
                            :class="parent.contacturgence == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                    </td>
                    <td class="px-6 text-center border-x dark:border-neutral-600">
                        <div class="btn mr-1" style="color:#ff8201;" type="button" @click="edit(parent.id)">
                            <i class="bi bi-brush-fill"></i>
                        </div>
                        <div class="btn" style="color: #a00042;" @click="remove(parent.id)">
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination :totalItems="parents.length ? parents.length : 0" :itemsPerPage="itemsPerPage"
            @page-changed="handlePageChange"></pagination>
    </div>
</template>
<script>
import axiosClient from "../../axios";
import Swal from "sweetalert2";
import Pagination from '@/components/Pagination.vue'
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
            idFamille: null,
            idParent: 0,
            parent: {
                nom: "",
                prenom: "",
                profession: "",
                nat: "Morocco",
                email: "",
                phone: "",
                tel: "",
                adresse: "",
                civilite: "M.",
                genre: "M",
                authorisationderecup: false,
                responsablelegale: false,
                Gardelegale: false,
                payeur: false,
                contacturgence: false,
                image: "",
                liendeparente_id: 2,
                famille_id: null,
            },
            linedeparentes: [],
            nationalities: [],
            searchQuery: '',
            itemsPerPage: 10,
            currentPage: 1,
            columns: [
                "image",
                "nom",
                "prénom",
                "profession",
                "nationalité",
                "email",
                "téléphone 1",
                "téléphone 2",
                "adresse",
                "civilité",
                "genre",
                "AR",
                "RL",
                "GL",
                "P",
                "CU",
                // "Action",
            ],
            parents: [],

        }
    },
    computed: {
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.parents.slice(startIndex, endIndex);
        },
    },
    async mounted() {
        // this.idFamille = localStorage.getItem('id_famile');
        this.idFamille = this.FamilleId;
        console.log(this.idFamille);
        this.getParentFromFammilles();
        this.getNationalities();
        this.getLinedeParents();
    },
    methods: {
        refreshData() {
            this.parents = [];
            console.log("ok");
            this.getParentFromFammilles();
        },
        handelimageT(path) {
            console.log('../../assets/images/' + path);
        },
        vide() {
            this.idParent = 0;
            this.parent = {
                nom: "",
                prenom: "",
                profession: "",
                nat: "Morocco",
                email: "",
                phone: "",
                tel: "",
                adresse: "",
                civilite: "M.",
                genre: "M",
                authorisationderecup: false,
                responsablelegale: false,
                Gardelegale: false,
                payeur: false,
                contacturgence: false,
                image: "",
                liendeparente_id: 2,
                famille_id: null,
            };
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.getParentFromFammilles();
                return;
            }
            this.parents = this.parents.filter((parent) => {
                const fullName = `${parent.nom} ${parent.prenom} ${parent.profession} ${parent.nat} ${parent.email} ${parent.tel} ${parent.phone} ${parent.genre} ${parent.civilite} ${parent.famille.nom} ${parent.liendeparente.type} ${parent.adresse}`.toLowerCase();
                return fullName.includes(query);
            });
        },
        async getParentFromFammilles() {
            try {
                const response = await axiosClient.get("/administratif/familles/" + this.idFamille);
                this.parents = response.data.parente;
                console.log(this.parents);
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        test() {
            this.parent.image = "";
        },
        openImageUploader() {
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.parent.image = e.target.result;
                };
                reader.readAsDataURL(file);

            }
        },
        async add() {
            this.parent.famille_id = this.idFamille;
            console.log(this.parent);
            try {
                const response = await axiosClient.post(
                    "/administratif/parentes/createacount",
                    this.parent
                );
                console.log(response.data.data);
                this.parents.push(response.data.data);
                this.parent = {
                    nom: "",
                    prenom: "",
                    profession: "",
                    nat: "Morocco",
                    email: "",
                    phone: "",
                    tel: "",
                    adresse: "",
                    civilite: "M.",
                    genre: "M",
                    authorisationderecup: false,
                    responsablelegale: false,
                    Gardelegale: false,
                    payeur: false,
                    contacturgence: false,
                    image: "",
                    liendeparente_id: 2,
                    famille_id: null,
                };
                UIkit.modal('#modal-group-3').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                $toast.success("créez une parent avec succès !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            } catch (error) {
                console.error("Error fetching parents:", error);
                $toast.warning("créer une parent a échoué !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            }
        },
        redirect() {
            UIkit.modal('#modal-group-3').hide();
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.show();
            }
        },
        async edit(id) {
            this.idParent = id;
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.hide();
            }
            UIkit.modal('#modal-group-3').show();
            try {
                const response = await axiosClient.get("/administratif/parentes/" + id);
                this.parent = response.data;
                if (this.parent.authorisationderecup == 1) {
                    this.parent.authorisationderecup = true;
                } else {
                    this.parent.authorisationderecup = false;
                }
                if (this.parent.Gardelegale == 1) {
                    this.parent.Gardelegale = true;
                } else {
                    this.parent.Gardelegale = false;
                }
                if (this.parent.payeur == 1) {
                    this.parent.payeur = true;
                } else {
                    this.parent.payeur = false;
                }
                if (this.parent.contacturgence == 1) {
                    this.parent.contacturgence = true;
                } else {
                    this.parent.contacturgence = false;
                }
                if (this.parent.responsablelegale == 1) {
                    this.parent.responsablelegale = true;
                } else {
                    this.parent.responsablelegale = false;
                }
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(
                    "/administratif/parentes/" + this.idParent,
                    this.parent
                );
                this.parents = this.parents.map((el) => {
                    if (el.id === this.idParent) {
                        el = this.parent;
                        return {
                            ...el,
                        };
                    }
                    return el;
                });
                this.idParent = 0;
                this.parent = {
                    nom: "",
                    prenom: "",
                    profession: "",
                    nat: "Morocco",
                    email: "",
                    phone: "",
                    tel: "",
                    adresse: "",
                    civilite: "M.",
                    genre: "M",
                    authorisationderecup: false,
                    responsablelegale: false,
                    Gardelegale: false,
                    payeur: false,
                    contacturgence: false,
                    image: "",
                    liendeparente_id: 2,
                    famille_id: null,
                };
                UIkit.modal('#modal-group-3').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }

            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        async getLinedeParents() {
            try {
                const response = await axiosClient.get(
                    "/administratif/linedeparentes",
                );
                this.linedeparentes = response.data;
            } catch (error) {
                console.error("Error fetching line de parentes:", error);
            }
        },
        async remove(id) {
            console.log("delete" + id);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons
                .fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    customClass: {
                        confirmButton: "btn bg-danger  text-white",
                        cancelButton: "btn bg-primary mr-5 text-white",
                    },
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const res = await axiosClient.delete('/administratif/parentes/' + id);
                            this.parents = this.parents.filter((el) => el.id !== id);
                            console.log(res.data);
                        } catch (error) {
                            console.error("Error fetching parents:", error);
                        }
                        swalWithBootstrapButtons
                            .fire("Deleted!", "Your file has been deleted.", "success")
                            .then((result) => {
                                if (result.isConfirmed) {
                                }
                            });
                    } else if (

                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                    }
                });
        },
        async getNationalities() {
            try {
                const response = await axiosClient.get(
                    "https://restcountries.com/v3/all"
                );
                this.nationalities = response.data.map(
                    (country) => country.name.common
                );
            } catch (error) {
                console.error("Error fetching nationalities:", error);
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