const form = document.querySelector('#form')
const msg = document.querySelector('#msg')

form.onsubmit = function(e) {
    e.preventDefault()

    const name = this.name
    const email = this.email
    const phone = this.phone
    const address = this.address

    let validInputs = true
    for (let i = 0; i < 4; i++) {
        if (this[i].value == '') {
            this[i].placeholder = 'Preencha esse campo'
            this[i].classList.add('erro')
            validInputs = false
        }
    }
    if (validInputs == false) return

    fetch(`http://localhost:8080/api/cliente`).then(response => {
        response.json().then(data => {
            let clientInfo = 'new'

            data.forEach(client => {
                if (name.value == client.name && 
                    email.value == client.email && 
                    phone.value == client.phone && 
                    address.value == client.address) {
                    clientInfo = client

                    return
                } 
                if (email.value == client.email || phone.value == client.phone) {
                    msg.classList.add('appear')
                    setTimeout(() => {
                        msg.classList.remove('appear')
                    }, 7500)
                    if (email.value == client.email) {
                        console.log('Email ingual', client)
                        email.value = ''
                        email.placeholder = 'Email já usado'
                        email.classList.add('erro')
                    }
                    if (phone.value == client.phone) {
                        console.log('phone ingual', client)
                        phone.value = ''
                        phone.placeholder = 'Número já usado'
                        phone.classList.add('erro')
                    }
                    clientInfo = undefined
                }
            })
            if (clientInfo != 'new') {
                console.log('Alredy hae an account', clientInfo)
                window.location.href = `http://127.0.0.1:5500/client/client.html?id=${clientInfo._id}`
            }
            if (clientInfo == 'new') {
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        phone: phone.value,
                        address: address.value
                    })
                }

                fetch(`http://localhost:8080/api/cliente`, config).then(response => {
                    response.json().then(data => {
                        window.location.href = `http://127.0.0.1:5500/client/client.html?id=${data._id}`
                    })
                })
            }
        })
    })
}

for (let i = 0; i < 4; i++) {
    form[i].onfocus = function() {
        form[i].classList.remove('erro')
        if (i == 0) form[i].placeholder = 'Digite nome e sobrenome'
        if (i == 1) form[i].placeholder = 'Digite seu Email'
        if (i == 2) form[i].placeholder = 'Digite seu telefone (9 dígitos) '
        if (i == 3) form[i].placeholder = 'Digite seu endereço: Rua/Avenida, n°, bairro'
    }
}