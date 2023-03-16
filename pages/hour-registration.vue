<template>
  <div>
    <TextH1 :text="'Hour registration'" />
    <input v-on:change="readExcel" type="file" id="input" />
    <template v-if="excelDataRowsFile">
      <!-- Table of contents -->
      <div class="fixed left-12 py-3 px-6 border border-dividerDark2 rounded">
        <div class="flex py-1">
          <h2 class="font-semibold">Table of contents</h2>
        </div>
        <div class="flex py-1">
          <TextHashTag />
          <h3 class="font-semibold">Hour registration</h3>
        </div>
        <div class="flex py-1">
          <h2 class="font-semibold">Weeks:</h2>
        </div>
        <div
          v-for="weekNumber in Object.keys(excelDataRowsFile)"
          :key="weekNumber"
          class="flex py-1"
        >
          <TextHashTag />
          <h3 class="font-semibold">Week {{ weekNumber }}</h3>
        </div>
      </div>
      <!-- Stats -->
      <div class="fixed right-12 py-3 px-6 border border-dividerDark2 rounded">
        <div class="flex py-1">
          <h2 class="font-semibold">Hours</h2>
        </div>
        <div class="flex py-1">
          <h2 class="font-semibold">Total:</h2>
          <p>{{ totalHours }}</p>
        </div>
        <div class="flex py-1">
          <h2 class="font-semibold">WBSO:</h2>
          <p>{{ wbsoHours }}</p>
        </div>
        <div class="flex py-1">
          <h2 class="font-semibold">Projects:</h2>
        </div>
        <div v-for="project in projectHours" class="flex py-1">
          <h3
            class="font-semibold px-1 rounded"
            :class="temporaryRandomColor()"
          >
            {{ project[0] }}
          </h3>
          <p>
            {{ project[1] }}
          </p>
        </div>
        <div class="flex py-1">
          <h2 class="font-semibold">Catergorie:</h2>
        </div>
        <div v-for="typeHourSet in typeHours" class="flex py-1">
          <h3
            class="font-semibold px-1 rounded"
            :class="temporaryRandomColor()"
          >
            {{ typeHourSet[0] }}
          </h3>
          <p>
            {{ typeHourSet[1] }}
          </p>
        </div>
      </div>
      <!-- Hourfrom table -->
      <table class="table-auto border-collapse">
        <thead>
          <tr class="text-left font-semibold sticky top-0 bg-blackMain">
            <th class="py-2 px-3 border-b border-dividerDark2">Dag</th>
            <th class="pr-3 border-b border-dividerDark2">Uren</th>
            <th class="pr-3">Projects</th>
            <th class="pr-3">Catergorie</th>
            <th class="pr-3">Evt. aanvullende beschrijving</th>
            <th class="pr-3">WBSO</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="values in excelDataRowsFile">
            <tr>
              <td class="pl-3 pt-1 py-2 border-t border-dividerDark2">
                <div class="flex">
                  <TextHashTag />
                  <h3 class="font-semibold">
                    Week {{ values[0].weekNumberBasedOnDate }}
                  </h3>
                </div>
              </td>
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
            </tr>
            <template v-for="value in values">
              <tr>
                <td class="pl-3 py-2 px-2">
                  {{ useDateDayMonthYear(value.date) }}
                </td>
                <td class="px-2 text-right">{{ value.hours }}</td>
                <td class="px-2">{{ value.project }}</td>
                <td class="px-2">{{ value.type }}</td>
                <td class="px-2">{{ value.description }}</td>
                <td class="px-2">{{ value.wbsoHours }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ReadExcelType,
  CaclulateHoursType,
} from "~~/composables/useReadExcelFile";
async function readExcel() {
  const input = document.getElementById("input");
  if (input) {
    const result = await useReadExcel(input);
    if (result) {
      excelDataRowsFile.value = useGroupedByWeekNumber(result);
      projectHours.value = useCaclulateProjectHours(result);
      typeHours.value = useCaclulateTypeHours(result);
      totalHours.value = useCaclulateTotalHours(result);
      wbsoHours.value = useCaclulateWBSOHours(result);
    }
  }
}
const excelDataRowsFile = ref<ReadExcelType>();
const projectHours = ref<CaclulateHoursType>();
const typeHours = ref<CaclulateHoursType>();
const totalHours = ref<number>();
const wbsoHours = ref<number>();

const temporaryCounter = ref<number>(0);
function temporaryRandomColor() {
  const value = temporaryCounter.value;
  temporaryCounter.value++;
  if (temporaryCounter.value === 4) {
    temporaryCounter.value = 0;
  }
  switch (value) {
    case 0:
      return "bg-redDarker";
    case 1:
      return "bg-purpleDark";
    case 2:
      return "bg-blueDarker";
    case 3:
      return "bg-yellowDark";
    default:
      return "bg-greenDark";
  }
}
</script>
