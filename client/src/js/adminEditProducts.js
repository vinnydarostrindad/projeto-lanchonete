const form = document.querySelector('#form')
const msg = document.querySelector('#msg')

const id = window.location.search.replace('?id=', '')

fetch(`http://localhost:8080/api/produtos/${id}`).then(response => {
    response.json().then(data => {
        form.name.value = data[0].name
        form.price.value = data[0].price.replace('R$ ', '')
    })
})

form.onsubmit = function(e) {
    e.preventDefault()

    const name = this.name
    const price = this.price

    if (name.value == '' || price.value == '') {
        if (name.value == '') {
            name.placeholder = 'Preencha esse campo'
            name.classList.add('erro')
        }
        if (price.value == '') {
            price.placeholder = 'Preencha esse campo'
            price.classList.add('erro')
        }
        return
    }

    const config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            price: price.value
        })
    }

    fetch(`http://localhost:8080/api/produtos/${id}`, config).then(response => {
        response.json().then(data => {
            msg.innerHTML = 'Produto editado com sucesso!'
        })
    })
}

for (let i = 0; i < 2; i++) {
    form[i].onfocus = function() {
        form[i].classList.remove('erro')
        if (i == 0) form[i].placeholder = 'Nome do Produto'
        if (i == 1) form[i].placeholder = 'Preço do Produto'
    }
}