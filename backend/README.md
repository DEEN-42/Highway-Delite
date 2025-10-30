# 🔧 Highway Delite Backend API

RESTful API backend for Highway Delite experience booking platform built with Node.js, Express.js, and MongoDB Atlas.

![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-green?style=flat&logo=mongodb)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Database Seeding](#-database-seeding)
- [API Endpoints](#-api-endpoints)
- [Data Models](#-data-models)
- [Error Handling](#-error-handling)
- [Scripts](#-scripts)

---

## ✨ Features

- ✅ **Experience Management** - CRUD operations for adventure experiences
- ✅ **Slot Management** - Real-time availability tracking with atomic operations
- ✅ **Booking System** - Race-condition-free booking with slot reservation
- ✅ **Promo Code Validation** - Discount code system with usage tracking
- ✅ **RESTful API Design** - Clean, documented endpoints
- ✅ **MongoDB Atlas** - Cloud database with Mongoose ODM
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Error Handling** - Consistent error response format
- ✅ **CORS Enabled** - Cross-origin resource sharing configured

---

## 🏗️ Architecture

### **MVC Pattern**

```
backend/
├── controllers/        # Business logic and request handlers
│   ├── bookingController.js       # Booking operations
│   ├── experienceController.js    # Experience operations
│   └── promoController.js         # Promo code operations
│
├── model/             # Mongoose schemas and models
│   ├── Booking.js                 # Booking schema
│   ├── Experience.js              # Experience schema
│   └── PromoCode.js               # PromoCode schema
│
├── routes/            # API route definitions
│   ├── bookingRoutes.js           # /api/bookings
│   ├── experienceRoutes.js        # /api/experiences
│   └── promoRoutes.js             # /api/promo
│
├── db.js              # MongoDB connection configuration
├── index.js           # Server entry point (Express setup)
├── seed.js            # Database seeding script
├── cleanDb.js         # Database cleanup utility
└── .env               # Environment variables
```

### **Request Flow**

```
Client Request
    ↓
Express Router (routes/)
    ↓
Controller (controllers/)
    ↓
Mongoose Model (model/)
    ↓
MongoDB Atlas
    ↓
Response to Client
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB Atlas (Mongoose 8.16.1)
- **Environment:** dotenv 17.0.1
- **CORS:** cors 2.8.5
- **Dev Tools:** nodemon 3.1.10

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file (see [Environment Variables](#-environment-variables) section)

### Step 3: Verify MongoDB Connection

Ensure MongoDB Atlas cluster is active and IP is whitelisted.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# ============================================
# MongoDB Atlas Configuration
# ============================================
# MongoDB Database Username
# Create this in MongoDB Atlas > Database Access
DB_USERNAME=your_mongodb_username

# MongoDB Database Password
# Set when creating database user
DB_PASSWORD=your_mongodb_password

# MongoDB Cluster URL
# Format: cluster0.xxxxx.mongodb.net
# Get from: MongoDB Atlas > Connect > Connect your application
DB_CLUSTER_URL=your_cluster_url.mongodb.net

# ============================================
# Server Configuration
# ============================================
# Port number for Express server
PORT=3030
```

### 📝 Example Configuration:

```env
DB_USERNAME=highway_delite_user
DB_PASSWORD=SecurePass123!
DB_CLUSTER_URL=cluster0.abc123.mongodb.net
PORT=3030
```

### ⚙️ MongoDB Connection String Construction:

The application constructs the connection string as:
```javascript
mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_URL}/highway-delite?retryWrites=true&w=majority
```

### 🔒 Security Notes:

- ⚠️ Never commit `.env` file to version control
- ✅ Already added to `.gitignore`
- 🔐 Use strong passwords with special characters
- 🌐 Whitelist specific IPs in production (not `0.0.0.0/0`)
- 📊 Database name is automatically set to `highway-delite`

---

## ▶️ Running the Server

### Development Mode (with auto-restart):

```bash
npm run dev
```

Server starts at: `http://localhost:3030`

### Production Mode:

```bash
npm start
```

### Verify Server is Running:

```bash
curl http://localhost:3030/
```

Expected response: `Highway Delite Backend`

---

## 🌱 Database Seeding

### Seed with Sample Data:

```bash
npm run seed
```

This creates:
- **8 Experiences** (Kayaking, Scuba Diving, Paragliding, etc.)
- **10 Promo Codes** (SAVE10, FLAT100, WELCOME20, etc.)

### Clean Database:

```bash
node cleanDb.js
```

⚠️ **Warning:** Permanently deletes all experiences, promo codes, and bookings!

---

## 📚 API Endpoints

### Base URL
```
http://localhost:3030/api
```

---

## 🎯 Experiences API

### **GET** `/api/experiences`
Get all active experiences with real-time availability.

**Request:**
```http
GET /api/experiences
```

**Query Parameters:** None

**Response: `200 OK`**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "671234567890abcdef123456",
      "title": "Kayaking",
      "description": "Paddle through serene backwaters. Perfect for beginners and pros.",
      "location": "Udupi",
      "price": 999,
      "taxRate": 0.18,
      "image": "https://images.pexels.com/photos/1430672/...",
      "category": "Water Sports",
      "aboutText": "2-hour kayaking session with equipment and guide...",
      "minAge": 12,
      "duration": "2-3 hours",
      "isActive": true,
      "availability": [
        {
          "date": "2025-11-15",
          "times": [
            {
              "time": "07:00 am",
              "slots": 4
            },
            {
              "time": "09:00 am",
              "slots": 0
            }
          ]
        }
      ]
    }
  ]
}
```

**Notes:**
- Returns only active experiences (`isActive: true`)
- `availability.times.slots` = Available slots (totalSlots - bookedSlots)
- `taxRate` is a decimal (0.18 = 18%)

---

### **GET** `/api/experiences/:id`
Get detailed information about a single experience including availability.

**URL Parameters:**
```typescript
{
  id: string  // MongoDB ObjectId of the experience
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "671234abcdef5678",
    "title": "Kayaking",
    "description": "Experience the thrill of kayaking in pristine waters",
    "location": "Udupi",
    "price": 999,
    "taxRate": 0.18,
    "image": "https://images.pexels.com/photos/1430672/...",
    "category": "Water Sports",
    "aboutText": "2-hour kayaking session with equipment and guide included. Perfect for beginners and experienced paddlers.",
    "minAge": 12,
    "duration": "2-3 hours",
    "isActive": true,
    "availability": [
      {
        "date": "2025-11-15",
        "times": [
          {
            "time": "07:00 am",
            "slots": 4
          },
          {
            "time": "09:00 am",
            "slots": 0
          },
          {
            "time": "11:00 am",
            "slots": 8
          }
        ]
      },
      {
        "date": "2025-11-16",
        "times": [
          {
            "time": "07:00 am",
            "slots": 10
          }
        ]
      }
    ],
    "createdAt": "2025-10-01T10:30:00.000Z",
    "updatedAt": "2025-10-29T14:20:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found` - Experience not found
  ```json
  {
    "success": false,
    "message": "Experience not found"
  }
  ```

- `500 Internal Server Error` - Server error
  ```json
  {
    "success": false,
    "message": "Failed to fetch experience details",
    "error": "Error message"
  }
  ```

**Notes:**
- Returns all experience details including inactive status
- `availability.times.slots` shows currently available slots (totalSlots - bookedSlots)
- Date format: `YYYY-MM-DD` (e.g., "2025-11-15")
- Time format: `HH:MM am/pm` (e.g., "07:00 am")

---

## 🎫 Bookings API

### **POST** `/api/bookings`
Create a new booking for an experience.

**Request Body:**
```typescript
{
  experienceId: string        // Required - MongoDB ObjectId
  customerName: string        // Required - Full name
  customerEmail: string       // Required - Valid email (lowercase)
  bookingDate: string         // Required - Format: "YYYY-MM-DD"
  bookingTime: string         // Required - Format: "HH:MM am/pm"
  quantity: number            // Required - Number of slots (min: 1)
  subtotal: number            // Required - Price before tax/discount
  taxes: number               // Required - Tax amount (price * taxRate)
  total: number               // Required - Final amount (subtotal + taxes)
  promoCode?: string          // Optional - Promo code (uppercase)
  agreedToTerms: boolean      // Required - Must be true
}
```

**Example Request:**
```json
{
  "experienceId": "671234abcdef5678",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "bookingDate": "2025-11-15",
  "bookingTime": "07:00 am",
  "quantity": 2,
  "subtotal": 1998,
  "taxes": 360,
  "total": 2358,
  "promoCode": "SAVE10",
  "agreedToTerms": true
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "referenceId": "HUF568SO",
    "experienceName": "Kayaking",
    "bookingDate": "2025-11-15",
    "bookingTime": "07:00 am",
    "quantity": 2,
    "subtotal": 1998,
    "discount": 200,
    "total": 2158,
    "status": "confirmed"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
  ```json
  {
    "success": false,
    "message": "All required fields must be provided"
  }
  ```

- `400 Bad Request` - Not enough slots available
  ```json
  {
    "success": false,
    "message": "Selected time slot is not available or has insufficient slots"
  }
  ```

- `400 Bad Request` - Invalid promo code
  ```json
  {
    "success": false,
    "message": "Invalid promo code"
  }
  ```

- `400 Bad Request` - Promo code validation failed
  ```json
  {
    "success": false,
    "message": "Minimum order value of ₹500 required"
  }
  ```

- `404 Not Found` - Experience not found
  ```json
  {
    "success": false,
    "message": "Experience not found"
  }
  ```

**Notes:**
- **Atomic Operations**: Uses MongoDB atomic updates to prevent race conditions when multiple users book simultaneously
- **Reference ID**: Auto-generated 8-character alphanumeric ID (e.g., "HUF568SO")
- **Promo Code Validation**: Backend re-validates promo code even if frontend validated it (security)
- **Slot Management**: Automatically decrements available slots and releases them if booking fails
- **Promo Usage**: Automatically increments promo code usage counter and deactivates if limit reached
- **Email Format**: Converted to lowercase before saving
- **Discount Applied**: If promo code is valid, discount is subtracted from total

---

### **GET** `/api/bookings/reference/:referenceId`
Get booking details by reference ID.

**URL Parameters:**
```typescript
{
  referenceId: string  // 8-character booking reference (e.g., "HUF568SO")
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "671a2b3c4d5e6f7890",
    "referenceId": "HUF568SO",
    "experienceId": {
      "_id": "671234abcdef5678",
      "title": "Kayaking",
      "location": "Udupi",
      "image": "https://images.pexels.com/photos/1430672/..."
    },
    "experienceName": "Kayaking",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "bookingDate": "2025-11-15",
    "bookingTime": "07:00 am",
    "quantity": 2,
    "subtotal": 1998,
    "taxes": 360,
    "discount": 200,
    "total": 2158,
    "promoCode": "SAVE10",
    "status": "confirmed",
    "agreedToTerms": true,
    "createdAt": "2025-10-29T10:30:00.000Z",
    "updatedAt": "2025-10-29T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found` - Booking not found
  ```json
  {
    "success": false,
    "message": "Booking not found"
  }
  ```

**Notes:**
- Reference ID is case-insensitive (automatically converted to uppercase)
- Populates experience details (title, location, image)

---

### **GET** `/api/bookings/email/:email`
Get all bookings for a customer by email address.

**URL Parameters:**
```typescript
{
  email: string  // Customer email address
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "671a2b3c4d5e6f7890",
      "referenceId": "HUF568SO",
      "experienceId": {
        "_id": "671234abcdef5678",
        "title": "Kayaking",
        "location": "Udupi",
        "image": "https://images.pexels.com/photos/1430672/..."
      },
      "experienceName": "Kayaking",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "bookingDate": "2025-11-15",
      "bookingTime": "07:00 am",
      "quantity": 2,
      "subtotal": 1998,
      "taxes": 360,
      "discount": 200,
      "total": 2158,
      "promoCode": "SAVE10",
      "status": "confirmed",
      "agreedToTerms": true,
      "createdAt": "2025-10-29T10:30:00.000Z",
      "updatedAt": "2025-10-29T10:30:00.000Z"
    }
  ]
}
```

**Notes:**
- Email is case-insensitive (automatically converted to lowercase)
- Results sorted by creation date (newest first)
- Populates experience details
- Returns empty array if no bookings found

---

### **GET** `/api/bookings` (Admin)
Get all bookings with pagination and filtering.

**Query Parameters:**
```typescript
{
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'  // Filter by status
  page?: number      // Page number (default: 1)
  limit?: number     // Items per page (default: 10)
}
```

**Example:**
```http
GET /api/bookings?status=confirmed&page=1&limit=20
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 20,
  "total": 156,
  "page": 1,
  "pages": 8,
  "data": [
    {
      "_id": "671a2b3c4d5e6f7890",
      "referenceId": "HUF568SO",
      "experienceId": {
        "_id": "671234abcdef5678",
        "title": "Kayaking",
        "location": "Udupi"
      },
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "bookingDate": "2025-11-15",
      "bookingTime": "07:00 am",
      "quantity": 2,
      "total": 2158,
      "status": "confirmed",
      "createdAt": "2025-10-29T10:30:00.000Z"
    }
  ]
}
```

**Notes:**
- Admin-only endpoint (authentication required in production)
- Supports pagination and status filtering
- Sorted by creation date (newest first)

---

### **PUT** `/api/bookings/:id/cancel`
Cancel a booking and release the slots.

**URL Parameters:**
```typescript
{
  id: string  // MongoDB ObjectId of the booking
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "671a2b3c4d5e6f7890",
    "referenceId": "HUF568SO",
    "status": "cancelled",
    "quantity": 2
  }
}
```

**Error Responses:**
- `400 Bad Request` - Already cancelled
  ```json
  {
    "success": false,
    "message": "Booking is already cancelled"
  }
  ```

- `404 Not Found` - Booking not found
  ```json
  {
    "success": false,
    "message": "Booking not found"
  }
  ```

**Notes:**
- Automatically releases booked slots back to experience availability
- Updates booking status to "cancelled"
- Atomic operation to ensure data consistency

---

## 🎟️ Promo Codes API

### **POST** `/api/promo/validate`
Validate a promo code and calculate discount.

**Request Body:**
```typescript
{
  code: string        // Required - Promo code (case-insensitive)
  orderAmount: number // Required - Order subtotal before discount
}
```

**Example Request:**
```json
{
  "code": "SAVE10",
  "orderAmount": 1998
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "valid": true,
  "discount": 200,
  "message": "Promo code applied successfully",
  "promoDetails": {
    "code": "SAVE10",
    "discountType": "percentage",
    "discountValue": 10
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
  ```json
  {
    "success": false,
    "message": "Promo code and order amount are required"
  }
  ```

- `404 Not Found` - Invalid code
  ```json
  {
    "success": false,
    "message": "Invalid promo code"
  }
  ```

- `400 Bad Request` - Code inactive
  ```json
  {
    "success": false,
    "message": "Promo code is inactive"
  }
  ```

- `400 Bad Request` - Code expired
  ```json
  {
    "success": false,
    "message": "Promo code has expired"
  }
  ```

- `400 Bad Request` - Usage limit reached
  ```json
  {
    "success": false,
    "message": "Promo code usage limit reached"
  }
  ```

- `400 Bad Request` - Minimum order not met
  ```json
  {
    "success": false,
    "message": "Minimum order value of ₹500 required"
  }
  ```

**Discount Calculation:**

**Percentage Type:**
```javascript
discount = (orderAmount * discountValue) / 100
if (discount > maxDiscount) {
  discount = maxDiscount
}
discount = Math.round(discount)  // Rounded to nearest rupee
```

**Example:**
- Order: ₹1998
- Promo: 10% (max ₹200)
- Calculation: 1998 × 10% = ₹199.8 → ₹200 (within max)
- Final Discount: **₹200**

**Fixed Type:**
```javascript
discount = discountValue
```

**Example:**
- Order: ₹2500
- Promo: ₹100 flat
- Final Discount: **₹100**

**Notes:**
- Code is case-insensitive (converted to uppercase)
- Validates: isActive, date range, usage limit, minimum order value
- Percentage discounts capped at `maxDiscount` if specified
- Discount amount is rounded to nearest rupee
- Frontend should call this endpoint before creating booking to show discount
- Backend re-validates during booking creation (don't trust frontend)

---

### **GET** `/api/promo` (Admin)
Get all promo codes with optional filtering.

**Query Parameters:**
```typescript
{
  isActive?: 'true' | 'false'  // Filter by active status
}
```

**Example:**
```http
GET /api/promo?isActive=true
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "671xyz123456",
      "code": "SAVE10",
      "discountType": "percentage",
      "discountValue": 10,
      "minOrderValue": 500,
      "maxDiscount": 200,
      "validFrom": "2025-10-01T00:00:00.000Z",
      "validUntil": "2025-12-31T23:59:59.999Z",
      "maxUses": 100,
      "usedCount": 45,
      "isActive": true,
      "createdAt": "2025-10-01T00:00:00.000Z",
      "updatedAt": "2025-10-29T14:30:00.000Z"
    },
    {
      "_id": "671abc789012",
      "code": "FLAT100",
      "discountType": "fixed",
      "discountValue": 100,
      "minOrderValue": 1000,
      "maxDiscount": null,
      "validFrom": "2025-10-01T00:00:00.000Z",
      "validUntil": "2025-11-30T23:59:59.999Z",
      "maxUses": null,
      "usedCount": 23,
      "isActive": true,
      "createdAt": "2025-10-01T00:00:00.000Z",
      "updatedAt": "2025-10-28T09:15:00.000Z"
    }
  ]
}
```

**Notes:**
- Admin-only endpoint (authentication required in production)
- `maxUses: null` means unlimited uses
- `maxDiscount: null` means no cap (fixed discounts don't have this)
- `usedCount` automatically incremented when booking is created
- Auto-deactivated when `usedCount >= maxUses`
- Sorted by creation date (newest first)

---

### **GET** `/api/promo/:code` (Admin)
Get details of a specific promo code.

**URL Parameters:**
```typescript
{
  code: string  // Promo code (case-insensitive)
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "671xyz123456",
    "code": "SAVE10",
    "discountType": "percentage",
    "discountValue": 10,
    "minOrderValue": 500,
    "maxDiscount": 200,
    "validFrom": "2025-10-01T00:00:00.000Z",
    "validUntil": "2025-12-31T23:59:59.999Z",
    "maxUses": 100,
    "usedCount": 45,
    "isActive": true,
    "createdAt": "2025-10-01T00:00:00.000Z",
    "updatedAt": "2025-10-29T14:30:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found` - Promo code not found
  ```json
  {
    "success": false,
    "message": "Promo code not found"
  }
  ```

---

### Available Promo Codes (Seeded Data)

| Code | Type | Discount | Min Order | Max Discount | Max Uses | Status |
|------|------|----------|-----------|--------------|----------|--------|
| **SAVE10** | Percentage | 10% | ₹500 | ₹200 | 100 | Active |
| **FLAT100** | Fixed | ₹100 | ₹1000 | - | Unlimited | Active |
| **WELCOME20** | Percentage | 20% | ₹0 | ₹500 | 50 | Active |
| **FIRSTBOOKING** | Fixed | ₹250 | ₹2000 | - | 200 | Active |

---

## 🏥 Health Check

### **GET** `/api/health`
Check server health status.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-29T15:30:45.123Z"
}
```

---

## 🛡️ Error Responses

All error responses follow this standardized format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {} // Only in development mode
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## 📦 Data Models

### Experience Model
**File:** `model/Experience.js`

```typescript
{
  _id: ObjectId                    // Auto-generated MongoDB ID
  title: string                    // Required - Experience name
  description: string              // Required - Short description
  location: string                 // Required - Location name
  price: number                    // Required - Base price (min: 0)
  taxRate: number                  // Required - Tax rate as decimal (default: 0.18 = 18%)
  image: string                    // Required - Image URL
  category: string                 // Required - Category (default: "Adventure")
  aboutText: string                // Required - Detailed description
  minAge: number                   // Minimum age requirement (default: 0)
  duration: string                 // Required - Duration text (default: "2 hours")
  availableDates: [{               // Array of available dates
    date: string                   // Required - Format: "YYYY-MM-DD" (e.g., "2025-11-15")
    times: [{                      // Array of time slots for this date
      time: string                 // Required - Format: "HH:MM am/pm" (e.g., "07:00 am")
      totalSlots: number           // Required - Total capacity (min: 1)
      bookedSlots: number          // Booked count (default: 0, min: 0)
    }]
  }]
  isActive: boolean                // Active status (default: true)
  createdAt: Date                  // Auto-generated timestamp
  updatedAt: Date                  // Auto-updated timestamp
}
```

**Methods:**
- `checkSlotAvailability(date, time, quantity)` - Check if slots are available
- `bookSlots(date, time, quantity)` - Atomically book slots (race-condition safe)
- `releaseSlots(date, time, quantity)` - Atomically release slots (for cancellations)

**Virtual Fields:**
- `slotsAvailable` - Returns array of dates with calculated available slots

**Indexes:**
- None (consider adding index on `isActive` for large datasets)

---

### Booking Model
**File:** `model/Booking.js`

```typescript
{
  _id: ObjectId                    // Auto-generated MongoDB ID
  referenceId: string              // Required, Unique - 8-char alphanumeric (auto-generated)
  experienceId: ObjectId           // Required - Reference to Experience
  experienceName: string           // Required - Experience title (denormalized)
  customerName: string             // Required - Full name (trimmed)
  customerEmail: string            // Required - Email (lowercase, validated)
  bookingDate: string              // Required - Format: "YYYY-MM-DD"
  bookingTime: string              // Required - Format: "HH:MM am/pm"
  quantity: number                 // Required - Number of slots (min: 1)
  subtotal: number                 // Required - Price before tax/discount (min: 0)
  taxes: number                    // Required - Tax amount (min: 0)
  discount: number                 // Discount amount (default: 0, min: 0)
  total: number                    // Required - Final amount (min: 0)
  promoCode: string                // Uppercase promo code (default: null)
  status: enum                     // Status (default: "confirmed")
    - 'pending'
    - 'confirmed'
    - 'cancelled'
    - 'completed'
  agreedToTerms: boolean           // Required - Must be true
  createdAt: Date                  // Auto-generated timestamp
  updatedAt: Date                  // Auto-updated timestamp
}
```

**Validation:**
- `customerEmail` - Must match regex: `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`
- `agreedToTerms` - Must be `true` (validated)

**Reference ID Generation:**
- Auto-generated using: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
- Length: 8 characters
- Example: `HUF568SO`, `AB12CD34`

**Indexes:**
- `referenceId` (unique, for fast lookup)
- `customerEmail` (for customer bookings query)
- `experienceId` (for experience bookings query)

---

### PromoCode Model
**File:** `model/PromoCode.js`

```typescript
{
  _id: ObjectId                    // Auto-generated MongoDB ID
  code: string                     // Required, Unique - Uppercase, trimmed
  discountType: enum               // Required - Discount type
    - 'percentage'                 // Percentage discount (e.g., 10%)
    - 'fixed'                      // Fixed amount discount (e.g., ₹100)
  discountValue: number            // Required - Discount value (min: 0)
                                   // For percentage: 10 means 10%
                                   // For fixed: 100 means ₹100
  minOrderValue: number            // Minimum order requirement (default: 0)
  maxDiscount: number              // Max discount cap for percentage (default: null = no cap)
                                   // Only used for percentage type
  validFrom: Date                  // Required - Start date/time
  validUntil: Date                 // Required - End date/time
  maxUses: number                  // Max usage limit (default: null = unlimited)
  usedCount: number                // Current usage count (default: 0)
  isActive: boolean                // Active status (default: true)
  createdAt: Date                  // Auto-generated timestamp
  updatedAt: Date                  // Auto-updated timestamp
}
```

**Methods:**
- `validateCode(orderAmount)` - Validate promo code and calculate discount
  ```typescript
  Returns: {
    valid: boolean
    discount?: number
    message: string
  }
  ```
  
  **Validation Checks:**
  1. `isActive` must be `true`
  2. Current date/time must be between `validFrom` and `validUntil`
  3. `usedCount` must be less than `maxUses` (if `maxUses` is not null)
  4. `orderAmount` must be >= `minOrderValue`

  **Discount Calculation:**
  - **Percentage:** `(orderAmount * discountValue) / 100`, capped at `maxDiscount`
  - **Fixed:** `discountValue`
  - Result is rounded to nearest integer

- `incrementUsage()` - Atomically increment usage counter (race-condition safe)
  ```typescript
  Returns: {
    usedCount: number
    isActive: boolean
    deactivated: boolean  // true if auto-deactivated due to limit
  }
  ```
  
  **Auto-Deactivation:**
  - When `usedCount >= maxUses`, automatically sets `isActive = false`
  - Atomic operation prevents race conditions when multiple bookings use same code

**Indexes:**
- `code` (unique, for fast lookup)

**Example Data:**
```javascript
{
  code: "SAVE10",
  discountType: "percentage",
  discountValue: 10,              // 10%
  minOrderValue: 500,             // Minimum ₹500
  maxDiscount: 200,               // Max ₹200 discount
  validFrom: "2025-10-01T00:00:00.000Z",
  validUntil: "2025-12-31T23:59:59.999Z",
  maxUses: 100,
  usedCount: 45,
  isActive: true
}
```

---

## 🔒 Race Condition Protection

### Atomic Operations
The backend uses MongoDB atomic operations to prevent data corruption in concurrent scenarios:

**Booking Slots:**
```javascript
// Uses $inc with conditional update to ensure atomic slot booking
Experience.findOneAndUpdate(
  {
    _id: experienceId,
    'availableDates.times.bookedSlots': { $lte: maxAllowedBooked }
  },
  {
    $inc: { 'availableDates.times.bookedSlots': quantity }
  }
)
```
- If two users try to book the last slot simultaneously, only one succeeds
- The other receives "Failed to book slots" error

**Promo Code Usage:**
```javascript
// Uses $inc with conditional update to prevent exceeding maxUses
PromoCode.findOneAndUpdate(
  {
    _id: promoId,
    isActive: true,
    usedCount: { $lt: maxUses }
  },
  {
    $inc: { usedCount: 1 }
  }
)
```
- If multiple bookings use the same promo simultaneously, usage is tracked correctly
- Auto-deactivates when limit is reached

---

## 🎯 Business Logic

### Booking Flow
1. **Validate Input** - Check all required fields
2. **Find Experience** - Verify experience exists
3. **Check Availability** - Verify slots are available
4. **Validate Promo** (if provided) - Check code validity and calculate discount
5. **Book Slots** - Atomically decrement available slots
6. **Create Booking** - Save booking with generated reference ID
7. **Increment Promo Usage** (if promo used) - Atomically increment counter
8. **Rollback on Failure** - Release slots and delete booking if promo increment fails

### Cancellation Flow
1. **Find Booking** - Verify booking exists
2. **Check Status** - Ensure not already cancelled
3. **Release Slots** - Atomically increment available slots in experience
4. **Update Status** - Set booking status to "cancelled"

### Promo Validation Flow
1. **Find Code** - Check if code exists
2. **Check Active** - Verify `isActive = true`
3. **Check Date Range** - Verify current date is between `validFrom` and `validUntil`
4. **Check Usage Limit** - Verify `usedCount < maxUses`
5. **Check Min Order** - Verify `orderAmount >= minOrderValue`
6. **Calculate Discount** - Apply percentage/fixed logic with max cap

---

## 🔐 Security Notes

- ✅ **Input Validation:** All inputs validated with Mongoose schemas
- ✅ **Atomic Operations:** Race conditions prevented with MongoDB atomic updates
- ✅ **Email Validation:** Regex pattern enforces valid email format
- ✅ **Case Handling:** Promo codes and reference IDs auto-converted to uppercase
- ✅ **Backend Re-validation:** Promo codes re-validated during booking (don't trust frontend)
- ⚠️ **TODO - Production:** Add authentication middleware for admin routes
- ⚠️ **TODO - Production:** Add rate limiting to prevent abuse
- ⚠️ **TODO - Production:** Enable CORS only for trusted origins
- ⚠️ **TODO - Production:** Add request sanitization to prevent NoSQL injection

---

## 📜 Scripts

Available npm scripts:

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Seed database with sample data
npm run seed

# Clean database (remove all data)
node cleanDb.js
```

---

## 🧪 Testing the API

### Using cURL (Command Line)

**Get All Experiences:**
```bash
curl http://localhost:3030/api/experiences
```

**Get Single Experience:**
```bash
curl http://localhost:3030/api/experiences/671234abcdef5678
```

**Validate Promo Code:**
```bash
curl -X POST http://localhost:3030/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"SAVE10","orderAmount":1998}'
```

**Create Booking:**
```bash
curl -X POST http://localhost:3030/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "experienceId":"671234abcdef5678",
    "customerName":"John Doe",
    "customerEmail":"john@example.com",
    "bookingDate":"2025-11-15",
    "bookingTime":"07:00 am",
    "quantity":2,
    "subtotal":1998,
    "taxes":360,
    "total":2358,
    "promoCode":"SAVE10",
    "agreedToTerms":true
  }'
```

**Get Booking by Reference ID:**
```bash
curl http://localhost:3030/api/bookings/reference/HUF568SO
```

---

### Using Postman

1. **Import Collection:** Create a new collection named "Highway Delite API"

2. **Set Base URL Variable:**
   - Variable: `baseUrl`
   - Value: `http://localhost:3030/api`

3. **Example Requests:**

**GET All Experiences**
```
GET {{baseUrl}}/experiences
```

**POST Create Booking**
```
POST {{baseUrl}}/bookings
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "experienceId": "671234abcdef5678",
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "bookingDate": "2025-11-15",
  "bookingTime": "07:00 am",
  "quantity": 2,
  "subtotal": 1998,
  "taxes": 360,
  "total": 2358,
  "agreedToTerms": true
}
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Connection failed" Error**
```
Error: connect ECONNREFUSED ::1:27017
```
**Solution:** 
- Check MongoDB Atlas connection string in `.env`
- Verify internet connection
- Ensure `DB_USERNAME`, `DB_PASSWORD`, and `DB_CLUSTER_URL` are correct

---

**2. "Experience not found" After Seeding**
```
{ "success": false, "message": "Experience not found" }
```
**Solution:**
- Clear database: `node cleanDb.js`
- Re-seed: `npm run seed`
- Copy actual ObjectId from seeded data in console

---

**3. "Failed to book slots" Error**
```
{ "success": false, "message": "Failed to book slots - slots may have been filled" }
```
**Solution:**
- Check slot availability with `GET /api/experiences/:id`
- Reduce booking quantity
- Select different date/time with available slots

---

**4. "Promo code usage limit reached"**
```
{ "success": false, "message": "Promo code usage limit reached" }
```
**Solution:**
- Use a different promo code
- Or increase `maxUses` in database:
  ```javascript
  db.promocodes.updateOne(
    { code: "SAVE10" },
    { $set: { maxUses: 200, isActive: true } }
  )
  ```

---

**5. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3030
```
**Solution:**
- Kill process on port 3030:
  ```bash
  # Windows
  netstat -ano | findstr :3030
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:3030 | xargs kill -9
  ```
- Or change port in `.env`: `PORT=3031`

---

**6. Mongoose Validation Error**
```
{ "success": false, "error": "Booking validation failed" }
```
**Solution:**
- Check all required fields are provided
- Verify email format is valid
- Ensure `agreedToTerms` is `true`
- Check number fields are positive

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

---

## 📝 License

ISC
