document.addEventListener('DOMContentLoaded',() =>{
    //obtem os elementos da pagina pelo seu ID
    const entradaEmail =document.getElementById('email-input')
    const caixaSugestoes =document.getElementById('emailsuggestions')

    //Lista de dominios de email para sugestao
    const dominios =['gmail.com','senacsp.edu.br','outlook.com','hotmail.com']

    entradaEmail.addEventListener('input',(e)=>{
        const valorEntrada = e.target.value
        //verificar se o valor inserido contem o simbolo @
        if(valorEntrada.includes('@')){
            const dominioInserido = valorEntrada.split('@')[1]
            //filtra sugestao de dominio com base no texto inserido
            const sugestoes =dominios.filter(dominio=>
                                                dominio.startsWith(dominioInserido))
            caixaSugestoes.innerHTML = sugestoes.map(dominio=>
            `<div class="sugestion-item">${valorEntrada.split('@')[0]}@${dominio}</div>`).join('')
            caixaSugestoes.style.display ='block'
        }else{
            //oculta a caixa de sugestoes se o @ nao tiver presente
            caixaSugestoes.style.display='none'
        }
    })
    
    //adiciona um ouvinte de eventos para detectar clique na caixa de sugestoes
    caixaSugestoes.addEventListener('click',(e)=>{
        //verifica se o elemento clicado é um item de sugestao
        if(e.target.classList.contains('sugestion-item')){
            //atualiza o valor do campo de email com o texto do item de sugestao clicando
            entradaEmail.value = e.target.textContent
            caixaSugestoes.style.display = 'none'
        }
    })
})

function consultarCEP(){
    const cepinput= document.getElementById('cepinput')
    const cep = cepinput.value.replace(/\D/g,'')

    const url="https://viacep.com.br/ws/"+cep+"/json"

    // ajax---> conectar com o site usando JSON
    fetch(url)
        .then(response =>response.json())
        .then(data =>{
            // exibe os resultados em uma div
            document.getElementById("endereco-input").value = data.logradouro

        }).catch(erro=> console.error('erro na aquisicao',erro))

}