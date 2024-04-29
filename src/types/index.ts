interface UserItem {
  checked?: boolean,
  disabled?:boolean,
  groupId: string,
  id:string,
  isInExecutorList?: boolean,
  mobile:string,
  name:string,
  pinyin?:string,
  type:string,
  responseLevel?:string,
  sysAccount?: string,
  taskInfoId?: string,
  userName: string,
  userId: string,
  taskState?:string,
  orgName?: string
}

export {
  UserItem
};
