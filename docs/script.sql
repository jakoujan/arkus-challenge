create table tbl_user (
  user_id int generated always as identity,
  user_name varchar(15) not null,
  user_password varchar(100) not null,
  name varchar(150) not null,
  email varchar(100) not null,
  user_role varchar(15) not null,
  primary key (user_id)
);

create table tbl_account (
  account_id int generated always as identity,
  account_name varchar(15) not null,
  customer_name varchar(100) not null,
  responsible varchar(150) not null,
  primary key (account_id)
);