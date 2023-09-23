const orderList = document.querySelector('#ordersList')

let clientOrdersHtml = ''

async function getOrders() {
    const response = await fetch(`http://localhost:8080/api/pedidos`)
    const allOrders = await response.json()
    
    const allClients = await getAllClients()

    const promises = allClients.map(async client => {
        const userOrders = allOrders.filter(order => order.clientId == client._id)
        const clientInfo = await getClient(client._id)
        const productsInfo = await getClientProducts(userOrders)

        buildHtml(userOrders, clientInfo, productsInfo)  
    }) 

    await Promise.all(promises)
    
    const statusSelectors = document.querySelectorAll('#status')
    
    updateStatusValue(statusSelectors)

    addChangeEvent(statusSelectors)
}

async function getAllClients() {
    const response = await fetch(`http://localhost:8080/api/cliente`)
    const allClients = await response.json()

    return allClients
}

async function getClient(id) {
    const response = await fetch(`http://localhost:8080/api/cliente/${id}`)
    const [client] = await response.json()

    return client
}

async function getClientProducts(userOrders) {
    const promises = userOrders.map(async order => {
        const response = await fetch(`http://localhost:8080/api/produtos/${order.productId}`)
        const [products] = await response.json()

        return products
    })

    return Promise.all(promises)
}

function buildHtml(orders, client, products) {
    const ordersHtml = orders.map(order => {
        const product = products.find(product => order.productId == product._id)

        const ordersList = `
            <li data-id="${order._id}">
                ${product.name} || ${product.price} || 
                <select name="status" id="status" data-status="${order.status}">
                    <option value="Pendente">Pendente</option>
                    <option value="Em preparo">Em preparo</option>
                    <option value="Em entrega">Em entrega</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <br>
                ${order.date}
            </li>
        `
        return ordersList
    })


    clientOrdersHtml += `
        <li>
            <h3>${client.name}</h3>
            <ul>
                ${ordersHtml}
            </ul>
        </li>
    `

    orderList.innerHTML = clientOrdersHtml
}

function updateStatusValue(statusSelectors) {
    statusSelectors.forEach(selector => {
        selector.value = selector.dataset.status
    })
}

function addChangeEvent(statusSelectors) {
    statusSelectors.forEach(statusSelect => {
        statusSelect.onchange = function(e) {
            const orderId = e.target.parentElement.dataset.id
            const newStatus = e.target.value

            updateOrder(orderId, newStatus)
        }
    })
}

async function updateOrder(id, status) {
    const config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status
        })
    }

    await fetch(`http://localhost:8080/api/pedidos/${id}`, config)
}

getOrders()