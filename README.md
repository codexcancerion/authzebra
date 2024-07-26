# AuthZebra

AuthZebra is a web application designed to provide secure and efficient authentication using QR codes. This document outlines the system design, technological stack, and deployment details for AuthZebra.

## Project Overview

AuthZebra is a web application designed to provide secure and efficient authentication using QR codes. This document outlines the system design, technological stack, and deployment details for AuthZebra.

## Functional Requirements

AuthZebra supports QR code-based authentication for account recovery, password updates, and account deletion. It also supports CRUD operations, allowing users to create, read, update, and delete their accounts.

## System Design

### Task Workflow

#### QR Code Generation

1. User creates an account including full name, email, username, and password.
2. The system generates a unique ID, Recovery Key, and unique Alternative Authentication Key (AAK) (encrypted user email and Recovery Key) for the user and saves it to the database.
3. The system generates the user’s QR Code based on the AAK and displays it on the user’s screen (user can download the QR code).

#### Account Recovery/Forgot Password

1. User enters their email for account recovery on the Forgot Password page.
2. User uploads the saved QR Code.
3. The system decrypts the AAK from the QR Code and retrieves the Email and Recovery Key (initially encrypted on the AAK).
4. The system matches the decrypted Recovery Key and the saved Recovery Key in the database based on the decrypted email.
5. If both Recovery Keys match, account recovery is successful, and the system proceeds to change the password.
6. If not, account recovery fails, and the system redirects the user to another account recovery mechanism.

## Technology Stack

AuthZebra utilizes a modern technology stack to ensure a seamless, secure, and responsive user experience across various devices. Below is a detailed description of each component in the technology stack:

- **Next.js**: A React framework that provides hybrid static and server rendering, TypeScript support, smart bundling, route pre-fetching, and more. It is used as the main framework to build the app, enabling both client-side and server-side rendering for optimized performance.
- **React.js**: A JavaScript library for building user interfaces, primarily for single-page applications where you can create complex UIs from small and isolated pieces of code called "components." Utilized for building reusable and efficient UI components, enhancing the interactivity and user experience of the app.
- **Tailwind CSS**: A utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup. Used for styling the application, providing a highly customizable and responsive design system without the need for writing custom CSS.
- **MongoDB**: A NoSQL database known for its high performance, high availability, and easy scalability. Serves as the primary database for storing user information, including account details, recovery keys, and encrypted authentication keys.
- **bcrypt**: A password-hashing function designed to be computationally expensive to increase the cost of brute-force attacks. Used for hashing user passwords before storing them in the database, enhancing security by protecting passwords from being easily compromised.
- **lunaris cipher**: An original encryption method (specifics of which are proprietary or custom-developed for this project). Provides an additional layer of security by encrypting sensitive data such as the Recovery Key and Alternative Authentication Key (AAK).
  - Visit at [lunariscipher.vercel.app](https://lunariscipher.vercel.app)
- **react-zxing**: A React wrapper for the ZXing library, a popular barcode image processing library implemented in Java. Used to implement QR code generation and scanning functionalities, allowing users to authenticate using QR codes for various operations such as account recovery and password updates.

## Deployment

### Vercel

Vercel is a cloud platform for static sites and serverless functions that fits perfectly with Next.js, enabling developers to host their web applications easily. Chosen for deploying the AuthZebra application, providing seamless integration with Next.js for optimal performance, scalability, and ease of deployment.

## How to Test AuthZebra

To test the AuthZebra application, follow these steps:

### Step-by-Step Testing

1. **Visit the Application**

    Open [https://authzebra.vercel.app](https://authzebra.vercel.app) in your web browser.

2. **Create an Account**

    - Navigate to the sign-up page by clicking the "Sign Up" button on the home page.
    - Fill in your full name, email, username, and password.
    - Submit the form to create an account.
    - Download the generated QR Code displayed on the screen.

3. **Download QR Code**

    - Log in using your credentials
    - If login is successfull, you will see your Alternative Authentication QR Code which you may download for Account Recovery.

3. **Test QR Code Authentication**

    - First, go to profile and logout
    - Go to the login page by clicking the "Login" button on the home page.
    - Go to the Forgot Password page.
    - Enter your email and upload the saved QR Code.
    - Verify if the system correctly recovers your account and allows you to update your password.

4. **Explore CRUD Operations**

    - Once logged in, test the account management features.
    - Create, read, update, and delete account information to ensure all functionalities work properly.

5. **Logout and Login Again**

    - Logout from your account using the logout button.
    - Try logging in again using your credentials to ensure that the login functionality works as expected.

---

© {new Date().getFullYear()} AuthZebra. All rights reserved.
