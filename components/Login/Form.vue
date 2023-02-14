<template>
  <form class="flex justify-center">
    <div class="">
      <h1
        class="flex justify-center text-xl font-semibold mt-1 mb-4 pb-1 text-white"
      >
        Login into Your helper
      </h1>
      <div class="mb-4">
        <input
          type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600"
          placeholder="Username"
        />
      </div>
      <div class="mb-4">
        <input
          type="password"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600"
          id="exampleFormControlInput1"
          placeholder="Password"
        />
      </div>
      <div class="text-center pt-1 mb-12 pb-1">
        <button
          class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-slate-900 hover:bg-slate-700 hover:shadow-lg focus:shadow-lg focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="sendPostRequest()"
        >
          Log in
        </button>
      </div>
    </div>
    <p>{{ hello?.greeting }}</p>
  </form>
</template>

<script setup lang="ts">
async function sendPostRequest() {}
const { $client } = useNuxtApp();
const { data: hello } = await $client.hello.useQuery({ text: "client" });
</script>
