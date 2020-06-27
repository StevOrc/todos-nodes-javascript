const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    category: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    }
});

const Article = mongoose.model('Article', schema);

const validateArticle = (article) => {
    const schema = Joi.object({
        author: Joi.string().min(4).max(100).required(),
        category: Joi.string().min(4).max(100).required(),
        content: Joi.string().min(4).max(255).required()
    });

    return schema.validate(article);
}

exports.Article = Article;
exports.validate = validateArticle;