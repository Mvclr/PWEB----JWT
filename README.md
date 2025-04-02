Projeto de autenticação e autorização utilizando JWT para autenticação básica de login e autorição de entrada nas páginas de adicionar clientes e na página principal. Tokens gerados com JWT e armazenados em cookies.

Bibliotecas baixadas: express, nodemon, cookie-parser, jsonwebtoken e dotenv-safe

Endpoints:

/login post
Verificar se os parâmetros passado
sejam txtUsername='fulano',
txtPassword='123456' e o token
armazene no cookies. Caso o
usuário/senha tenham estes valores
acima chame a rota /principal depois
de armazenar o token no cookies.
Caso contrário chame a rota /login
método get que irá chamar a tela de
login.

/login get
Chamar a tela de login em html e caso
tenha uma mensagem mostre abaixo
da tela de login.

/principal get
Verifique se o token passado é igual
ao armazenado no cookies. Caso
verdadeiro chame a tela html da
página principal. Caso contrário
retorne para a tela de login (rota login
método get).

/clientes get
Verifique se o token passado é igual
ao armazenado no cookies. Caso
verdadeiro chame a tela html da
página livros. Caso contrário retorne
para a tela de login (rota login método
get)
.# PWEB----JWT
