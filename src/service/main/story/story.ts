import westRequest from "@/service"

import type { IStoryListDataType } from "./type"

export function getStoryList(url: string): Promise<IStoryListDataType> {
  return westRequest.post({
    url
  })
}
