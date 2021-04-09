import GroupLocalStorageModel from "../../localstorage/models/GroupStorageModel";
export interface IGroupRepository {
  getAllPaginated(page: number): Promise<GroupLocalStorageModel[]>
  save(group: GroupLocalStorageModel): Promise<boolean>
  saveBatch(groups: GroupLocalStorageModel[]): Promise<boolean>
}