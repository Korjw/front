<template>
  <form>
    <div class="grid gap-6 md:grid-cols-1">
      <p class="font-normal text-gray-700 dark:text-dark-400">
        this paper will be delete.
      </p>
      clinical Note
      <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          id="comment"
          rows="4"
          class="
            px-2
            w-full
            text-sm text-gray-900
            bg-white
            border-0
            dark:bg-gray-800
            focus:ring-0
            dark:text-white dark:placeholder-gray-400
          "
          placeholder="Write a comment..."
          required=""
          v-model="text"
        ></textarea>
      </div>

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
          v-model="firstname"
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
      <div class="mb-6">
        <label
          for="confirm_password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >Confirm password</label
        >
        <input
          type="password"
          id="confirm_password"
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
        />
      </div>

      <h3 class="mb-4 font-semibold text-gray-900 dark:text-dark">Sex</h3>
      <ul
        class="
          items-center
          w-full
          text-sm
          font-medium
          text-gray-900
          bg-white
          rounded-lg
          border border-gray-200
          sm:flex
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
        "
      >
        <li
          class="
            w-full
            border-b border-gray-200
            sm:border-b-0 sm:border-r
            dark:border-gray-600
          "
        >
          <div class="flex items-center pl-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value="male"
              name="list-radio"
              class="
                w-4
                h-4
                text-blue-600
                bg-gray-100
                border-gray-300
                focus:ring-blue-500
                dark:focus:ring-blue-600 dark:ring-offset-gray-700
                focus:ring-2
                dark:bg-gray-600 dark:border-gray-500
              "
              v-model="sex"
            />
            <label
              for="horizontal-list-radio-license"
              class="
                py-3
                ml-2
                w-full
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >male
            </label>
          </div>
        </li>
        <li
          class="
            w-full
            border-b border-gray-200
            sm:border-b-0 sm:border-r
            dark:border-gray-600
          "
        >
          <div class="flex items-center pl-3">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value="female"
              name="list-radio"
              class="
                w-4
                h-4
                text-blue-600
                bg-gray-100
                border-gray-300
                focus:ring-blue-500
                dark:focus:ring-blue-600 dark:ring-offset-gray-700
                focus:ring-2
                dark:bg-gray-600 dark:border-gray-500
              "
              v-model="sex"
            />
            <label
              for="horizontal-list-radio-id"
              class="
                py-3
                ml-2
                w-full
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >female</label
            >
          </div>
        </li>
      </ul>

      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
        >Birthday</label
      >
      <date-picker v-model="birthdate" :model-config="modelConfig" />
      <span class="text-gray-800 ml-2">your birthday : {{ birthdate }}</span>

      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >Email address</label
        >
        <input
          type="email"
          id="email"
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
          placeholder="john.doe@company.com"
          required
          v-model="email"
        />
      </div>

      <div>
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >Phone number</label
        >
        <input
          type="tel"
          id="phone"
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
          placeholder="12345678"
          required
          v-model="phonenumber"
        />
      </div>
    </div>

    <p>date</p>
    <div>
      <date-picker
        v-model="date"
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
      v-on:click="submit_data"
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
  </form>
</template>


<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Reservation",
  data() {
    let date = new Date();
    date.setMinutes(0, 0, 0);
    return {
      text: "",
      firstname: "",
      lastname: "",
      password: "",
      sex: "",
      birthdate: "1983-01-21",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      email: "",
      phonenumber: "",
    };
  },
  methods: {
    submit_data() {
      const data = {
        text: this.text,
        name: this.firstname + this.lastname,
        password: this.password,
        sex: this.sex,
        birthdate: this.birthdate,
        email: this.email,
        phonenumber: this.phonenumber,
        reservation_date: this.date,
      };
      console.log(data);
      const accessToken = Cookies.get("access");

      axios
        .post(
          "/emr/api/Reservation",
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