<template>
  <form class="flex justify-center">
    <div class="">
      <TextH1 :text="'Login'" />
      <div class="mb-4">
        <input
          v-model="credentials.userName"
          type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600"
          placeholder="Username"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="credentials.password"
          type="password"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600"
          id="exampleFormControlInput1"
          placeholder="Password"
        />
      </div>
      <div class="text-center pt-1 mb-12 pb-1">
        <button
          class="inline-block px-6 py-2.5 text-greenMain border border-greenMain font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-grayDark4 hover:shadow-lg focus:shadow-lg focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="sendPostRequest()"
        >
          Log in
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { PostAuthenticationInput } from "@/composables/useTrpcClient";
const credentials = ref<PostAuthenticationInput>({
  userName: "",
  password: "",
});
async function sendPostRequest() {
  const reponse = await usePostAuthentication(credentials.value);
  if (useResponseDataIsNotNull(reponse)) {
    reponse.data.value;
  }
  useDisplayError(reponse);
}
</script>
