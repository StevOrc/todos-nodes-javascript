const express = require('express');
const router = express.Router();
const {Article, validate} = require('../models/article.model');
const error404NotFoundId = require('../utils/error404NotFoundId');
const isValidObjectId = require('../middleware/isValidObjectId');

router.get('/', async (req, res) => {
    const articles = await Article.find();
    if(!articles.length) return res.status(404).send({message: 'No article found in DB...'});

    res.status(200).send(articles);
});

router.get('/:id',isValidObjectId, async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send('No articles found in DB');

    res.status(200).send(article);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const {author, category, content, title, img} = req.body;
    let article = new Article({
        author, category, content, title, img
    });
    article = await article.save();
    res.status(200).send(article);
});

router.put('/:id', isValidObjectId, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {author, content, category, title, img} = req.body;
    let article = await Article.findByIdAndUpdate(req.params.id, {
        author, category, content, title, img
    }, {new: true, useFindAndModify: false});
    
    if(!article) return res.status(404).send('Article not found with the given ID...');
    res.status(200).send(article);
});

router.delete('/all', async (req, res) => {
    const result = await Article.deleteMany()
    if(result.deletedCount === 0) return res.status(404).send('No article found with the given ID...');

    res.status(200).send(result);
});

router.delete('/:id', isValidObjectId, async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id, {useFindAndModify: false});
    if(!article) return error404NotFoundId('Todo', res);

    res.status(200).send(article);
});

module.exports = router;