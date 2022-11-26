<template>
  <div>
    <div class="max-w-[64rem] mx-auto">
      <h1
        class="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5 border-gray-600 border-b"
      >
        {{ username }}'s Reservation
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
                        >
                          {{ appo.doctor_name }}</span
                        >
                        's
                        <span class="font-medium text-gray-900 dark:text-white">
                          {{ appo.category }}</span
                        >
                        is scheduled at
                        <span class="font-medium text-gray-900 dark:text-white">
                          {{ appo.begin_at }}</span
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
      is_show: false,
      username: "John",
      selectedDate: new Date(),
      appoList: [
        {
          doctor_name: "KIM",
          category: "clinic(first)",
          begin_at: "10:00 AM",
          room: "room 412",
        },
        {
          doctor_name: "Tom Odell",
          category: "clinic",
          begin_at: "10:30 AM",
          room: "room 412",
        },
      ],
    };
  },

  methods: {},

  watch: {
    selectedDate() {
      const accessToken = Cookies.get("access");
      const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

      console.log(accessTokenJSON);

      axios
        .post(
          "/emr/api/appointment/list/",
          {
            doctor_idx: accessTokenJSON.user_id,
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
          //TODO: 진료일정 정보를 {환자명}/{항목명}/{시간}/{장소}/{시각} 형식으로 받아옴
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
