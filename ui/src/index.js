import './assets/styles/styles.scss';
import './index.scss';

let articles = [];
const baseUrl = 'http://localhost:3000/api/articles/';

const getAllArticles = async () => {
    let response = await fetch(baseUrl);
    console.log(response.json());
    // response = JSON.stringify(response);
    // articles = response;
    // console.log(response);
}

getAllArticles();