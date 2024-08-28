const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title : joi.string().required(),
        description :joi.string().required(),
        image: joi.object({
            filename: joi.string().allow(''),
            url: joi.string().default("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"),
        }),
    
        price : joi.number().required().min(0),
        location :joi.string().required(),
        country :joi.string().required(),
        
    }),
});

module.exports.riviewSchema = joi.object({
    review : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required()
    }).required(),
});