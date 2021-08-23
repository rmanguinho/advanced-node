# Alterar Foto de Perfil

> ## Dados
* Id do Usuário
* Foto

> ## Fluxo primário
1. ✅ Gravar a foto recebida em um FileStorage, mantendo o formato original da foto
2. ✅ Enviar uma chave única para o FileStorage para evitar que sobrescreva alguma imagem que já existe
3. ✅ Atualizar os dados do usuário com a url da foto retornada pelo FileStorage
4. ✅ Limpar o campo de iniciais do nome do usuário
5. ✅ Retornar a url da foto e as iniciais do usuário

> ## Fluxo alternativo 1: Usuário removeu sua foto
1. ✅ Se o sistema não receber uma foto ignorar os passos 1 e 2
3. ✅ Limpar a url da foto dos dados do usuário
4. ✅ Atualizar o campo de iniciais do usuário com a primeira letra do primeiro e do último nome

> ## Fluxo alternativo 1.1: Usuário não tem sobrenome
4. ✅ Atualizar o campo de iniciais do usuário com as duas primeira letras do nome

> ## Fluxo alternativo 1.2: Usuário tem nome com apenas uma letra
4. ✅ Atualizar o campo de iniciais do usuário com a única letra

> ## Fluxo alternativo 1.3: Usuário não tem nome
4. ✅ Limpar o campo de iniciais do nome do usuário

> ## Fluxo de exceção: Erro ao atualizar foto do usuário
1. ✅ Apagar a foto criada no FileStorage
2. ✅ Repassar o mesmo erro recebido
