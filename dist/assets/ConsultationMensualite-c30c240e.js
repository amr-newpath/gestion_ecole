import{_ as g,k as f,r as y,o as a,c,b as e,m as h,p as x,v as p,F as m,f as v,t as r,a as b,g as M}from"./index-8845255c.js";import{d as E}from"./debounce-4a8da910.js";import"./_baseGetTag-2ed90e23.js";const C={data(){return{selectedMonth:"Sept",selectedNiveau:"",isLoading:!1,searchQuery:"",eleves:[],months:["Sept","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","June","July"]}},computed:{filteredEleves(){const i=this.searchQuery.toLowerCase(),t=this.eleves.filter(l=>l.nom.toLowerCase().includes(i)||l.prenom.toLowerCase().includes(i)||l.famille.nom_complet.toLowerCase().includes(i));return!this.selectedMonth&&!this.selectedNiveau?t:t.filter(l=>l.paiements.some(d=>d.status==="Not completed"&&d.services.some(o=>o.service==="Frais scolarité"&&(!this.selectedMonth||o.pivot.month===this.selectedMonth)&&(!this.selectedNiveau||l.niveau===this.selectedNiveau))))},calculateTotalMontant(){return this.filteredEleves.reduce((t,l)=>t+this.getFraisScolariteMontant(l),0)+" DHs"}},methods:{navigateToPayer(){this.$router.push({name:"CreatePaiement"})},clearFilters(){this.searchQuery=""},async fetchPaiementsForEleve(i){try{return(await f.get(`/comptable/eleves/${i}/paiements`)).data}catch(t){return console.error("Error fetching paiements:",t),[]}},async fetchEleves(){try{this.isLoading=!0;const i=await f.get("/comptable/eleves");this.eleves=i.data;for(const t of this.eleves)t.paiements=await this.fetchPaiementsForEleve(t.id);this.isLoading=!1}catch(i){console.error("Error fetching eleves:",i),this.isLoading=!1}},getFraisScolariteMontant(i){const t="Frais scolarité";return i.paiements.filter(o=>o.status==="Not completed"&&o.services.some(n=>n.service===t&&n.pivot.month===this.selectedMonth&&n.pivot.paid===0)).reduce((o,n)=>{const u=n.services.find(s=>s.service===t&&s.pivot.month===this.selectedMonth&&s.pivot.paid===0);return u?o+u.pivot.price:o},0)}},watch:{selectedMonth:function(i){this.filteredEleves=this.eleves},searchQuery:E(function(i){},300)},mounted(){this.fetchEleves()}},N={class:"antialiased bg-gray-100 text-gray-600 my-16 px-4"},F={class:"flex flex-col justify-center h-full"},S={class:"w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"},k=e("header",{class:"px-5 py-4 border-b border-gray-100"},[e("h2",{class:"font-semibold text-gray-800"},"Consultation mensualité")],-1),L={class:"p-3"},P={class:"flex items-center justify-between mb-4"},T={class:"flex space-x-4"},Q=["value"],V=e("option",{value:""},"All Niveau",-1),j=e("option",{value:""},null,-1),D=[V,j],A=e("option",{value:""},"Anneé Scolaire",-1),B=e("option",{value:""},null,-1),U=[A,B],J={class:"overflow-x-auto"},H={key:0,class:"table-auto w-full"},q=e("thead",{class:"text-xs font-semibold uppercase text-gray-400 bg-gray-50"},[e("tr",null,[e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-left"},"Eleve")]),e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-left"},"Code")]),e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-left"},"Parent")]),e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-left"},"Niveau")]),e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-left"},"Montant")]),e("th",{class:"p-4 whitespace-nowrap"},[e("div",{class:"font-semibold text-center"},"Actions")])])],-1),O={class:"text-sm divide-y divide-gray-100"},z={class:"p-4 whitespace-nowrap"},G={class:"font-medium text-gray-800"},I={class:"p-4 whitespace-nowrap"},K={class:"text-left"},R={class:"p-4 whitespace-nowrap"},W={class:"text-left"},X={class:"p-4 whitespace-nowrap"},Y={class:"text-left"},Z={class:"p-4 whitespace-nowrap"},$={class:"text-left"},ee={class:"p-4 whitespace-nowrap"},te={class:"flex flex-col items-center space-y-2"},se=e("td",{colspan:"4",class:"p-4 whitespace-nowrap font-semibold just text-right text-yellow-500"}," Total Montant: ",-1),oe={class:"p-4 whitespace-nowrap font-semibold text-left"},ne=e("td",{class:"p-4 whitespace-nowrap"},null,-1),ie={key:1,class:"flex justify-center items-center h-32"},le=e("div",{class:"w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"},null,-1),re=[le];function ae(i,t,l,d,o,n){const u=y("font-awesome-icon");return a(),c("section",N,[e("div",F,[e("div",S,[k,e("div",L,[e("div",P,[e("div",T,[h(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>o.searchQuery=s),placeholder:"Search",class:"block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"},null,512),[[x,o.searchQuery]]),h(e("select",{"onUpdate:modelValue":t[1]||(t[1]=s=>o.selectedMonth=s),onChange:t[2]||(t[2]=(...s)=>n.filteredEleves&&n.filteredEleves(...s)),class:"px-2 py-1 border rounded-md focus:outline-none"},[(a(!0),c(m,null,v(o.months,s=>(a(),c("option",{key:s,value:s},r(s),9,Q))),128))],544),[[p,o.selectedMonth]]),h(e("select",{"onUpdate:modelValue":t[3]||(t[3]=s=>o.selectedNiveau=s),onChange:t[4]||(t[4]=(...s)=>n.filteredEleves&&n.filteredEleves(...s)),class:"px-2 py-1 border rounded-md focus:outline-none"},D,544),[[p,o.selectedNiveau]]),h(e("select",{"onUpdate:modelValue":t[5]||(t[5]=s=>o.selectedNiveau=s),onChange:t[6]||(t[6]=(...s)=>n.filteredEleves&&n.filteredEleves(...s)),class:"px-2 py-1 border rounded-md focus:outline-none"},U,544),[[p,o.selectedNiveau]])]),e("button",{onClick:t[7]||(t[7]=(...s)=>n.clearFilters&&n.clearFilters(...s)),class:"px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"}," Clear Filters ")]),e("div",J,[o.isLoading?(a(),c("div",ie,re)):(a(),c("table",H,[q,e("tbody",O,[(a(!0),c(m,null,v(n.filteredEleves,(s,_)=>(a(),c("tr",{key:_},[e("td",z,[e("div",G,r(s.nom)+" "+r(s.prenom),1)]),e("td",I,[e("div",K,r(s.code),1)]),e("td",R,[e("div",W,r(s.famille.nom_complet),1)]),e("td",X,[e("div",Y,r(s.niveau),1)]),e("td",Z,[e("div",$,r(n.getFraisScolariteMontant(s))+" DHs ",1)]),e("td",ee,[e("div",te,[e("button",{onClick:t[8]||(t[8]=(...w)=>n.navigateToPayer&&n.navigateToPayer(...w)),class:"flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"},[b(u,{icon:["fas","dollar-sign"],class:"h-5 w-5 mr-1"}),M(" Pay ")])])])]))),128)),e("tr",null,[se,e("td",oe,r(n.calculateTotalMontant),1),ne])])]))])])])])])}const he=g(C,[["render",ae]]);export{he as default};
