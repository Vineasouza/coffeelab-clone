CREATE TABLE IF NOT EXISTS users (
	user_id BIGSERIAL PRIMARY KEY ,
   user_email varchar(250) NOT NULL UNIQUE,
   user_password varchar(250) NOT NULL,
   user_token varchar(50),
   user_type int DEFAULT 1
);

CREATE TABLE IF NOT EXISTS movies (
   mov_id varchar(36) PRIMARY KEY,
   mov_title varchar(50) NOT NULL,
   mov_original_title varchar(50) NOT NULL,
   mov_original_title_romanised varchar(50) NOT NULL,
   mov_release_date varchar(4) NOT NULL,
   mov_description varchar(500) NOT NULL,
   mov_director varchar(50) NOT NULL,
   mov_posterURL varchar(255) NOT NULL
);