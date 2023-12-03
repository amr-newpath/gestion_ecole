<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-11/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">My Parents</h6>
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            <router-link :to="{ name: 'AddParent' }">
                                <i class="bi bi-person-plus-fill"></i>
                            </router-link>
                        </h6>
                    </div>
                </div>
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

                    <!-- Table -->
                    <table class="min-w-full text-left text-xs whitespace-nowrap">

                        <!-- Table head -->
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
                                <th scope="col" class="px-6 py-6 border-x dark:border-neutral-600"
                                    v-for="(column, index) in columns" :key="index">{{ column }}</th>
                            </tr>
                        </thead>

                        <!-- Table body -->
                        <tbody>

                            <tr v-for="(parent, index) in parents" :key="index"
                                class="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
                                <th scope="row" class="px-6 py-6 border-x dark:border-neutral-600">

                                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox" id="checkboxNoLabel" v-model="parent.checked"
                                            @change="checkaddone(parent)" aria-label="..." />
                                    </div>
                                </th>
                                <td>
                                    <router-link class="btn text-warning  rounded-circle mr-1"
                                        :to="{ name: 'EditParent', params: { id: $route.params.id, idP: parent.id } }">
                                        <i class="bi bi-brush-fill"></i>
                                    </router-link>
                                    <div class="btn text-danger" @click="this.delete(parent.id)">
                                        <i class="bi bi-trash3-fill"></i>
                                    </div>
                                </td>
                                <th scope="row" class="px-6 py-6 border-x dark:border-neutral-600">
                                    {{ parent.id }}
                                </th>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <img class="rounded-full" src="../../../assets/images/avatar.jpg" width="30" height="30"
                                        alt="Avatar">
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.nom }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.prenom }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.profession }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.nat }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.email }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.tel }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.phone }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.adresse }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.civilite }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.genre }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <i
                                        :class="parent.authorisationderecup == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <i
                                        :class="parent.responsablelegale == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <i
                                        :class="parent.Gardelegale == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <i
                                        :class="parent.payeur == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">
                                    <i
                                        :class="parent.contacturgence == 1 ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
                                </td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.liendeparente.type }}</td>
                                <td class="px-6 py-6 border-x dark:border-neutral-600">{{ parent.famille.nom }}</td>
                            </tr>

                        </tbody>

                    </table>

                    <!-- <nav class="mt-5 flex items-center justify-between text-sm mb-5" aria-label="Page navigation example">
                        <p>
                            Showing <strong>1-5</strong> of <strong>10</strong>
                        </p>

                        <ul class="list-style-none flex">
                            <li>
                                <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#!">
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#!">
                                    1
                                </a>
                            </li>
                            <li aria-current="page">
                                <a class="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
                                    href="#!">
                                    2
                                    <span
                                        class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                                        (current)
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#!">
                                    3
                                </a>
                            </li>
                            <li>
                                <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#!">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav> -->

                </div>

                <!-- <div class="table-responsive p-3 mb-5">
                    <table class="table bg-light caption-top bg-white table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>image</th>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>profession</th>
                                <th>nationalitie</th>
                                <th>email</th>
                                <th><span class="d-flex"><span>telephone</span><span class="ml-2">1</span></span></th>
                                <th><span class="d-flex"><span>telephone</span><span class="ml-2">2</span></span></th>
                                <th style="padding-left: 3em;padding-right: 3em;">adresse</th>
                                <th>civilité</th>
                                <th>genre</th>
                                <th style="padding-left: 3em;padding-right: 3em;">A</th>
                                <th style="padding-left: 3em;padding-right: 3em;">RC</th>
                                <th style="padding-left: 3em;padding-right: 3em;">GL</th>
                                <th style="padding-left: 3em;padding-right: 3em;">P</th>
                                <th style="padding-left: 3em;padding-right: 3em;">CU</th>
                                <th style="padding-left: 3em;padding-right: 3em;">L&P</th>
                                <th style="padding-left: 3em;padding-right: 3em;">Fammille</th>
                                <th style="padding-left: 3em;padding-right: 3em;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="parent in parents" :key="parent.id">
                                <th scope="row">{{ parent.id }}</th>
                                <td>
                                    <img class="rounded-full" src="../../../assets/images/avatar.png" width="30" height="30"
                                        alt="Avatar">
                                </td>

                                <td class="text-center">{{ parent.nom }}</td>

                                <td class="text-center">{{ parent.prenom }}</td>

                                <td class="text-center">{{ parent.profession }}</td>

                                <td class="text-center">{{ parent.nat }}</td>

                                <td class="text-center">{{ parent.email }}</td>

                                <td class="text-center">{{ parent.tel }}</td>

                                <td class="text-center">{{ parent.phone }}</td>

                                <td class="text-center">{{ parent.adresse }}</td>

                                <td class="text-center">{{ parent.civilite }}</td>

                                <td class="text-center">{{ parent.genre }}</td>

                                <td class="text-center" v-if="parent.authorisationderecup == 1">
                                    <i class="bi bi-check-square-fill text-success"></i>
                                </td>
                                <td class="text-center" v-else>
                                    <i class="bi bi-x-square-fill text-danger"></i>
                                </td>

                                <td class="text-center" v-if="parent.responsablelegale == 1">
                                    <i class="bi bi-check-square-fill text-success"></i>
                                </td>
                                <td class="text-center" v-else>
                                    <i class="bi bi-x-square-fill text-danger"></i>
                                </td>
                                <td class="text-center" v-if="parent.Gardelegale == 1">
                                    <i class="bi bi-check-square-fill text-success"></i>
                                </td>
                                <td class="text-center" v-else>
                                    <i class="bi bi-x-square-fill text-danger"></i>
                                </td>
                                <td class="text-center" v-if="parent.payeur == 1">
                                    <i class="bi bi-check-square-fill text-success"></i>
                                </td>
                                <td class="text-center" v-else>
                                    <i class="bi bi-x-square-fill text-danger"></i>
                                </td>
                                <td class="text-center" v-if="parent.contacturgence == 1">
                                    <i class="bi bi-check-square-fill text-success"></i>
                                </td>
                                <td class="text-center" v-else>
                                    <i class="bi bi-x-square-fill text-danger"></i>
                                </td>

                                <td class="text-center">{{ parent.liendeparente.type }}</td>

                                <td class="text-center">{{ parent.famille.nom }}</td>

                                <td>
                                    <router-link class="btn btn-warning  rounded-circle mr-1 ml-5"
                                        :to="{ name: 'EditParent', params: { id: $route.params.id, idP: parent.id } }">
                                        <i class="bi bi-brush-fill  text-white"></i>
                                    </router-link>
                                    <div class="btn btn-danger  rounded-circle" @click="this.delete(parent.id)">
                                        <i class="bi bi-trash3-fill"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                <!-- </div> -->
                <div class="flex justify-end items-center mb-5 mt-4">
                    <button type="button" @click="redirectToeleves"
                        class="inline-block mr-5 rounded-full bg-info px-6 pb-2 pt-2.5 text-xr font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
                        next
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axiosClient from "../../../axios";
export default {
    data() {
        return {
            isCheckAll: false,
            searchQuery: '',
            selectedItems: [],
            columns: [
                "Action",
                "#",
                "image",
                "nom",
                "prenom",
                "profession",
                "nationalitie",
                "email",
                "telephone 1",
                "telephone 2",
                "adresse",
                "civilité",
                "genre",
                "A",
                "RC",
                "GL",
                "P",
                "CU",
                "L&P",
                "Fammille",
            ],
            parents: [],
        }
    },
    mounted() {
        this.getParents();
    },

    methods: {
        search() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.getParents();
                return;
            }

            this.parents = this.parents.filter((parent) => {
                const fullName = `${parent.nom} ${parent.prenom} ${parent.profession} ${parent.nat} ${parent.email} ${parent.tel} ${parent.phone} ${parent.genre} ${parent.civilite} ${parent.famille.nom} ${parent.liendeparente.type} ${parent.adresse}`.toLowerCase();
                return fullName.includes(query);
            });
        },
        checkAll() {
            this.selectedItems = [];
            this.parents.forEach((parent) => {
                parent.checked = this.isCheckAll;
                if (parent.checked == true) {
                    this.selectedItems.push(parent);
                }
            });
        },
        redirectToeleves() {
            this.$router.push({ name: 'ElevesInscription', params: { id: this.$route.params.id } });
        },
        checkaddone(parent) {
            this.selectedItems.push(parent);
            console.log(this.selectedItems);
        },
        async getParents() {
            try {
                const response = await axiosClient.get("/administratif/familles/" + this.$route.params.id);
                this.parents = response.data.parente;
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
    },
}
</script>
<style scoped>
th {
    text-transform: uppercase;
}
</style>