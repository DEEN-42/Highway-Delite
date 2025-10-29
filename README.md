# Highway Delite - Experience Booking Platform

![Highway Delite Logo](./project/public/HD-Logo.png)

A full-stack web application for booking adventure and travel experiences. Built with Next.js 13, React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Key Features Implementation](#key-features-implementation)

## ✨ Features

### User Features
- 🔍 **Search Experiences** - Real-time search functionality to filter experiences by title
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🎫 **Experience Booking** - Complete booking flow with date and time selection
- 💰 **Promo Code System** - Apply discount codes with validation
- 📧 **Email Confirmation** - Booking confirmation with unique reference ID
- 🎨 **Modern UI** - Clean, intuitive interface with Shadcn UI components

### Admin Features
- 📊 **Experience Management** - CRUD operations for experiences
- 🎟️ **Promo Code Management** - Create and manage discount codes
- 📅 **Slot Management** - Dynamic slot booking with race condition protection
- 📈 **Booking Analytics** - View all bookings with status filters

### Technical Features
- ⚡ **Real-time Updates** - React Context for state management
- 🔒 **Race Condition Protection** - Atomic MongoDB operations for bookings
- 🎯 **Type Safety** - Full TypeScript implementation
- 🔐 **Data Validation** - Comprehensive validation on both client and server
- 🚀 **Performance Optimized** - Next.js SSR and image optimization

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 13.5.11 (App Router)
- **Language:** TypeScript 5.2.2
- **Styling:** Tailwind CSS 3.3.3
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React
- **State Management:** React Context API
- **Form Handling:** React Hook Form with Zod validation

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Database:** MongoDB with Mongoose 8.16.1
- **Authentication:** MongoDB Atlas compatible
- **API Architecture:** RESTful API

### DevOps & Tools
- **Package Manager:** npm
- **Version Control:** Git
- **Development:** Nodemon (hot reload)
- **Environment:** dotenv

## 📁 Project Structure

```
HDWeb/
├── backend/                    # Node.js Express API
│   ├── controllers/           # Business logic
│   │   ├── bookingController.js
│   │   ├── experienceController.js
│   │   └── promoController.js
│   ├── model/                 # Mongoose schemas
│   │   ├── Booking.js
│   │   ├── Experience.js
│   │   └── PromoCode.js
│   ├── routes/                # API routes
│   │   ├── bookingRoutes.js
│   │   ├── experienceRoutes.js
│   │   └── promoRoutes.js
│   ├── db.js                  # MongoDB connection
│   ├── index.js               # Server entry point
│   ├── seed.js                # Database seeding script
│   └── package.json
│
├── project/                    # Next.js Frontend
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # Home (experience listing)
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── experience/[id]/   # Experience details
│   │   ├── booking/[id]/      # Booking checkout
│   │   └── confirmation/      # Booking confirmation
│   ├── components/            # React components
│   │   ├── header/
│   │   │   └── Search.tsx     # Search header component
│   │   └── ui/                # Shadcn UI components
│   ├── context/               # React Context
│   │   └── BookingContext.tsx # Booking state management
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── public/                # Static assets
│   └── package.json
│
└── README.md                   # This file
```

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB Atlas Account** or local MongoDB installation
- **Git** (for version control)

## 🚀 Installation

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

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=3030
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```

### Frontend (.env.local)

Create a `.env.local` file in the `project` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3030
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:3030`

### Start Frontend Development Server

```bash
cd project
npm run dev
```

Frontend will run on: `http://localhost:3000`

### Seed Database (Optional)

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- 8 sample experiences
- 4 promo codes (SAVE10, SAVE20, FIRST50, LIMIT3)

## 📚 API Documentation

### Base URL
```
http://localhost:3030/api
```

### Experiences Endpoints

#### Get All Experiences
```http
GET /experiences
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [...]
}
```

#### Get Experience by ID
```http
GET /experiences/:id
```

### Bookings Endpoints

#### Create Booking
```http
POST /bookings
```

**Request Body:**
```json
{
  "experienceId": "string",
  "customerName": "string",
  "customerEmail": "string",
  "bookingDate": "string",
  "bookingTime": "string",
  "quantity": number,
  "subtotal": number,
  "taxes": number,
  "total": number,
  "promoCode": "string (optional)",
  "agreedToTerms": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "referenceId": "ABC12345",
    "experienceName": "Sky Diving",
    ...
  }
}
```

#### Get Booking by Reference ID
```http
GET /bookings/reference/:referenceId
```

#### Get Bookings by Email
```http
GET /bookings/email/:email
```

### Promo Code Endpoints

#### Validate Promo Code
```http
POST /promo/validate
```

**Request Body:**
```json
{
  "code": "SAVE10",
  "orderAmount": 1000
}
```

**Response:**
```json
{
  "success": true,
  "valid": true,
  "discount": 100,
  "message": "Promo code applied: 10% off"
}
```

## 🗄️ Database Schema

### Experience Model
```javascript
{
  title: String,
  description: String,
  location: String,
  price: Number,
  image: String,
  availableDates: [{
    date: String,
    times: [{
      time: String,
      totalSlots: Number,
      bookedSlots: Number
    }]
  }]
}
```

### Booking Model
```javascript
{
  referenceId: String (auto-generated, 8 chars),
  experienceId: ObjectId,
  experienceName: String,
  customerName: String,
  customerEmail: String,
  bookingDate: String,
  bookingTime: String,
  quantity: Number,
  subtotal: Number,
  taxes: Number,
  discount: Number,
  total: Number,
  promoCode: String,
  status: String (pending/confirmed/cancelled/completed),
  agreedToTerms: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### PromoCode Model
```javascript
{
  code: String (unique, uppercase),
  discountType: String (percentage/fixed),
  discountValue: Number,
  minOrderValue: Number,
  maxUses: Number,
  usedCount: Number,
  isActive: Boolean,
  validFrom: Date,
  validTo: Date
}
```

## 🎨 Frontend Architecture

### Pages

1. **Home Page** (`/`)
   - Displays all available experiences
   - Search functionality by title
   - Real-time filtering
   - Responsive grid layout

2. **Experience Details** (`/experience/[id]`)
   - Detailed experience information
   - Date and time selection
   - Quantity selector
   - Price calculation with taxes
   - Stores booking data in context

3. **Booking Checkout** (`/booking/[id]`)
   - Customer information form
   - Promo code validation
   - Booking summary
   - Terms and conditions
   - Payment confirmation

4. **Confirmation Page** (`/confirmation`)
   - Booking success message
   - Unique reference ID display
   - Clean URL (no query parameters)

### State Management

**BookingContext** provides:
- `bookingData` - Current booking information
- `confirmationData` - Confirmation details
- `isConfirmationReady` - Flag for confirmation state
- Methods: `setBookingData`, `clearBookingData`, `setConfirmationData`, `clearConfirmationData`

### Component Structure

- **Reusable Components:**
  - Search header with functional/non-functional modes
  - Shadcn UI components for consistent design
  - Loading overlays for async operations

## 🔧 Backend Architecture

### Controllers

1. **Experience Controller**
   - CRUD operations for experiences
   - Slot availability checking
   - Date and time management

2. **Booking Controller**
   - Create booking with validation
   - Atomic slot booking (race condition safe)
   - Promo code integration
   - Booking rollback on failure
   - Query bookings by reference ID or email

3. **Promo Controller**
   - Validate promo codes
   - Atomic usage increment
   - Auto-deactivation when limit reached
   - Admin CRUD operations

### Key Features Implementation

#### Race Condition Protection

**Slot Booking:**
```javascript
// MongoDB Atlas compatible atomic operation
const maxAllowedBooked = totalSlots - quantity;
const result = await ExperienceModel.findOneAndUpdate(
  {
    _id: this._id,
    [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: 
      { $lte: maxAllowedBooked }
  },
  {
    $inc: {
      [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: quantity
    }
  },
  { new: true }
);
```

**Promo Code Usage:**
```javascript
// Atomic increment with auto-deactivation
const updatedPromo = await PromoCode.findOneAndUpdate(
  {
    _id: this._id,
    usedCount: { $lt: this.maxUses }
  },
  {
    $inc: { usedCount: 1 },
    $set: { isActive: this.usedCount + 1 >= this.maxUses ? false : true }
  },
  { new: true }
);
```

#### Error Handling & Rollback

If promo code increment fails after booking creation:
```javascript
// Rollback: Delete booking and release slots
await Booking.findByIdAndDelete(booking._id);
await experience.releaseSlots(bookingDate, bookingTime, quantity);
```

## 🎯 Key Features Implementation

### 1. Search Functionality
- Real-time filtering as user types
- Case-insensitive partial matching
- Result count display
- Empty state handling

### 2. Booking Flow
- Multi-step process with data persistence
- Context-based state management
- Clean URLs without query parameters
- Loading states for async operations

### 3. Promo Code System
- Validation before booking
- Auto-deactivation at usage limit
- Preview discount before applying
- Atomic operations prevent over-usage

### 4. Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Consistent spacing and typography
- Accessible UI components

## 🐛 Troubleshooting

### MongoDB Atlas Connection Issues
If you get connection errors:
1. Check your IP is whitelisted in MongoDB Atlas
2. Verify MONGO_URI format is correct
3. Ensure network allows outbound connections on port 27017

### CORS Issues
If frontend can't connect to backend:
1. Ensure CORS is enabled in backend
2. Verify API_URL in frontend .env.local
3. Check both servers are running

### Build Errors
If you encounter build errors:
```bash
# Clear Next.js cache
cd project
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## � Repository

**GitHub:** [https://github.com/DEEN-42/Highway-Delite](https://github.com/DEEN-42/Highway-Delite)

## �📝 License

This project is proprietary and confidential.

## 👨‍💻 Authors

- **Highway Delite Team**
- **GitHub:** [@DEEN-42](https://github.com/DEEN-42)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI components
- MongoDB team for the robust database
- Vercel for deployment capabilities

---

**Built with ❤️ by Highway Delite Team**
#   H i g h w a y - D e l i t e  
 