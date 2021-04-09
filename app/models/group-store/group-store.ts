import { Instance, SnapshotOut, types } from "mobx-state-tree"
import GroupLocalStorageModel from "../../localstorage/models/GroupStorageModel"
import { withEnvironment } from "../extensions/with-environment"
import { GroupModel } from "../group/group"

/**
 * Example store containing Rick and Morty characters
 */
export const GroupStoreModel = types
    .model("GroupStore")
    .props({
        groups: types.optional(types.array(GroupModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => {
        return ({
            _addGroupToStore(group: GroupLocalStorageModel) {
                self.groups.push(group)
            },
            _deleteAllFromStore() {
                self.groups.clear()
            },
            _addGroupsToStoreBatch: (groups: GroupLocalStorageModel[]) => {
                self.groups.concat(groups);
            },
        })
    })
    /* Async actions */
    .actions((self) => {
        let groupRepository = self.environment.groupRepository;
        return ({
            addGroup(group: GroupLocalStorageModel) {
                groupRepository.save(group).then(result => self._addGroupToStore(group))
            },
            getAllGroupsPaginated(page: number) {
                groupRepository.getAllPaginated(page).then(groups => self._addGroupsToStoreBatch(groups));
            },
            deleteAll() {
                groupRepository.deleteAll();
                self._deleteAllFromStore();
            }
        })
    })

type GroupStoreType = Instance<typeof GroupStoreModel>
export interface GroupStore extends GroupStoreType { }
type GroupStoreSnapshotType = SnapshotOut<typeof GroupStoreModel>
export interface GroupStoreSnapshot extends GroupStoreSnapshotType { }
export const createGroupStoreDefaultModel = () => types.optional(GroupStoreModel, {})
