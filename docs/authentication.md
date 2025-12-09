# Authentication & Access Control

## Overview

The application currently operates on a **Waitlist Access** model. Instead of immediate public registration, users sign up via a waitlist form to request access. This allows for controlled onboarding and demand validation before opening full user accounts.

## Current Architecture

### 1. The Waitlist Flow

The authentication/onboarding flow consists of the following steps:

1.  **User Entry**: The user submits their email (and optionally name/plan) via the UI component (`DpWaitlistForm`).
2.  **API Request**: The frontend sends a `POST` request to the server endpoint `/api/waitlist`.
3.  **Server-Side Validation**:
    * The request is intercepted by the Nuxt server handler.
    * **Zod** is used to validate the payload strictly (Email format, Name length).
4.  **Data Storage**:
    * **Development**: Data is stored in a local JSON file (`data/waitlist.json`).
    * **Production**: The architecture is ready to be connected to a database (SQLite via `better-sqlite3` or external providers like Supabase/PostgreSQL) as indicated in the API handlers.

### 2. Tech Stack & Security

The access system relies on the following core libraries defined in `package.json`:

* **zod**: Ensures strict runtime validation of all incoming user data to prevent injection and invalid states.
* **better-sqlite3**: Included in dependencies to support robust local database storage for user credentials and sessions in the future.
* **h3**: The underlying HTTP server (part of Nuxt) handles request parsing and error management.

## Prerequisites

To run the authentication/waitlist logic locally, ensure your environment meets these requirements:

### System Requirements
* **Node.js**: Version 18.x or higher (LTS recommended).
* **Package Manager**: npm, pnpm, or bun.

### Configuration
1.  **Dependencies**: Ensure all backend dependencies are installed.
    ```bash
    npm install
    ```
2.  **Environment Variables** (Future):
    * Currently, no `.env` keys are strictly required for the JSON-based waitlist.
    * For production database connection, typical keys (e.g., `DATABASE_URL`) will be required.

## Future Authentication Roadmap

The project structure is designed to support full authentication implementation. The recommended path for upgrading from Waitlist to Full Auth is:

1.  **Database Integration**: Connect `better-sqlite3` or an ORM (like Drizzle) to persist users.
2.  **Session Management**: Implement secure HTTP-only cookies for session tracking.
3.  **UI Updates**: Replace the Waitlist form with `Login` and `Register` components using the existing UI Kit (`DpInput`, `DpButton`).
