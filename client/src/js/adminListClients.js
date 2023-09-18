const listClientsBtn = document.querySelector('#listClients')
const listOrdersBtn = document.querySelector('#listOrders')
const listProductsBtn = document.querySelector('#listProducts')
const postProductBtn = document.querySelector('#postProduct')
const msg = document.querySelector('#msg')
const clientsList = document.querySelector('#clients')

const adminId = window.location.search.replace('?id=', '')

fetch(`http://localhost:8080/api/admin/${adminId}`).then(response => {
    response.json().then(data => {
        msg.innerHTML = 'Bem-vindo(a) ' + data.name
    })
})

fetch(`http://localhost:8080/api/cliente`).then(response => {
    response.json().then(data => {
        const clientsHtml = data.map(client => 
            `<li>
                ${client.name} - ${client.email} - ${client.phone} - ${client.address} -  
                <a href="#">[Remover]</a>
            </li>`
        ).join('')

        clientsList.innerHTML = clientsHtml
    })
})