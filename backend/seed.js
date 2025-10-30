import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from './db.js';
import { Experience } from './model/Experience.js';
import { PromoCode } from './model/PromoCode.js';

const seedData = async () => {
  try {
    await connectToDatabase();
    
    console.log('Seeding database...');
    
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    
    const experiences = [
      {
        title: 'Kayaking',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        location: 'Udupi',
        price: 999,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/1497225/pexels-photo-1497225.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Water Sports',
        aboutText: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
        minAge: 10,
        duration: '2 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 6 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 10 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 5 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 2 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 5 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 10 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 6 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '07:00 am', totalSlots: 10, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 10, bookedSlots: 6 },
              { time: '11:00 am', totalSlots: 10, bookedSlots: 10 },
              { time: '01:00 pm', totalSlots: 10, bookedSlots: 5 }
            ]
          }
        ]
      },
      {
        title: 'Nandi Hills Sunrise',
        description: 'Early morning trek to witness the breathtaking sunrise from Nandi Hills.',
        location: 'Bangalore',
        price: 899,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Trekking',
        aboutText: 'Experience the magical sunrise from 1478m above sea level. Guided trek with breakfast included.',
        minAge: 12,
        duration: '4 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '04:00 am', totalSlots: 15, bookedSlots: 10 },
              { time: '04:30 am', totalSlots: 15, bookedSlots: 15 },
              { time: '05:00 am', totalSlots: 15, bookedSlots: 11 },
              { time: '05:30 am', totalSlots: 15, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '04:00 am', totalSlots: 15, bookedSlots: 11 },
              { time: '04:30 am', totalSlots: 15, bookedSlots: 0 },
              { time: '05:00 am', totalSlots: 15, bookedSlots: 15 },
              { time: '05:30 am', totalSlots: 15, bookedSlots: 10 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '04:00 am', totalSlots: 15, bookedSlots: 15 },
              { time: '04:30 am', totalSlots: 15, bookedSlots: 10 },
              { time: '05:00 am', totalSlots: 15, bookedSlots: 0 },
              { time: '05:30 am', totalSlots: 15, bookedSlots: 11 }
            ]
          }
        ]
      },
      {
        title: 'Coffee Trail',
        description: 'Explore the coffee plantations and learn about coffee processing from bean to cup.',
        location: 'Coorg',
        price: 1299,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Cultural',
        aboutText: 'Walk through lush coffee estates, learn traditional processing methods, and enjoy fresh brew.',
        minAge: 8,
        duration: '3 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '09:00 am', totalSlots: 20, bookedSlots: 16 },
              { time: '11:00 am', totalSlots: 20, bookedSlots: 20 },
              { time: '02:00 pm', totalSlots: 20, bookedSlots: 15 },
              { time: '04:00 pm', totalSlots: 20, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '09:00 am', totalSlots: 20, bookedSlots: 15 },
              { time: '11:00 am', totalSlots: 20, bookedSlots: 0 },
              { time: '02:00 pm', totalSlots: 20, bookedSlots: 20 },
              { time: '04:00 pm', totalSlots: 20, bookedSlots: 16 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '09:00 am', totalSlots: 20, bookedSlots: 0 },
              { time: '11:00 am', totalSlots: 20, bookedSlots: 16 },
              { time: '02:00 pm', totalSlots: 20, bookedSlots: 20 },
              { time: '04:00 pm', totalSlots: 20, bookedSlots: 15 }
            ]
          }
        ]
      },
      {
        title: 'Scuba Diving',
        description: 'Discover the underwater world with certified instructors. Equipment provided.',
        location: 'Goa',
        price: 2499,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Water Sports',
        aboutText: 'Beginner-friendly scuba diving experience. Full safety briefing and equipment included.',
        minAge: 14,
        duration: '3 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '08:00 am', totalSlots: 8, bookedSlots: 4 },
              { time: '10:00 am', totalSlots: 8, bookedSlots: 8 },
              { time: '01:00 pm', totalSlots: 8, bookedSlots: 3 },
              { time: '03:00 pm', totalSlots: 8, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '08:00 am', totalSlots: 8, bookedSlots: 0 },
              { time: '10:00 am', totalSlots: 8, bookedSlots: 4 },
              { time: '01:00 pm', totalSlots: 8, bookedSlots: 8 },
              { time: '03:00 pm', totalSlots: 8, bookedSlots: 3 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '08:00 am', totalSlots: 8, bookedSlots: 3 },
              { time: '10:00 am', totalSlots: 8, bookedSlots: 8 },
              { time: '01:00 pm', totalSlots: 8, bookedSlots: 0 },
              { time: '03:00 pm', totalSlots: 8, bookedSlots: 4 }
            ]
          }
        ]
      },
      {
        title: 'Paragliding',
        description: 'Soar through the skies with tandem paragliding. Experience the thrill of flying.',
        location: 'Bir Billing',
        price: 3500,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: 'Tandem flights with experienced pilots. Capture stunning aerial views of Himalayas.',
        minAge: 16,
        duration: '20-30 minutes',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '09:00 am', totalSlots: 6, bookedSlots: 2 },
              { time: '11:00 am', totalSlots: 6, bookedSlots: 6 },
              { time: '02:00 pm', totalSlots: 6, bookedSlots: 1 },
              { time: '04:00 pm', totalSlots: 6, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '09:00 am', totalSlots: 6, bookedSlots: 1 },
              { time: '11:00 am', totalSlots: 6, bookedSlots: 6 },
              { time: '02:00 pm', totalSlots: 6, bookedSlots: 0 },
              { time: '04:00 pm', totalSlots: 6, bookedSlots: 2 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '09:00 am', totalSlots: 6, bookedSlots: 6 },
              { time: '11:00 am', totalSlots: 6, bookedSlots: 2 },
              { time: '02:00 pm', totalSlots: 6, bookedSlots: 1 },
              { time: '04:00 pm', totalSlots: 6, bookedSlots: 0 }
            ]
          }
        ]
      },
      {
        title: 'Wildlife Safari',
        description: 'Jeep safari through the national park to spot tigers, elephants, and more.',
        location: 'Jim Corbett',
        price: 1799,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Wildlife',
        aboutText: 'Expert naturalist-guided safari. Explore diverse wildlife in their natural habitat.',
        minAge: 6,
        duration: '4 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '06:00 am', totalSlots: 15, bookedSlots: 11 },
              { time: '09:00 am', totalSlots: 15, bookedSlots: 15 },
              { time: '02:00 pm', totalSlots: 15, bookedSlots: 10 },
              { time: '05:00 pm', totalSlots: 15, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '06:00 am', totalSlots: 15, bookedSlots: 0 },
              { time: '09:00 am', totalSlots: 15, bookedSlots: 10 },
              { time: '02:00 pm', totalSlots: 15, bookedSlots: 15 },
              { time: '05:00 pm', totalSlots: 15, bookedSlots: 11 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '06:00 am', totalSlots: 15, bookedSlots: 15 },
              { time: '09:00 am', totalSlots: 15, bookedSlots: 11 },
              { time: '02:00 pm', totalSlots: 15, bookedSlots: 0 },
              { time: '05:00 pm', totalSlots: 15, bookedSlots: 10 }
            ]
          }
        ]
      },
      {
        title: 'White Water Rafting',
        description: 'Navigate through rapids in the holy Ganges. Adrenaline-packed adventure.',
        location: 'Rishikesh',
        price: 1499,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/12133283/pexels-photo-12133283.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: '16km rafting stretch with grade 2-3 rapids. Safety equipment and training provided.',
        minAge: 14,
        duration: '3-4 hours',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '08:00 am', totalSlots: 30, bookedSlots: 25 },
              { time: '10:00 am', totalSlots: 30, bookedSlots: 30 },
              { time: '01:00 pm', totalSlots: 30, bookedSlots: 26 },
              { time: '03:00 pm', totalSlots: 30, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '08:00 am', totalSlots: 30, bookedSlots: 30 },
              { time: '10:00 am', totalSlots: 30, bookedSlots: 26 },
              { time: '01:00 pm', totalSlots: 30, bookedSlots: 0 },
              { time: '03:00 pm', totalSlots: 30, bookedSlots: 25 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '08:00 am', totalSlots: 30, bookedSlots: 0 },
              { time: '10:00 am', totalSlots: 30, bookedSlots: 25 },
              { time: '01:00 pm', totalSlots: 30, bookedSlots: 30 },
              { time: '03:00 pm', totalSlots: 30, bookedSlots: 26 }
            ]
          }
        ]
      },
      {
        title: 'Hot Air Balloon',
        description: 'Float above the beautiful landscape at sunrise. Unforgettable aerial views.',
        location: 'Jaipur',
        price: 9999,
        taxRate: 0.18,
        image: 'https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Adventure',
        aboutText: '1-hour balloon ride over palaces and forts. Includes breakfast and certificate.',
        minAge: 8,
        duration: '2 hours (1 hour flight)',
        availableDates: [
          {
            date: '2025-11-15',
            times: [
              { time: '05:30 am', totalSlots: 6, bookedSlots: 2 },
              { time: '06:00 am', totalSlots: 6, bookedSlots: 6 },
              { time: '06:30 am', totalSlots: 6, bookedSlots: 1 },
              { time: '07:00 am', totalSlots: 6, bookedSlots: 0 }
            ]
          },
          {
            date: '2025-11-16',
            times: [
              { time: '05:30 am', totalSlots: 6, bookedSlots: 1 },
              { time: '06:00 am', totalSlots: 6, bookedSlots: 6 },
              { time: '06:30 am', totalSlots: 6, bookedSlots: 0 },
              { time: '07:00 am', totalSlots: 6, bookedSlots: 2 }
            ]
          },
          {
            date: '2025-11-17',
            times: [
              { time: '05:30 am', totalSlots: 6, bookedSlots: 6 },
              { time: '06:00 am', totalSlots: 6, bookedSlots: 2 },
              { time: '06:30 am', totalSlots: 6, bookedSlots: 1 },
              { time: '07:00 am', totalSlots: 6, bookedSlots: 0 }
            ]
          }
        ]
      }
    ];
    
    await Experience.insertMany(experiences);
    console.log('✅ Experiences seeded successfully');
    
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
      },
      {
        code: 'ADVENTURE50',
        discountType: 'percentage',
        discountValue: 15,
        minOrderValue: 3000,
        maxDiscount: 750,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: null,
        isActive: true
      },
      {
        code: 'FLAT200',
        discountType: 'fixed',
        discountValue: 200,
        minOrderValue: 1500,
        maxDiscount: null,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: 75,
        isActive: true
      },
      {
        code: 'MEGASALE25',
        discountType: 'percentage',
        discountValue: 25,
        minOrderValue: 5000,
        maxDiscount: 1500,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: 30,
        isActive: true
      },
      {
        code: 'WEEKENDVIBES',
        discountType: 'percentage',
        discountValue: 12,
        minOrderValue: 800,
        maxDiscount: 300,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: null,
        isActive: true
      },
      {
        code: 'GETAWAY500',
        discountType: 'fixed',
        discountValue: 500,
        minOrderValue: 4000,
        maxDiscount: null,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: 40,
        isActive: true
      },
      {
        code: 'EARLYBIRD',
        discountType: 'percentage',
        discountValue: 18,
        minOrderValue: 2500,
        maxDiscount: 600,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        maxUses: null,
        isActive: true
      }
    ];
    
    await PromoCode.insertMany(promoCodes);
    console.log('✅ Promo codes seeded successfully');
    
    console.log('✅ Database seeded successfully!');
    console.log('\n🎉 Available Promo Codes:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('- SAVE10: 10% off (max ₹200) on orders above ₹500');
    console.log('- FLAT100: ₹100 off on orders above ₹1000');
    console.log('- WELCOME20: 20% off (max ₹500) - No minimum');
    console.log('- FIRSTBOOKING: ₹250 off on orders above ₹2000');
    console.log('- ADVENTURE50: 15% off (max ₹750) on orders above ₹3000');
    console.log('- FLAT200: ₹200 off on orders above ₹1500');
    console.log('- MEGASALE25: 25% off (max ₹1500) on orders above ₹5000');
    console.log('- WEEKENDVIBES: 12% off (max ₹300) on orders above ₹800');
    console.log('- GETAWAY500: ₹500 off on orders above ₹4000');
    console.log('- EARLYBIRD: 18% off (max ₹600) on orders above ₹2500');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
