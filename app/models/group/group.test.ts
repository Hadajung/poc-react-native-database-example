import { GroupModel } from "./group"

test("can be created", () => {
  const instance = GroupModel.create({})

  expect(instance).toBeTruthy()
})
