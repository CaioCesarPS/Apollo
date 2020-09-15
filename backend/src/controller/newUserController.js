const connection = require('../database/connection');
const crypto = require('crypto')

module.exports = {
    async index(req, res){

        // selecionando todos os usuarios do banco.
        const users = await connection('users').select('*');

        res.json(users)
    },

    async create(req, res){
        //pegando os dados obrgatorios da tabela pelo body
        const { name, username, password, phoneNumber, adress, permission} = req.body;

        //criando id's randomicos usando o node.
        const id = crypto.randomBytes(4).toString('HEX');

        //pegando o id criado e usando como parametro de criação do avatar
        const avatar = `https://api.adorable.io/avatars/285/${id}.png`;

        //connectando ao banco e inserindo os dados que pegamos do body e o avatar
        await connection('users').insert({
            id,
            name,
            username,
            password,
            phoneNumber,
            adress,
            permission,
            avatar
        });

        //jogando no console uma mensagem de quem foi criado.
        console.log(`Usuario ID ${id} e nome ${name} cadastrado com sucesso.`);

        //returnando dados para mostrar no insominia
        return res.json({ id ,name, phoneNumber, adress })
    },

    async searchSpecific(req, res){
        //pegando id do usuario passado pela rota
        const { id } = req.params;

        //jogando para viariavel os dados da pesquisa feita com o id recebido
        //via params e retornando via json
        const data = await connection('users')
        .where( 'id', id )

        return res.json(data)
    },

    async editUser(req, res){

        // pegando id pelos parametros
        const { id } = req.params

        // fazendo conexão com o banco
        //pesquisando pelo id 
        //atualizando os dados passados pelo body
        await connection('users')
        .where('id', id)
        .update({ ...req.body });

        // pesquisando os dados da pessoa que foi atualizada
        const showUpdatedUser = await connection('users')
        .where('id', id)

        // mostrando esses dados da pessoa
        return res.json(showUpdatedUser);
    },

    async deleteUser(req, res){
        const { id } = req.params

        await connection('users')
        .where({ id })
        .del()

        return res.send()
    }
}