import { realmLocalStorage } from "../localstorage/realm"
import { GroupRepository } from "../repository/GroupRepository"
import { Api } from "../services/api"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.api = new Api()

    //Init repositories
    this.groupRepository = new GroupRepository(this.api, realmLocalStorage);
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    await this.api.setup()
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: Api

  /**
   * Repositories
   */
  groupRepository: GroupRepository
}
