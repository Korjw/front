<template>
  <div class="gap-10 max-w-[64rem] sticky top-0">
    <div
      class="flex flex-col-reverse md:flex-row gap-10 overflow-y-scroll scrollbar-hide"
    >
      <!-- NOTE: emr viewer -->
      <div
        class="flex flex-1 flex-col p-5 rounded-lg md:min-w-[12rem] dark:bg-gray-900 border border-gray-600"
      >
        <div class="grid md:grid-cols-2 gap-x-6">
          <div class="relative z-0 mb-6 group">
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Emr Category
            </label>
            <select
              id="category"
              v-model="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="clinic">clinic</option>
              <option value="diagnosis">diagnosis</option>
              <option value="test">test</option>
            </select>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <label
              for="doctor_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              select doctors
            </label>
            <select
              v-model="select_doctor"
              id="doctor_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                v-for="doctor in doctor_list"
                :key="doctor"
                v-text="
                  'subject : ' + doctor.subject + '      name : ' + doctor.name
                "
                :value="doctor"
              ></option>
            </select>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <label
              for="pre_script"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              status
            </label>
            <textarea
              id="pre_script"
              rows="6"
              v-model="status"
              class="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="preliminary examination"
            ></textarea>
          </div>

          <div>
            <div class="relative z-0 mb-6 col-span-2 w-full group">
              <input
                type="date"
                name="floating_password"
                id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                v-model="reservation_date"
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Day Of Birth
              </label>
            </div>
          </div>
          {{ reservation_date }}
          <button
            v-on:click="submitAppointment"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            submit
          </button>
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
      category: "clinic",
      status: "",
      doctor_subject: "",
      select_doctor: {
        id: 0,
        name: "KIM",
        subject: "test",
      },
      doctor: "a",
      // NOTE: patient in charge
      doctor_list: [
        {
          id: 0,
          name: "KIM",
          subject: "test",
        },
        {
          id: 1,
          name: "LLL",
          subject: "test2",
        },
      ],
      reservation_date: new Date(),
    };
  },

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

  methods: {
    selectdoctor(value) {
      this.select_doctor = value;
      console.log(this.select_doctor);
    },
    submitAppointment() {
      const accessToken = Cookies.get("access");
      const accessTokenJSON = JSON.parse(atob(accessToken.split(".")[1]));

      axios
        .post(
          "http://127.0.0.1:8001/emr/patient/api/appointment/",
          {
            patient_id: accessTokenJSON.user_id,
            doctor_id: this.select_doctor.id,
            category: this.category,
            status: this.status,
            begin_at: this.reservation_date,
          },
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
