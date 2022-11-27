import VueRouter from "vue-router";

const route = [
  // path별 component를 추가한다.
  {
    path: "/emr/Patient",
    component: () => import("@/components/EmrPatientMainPage.vue"),
  },
  {
    path: "/emr/Patient/Appointment",
    component: () => import("@/components/EmrAppointment"),
  },
  {
    //TODO: /emr/prescript/:id 형식의 GET을 받아서 올바른 권한이 있다면 해당 id의 처방전을 불러오고, 없다면 404를 띄워준다.
    path: "/emr/Patient/PreviousRecord",
    component: () => import("@/components/EmrPreviousRecordPage"),
  },
  //FIXME: TODO: 404 페이지를 만들어서 띄워준다.
];

const router = new VueRouter({
  mode: "history",
  routes: route,
});

export default router;
