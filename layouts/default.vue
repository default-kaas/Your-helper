<template>
  <div class="flex flex-col h-screen">
    <BarTop class="mb-3" />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <BarBottom />
  </div>
</template>
