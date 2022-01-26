import axios, { AxiosRequestConfig, Method } from 'axios'

export interface IResponseData {
  code: eErrorCode
  data: any
}

export enum eErrorCode {
  success = 0,
  fail = -1, // 統一的錯誤

  // 個別的錯誤
  deleteNoOne = -2,
  notFound = -3,
  userIdentifyFail = -4,
}

export const request = async (
  _url: string,
  method: Method = 'GET',
  content?: AxiosRequestConfig
): Promise<IResponseData> => {
  const url: string = (process.env.REACT_APP_API_URL || '') + _url
  const { data }: { data: IResponseData } = await axios({
    ...content,
    url,
    method,
  })
  return data
}
