module.exports = {
    settings: {
        "parser": {
            "enabled": true,
            "multipart": true,
            "formLimit": "500mb",
            "jsonLimit": "500mb",
            "formidable": {
                "maxFileSize": 524288000
            }
        }
    },
};