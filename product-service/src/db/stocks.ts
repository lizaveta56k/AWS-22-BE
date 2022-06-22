import { query } from './index';

export const getAll = async () => {
    const { rows } = await query("select * from stocks");

    return rows;
}

export const getById = async (id) => {
    const { rows } = await 
        query(`select * from stocks where product_id = '${id}'`);
    
        return rows;
}

export const createStock = async (product_id, count) => {
    const { rows } = await 
        query(`insert into stocks(product_id, count) 
        values ('${product_id}','${count}') RETURNING *;`);
    
        return rows;
}