# E-commerce Ucompensar with Authentication System

A secure E-commerce Ucompensar with authentication system built with Next.js, Prisma, and MySQL, featuring role-based access control and a modern admin interface.

## 🚀 Features

- 🔐 Secure authentication system
- 👥 Role-based access control (Admin/User)
- 💫 Modern and responsive admin interface
- 🛡️ Protected admin routes
- 🔑 JWT-based authentication
- 📱 Remember me functionality
- 🎨 Clean UI with Tailwind CSS
- 🔒 Password encryption with bcrypt

## 🛠️ Tech Stack

- Next.js +13 (App Router)
- Prisma ORM
- MySQL
- Tailwind CSS
- JSON Web Tokens (JWT)
- bcrypt
- Zod Validation

## 📋 Prerequisites

- Node.js 18.x or higher
- MySQL database
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://user:password@host:port/database"
JWT_SECRET="your-secure-secret-key"
```

4. Set up the database:
```bash
npx prisma db push
```

5. Create the first admin user:
```bash
npm run seed
```

Default admin credentials:
- Email: admin@tiendaucompensar.com
- Password: Admin

6. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── account/
│   │   │   │   └── settings.js
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── products/
│   │   │   │   └── page.js
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── create/
│   │   │   │       └── route.js
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── route.js
│   │   ├── careers/
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   ├── components/
│   │   │   ├── header.js
│   │   │   └── navbar.js
│   │   ├── contactanos/
│   │   │   └── page.js
│   │   ├── lib/
│   │   │   ├── auth.js
│   │   │   ├── jwt.js
│   │   │   └── prisma.js
│   │   ├── nosotros/
│   │   │   └── page.js
│   │   ├── productos/
│   │   │   └── page.js
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── middleware.js
│   │   └── page.js
│   │     
│   └── ...
└── ...

```

## 🔒 API Routes

### Authentication

#### POST /api/auth/login
```json
{
  "email": "admin@ejemplo.com",
  "password": "yourpassword"
}
```

#### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

### Admin Routes

#### POST /api/admin/create
Creates a new admin user (requires admin authentication)
```json
{
  "email": "newadmin@example.com",
  "password": "SecureAdmin123!",
  "name": "New Admin"
}
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected admin routes
- Input validation with Zod
- SQL injection protection with Prisma
- XSS protection
- CSRF protection
- Rate limiting
- Secure password requirements

## 🔄 Authentication Flow

1. User submits login credentials
2. Server validates credentials
3. If valid, generates JWT token
4. Token is stored in localStorage/sessionStorage
5. Protected routes check token validity
6. Admin routes verify admin role

## 📝 Environment Variables

Required environment variables:
```env
DATABASE_URL=           # Your MySQL connection string
JWT_SECRET=            # Your JWT secret key
```

## 🛡️ Middleware Protection

All routes under `/admin/*` are protected by middleware that:
- Verifies JWT token
- Checks admin role
- Redirects to login if unauthorized


