const db = require('../db')

class Order{
    constructor(){

    }
    static async listOrdersForUser(user){
        //The listOrdersForUser method will return all orders that the authenticated user has created

        const result = await db.query(`
            SELECT orders.id AS "orderId",
                    orders.customer_id AS "customerId",
                    od.quantity AS "quantity",
                    products.name AS "name",
                    products.price AS "price"
            FROM orders
            JOIN order_details od 
            ON od.order_id = orders.id
            JOIN products 
            ON products.id = od.product_id
            WHERE orders.customer_id = (SELECT id FROM users WHERE email = $1)
            `, [user.email])

    return result.rows
    }

    static async fetchOrderById(){
        
    }

    static async createOrder(user, order){
        //The createOrder method will take a user's order and store it in the database.
        const result = await db.query(`
        INSERT INTO orders(
            customer_id
        )
        SELECT id
        FROM users
        WHERE email = $1
        RETURNING orders.id;
        `,
        [user.email])

        const orderId = (await result).rows[0]
        await Object.keys(order).forEach(productId => {
            db.query(`
            INSERT INTO order_details(
                order_id,
                product_id,
                quantity
                ) 
                VALUES (
                $1, $2, $3
            );
            `, [parseInt(orderId.id), parseInt(productId), parseInt(order[productId])]);
        });
        return orderId
    }

}

module.exports = Order