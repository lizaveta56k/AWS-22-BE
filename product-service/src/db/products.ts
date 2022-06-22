import { query } from './index';

export const getAll = async () => {
    const { rows } = await query("select * from products");

    return rows;
}

export const getExist = async () => {
    const { rows } = await query("select * from products p inner join stocks s on s.product_id=p.id");

    return rows;
}

export const getById = async (id) => {
    const { rows } = await 
        query(`select * from products p inner join stocks s on s.product_id=p.id where p.id = '${id}'`);
    
        return rows;
}

export const crateProduct = async (title, description, price) => {
    const { result } = await 
        query(`insert into products(title, description, price) 
        values ('${title}','${description}', ${price});`);
    
        return result;
}