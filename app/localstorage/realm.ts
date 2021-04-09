import Realm from "realm";
import GroupLocalStorageModel from "./models/GroupStorageModel";
export const realmLocalStorage = new Realm({
    path: "realmLocalStorage",
    schema: [GroupLocalStorageModel],
});