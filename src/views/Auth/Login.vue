<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-30 w-32" src="../../assets/images/logo.png" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="login">
                <div v-if="errorMsg" class="py-3 px-5 bg-red-500 text-white rounded">
                    {{ errorMsg }}
                </div>
                <div>
                    <label for="code" class="block text-sm font-medium leading-6 text-gray-900">Code</label>
                    <div class="mt-2">
                        <input id="code" name="code" type="code" autocomplete="code" v-model="state.user.code"
                            @input="clearError('code')"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        <div class="error-msg" v-if="v$.user.code.required">Code is required</div>

                        <!-- <div v-if="errors.code" class="text-red-500">{{ errors.code }}</div> -->
                        <!-- <div :class="{ error: v$.user.code.$errors.length }">
                            <div class="input-errors" v-for="error of v$.user.code.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div> -->
                        <!-- Display error message -->
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password"
                            v-model="state.user.password" @input="clearError('password')"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        <div class="error-msg" v-if="v$.user.password.required">Code is required</div>

                        <!-- <div v-if="errors.password" class="text-red-500">
                            {{ errors.password }}
                        </div> -->
                        <!-- <div :class="{ error: v$.user.password.$errors.length }">
                            <div class="input-errors" v-for="error of v$.user.password.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div> -->
                        <!-- Display error message -->
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ " " }}
                <router-link :to="{ name: 'Register' }"
                    class="font-semibold leading-6 text-blue-600 hover:text-blue-500">Regiser for free</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive } from 'vue'
import store from "../../store";
import { useToast } from "vue-toast-notification";

export default {

    setup() {
        const state = reactive({
            user: {
                code: "",
                password: "",
            },
        })
        const rules = {
            user: {
                code: { required },
                password: { required },
            },
        }

        const v$ = useVuelidate(rules, state)
        const clearError = (fieldName) => {
            // Clear the error for the specified field
            v$.user[fieldName].$touch()
            if (v$.user[fieldName].$error) {
                v$.user[fieldName].$reset()
            }
        }

        return { state, v$, $toast: useToast(),clearError }
    },
    data() {
        return {
            errors: {
                code: null,
                password: null,
            },
            errorMsg: null,
        }
    },

    mounted() {

    },
    methods: {
        login() {
            // validation:
            this.v$.user.$touch() // Mark all fields as "touched" to trigger validation
            if (this.v$.$error) {
                // Validation failed, do not proceed with login
            } else {
                // Validation passed, proceed with login
            }
            console.log(this.state);
            // store
            //     .dispatch("login", this.user)
            //     .then(() => {
            //         this.$router.push({ name: `${store.getters["userRole"]}Dashboard` });

            //         this.$toast.success("You are Logging successfully!", {
            //             position: "bottom-right",
            //             duration: 3000,
            //         });
            //     })
            //     .catch((err) => {
            //         this.errorMsg.value = err.response.data.error;
            //         this.$toast.warning("username or password field", {
            //             position: "bottom-right",
            //             duration: 3000,
            //         });
            //     });
        }
    },
}
</script>
<style scoped></style>