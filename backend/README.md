# Highway Delite Backend API

Backend API for Highway Delite experience booking platform built with Node.js, Express, and MongoDB.

## Features

- ✅ Experience management with slot availability
- ✅ Booking system with double-booking prevention
- ✅ Promo code validation
- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation
- ✅ Error handling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
NODE_ENV=development
```

### 3. Seed Database (Optional)

```bash
npm run seed
```

This will populate the database with:
- 8 sample experiences
- 4 promo codes (SAVE10, FLAT100, WELCOME20, FIRSTBOOKING)

### 4. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 📋 Experiences

### Get All Experiences
```http
GET /api/experiences
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "title": "Kayaking",
      "location": "Udupi",
      "price": 999,
      "image": "...",
      "description": "..."
    }
  ]
}
```

### Get Single Experience
```http
GET /api/experiences/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Kayaking",
    "description": "...",
    "location": "Udupi",
    "price": 999,
    "availability": [
      {
        "date": "Oct 22",
        "times": [
          {
            "time": "07:00 am",
            "slots": 4
          }
        ]
      }
    ]
  }
}
```

---

## 🎫 Bookings

### Create Booking
```http
POST /api/bookings
```

**Request Body:**
```json
{
  "experienceId": "67123abc...",
  "experienceName": "Kayaking",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "bookingDate": "Oct 22",
  "bookingTime": "07:00 am",
  "quantity": 2,
  "subtotal": 1998,
  "taxes": 118,
  "discount": 0,
  "total": 2116,
  "promoCode": null,
  "agreedToTerms": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "data": {
    "referenceId": "HUF568SO",
    "experienceId": "...",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "bookingDate": "Oct 22",
    "bookingTime": "07:00 am",
    "quantity": 2,
    "total": 2116,
    "status": "confirmed"
  }
}
```

### Get Booking by Reference ID
```http
GET /api/bookings/reference/:referenceId
```

**Example:**
```http
GET /api/bookings/reference/HUF568SO
```

### Get Bookings by Email
```http
GET /api/bookings/email/:email
```

**Example:**
```http
GET /api/bookings/email/john@example.com
```

### Cancel Booking
```http
PUT /api/bookings/:id/cancel
```

---

## 🎟️ Promo Codes

### Validate Promo Code
```http
POST /api/promo/validate
```

**Request Body:**
```json
{
  "code": "SAVE10",
  "orderAmount": 1998
}
```

**Response:**
```json
{
  "success": true,
  "message": "Promo code applied successfully",
  "data": {
    "code": "SAVE10",
    "discount": 200,
    "discountType": "percentage",
    "discountValue": 10
  }
}
```

### Available Promo Codes

| Code | Type | Discount | Min Order | Max Discount |
|------|------|----------|-----------|--------------|
| SAVE10 | Percentage | 10% | ₹500 | ₹200 |
| FLAT100 | Fixed | ₹100 | ₹1000 | - |
| WELCOME20 | Percentage | 20% | ₹0 | ₹500 |
| FIRSTBOOKING | Fixed | ₹250 | ₹2000 | - |

---

## 🏥 Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-29T..."
}
```

---

## 🛡️ Error Responses

All errors follow this format:

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

### Experience
```javascript
{
  title: String,
  description: String,
  location: String,
  price: Number,
  image: String,
  category: String,
  aboutText: String,
  minAge: Number,
  duration: String,
  availableDates: [{
    date: String,
    times: [{
      time: String,
      totalSlots: Number,
      bookedSlots: Number
    }]
  }],
  isActive: Boolean
}
```

### Booking
```javascript
{
  referenceId: String (unique),
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
  agreedToTerms: Boolean
}
```

### PromoCode
```javascript
{
  code: String (unique),
  discountType: String (percentage/fixed),
  discountValue: Number,
  minOrderValue: Number,
  maxDiscount: Number,
  validFrom: Date,
  validUntil: Date,
  maxUses: Number,
  usedCount: Number,
  isActive: Boolean
}
```

---

## 🔐 Security Notes

- Add authentication middleware for admin routes in production
- Validate all inputs
- Use environment variables for sensitive data
- Enable CORS only for trusted origins in production
- Add rate limiting to prevent abuse

---

## 📝 License

ISC
