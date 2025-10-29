# Highway Delite - Experience Booking Platform# Highway Delite - Experience Booking Platform



![Highway Delite Logo](./project/public/HD-Logo.png)![Highway Delite Logo](./project/public/HD-Logo.png)



A full-stack web application for booking adventure and travel experiences. Built with Next.js 13, React, Node.js, Express, and MongoDB.A full-stack web application for booking adventure and travel experiences. Built with Next.js 13, React, Node.js, Express, and MongoDB.



## 📋 Table of Contents## 📋 Table of Contents



- [Features](#features)- [Features](#features)

- [Tech Stack](#tech-stack)- [Tech Stack](#tech-stack)

- [Project Structure](#project-structure)- [Project Structure](#project-structure)

- [Prerequisites](#prerequisites)- [Prerequisites](#prerequisites)

- [Installation](#installation)- [Installation](#installation)

- [Environment Variables](#environment-variables)- [Environment Variables](#environment-variables)

- [Running the Application](#running-the-application)- [Running the Application](#running-the-application)

- [API Documentation](#api-documentation)- [API Documentation](#api-documentation)

- [Database Schema](#database-schema)- [Database Schema](#database-schema)

- [Frontend Architecture](#frontend-architecture)- [Frontend Architecture](#frontend-architecture)

- [Backend Architecture](#backend-architecture)- [Backend Architecture](#backend-architecture)

- [Key Features Implementation](#key-features-implementation)- [Key Features Implementation](#key-features-implementation)

- [Troubleshooting](#troubleshooting)

## ✨ Features

## ✨ Features

### User Features

### User Features- 🔍 **Search Experiences** - Real-time search functionality to filter experiences by title

- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS

- 🔍 **Search Experiences** - Real-time search functionality to filter experiences by title- 🎫 **Experience Booking** - Complete booking flow with date and time selection

- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS- 💰 **Promo Code System** - Apply discount codes with validation

- 🎫 **Experience Booking** - Complete booking flow with date and time selection- 📧 **Email Confirmation** - Booking confirmation with unique reference ID

- 💰 **Promo Code System** - Apply discount codes with validation- 🎨 **Modern UI** - Clean, intuitive interface with Shadcn UI components

- 📧 **Email Confirmation** - Booking confirmation with unique reference ID

- 🎨 **Modern UI** - Clean, intuitive interface with Shadcn UI components### Admin Features

- 📊 **Experience Management** - CRUD operations for experiences

### Admin Features- 🎟️ **Promo Code Management** - Create and manage discount codes

- 📅 **Slot Management** - Dynamic slot booking with race condition protection

- 📊 **Experience Management** - CRUD operations for experiences- 📈 **Booking Analytics** - View all bookings with status filters

- 🎟️ **Promo Code Management** - Create and manage discount codes

- 📅 **Slot Management** - Dynamic slot booking with race condition protection### Technical Features

- 📈 **Booking Analytics** - View all bookings with status filters- ⚡ **Real-time Updates** - React Context for state management

- 🔒 **Race Condition Protection** - Atomic MongoDB operations for bookings

### Technical Features- 🎯 **Type Safety** - Full TypeScript implementation

- 🔐 **Data Validation** - Comprehensive validation on both client and server

- ⚡ **Real-time Updates** - React Context for state management- 🚀 **Performance Optimized** - Next.js SSR and image optimization

- 🔒 **Race Condition Protection** - Atomic MongoDB operations for bookings

- 🎯 **Type Safety** - Full TypeScript implementation## 🛠️ Tech Stack

- 🔐 **Data Validation** - Comprehensive validation on both client and server

- 🚀 **Performance Optimized** - Next.js SSR and image optimization### Frontend

- **Framework:** Next.js 13.5.11 (App Router)

## 🛠️ Tech Stack- **Language:** TypeScript 5.2.2

- **Styling:** Tailwind CSS 3.3.3

### Frontend- **UI Components:** Shadcn UI (Radix UI primitives)

- **Icons:** Lucide React

- **Framework:** Next.js 13.5.11 (App Router)- **State Management:** React Context API

- **Language:** TypeScript 5.2.2- **Form Handling:** React Hook Form with Zod validation

- **Styling:** Tailwind CSS 3.3.3

- **UI Components:** Shadcn UI (Radix UI primitives)### Backend

- **Icons:** Lucide React- **Runtime:** Node.js

- **State Management:** React Context API- **Framework:** Express 5.1.0

- **Form Handling:** React Hook Form with Zod validation- **Database:** MongoDB with Mongoose 8.16.1

- **Authentication:** MongoDB Atlas compatible

### Backend- **API Architecture:** RESTful API



- **Runtime:** Node.js### DevOps & Tools

- **Framework:** Express 5.1.0- **Package Manager:** npm

- **Database:** MongoDB with Mongoose 8.16.1- **Version Control:** Git

- **Authentication:** MongoDB Atlas compatible- **Development:** Nodemon (hot reload)

- **API Architecture:** RESTful API- **Environment:** dotenv



### DevOps & Tools## 📁 Project Structure



- **Package Manager:** npm```

- **Version Control:** GitHDWeb/

- **Development:** Nodemon (hot reload)├── backend/                    # Node.js Express API

- **Environment:** dotenv│   ├── controllers/           # Business logic

│   │   ├── bookingController.js

## 📁 Project Structure│   │   ├── experienceController.js

│   │   └── promoController.js

```│   ├── model/                 # Mongoose schemas

HDWeb/│   │   ├── Booking.js

├── backend/                    # Node.js Express API│   │   ├── Experience.js

│   ├── controllers/           # Business logic│   │   └── PromoCode.js

│   │   ├── bookingController.js│   ├── routes/                # API routes

│   │   ├── experienceController.js│   │   ├── bookingRoutes.js

│   │   └── promoController.js│   │   ├── experienceRoutes.js

│   ├── model/                 # Mongoose schemas│   │   └── promoRoutes.js

│   │   ├── Booking.js│   ├── db.js                  # MongoDB connection

│   │   ├── Experience.js│   ├── index.js               # Server entry point

│   │   └── PromoCode.js│   ├── seed.js                # Database seeding script

│   ├── routes/                # API routes│   └── package.json

│   │   ├── bookingRoutes.js│

│   │   ├── experienceRoutes.js├── project/                    # Next.js Frontend

│   │   └── promoRoutes.js│   ├── app/                   # App Router pages

│   ├── db.js                  # MongoDB connection│   │   ├── page.tsx           # Home (experience listing)

│   ├── index.js               # Server entry point│   │   ├── layout.tsx         # Root layout

│   ├── seed.js                # Database seeding script│   │   ├── globals.css        # Global styles

│   └── package.json│   │   ├── experience/[id]/   # Experience details

││   │   ├── booking/[id]/      # Booking checkout

├── project/                    # Next.js Frontend│   │   └── confirmation/      # Booking confirmation

│   ├── app/                   # App Router pages│   ├── components/            # React components

│   │   ├── page.tsx           # Home (experience listing)│   │   ├── header/

│   │   ├── layout.tsx         # Root layout│   │   │   └── Search.tsx     # Search header component

│   │   ├── globals.css        # Global styles│   │   └── ui/                # Shadcn UI components

│   │   ├── experience/[id]/   # Experience details│   ├── context/               # React Context

│   │   ├── booking/[id]/      # Booking checkout│   │   └── BookingContext.tsx # Booking state management

│   │   └── confirmation/      # Booking confirmation│   ├── hooks/                 # Custom React hooks

│   ├── components/            # React components│   ├── lib/                   # Utility functions

│   │   ├── header/│   ├── public/                # Static assets

│   │   │   └── Search.tsx     # Search header component│   └── package.json

│   │   └── ui/                # Shadcn UI components│

│   ├── context/               # React Context└── README.md                   # This file

│   │   └── BookingContext.tsx # Booking state management```

│   ├── hooks/                 # Custom React hooks

│   ├── lib/                   # Utility functions## 📦 Prerequisites

│   ├── public/                # Static assets

│   └── package.jsonBefore running this application, ensure you have:

│

└── README.md                   # This file- **Node.js** (v16 or higher)

```- **npm** (v7 or higher)

- **MongoDB Atlas Account** or local MongoDB installation

## 📦 Prerequisites- **Git** (for version control)



Before running this application, ensure you have:## 🚀 Installation



- **Node.js** (v16 or higher)### 1. Clone the Repository

- **npm** (v7 or higher)

- **MongoDB Atlas Account** or local MongoDB installation```bash

- **Git** (for version control)git clone https://github.com/DEEN-42/Highway-Delite.git

cd Highway-Delite

## 🚀 Installation```



### 1. Clone the Repository### 2. Install Backend Dependencies



```bash```bash

git clone https://github.com/DEEN-42/Highway-Delite.gitcd backend

cd Highway-Delitenpm install

``````



### 2. Install Backend Dependencies### 3. Install Frontend Dependencies



```bash```bash

cd backendcd ../project

npm installnpm install

``````



### 3. Install Frontend Dependencies## 🔐 Environment Variables



```bash### Backend (.env)

cd ../project

npm installCreate a `.env` file in the `backend` directory:

```

```env

## 🔐 Environment VariablesPORT=3030

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

### Backend (.env)```



Create a `.env` file in the `backend` directory:### Frontend (.env.local)



```envCreate a `.env.local` file in the `project` directory:

PORT=3030

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority```env

```NEXT_PUBLIC_API_URL=http://localhost:3030

```

### Frontend (.env.local)

## 🏃 Running the Application

Create a `.env.local` file in the `project` directory:

### Start Backend Server

```env

NEXT_PUBLIC_API_URL=http://localhost:3030```bash

```cd backend

npm run dev

## 🏃 Running the Application```



### Start Backend ServerBackend will run on: `http://localhost:3030`



```bash### Start Frontend Development Server

cd backend

npm run dev```bash

```cd project

npm run dev

Backend will run on: `http://localhost:3030````



### Start Frontend Development ServerFrontend will run on: `http://localhost:3000`



```bash### Seed Database (Optional)

cd project

npm run devTo populate the database with sample data:

```

```bash

Frontend will run on: `http://localhost:3000`cd backend

npm run seed

### Seed Database (Optional)```



To populate the database with sample data:This will create:

- 8 sample experiences

```bash- 4 promo codes (SAVE10, SAVE20, FIRST50, LIMIT3)

cd backend

npm run seed## 📚 API Documentation

```

### Base URL

This will create:```

- 8 sample experienceshttp://localhost:3030/api

- 4 promo codes (SAVE10, SAVE20, FIRST50, LIMIT3)```



## 📚 API Documentation### Experiences Endpoints



### Base URL#### Get All Experiences

```http

```GET /experiences

http://localhost:3030/api```

```

**Response:**

### Experiences Endpoints```json

{

#### Get All Experiences  "success": true,

  "count": 8,

```http  "data": [...]

GET /experiences}

``````



**Response:**#### Get Experience by ID

```http

```jsonGET /experiences/:id

{```

  "success": true,

  "count": 8,### Bookings Endpoints

  "data": [...]

}#### Create Booking

``````http

POST /bookings

#### Get Experience by ID```



```http**Request Body:**

GET /experiences/:id```json

```{

  "experienceId": "string",

### Bookings Endpoints  "customerName": "string",

  "customerEmail": "string",

#### Create Booking  "bookingDate": "string",

  "bookingTime": "string",

```http  "quantity": number,

POST /bookings  "subtotal": number,

```  "taxes": number,

  "total": number,

**Request Body:**  "promoCode": "string (optional)",

  "agreedToTerms": true

```json}

{```

  "experienceId": "string",

  "customerName": "string",**Response:**

  "customerEmail": "string",```json

  "bookingDate": "string",{

  "bookingTime": "string",  "success": true,

  "quantity": 1,  "message": "Booking created successfully",

  "subtotal": 1000,  "data": {

  "taxes": 60,    "referenceId": "ABC12345",

  "total": 1060,    "experienceName": "Sky Diving",

  "promoCode": "SAVE10",    ...

  "agreedToTerms": true  }

}}

``````



**Response:**#### Get Booking by Reference ID

```http

```jsonGET /bookings/reference/:referenceId

{```

  "success": true,

  "message": "Booking created successfully",#### Get Bookings by Email

  "data": {```http

    "referenceId": "ABC12345",GET /bookings/email/:email

    "experienceName": "Sky Diving",```

    "bookingDate": "Oct 22",

    "bookingTime": "03:00 pm",### Promo Code Endpoints

    "quantity": 1,

    "total": 954#### Validate Promo Code

  }```http

}POST /promo/validate

``````



#### Get Booking by Reference ID**Request Body:**

```json

```http{

GET /bookings/reference/:referenceId  "code": "SAVE10",

```  "orderAmount": 1000

}

#### Get Bookings by Email```



```http**Response:**

GET /bookings/email/:email```json

```{

  "success": true,

### Promo Code Endpoints  "valid": true,

  "discount": 100,

#### Validate Promo Code  "message": "Promo code applied: 10% off"

}

```http```

POST /promo/validate

```## 🗄️ Database Schema



**Request Body:**### Experience Model

```javascript

```json{

{  title: String,

  "code": "SAVE10",  description: String,

  "orderAmount": 1000  location: String,

}  price: Number,

```  image: String,

  availableDates: [{

**Response:**    date: String,

    times: [{

```json      time: String,

{      totalSlots: Number,

  "success": true,      bookedSlots: Number

  "valid": true,    }]

  "discount": 100,  }]

  "message": "Promo code applied: 10% off"}

}```

```

### Booking Model

## 🗄️ Database Schema```javascript

{

### Experience Model  referenceId: String (auto-generated, 8 chars),

  experienceId: ObjectId,

```javascript  experienceName: String,

{  customerName: String,

  title: String,  customerEmail: String,

  description: String,  bookingDate: String,

  location: String,  bookingTime: String,

  price: Number,  quantity: Number,

  image: String,  subtotal: Number,

  availableDates: [{  taxes: Number,

    date: String,  discount: Number,

    times: [{  total: Number,

      time: String,  promoCode: String,

      totalSlots: Number,  status: String (pending/confirmed/cancelled/completed),

      bookedSlots: Number  agreedToTerms: Boolean,

    }]  createdAt: Date,

  }]  updatedAt: Date

}}

``````



### Booking Model### PromoCode Model

```javascript

```javascript{

{  code: String (unique, uppercase),

  referenceId: String,        // Auto-generated, 8 characters  discountType: String (percentage/fixed),

  experienceId: ObjectId,  discountValue: Number,

  experienceName: String,  minOrderValue: Number,

  customerName: String,  maxUses: Number,

  customerEmail: String,  usedCount: Number,

  bookingDate: String,  isActive: Boolean,

  bookingTime: String,  validFrom: Date,

  quantity: Number,  validTo: Date

  subtotal: Number,}

  taxes: Number,```

  discount: Number,

  total: Number,## 🎨 Frontend Architecture

  promoCode: String,

  status: String,            // pending/confirmed/cancelled/completed### Pages

  agreedToTerms: Boolean,

  createdAt: Date,1. **Home Page** (`/`)

  updatedAt: Date   - Displays all available experiences

}   - Search functionality by title

```   - Real-time filtering

   - Responsive grid layout

### PromoCode Model

2. **Experience Details** (`/experience/[id]`)

```javascript   - Detailed experience information

{   - Date and time selection

  code: String,              // Unique, uppercase   - Quantity selector

  discountType: String,      // percentage/fixed   - Price calculation with taxes

  discountValue: Number,   - Stores booking data in context

  minOrderValue: Number,

  maxUses: Number,3. **Booking Checkout** (`/booking/[id]`)

  usedCount: Number,   - Customer information form

  isActive: Boolean,   - Promo code validation

  validFrom: Date,   - Booking summary

  validTo: Date   - Terms and conditions

}   - Payment confirmation

```

4. **Confirmation Page** (`/confirmation`)

## 🎨 Frontend Architecture   - Booking success message

   - Unique reference ID display

### Pages   - Clean URL (no query parameters)



**1. Home Page (`/`)**### State Management

- Displays all available experiences

- Search functionality by title**BookingContext** provides:

- Real-time filtering- `bookingData` - Current booking information

- Responsive grid layout- `confirmationData` - Confirmation details

- `isConfirmationReady` - Flag for confirmation state

**2. Experience Details (`/experience/[id]`)**- Methods: `setBookingData`, `clearBookingData`, `setConfirmationData`, `clearConfirmationData`

- Detailed experience information

- Date and time selection### Component Structure

- Quantity selector

- Price calculation with taxes- **Reusable Components:**

- Stores booking data in context  - Search header with functional/non-functional modes

  - Shadcn UI components for consistent design

**3. Booking Checkout (`/booking/[id]`)**  - Loading overlays for async operations

- Customer information form

- Promo code validation## 🔧 Backend Architecture

- Booking summary

- Terms and conditions### Controllers

- Payment confirmation

1. **Experience Controller**

**4. Confirmation Page (`/confirmation`)**   - CRUD operations for experiences

- Booking success message   - Slot availability checking

- Unique reference ID display   - Date and time management

- Clean URL (no query parameters)

2. **Booking Controller**

### State Management   - Create booking with validation

   - Atomic slot booking (race condition safe)

**BookingContext** provides:   - Promo code integration

- `bookingData` - Current booking information   - Booking rollback on failure

- `confirmationData` - Confirmation details   - Query bookings by reference ID or email

- `isConfirmationReady` - Flag for confirmation state

- Methods: `setBookingData`, `clearBookingData`, `setConfirmationData`, `clearConfirmationData`3. **Promo Controller**

   - Validate promo codes

### Component Structure   - Atomic usage increment

   - Auto-deactivation when limit reached

- **Reusable Components:**   - Admin CRUD operations

  - Search header with functional/non-functional modes

  - Shadcn UI components for consistent design### Key Features Implementation

  - Loading overlays for async operations

#### Race Condition Protection

## 🔧 Backend Architecture

**Slot Booking:**

### Controllers```javascript

// MongoDB Atlas compatible atomic operation

**1. Experience Controller**const maxAllowedBooked = totalSlots - quantity;

- CRUD operations for experiencesconst result = await ExperienceModel.findOneAndUpdate(

- Slot availability checking  {

- Date and time management    _id: this._id,

    [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: 

**2. Booking Controller**      { $lte: maxAllowedBooked }

- Create booking with validation  },

- Atomic slot booking (race condition safe)  {

- Promo code integration    $inc: {

- Booking rollback on failure      [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: quantity

- Query bookings by reference ID or email    }

  },

**3. Promo Controller**  { new: true }

- Validate promo codes);

- Atomic usage increment```

- Auto-deactivation when limit reached

- Admin CRUD operations**Promo Code Usage:**

```javascript

### Race Condition Protection// Atomic increment with auto-deactivation

const updatedPromo = await PromoCode.findOneAndUpdate(

**Slot Booking:**  {

    _id: this._id,

```javascript    usedCount: { $lt: this.maxUses }

// MongoDB Atlas compatible atomic operation  },

const maxAllowedBooked = totalSlots - quantity;  {

const result = await ExperienceModel.findOneAndUpdate(    $inc: { usedCount: 1 },

  {    $set: { isActive: this.usedCount + 1 >= this.maxUses ? false : true }

    _id: this._id,  },

    [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]:   { new: true }

      { $lte: maxAllowedBooked });

  },```

  {

    $inc: {#### Error Handling & Rollback

      [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: quantity

    }If promo code increment fails after booking creation:

  },```javascript

  { new: true }// Rollback: Delete booking and release slots

);await Booking.findByIdAndDelete(booking._id);

```await experience.releaseSlots(bookingDate, bookingTime, quantity);

```

**Promo Code Usage:**

## 🎯 Key Features Implementation

```javascript

// Atomic increment with auto-deactivation### 1. Search Functionality

const updatedPromo = await PromoCode.findOneAndUpdate(- Real-time filtering as user types

  {- Case-insensitive partial matching

    _id: this._id,- Result count display

    usedCount: { $lt: this.maxUses }- Empty state handling

  },

  {### 2. Booking Flow

    $inc: { usedCount: 1 },- Multi-step process with data persistence

    $set: { isActive: this.usedCount + 1 >= this.maxUses ? false : true }- Context-based state management

  },- Clean URLs without query parameters

  { new: true }- Loading states for async operations

);

```### 3. Promo Code System

- Validation before booking

### Error Handling & Rollback- Auto-deactivation at usage limit

- Preview discount before applying

If promo code increment fails after booking creation:- Atomic operations prevent over-usage



```javascript### 4. Responsive Design

// Rollback: Delete booking and release slots- Mobile-first approach

await Booking.findByIdAndDelete(booking._id);- Tailwind CSS utility classes

await experience.releaseSlots(bookingDate, bookingTime, quantity);- Consistent spacing and typography

```- Accessible UI components



## 🎯 Key Features Implementation## 🐛 Troubleshooting



### 1. Search Functionality### MongoDB Atlas Connection Issues

If you get connection errors:

- Real-time filtering as user types1. Check your IP is whitelisted in MongoDB Atlas

- Case-insensitive partial matching2. Verify MONGO_URI format is correct

- Result count display3. Ensure network allows outbound connections on port 27017

- Empty state handling

### CORS Issues

### 2. Booking FlowIf frontend can't connect to backend:

1. Ensure CORS is enabled in backend

- Multi-step process with data persistence2. Verify API_URL in frontend .env.local

- Context-based state management3. Check both servers are running

- Clean URLs without query parameters

- Loading states for async operations### Build Errors

If you encounter build errors:

### 3. Promo Code System```bash

# Clear Next.js cache

- Validation before bookingcd project

- Auto-deactivation at usage limitrm -rf .next

- Preview discount before applying

- Atomic operations prevent over-usage# Reinstall dependencies

rm -rf node_modules package-lock.json

### 4. Responsive Designnpm install

```

- Mobile-first approach

- Tailwind CSS utility classes## � Repository

- Consistent spacing and typography

- Accessible UI components**GitHub:** [https://github.com/DEEN-42/Highway-Delite](https://github.com/DEEN-42/Highway-Delite)



## 🐛 Troubleshooting## �📝 License



### MongoDB Atlas Connection IssuesThis project is proprietary and confidential.



If you get connection errors:## 👨‍💻 Authors

1. Check your IP is whitelisted in MongoDB Atlas

2. Verify MONGO_URI format is correct- **Highway Delite Team**

3. Ensure network allows outbound connections on port 27017- **GitHub:** [@DEEN-42](https://github.com/DEEN-42)



### CORS Issues## 🙏 Acknowledgments



If frontend can't connect to backend:- Next.js team for the amazing framework

1. Ensure CORS is enabled in backend- Shadcn for the beautiful UI components

2. Verify API_URL in frontend .env.local- MongoDB team for the robust database

3. Check both servers are running- Vercel for deployment capabilities



### Build Errors---



If you encounter build errors:**Built with ❤️ by Highway Delite Team**

#   H i g h w a y - D e l i t e 

```bash 

# Clear Next.js cache 
cd project
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🔗 Repository

**GitHub:** [https://github.com/DEEN-42/Highway-Delite](https://github.com/DEEN-42/Highway-Delite)

## 📝 License

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
