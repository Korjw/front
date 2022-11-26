<template>
  <div class="gap-10 max-w-[64rem] sticky top-0">
    <div
      class="flex flex-col-reverse md:flex-row gap-10 overflow-y-scroll scrollbar-hide"
    >
      <!-- NOTE: list view -->

      <div class="flex gap-10 justify-between">
        <div
          class="flex-1 min-w-[20rem] max-h-[42rem] border-r border-gray-600 pr-10 text-gray-900 dark:text-gray-300 flex flex-col gap-5"
        >
          <button
            v-for="emr_for_date in emrList"
            :key="emr_for_date"
            type="button"
            class="items-center justify-between p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            @click="optionShow(emr_for_date.createdAt)"
          >
            {{ emr_for_date.createdAt }}
          </button>
        </div>

        {{ searchDate }}
        <!-- sidebar -->
        <div class="flex flex-col gap-5 min-w-[40rem] max-h-[42rem]">
          <div v-show="is_show && searchDate == '2021-05-01'">
            <div id="accordion-collapse" data-accordion="collapse">
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  @click="toggleAccordion('accordion-1', $event)"
                >
                  <span>Symptoms</span>
                  <svg
                    class="w-6 h-6 rotate-180 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-1"
                class="accordion"
                ref="accordion-1"
              >
                <div
                  class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <ul
                    class="space-y-3 list-disc list-inside text-gray-500 dark:text-gray-400 overflow-x-scroll scrollbar-hide overscroll-none"
                  >
                    <li
                      v-for="symptom in symptoms"
                      :key="symptom.idx"
                      class="whitespace-nowrap"
                    >
                      {{ symptom.severity }}
                      <span
                        class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1 mx-2"
                      >
                        {{ symptom.name }}
                      </span>
                      {{ symptom.code }}
                      <span
                        class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                      >
                        {{ symptom.onset }} ~
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <h2 id="accordion-collapse-heading-2">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-900 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  @click="toggleAccordion('accordion-2', $event)"
                >
                  <span>Medicines</span>
                  <svg
                    class="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-2"
                class="accordion hidden"
                ref="accordion-2"
              >
                <div
                  class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <ul
                    class="space-y-3 list-none list-inside text-gray-500 dark:text-gray-400 overflow-x-scroll scrollbar-hide overscroll-none"
                  >
                    <li
                      v-for="medicine in medicines"
                      :key="medicine.idx"
                      class="whitespace-nowrap"
                    >
                      <i class="fa-solid fa-tablets"></i>
                      <span
                        class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1 mx-2"
                      >
                        {{ medicine.name }}
                      </span>
                      {{ medicine.unit }} <i class="fa-solid fa-x"></i>
                      {{ medicine.amount }}
                      <span
                        class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                      >
                        {{ medicine.begin }} ~ {{ medicine.end }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <h2 id="accordion-collapse-heading-3">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  @click="toggleAccordion('accordion-3', $event)"
                >
                  <span>Medical Records</span>
                  <svg
                    class="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-3"
                class="accordion hidden"
                ref="accordion-3"
              >
                <div
                  class="p-5 font-light border rounded-b-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <div
                    v-for="(emr, idx) in emrList"
                    :key="idx"
                    @click="showEmrData(idx)"
                    class="flex items-center space-x-4 border-b border-gray-600 pb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-4 overflow-x-scroll scrollbar-hide overscroll-none"
                  >
                    <div class="flex-1 min-w-0 break-words">
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        {{ emr.symptom }} - {{ emr.category }}
                      </p>
                      <p
                        class="text-sm text-gray-500 truncate dark:text-gray-400"
                      >
                        {{ emr.createdAt }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      is_show: false,
      targetEmrIdx: 0,
      searchDate: "",
      emrList: [
        {
          idx: 1,
          patientIdx: 0,
          doctorIdx: 0,
          doctorName: "김의사",
          category: "clinic report",
          preliminary: "hello",
          comment: "world",
          createdAt: "2021-05-01",
          updatedAt: "2021-05-01",

          symptom: "haedache",
        },
        {
          idx: 2,
          patientIdx: 0,
          doctorIdx: 0,
          doctorName: "김의사",
          appointmentIdx: 0,
          category: "clinic report",
          preliminary: "",
          comment: "",
          createdAt: "2021-05-02",
          updatedAt: "2021-05-02",

          symptom: "stomachache",
        },
      ],
      patient: {
        name: "Paul Blanco",
        patientIdx: 0,
      },
      medicines: [
        {
          patientIdx: 0,
          name: "acetaminophen",
          amount: 30,
          unit: "500mg",
          begin: "2021-01-01",
        },
        {
          name: "ibuprofen",
          amount: 30,
          unit: "500mg",
          begin: "2021-01-01",
        },
        {
          name: "aspirin",
          amount: 30,
          unit: "500mg",
          begin: "2021-01-01",
          end: "2021-01-31",
        },
      ],
      symptoms: [
        {
          name: "headache",
          onset: "2021-01-01",
          code: "R51",
          severity: "severe",
        },
        {
          name: "fever",
          onset: "2021-01-01",
          code: "R50.9",
          severity: "moderate",
        },
        {
          name: "cough",
          onset: "2021-01-01",
          code: "R05.9",
          severity: "mild", // mild, moderate, severe
        },
      ],
    };
  },

  created() {
    const accessToken = Cookies.get("access");

    axios
      .post(
        "/auth/api/patient/info/",
        {
          user_idx: this.$route.params.idx,
        },
        {
          withCredentials: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        this.patient = response.data; //patient 정보 가져오고 가져온 정보 토대로 이전 진료기록 찾기
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        "/emr/api/symptom/list/", //SymptomsView
        {
          patient_idx: this.$route.params.id,
        },
        {
          withCredentials: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        this.symptoms = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        "/emr/prescript/list/", //PrescriptionsView
        {
          patient_idx: this.$route.params.id,
        },
        {
          withCredentials: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        this.medicines = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        "/emr/api/emr/list/", //DiagnosisView
        {
          patient_idx: this.$route.params.id,
        },
        {
          withCredentials: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        this.emrList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    optionShow(key) {
      this.is_show = !this.is_show;
      this.searchDate = key;
    },

    toggleAccordion(id, e) {
      document.querySelectorAll(".accordion").forEach((el) => {
        el.classList.add("hidden");
      });

      this.$refs[id].classList.toggle("hidden");
      e.currentTarget.children[1].classList.toggle("rotate-180");
      console.log(this.searchDate);
    },

    showEmrData(idx) {
      this.openEmrContainer();

      this.targetEmrIdx = idx;

      // FIXME 이걸 그냥 emr 불러올 때 같이 가져와버리는게 나아보여
      const docIdx = this.emrList[idx].doctorIdx;
      const accessToken = Cookies.get("access");

      axios
        .post(
          "/auth/api/user/info/",
          {
            userIdx: docIdx,
          },
          {
            withCredentials: true,
            crossDomain: true,
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          this.emrList[idx].doctorName = response.data.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    openEmrContainer() {
      this.$refs.emrContainer.classList.remove("hidden");
    },
    closeEmrContainer() {
      this.$refs.emrContainer.classList.add("hidden");
    },
  },
};
</script>

<style lang="scss"></style>
