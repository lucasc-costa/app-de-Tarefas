var nome = document.getElementById("nome")
var botao = document.getElementById("botao")
var pai = document.getElementById("pai")

nome.addEventListener("keyup",() => {
    if (nome.value !== "") {
        botao.disabled=false
    }else{
        botao.disabled=true
    }
})


botao.addEventListener("click",criaNota)

function criaNota(){
    var add = document.createElement('div')
    add.className="tarefa"
    pai.appendChild(add)
    var tarefa = document.getElementsByClassName("tarefa")
    var quant = tarefa.length - 1
    
    add = document.createElement('input')
    add.type="checkbox"
    add.className="done"
    tarefa[quant].appendChild(add)
    

    add = document.createElement('input')
    add.type="text"
    add.className="lista"
    add.value=nome.value
    tarefa[quant].appendChild(add)

    add = document.createElement('input')
    add.type="button"
    add.value="delete" 
    add.className="delete"
    tarefa[quant].appendChild(add)

    var deletar = document.getElementsByClassName("delete")       
    deletar[quant].addEventListener('click',excluir)

    var done = document.getElementsByClassName("done")       
    done[quant].addEventListener('change',function(){
        var lista = document.getElementsByClassName("lista")
        if (done[quant].checked) {
            lista[quant].classList.add("feito")
        }else{    
            lista[quant].classList.remove("feito")
        }
    })
    
    botao.disabled=true
    nome.value=""
    
}

function excluir(){
    pai.removeChild(this.parentNode)
}
