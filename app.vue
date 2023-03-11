<template>
  <NuxtLayout>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.className = "bg-blackMain text-textDark1 font-sans";
});
</script>
