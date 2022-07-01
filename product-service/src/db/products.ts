import { query, pool } from './index';
import { Product } from "@models/Product";

export const getAll = async () => {
    const { rows } = await query("select * from products");

    return rows;
}

export const getExist = async () => {
    const { rows } = await query("select p.id, p.title, p.price, p.description, s.count from products p inner join stocks s on s.product_id=p.id");

    return rows;
}

export const getById = async (id) => {
    const { rows } = await
        query(`select p.id, p.title, p.price, p.description, s.count from products p inner join stocks s on s.product_id=p.id where p.id = '${id}'`);

    return rows[0];
}

export const create = async (title, description, price) => {
    const { rows } = await
        query(`insert into products(title, description, price) 
        values ('${title}','${description}', ${price}) RETURNING *;`);

    return rows;
}

export const deleteById = async (id) => {
    const { rows } = await
        query(`delete from products where id='${id}' RETURNING *;`);

    return rows;
}

export const createWithStock = async (title, description, price, count) => {
    const client = await pool.connect();
    let res;
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(`insert into products(title, description, price) 
                values ('${title}','${description}', ${price}) RETURNING *;`)

            var newProduct = res.rows[0] as Product;
            await client.query(`insert into stocks(product_id, count) 
                values ('${newProduct.id}','${count}') RETURNING *;`)

            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}