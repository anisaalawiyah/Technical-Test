CREATE DATABASE technical_test;



INSERT INTO MEMBER (name, position, photo, id) VALUES 
('John Doe', 'Software Engineer', 'johndoe.jpg', 1),
('Jane Smith', 'Product Manager', 'janesmith.jpg', 2),
('Alice Brown', 'Data Scientist', 'alicebrown.jpg', 3);


INSERT INTO superior (id, name) VALUES 
(1, 'Michael Johnson'),
(2, 'Linda Williams'),
(3, 'Robert Brown');
