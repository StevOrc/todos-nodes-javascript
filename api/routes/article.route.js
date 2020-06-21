const express = require('express');
const router = express.Router();
const {Article, validate} = require('../models/article.model');

router.get('/', async (req, res) => {
    const articles = await Article.find();
    if(!articles) res.status(404).send('No articles found in DB');

    res.status(200).send(articles);
});

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) res.status(404).send('No articles found in DB');

    res.status(200).send(article);
});

router.post('/', async (req, res) => {
    
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;