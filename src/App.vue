
<script setup>

import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
    gsap.to('#loading .logo', { y: -50, opacity: 0, duration: 0.5 })
    gsap.to('#loading .left', {
        rotateY: 45,
        x: '-130%',
        duration: 1,
        delay: 0.6,
    })
    gsap.to('#loading .right', {
        rotateY: -45,
        x: '130%',
        duration: 1,
        delay: 0.6,
        onComplete: () => {
            document.getElementById('loading')?.remove()
        },
    })
})

// import { mapState } from "vuex";

// export default {
//   computed: {
//     ...mapState(['user']),
//   },
// };

// import LogoIcon from "./icons/logo.svg";
// import GoogleIcon from "./icons/google.svg";
// import FacebookIcon from "./icons/facebook.svg";
// import EmailIcon from "./icons/email.svg";
// import LockIcon from "./icons/lock.svg";
// import CircleLeftIcon from "./icons/circle-left.svg";
// import CircleRightIcon from "./icons/circle-right.svg";
</script>

<template>
  <!-- <pre>{{ user }}</pre> -->
  <router-view></router-view>

  <!-- <div class="flex justify-between min-h-screen font-sans">
    <div
      class="hidden relative w-1/2 bg-center bg-cover lg:block"
      style="background-image: url(&quot;/img/hero.png&quot;)"
    >
      <div class="flex absolute bottom-20 justify-center w-full">
        <div class="max-w-md text-center"> -->
  <!-- <span class="text-3xl font-bold leading-loose text-gray-900">
            Control Bussiness
          </span> -->
  <!-- <p class="font-light leading-7 text-gray-500">
            Dotra is the most comprehensive field service & asset managament
            platform with combining flexibility.
          </p>
          <div class="flex justify-center items-center pt-8 space-x-6">
            <button
              class="rounded-full focus:ring focus:ring-orange-500 focus:outline-none"
            >
              <CircleLeftIcon />
            </button>
            <button
              class="rounded-full focus:ring focus:ring-orange-500 focus:outline-none"
            >
              <CircleRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 mx-auto max-w-2xl">
      <div class="flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
        <LogoIcon class="self-center w-32 md:self-end" />
        <h2 class="self-center w-32 text-3xl font-medium md:self-end">iEnseignement</h2>
        <div class="pt-20 pb-6">
          <h1
            class="text-3xl font-bold tracking-wide leading-loose whitespace-nowrap"
          >
            Hi, Welcome back!
          </h1>
          <span class="font-light text-gray-500">
            Login now to manage your job made easy.
          </span> -->

  <!-- <div class="flex justify-between items-center pt-6">
            <hr class="w-full border-gray-400" />
            <span class="px-4 font-light tracking-wider text-gray-500">or</span>
            <hr class="w-full border-gray-400" />
          </div> -->
  <!-- <form action="">
            <div class="pt-6">
              <label for="email" class="font-light">Email address</label>
              <div
                class="flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-orange-500"
              >
                <div class="flex justify-center items-center pl-6">
                  <EmailIcon class="w-6 h-6 pointer-events-none" />
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value="hrd@dotra.co"
                  class="px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0"
                />
              </div>
            </div>
            <div class="pt-6">
              <label for="password" class="font-light">Password</label>
              <div
                class="flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-orange-500"
              >
                <div class="flex justify-center items-center pl-6">
                  <LockIcon class="w-6 h-6 pointer-events-none" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  class="px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0"
                />
              </div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  class="w-5 h-5 text-orange-500 bg-white rounded border border-gray-400 focus:outline-none focus:ring-orange-500"
                />
                <label for="remember" class="pl-4 font-light text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-teal-500 hover:text-teal-600">
                Forgot password</a
              >
            </div>
            <div class="pt-8">
              <button
                type="submit"
                class="py-4 px-8 w-full text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 focus:ring-4 focus:ring-red-100 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
          <div class="pt-4">
            <div class="font-light text-center text-gray-500">
              Not registered yet?
              <a href="#" class="font-normal text-teal-500 hover:text-teal-600">
                Create an Account
              </a>
            </div>
            <div
              class="flex flex-wrap gap-y-2 justify-between items-center pt-14 text-center whitespace-nowrap"
            >
              <span class="flex-1 text-gray-500"
                >© 2021 Dotra. All rights reserved.</span
              >
              <span class="flex flex-1 justify-center items-center space-x-1">
                <a href="#" class="text-gray-500 hover:text-gray-600"
                  >Terms of Service</a
                >
                <span class="text-gray-500">&#183;</span>
                <a href="#" class="text-gray-500 hover:text-gray-600"
                  >Privacy Policy</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
</template>



<style scoped></style>
