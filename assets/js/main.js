const form = document.getElementById('form-contato');
let linhas = '';
let numerosContatoAdicionados = [];
let contatos = 0;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaContatos();
});

function adicionaLinha() {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputNumeroContato = document.getElementById('numero-contato');

    let numeroValido = true;

    if (numeroValido) {
        let numeroFormatado = inputNumeroContato.value;
        if (inputNumeroContato.value.length === 11) {
            // Formata o número para (xx) xxxxx-xxxx
            numeroFormatado = `(${inputNumeroContato.value.substr(0, 2)}) ${inputNumeroContato.value.substr(2, 5)}-${inputNumeroContato.value.substr(7)}`;
        }

        let linha = '<tr>';
        linha += `<td>${inputNomeContato.value}</td>`;
        linha += `<td>${numeroFormatado}</td>`;
        linha += '</tr>';

        linhas += linha;

        // Adicionar o número à lista de números de contato adicionados
        numerosContatoAdicionados.push(inputNumeroContato.value);

        inputNomeContato.value = '';
        inputNumeroContato.value = '';
    }
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

// Verifica se o número possui exatamente 11 dígitos e o terceiro dígito é 9
const inputNumeroContato = document.getElementById('numero-contato');
inputNumeroContato.addEventListener('blur', function() {
    if (inputNumeroContato.value.length === 11 && inputNumeroContato.value[2] === '9') {
        if (numerosContatoAdicionados.includes(inputNumeroContato.value)) { 
            inputNumeroContato.setCustomValidity('Esse número de contato já foi adicionado.');
            //inputNumeroContato.focus(); // Coloca o foco no campo
            //contatos--;
        } else {
            inputNumeroContato.setCustomValidity('');
        }
    } else {
        inputNumeroContato.setCustomValidity('O número precisa ter DDD e o 9 na frente.');
    }
});

function atualizaContatos() {
    contatos++;
    document.getElementById('contatos-adicionados').innerHTML = contatos;
}