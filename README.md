# The E-Literate Library 📚

**The E-Literate Library** is a Book Management System developed using the MERN Stack. It provides a user-friendly platform to explore books and manage book-related information.

## 🚀 Features

### 📖 Book Management
- Display Available Books
- Browse Book Collection
- View Book Details
- Add New Books
- Update Book Information
- Delete Book Records

### 👤 User Management
- User Registration
- User Login
- Authentication System

### 💻 Frontend
- Responsive React Interface
- Book Cards Layout
- Navigation using React Router
- Axios API Integration

## 🛠️ Technologies Used

**Frontend**
- React.js
- HTML
- CSS
- JavaScript
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Tools**
- Visual Studio Code
- Git
- GitHub
- npm

## 📂 Project Structure

```text
the-e-literate-library/
│
├── Backend/
│   ├── route/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/yadavamit4git/the-e-literate-library.git
```

### 2. Open Project Folder

```bash
cd the-e-literate-library
```

### 3. Backend Setup

```bash
cd Backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `Backend` folder.

Add:

```env
MONGO_URI=mongodb://127.0.0.1:27017/e_literate_library
```

Make sure MongoDB is running on your computer.

### 5. Start Backend Server

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 6. Frontend Setup

Open a new terminal in the project root:

```bash
cd frontend
npm install
```

### 7. Start Frontend

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 🗄️ Database

- Database: MongoDB
- ODM: Mongoose
- Connection: MongoDB URI configured through `.env`

## 🔗 GitHub Repository

[The E-Literate Library](https://github.com/yadavamit4git/the-e-literate-library)

## 👨‍💻 Author

**Amit Yadav**

GitHub: [yadavamit4git](https://github.com/yadavamit4git)

## 📄 License

This project is created for educational and learning purposes.