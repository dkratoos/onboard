import env from "@cubos/env";

// Neste serviço devem ser incluídas todas as configurações globais da aplicação vindas
// através de variáveis de ambiente. Desta maneira é possível registrar uma versão mock
// deste serviço para substituir esses valores de configuração durante os testes.
// Por exemplo:
//     registerService("singleton", class Config { tvmazeUrl = "http://localhost/" });

export class Config {
  tvmazeUrl = env.TVMAZE_URL;
}
