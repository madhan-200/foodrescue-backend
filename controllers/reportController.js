const Report = require('../models/Report');
const createReport = async (req, res) => {
  try {
    const { userId, reportType, description } = req.body;

    
    const newReport = new Report({
      userId,
      reportType,
      description
    });

    await newReport.save();  
    res.status(201).json({
      message: 'Report created successfully',
      report: newReport
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating report',
      error: error.message
    });
  }
};
const getReports = async (req, res) => {
    try {
      const reports = await Report.find().populate('userId', 'name email role');  
      res.status(200).json(reports); 
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching reports',
        error: error.message
      });
    }
  };
  
  
  const deleteReport = async (req, res) => {
    try {
      const { id } = req.params;
      await Report.findByIdAndDelete(id); 
  
      res.status(200).json({
        message: 'Report deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting report',
        error: error.message
      });
    }
  };
  
  module.exports = { createReport, getReports, deleteReport };  