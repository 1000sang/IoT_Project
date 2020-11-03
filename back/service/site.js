const { Site } = require('../models');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    BadSiteDataError: createError('BadSiteDataError'),
    DuplicateSiteError: createError('DuplicateSiteError'),
    FailureCreateSite: createError('FailureCreateSite'),
    SiteCodeNotFound: createError('SiteCodeNotFound'),
    UnknownError: createError('UnkownError')
})

exports.findOneSite = async (siteCode) => {
    const exSite = await Site.findOne({
        where: {
            siteCode: siteCode
        }
    })
    if (exSite) {
        throw new Errors.DuplicateSiteError()
    }
    return exSite;
}

exports.findOneBySiteCode = async (siteCode) => {
    const findOneBySiteCode = await Site.findOne({
        where: {
            siteCode: siteCode
        }
    })
    if (!findOneBySiteCode) {
        throw new Errors.SiteCodeNotFound()
    }
    return findOneBySiteCode
}

// exports.findUser = async ({ email }) => {
//     const findUser = await User.findOne({
//         where: {
//             email: email
//         }
//     });
//     if (!findUser) {
//         throw new Errors.FailureSignIn()
//     }
//     return findUser;
// }

exports.createSite = async (payload) => {
    try {
        return await Site.create({
            siteCode: payload.siteCode,
            siteName: payload.siteName
        })
    } catch (err) {
        switch (err.name) {
            case 'ValidationError':
                throw new Errors.BadSiteDataError(err.message)
            default:
                throw new Errors.UnknownError(err.message)
        }
    }
}

