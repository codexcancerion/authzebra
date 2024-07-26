"use client";

import Link from "next/link";

export default function Documentation() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900">AuthZebra Documentation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <section id="project-overview" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Project Overview</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            AuthZebra is a web application designed to provide secure and efficient authentication using QR codes. This document outlines the system design, technological stack, and deployment details for AuthZebra.
          </p>
        </section>

        <section id="functional-requirements" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Functional Requirements</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            AuthZebra supports QR code-based authentication for account recovery, password updates, and account deletion. It also supports CRUD operations, allowing users to create, read, update, and delete their accounts.
          </p>
        </section>

        <section id="system-design" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">System Design</h2>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Task Workflow</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">QR Code Generation</h4>
              <ul className="list-decimal list-inside pl-4 space-y-2 text-gray-700">
                <li>User creates an account including full name, email, username, and password.</li>
                <li>The system generates a unique ID, Recovery Key, and unique Alternative Authentication Key (AAK) (encrypted user email and Recovery Key) for the user and saves it to the database.</li>
                <li>The system generates the user&apos;s QR Code based on the AAK and displays it on the user&apos;s screen (user can download the QR code).</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Account Recovery/Forgot Password</h4>
              <ul className="list-decimal list-inside pl-4 space-y-2 text-gray-700">
                <li>User enters their email for account recovery on the Forgot Password page.</li>
                <li>User uploads the saved QR Code.</li>
                <li>The system decrypts the AAK from the QR Code and retrieves the Email and Recovery Key (initially encrypted on the AAK).</li>
                <li>The system matches the decrypted Recovery Key and the saved Recovery Key in the database based on the decrypted email.</li>
                <li>If both Recovery Keys match, account recovery is successful, and the system proceeds to change the password.</li>
                <li>If not, account recovery fails, and the system redirects the user to another account recovery mechanism.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="technology-stack" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Technology Stack</h2>
          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            AuthZebra utilizes a modern technology stack to ensure a seamless, secure, and responsive user experience across various devices. Below is a detailed description of each component in the technology stack:
          </p>
          <ul className="list-disc list-inside space-y-4 mt-4 text-gray-700">
            <li>
              <strong>Next.js</strong>
              <p>Next.js is a React framework that provides hybrid static and server rendering, TypeScript support, smart bundling, route pre-fetching, and more. It is used as the main framework to build the app, enabling both client-side and server-side rendering for optimized performance.</p>
            </li>
            <li>
              <strong>React.js</strong>
              <p>React is a JavaScript library for building user interfaces, primarily for single-page applications where you can create complex UIs from small and isolated pieces of code called &quot;components.&quot; Utilized for building reusable and efficient UI components, enhancing the interactivity and user experience of the app.</p>
            </li>
            <li>
              <strong>Tailwind CSS</strong>
              <p>Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup. Used for styling the application, providing a highly customizable and responsive design system without the need for writing custom CSS.</p>
            </li>
            <li>
              <strong>MongoDB</strong>
              <p>MongoDB is a NoSQL database known for its high performance, high availability, and easy scalability. Serves as the primary database for storing user information, including account details, recovery keys, and encrypted authentication keys.</p>
            </li>
            <li>
              <strong>bcrypt</strong>
              <p>bcrypt is a password-hashing function designed to be computationally expensive to increase the cost of brute-force attacks. Used for hashing user passwords before storing them in the database, enhancing security by protecting passwords from being easily compromised.</p>
            </li>
            <li>
              <strong>lunaris cipher</strong>
              <p>An original encryption method (specifics of which are proprietary or custom-developed for this project). Provides an additional layer of security by encrypting sensitive data such as the Recovery Key and Alternative Authentication Key (AAK).</p>
              <p>Visit at <Link href="https://lunariscipher.vercel.app" className="text-blue-500">lunariscipher.vercel.app</Link>.</p>
            </li>
            <li>
              <strong>react-zxing</strong>
              <p>react-zxing is a React wrapper for the ZXing library, a popular barcode image processing library implemented in Java. Used to implement QR code generation and scanning functionalities, allowing users to authenticate using QR codes for various operations such as account recovery and password updates.</p>
            </li>
          </ul>
        </section>

        <section id="deployment" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Deployment</h2>
          <p className="text-lg leading-relaxed mb-4 text-gray-700"><strong>Vercel</strong></p>
          <p className="text-gray-700">Vercel is a cloud platform for static sites and serverless functions that fits perfectly with Next.js, enabling developers to host their web applications easily. Chosen for deploying the AuthZebra application, providing seamless integration with Next.js for optimal performance, scalability, and ease of deployment.</p>
        </section>

        <section id="how-to-test" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">How to Test AuthZebra</h2>
          <p className="text-lg leading-relaxed mb-8 text-gray-700">To test the AuthZebra application, follow these steps:</p>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Step-by-Step Testing</h3>
          <ol className="list-decimal list-inside pl-4 space-y-2 text-gray-700">
            <li>
              <strong>Visit the Application</strong>
              <p>Open <a href="https://authzebra.vercel.app" className="text-blue-500">https://authzebra.vercel.app</a> in your web browser.</p>
            </li>
            <li>
              <strong>Create an Account</strong>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>Navigate to the sign-up page by clicking the "Sign Up" button on the home page.</li>
                <li>Fill in your full name, email, username, and password.</li>
                <li>Submit the form to create an account.</li>
                <li>Download the generated QR Code displayed on the screen.</li>
              </ul>
            </li>
            <li>
              <strong>Download QR Code</strong>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>Log in using your credentials.</li>
                <li>If login is successful, you will see your Alternative Authentication QR Code which you may download for Account Recovery.</li>
              </ul>
            </li>
            <li>
              <strong>Test QR Code Authentication</strong>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>First, go to profile and logout.</li>
                <li>Go to the login page by clicking the "Login" button on the home page.</li>
                <li>Go to the Forgot Password page.</li>
                <li>Enter your email and upload the saved QR Code.</li>
                <li>Verify if the system correctly recovers your account and allows you to update your password.</li>
              </ul>
            </li>
            <li>
              <strong>Explore CRUD Operations</strong>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>Once logged in, test the account management features.</li>
                <li>Create, read, update, and delete account information to ensure all functionalities work properly.</li>
              </ul>
            </li>
            <li>
              <strong>Logout and Login Again</strong>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>Logout from your account using the logout button.</li>
                <li>Try logging in again using your credentials to ensure that the login functionality works as expected.</li>
              </ul>
            </li>
          </ol>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-8 border-t pt-4">
          © {new Date().getFullYear()} AuthZebra. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
