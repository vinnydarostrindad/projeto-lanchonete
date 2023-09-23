const msg = document.querySelector('#msg')
const productList = document.querySelector('#productList')
const clientId = window.location.search.replace('?id=', '')

const productsLink = document.querySelector('#products')
const ordersLink = document.querySelector('#orders')

productsLink.href = `./client.html?id=${clientId}`
ordersLink.href = `./clientOrders.html?id=${clientId}`

fetch(`http://localhost:8080/api/cliente/${clientId}`).then(response => {
    response.json().then(data => {
        msg.innerHTML = `Bem-Vindo(a) ${data[0].name}`
    })
})

fetch(`http://localhost:8080/api/produtos`).then(response => {
    response.json().then(data => {

        const productHtml = data.map(product => 
            `<li data-id="${product._id}">
                <div></div>
                <p>${product.name}</p>
                <p>${product.price}</p>
                <button id="addBtn">Pedir</button>
            </li>`
        ).join('')

        productList.innerHTML = productHtml

        const addBtns = document.querySelectorAll('#addBtn')
        
        addBtns.forEach(addBtn => {
            addBtn.onclick = function() {
                const productId = addBtn.parentElement.dataset.id

                const dateDate = new Date().getDate()

                const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
                const dateDay = daysOfWeek[new Date().getDay()]

                const dateTime = new Date().toTimeString().split(' ')[0]

                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clientId,
                        productId,
                        date: `Dia ${dateDate}, ${dateDay}, às ${dateTime}`,
                        status: 'Pendente'
                    })
                }

                fetch(`http://localhost:8080/api/pedidos`, config).then(response => {
                    response.json().then(data => {
                    })
                })
            } 
        })
    })
})
