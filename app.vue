<template>
  <NuxtLayout>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.className = "bg-zinc-700 text-white";
});
</script>
