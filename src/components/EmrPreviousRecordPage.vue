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
            :key="emr_for_date.begin_time"
            type="button"
            class="items-center justify-between p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            @click="optionShow(emr_for_date)"
          >
            Begin Date :{{ emr_for_date.begin_time }}
          </button>
        </div>
        <!-- sidebar -->
        <div class="flex flex-col gap-5 min-w-[40rem] max-h-[42rem]">
          <div v-show="is_show">
            <div>
              doctor: {{ searchDate.doctor_id }} diag_type:
              {{ searchDate.diag_type }} comment: {{ searchDate.comment }}abc
            </div>
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
                      {{ symptom.s_severity }}
                      <span
                        class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1 mx-2"
                      >
                      </span>
                      {{ symptom.s_code }}
                      <span
                        class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                      >
                        {{ symptom.s_onset }}
                      </span>
                    </li>
                  </ul>
                </div>
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
                    v-for="medicine in Prescript"
                    :key="medicine.idx"
                    class="whitespace-nowrap"
                  >
                    <i class="fa-solid fa-tablets"></i>
                    <span
                      class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1 mx-2"
                    >
                      {{ medicine.medicine_code }}
                    </span>
                    <span
                      class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1 mx-2"
                    >
                      {{ medicine.medicine_unit }} 처방 단위
                    </span>
                    {{ medicine.medicine_dose_unit }} 복용단위<i
                      class="fa-solid fa-x"
                    ></i>
                    {{ medicine.quantity }} 수량
                    <span
                      class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                    >
                      {{ medicine.medicine_dose }} 복용횟수
                    </span>
                    <span
                      class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                    >
                      {{ medicine.medicine_usage }} 방법
                    </span>
                    <span
                      class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                    >
                      {{ medicine.comment }} 코멘트
                    </span>
                    <span
                      class="rounded text-gray-900 dark:text-white bg-yellow-800 p-1 mx-2"
                    >
                      {{ medicine.medicine_begin_time }} ~
                      {{ medicine.medicine_end_time }}
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
                  class="flex items-center space-x-4 border-b border-gray-600 pb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-4 overflow-x-scroll scrollbar-hide overscroll-none"
                >
                  <div class="flex-1 min-w-0 break-words">
                    <p
                      class="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {{ searchDate.doctor_id }}
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ searchDate.diag_type }} {{ searchDate.comment }}
                    </p>

                    <p
                      class="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {{ searchDate.created_at }}
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
      searchDate: {
        begin_time: "2021-05-01",
        end_time: "2021-05-02",
        diag_type: "a",
        comment: "abc",
        appointment_id: 0,
        doctor_id: "김의사",
        created_at: "2021-05-02",
      },
      emrList: [
        {
          appointment_id: 0,
          doctor_id: "김의사",
          begin_time: "2021-05-01",
          end_time: "2021-05-02",
          diag_type: "a",
          comment: "abc",
          created_at: "2021-05-02",
        },
        {
          appointment_id: 0,
          doctor_id: "김의사",
          begin_time: "2021-05-02",
          end_time: "2021-05-03",
          diag_type: "",
          comment: "abcd",
          created_at: "2021-05-03",
        },
        {
          appointment_id: 0,
          doctor_id: "김의사",
          begin_time: "2021-05-03",
          end_time: "2021-05-04",
          diag_type: "",
          comment: "abcde",
          created_at: "2021-05-04",
        },
      ],
      Prescript: [
        {
          appointment_id: 0,
          patient_id: 0,
          doctor_id: 0,
          medicine_code: "acetaminophen",
          quantity: 30,
          medicine_unit: "500mg",
          medicine_begin_time: "2021-05-01",
          medicine_end_time: "2021-05-02",
          medicine_dose_unit: "2021",
          medicine_dose: 0,
          medicine_usage: "eat",
          comment: "abd",
        },
        {
          appointment_id: 0,
          patient_id: 0,
          doctor_id: 0,
          medicine_code: "acetaminophen",
          quantity: 30,
          medicine_unit: "500mg",
          medicine_begin_time: "2021-05-02",
          medicine_end_time: "2021-05-03",
          medicine_dose_unit: "2021",
          medicine_dose: 0,
          medicine_usage: "eat",
          comment: "abd",
        },
        {
          appointment_id: 0,
          patient_id: 0,
          doctor_id: 0,
          medicine_code: "acetaminophen",
          quantity: 30,
          medicine_unit: "500mg",
          medicine_begin_time: "2021-05-03",
          medicine_end_time: "2021-05-04",
          medicine_dose_unit: "2021",
          medicine_dose: 0,
          medicine_usage: "eat",
          comment: "abd",
        },
      ],
      symptoms: [
        {
          appointment_id: 1,
          patient_id: 1,
          doctor_id: 1,
          s_code: "R51",
          s_onset: "2021-01-01",
          s_severity: "severe",
        },
        {
          appointment_id: 2,
          patient_id: 2,
          doctor_id: 2,
          s_code: "R51",
          s_onset: "2021-05-02",
          s_severity: "severe",
        },
        {
          appointment_id: 3,
          patient_id: 3,
          doctor_id: 3,
          s_code: "R51",
          s_onset: "2021-05-03",
          s_severity: "severe",
        },
        {
          appointment_id: 4,
          patient_id: 4,
          doctor_id: 4,
          s_code: "R51",
          s_onset: "2021-05-04",
          s_severity: "severe",
        },
      ],
    };
  },

  created() {
    const accessToken = Cookies.get("access");
    //const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

    axios
      .post(
        "http://127.0.0.1:8001/emr/patient/api/emr/list", //Medical Reocrd
        {
          patient_idx: 1,
          begin_at: this.selectedDate,
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
    toggleAccordion(id, e) {
      document.querySelectorAll(".accordion").forEach((el) => {
        el.classList.add("hidden");
      });

      this.$refs[id].classList.toggle("hidden");
      e.currentTarget.children[1].classList.toggle("rotate-180");
    },

    optionShow(key) {
      const accessToken = Cookies.get("access");
      //const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

      if (key.begin_time == this.searchDate.begin_time) {
        this.is_show = !this.is_show;
      }
      this.searchDate = key;

      axios
        .post(
          "http://127.0.0.1:8001/emr/api/symptom/list/", //Symptoms
          {
            patient_idx: 1,
            begin_at: this.selectedDate,
          },
          {
            withCredentials: true,
            crossDomain: true,
            credentials: "access",
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
          "http://127.0.0.1:8001/emr/patient/emr/medicine/list", //medicine
          {
            patient_idx: 1,
            begin_at: this.selectedDate,
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
          this.Prescript = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss"></style>
