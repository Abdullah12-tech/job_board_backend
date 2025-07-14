const jobModel = require("../models/jobModel");


const getJobs = async (req, res,next) => {
  try {
    const userId = req?.user?._id // Replace with actual userId from auth
    const jobs = await jobModel.find({ postedBy: userId });
    const mappedJobs = jobs.map(job => ({
      id: job._id,
      title: job.title,
      applicants: job.applicants || 0,
      status: job.status || 'Active',
      posted: new Date(job.datePosted).toLocaleDateString(),
      views: job.views || 0,
      description: job.description,
      type: job.type,
      workType: job.workType
    }));
    res.json(mappedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    next(error);
  }
};

const updateJob = async (req, res,next) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      type: req.body.type,
      workType: req.body.workType
    };
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, updatedData, { new: true });
    const mappedJob = {
      id: updatedJob._id,
      title: updatedJob.title,
      applicants: updatedJob.applicants || 0,
      status: updatedJob.status || 'Active',
      posted: new Date(updatedJob.datePosted).toLocaleDateString(),
      views: updatedJob.views || 0,
      description: updatedJob.description,
      type: updatedJob.type,
      workType: updatedJob.workType
    };
    res.json({ message: 'Job updated successfully', job: mappedJob });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    next(error)
  }
};

module.exports = {
    getJobs,
    updateJob
}