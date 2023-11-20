const TzadikIdentity = require("../objects/TzadikIdentityModel");
const User = require("../objects/UserModel");

const getTzadikById = async (id)=>{
    try {
        const tzadik = await TzadikIdentity.findOne({
            where: {
                tzadik_id: id
            }
        });
        return tzadik;
    } catch (error) {
        console.error('Error finding tzadik with id: ', id);
        throw error;
    }
};

const getUserById = async (id)=>{
    try {
        const user = await User.findOne({
            where: {
                personal_id: id
            }
        });
        return user;
    } catch (error) {
        console.error('Error finding user with personal id: ', id);
        throw error;
    }
};

const isTzadikExist = async (tzadikId) => {
    try {
        const tzadik = await TzadikIdentity.findOne({
            where: {
                tzadik_id: tzadikId
            }
        });
        return await tzadik !== null;
    } catch (error) {
        console.error('Error checking if Tzadik exists:', error.message);
        throw error;
    }
};

const isUserExist = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                personal_id: userId
            }
        });
        return await user !== null;
    } catch (error) {
        console.error('Error checking if user exists:', error.message);
        throw error;
    }
};

// Function to check if Tzadik report is legal
const checkIfReportLegal = async (body) => {
    try {
        const tzadikId = body.tzadik_id;
        const reporterId = body.reporter_id;
        // Check if Tzadik exists
        const isTzadikExistResult = await isTzadikExist(tzadikId);
        if (!isTzadikExistResult) {
            return { legal: false, message: 'Tzadik does not exist' };
        }

        // Check if user (reporter) exists
        const isUserExistResult = await isUserExist(reporterId);
        if (!isUserExistResult) {
            return { legal: false, message: 'Reporter does not exist' };
        }

        return { legal: true, message: 'Report is legal' };
    } catch (error) {
        console.error('Error checking report legality:', error.message);
        throw error;
    }
};

module.exports = {
    getTzadikById,
    getUserById,
    isTzadikExist,
    isUserExist,
    checkIfReportLegal
};

