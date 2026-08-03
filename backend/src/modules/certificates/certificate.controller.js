const { get } = require("mongoose");
const {
    generateCertificate,
    getMyCertificates,
    getCertificateById,
} = require("./certificate.service");

const generate = async (req, res) => {

    try {
        const certificate =
            await generateCertificate(
                req.user.id,
                req.params.courseId
            );
        res.status(201).json({
            success: true,
            message:
                "Certificate generated successfully",
            data: certificate,
        });

    } catch (error) {
        const errors = [
            "Course not found",
            "Student not enrolled",
            "Course not completed",
            "Certificate already generated",
        ];
        if (errors.includes(error.message)) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMine = async (req, res) => {

    try {
        const certificates =
            await getMyCertificates(req.user.id);
        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOne = async (req, res) => {

    try {
        const certificate =
            await getCertificateById(
                req.params.certificateId,
                req.user.id
            );

        res.status(200).json({
            success: true,
            data: certificate,
        });

    } catch (error) {
        if (
            error.message ===
            "Certificate not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generate,
    getMine,
    getOne,
};