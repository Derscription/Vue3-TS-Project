type IWestFormType = "input" | "password" | "select" | "datepicker"

interface IWestFormItemOptionsType {
  title: string
  value: number
}

interface IWestFormItemOtherOptions {
  startPlaceholder?: string
  endPlaceholder?: string
  type?: string
}

export interface IWestFormItemType {
  field: string
  type: IWestFormType
  label: string
  rules?: any[]
  placeholder?: string
  // 针对select
  options?: IWestFormItemOptionsType[]
  // 针对特殊的属性
  otherOptions?: IWestFormItemOtherOptions
  isHidden?: boolean
}

interface IWestFormColLayout {
  span: number
  offset: number
}

type colLayoutType = number | IWestFormColLayout

export interface IWestForm {
  formItems: IWestFormItemType[]
  labelWidth?: string
  colLayout?: {
    xl?: colLayoutType
    lg?: colLayoutType
    md?: colLayoutType
    sm?: colLayoutType
    xs?: colLayoutType
    span?: number
  }
  itemStyle?: CSSStyleDeclaration | any
}
