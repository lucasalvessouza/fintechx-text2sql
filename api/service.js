const { GoogleGenerativeAI } = require("@google/generative-ai");


const schema = `
Table: customers
  Columns: ID (Primary Key), Company, Last Name, First Name, Email Address, Job Title, Business Phone, Home Phone, Mobile Phone, Fax Number, Address, City, State/Province, Zip/Postal Code, Country/Region, Web Page, Notes, Attachments

Table: employees
  Columns: id, company, last_name, first_name, email_address, job_title, business_phone, home_phone, mobile_phone, fax_number, address, city, state_province, zip_postal_code, country_region, web_page, notes, attachments
  Primary Key: id
  Indexes: 
    - city
    - company
    - first_name
    - last_name
    - zip_postal_code
    - state_province

Table: orders
  Columns: id, employee_id, customer_id, order_date, shipped_date, shipper_id, ship_name, ship_address, ship_city, ship_state_province, ship_zip_postal_code, ship_country_region, shipping_fee, taxes, payment_type, paid_date, notes, tax_rate, tax_status_id, status_id
  Primary Key: id
  Foreign Keys: 
    - fk_orders_customers (customer_id) REFERENCES customers (id)
    - fk_orders_employees1 (employee_id) REFERENCES employees (id)
    - fk_orders_orders_status1 (status_id) REFERENCES orders_status (id)
    - fk_orders_orders_tax_status1 (tax_status_id) REFERENCES orders_tax_status (id)
    - fk_orders_shippers1 (shipper_id) REFERENCES shippers (id)
  Indexes: 
    - customer_id
    - customer_id_2
    - employee_id
    - employee_id_2
    - id
    - id_2
    - id_3
    - shipper_id
    - shipper_id_2
    - tax_status
    - ship_zip_postal_code

Table: products
  Columns: supplier_ids, id, product_code, product_name, description, standard_cost, list_price, reorder_level, target_level, quantity_per_unit, discontinued, minimum_reorder_quantity, category, attachments
  Primary Key: id
  Indexes: 
    - product_code
`;

const getGenerativeAIClient = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-pro"});
}

const generateSqlFromText = async (question) => {
  const prompt = `Database Schema:\n${schema}\n\nQuestion: ${question}\nSQL Query:`
  const generativeClient = getGenerativeAIClient()
  const result = await generativeClient.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text
}

module.exports = {
  generateSqlFromText
}