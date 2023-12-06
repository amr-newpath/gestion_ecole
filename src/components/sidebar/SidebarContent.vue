<template>
  <PerfrectScrollbar tagname="nav" aria-label="main" class="relative flex flex-col flex-1 max-h-full gap-4 px-3">
    <!-- <SidebarLink
      title="Dashboard"
      :to="{ name: 'Dashboard' }"
      :active="isCurrentRoute('Dashboard')"
      icon="mdi:view-dashboard"
    /> -->

    <!-- <SidebarCollapsible
      icon="mdi:note-outline"
      title="Pages"
      :active="isCurrentPath('/pages')"
    >
      <SidebarCollapsibleItem
        :to="{ name: 'Blank' }"
        title="Blank"
        :active="isCurrentRoute('Blank')"
      />
    </SidebarCollapsible> -->

    <!-- ?? Sidebar for Admin -->
    <template v-if="userRole === 'Admin'">
      <SidebarLink title="Dashboard" :to="{ name: 'AdminDashboard' }" :active="isCurrentRoute('AdminDashboard')"
        icon="mdi:view-dashboard" />

      <!--!! Gestion des eleves -->

      <SidebarCollapsible
        icon="mdi:shield-star-outline"
        title="Gestion des Elèves"
        :active="isCurrentPath('/pages')"
      >
        <SidebarCollapsibleItem
          :to="{ name: 'Blank' }"
          title="Home"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('Blank')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'Blank' }"
          title="Les comptes"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('Les comptes')"
        />
      </SidebarCollapsible>

      <!--!! Gestion des parents -->
      <SidebarCollapsible
        icon="mdi:shield-star-outline"
        title="Gestion des Parents"
        :active="isCurrentPath('/index')"
      >
        <SidebarCollapsibleItem
          :to="{ name: 'Blank' }"
          title="Home"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('Blank')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'Blank' }"
          title="Les comptes"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('Les comptes')"
        />
      </SidebarCollapsible>

      <SidebarLink :to="{ name: 'ListElevesAdmin' }" :active="isCurrentRoute('ListElevesAdmin')" icon="pajamas:account"
        title="Gestion des eleves" />

      <SidebarLink :to="{ name: 'ListTuteursAdmin' }" :active="isCurrentRoute('ListTuteursAdmin')"
        icon="icon-park-outline:family" title="Gestion des tuteurs" />

      <SidebarLink :to="{ name: 'ListMatieres' }" :active="isCurrentRoute('ListMatieres')" icon="tdesign:course"
        title="Gestion des matières" />

      <SidebarLink :to="{ name: 'ListClasses' }" :active="isCurrentRoute('ListClasses')" icon="mdi:google-classroom"
        title="Gestion des classes" />

      <!-- <SidebarLink
        :to="{ name: 'ListTuteursAdmin' }"
        :active="isCurrentRoute('ListTuteursAdmin')"
        icon="fa-solid:chalkboard-teacher"
        title="Gestion des profs"
      /> -->

      <SidebarCollapsible icon="mdi:shield-star-outline" title="Gestion des Admins" :active="isCurrentPath('/admin/gadmins') ||
        isCurrentPath('/admin/create-compte')
        ">
        <SidebarCollapsibleItem :to="{ name: 'HomeAdmins' }" title="List des admins" icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('HomeAdmins')" />
        <SidebarCollapsibleItem :to="{ name: 'AccountAdmins' }" title="Créer un compte" icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('AccountAdmins')" />
      </SidebarCollapsible>

      <SidebarCollapsible icon="fa-solid:chalkboard-teacher" title="Gestion des profs" :active="isCurrentPath('/admin/profs') || isCurrentPath('/admin/create-prof')
        ">
        <SidebarCollapsibleItem :to="{ name: 'HomeProfs' }" title="List des profs" icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('HomeProfs')" />
        <SidebarCollapsibleItem :to="{ name: 'AccountProfs' }" title="Créer un compte" icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('AccountProfs')" />
      </SidebarCollapsible>

    </template>

    <!-- ?? Sidebar for Administratif -->
    <template v-if="userRole === 'Administratif'">
      <SidebarLink title="Dashboard" :to="{ name: 'AdministratifDashboard' }"
        :active="isCurrentRoute('AdministratifDashboard')" icon="mdi:view-dashboard" />

      <SidebarLink :to="{ name: 'Familles' }" :active="isCurrentRoute('Familles')"
        icon="mdi:register-outline" title="Gestion des familles">
      </SidebarLink>

      <!-- <SidebarLink
        :to="{ name: 'HomeInscription' }"
        :active="isCurrentRoute('HomeInscription')"
        icon="mdi:shield-star-outline"
        title="List inscription"
      >
      </SidebarLink> -->

      <SidebarLink :to="{ name: 'ListEleves' }" :active="isCurrentRoute('ListEleves')" icon="ph:student-bold"
        title="Gestion des élèves" />

      <!-- <SidebarLink :to="{ name: 'ListTuteurs' }" :active="isCurrentRoute('ListTuteurs')" icon="ri:parent-line"
        @click="test()" title="Gestion des tuteurs" /> -->


      <!-- <button type="button" @click="hello" :class="[
        'p-2 w-full flex items-center gap-2 rounded-md transition-colors',
        {
          'text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2':
            !activee,
          'text-white bg-blue-500 shadow-lg hover:bg-blue-600':
            activee,
        }


      ]">
        <Icon icon="material-symbols:home-repair-service-outline" aria-hidden="true" class="flex-shrink-0 w-6 h-6" />

        <span class="text-base font-medium" v-show="showTitle">Gestion des
          services</span> 
        <slot name="arrow" />
      </button> -->
      <!-- Dropdown menu -->
      <SidebarLink :to="{ name: 'ListServices' }" :active="isCurrentRoute('ListServices1')"
        icon="material-symbols:home-repair-service-outline" title="Gestion des services" @click="hello()"/>
      <div id="dropdownDelay" v-if="isDropdownOpen" class="z-10">
        <ul class="" aria-labelledby="dropdownDelayButton">
          <li class=" mb-2">
            <SidebarLink :to="{ name: 'ListServices' }" :active="isCurrentRoute('ListServices')" icon="ri:parent-line"
              @click="test()" title="Lists" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'souscriptions' }" :active="isCurrentRoute('souscriptions')" icon="ri:parent-line"
              @click="test()" title="Souscription" />
          </li>

        </ul>
      </div>
      <SidebarLink :to="{ name: 'Effectue-paiements' }" :active="isCurrentRoute('Effectue-paiements1')"
        icon="material-symbols:home-repair-service-outline" title="Gestion des Payements" @click="getGetionPayementDropmenu()"/>
      <div id="dropdownDelay" v-if="isDropdownOpenGP" class="z-10">
        <ul class="" aria-labelledby="dropdownDelayButton">
          <li class=" mb-2">
            <SidebarLink :to="{ name: 'Effectue-paiements' }" :active="isCurrentRoute('Effectue-paiements')" icon="ri:parent-line"
              @click="test()" title="Effectué à paiements" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Paiements-encours' }" :active="isCurrentRoute('Paiements-encours')" icon="ri:parent-line"
              @click="test()" title="Liste paiements en cours" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Paiements-enretard' }" :active="isCurrentRoute('Paiements-enretard')" icon="ri:parent-line"
              @click="test()" title="Liste paiements en retard" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Paiements-avenir' }" :active="isCurrentRoute('Paiements-avenir')" icon="ri:parent-line"
              @click="test()" title="Liste paiements à venir" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Paiements-apayer' }" :active="isCurrentRoute('Paiements-apayer')" icon="ri:parent-line"
              @click="test()" title="Liste paiements à payer" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Paiements-apartiel' }" :active="isCurrentRoute('Paiements-apartiel')" icon="ri:parent-line"
              @click="test()" title="Liste paiements à partiel" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Payees-enavances' }" :active="isCurrentRoute('Payees-enavances')" icon="ri:parent-line"
              @click="test()" title="Liste payées en avances" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Payees-atemps' }" :active="isCurrentRoute('Payees-atemps')" icon="ri:parent-line"
              @click="test()" title="Liste payées a temps" />
          </li>
          <li class="">
            <SidebarLink :to="{ name: 'Payees-aretards' }" :active="isCurrentRoute('Payees-aretards')" icon="ri:parent-line"
              @click="test()" title="Liste payées en retards" />
          </li>
        </ul>
      </div>


      <!-- <SidebarLink
        :to="{ name: 'ListClasses' }"
        :active="isCurrentRoute('ListClasses')"
        icon="ri:bus-line"
        title="Gestion du transport"
      /> -->


      <!-- <SidebarLink :to="{ name: 'CreatePlanning' }" :active="isCurrentRoute('CreatePlanning')" icon="pajamas:planning"
        title="Gestion des plannings" /> -->

      <SidebarLink :to="{ name: 'AdministratifProfile' }" :active="isCurrentRoute('AdministratifProfile')"
        icon="gg:profile" title="Profile">
      </SidebarLink>
    </template>

    <!-- ?? Sidebar for Comptable -->
    <template v-if="userRole === 'Comptable'">
      <SidebarLink title="Dashboard" :to="{ name: 'ComptableDashboard' }" :active="isCurrentRoute('ComptableDashboard')"
        icon="mdi:view-dashboard" />

      <SidebarLink title="Fiche de paiement" :to="{ name: 'CreatePaiement' }" :active="isCurrentRoute('CreatePaiement')"
        icon="ant-design:dollar-outlined" />

      <SidebarLink title="Consultation des reçus" :to="{ name: 'HomePaiement' }" :active="isCurrentRoute('HomePaiement')"
        icon="mdi:recurring-payment" />

      <SidebarLink title="Consultation menusalité" :to="{ name: 'MensualitePaiement' }"
        :active="isCurrentRoute('MensualitePaiement')" icon="mdi:cash-fast" />

      <SidebarLink title="Consultation rubrique" :to="{ name: 'RubriquePaiement' }"
        :active="isCurrentRoute('RubriquePaiement')" icon="ic:outline-fact-check" />

      <SidebarLink title="Gestion des chèques" :to="{ name: 'ChequePaiement' }" :active="isCurrentRoute('ChequePaiement')"
        icon="uiw:pay" />

      <SidebarLink title="Rapport des recettes" :to="{ name: 'RapportPaiement' }"
        :active="isCurrentRoute('RapportPaiement')" icon="mdi:cash-check" />

      <SidebarLink :to="{ name: 'ComptableProfile' }" :active="isCurrentRoute('ComptableProfile')" icon="gg:profile"
        title="Profile">
      </SidebarLink>
    </template>

    <!-- ?? Sidebar for Eleve -->
    <template v-if="userRole === 'Eleve'">
      <SidebarLink title="Dashboard" :to="{ name: 'EleveDashboard' }" :active="isCurrentRoute('EleveDashboard')"
        icon="mdi:view-dashboard" />

      <SidebarLink title="Consulte le plainnig" :to="{ name: 'ElevePlanning' }" :active="isCurrentRoute('ElevePlanning')"
        icon="pajamas:planning" />

      <SidebarLink :to="{ name: 'EleveSeances' }" :active="isCurrentRoute('EleveSeances')"
        icon="fluent-mdl2:publish-course" title="Consulter les seances" />

      <SidebarLink :to="{ name: 'ProfsEleve' }" :active="isCurrentRoute('ProfsEleve')" icon="ph:chalkboard-teacher"
        title="Consulter les profs" />

      <SidebarLink title="Profile" :to="{ name: 'EleveProfile' }" :active="isCurrentRoute('EleveProfile')"
        icon="gg:profile" />

      <!-- <SidebarLink
        title="Consulter les activités"
        :to="{ name: 'EleveProfile' }"
        :active="isCurrentRoute('EleveProfile')"
        icon="fluent-mdl2:account-activity"
      /> -->
    </template>

    <!-- ?? Sidebar for Prof -->
    <template v-if="userRole === 'Prof'">
      <SidebarLink title="Dashboard" :to="{ name: 'ProfDashboard' }" :active="isCurrentRoute('ProfDashboard')"
        icon="mdi:view-dashboard" />

      <SidebarLink title="Consulte les plainnigs" :to="{ name: 'ProfPlanning' }" :active="isCurrentRoute('ProfPlanning')"
        icon="pajamas:planning" />

      <SidebarLink :to="{ name: 'ListSeancesProf' }" :active="isCurrentRoute('ListSeancesProf')"
        icon="fluent-mdl2:publish-course" title="Gestion des seances" />

      <SidebarLink :to="{ name: 'ListAbsencesProf' }" :active="isCurrentRoute('ListAbsencesProf')"
        icon="ic:outline-present-to-all" title="Consulter les absences" />

      <SidebarLink :to="{ name: 'ListMatieresProf' }" :active="isCurrentRoute('ListMatieresProf')" icon="tdesign:course"
        title="Consulter les matières" />

      <SidebarLink :to="{ name: 'ProfProfile' }" :active="isCurrentRoute('ProfProfile')" icon="gg:profile"
        title="Profile" />

    </template>
  </PerfrectScrollbar>
</template>


<script>
import { useRouter } from "vue-router";
import { sidebarState } from "@/composables";
import { Icon } from "@iconify/vue";
import PerfectScrollbar from "@/components/PerfectScrollbar.vue";
import SidebarLink from "@/components/sidebar/SidebarLink.vue";
import SidebarCollapsible from "@/components/sidebar/SidebarCollapsible.vue";
import SidebarCollapsibleItem from "@/components/sidebar/SidebarCollapsibleItem.vue";
import router from "@/router";

export default {
  components: {
    SidebarLink,
    Icon,
  },
  data() {
    return {
      userRole: sessionStorage.getItem("userRole"),
      isDropdownOpen: false,
      isDropdownOpenGP: false,
      activee: false,
      activeGP: false,
      az: sidebarState.isOpen,
      ad: sidebarState.isHovered,
    };
  },
  computed: {
    buttonClasses() {
      return [
        'p-2 flex items-center gap-2 rounded-md transition-colors',
        {
          'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2': !this.active,
          'text-white bg-blue-500 shadow-lg hover:bg-blue-600': this.active,
        },
      ]
    },
    showTitle() {
      return sidebarState.isOpen || sidebarState.isHovered
    },
  },
  mounted() {
    // Code to run when the component is mounted
  },
  methods: {
    test() {
      this.activee = false;
    },
    isCurrentRoute(routeName) {
      return this.$route.name === routeName;
    },
    isCurrentPath(path) {
      return this.$route.path.startsWith(path);
    },
    hello() {
      this.activee = !this.activee;
      console.log(this.isDropdownOpen);
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    getGetionPayementDropmenu(){
      this.activeGP = !this.activeGP;
      console.log(this.isDropdownOpenGP);
      this.isDropdownOpenGP = !this.isDropdownOpenGP;
    }
  }
};
</script>


