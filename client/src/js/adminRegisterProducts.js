const form = document.querySelector('#form')
const msg = document.querySelector('#msg')

form.onsubmit = function(e) {
    e.preventDefault()

    let formCheck = true

    const name = form.name
    const price = form.price
    
    if (name.value == "") {
        name.placeholder = 'Preencha todos os campos'
        name.classList.add('erro')
        formCheck = false
    }
    if (price.value == "") {
        price.placeholder = 'Preencha todos os campos'
        price.classList.add('erro')
        formCheck = false
    }

    if (formCheck == true) {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                price: 'R$ ' + price.value
            })
        }

        fetch('http://localhost:8080/api/produtos', config).then(response => {
            response.json().then(data => {
                name.value = ""
                price.value = ""
                msg.innerHTML = "Produto registrado com sucesso!"
            })
        })
    }
}

for (let i = 0; i < 2; i++) {
    form[i].onfocus = function() {
        form[i].classList.remove('erro')
        if (i == 0) form[i].placeholder = 'Nome do Produto'
        if (i == 1) form[i].placeholder = 'Preço do Produto'
    }
}