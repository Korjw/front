<template>
  <div class="min-h-screen bg-gray-100">
    <EmrHeader></EmrHeader>
    <div class="flex">
      <EmrSideBar></EmrSideBar>
      <div class="w-full">
        Reservation
        <PatientMainView></PatientMainView>
      </div>
      <div class="w-full">
        Reservation check
        <PatientReservation></PatientReservation>
      </div>
      <div class="w-full">
        previous record
        <PatientPreviousRecord></PatientPreviousRecord>
      </div>
    </div>
  </div>
</template>

    
<script>
import EmrSideBar from "./components/EmrSideBar.vue";
import EmrHeader from "./components/EmrHeader.vue";
import PatientMainView from "./components/PatientMainView.vue";
import PatientReservation from "./components/PatientReservation.vue";
import PatientPreviousRecord from "./components/PatientPreviousRecord.vue";

export default {
  components: {
    EmrSideBar,
    EmrHeader,
    PatientMainView,
    PatientReservation,
    PatientPreviousRecord,
  },
};
</script> 

<style>
</style>