interface IChildrenPropsType {
  rowKey: string
  treeProp: {
    children: "children" | string
  }
}

export interface IPropListType {
  prop?: string
  label: string
  minWidth: string
  slotName?: string
  fixed?: string | boolean
}

export interface IPropPageType {
  currentPage: number
  pageSize: number
}

export interface IPropChildrenPropsType {
  rowKey: string
  treeProp: {
    children: string
  }
}

export interface ITableConfigType {
  title: string
  propList: IPropListType[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  childrenProps?: IChildrenPropsType
  showFooter?: boolean
  height?: string
  headerTitle?: string
}
