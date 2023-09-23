# projeto-lanchoneteVinont

## Descrição do Projeto
 Projeito feito com HTML5, CSS3, JavaScript e NodeJS. O objetivo era criar duas interfaces, uma do cliente e outra do admin, contendo tanto o front e o back, onde devia haver o registro dos clientes, e o login dos admins. O cliente poderia fazer os pedidos, e ver os seu própios pedidos, além de poder cancela-los. O admin teria acesso à lista de clientes, produtos, pedidos, alé de poder registrar os produtos, editar e remover.

### Desafios

O Sistema deverá contemplar os módulos: __Cliente__, __Produto__ e __Pedido__. Um __Pedido__ pertence a um __Cliente__ e um __Pedido__ contém vários __Produtos__.

A API será utilizada para o _client_ que irá realizar os pedidos. Nesse sentido, ela deverá conter _endpoints_ para que um __Cliente__ possa se cadastrar. Além de `criar`, `listar`, `ver` e `excluir` __Pedidos__ de um __Cliente__ específico. Obs.: Para evitar autenticação, o id do __Cliente__ pode ser usado como parâmetro para realizar essas ações.

O painel administrativo deve conter uma autenticação básica. E através dele deverá ser possível `listar` __Clientes__ e `listar` __Pedidos__, além de poder gerenciar os __Produtos__ da lanchonete..

Os campos para cada entidade serão:
- Cliente: `nome`, `email`, `telefone` e `endereço`;
- Produto: `nome` e `preço`;
- Pedido: `código do cliente`, `código do produto`, `data de criação` e `status do pedido`.

O __Pedido__ poderá conter os `status`: `Pendente`, `Em preparo`, `Em entrega`, `Entregue` e `Cancelado`.

## Acesso ao Projeto

- Você pode [acessar o código fonte do projeto inicial](https://github.com/vinnydarostrindad/projeto-lanchoneteVinont/tree/master) ou [baixá-lo](https://github.com/vinnydarostrindad/projeto-lanchoneteVinont/archive/refs/heads/master.zip).
- Após realizar o download dos arquivos em seu PC abra o Git Bash (caso esteja utilizando Windows) ou o terminal do seu Linux e inicie o servidor digitando: `npm run dev`

### Acesso pelo Admin:
- Usuário: admin
- Senha: 12345678

#### Feito por Vinny Daros Trindade
