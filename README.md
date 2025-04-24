# TinyDaily

A simple daily task management application built with Node.js, Express, Mongoose, and EJS.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```bash
PORT=3100
MONGODB_URI=mongodb://localhost:27017/tinydaily
NODE_ENV=development
```

3. Start MongoDB (if running locally)

4. Start the development server:
```bash
npm run dev
```

5. In a separate terminal, start the SCSS watcher:
```bash
npm run watch:scss
```

The application will be available at http://localhost:3100

## Project Structure

- `src/` - Source files
  - `app.ts` - Main application file
  - `views/` - EJS templates
  - `public/` - Static files
    - `scss/` - SCSS source files
    - `css/` - Compiled CSS files

## Environment Variables

- `PORT`: The port number the server will run on (default: 3100)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/tinydaily)
- `NODE_ENV`: Application environment (development/production) 