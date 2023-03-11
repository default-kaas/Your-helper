import * as dayjs from 'dayjs'

export function useDateDayMonthYear(date: Date){
  return dayjs(date).format('D MMMM YYYY')
}