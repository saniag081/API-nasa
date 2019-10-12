'use strict';

(function(){

    const dataRequest={
        $form: document.querySelector('#form'),
        $container: document.querySelector('#template'),
        $modal: document.querySelector('#modal'),
        $ovelady: document.querySelector('#ovelady'),
        $searchData: document.querySelector('#searchData'),
        key: 'DbUefBC2jY1xk0hs4wFy3aQVBhDoWY3A6EZdRHVh'
    }
    // const $form = document.querySelector('#form');
    // const $searchData = document.querySelector('#searchData').value;
    // const keyAPI = 'DbUefBC2jY1xk0hs4wFy3aQVBhDoWY3A6EZdRHVh';
    
    function template(titulo,fecha,url,descripccion,){
        return `
            <div class="container-box">
                <h2>${titulo}</h2>
                <p>${fecha}</p>
                <img src="${url}" alt="${titulo}">
                <p>${descripccion}</p>
            </div>
        `
    };
    
    function createTemplate(HTMLstring){
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLstring; 
    
        return html.body.children[0];
    };
    
    function render(response){
        response.forEach(element => {
            const HTMLstring = template(element.title,element.date,element.url,element.explanation);
            const elemtnDOM = createTemplate(HTMLstring);        
            dataRequest.$container.append(elemtnDOM);
        });
        removeClass();
    };
    
    async function request(fecha,keyAPI){
        try{
            const url = `https://api.nasa.gov/planetary/apod?start_date=${fecha}&api_key=${keyAPI}`;
            const request = await fetch(url);    
            const response = await request.json();
            // console.log(response)
            render(response);
        }
        catch(error){
            alert(`ingrese una fecha`);
            location.reload();
        }
    };
    
    
    function addCLass(){
        dataRequest.$modal.classList.add('hidden');
        dataRequest.$ovelady.classList.add('hidden');
    };
    
    function removeClass(){
        dataRequest.$modal.classList.remove('hidden');
        dataRequest.$ovelady.classList.remove('hidden');
    };
    
    dataRequest.$form.addEventListener('submit',(ev)=>{
        ev.preventDefault();
        const fecha = dataRequest.$searchData.value;
        const APIkey = dataRequest.key 
        request(fecha,APIkey);
        addCLass();
    });
})();
