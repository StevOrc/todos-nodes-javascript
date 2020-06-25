import '../assets/styles/styles.scss';
import './form.scss'

const form = document.querySelector('form');
let errorElement = document.querySelector("#errors");
let errors = [];
const baseUrl = 'http://localhost:3000/api/articles/';

form.addEventListener('submit', async event => {
    event.preventDefault();
    errors = [];
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
        }catch(error) {
            console.log(error);
        }
    }
});

const formIsValid = (article) => {
    for(const [key, value] of Object.entries(article)){
        console.log("aaaa");
        if(!value) errors.push(`${key} est obligatoire`);
    }
    if(errors.length){
        const errorHTML = errors.reduce( (acc, value) => {
            acc += `<li>${value}</li>`;
            return acc;
        }, '');
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
}