const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async showAll(req, res){
        const { page = 1} = req.query;

        const [count] = await connection('orders').count();

        console.log(count);

        const orders = await connection('orders')
        .join('users', 'user_id', '=', 'orders.user_id')
        .limit(5)
        .select([
            'orders.*',
            'users.id',
            'users.name',
            'users.phoneNumber',
            'users.adress'
        ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(orders)
    },

    async create(req, res){
        const id = crypto.randomBytes(4).toString('HEX');
        const { order, priece } = req.body;
        const user_id = req.headers.autorization;

        if(user_id){
            const [createdOrder] = await connection('orders').insert({
                id,
                order,
                priece,
                user_id
            })

            return res.json({ createdOrder })
        }else{
            res.json('user_id não inserido')
        }

    },

    async showSpecific(req, res){
        
    }
}