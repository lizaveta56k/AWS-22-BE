import { query } from './index';

export const getAll = async () => {
    const { rows } = await query("select * from products");
    console.log(JSON.stringify(rows[0]))
}

export const getExist = async () => {
    const { rows } = await query("select * from products p inner join stocks s on s.product_id=p.id");
    console.log(JSON.stringify(rows[0]))
}

export const getById = async (id) => {
    const { rows } = await 
        query("select * from products p inner join stocks s on s.product_id=p.id where p.id = []");
    console.log(JSON.stringify(rows[0]))
}