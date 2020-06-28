import './assets/styles/styles.scss';
import './index.scss';

const articleContainerElement = document.querySelector('.articles-container');
const baseURL = 'http://localhost:3000/api/articles/';
let articles = [];

const createArticle = () => {
    const articleNodes = articles.map( article => {
        return articleNode(article);
    });
    articleContainerElement.innerHTML = '';
    articleContainerElement.append(...articleNodes);
}

const fetchAllArticles = async () => {
    try{
        const response = await fetch(baseURL);
        const data = await response.json();
        articles = data;
        createArticle();
    }catch(e){
        console.log(e);
    }
}

const articleNode = (article) => {
    const articleDOM = document.createElement('div');
    articleDOM.classList.add('article');
    articleDOM.innerHTML = `
    <img src="${article.img}" alt="lego-profile">
    <h2>${article.title}</h2>
    <p class="article-author">${article.author}</p>
    <p class="article-content">${article.content}</p>
    <div class="article-action">
        <button class="btn btn-danger" data-id="${article._id}">Supprimer</button>
    </div>
    `
    return articleDOM;
}

fetchAllArticles();