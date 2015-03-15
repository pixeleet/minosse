var validator = require('validator');

module.exports = {
    'email': validator.isEmail,
    'url': validator.isURL,
    'fqdn': validator.isFQDN,
    'ip': validator.isIP,
    'alpha': validator.isAlpha,
    'numeric': validator.isNumeric,
    'alphanumeric': validator.isAlphanumeric,
    'base64': validator.isBase64,
    'hexadecimal': validator.isHexadecimal,
    'hexcolor': validator.isHexColor,
    'lowercase': validator.isLowercase,
    'uppercase': validator.isUppercase,
    'int': validator.isInt,
    'float': validator.isFloat,
    'uuid': validator.isUUID,
    'json': validator.isJSON,
    'ascii': validator.isAscii
};
