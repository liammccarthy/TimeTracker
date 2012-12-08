CREATE TABLE users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(50),
	role VARCHAR(20),
	created DATETIME DEFAULT NULL,
	modified DATETIME DEFAULT NULL
);

CREATE TABLE companies (
	company_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	company_name VARCHAR(50)
);
CREATE TABLE buckets (
	bucket_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	bucket_name VARCHAR(50),
	company_id INT UNSIGNED,
	FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

CREATE TABLE tasks (
	task_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	task_name VARCHAR(50),
	task_time DECIMAL(10,2),
	bucket_id INT UNSIGNED,
	user_id INT UNSIGNED,
	FOREIGN KEY (bucket_id) REFERENCES buckets(bucket_id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE task_lists(
	task_list_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	task_desc varchar(500),
	task_id INT UNSIGNED,
	FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);


INSERT INTO companies (company_name) values ('BlueSpurs Consulting'), ('Brunswick News');

INSERT INTO buckets (bucket_name, company_id) values ('Bluespurs Test Bucket1', 1) , ('Brunswick News Test Bucket1', 2);

INSERT INTO tasks (task_name, task_time, bucket_id, user_id) values ('Test Bucket1 Test Task 1', 1.5, 1, 1), ('Test Bucket2 Test Task 1', 4.5, 2, 1), ('Test Bucket1 Test Task 2', 4.5, 1, 1), ('Test Bucket2 Test Task 2', 0.5, 2, 1);

INSERT INTO buckets (bucket_name, company_id) values ('Sophie is funny', 1);


INSERT INTO tasks (task_name, task_time, bucket_id, user_id) values ('Sophie test 1', 1.5, 3, 1), ('Sophie test  2', 4.5, 3, 1), ('Sophie test 3', 4.5, 3, 1);


INSERT INTO task_lists (task_desc, task_id) values ('Some random description', 1),('Some random description2', 1),('Some random description3', 1),('asdasdasdsa', 2),('fffff description2', 2),('Somrewtrwerwer', 3),('asdaaqweqweqwasdsa', 3),('2352356235', 5)
, ('sadaqwe412341245152',4),('asdasdasasgaghahshjdsa', 7), ('asdasda43765422222222222sdsa', 6);

