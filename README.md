# Home Test Project - CSV Data Viewer

Welcome to the test project for evaluating Backend and Frontend development skills. The goal of this project is to build a web application that allows users to load a CSV file with preformatted data and display that data as cards on the website. Users should also be able to filter the data efficiently. The tech stack for this project includes React.js for the frontend, Node.js, Prisma, SQLite for the backend, and additional features like cache support with Redis and pagination to enhance performance.

## Features

- **CSV File Upload:** Users can upload a CSV file containing preformatted data.

- **Data Display:** Display the data from the CSV file as cards on the website.

- **Filtering:** Implement a filter functionality to allow users to filter the displayed data based on certain criteria.

- **Pagination:** Implement pagination to handle a large dataset and improve performance.

- **Cache Support:** Utilize caching mechanisms to enhance data retrieval and overall application performance.

### Project Structure
**Backend:** Node.js backend using Prisma and SQLite for data storage.
**Frontend** React.js frontend for user interaction.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Prisma, SQLite
- **Additional Features:** Redis Cache support, Pagination

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.

```bash
cd backend
```

2. Install dependencies.

```bash
npm install
```

3. Run the backend server.

```bash
npm run dev
```

The backend server should be running at http://localhost:3000.


### Frontend

1. Navigate to the `fronted` directory.

```bash
cd fronted
```

2. Install dependencies.

```bash
npm install
```

3. Run the frontend server.

```bash
npm run dev
```

The frontend server should be running at http://localhost:4000.
