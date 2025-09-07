// data/seed.js
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const productsData = require('./products.json');

const createTablesQuery = `
  DROP TABLE IF EXISTS order_items;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS products;

  CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    sub_category VARCHAR(100),
    original_price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    rating NUMERIC(2, 1),
    badge VARCHAR(100),
    colors TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY, -- Auto-incrementing integer ID for orders
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- e.g., Pending, Processing, Shipped, Delivered, Cancelled
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- guest_session_id VARCHAR(255) -- Optional: if you wanted to loosely track guest orders
  );

  CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL REFERENCES products(id), -- Assuming product IDs might not always be in our DB if fetched externally
    quantity INTEGER NOT NULL,
    price_at_purchase NUMERIC(10, 2) NOT NULL, -- Price of the single item at the time of purchase
    product_name VARCHAR(255), -- Store product name for easier order review
    product_image_url TEXT -- Store image URL for easier order review
  );
`;
// Note: For product_id in order_items, if products can come from an external source or be removed,
// you might not want a strict FOREIGN KEY REFERENCES products(id) or handle it differently.
// For this example, we assume products are from our DB.


const seedDatabase = async () => {
  const client = await db.pool.connect();
  try {
    console.log('Dropping and Creating tables (products, orders, order_items)...');
    await client.query(createTablesQuery);
    console.log('Tables created successfully.');

    console.log('Seeding products...');
    for (const product of productsData) {
      const insertQuery = `
        INSERT INTO products (id, name, description, image_url, category, sub_category, original_price, sale_price, rating, badge, colors)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      const colorsArray = Array.isArray(product.colors) ? product.colors : [];
      const values = [
        product.id,
        product.name,
        product.description,
        product.image_url,
        product.category,
        product.sub_category,
        product.original_price,
        product.sale_price,
        product.rating,
        product.badge,
        colorsArray
      ];
      await client.query(insertQuery, values);
    }
    console.log('Products seeded successfully.');
  } catch (err) {
    console.error('Error during database setup/seeding:', err.stack);
  } finally {
    client.release();
    console.log('Database setup/seeding process finished.');
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    console.log("Exiting seed script.");
    process.exit(0);
  }).catch(err => {
    console.error("Seed script failed:", err);
    process.exit(1);
  });
}

module.exports = seedDatabase;