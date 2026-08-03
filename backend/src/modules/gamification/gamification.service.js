const Gamification = require("./gamification.model");

const xpMap = {
    lecture: 10,
    assignment: 50,
    quiz: 100,
    course: 500,
};

const awardXP = async (studentId, activity) => {

    const xpEarned = xpMap[activity];

    if (!xpEarned) {
        throw new Error("Invalid activity");
    }

    let profile = await Gamification.findOne({
        student: studentId,
    });

    if (!profile) {

        profile = await Gamification.create({
            student: studentId,
        });

    }

    profile.xp += xpEarned;

    profile.level = Math.floor(profile.xp / 500) + 1;

    profile.lastActivity = new Date();

    // Badges
    if (
        profile.xp >= 500 &&
        !profile.badges.includes("Beginner")
    ) {
        profile.badges.push("Beginner");
    }

    if (
        profile.xp >= 1000 &&
        !profile.badges.includes("Intermediate")
    ) {
        profile.badges.push("Intermediate");
    }

    if (
        profile.xp >= 2000 &&
        !profile.badges.includes("Advanced")
    ) {
        profile.badges.push("Advanced");
    }

    await profile.save();

    return profile;

};

const getProfile = async (studentId) => {

    const profile = await Gamification.findOne({
        student: studentId,
    }).populate(
        "student",
        "name email"
    );

    if (!profile) {

        return {
            student: null,
            xp: 0,
            level: 1,
            badges: [],
            streak: 0,
            lastActivity: null,
        };

    }

    return profile;

};

const getLeaderboard = async () => {

    const leaderboard = await Gamification.find()
        .populate(
            "student",
            "name email"
        )
        .sort({ xp: -1 })
        .limit(10);

    return leaderboard;

};

module.exports = {
    awardXP,
    getProfile,
    getLeaderboard,
};