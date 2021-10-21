import type { ContextRequest } from "@sdkgen/node-runtime";
import type { Connection, EntityManager } from "typeorm";

// Caso você utilize registerValue ou registerScopedValue na aplicação, defina aqui os tipos dos valores registrados.

module "@cubos/inject" {
  export interface UseTypeMap {
    request: ContextRequest;
    connection: Connection;
    entityManager: EntityManager;
    tr(str: TemplateStringsArray, ...args: unknown[]): string;
  }
}
