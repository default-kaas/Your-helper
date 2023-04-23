<template>
  <aside
    class="fixed right-4 top-64 py-3 px-6 border border-dividerDark2 rounded"
  >
    <table class="table-auto border-collapse">
      <thead class="text-left">
        <tr class="">
          <th class="pr-3"></th>
          <th class="">Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-left">
          <th class="pr-3">Total</th>
          <th class="font-normal text-right">
            {{ roundNumber(totalHours) }}
          </th>
        </tr>
        <tr class="text-left">
          <th class="pr-3">WBSO</th>
          <th class="font-normal text-right">
            {{ roundNumber(wbsoHours) }}
          </th>
        </tr>
        <tr class="text-left">
          <th class="pr-3">Project</th>
          <th class=""></th>
        </tr>
        <template v-for="project in projectHours">
          <tr>
            <td class="pr-3 py-1">
              <div
                class="text-center font-semibold px-1 rounded"
                :class="temporaryRandomColor()"
              >
                {{ project[0] }}
              </div>
            </td>
            <td class="text-right">
              {{ roundNumber(project[1]) }}
            </td>
          </tr>
        </template>
        <tr class="text-left">
          <th class="pr-3">Categorie</th>
          <th class=""></th>
        </tr>
        <template v-for="typeHourSet in typeHours">
          <tr>
            <td class="pr-3 py-1">
              <div
                class="text-center font-semibold px-1 rounded"
                :class="temporaryRandomColor()"
              >
                {{ typeHourSet[0] }}
              </div>
            </td>
            <td class="text-right">
              {{ roundNumber(typeHourSet[1]) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </aside>
</template>

<script setup lang="ts">
import {
  hourRegestrationFieldType,
  caclulateHoursType,
} from "~~/composables/useReadExcelFile";
const props = defineProps({
  excelDataRowsFile: {
    type: Object as () => hourRegestrationFieldType[],
    required: true,
  },
});

const projectHours = ref<caclulateHoursType>();
const typeHours = ref<caclulateHoursType>();
const totalHours = ref<number>();
const wbsoHours = ref<number>();

projectHours.value = useCalculateProjectHours(props.excelDataRowsFile);
typeHours.value = useCalculateTypeHours(props.excelDataRowsFile);
totalHours.value = useCalculateTotalHours(props.excelDataRowsFile);
wbsoHours.value = useCalculateWBSOHours(props.excelDataRowsFile);

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

function isDefinedAndIsNotZero(number: number | undefined): number is number {
  return number !== undefined && number != 0;
}

function roundNumber(number: number | undefined) {
  if (isDefinedAndIsNotZero(number)) {
    return Math.round(number * 100) / 100;
  }
  return 0;
}
</script>
