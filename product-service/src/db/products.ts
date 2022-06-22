import { query } from './index';

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
    
        return rows;
}

export const create = async (title, description, price) => {
    const { rows } = await 
        query(`insert into products(title, description, price) 
        values ('${title}','${description}', ${price}) RETURNING *;`);
    
        return rows;
}