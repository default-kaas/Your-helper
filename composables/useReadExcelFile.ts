// https://www.npmjs.com/package/read-excel-file
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear"
import readXlsxFile from "read-excel-file";
import { Dictionary } from "lodash";
dayjs.extend(weekOfYear)

type hourRegestrationField = {
  typeOfField: string;
  date: Date;
  weekNumberBasedOnDate: number;
  hours: number;
  project: string;
  type: string;
  description: string;
  wbsoHours: number;
};

export type ReadExcelType = null | Dictionary<hourRegestrationField[]>

export async function useReadExcel(input: HTMLElement) {
  if (input?.files) {
    const result = await readXlsxFile(input?.files[0]).then((rows) => {
      const parsedResult = rows.map((row) => {        
        if (row[1] !== null && typeof row[1] ===  'number') {
          return {
            typeOfField: 'hourRegestrationField',
            date: row[0] as unknown as Date,
            weekNumberBasedOnDate: dayjs(row[0] as unknown as Date).week(),
            hours: row[1] as number,
            project: row[2] as string,
            type: row[3] as string,
            description: row[4] as string,
            wbsoHours: row[5] as number,
          } as hourRegestrationField;
        }
        return undefined;
      }) as
        | [hourRegestrationField | undefined]
        | null
      return parsedResult
    });
    return result?.filter(row => row) as [hourRegestrationField]
  }
  return null
}

export function useGroupedByWeekNumber(onlyHourRegestrationFields: [hourRegestrationField]){
  return useGroupBy(onlyHourRegestrationFields, row => row.weekNumberBasedOnDate)
}

export function useGroupedByProject(onlyHourRegestrationFields: [hourRegestrationField]){
  return useGroupBy(onlyHourRegestrationFields, row => row.project)
}

export function useGroupedByType(onlyHourRegestrationFields: [hourRegestrationField]){
  return useGroupBy(onlyHourRegestrationFields, row => row.type)
}

export function useCaclulateWBSOHours(onlyHourRegestrationFields: [hourRegestrationField]){
  let totalWBSOHours = 0;
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].wbsoHours){
      totalWBSOHours += onlyHourRegestrationFields[i].wbsoHours
    }
  }
  return totalWBSOHours
}

export function useCaclulateProjectHours(onlyHourRegestrationFields: [hourRegestrationField]){
  const projectHours = new Map<string,number>();
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].project && onlyHourRegestrationFields[i].hours){
      if(!projectHours.has(onlyHourRegestrationFields[i].project)){
        projectHours.set(onlyHourRegestrationFields[i].project, 0)
      }
      const value = projectHours.get(onlyHourRegestrationFields[i].project)
      if(value){
        projectHours.set(onlyHourRegestrationFields[i].project, value + onlyHourRegestrationFields[i].hours)
      }
    }
  }
  return projectHours
}

export function useCaclulateTypeHours(onlyHourRegestrationFields: [hourRegestrationField]){
  const typeHours = new Map<string,number>();
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].project && onlyHourRegestrationFields[i].hours){
      if(!typeHours.has(onlyHourRegestrationFields[i].project)){
        typeHours.set(onlyHourRegestrationFields[i].project, 0)
      }
      const value = typeHours.get(onlyHourRegestrationFields[i].project)
      if(value){
        typeHours.set(onlyHourRegestrationFields[i].project, value + onlyHourRegestrationFields[i].hours)
      }
    }
  }
  return typeHours
}