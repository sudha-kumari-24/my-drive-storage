# MyDrive – Secure File Storage Platform

A secure file upload and download platform with JWT authentication. Users can register, login, upload any file type (images, PDFs, documents, videos) and access their files from a personal dashboard.

## Features
- User Registration & Login with JWT Authentication
- Upload any file type (images, PDFs, videos, documents)
- Download files with original names
- User-specific file isolation
- Clean and responsive dashboard
- Local storage using /firebasefiles directory

## Tech Stack
Backend: Node.js, Express.js  
Database: MongoDB with Mongoose  
Authentication: JWT (JSON Web Tokens)  
File Handling: Multer  
View Engine: EJS  
Styling: CSS

## Project Structure

```bash

DRIVE/
├── config/
│ ├── db.js
│ ├── firebase.config.js
│ ├── localUpload.config.js
│ └── multer.config.js
├── firebasefiles/ # Uploaded files stored here
├── middlewares/
│ └── auth.js
├── models/
│ ├── file.model.js
│ └── user.model.js
├── public/
│ ├── home.css
│ └── register.css
├── routes/
│ ├── index.routes.js
│ └── users.routes.js
├── views/
│ ├── home.ejs
│ ├── login.ejs
│ ├── register.ejs
│ └── upload.ejs
├── .env
├── .gitignore
├── app.js
└── package.json

```


## Installation
Clone the repository:
```bash
git clone https://github.com/sudha-kumari-24/my-drive-storage.git
cd my-drive-storage
```

Install dependencies:
```bash
npm install

```

Create environment variables in .env file:
```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

```
Create upload directory:
```bash
mkdir firebasefiles
```

Start the server:
```bash
npm start
or for development with nodemon:
npm run dev

```

Open your browser and navigate to:
```bash
http://localhost:3000/home
```

## API Routes

Authentication
```bash
POST /user/register - Register new user
POST /user/login - Login user
```

File Operations
```bash
GET /home/ - Dashboard
GET /home/upload - Upload page
POST /home/upload - Upload file
GET /home/open/:fileId - Download file
```

## Database Schema

users Model
```bash
{
  username: String,
  phone: Number,
  email: String,
  password: String (hashed),
  remember: Boolean
}

```

files Model

```bash
{
  path: String,
  originalName: String,
  user: ObjectId (ref: users)
}

```


## Key Features Explained

**JWT Authentication** – Secure token-based authentication with protected routes and password hashing using bcrypt.

**File Upload with Multer** – Local storage in /firebasefiles directory with file type validation, size limits, and unique filenames.

**User-specific Files** – Each user sees only their uploaded files with secure download authorization.

**File Preview** – View images directly in browser with clean interface.

https://github.com/user-attachments/assets/0e79897e-3fd4-4b9a-bf34-07c40c760b5c

## Future Enhancements

- File sharing with public links
- Folder organization
- Search functionality
- Drag and drop upload
- File versioning

## Contributing
- Fork the repository
- Create feature branch: `git checkout -b feature/AmazingFeature`
- Commit changes: `git commit -m 'Add AmazingFeature'`
- Push to branch: `git push origin feature/AmazingFeature`
- Open a Pull Request

## License
MIT License

## Contact
**Sudha Kumari**  
**LinkedIn:** https://www.linkedin.com/in/sudha-kumari-92abb8205/  
**Project Link:** https://github.com/sudha-kumari-24/my-drive-storage.git

## Note
This project was built as a cost-effective alternative to Firebase Storage. All files are stored locally in the /firebasefiles directory instead of cloud storage to avoid paid plans.
