import { Experience } from '../model/Experience.js';

// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .select('_id title location price image description')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences',
      error: error.message
    });
  }
};

// Get single experience by ID with slot availability
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    // Calculate available slots for each time
    const availabilityData = experience.availableDates.map(dateSlot => ({
      date: dateSlot.date,
      times: dateSlot.times.map(timeSlot => ({
        time: timeSlot.time,
        slots: timeSlot.totalSlots - timeSlot.bookedSlots
      }))
    }));
    
    res.status(200).json({
      success: true,
      data: {
        ...experience.toObject(),
        availability: availabilityData
      }
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience details',
      error: error.message
    });
  }
};

// Create new experience (Admin)
export const createExperience = async (req, res) => {
  try {
    const experienceData = req.body;
    
    const experience = await Experience.create(experienceData);
    
    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create experience',
      error: error.message
    });
  }
};

// Update experience (Admin)
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const experience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update experience',
      error: error.message
    });
  }
};

// Delete experience (Admin)
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience',
      error: error.message
    });
  }
};
