import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from './db.js';
import { Experience } from './model/Experience.js';
import { PromoCode } from './model/PromoCode.js';
import { Booking } from './model/Booking.js';

const cleanDatabase = async () => {
  try {
    await connectToDatabase();
    
    console.log('🧹 Cleaning database...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Delete all experiences
    const experiencesDeleted = await Experience.deleteMany({});
    console.log(`✅ Deleted ${experiencesDeleted.deletedCount} experiences`);
    
    // Delete all promo codes
    const promosDeleted = await PromoCode.deleteMany({});
    console.log(`✅ Deleted ${promosDeleted.deletedCount} promo codes`);
    
    // Delete all bookings
    const bookingsDeleted = await Booking.deleteMany({});
    console.log(`✅ Deleted ${bookingsDeleted.deletedCount} bookings`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Database cleaned successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    process.exit(1);
  }
};

cleanDatabase();
