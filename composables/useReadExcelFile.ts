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
    const onlyHourRegestrationFields = result?.filter(row => row) as [hourRegestrationField]
    const groupedHourRegestrationFields = useGroupBy(onlyHourRegestrationFields, row => row.weekNumberBasedOnDate)
    return groupedHourRegestrationFields
  }
  return null
}