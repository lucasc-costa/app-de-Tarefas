const nome = document.getElementById("nome");
const botao = document.getElementById("botao");
const tasks = document.querySelector("#tasks");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Verifica o estado inicial do campo de entrada de texto
if (nome.value !== "") {
  botao.disabled = false;
} else {
  botao.disabled = true;
}

nome.addEventListener("keyup", () => {
  // Atualiza o estado do botão com base no valor do campo de entrada de texto
  if (nome.value !== "") {
    botao.disabled = false;
  } else {
    botao.disabled = true;
  }
});

function criaNota(item) {
  tasks.innerHTML += `
    <div class="tarefa"> 
      <input type="checkbox" name="done" class="done"> 
      <input type="text" name="lista" class="lista" value="${item.nome}"> 
      <input type="button" value="delete" class="delete"> 
    </div>
  `;
}

function adicionarEventos() {
  const done = document.querySelectorAll('.done');
  const list = document.querySelectorAll('.lista');
  const deletar = document.querySelectorAll('.delete');

  done.forEach((element, index) => {
    element.onchange = function() {
      if (element.checked) {
        list[index].classList.add("feito");
        itens[index].status = true;
      } else {
        list[index].classList.remove("feito");
        itens[index].status = false;
      }
      localStorage.setItem("itens", JSON.stringify(itens));
    };
  });

  deletar.forEach((element, index) => {
    element.onclick = function() {
      this.parentNode.remove();
      itens.splice(index, 1);
      localStorage.setItem("itens", JSON.stringify(itens));
      adicionarEventos(); // Reassocia os eventos após a exclusão
    };
  });

  list.forEach((element, index) => {
    element.onblur = function () {
      itens[index].nome = element.value
      localStorage.setItem("itens", JSON.stringify(itens));
    }
  });
}

itens.forEach((element) => {
  criaNota(element);
  adicionarEventos(); // Associa os eventos a cada nota criada
});

function novoItem() {
  const item = {
    nome: nome.value,
    status: false,
  };
  itens.push(item);
  criaNota(item);
  adicionarEventos(); // Associa os eventos após adicionar uma nova nota
  localStorage.setItem("itens", JSON.stringify(itens));
  nome.value = "";
  botao.disabled = true; // Desabilita o botão após adicionar uma tarefa
}

botao.addEventListener("click", novoItem);
nome.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && nome.value !== "") {
    novoItem()
  };
})
