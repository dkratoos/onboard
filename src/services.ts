import { registerService, registerServiceWithFactory, use } from "@cubos/inject";

import { PostRepository, UserRepository } from "./repositories";
import { Config } from "./services/Config";
import { Sentry } from "./services/Sentry";
import { TvMaze } from "./services/tvmaze";

// Todos os serviços utilizados pela aplicação devem ser inicializados neste arquivo.
// - Singleton: Haverá apenas uma instância deste serviço compartilhada entre toda a aplicação.
//              utilize estes serviços quando sua classe não tem nenhuma propriedade ou quando
//              ela não armazena nenhum dado específico de um usuário ou uma sessão.
// - Scoped: Haverá uma instância diferente sendo criada em cada escopo (um escopo é uma requisição
//           vinda do cliente ou uma transação de banco de dados). Esse tipo é utilizado para todos
//           os Repository de forma que dentro de uma transação de banco de dados eles sempre se
//           refiram à transação atualmente em curso. Caso crie um serviço que identifique o usuário
//           atual ou armazene qualquer informação sensível de uma requisição, utilize "scoped".
// - Transient: Uma nova instância será criada cada vez que este serviço for requisitado. Utilize
//              apenas em serviços que não possuem construtor nem nenhuma propriedade, ou que sejam
//              utilizados apenas esporadicamente.

registerService("singleton", Config);
registerService("singleton", TvMaze);
registerService("singleton", Sentry);

registerServiceWithFactory("scoped", PostRepository, () => use.entityManager.getCustomRepository(PostRepository));
registerServiceWithFactory("scoped", UserRepository, () => use.entityManager.getCustomRepository(UserRepository));
