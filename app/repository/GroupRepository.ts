import Realm from "realm";
import GroupLocalStorageModel from "../localstorage/models/GroupStorageModel";
import { Api } from "../services/api";
import { IGroupRepository } from "./interfaces/IGroupRepository";
export class GroupRepository implements IGroupRepository {
    private _api: Api;
    private _localStorage: Realm;

    constructor(
        api: Api,
        localStorage: Realm
    ) {
        this._api = api;
        this._localStorage = localStorage;
    }

    getAllPaginated(page: number): Promise<GroupLocalStorageModel[]> {
        //If there is internet, fetch from online api
        //this._api.getGroups(page);
        //If there is no internet, fetch from local database
        const groups = this._localStorage.objects<GroupLocalStorageModel>("Group");
        return Promise.resolve(groups.toJSON());
    }
    save(group: GroupLocalStorageModel): Promise<boolean> {
        let created;
        this._localStorage.write(() => {
            created = this._localStorage.create<GroupLocalStorageModel>("Group", group);
        });
        return Promise.resolve(true);
    }
    saveBatch(groups: GroupLocalStorageModel[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteAll() {
        this._localStorage.write(() => {
            this._localStorage.deleteAll();
        });
    }
}