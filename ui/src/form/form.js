import '../assets/styles/styles.scss';
import './form.scss'

const form = document.querySelector('form');
const errorElement = document.querySelector("#errors");
let errors = [];
const baseUrl = 'http://localhost:3000/api/articles/';

form.addEventListener('submit', async event => {
    event.preventDefault();
    // On passe à l'objet FormData le form
    const formData = new FormData(form);
    // Permet d'avoir un objet KEY - VALUE des différents champs, soit :  {author: '', category: '', content: ''}
    const article = Object.fromEntries(formData.entries());
    if(formIsValid(article)){
        const json = JSON.stringify(article);
        try{
            const response = await fetch(baseUrl, {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type':'application/json'
                }
            });

            const body = await response.json();
            console.log(body);
        }catch(e) {
            console.log("error : ", e);
        }
    }
});

const formIsValid = (article) => {
    if(!article.author || !article.category || !article.content){
        errors.push("vous n'avez pas remplis touts les champs");
        if(errors.length > 1) errors.shift();
    } else{
        errors = [];
    } 
    if(errors.length){
        let errorHtml = errors.reduce( (acc, value) => {
            acc += `<li>${value}</li>`;
            return acc;
        }, '');
        errorElement.innerHTML = errorHtml;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
}