<template>
  <div class="gap-10 max-w-[64rem] sticky top-0">
    <div
      class="
        flex flex-col-reverse
        md:flex-row
        gap-10
        overflow-y-scroll
        scrollbar-hide
      "
    >
      <!-- NOTE: emr viewer -->
      <div
        class="
          flex flex-1 flex-col
          p-5
          rounded-lg
          md:min-w-[12rem]
          dark:bg-gray-900
          border border-gray-600
        "
      >
        <div class="grid md:grid-cols-1 gap-x-6">
          <div class="relative z-0 mb-6 group">
            <label
              for="category"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-400
              "
            >
              Emr Category
            </label>
            <select
              id="category"
              v-model="category"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
            >
              <option value="clinic">clinic</option>
              <option value="diagnosis">diagnosis</option>
              <option value="test">test</option>
            </select>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <label
              for="doctor_name"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-400
              "
            >
              doctor name? => 리스트로 출력? option으로 name을 django에서 id로
              변환?(접근권한이 있는지?)
            </label>
            <input
              tpye="text"
              id="doctor_name"
              v-model="doctor_name"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
            />

            <label
              for="medical_department"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-400
              "
            >
              medical department => 리스트로 출력? option으로
            </label>
            <input
              tpye="text"
              id="medical_department"
              v-model="medical_department"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
            />
          </div>
        </div>

        <label
          for="pre_script"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >status</label
        >
        <textarea
          id="pre_script"
          rows="4"
          v-model="status"
          class="
            block
            p-2.5
            mb-6
            w-full
            text-sm text-gray-900
            bg-gray-50
            rounded-lg
            border border-gray-300
            focus:outline-none
            dark:bg-gray-800
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
          "
          placeholder="preliminary examination"
        ></textarea>

        <div>
          <vc-date-picker
            v-model="reservation_date"
            mode="dateTime"
            :valid-hours="
              (hour, { weekday }) =>
                (![1, 7].includes(weekday) || (hour >= 8 && hour <= 12)) &&
                ([1, 7].includes(weekday) || (hour >= 8 && hour <= 18))
            "
            :minute-increment="5"
          />
        </div>
        <button
          v-on:click="submitAppointment"
          type="submit"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import Cookies from "js-cookie";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      category: "clinic",
      doctor_name: "",
      status: "",
      medical_department: "",
      reservation_date: new Date(),
    };
  },

  methods: {
    submitAppointment() {
      //const accessToken = Cookies.get("access");
      //const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

      axios
        .post(
          "/emr/api/appointment/",
          {
            //doctor_idx: accessTokenJSON.user_id,
            category: this.category,
            doctor_name: this.doctor_name,
            status: this.status,
            medical_department: this.medical_department,
            reservation_date: this.reservation_date,
          },
          {
            withCredentials: true,
            crossDomain: true,
            credentials: "access",
            headers: {
              //Authorization: "Bearer " + accessToken,
              ContentType: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("i fucked up");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss"></style>
