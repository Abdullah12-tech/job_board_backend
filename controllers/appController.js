const appModel = require("../models/appModel");
const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");
const sendApplicationFeedback = require("../services/nodemailer/sendApplication");

const getAllApplicationsForCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    const applications = await appModel.find({ applicants: user._id }).populate("jobID")
    if (!applications.length) {
      return res.status(400).json({
        message: "No application found for this user",
        status: "error"
      });
    }
    return res.status(200).json(applications);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const applyJob = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Resume file not found", status: "error" });
  }

  const resume = req.file.path;
  const {jobID} = req.params;
  const {coverLetterText } = req.body;

  try {
    const userId = req.user?._id;

    const alreadyApplied = await appModel.findOne({ applicants: userId, jobID: jobID });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job", status: "error" });
    }

    const application = await appModel.create({
      coverLetterText,
      resume,
      applicants: userId,
      jobID: jobID
    });

    if (!application) {
      return res.status(400).json({ message: "Application failed", status: "error" });
    }

    const credentials = await appModel.findById(application._id).populate("jobID applicants");
    const job = await jobModel.findById(credentials.jobID._id).populate("postedBy");
    const employer = await EmployerModel.findOne({userId: job?.postedBy?._id});
    if(!employer){
        res.status(400).json({
            message: "employer not found",
            status: "error"
        })
    }

    await sendApplicationFeedback({
      applicantEmail: credentials?.applicants?.email,
      applicantName: credentials?.applicants?.name?.split(" ")[0] || "Applicant",
      jobTitle: credentials.jobID?.title,
      companyName: employer?.companyName || "the company"
    });

    return res.status(200).json({
      message: "Application submitted successfully",
      status: "success",
      application
    });

  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getAllApplicationsForCurrentUser,
  applyJob
};
