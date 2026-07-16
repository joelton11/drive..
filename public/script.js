const input = document.getElementById("arquivo");

const dropArea = document.getElementById("dropArea");

const lista = document.getElementById("lista");

const enviar = document.getElementById("enviar");

const status = document.getElementById("status");


let arquivos=[];



input.addEventListener("change",(e)=>{

arquivos=[...e.target.files];

mostrar();

});



dropArea.addEventListener("dragover",(e)=>{

e.preventDefault();

dropArea.classList.add("active");

});



dropArea.addEventListener("dragleave",()=>{

dropArea.classList.remove("active");

});



dropArea.addEventListener("drop",(e)=>{

e.preventDefault();

dropArea.classList.remove("active");

arquivos=[...e.dataTransfer.files];

mostrar();

});



function mostrar(){

lista.innerHTML="";


arquivos.forEach(file=>{

lista.innerHTML += `
<p>📄 ${file.name}</p>
`;

});

}




enviar.addEventListener("click",async()=>{


if(arquivos.length===0){

status.innerHTML="Selecione arquivos.";

return;

}



status.innerHTML="Enviando...";


const dados=new FormData();


arquivos.forEach(file=>{

dados.append(
"arquivos",
file
);

});



const resposta=await fetch("/upload",{

method:"POST",

body:dados

});


const resultado=await resposta.json();



if(resultado.sucesso){

status.innerHTML="✅ Arquivos enviados!";

}else{

status.innerHTML="❌ Erro";

}



});