# Risk Assessment Request Prototype

This project is a full-stack web application designed as a prototype for DSS GmbH. Its primary function is to capture workplace risk assessment requests from users via a multi-step web form, store these requests, and generate a PDF confirmation.

## Deployment

The application is deployed and accessible at the following URLs:

- **Frontend:** [dss.tejaskadam.dev](https://dss.tejaskadam.dev)
- **Backend API (Example Endpoint):** [https://apis.tejaskadam.dev/apis/get](https://apis.tejaskadam.dev/apis/get)

## Local Setup Instructions

This document outlines how to run the project locally using two different methods.

**A Note on Configuration:**

Please be aware that a `.env` file has been intentionally included in this repository. While committing environment configuration files is generally not standard practice due to security risks, it has been done in this case to simplify the local setup and testing process. This file provides the necessary environment variables to run the application immediately after cloning.

---

### 1. With Docker Compose (Recommended)

This method uses the `docker-compose.yml` file to build and run both the frontend and backend services automatically.

**Prerequisites:**

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Instructions:**

1.  Open your terminal and navigate to the root directory of the project (where the `docker-compose.yml` file is).

2.  Build and run the services in detached mode (in the background) by running:

    ```bash
    docker-compose up --build -d
    ```

    - `--build`: This forces Docker to build the images from your local `be-rar` and `fe-rar` directories.
    - `-d`: This runs the containers in the background.

3.  The services are now running:

    - **Frontend:** `http://localhost:3000`
    - **Backend:** `http://localhost:8085`

4.  To stop the services, run:
    ```bash
    docker-compose down
    ```

---

### 2. Manual Setup (Without Docker)

This method requires you to run both Node.js applications manually in separate terminal windows.

**Prerequisites:**

- [Node.js](https://nodejs.org/) (LTS version recommended)

**Instructions:**

You will need **two separate terminals** for this.

#### Terminal 1: Backend (`be-rar`)

1.  Navigate to the backend directory:
    ```bash
    cd be-rar
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```
4.  Run the server on port 8085:
    ```bash
    PORT=8085 npm run start
    ```
    The backend is now running on `http://localhost:8085`.

#### Terminal 2: Frontend (`fe-rar`)

1.  Navigate to the frontend directory:
    ```bash
    cd fe-rar
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```
4.  Run the server on port 3000:
    ```bash
    PORT=3000 npm run start
    ```
    The frontend is now running on `http://localhost:3000`.

---

## Technical Summary

### Architecture

This project uses a **decoupled, full-stack architecture** consisting of three main parts:

1.  **Frontend (`fe-rar`):** A **Next.js 16 (React 19)** application using the App Router. It serves the user interface and manages all client-side interactions.
2.  **Backend (`be-rar`):** A **Node.js/Express.js 5** RESTful API. It handles business logic, data validation, database communication, and PDF generation.
3.  **Database:** A **MongoDB Cloud Atlas** (NoSQL) instance, which the backend communicates with via the **Mongoose** ODM.

The entire application is containerized using **Docker** and orchestrated with `docker-compose.yml`, with a **Jenkins** pipeline (`Jenkinsfile`) for CI/CD.

### Key Design Decisions

#### Frontend

- **Next.js (App Router):** Chosen for its high performance, file-based routing, and modern React features.
- **TypeScript:** Used for strict type-checking, reducing runtime errors and improving developer experience.
- **Robust Form Handling:** **React Hook Form** is paired with **Zod** (`@hookform/resolvers`) for powerful, schema-driven client-side validation.
- **Hybrid Data Fetching:** **SWR** is used for cached data (like the admin request list), while **Axios** is used for simple API calls (like form submission).
- **Modern UI Stack:** **Tailwind CSS** is the primary styling utility, combined with component primitives from **Radix UI** (suggesting `shadcn/ui`) and **Material-UI**.

#### Backend

- **Express.js:** A lightweight, unopinionated framework was chosen to build a focused REST API.
- **Separation of Concerns:** The backend code is clearly structured (MVC-like) into `routes`, `controllers`, `models`, and `validators`.
- **Server-Side Validation:** **Joi** is used to enforce data integrity, ensuring the server does not trust data sent from the client.
- **Mongoose Schema:** A strict schema (`models/Request.ts`) ensures all data stored in MongoDB follows the correct format.
- **Dynamic PDF Generation:** **PDFKit** is used on the server (`utils/pdfGenerator.ts`) to dynamically create the PDF confirmation from validated data.

---

## Detailed Technology Overview

### 1. Frontend (`fe-rar`)

The frontend is a modern, server-side rendered (SSR) React application.

- **Framework:** **Next.js 16** with the **App Router** (`app/` directory).
- **Language:** **TypeScript**.
- **UI & Styling:**
  - **Tailwind CSS:** Primary utility-first CSS framework.
  - **shadcn/ui (inferred):** Use of `@radix-ui/react-slot` and `components/ui` suggests `shadcn/ui` for composable, accessible UI components.
  - **Material-UI (`@mui/material`):** Also included for specific components.
- **Form Handling:**
  - **React Hook Form:** Manages state and submission of the multi-step form (`StepForm.tsx`).
  - **Zod:** Provides schema-based client-side validation via `@hookform/resolvers`.
- **Data Fetching:**
  - **SWR:** Client-side data fetching library, likely used in the admin view (`app/view/page.tsx`).
  - **Axios:** HTTP client for making API calls to the backend.
- **Key Components:**
  - `app/page.tsx`: The main landing page.
  - `app/view/page.tsx`: The admin page for listing requests.
  - `components/StepForm.tsx`: The core multi-step form component.
  - `components/TableWrapper.tsx`: Component for displaying the list of requests.

### 2. Backend (`be-rar`)

The backend is a lightweight, scalable Node.js API server built with TypeScript.

- **Framework:** **Express.js 5**
- **Language:** **TypeScript** (compiled to JavaScript for production). `tsx` is used for development.
- **API & Routing:**
  - RESTful API structured into `routes`, `controllers`, and `validators`.
  - `routes/addRequest.ts`: Defines the `POST /api/request` endpoint.
  - `routes/getRequest.ts`: Defines the `GET /api/requests` endpoint (for the admin view).
- **Database & Model:**
  - **Mongoose:** The ODM used to connect to and interact with MongoDB Atlas.
  - `database/db.ts`: Handles the Mongoose connection logic.
  - `models/Request.ts`: Defines the Mongoose Schema for a "Risk Assessment Request".
- **Key Features & Logic:**
  - **PDF Generation:** **PDFKit** library (`utils/pdfGenerator.ts`) dynamically generates a PDF document based on submitted data.
  - **Server-Side Validation:** **Joi** (`validators/requestValidator.ts`) validates the incoming request body before processing.
- **Configuration:** **`dotenv`** manages environment variables (like DB connection strings) loaded via `config/index.ts`.

### 3. Database

- **Type:** **NoSQL**
- **Service:** **MongoDB Cloud Atlas**
- **Access:** The `be-rar` service connects to the cloud database via Mongoose using a connection string.

### 4. DevOps & Infrastructure

- **Containerization:**
  - **Docker:** Both frontend and backend have `Dockerfile`s based on `node:lts-alpine`.
  - **Docker Compose:** The `docker-compose.yml` file orchestrates both services (`rar-frontend` and `rar-backend`).
- **CI/CD Pipeline:**
  - **Jenkins:** The `Jenkinsfile` defines the automated build, test, and deployment pipeline.
