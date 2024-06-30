import pool from "../../databases/config.js";

export const getBlogByUrl = async (url) => {
    const blog = await pool.query("SELECT * FROM blog WHERE url =?", [url]);
    return blog;
};

export const insertBlogData = async (dataToInsert) => {
    try {
        const sql = 'INSERT INTO articles (url, title, header_intro, article_content, article_element) VALUES (?, ?, ?, ?, ?)';
        const values = [
            dataToInsert.url,
            dataToInsert.title,
            dataToInsert.header_intro,
            dataToInsert.article_content,
            dataToInsert.article_element
        ];
        
        // Execute the query using the pool
        const [rows, fields] = await pool.execute(sql, values);
        
        console.log('Inserted new row with ID:', rows.insertId);
    } catch (error) {
        console.error('Error inserting data:', error.message);
    } finally {
        // Close the connection pool
        pool.end();
    }
}
