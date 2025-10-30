# 🚗 Highway Delite - Experience Booking Platform# 🚗 Highway Delite - Experience Booking Platform



A full-stack MERN application for booking adventure and travel experiences. Built with Next.js 15, TypeScript, Express.js, and MongoDB.A full-stack MERN application for booking adventure and travel experiences. Built with Next.js 15, TypeScript, Express.js, and MongoDB.



![Tech Stack](https://img.shields.io/badge/Next.js-15.0.3-black?style=flat&logo=next.js)![Tech Stack](https://img.shields.io/badge/Next.js-15.0.3-black?style=flat&logo=next.js)

![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)

![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat&logo=node.js)![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat&logo=node.js)

![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?style=flat&logo=express)![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?style=flat&logo=express)

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)



------



## 📋 Table of Contents## 📋 Table of Contents



- [Features](#-features)- [Features](#-features)

- [Tech Stack](#-tech-stack)- [Tech Stack](#-tech-stack)

- [Project Structure](#-project-structure)- [Project Structure](#-project-structure)

- [Prerequisites](#-prerequisites)- [Prerequisites](#-prerequisites)

- [Installation & Setup](#-installation--setup)- [Installation & Setup](#-installation--setup)

- [Environment Variables](#-environment-variables)- [Environment Variables](#-environment-variables)

- [Running the Application](#-running-the-application)- [Running the Application](#-running-the-application)

- [Database Seeding](#-database-seeding)- [Database Seeding](#-database-seeding)

- [API Documentation](#-api-documentation)- [API Documentation](#-api-documentation)

- [Available Promo Codes](#-available-promo-codes)- [Available Promo Codes](#-available-promo-codes)

- [Deployment](#-deployment)- [Deployment](#-deployment)

- [Development Scripts](#-development-scripts)- [Troubleshooting](#-troubleshooting)

- [Troubleshooting](#-troubleshooting)- [License](#-license)

- [License](#-license)

---

---

## ✨ Features

## ✨ Features

### User Features

### User Features- 🔍 **Search & Browse** - Search and filter through various adventure experiences

- 🔍 **Search & Browse** - Search and filter through various adventure experiences- 📅 **Real-time Availability** - View available dates and time slots with live slot counts

- 📅 **Real-time Availability** - View available dates and time slots with live slot counts- 🎟️ **Smart Booking System** - Book experiences with automatic slot management

- 🎟️ **Smart Booking System** - Book experiences with automatic slot management- 💰 **Dynamic Pricing** - 18% GST calculation with transparent pricing breakdown

- 💰 **Dynamic Pricing** - 18% GST calculation with transparent pricing breakdown- 🎫 **Promo Code System** - Apply discount codes with smart validation and dropdown

- 🎫 **Promo Code System** - Apply discount codes with smart validation and dropdown- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop- ✅ **Booking Confirmation** - Unique reference ID for each booking

- ✅ **Booking Confirmation** - Unique reference ID for each booking- 🔔 **Toast Notifications** - Real-time feedback with react-hot-toast

- 🔔 **Toast Notifications** - Real-time feedback with react-hot-toast- ⚠️ **Urgency Indicators** - "Only X left!" and "Sold Out" status on time slots

- ⚠️ **Urgency Indicators** - "Only X left!" and "Sold Out" status on time slots

### Technical Features

### Technical Features- 🚀 **Race Condition Prevention** - Atomic MongoDB operations prevent double bookings

- 🚀 **Race Condition Prevention** - Atomic MongoDB operations prevent double bookings- 🎨 **Professional UI/UX** - Built with Tailwind CSS and shadcn/ui components

- 🎨 **Professional UI/UX** - Built with Tailwind CSS and shadcn/ui components- 📊 **Slot Availability Tracking** - Real-time slot availability with booking counts

- 📊 **Slot Availability Tracking** - Real-time slot availability with booking counts- 🔐 **Form Validation** - Inline validation with comprehensive error handling

- 🔐 **Form Validation** - Inline validation with comprehensive error handling- 🌐 **RESTful API** - Clean, documented API endpoints

- 🌐 **RESTful API** - Clean, documented API endpoints- 📦 **Context API** - Efficient state management for booking flow

- 📦 **Context API** - Efficient state management for booking flow- 🎯 **TypeScript** - Type-safe code throughout the frontend

- 🎯 **TypeScript** - Type-safe code throughout the frontend- 📅 **Date Formatting** - Intelligent date display with timezone handling

- 📅 **Date Formatting** - Intelligent date display with timezone handling

---

---

## 🛠️ Tech Stack

## 🛠️ Tech Stack

### Frontend

### Frontend- **Framework:** Next.js 15.0.3 with App Router

- **Framework:** Next.js 15.0.3 with App Router- **Language:** TypeScript 5.2.2

- **Language:** TypeScript 5.2.2- **UI Library:** React 19

- **UI Library:** React 19- **Styling:** Tailwind CSS 3.4.1

- **Styling:** Tailwind CSS 3.4.1- **Components:** Radix UI + shadcn/ui

- **Components:** Radix UI + shadcn/ui- **Icons:** Lucide React 0.446.0

- **Icons:** Lucide React 0.446.0- **Notifications:** react-hot-toast 2.x

- **Notifications:** react-hot-toast 2.x- **State Management:** React Context API

- **State Management:** React Context API- **Form Handling:** Inline validation with error states

- **Form Handling:** Inline validation with error states

### Backend

### Backend- **Runtime:** Node.js

- **Runtime:** Node.js- **Framework:** Express.js 5.1.0

- **Framework:** Express.js 5.1.0- **Database:** MongoDB Atlas (Mongoose 8.16.1)

- **Database:** MongoDB Atlas (Mongoose 8.16.1)- **Environment:** dotenv 17.0.1

- **Environment:** dotenv 17.0.1- **CORS:** cors 2.8.5

- **CORS:** cors 2.8.5- **API:** RESTful architecture

- **API:** RESTful architecture

### Development Tools

### Development Tools- **Dev Server:** nodemon 3.1.10 (backend)

- **Dev Server:** nodemon 3.1.10 (backend)- **Package Manager:** npm

- **Package Manager:** npm- **Version Control:** Git

- **Version Control:** Git

## Prerequisites

---

Before running this application, ensure you have:

## 📁 Project Structure- Node.js (v16 or higher)

- npm (v7 or higher)

```- MongoDB Atlas Account or local MongoDB installation

HDWeb/- Git (for version control)

├── backend/                 # Express.js Backend

│   ├── controllers/         # Route controllers## Installation

│   │   ├── bookingController.js

│   │   ├── experienceController.js### 1. Clone the Repository

│   │   └── promoController.js```bash

│   ├── model/              # Mongoose schemasgit clone https://github.com/DEEN-42/Highway-Delite.git

│   │   ├── Booking.jscd Highway-Delite

│   │   ├── Experience.js```

│   │   └── PromoCode.js

│   ├── routes/             # API routes### 2. Install Backend Dependencies

│   │   ├── bookingRoutes.js```bash

│   │   ├── experienceRoutes.jscd backend

│   │   └── promoRoutes.jsnpm install

│   ├── .env                # Backend environment variables```

│   ├── .gitignore

│   ├── cleanDb.js          # Database cleanup script### 3. Install Frontend Dependencies

│   ├── db.js               # MongoDB connection```bash

│   ├── index.js            # Server entry pointcd ../project

│   ├── package.jsonnpm install

│   ├── README.md```

│   └── seed.js             # Database seeding script

│## Environment Variables

└── project/                # Next.js Frontend

    ├── app/                # App router pages### Backend (.env)

    │   ├── booking/        # Booking checkout pageCreate a .env file in the ackend directory:

    │   │   └── [id]/```

    │   │       └── page.tsxPORT=3030

    │   ├── confirmation/   # Confirmation pageMONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

    │   │   └── page.tsx```

    │   ├── experience/     # Experience details page

    │   │   └── [id]/### Frontend (.env.local)

    │   │       └── page.tsxCreate a .env.local file in the project directory:

    │   ├── globals.css     # Global styles```

    │   ├── layout.tsx      # Root layoutNEXT_PUBLIC_API_URL=http://localhost:3030

    │   └── page.tsx        # Home page```

    ├── components/         # React components

    │   ├── header/## Running the Application

    │   │   └── Search.tsx

    │   └── ui/             # shadcn/ui components### Start Backend Server

    ├── context/            # React Context```bash

    │   └── BookingContext.tsxcd backend

    ├── hooks/              # Custom hooksnpm run dev

    │   └── use-toast.ts```

    ├── lib/                # UtilitiesBackend will run on: http://localhost:3030

    │   ├── dateUtils.ts

    │   └── utils.ts### Start Frontend Development Server

    ├── .env.local          # Frontend environment variables```bash

    ├── .eslintrc.jsoncd project

    ├── .gitignorenpm run dev

    ├── components.json     # shadcn/ui config```

    ├── next.config.jsFrontend will run on: http://localhost:3000

    ├── package.json

    ├── postcss.config.js### Seed Database (Optional)

    ├── tailwind.config.ts```bash

    └── tsconfig.jsoncd backend

```npm run seed

```

---This will create 8 sample experiences and 4 promo codes (SAVE10, SAVE20, FIRST50, LIMIT3)



## ✅ Prerequisites## API Documentation



Before you begin, ensure you have the following installed:### Base URL

```

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)http://localhost:3030/api

- **npm** (v8.x or higher) - Comes with Node.js```

- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)

- **Git** - [Download](https://git-scm.com/)### Key Endpoints



---#### Experiences

- GET /experiences - Get all experiences

## 🚀 Installation & Setup- GET /experiences/:id - Get experience by ID



### Step 1: Clone the Repository#### Bookings

- POST /bookings - Create a new booking

```bash- GET /bookings/reference/:referenceId - Get booking by reference ID

git clone https://github.com/DEEN-42/Highway-Delite.git- GET /bookings/email/:email - Get bookings by email

cd HDWeb

```#### Promo Codes

- POST /promo/validate - Validate promo code

### Step 2: Backend Setup

## Project Structure

```bash

# Navigate to backend directory```

cd backendHDWeb/

 backend/

# Install dependencies    controllers/

npm install    model/

```    routes/

    db.js

### Step 3: Frontend Setup    index.js

    seed.js

```bash project/

# Navigate to frontend directory (from root)    app/

cd ../project    components/

    context/

# Install dependencies    hooks/

npm install    lib/

``` README.md

```

---

## Key Features Implementation

## 🔐 Environment Variables

### Race Condition Protection

### Backend Environment VariablesUses atomic MongoDB operations to prevent overbooking and promo code over-usage.



Create a `.env` file in the `backend/` directory with the following content:### Search Functionality

Real-time filtering with case-insensitive partial matching.

```env

# MongoDB Atlas Connection Details### Booking Flow

DB_USERNAME=your_mongodb_usernameMulti-step process with context-based state management and clean URLs.

DB_PASSWORD=your_mongodb_password

DB_CLUSTER_URL=your_cluster_url.mongodb.net### Promo Code System

Validation before booking with auto-deactivation at usage limit.

# Server Configuration

PORT=3030## Troubleshooting

```

### MongoDB Atlas Connection Issues

#### 🔹 MongoDB Atlas Setup Instructions:1. Check your IP is whitelisted in MongoDB Atlas

2. Verify MONGO_URI format is correct

1. **Create MongoDB Atlas Account:**3. Ensure network allows outbound connections on port 27017

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

   - Sign up for a free account### CORS Issues

1. Ensure CORS is enabled in backend

2. **Create a New Cluster:**2. Verify API_URL in frontend .env.local

   - Click "Build a Cluster"3. Check both servers are running

   - Choose "Free Tier" (M0 Sandbox)

   - Select your preferred cloud provider and region### Build Errors

   - Click "Create Cluster" (takes 5-10 minutes)```bash

cd project

3. **Create Database User:**rm -rf .next

   - Go to "Database Access" in the left sidebarrm -rf node_modules package-lock.json

   - Click "Add New Database User"npm install

   - Choose "Password" authentication method```

   - Set a username (e.g., `myappuser`)

   - Generate or set a strong password## Repository

   - Set "Database User Privileges" to "Read and write to any database"

   - Click "Add User"**GitHub:** https://github.com/DEEN-42/Highway-Delite



4. **Whitelist IP Address:**## License

   - Go to "Network Access" in the left sidebar

   - Click "Add IP Address"This project is proprietary and confidential.

   - For development: Click "Allow Access from Anywhere" (`0.0.0.0/0`)

   - Click "Confirm"## Authors

   - ⚠️ **For production**: Use specific IP addresses

- Highway Delite Team

5. **Get Connection String:**- GitHub: @DEEN-42

   - Go back to "Database" (Clusters view)

   - Click "Connect" button on your cluster---

   - Choose "Connect your application"

   - Select "Driver: Node.js" and latest versionBuilt with love by Highway Delite Team

   - Copy the connection string shown
   - Format: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`
   - **Extract these parts:**
     - `DB_USERNAME`: Your database username
     - `DB_PASSWORD`: Your database password
     - `DB_CLUSTER_URL`: Everything after `@` (e.g., `cluster0.abc123.mongodb.net`)

#### 📝 Example Backend `.env` File:
```env
DB_USERNAME=myappuser
DB_PASSWORD=MySecurePass123!
DB_CLUSTER_URL=cluster0.abc123.mongodb.net
PORT=3030
```

⚠️ **Important Security Notes:**
- Replace all placeholder values with your actual MongoDB credentials
- Never commit `.env` files to version control (already in `.gitignore`)
- Use strong passwords with mix of letters, numbers, and symbols
- For production, restrict IP whitelist to specific addresses

---

### Frontend Environment Variables

Create a `.env.local` file in the `project/` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3030
```

#### 📝 For Production Deployment:
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.onrender.com
```

⚠️ **Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Use `.env.local` for local development (automatically gitignored)
- Update `NEXT_PUBLIC_API_URL` with your production backend URL when deploying
- Never expose sensitive backend credentials in frontend environment variables

---

## ▶️ Running the Application

### Development Mode (Recommended)

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm run dev
```
✅ Backend server will start at: `http://localhost:3030`

**Terminal 2 - Start Frontend Server:**
```bash
cd project
npm run dev
```
✅ Frontend will be available at: `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd project
npm run build
npm start
```

---

## 🌱 Database Seeding

Populate your MongoDB database with sample data:

```bash
cd backend
npm run seed
```

This command will create:

### **8 Sample Experiences:**
1. **Kayaking** (Udupi) - ₹999
2. **Scuba Diving** (Lakshadweep) - ₹2999
3. **Paragliding** (Kamshet) - ₹2499
4. **Nandi Hills Sunrise** (Bangalore) - ₹599
5. **Wildlife Safari** (Jim Corbett) - ₹3499
6. **Coffee Trail** (Coorg) - ₹1299
7. **White Water Rafting** (Rishikesh) - ₹1499
8. **Hot Air Balloon** (Jaipur) - ₹9999

Each experience includes:
- 3 available dates (Nov 15, 16, 17)
- 4 time slots per date
- Varying slot availability (some sold out, some with "X left")

### **10 Promo Codes:**
- SAVE10, FLAT100, WELCOME20, FIRSTBOOKING, ADVENTURE50
- FLAT200, MEGASALE25, WEEKENDVIBES, GETAWAY500, EARLYBIRD

### Clean Database (Optional)

To delete all data and start fresh:

```bash
cd backend
node cleanDb.js
```

⚠️ **Warning:** This will permanently delete all experiences, promo codes, and bookings!

---

## 📚 API Documentation

### Base URL
```
http://localhost:3030/api
```

### Endpoints Overview

#### **Experiences**
```http
GET    /api/experiences          # Get all active experiences with availability
GET    /api/experiences/:id      # Get single experience details
```

#### **Bookings**
```http
POST   /api/bookings             # Create new booking
GET    /api/bookings             # Get all bookings
GET    /api/bookings/:id         # Get booking by ID
```

#### **Promo Codes**
```http
GET    /api/promo                # Get all promo codes
POST   /api/promo/validate       # Validate and apply promo code
```

### Example API Requests

**1. Get All Experiences:**
```bash
curl http://localhost:3030/api/experiences
```

**2. Create Booking:**
```bash
curl -X POST http://localhost:3030/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "experienceId": "67123abc...",
    "date": "2025-11-15",
    "time": "07:00 am",
    "quantity": 2,
    "subtotal": 1998,
    "taxes": 360,
    "discount": 200,
    "total": 2158,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "promoCode": "SAVE10"
  }'
```

**3. Validate Promo Code:**
```bash
curl -X POST http://localhost:3030/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE10",
    "orderAmount": 1998
  }'
```

For complete API documentation, see [backend/README.md](backend/README.md)

---

## 🎫 Available Promo Codes

After seeding, these promo codes will be available:

| Code | Type | Discount | Min Order | Max Discount | Usage Limit |
|------|------|----------|-----------|--------------|-------------|
| **SAVE10** | Percentage | 10% | ₹500 | ₹200 | Unlimited |
| **FLAT100** | Fixed | ₹100 | ₹1000 | - | 100 uses |
| **WELCOME20** | Percentage | 20% | ₹0 | ₹500 | Unlimited |
| **FIRSTBOOKING** | Fixed | ₹250 | ₹2000 | - | 50 uses |
| **ADVENTURE50** | Percentage | 15% | ₹3000 | ₹750 | Unlimited |
| **FLAT200** | Fixed | ₹200 | ₹1500 | - | 75 uses |
| **MEGASALE25** | Percentage | 25% | ₹5000 | ₹1500 | 30 uses |
| **WEEKENDVIBES** | Percentage | 12% | ₹800 | ₹300 | Unlimited |
| **GETAWAY500** | Fixed | ₹500 | ₹4000 | - | 40 uses |
| **EARLYBIRD** | Percentage | 18% | ₹2500 | ₹600 | Unlimited |

💡 **Smart Dropdown Feature:** The booking page automatically shows only promo codes that meet your order's minimum value requirement!

---

## 🚢 Deployment

### Backend Deployment (Render / Railway)

#### Using Render:

1. **Create Account** at [Render.com](https://render.com)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

3. **Configure Build Settings:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

4. **Add Environment Variables:**
   ```
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_CLUSTER_URL=your_cluster_url.mongodb.net
   PORT=3030
   ```

5. **Deploy** and copy your backend URL (e.g., `https://your-app.onrender.com`)

#### Using Railway:

1. **Create Account** at [Railway.app](https://railway.app)
2. **New Project** → Connect GitHub repo → Select `backend` folder
3. Add environment variables (same as above)
4. Deploy

---

### Frontend Deployment (Vercel)

1. **Create Account** at [Vercel.com](https://vercel.com)

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `project` folder as root directory

3. **Configure Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `project`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Add Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```
   ⚠️ Replace with your actual deployed backend URL

5. **Deploy** - Vercel will provide your live URL

---

## 🔧 Development Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
node cleanDb.js    # Clean database (delete all data)
```

### Frontend Scripts
```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Create production build
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### **1. MongoDB Connection Error**
```
MongooseError: Authentication failed
```
**Solutions:**
- Verify MongoDB credentials in `backend/.env`
- Check DB_USERNAME and DB_PASSWORD are correct
- Ensure your IP is whitelisted in MongoDB Atlas Network Access
- Verify cluster URL is correct (no `mongodb://` or `mongodb+srv://` prefix)

#### **2. Port Already in Use**
```
Error: Port 3030 is already in use
```
**Solutions:**

**Windows:**
```powershell
netstat -ano | findstr :3030
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:3030 | xargs kill -9
```

Or change the PORT in `backend/.env` to another value (e.g., `3031`)

#### **3. API Connection Failed (Frontend)**
```
Failed to fetch / Network Error
```
**Solutions:**
- Verify backend server is running (`cd backend && npm run dev`)
- Check `NEXT_PUBLIC_API_URL` in `project/.env.local`
- Ensure URL doesn't have trailing slash
- Check CORS is enabled in backend (already configured)
- Try `http://localhost:3030` instead of `http://127.0.0.1:3030`

#### **4. TypeScript Errors**
```bash
cd project
npm run typecheck  # Check for type errors
rm -rf .next       # Clear Next.js cache
npm install        # Reinstall dependencies
```

#### **5. Module Not Found Errors**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd project
rm -rf node_modules package-lock.json .next
npm install
```

#### **6. Seed Script Fails**
```
Error: Experience validation failed
```
**Solutions:**
- Ensure MongoDB is connected
- Run `node cleanDb.js` first to clear existing data
- Check MongoDB Atlas cluster is active (not paused)

#### **7. Promo Codes Not Showing**
**Solutions:**
- Check browser console for API errors
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure promo codes exist in database (run seed script)
- Check if order meets minimum value requirement

---

## 📝 Key Features Explained

### 1. **Race Condition Prevention**
- Uses MongoDB atomic operations (`$inc`) for slot management
- Prevents double-booking scenarios
- Thread-safe concurrent booking handling

### 2. **Date Format System**
- **Storage:** YYYY-MM-DD format (e.g., `2025-11-15`)
- **Display (Experience Page):** "Nov 15" format
- **Display (Booking Page):** "2025-11-15" format
- **Utility:** `lib/dateUtils.ts` with `formatDateForDisplay()` function

### 3. **Tax Calculation**
- Dynamic 18% GST (configurable per experience)
- Stored in Experience model (`taxRate` field)
- Retrieved from backend automatically
- Displayed in transparent pricing breakdown

### 4. **Form Validation**
- **Inline Errors:** Red borders, error messages below inputs
- **Toast Notifications:** For API operations (booking, promo codes)
- **Real-time Feedback:** Errors clear as user types
- **Required Field Validation:** Name, email, terms checkbox

### 5. **Promo Code Dropdown**
- Fetches all promo codes from backend
- **Smart Filtering:**
  - Minimum order value check
  - Valid date range check
  - Usage limit check
  - Active status check
- **One-click Apply:** Automatically validates on selection
- **Mobile Responsive:** Overlay on mobile, dropdown on desktop

### 6. **Slot Availability Display**
- Shows "X left" when ≤5 slots remain
- Shows "Sold Out" when no slots available
- Real-time updates prevent overbooking
- Color-coded urgency indicators

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**DEEN-42**
- GitHub: [@DEEN-42](https://github.com/DEEN-42)
- Repository: [Highway-Delite](https://github.com/DEEN-42/Highway-Delite)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database
- [Vercel](https://vercel.com/) - Frontend Deployment
- [Render](https://render.com/) - Backend Deployment

---

## 📞 Support

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Open an issue on GitHub

---

**⭐ If you found this project helpful, please give it a star!**

---

Made with ❤️ for adventure enthusiasts by DEEN-42
