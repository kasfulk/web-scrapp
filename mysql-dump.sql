CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    header_intro TEXT,
    article_content TEXT,
    article_element TEXT
);
