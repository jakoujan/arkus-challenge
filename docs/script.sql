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

create table tbl_assignment (
  assignment_id int generated always as identity,
  user_id int not null,
  account_id int not null,
  start_date timestamp not null,
  end_date timestamp null,
  status int not null,
  primary key (assignment_id),
  foreign key (user_id) references tbl_user(user_id),
  foreign key (account_id) references tbl_account(account_id)
);

create view view_assignment as (SELECT a.assignment_id, a.user_id, a.account_id, a.start_date, a.end_date, a.status, u.name, ac.account_name FROM tbl_assignment a
INNER JOIN tbl_user u ON (u.user_id = a.user_id) INNER JOIN tbl_account ac ON (ac.account_id = a.account_id));