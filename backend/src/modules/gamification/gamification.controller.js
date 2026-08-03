const {
    awardXP,
    getProfile,
    getLeaderboard,
} = require("./gamification.service");

const award = async (req, res) => {

    try {
        const profile = await awardXP(
            req.user.id,
            req.body.activity
        );
        res.status(200).json({
            success: true,
            message: "XP awarded successfully",
            data: profile,
       });
    } catch (error) {
        if (error.message === "Invalid activity") {

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

const profile = async (req, res) => {

    try {
        const gamificationProfile =
            await getProfile(req.user.id);

        res.status(200).json({
            success: true,
            data: gamificationProfile,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const leaderboard = async (req, res) => {

    try {
        const rankings =
            await getLeaderboard();

        res.status(200).json({
            success: true,
            count: rankings.length,
            data: rankings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    award,
    profile,
    leaderboard,
};