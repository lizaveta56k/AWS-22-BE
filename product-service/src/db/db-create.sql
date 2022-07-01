create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    price integer
);

create table stocks (
	product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id")
);

insert into products(title, description, price) 
values ('Nomade Chloe','Nomade by Chloe is a Chypre Floral fragrance for women.', 10);
insert into products(title, description, price) 
values ('Lavanda Chloe','Lavanda by Chloe is a Floral fragrance for women and men.', 167);
insert into products(title, description, price) 
values ('Radiant Mirage Estee Lauder','Radiant Mirage by Estee Lauder is a fragrance for women and men.', 17);
insert into products(title, description, price) 
values ('La Fin Du Monde Etat Libre dOrange','La Fin Du Monde by Etat Libre dOrange is a Woody Aromatic fragrance for women and men.', 77);
insert into products(title, description, price) 
values ('Ciel Magnolia Kenzo','Ciel Magnolia by Kenzo is a Floral Woody Musk fragrance for women.', 10);
insert into products(title, description, price) 
values ('Patchouli Magnetik Maison Crivelli','Patchouli Magnetik by Maison Crivelli is a fragrance for women and men.', 109);
insert into products(title, description, price) 
values ('Angel Muse Mugler','Angel Muse by Mugler is a Amber Vanilla fragrance for women.', 189);
insert into products(title, description, price) 
values ('Grain de Poudre Yves Saint Laurent','Grain de Poudre by Yves Saint Laurent is a Leather fragrance for women and men.', 89);

insert into stocks(product_id, count) 
values ((select id from products limit 1), 7);
insert into stocks(product_id, count) 
values ((select id from products limit 1 offset 1), 2);
insert into stocks(product_id, count) 
values ((select id from products limit 1 offset 2), 9);
insert into stocks(product_id, count) 
values ((select id from products limit 1 offset 3), 1);
insert into stocks(product_id, count) 
values ((select id from products limit 1 offset 4), 5);
insert into stocks(product_id, count) 
values ((select id from products limit 1 offset 7), 2);



