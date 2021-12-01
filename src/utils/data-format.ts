import dayjs from "dayjs"
import utc from "dayjs/plugin/utc" // 导入utc

dayjs.extend(utc) // 将utc时间类型扩展到dayjs当中

const DATA_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss" // 默认时间格式

export function formatUtcString(
  utcString: string,
  format: string = DATA_TIME_FORMAT
): string {
  // utcOffset 偏移8个小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
