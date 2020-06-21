import '../assets/styles/styles.scss';
import './form.scss'

const form = document.querySelector('form');
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener('submit', event => {
    event.preventDefault();
    // On passe à l'objet FormData le form
    const formData = new FormData(form);
    // Permet d'avoir un objet KEY - VALUE des différents champs, soit :  {author: '', category: '', content: ''}
    const article = Object.fromEntries(formData.entries());
    if(formIsValid(article)){
        const json = JSON.stringify(artile);
    }
});

const formIsValid = (article) => {
    if(!article.author || !article.category || !article.content){
        errors.push("vous n'avez pas remplis touts les champs");
        if(errors.length > 1) errors.shift();
    }
    else errors = [];
    if(errors.length){
        let errorHtml = errors.reduce( (acc, value) => {
            acc += `<li>${value}</li>`;
            return acc;
        }, '');
        errorElement.innerHTML = errorHtml;
    } else {
        errorElement.innerHTML = '';
    }
}

