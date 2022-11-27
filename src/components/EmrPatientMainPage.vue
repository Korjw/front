<template>
  <div>
    <div class="max-w-[64rem] mx-auto">
      <h1
        class="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5 border-gray-600 border-b"
      >
        Reservations
      </h1>
      <div class="flex gap-10 justify-between">
        <!-- main -->
        <div
          class="flex-1 min-w-[18rem] max-h-[42rem] border-r border-gray-600 pr-10 text-gray-900 dark:text-gray-300 flex flex-col gap-5"
        >
          <div
            class="bg-gray-900 rounded-lg text-gray-900 border border-gray-600 dark:text-gray-300 shadow-inner overflow-y-scroll overscroll-none scrollbar-hide relative"
          >
            <div
              class="p-5 m-5 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <time class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ selectedDate.getMonth() + 1 }}/{{ selectedDate.getDate() }}
              </time>
              <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li v-for="appo in appoList" :key="appo.id">
                  <a
                    href="#"
                    class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div class="text-gray-600 dark:text-gray-400">
                      <div class="text-base font-normal">
                        <span
                          class="font-bold rounded text-gray-900 dark:text-white bg-green-800 p-1"
                        ></span>
                        {{ appo.doctor_id }}'s
                        <span class="font-medium text-gray-900 dark:text-white">
                          {{ appo.category }}</span
                        >
                        is scheduled at
                        <span class="font-medium text-gray-900 dark:text-white">
                          {{ appo.begin_at }}</span
                        >
                        <span class="font-medium text-gray-900 dark:text-white">
                          - {{ appo.doctor_id }}</span
                        >
                      </div>
                    </div>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <!-- sidebar -->
        <div class="flex flex-col gap-5 max-h-[42rem]">
          <!-- https://vcalendar.io/datepicker.html -->
          <vc-date-picker
            v-model="selectedDate"
            title-position="left"
            is-dark
            locale="en"
          />
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

// https://vcalendar.io/installation.html
export default {
  data() {
    return {
      selectedDate: new Date(),
      doctor_list: [
        {
          doctor_id: 1,
          name: "a",
          room: "123",
          subject: "b",
        },
        {
          doctor_id: 2,
          name: "a",
          room: "123",
          subject: "b",
        },
        {
          doctor_id: 3,
          name: "a",
          room: "123",
          subject: "b",
        },
        {
          doctor_id: 4,
          name: "a",
          room: "123",
          subject: "b",
        },
      ],
      appoList: [
        {
          id: 1,
          patient_id: 1,
          doctor_id: 1,
          begin_at: "2021-11-05",
          category: "clinic(first)",
          status: "bad",
        },
        {
          id: 2,
          patient_id: 2,
          doctor_id: 2,
          begin_at: "2021-11-03",
          category: "clinic(first)",
          status: "bad",
        },
        {
          id: 3,
          patient_id: 3,
          doctor_id: 3,
          begin_at: "2021-11-04",
          category: "clinic(first)",
          status: "bad",
        },
      ],
    };
  },

  methods: {},
  created() {
    // NOTE: 페이지 첫 로드시에 관리중인 환자 목록을 받아, 예약을 생성할 수 있도록 돕는다.
    const accessToken = Cookies.get("access");

    axios
      .post(
        "http://127.0.0.1:8000/auth/api/doctor/in-charge/",
        {},
        {
          withCredentials: true,
          crossDomain: true,
          credentials: "access",
          headers: {
            Authorization: "Bearer " + accessToken,
            ContentType: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.doctor_list = res.data;
      })
      .catch((err) => {
        console.log("i fucked up");
        console.log(err);
      });
  },

  watch: {
    selectedDate() {
      const accessToken = Cookies.get("access");
      //const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

      axios
        .post(
          "http://127.0.0.1:8001/emr/patient/api/appointment/list",
          {
            patient_id: 1,
            begin_at: this.selectedDate,
          },
          {
            withCredentials: true,
            crossDomain: true,
            credentials: "access",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.appoList = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#box {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 80%;
  height: 80%;
  background-color: darkgreen;
  overflow: hidden;
}

.box-child {
  box-sizing: border-box;
  position: absolute;
  background-color: red;
}

.box-child:hover {
  border: 2px solid white;
}
</style>
