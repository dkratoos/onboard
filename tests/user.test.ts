import { registerService } from "@cubos/inject";
import type { Context } from "@sdkgen/node-runtime";
import { apiTestWrapper } from "@sdkgen/node-runtime";

import "../src/controllers";
import { api } from "../src/generated/api";

const { fn } = apiTestWrapper(api);

describe("User", () => {
  const ctx = {} as Context;

  test("should return empty array when there's no data", async () => {
    const users = await fn.getUsers(ctx, {});

    expect(users).toBeTruthy();
    expect(users).toStrictEqual([]);
  });

  test("should return users when have data", async () => {
    await fn.createUser(ctx, { age: 25, name: "John Doe" });

    const users = await fn.getUsers(ctx, {});

    expect(users).toBeTruthy();
    expect(users).toHaveLength(1);
  });

  test("should return error when sending invalid name", async () => {
    await expect(fn.createUser(ctx, { age: 25, name: "test" })).rejects.toThrowError("Nome inválido");
  });

  test("should create user when sending valid name and age", async () => {
    const user = await fn.createUser(ctx, { age: 25, name: "John Doe" });

    expect(user.name).toBe("John Doe");
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
  });

  // This is a unit test that does NOT depend on the database because we are mocking the repository.
  test("should create user when sending valid name and age", async () => {
    const saveFn = jest.fn();

    registerService(
      "scoped",
      class UserRepository {
        save = saveFn;
      },
    );

    saveFn.mockReturnValueOnce({
      id: "6ba80c12-0b5b-432e-94a4-97cd77a41fd6",
      age: 25,
      firstName: "John",
      lastName: "Doe",
    });

    const user = await fn.createUser(ctx, { age: 25, name: "John Doe" });

    expect(saveFn).toHaveBeenCalledWith({ age: 25, firstName: "John", lastName: "Doe" });
    expect(saveFn).toHaveBeenCalledTimes(1);

    expect(user.id).toBe("6ba80c12-0b5b-432e-94a4-97cd77a41fd6");
    expect(user.name).toBe("John Doe");
  });
});
