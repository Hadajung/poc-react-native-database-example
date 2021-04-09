import Realm from "realm";
import { GroupRemoteModel } from "../../models";

export default class GroupLocalStorageModel extends Realm.Object implements GroupRemoteModel {
  static schema = {
    name: "Group",
    properties: {
      id: "int",
      name: "string",
      status: "bool",
      about: "string",
      privacy: "string",
      authorID: "int",
      _key_admins: "int[]",
      approved: "bool",
      avatar: "string",
      cover: "string",
      parentid: "int",
      phone: "string"
    },
    primaryKey: "id",
  }
  id: number;
  name: string;
  status: boolean;
  about: string;
  privacy: undefined;
  authorID: number;
  _key_admins: number[];
  approved: boolean;
  avatar: string;
  cover: string;
  parentid: number;
  phone: string;
}
