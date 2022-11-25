<template>
  <form>
    <div class="grid gap-6 md:grid-cols-1">
      <div>
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >First name</label
        >
        <input
          type="text"
          id="first_name"
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
          placeholder="John"
          required
          v-model="first_name"
        />
      </div>
      <div>
        <label
          for="last_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >Last name</label
        >
        <input
          type="text"
          id="last_name"
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
          placeholder="Doe"
          required
          v-model="last_name"
        />
      </div>
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
        >Password</label
      >
      <input
        type="password"
        id="password"
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
        placeholder="•••••••••"
        required
        v-model="password"
      />
    </div>
    <button
      type="submit"
      class="
        text-white
        bg-blue-700
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        w-full
        sm:w-auto
        px-5
        py-2.5
        text-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      Submit
    </button>
    <div
      v-for="time in reservation_record"
      :key="time"
      class="overflow-x-auto relative"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <th scope="col" class="py-3 px-6">time</th>
            <th scope="col" class="py-3 px-6">text</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="
                py-4
                px-3
                font-medium
                text-gray-900
                whitespace-nowrap
                dark:text-white
              "
            >
              {{ time.record_date.toLocaleString() }}
            </th>
            <th
              scope="row"
              class="
                py-4
                px-6
                font-medium
                text-gray-900
                whitespace-nowrap
                dark:text-white
              "
            >
              {{ time.record_text }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>


<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "reservationview",
  data() {
    return {
      first_name: "",
      last_name: "",
      password: "",
      reservation_record: [
        { record_date: new Date(), record_text: "a" },
        { record_date: new Date(), record_text: "a" },
        { record_date: new Date(), record_text: "a" },
        { record_date: new Date(), record_text: "a" },
        { record_date: new Date(), record_text: "a" },
      ],
    };
  },
  methods: {
    get_reservation_data() {
      const data = {
        name: this.first_name + this.last_name,
        password: this.password,
      };

      const accessToken = Cookies.get("access");

      axios
        .post(
          "/emr/api/Reservationview",
          {
            data,
          },
          {
            withCredentials: true,
            crossDomain: true,
            credentials: "access",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.reservation_record = response.data;
        })
        .catch((error) => {
          console.log("Failed", error.response);
        });
    },
  },
};
</script>

<style>
</style>