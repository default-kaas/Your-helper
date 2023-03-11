<template>
  <div class="flex flex-col h-screen">
    <BarTop class="mb-3" />
    <main class="flex justify-center flex-grow">
      <slot></slot>
    </main>
    <BarBottom />
  </div>
</template>
