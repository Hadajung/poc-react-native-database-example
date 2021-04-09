import { Instance, SnapshotOut, types } from "mobx-state-tree"
export interface GroupRemoteModel {
        id: number
        name: string
        status: boolean
        about: string
        privacy: undefined
        authorID: number
        _key_admins: number[]
        approved: boolean
        avatar: string
        cover: string
        parentid: number
        phone: string
}

/**
 * Model description here for TypeScript hints.
 */
export const GroupModel = types
  .model("Group")
  .props({
        id: types.integer,
        name: types.optional(types.string, ""),
        status: types.optional(types.boolean, true),
        about: types.optional(types.string, ""),
        privacy: types.optional(types.string, ""),
        authorID: types.integer,
        admins: types.optional(types.array(types.integer), []),
        approved: types.optional(types.boolean, true),
        avatar: types.optional(types.string, ""),
        cover: types.optional(types.string, ""),
        parentid: types.integer,
        phone: types.optional(types.string, "")
        })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
        parseJson(json: GroupRemoteModel) {
            self.id = json.id
            self.name = json.name
            self.status = json.status
            self.about = json.about
            self.privacy = json.privacy
            self.authorID = json.authorID
            self.admins = json._key_admins
            self.approved = json.approved
            self.avatar = json.avatar
            self.cover = json.cover
            self.parentid = json.parentid
            self.phone = json.phone
        }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GroupType = Instance<typeof GroupModel>
export interface Group extends GroupType { }
type GroupSnapshotType = SnapshotOut<typeof GroupModel>
export interface GroupSnapshot extends GroupSnapshotType { }
export const createGroupDefaultModel = () => types.optional(GroupModel, {})
