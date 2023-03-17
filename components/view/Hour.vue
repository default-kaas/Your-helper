<template>
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
      <h3 class="font-semibold px-1 rounded" :class="temporaryRandomColor()">
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
      <h3 class="font-semibold px-1 rounded" :class="temporaryRandomColor()">
        {{ typeHourSet[0] }}
      </h3>
      <p>
        {{ typeHourSet[1] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  hourRegestrationField,
  CaclulateHoursType,
  ReadExcelType,
} from "~~/composables/useReadExcelFile";
import { Dictionary } from "lodash";
const props = defineProps({
  excelDataRowsFile: {
    type: Object as () => hourRegestrationField[],
    required: true,
  },
});

const projectHours = ref<CaclulateHoursType>();
const typeHours = ref<CaclulateHoursType>();
const totalHours = ref<number>();
const wbsoHours = ref<number>();

projectHours.value = useCaclulateProjectHours(props.excelDataRowsFile);
typeHours.value = useCaclulateTypeHours(props.excelDataRowsFile);
totalHours.value = useCaclulateTotalHours(props.excelDataRowsFile);
wbsoHours.value = useCaclulateWBSOHours(props.excelDataRowsFile);

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
