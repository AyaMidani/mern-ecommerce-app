# 🛍️ MERN E-Commerce App with Admin Dashboard

This project is a **full-stack e-commerce application** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It includes a **user-facing store** and a secure **admin dashboard** for managing products, orders, and users.

---

## ✨ Features

### 👤 Customer Side
- Browse products by category/brand
- View product details
- Add to cart and checkout
- User authentication (login/register)
- Responsive UI (mobile + desktop)

### 🛠️ Admin Dashboard
- Authentication with JWT middleware
- Sidebar + header layout (responsive)
- Manage products:
  - Add new products (title, description, category, brand, price, stock, image)
  - Edit and delete products
  - Upload product images (drag & drop or file input)
- Manage orders
- Manage users

---

## 🏗️ Tech Stack

**Frontend**
- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🧩 Shadcn/UI components
- 🗂️ Redux Toolkit (state management)
- React Router (routing)

**Backend**
- 🟢 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT authentication
- 📂 Multer (image uploads)

---

## 📂 Project Structure

/client → Frontend (React + Vite)
/server → Backend (Express + MongoDB)
/models → Mongoose models
/routes → API routes
/middleware → JWT auth, error handling
/components → Reusable React components
Copy code
cd client
npm run dev
Visit: http://localhost:5173
