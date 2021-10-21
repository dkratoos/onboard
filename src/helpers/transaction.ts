import { randomBytes } from "crypto";

import { registerScopedValue, setupScope, use } from "@cubos/inject";

export async function transaction<T>(runInTransaction: () => Promise<T>) {
  if (use.entityManager.queryRunner?.isTransactionActive) {
    const id = `savepoint${randomBytes(16).toString("hex")}`;

    await use.entityManager.query(`SAVEPOINT ${id}`);

    try {
      const result = await setupScope(runInTransaction);

      await use.entityManager.query(`RELEASE SAVEPOINT ${id}`);
      return result;
    } catch (ex) {
      await use.entityManager.query(`ROLLBACK SAVEPOINT ${id}`);
      throw ex;
    }
  }

  return use.entityManager.transaction(async entityManager => {
    return setupScope(async () => {
      registerScopedValue("entityManager", entityManager);
      return runInTransaction();
    });
  });
}
