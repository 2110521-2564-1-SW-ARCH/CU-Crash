require("../config_env");

const { getOsEnv } = require("./lib/env/utils");

exports.env = {
    // sign: getOsEnv('SIGN'),
    // node: process.env.NODE_ENV,
    port: 5567,
    // log: {
    //     level: getOsEnv('LOG_LEVEL')
    // },
    // db: {
    //     host: getOsEnv('HOST_DATABASE'),
    //     port: getOsEnv('PORT_DATABASE') || 3306,
    //     username: getOsEnv('USERNAME_DATABASE'),
    //     password: getOsEnv('PASSWORD_DATABASE'),
    //     database: getOsEnv('NAME_DATABASE')
    // },
    // saltround: getOsEnv('SALTROUND'),
    // prefix: getOsEnv('PREFIX'),
    // version_api: getOsEnv('VERSION_PATH'),
    // lark_default: getOsEnv('URL_LARK_DEFUALT')
}
