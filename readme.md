# MERN Application

This is a MERN stack application (MongoDB, Express, React, Node.js) that requires MongoDB Compass for local database connection setup.

## 🛠 Requirements

- [Node.js](https://nodejs.org/) installed
- [MongoDB Compass](https://www.mongodb.com/products/compass) installed

## 🚀 How to Run the Application

1. **Install MongoDB Compass**

   Make sure you have MongoDB Compass installed on your computer.

2. **Import MongoDB Connection Settings**

   - Open MongoDB Compass.
   - Click on **"Import Connections"**.
   - Select the file `compass-connections.json` from the root folder of the project.

3. **Open the Project in a Code Editor**

   Use your preferred code editor (e.g., VS Code) to open the project folder.

4. **Open Two Terminal Windows**

   In your editor or system terminal, open two terminals.

5. **Start the React Client**

   In the first terminal:

```bash
   cd app
   npm install
   npm run dev
   ```

6. **Start the Node.js Server**

   In the second terminal:

```bash
   cd server
   npm install
   npm start
   ```

7. **Open the App in the Browser**

   The app will be available at: http://localhost:5173/

   You can go directly to the registration page to create an account:
   http://localhost:5173/register
