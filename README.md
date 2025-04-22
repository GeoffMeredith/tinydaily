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

2. Start MongoDB (if running locally)

3. Start the development server:
```bash
npm run dev
```

4. In a separate terminal, start the SCSS watcher:
```bash
npm run watch:scss
```

The application will be available at http://localhost:3000

## Project Structure

- `src/` - Source files
  - `app.ts` - Main application file
  - `views/` - EJS templates
  - `public/` - Static files
    - `scss/` - SCSS source files
    - `css/` - Compiled CSS files 