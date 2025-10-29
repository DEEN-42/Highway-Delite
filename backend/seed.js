import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from './db.js';
import { Experience } from './model/Experience.js';
import { PromoCode } from './model/PromoCode.js';

const seedData = async () => {
  try {
    await connectToDatabase();
    
    console.log('Seeding database...');
    
    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    
    // Create experiences
    const experiences = [
      {
        title: 'Kayaking',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        location: 'Udupi',
        price: 999,
        image: 'https://images.pexels.com/photos/1497225/pexels-photo-1497225.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Water Sports',
        aboutText: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
        minAge: 10,
        duration: '2 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 6 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 8 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 7 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 10 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 0 }
            ]
          },
          {
            date: 'Oct 24',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 0 }
            ]
          },
          {
            date: 'Oct 25',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 0 }
            ]
          },
          {
            date: 'Oct 26',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Nandi Hills Sunrise',
        description: 'Early morning trek to witness the breathtaking sunrise from Nandi Hills.',
        location: 'Bangalore',
        price: 899,
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Trekking',
        aboutText: 'Experience the magical sunrise from 1478m above sea level. Guided trek with breakfast included.',
        minAge: 12,
        duration: '4 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '04:00 am', totalSlots: 15, bookedSlots: 0 },
              { time: '04:30 am', totalSlots: 15, bookedSlots: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '04:00 am', totalSlots: 15, bookedSlots: 0 },
              { time: '04:30 am', totalSlots: 15, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Coffee Trail',
        description: 'Explore the coffee plantations and learn about coffee processing from bean to cup.',
        location: 'Coorg',
        price: 1299,
        image: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Cultural',
        aboutText: 'Walk through lush coffee estates, learn traditional processing methods, and enjoy fresh brew.',
        minAge: 8,
        duration: '3 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '09:00 am', totalSlots: 20, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 20, bookedSlots: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '09:00 am', totalSlots: 20, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 20, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Scuba Diving',
        description: 'Discover the underwater world with certified instructors. Equipment provided.',
        location: 'Goa',
        price: 2499,
        image: 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Water Sports',
        aboutText: 'Beginner-friendly scuba diving experience. Full safety briefing and equipment included.',
        minAge: 14,
        duration: '3 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '08:00 am', totalSlots: 8, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 8, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 8, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Paragliding',
        description: 'Soar through the skies with tandem paragliding. Experience the thrill of flying.',
        location: 'Bir Billing',
        price: 3500,
        image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: 'Tandem flights with experienced pilots. Capture stunning aerial views of Himalayas.',
        minAge: 16,
        duration: '20-30 minutes',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '10:00 am', totalSlots: 12, bookedSlots: 0 },
              { time: '12:00 pm', totalSlots: 12, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 12, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Wildlife Safari',
        description: 'Jeep safari through the national park to spot tigers, elephants, and more.',
        location: 'Jim Corbett',
        price: 1799,
        image: 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Wildlife',
        aboutText: 'Expert naturalist-guided safari. Explore diverse wildlife in their natural habitat.',
        minAge: 6,
        duration: '4 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '06:00 am', totalSlots: 25, bookedSlots: 0 },
              { time: '03:00 pm', totalSlots: 25, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'White Water Rafting',
        description: 'Navigate through rapids in the holy Ganges. Adrenaline-packed adventure.',
        location: 'Rishikesh',
        price: 1499,
        image: 'https://images.pexels.com/photos/4379506/pexels-photo-4379506.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: '16km rafting stretch with grade 2-3 rapids. Safety equipment and training provided.',
        minAge: 14,
        duration: '3-4 hours',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '08:00 am', totalSlots: 30, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 30, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 30, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Hot Air Balloon',
        description: 'Float above the beautiful landscape at sunrise. Unforgettable aerial views.',
        location: 'Jaipur',
        price: 9999,
        image: 'https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: '1-hour balloon ride over palaces and forts. Includes breakfast and certificate.',
        minAge: 8,
        duration: '2 hours (1 hour flight)',
        availableDates: [
          {
            date: 'Oct 22',
            times: [
              { time: '05:30 am', totalSlots: 6, bookedSlots: 0 },
              { time: '06:00 am', totalSlots: 6, bookedSlots: 0 }
            ]
          }
        ]
      }
    ];
    
    await Experience.insertMany(experiences);
    console.log('✅ Experiences seeded successfully');
    
    // Create promo codes
    const promoCodes = [
      {
        code: 'SAVE10',
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 500,
        maxDiscount: 200,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: null,
        isActive: true
      },
      {
        code: 'FLAT100',
        discountType: 'fixed',
        discountValue: 100,
        minOrderValue: 1000,
        maxDiscount: null,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: 100,
        isActive: true
      },
      {
        code: 'WELCOME20',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 0,
        maxDiscount: 500,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: null,
        isActive: true
      },
      {
        code: 'FIRSTBOOKING',
        discountType: 'fixed',
        discountValue: 250,
        minOrderValue: 2000,
        maxDiscount: null,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: 50,
        isActive: true
      }
    ];
    
    await PromoCode.insertMany(promoCodes);
    console.log('✅ Promo codes seeded successfully');
    
    console.log('✅ Database seeded successfully!');
    console.log('\nAvailable Promo Codes:');
    console.log('- SAVE10: 10% off (max ₹200)');
    console.log('- FLAT100: ₹100 off on orders above ₹1000');
    console.log('- WELCOME20: 20% off (max ₹500)');
    console.log('- FIRSTBOOKING: ₹250 off on orders above ₹2000');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
