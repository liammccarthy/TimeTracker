create database if not exists testDatabase;

use testDatabase;

create user testUser@localhost identified by 'testUser';

grant all privileges on testDatabase.* to testUser@localhost with grant option;
