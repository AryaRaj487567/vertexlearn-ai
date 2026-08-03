const Certificate = require("./certificate.model");
const Enrollment = require("../enrollments/enrollment.model");
const Course = require("../courses/course.model");
const Progress = require("../progress/progress.model");

const generateCertificate = async (studentId, courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const enrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if (!enrollment) {
        throw new Error("Student not enrolled");
    }

    const progress = await Progress.findOne({
        student: studentId,
        course: courseId,
    });

    if (!progress || progress.percentage < 100) {
        throw new Error("Course not completed");
    }

    const existingCertificate = await Certificate.findOne({
        student: studentId,
        course: courseId,
    });

    if (existingCertificate) {
        throw new Error("Certificate already generated");
    }

    const certificate = await Certificate.create({
        student: studentId,
        course: courseId,
        certificateId:
            "CERT-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 10000),
    });

    return certificate;
};

const getMyCertificates = async (studentId) => {

    const certificates = await Certificate.find({
        student: studentId,
    })
        .populate("course", "title category level")
        .sort({ issuedAt: -1 });

    return certificates;
};

const getCertificateById = async (
    certificateId,
    studentId
) => {

    const certificate =
        await Certificate.findOne({
            certificateId: certificateId,
            student: studentId,
        })
            .populate(
                "course",
                "title category level description"
            )
            .populate(
                "student",
                "name email"
            );

    if (!certificate) {
        throw new Error("Certificate not found");
    }

    return certificate;
};

module.exports = {
    generateCertificate,
    getMyCertificates,
    getCertificateById,
};