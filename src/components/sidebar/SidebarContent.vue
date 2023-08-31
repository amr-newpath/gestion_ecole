<script setup>
import { useRouter } from "vue-router";
import PerfrectScrollbar from "@/components/PerfectScrollbar.vue";
import SidebarLink from "@/components/sidebar/SidebarLink.vue";
import SidebarCollapsible from "@/components/sidebar/SidebarCollapsible.vue";
import SidebarCollapsibleItem from "@/components/sidebar/SidebarCollapsibleItem.vue";

const userRole = sessionStorage.getItem("userRole");

const isCurrentRoute = (routeName) => {
  return useRouter().currentRoute.value.name == routeName;
};

const isCurrentPath = (path) => {
  return useRouter().currentRoute.value.path.startsWith(path);
};
</script>

<template>
  <PerfrectScrollbar
    tagname="nav"
    aria-label="main"
    class="relative flex flex-col flex-1 max-h-full gap-4 px-3"
  >
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
      <SidebarLink
        title="Dashboard"
        :to="{ name: 'AdminDashboard' }"
        :active="isCurrentRoute('AdminDashboard')"
        icon="mdi:view-dashboard"
      />
      <SidebarLink
        :to="{ name: 'AdminProfile' }"
        :active="isCurrentRoute('AdminProfile')"
        icon="mdi:shield-star-outline"
        title="Admin Profile"
      >
      </SidebarLink>

      <!--!! Gestion des eleves -->

      <!-- <SidebarCollapsible
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
      </SidebarCollapsible> -->

      <!--!! Gestion des parents -->
      <!-- <SidebarCollapsible
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
      </SidebarCollapsible> -->

      <SidebarCollapsible
        icon="mdi:shield-star-outline"
        title="Gestion des Admins"
        :active="isCurrentPath('/index')"
      >
        <SidebarCollapsibleItem
          :to="{ name: 'HomeAdmins' }"
          title="Home"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('HomeAdmins')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'AccountAdmins' }"
          title="Comptes"
          icon="mdi:sh  ield-star-outline"
          :active="isCurrentRoute('AccountAdmins')"
        />
      </SidebarCollapsible>

      <!-- <SidebarLink
      title="Gestion des Admins"
      :to="{ name: 'Dashboard' }"
      :active="isCurrentRoute('Dashboard')"
      icon="mdi:view-dashboard"
    /> -->

      <!-- <SidebarCollapsible icon="mdi:shield-star-outline" title="Authentication">
      </SidebarCollapsible> -->
    </template>

    <!-- ?? Sidebar for Administratif -->
    <template v-if="userRole === 'Administratif'">
      <SidebarLink
        title="Dashboard"
        :to="{ name: 'AdministratifDashboard' }"
        :active="isCurrentRoute('AdministratifDashboard')"
        icon="mdi:view-dashboard"
      />

      <SidebarLink
        :to="{ name: 'EleveInscription' }"
        :active="isCurrentRoute('EleveInscription')"
        icon="mdi:register-outline" 
        title="Fiche d'inscription"
      >
      </SidebarLink>

      <!-- <SidebarLink
        :to="{ name: 'HomeInscription' }"
        :active="isCurrentRoute('HomeInscription')"
        icon="mdi:shield-star-outline"
        title="List inscription"
      >
      </SidebarLink> -->

      <SidebarLink
        :to="{ name: 'ListEleves' }"
        :active="isCurrentRoute('ListEleves')"
        icon="ph:student-bold"
        title="Gestion des élèves"
      />

      <SidebarLink
        :to="{ name: 'ListTuteurs' }"
        :active="isCurrentRoute('ListTuteurs')"
        icon="ri:parent-line"
        title="Gestion des tuteurs"
      />

      <SidebarLink
        :to="{ name: 'AdministratifProfile' }"
        :active="isCurrentRoute('AdministratifProfile')"
        icon="material-symbols:home-repair-service-outline"
        title="Gestion des services"
      />

      <SidebarLink
        :to="{ name: 'AdministratifProfile' }"
        :active="isCurrentRoute('AdministratifProfile')"
        icon="ri:bus-line"
        title="Gestion du transport"
      />


      <SidebarLink
        :to="{ name: 'ListClasses' }"
        :active="isCurrentRoute('ListClasses')"
        icon="mdi:google-classroom"
        title="Gestion des classes"
      />

      <SidebarLink
        :to="{ name: 'AdministratifProfile' }"
        :active="isCurrentRoute('AdministratifProfile')"
        icon="mdi:shield-star-outline"
        title="Profile"
      >
      </SidebarLink>
    </template>

    <!-- ?? Sidebar for Comptable -->
    <template v-if="userRole === 'Comptable'">
      <SidebarLink
        title="Dashboard"
        :to="{ name: 'ComptableDashboard' }"
        :active="isCurrentRoute('ComptableDashboard')"
        icon="mdi:view-dashboard"
      />

      <SidebarLink
        title="Fiche de paiement"
        :to="{ name: 'CreatePaiement' }"
        :active="isCurrentRoute('CreatePaiement')"
        icon="ant-design:dollar-outlined"
      />

      <SidebarLink
        title="Consultation des reçus"
        :to="{ name: 'HomePaiement' }"
        :active="isCurrentRoute('HomePaiement')"
        icon="mdi:recurring-payment"
      />

      <SidebarLink
        title="Consultation menusalité"
        :to="{ name: 'MensualitePaiement' }"
        :active="isCurrentRoute('MensualitePaiement')"
        icon="mdi:cash-fast"
      />

      <SidebarLink
        title="Consultation rubrique"
        :to="{ name: 'RubriquePaiement' }"
        :active="isCurrentRoute('RubriquePaiement')"
        icon="ic:outline-fact-check" 
      />

      <SidebarLink
        title="Gestion des chèques"
        :to="{ name: 'ChequePaiement' }"
        :active="isCurrentRoute('ChequePaiement')"
        icon="uiw:pay" 
      />

      <SidebarLink
        title="Rapport des recettes"
        :to="{ name: 'RapportPaiement' }"
        :active="isCurrentRoute('RapportPaiement')"
        icon="mdi:cash-check"
      />

      <SidebarLink
        :to="{ name: 'ComptableProfile' }"
        :active="isCurrentRoute('ComptableProfile')"
        icon="mdi:shield-star-outline"
        title="Profile"
      >
      </SidebarLink>
    </template>
  </PerfrectScrollbar>
</template>
