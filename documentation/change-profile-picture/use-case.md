# Alterar Foto de Perfil

> ## Dados
* Id do Usuário
* Foto

> ## Fluxo primário
1. Gravar a foto recebida em um FileStorage
2. Obter a url da foto que foi gravada no Storage
3. A url da foto gravada deve ser única (não pode sobrescrever a anterior)
4. Atualizar os dados do usuário com a url da foto
5. Retornar a url da foto

> ## Fluxo de exceção: Erro ao atualizar dados do usuário
1. Apagar a foto criada no FileStorage
2. Repassar o mesmo erro recebido adiante
