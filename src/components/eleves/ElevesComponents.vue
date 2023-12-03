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
        <p uk-margin>
            <a class="btn px-3 py-1 h-9 mt-1 rounded-lg text-dark-eval-3" style="background-color: #016563;"
                href="#modal-group-4-1" @click="vide" uk-toggle><i class="bi bi-person-plus-fill text-white"></i></a>
        </p>
        <div id="modal-group-4-1" class="overflow-y-auto sm:p-0 bg-gray-200 bg-opacity-95 m-50" uk-modal>
            <div
                class=" uk-modal-dialog relative flex flex-col min-w-0 break-words w-75 mt-32 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="rounded-t bg-white mb-0 px-6 py-3">
                    <div class="text-center flex justify-between uk-modal-header">
                        <h6 class="text-blueGray-700 text-xl font-bold uk-modal-title">Ajouter Eleve</h6>
                    </div>
                </div>
                <form method="post" @submit.prevent="idEleve == 0 ? add : update"
                    class="flex-auto px-4 lg:px-10 pt-0 uk-modal-body">
                    <div class="row  mt-1">
                        <div class="col-lg-3 my-3">
                            <div class="flex items-center justify-center w-full mt-3 mb-4">
                                <label for="dropzone-file" v-if="!eleve.image"
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
                                <img v-if="eleve.image" :src="eleve.image" alt="Uploaded Image" @click="test"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="my-3" />
                            </div>
                            <div class="w-full px-3 mb-2 sm:h-1/1">
                                <label for="code" class="block text-sm font-medium text-gray-600 mb-2">Code</label>
                                <input type="text" id="code" v-model="eleve.code"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="code" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:h-1/1">
                                <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Genre</label>
                                <select v-model="eleve.sexe"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="femme">Femme</option>
                                    <option value="homme">Homme</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-9">

                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-2 sm:w-1/2">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                                    <input type="text" id="nom" v-model="eleve.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" />
                                </div>
                                <div class="w-full px-3 mb-2 sm:w-1/2" dir="rtl">
                                    <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">الاسم</label>
                                    <input type="text" id="prenom" v-model="eleve.nom_arab"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="الاسم" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-2 sm:w-1/2">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Prénom</label>
                                    <input type="text" id="nom" v-model="eleve.prenom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Prénom" />
                                </div>
                                <div class="w-full px-3 mb-2 sm:w-1/2" dir="rtl">
                                    <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">الاسم
                                        العائلي</label>
                                    <input type="text" id="prenom" v-model="eleve.prenom_arab"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="الاسم العائلي" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="etab_pre" class="block text-sm font-medium text-gray-600 mb-2">Etablissement
                                        précédent</label>
                                    <input type="text" id="nom" v-model="eleve.etab_pre"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Etablissement
                                        précédent" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="annee_scolaire" class="block text-sm font-medium text-gray-600 mb-2">Année
                                        Scolaire</label>
                                    <select v-model="eleve.annee_scolaire"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="(nationality, index) in yearOptions" :key="index"
                                            :value="nationality">
                                            {{ nationality }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="niveau" class="block text-sm font-medium text-gray-600 mb-2">Niveau</label>
                                    <select v-model="eleve.niveau"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Choisir un niveau</option>
                                        <option v-for="(niveau, index) in ListNiveaux" :key="index" :value="niveau">
                                            {{ niveau }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="date_naissance" class="block text-sm font-medium text-gray-600 mb-2">Date de
                                        Naissance</label>
                                    <input id="date_naissance" type="date" v-model="eleve.date_naissance"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="country" class="block text-sm font-medium text-gray-600 mb-2">Nationalité
                                        1</label>
                                    <input type="text" id="nom" v-model="eleve.nat"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Etablissement
                                        précédent" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="country" class="block text-sm font-medium text-gray-600 mb-2">Nationalité
                                        2</label>
                                    <input type="text" id="nom" v-model="eleve.nationalite"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Etablissement
                                        précédent" />
                                </div>
                            </div>

                        </div>

                        <div class="w-full px-3 pb-28 lg:p-0 sm:w-3/3 ">
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                                    @click="redirect">Cancel</button>
                                <button class="uk-button uk-button-default uk-modal-close mx-3"
                                    style="background-color: #005a70;" type="button" id="btn2s" @click="next">Next</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <div id="modal-group-4-2" class="overflow-y-auto sm:p-0 bg-gray-200 bg-opacity-95 m-50" uk-modal>
            <div
                class=" uk-modal-dialog relative flex flex-col min-w-0 break-words w-75 mt-32 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="rounded-t bg-white mb-0  py-3 ">
                    <div class="text-center flex justify-between uk-modal-header" style="display: flex;
    justify-content: center;">
                        <h6 class="text-blueGray-700 text-4xl font-bold uk-modal-title text-center">Fiche de
                            Renseignement <span class="px-3" style="color: #0094c6;" v-if="eleve.annee_scolaire != null">{{
                                eleve.annee_scolaire }}</span></h6>
                    </div>
                </div>

                <form method="post" @submit.prevent="idEleve == 0 ? add : update"
                    class="flex-auto px-4 lg:px-10 pt-0 uk-modal-body">
                    <div class="row  mt-1">
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Droit à l'image
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-4 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                Droit à l'image
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="droix_image" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="droix_image" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Problèmes de santé
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mt-3 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                <h3 class="font-semibold block text-lg text-black-600 mb-2">L'élève est-il souvent
                                    malade ?</h3>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="ismalade" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="ismalade" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3 sm:px-3">
                            <div class="w-full px-4 mb-2 sm:h-1/1">
                                <h3 class="font-medium block text-sm text-gray-600 mb-2">A-t-il un problème de santé ?</h3>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-1 mb-2 sm:px-3">

                            <div class="w-full px-3 mb-2 sm:w-1/3">
                                <div class="flex">
                                    <div class="flex items-center mr-4">DIABETE</div>

                                    <div class="flex items-center mr-4">
                                        <input id="inline-checkbox" type="radio" v-model="isDIABETE" value="oui"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="inline-2-checkbox" type="radio" v-model="isDIABETE" value="non"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-2-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/3">
                                <div class="flex">
                                    <div class="flex items-center mr-4">ASTHME</div>

                                    <div class="flex items-center mr-4">
                                        <input id="inline-checkbox" type="radio" v-model="isASTHME" value="oui"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="inline-2-checkbox" type="radio" v-model="isASTHME" value="non"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-2-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/3">
                                <div class="flex">
                                    <div class="flex items-center mr-4">ALLERGIES</div>

                                    <div class="flex items-center mr-4">
                                        <input id="inline-checkbox" type="radio" v-model="isALLERGIES" value="oui"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="inline-2-checkbox" type="radio" v-model="isALLERGIES" value="non"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-2-checkbox"
                                            class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-8/12">
                                <input type="text" id="prenom" v-model="sante.autre_malade"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="AUTRE" />
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-4/12">
                                <input type="text" id="prenom" v-model="sante.allergies_precision"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="précision" />
                            </div>
                        </div>
                        <div class="w-full px-3 pb-28 lg:p-0 sm:w-3/3 ">
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                                    @click="prev">prev</button>
                                <button class="uk-button uk-button-default uk-modal-close mx-3"
                                    style="background-color: #005a70;" type="button" id="btn2s"
                                    @click="nextto">Next</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="modal-group-4-3" class="overflow-y-auto sm:p-0 bg-gray-200 bg-opacity-95 m-50" uk-modal>
            <div
                class=" uk-modal-dialog relative flex flex-col min-w-0 break-words w-75 mt-32 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="rounded-t bg-white mb-0  py-3 ">
                    <div class="text-center flex justify-between uk-modal-header" style="display: flex;
    justify-content: center;">
                        <h6 class="text-blueGray-700 text-4xl font-bold uk-modal-title text-center">Fiche de
                            Renseignement <span class="px-3" style="color: #0094c6;" v-if="eleve.annee_scolaire != null">{{
                                eleve.annee_scolaire }}</span></h6>
                    </div>
                </div>
                <form method="post" @submit.prevent="idEleve == 0 ? add : update"
                    class="flex-auto px-4 lg:px-10 pt-0 uk-modal-body">
                    <div class="row  mt-1">
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Problèmes de santé (suite)
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                Prend-il un traitement régulièrement ?
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="istraitement" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="istraitement" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">Non</label>
                                </div>
                            </div>

                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-4 sm:w-1/1">
                                <textarea v-model="sante.autre_traitement_regulier"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                A-t-il des antécédents médicaux ou chirurgicaux à signaler ?
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="isantecedents" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="isantecedents" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                                </div>
                            </div>

                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-4 sm:w-1/1">
                                <textarea v-model="sante.Antecedents_medicaux_chirurgicaux"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                Problème de vision :
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="isvision" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="isvision" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="checkbox" v-model="sante.port_de_lunettes"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">port de
                                        lunettes</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.lentilies_de_contact"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">lentilies de
                                        contact</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                <input type="text" id="nom" v-model="sante.vision_precision"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="précision" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-7/12">
                                Problème d'audition :
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="isaudition" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="isaudition" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                <input type="text" id="nom" v-model="sante.autre_audition"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Autre" />
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Contacts d'urgence
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/2">
                                <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom Medecins</label>
                                <input type="text" id="nom" v-model="sante.nom_medecins"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nom Medecins" />
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/2">
                                <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom Cliniques</label>
                                <input type="text" id="nom" v-model="sante.nom_cliniques"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nom Cliniques" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/2">
                                <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Telephone
                                    Medecins</label>
                                <input type="text" id="prenom" v-model="sante.tele_medecins"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Telephone Medecins" />
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/2">
                                <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Telephone
                                    Cliniques</label>
                                <input type="text" id="prenom" v-model="sante.tele_cliniques"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Telephone Cliniques" />
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Troubles du langage écrit ou autre
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mr-3 mb-2 sm:w-9/12 ">
                                <h3 class="font-semibold block text-lg text-black-600 mb-2">L'élève est-il atteint de
                                    troubles du langage écrit ou autre ?</h3>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="radio" v-model="isatteint" value="oui"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-1/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="radio" v-model="isatteint" value="non"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="checkbox" v-model="sante.dyslexie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dyslexie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.dysorthographie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dysorthographie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.dyscalculie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dyscalculie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.dysgraphie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dysgraphie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.dysphasie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dysphasie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.dyspraxie"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dysparaxie</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-3/12 mt-2">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.troubles_de_attention"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Troubles de
                                        l'attention</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                <input type="text" id="nom" v-model="sante.autre_tle"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Autre" />
                            </div>
                        </div>
                        <div class="w-full px-3 pb-28 lg:p-0 sm:w-3/3 ">
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                                    @click="prevold">prev</button>
                                <button class="uk-button uk-button-default uk-modal-close mx-3"
                                    style="background-color: #005a70;" type="button" id="btn2s"
                                    @click="nexttoend">Next</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="modal-group-4-4" class="overflow-y-auto sm:p-0 bg-gray-200 bg-opacity-95 m-50" uk-modal>
            <div
                class=" uk-modal-dialog relative flex flex-col min-w-0 break-words w-75 mt-32 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="rounded-t bg-white mb-0  py-3 ">
                    <div class="text-center flex justify-between uk-modal-header" style="display: flex;
    justify-content: center;">
                        <h6 class="text-blueGray-700 text-4xl font-bold uk-modal-title text-center">Fiche de
                            Renseignement <span class="px-3" style="color: #0094c6;" v-if="eleve.annee_scolaire != null">{{
                                eleve.annee_scolaire }}</span></h6>
                    </div>
                </div>

                <form method="post" @submit.prevent="idEleve == 0 ? add : update"
                    class="flex-auto px-4 lg:px-10 pt-0 uk-modal-body">
                    <div class="row  mt-1">
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Troubles du langage écrit ou autre (suite)
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-5/12">
                                <h3 class="font-semibold block text-sm text-black mb-2">Est-il suivi en consultation
                                    spécialisée ?</h3>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-oui" type="checkbox" v-model="sante.psychologue"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-oui"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Psychologue</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.orthophoniste"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Orthophoniste</label>
                                </div>
                            </div>
                            <div class="w-full px-3 mb-2 sm:w-2/12 mt-1">
                                <div class="flex items-center">
                                    <input id="vue-checkbox-non" type="checkbox" v-model="sante.kinesitherapeute"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-non"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">kinésithérapeute</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                <input type="text" id="nom" v-model="sante.autre_cs"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Autre" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                Autres Précision :
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/1">
                                <textarea v-model="sante.signaler_autre_chose"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-4 py-2 text-xl text-white text-center"
                            style="background-color: #0098ca;">
                            <div class="w-full  mb-2 sm:w-12/12">
                                Vaccination:
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                            <div class="w-full px-3 mb-2 sm:w-1/1">
                                Vaccination : la vaccination DTP est obligatoire et doit être à jour
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-1">
                            <div class="w-full px-2 mb-2 mt-1 sm:w-3/12">
                                Rappel à 6 ans : Date
                            </div>
                            <div class="w-full px-2 mb-2 sm:w-3/12">
                                <input id="date_rappel_sixieme" type="date" v-model="sante.date_rappel_sixieme"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="w-full px-2 mb-2  mt-1 sm:w-3/12">
                                Rappel à 11/12 ans : Date
                            </div>
                            <div class="w-full px-2 mb-2 sm:w-3/12">
                                <input id="date_rappel_douzieme" type="date" v-model="sante.date_rappel_douzieme"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div class="w-full px-3 pb-28 lg:p-0 sm:w-3/3 ">
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button" id="btn2s"
                                    @click="prevoldd">prev</button>
                                <button class="uk-button uk-button-default uk-modal-close mx-3" @click="save"
                                    style="background-color: #005a70;" type="button" id="btn2s">save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <table class="min-w-full text-left text-xs whitespace-nowrap  overflow-y-auto">


            <thead
                class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t"
                style="color: #fff;background-color: #e28528d6;">
                <tr>
                    <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"
                        v-for="(column, index) in columns" :key="index">{{ column }}</th>
                    <th scope="col" class="px-2 py-3 border-x text-center dark:border-neutral-600"><button
                            @click="refreshData">Action</button></th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="(eleve, index) in displayedItems" :key="index"
                    class=" border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">
                        <img v-if="eleve.image" :src="eleve.image.path" alt="Image"
                            style="border-radius: 8em;width: 3em;height: 3em;display: flex;justify-content: center;align-items: center;" />
                    </td>
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{ eleve.code }}</td>
                    <td class="px-2 py-3 text-center  border-x dark:border-neutral-600">{{ eleve.nom }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.prenom }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.date_naissance }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.nat }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.nationalite }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.sexe }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.etab_pre }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.annee_scolaire }}</td>
                    <td class="px-2 py-3 text-center border-x dark:border-neutral-600">{{ eleve.niveau }}</td>

                    <td class="px-6 text-center border-x dark:border-neutral-600">
                        <div class="btn mr-1" style="color:#ff8201;" type="button" @click="edit(eleve.id)">
                            <i class="bi bi-brush-fill"></i>
                        </div>
                        <div class="btn" style="color: #a00042;" @click="remove(eleve.id, index)">
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                    </td>
                </tr>

            </tbody>

        </table>
        <pagination :totalItems="eleves.length" :itemsPerPage="itemsPerPage" @page-changed="handlePageChange"></pagination>
    </div>
</template>
<script>
import axiosClient from "../../axios";
import removeIteme from "../../GlobalFunctions";
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
            droix_image: "oui",
            ismalade: "non",
            isALLERGIES: "non",
            isASTHME: "non",
            isDIABETE: "non",
            istraitement: "non",
            isantecedents: "non",
            isvision: "non",
            isaudition: "non",
            isatteint: "non",
            searchQuery: '',
            itemsPerPage: 10,
            currentPage: 1,
            columns: [
                "image",
                "code",
                "nom",
                "prénom",
                "date naissance",
                "nationalité 1",
                "nationalité 2",
                "genre",
                "établissement précédente",
                "année scolaire",
                "niveau",
                // "Action",
            ],
            idEleve: 0,
            idSante: 0,
            eleves: [],
            eleve: {
                code: "",
                nom: "",
                prenom: "",
                nom_arab: "",
                prenom_arab: "",
                droit_image: false,
                date_naissance: null,
                nat: "Morocco",
                nationalite: "Morocco",
                sexe: "homme",
                etab_pre: null,
                annee_scolaire: null,
                niveau: null,
                famille_id: null,
                image: "",
                anciennete: 0,
            },
            sante: {
                malade: false,
                diabete: false,
                asthme: false,
                allergies: false,
                allergies_precision: "",
                autre_malade: "",
                traitement_regulier: false,
                autre_traitement_regulier: "",
                Antecedents_medicaux_chirurgicaux: "",
                antecedents_medicaux_ch: false,
                prb_vision: false,
                vision_precision: "",
                prb_audition: false,
                autre_audition: "",
                port_de_lunettes: false,
                lentilies_de_contact: false,
                atteint: false,
                dyslexie: false,
                dysorthographie: false,
                dyscalculie: false,
                dysgraphie: false,
                dysphasie: false,
                dyspraxie: false,
                troubles_de_attention: false,
                autre_tle: "",
                psychologue: false,
                orthophoniste: false,
                kinesitherapeute: false,
                autre_cs: "",
                signaler_autre_chose: "",
                date_rappel_sixieme: null,
                date_rappel_douzieme: null,
                nom_medecins: "",
                nom_cliniques: "",
                tele_medecins: "",
                tele_cliniques: "",
                eleve_id: null,
            },
            yearOptions: ["2023/2024", "2024/2025", "2025/2026", "2026/2027"],
            nationalities: [],
            ListNiveaux: ['PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème'],
        }
    },
    watch: {
        // isChecked(value) {
        //     if (!value) {
        //         this.isCheckedOui = false;
        //         this.isCheckedNon = false;
        //     }
        // },
        // isCheckedm(value) {
        //     if (!value) {
        //         this.isCheckedOuim = false;
        //         this.isCheckedNonm = false;
        //     }
        // }
    },
    computed: {
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.eleves.slice(startIndex, endIndex);
        },
        // isChecked() {
        //     return this.isCheckedOui || this.isCheckedNon;
        // }
    },
    mounted() {
        // this.idFamille = localStorage.getItem('id_famile');
        this.idFamille = this.FamilleId;
        console.log(this.idFamille);
        this.getEleveFromFammilles();
        this.getNationalities();
    },
    methods: {
        refreshData() {
            this.eleves = [];
            console.log("ok");
            this.getEleveFromFammilles();
        },
        async save_sante(idE) {
            if (this.ismalade == "oui") {
                this.sante.malade = true;
            } else {
                this.sante.malade = false;
            }
            if (this.isDIABETE == "oui") {
                this.sante.diabete = true;
            } else {
                this.sante.diabete = false;
            }
            if (this.isASTHME == "oui") {
                this.sante.asthme = true;
            } else {
                this.sante.asthme = false;
            }
            if (this.isALLERGIES == "oui") {
                this.sante.allergies = true;
            } else {
                this.sante.allergies = false;
            }
            if (this.istraitement == "oui") {
                this.sante.traitement_regulier = true;
            } else {
                this.sante.traitement_regulier = false;
            }
            if (this.isantecedents == "oui") {
                this.sante.antecedents_medicaux_ch = true;
            } else {
                this.sante.antecedents_medicaux_ch = false;
            }
            if (this.isvision == "oui") {
                this.sante.prb_vision = true;
            } else {
                this.sante.prb_vision = false;
            }
            if (this.isaudition == "oui") {
                this.sante.prb_audition = true;
            } else {
                this.sante.prb_audition = false;
            }
            if (this.isatteint == "oui") {
                this.sante.atteint = true;
            } else {
                this.sante.atteint = false;
            }
            this.sante.eleve_id = idE;
            try {
                const response_sante = await axiosClient.post(
                    "/administratif/santes",
                    this.sante
                );
            } catch (error) {
                console.error("Error fetching sante:", error);
                $toast.warning("créer une sante a échoué !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            }
        },
        async save() {
            this.eleve.famille_id = this.idFamille;
            this.eleve.anciennete = 0;
            if (this.droix_image == "oui") {
                this.eleve.droit_image = true;
            }
            try {
                const response_eleve = await axiosClient.post(
                    "/administratif/elevess/createacount",
                    this.eleve
                );
                this.save_sante(response_eleve.data.data.eleve.id);
                UIkit.modal('#modal-group-4-4').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                this.vide();
                this.getEleveFromFammilles();
                $toast.success("créez une eleve avec succès !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            } catch (error) {
                console.error("Error fetching eleves:", error);
                $toast.warning("créer une eleve a échoué !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            }
        },
        // isChecked() {
        //     return this.isCheckedOui || this.isCheckedNon;
        // },
        checks() {
            console.log("hee");
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        vide() {
            this.idEleve = 0;
            this.idSante = 0;
            this.eleve = {
                code: "",
                nom: "",
                prenom: "",
                nom_arab: "",
                prenom_arab: "",
                droit_image: false,
                date_naissance: null,
                nat: "Morocco",
                nationalite: "Morocco",
                sexe: "homme",
                etab_pre: null,
                annee_scolaire: null,
                niveau: null,
                famille_id: null,
                image: "",
                anciennete: null,
            };
            this.droix_image = "oui";
            this.ismalade = "non";
            this.isALLERGIES = "non";
            this.isASTHME = "non";
            this.isDIABETE = "non";
            this.istraitement = "non";
            this.isantecedents = "non";
            this.isvision = "non";
            this.isaudition = "non";
            this.isatteint = "non";
            this.sante = {
                malade: false,
                diabete: false,
                asthme: false,
                allergies: false,
                allergies_precision: "",
                autre_malade: "",
                traitement_regulier: false,
                autre_traitement_regulier: "",
                Antecedents_medicaux_chirurgicaux: "",
                prb_vision: false,
                vision_precision: "",
                prb_audition: false,
                autre_audition: "",
                port_de_lunettes: false,
                lentilies_de_contact: false,
                dyslexie: false,
                dysorthographie: false,
                dyscalculie: false,
                dysgraphie: false,
                dysphasie: false,
                dyspraxie: false,
                troubles_de_attention: false,
                autre_tle: "",
                psychologue: false,
                orthophoniste: false,
                kinesitherapeute: false,
                autre_cs: "",
                signaler_autre_chose: "",
                date_rappel_sixieme: null,
                date_rappel_douzieme: null,
                nom_medecins: "",
                nom_cliniques: "",
                tele_medecins: "",
                tele_cliniques: "",
                eleve_id: null,
            };
        },
        test() {
            this.eleve.image = "";
        },
        openImageUploader() {
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.eleve.image = e.target.result;
                };
                reader.readAsDataURL(file);

            }
        },
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.getEleveFromFammilles();
                return;
            }

            this.eleves = this.eleves.filter((eleve) => {
                const fullName = `${eleve.code} ${eleve.nom} ${eleve.prenom} ${eleve.date_naissance} ${eleve.etab_pre} ${eleve.annee_scolaire}  ${eleve.sexe} ${eleve.niveau}`.toLowerCase();
                return fullName.includes(query);
            });
        },
        redirect() {
            UIkit.modal('#modal-group-4-1').hide();
            UIkit.modal('#modal-group-4-2').hide();
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.show();
            }
        },
        next() {
            UIkit.modal('#modal-group-4-1').hide();
            UIkit.modal('#modal-group-4-2').show();
        },
        prev() {
            UIkit.modal('#modal-group-4-1').show();
            UIkit.modal('#modal-group-4-2').hide();
        },
        nextto() {
            UIkit.modal('#modal-group-4-2').hide();
            UIkit.modal('#modal-group-4-3').show();
        },
        prevold() {
            UIkit.modal('#modal-group-4-2').show();
            UIkit.modal('#modal-group-4-3').hide();
        },
        nexttoend() {
            UIkit.modal('#modal-group-4-3').hide();
            UIkit.modal('#modal-group-4-4').show();
        },
        prevoldd() {
            UIkit.modal('#modal-group-4-3').show();
            UIkit.modal('#modal-group-4-4').hide();
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
        async add() {
            this.eleve.famille_id = this.idFamille;
            this.eleve.anciennete = 0;
            try {
                const response = await axiosClient.post(
                    "/administratif/elevess/createacount",
                    this.eleve
                );
                this.vide();
                UIkit.modal('#modal-group-4').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                this.getEleveFromFammilles();
                $toast.success("créez une eleve avec succès !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            } catch (error) {
                console.error("Error fetching eleves:", error);
                $toast.warning("créer une eleve a échoué !", {
                    position: "bottom-right",
                    duration: 3000,
                });
            }
        },
        async edit(id) {
            this.idEleve = id;
            var modal = UIkit.modal('#modal-group-2');
            if (modal) {
                modal.hide();
            }
            UIkit.modal('#modal-group-4-1').show();
            try {
                const response = await axiosClient.get("/administratif/elevess/" + id);
                this.eleve = response.data;
                this.sante = this.eleve.santes[0];
                this.idSante = this.eleve.santes[0].id;
                if (this.sante.malade == 1) {
                    this.ismalade = "oui";
                } else {
                    this.ismalade = "non";
                }
                if (this.sante.allergies == 1) {
                    this.isALLERGIES = "oui";
                } else {
                    this.isALLERGIES = "non";
                }
                if (this.sante.asthme == 1) {
                    ;
                    this.isASTHME = "oui";
                } else {
                    this.isASTHME = "non";
                }
                if (this.sante.diabete == 1) {
                    this.isDIABETE = "oui";
                } else {
                    this.isDIABETE = "non";
                }
                if (this.sante.traitement_regulier == 1) {
                    this.istraitement = "oui";
                } else {
                    this.istraitement = "non";
                }
                if (this.sante.antecedents_medicaux_ch == 1) {
                    this.isantecedents = "oui";
                } else {
                    this.isantecedents = "non";
                }
                if (this.sante.prb_vision == 1) {
                    this.isvision = "oui";
                } else {
                    this.isvision = "non";
                }
                if (this.sante.prb_audition == 1) {
                    this.isaudition = "oui";
                } else {
                    this.isaudition = "non";
                }
                if (this.sante.atteint == 1) {
                    this.isatteint = "oui";
                } else {
                    this.isatteint = "non";
                }
                if (this.sante.dyscalculie == 1) {
                    this.sante.dyscalculie = true;
                } else {
                    this.sante.dyscalculie = false;
                }
                if (this.sante.dysgraphie == 1) {
                    this.sante.dysgraphie = true;
                } else {
                    this.sante.dysgraphie = false;
                }
                if (this.sante.dyslexie == 1) {
                    this.sante.dyslexie = true;
                } else {
                    this.sante.dyslexie = false;
                }
                if (this.sante.dysorthographie == 1) {
                    this.sante.dysorthographie = true;
                } else {
                    this.sante.dysorthographie = false;
                }
                if (this.sante.dysphasie == 1) {
                    this.sante.dysphasie = true;
                } else {
                    this.sante.dysphasie = false;
                }
                if (this.sante.dyspraxie == 1) {
                    this.sante.dyspraxie = true;
                } else {
                    this.sante.dyspraxie = false;
                }
                if (this.sante.troubles_de_attention == 1) {
                    this.sante.troubles_de_attention = true;
                } else {
                    this.sante.troubles_de_attention = false;
                }
                if (this.sante.port_de_lunettes == 1) {
                    this.sante.port_de_lunettes = true;
                } else {
                    this.sante.port_de_lunettes = false;
                }
                if (this.sante.lentilies_de_contact == 1) {
                    this.sante.lentilies_de_contact = true;
                } else {
                    this.sante.lentilies_de_contact = false;
                }
                if (this.sante.psychologue == 1) {
                    this.sante.psychologue = true;
                } else {
                    this.sante.psychologue = false;
                }
                if (this.sante.orthophoniste == 1) {
                    this.sante.orthophoniste = true;
                } else {
                    this.sante.orthophoniste = false;
                }
                if (this.sante.kinesitherapeute == 1) {
                    this.sante.kinesitherapeute = true;
                } else {
                    this.sante.kinesitherapeute = false;
                }
                this.sante.eleve_id = id;
            } catch (error) {
                console.error("Error fetching eleves:", error);
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(
                    "/administratif/elevess/" + this.idEleve,
                    this.eleve
                );
                if (this.ismalade == "oui") {
                    this.sante.malade = true;
                }
                if (this.isALLERGIES == "oui") {
                    this.sante.allergies = true;
                }
                if (this.isASTHME == "oui") {
                    this.sante.asthme = true;
                }
                if (this.isDIABETE == "oui") {
                    this.sante.diabete = true;
                }
                if (this.istraitement == "oui") {
                    this.sante.traitement_regulier = true;
                }
                if (this.isantecedents == "oui") {
                    this.sante.antecedents_medicaux_ch = true;
                }
                if (this.isvision == "oui") {
                    this.sante.prb_vision = true;
                }
                if (this.isaudition == "oui") {
                    this.sante.prb_audition = true;
                }
                if (this.isatteint == "oui") {
                    this.sante.atteint = true;
                }
                if (this.isatteint == "oui") {
                    this.sante.atteint = true;
                }
                console.log(this.sante);
                const response_sant = await axiosClient.put(
                    "/administratif/santes/" + this.idSante,
                    this.sante
                );
                console.log(response_sant.data);
                this.vide();
                UIkit.modal('#modal-group-3').hide();
                var modal = UIkit.modal('#modal-group-2');
                if (modal) {
                    modal.show();
                }
                this.getEleveFromFammilles();

            } catch (error) {
                console.error("Error fetching eleves:", error);
            }
        },
        async remove(id, index) {
            removeIteme(id, "Are you sure?", "/administratif/elevess/", this.eleves, this.getEleveFromFammilles);
        },
        async getEleveFromFammilles() {
            try {
                const response = await axiosClient.get("/administratif/familles/" + this.idFamille);
                this.eleves = response.data.eleves;
            } catch (error) {
                console.error("Error fetching eleves:", error);
            }
        }
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