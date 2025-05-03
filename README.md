# Doctor Consultation Platform

[Live Demo](https://doctorlist-nu.vercel.app/)

This is a [Next.js](https://nextjs.org) project for a doctor consultation platform that allows users to find and connect with healthcare providers. The application supports filtering doctors by experience, fees, languages, and consultation modes.

## Features

- Search and filter doctors by various criteria
- View doctor profiles with detailed information
- Choose between online consultation and hospital visits
- Responsive design for all device sizes
- MongoDB integration for doctor data storage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Project Structure

- `src/app`: Contains the main application pages and API routes
- `src/components`: Reusable UI components like Navbar, Doctorlist, and filters
- `src/lib`: Database configuration and schemas

## API Endpoints

- `GET /api/filter`: Filter doctors based on various criteria
- `POST /api/doctor`: Add new doctor(s) to the database

## MongoDB Schema

The application uses MongoDB for storing doctor information with the following schema:
- Personal details (name, title, specialization)
- Professional information (experience, education, fees)
- Location and clinic details
- Consultation options (online/in-person)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
