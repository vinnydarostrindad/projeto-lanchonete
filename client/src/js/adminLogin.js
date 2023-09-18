const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()
    
    if (this.name.value == '' || this.password.value == '') {
        if (this.name.value == '') {
            this.name.placeholder = 'Preencha esse campo'
            this.name.classList.add('erro')
        }
        if (this.password.value == '') {
            this.password.placeholder = 'Preencha esse campo'
            this.password.classList.add('erro')
        }
        return
    }

    const name = form.name.value
    const password = form.password.value
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            password
        })
    }

    fetch('http://localhost:8080/api/admin', config).then(response => {
        response.json().then(data => {
            if (data != false) {
                window.location.href = `http://127.0.0.1:5500/client/adminListClients.html?id=${data}`
            }
        })
    })

}

form.name.onfocus = function() {
    this.classList.remove('erro')
    this.placeholder = 'Digite nome e sobrenome'
}

form.password.onfocus = function() {
    this.classList.remove('erro')
    this.placeholder = 'Digite sua senha'
}