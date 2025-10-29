# Highway Delite - Experience Booking Platform

A full-stack web application for booking adventure and travel experiences. Built with Next.js 13, React, Node.js, Express, and MongoDB.

## Features

### User Features
- Real-time search functionality to filter experiences by title
- Mobile-first responsive design with Tailwind CSS
- Complete booking flow with date and time selection
- Promo code system with validation
- Booking confirmation with unique reference ID
- Clean, intuitive interface with Shadcn UI components

### Admin Features
- CRUD operations for experiences
- Create and manage discount codes
- Dynamic slot booking with race condition protection
- View all bookings with status filters

### Technical Features
- React Context for state management
- Atomic MongoDB operations for bookings
- Full TypeScript implementation
- Comprehensive validation on both client and server
- Next.js SSR and image optimization

## Tech Stack

### Frontend
- **Framework:** Next.js 13.5.11 (App Router)
- **Language:** TypeScript 5.2.2
- **Styling:** Tailwind CSS 3.3.3
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React
- **State Management:** React Context API

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Database:** MongoDB with Mongoose 8.16.1
- **API Architecture:** RESTful API

## Prerequisites

Before running this application, ensure you have:
- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB Atlas Account or local MongoDB installation
- Git (for version control)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/DEEN-42/Highway-Delite.git
cd Highway-Delite
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../project
npm install
```

## Environment Variables

### Backend (.env)
Create a .env file in the ackend directory:
```
PORT=3030
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```

### Frontend (.env.local)
Create a .env.local file in the project directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3030
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:3030

### Start Frontend Development Server
```bash
cd project
npm run dev
```
Frontend will run on: http://localhost:3000

### Seed Database (Optional)
```bash
cd backend
npm run seed
```
This will create 8 sample experiences and 4 promo codes (SAVE10, SAVE20, FIRST50, LIMIT3)

## API Documentation

### Base URL
```
http://localhost:3030/api
```

### Key Endpoints

#### Experiences
- GET /experiences - Get all experiences
- GET /experiences/:id - Get experience by ID

#### Bookings
- POST /bookings - Create a new booking
- GET /bookings/reference/:referenceId - Get booking by reference ID
- GET /bookings/email/:email - Get bookings by email

#### Promo Codes
- POST /promo/validate - Validate promo code

## Project Structure

```
HDWeb/
 backend/
    controllers/
    model/
    routes/
    db.js
    index.js
    seed.js
 project/
    app/
    components/
    context/
    hooks/
    lib/
 README.md
```

## Key Features Implementation

### Race Condition Protection
Uses atomic MongoDB operations to prevent overbooking and promo code over-usage.

### Search Functionality
Real-time filtering with case-insensitive partial matching.

### Booking Flow
Multi-step process with context-based state management and clean URLs.

### Promo Code System
Validation before booking with auto-deactivation at usage limit.

## Troubleshooting

### MongoDB Atlas Connection Issues
1. Check your IP is whitelisted in MongoDB Atlas
2. Verify MONGO_URI format is correct
3. Ensure network allows outbound connections on port 27017

### CORS Issues
1. Ensure CORS is enabled in backend
2. Verify API_URL in frontend .env.local
3. Check both servers are running

### Build Errors
```bash
cd project
rm -rf .next
rm -rf node_modules package-lock.json
npm install
```

## Repository

**GitHub:** https://github.com/DEEN-42/Highway-Delite

## License

This project is proprietary and confidential.

## Authors

- Highway Delite Team
- GitHub: @DEEN-42

---

Built with love by Highway Delite Team
