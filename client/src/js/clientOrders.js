const ordersList = document.querySelector('#ordersList')
const clientId = window.location.search.replace('?id=', '')

const productsLink = document.querySelector('#products')
const ordersLink = document.querySelector('#orders')

productsLink.href = `./client.html?id=${clientId}`
ordersLink.href = `./clientOrders.html?id=${clientId}`

async function getOrders() {
    const response = await fetch(`http://localhost:8080/api/pedidos`)
    const allOrders = await response.json()
    let ordersInfo = []

    const userOrders = allOrders.filter(order => clientId == order.clientId)
    
    const allPorductsOrdered = await Promise.all(userOrders.map(async order => await getProductsOrdered(order)))
 
    userOrders.forEach(order => {
        const product = allPorductsOrdered.find(product => order.productId == product._id);

        if (product) {
          const combiningInfo = [product.name, product.price, order.status, order.date, order._id];
          ordersInfo.push(combiningInfo);
        }
    })
    
    buildHtml(ordersInfo)
}

async function getProductsOrdered(order) {
    const response = await fetch(`http://localhost:8080/api/produtos/${order.productId}`)
    const product = await response.json()
    const [productObj] = product

    return productObj
}

function buildHtml(ordersInfo) {
    const ordersHtml = ordersInfo.map(order => {
        if (order[2] == 'Pendente' || order[2] == 'Em preparo') {
            return `
            <li data-id="${order[4]}">
                ${order[0]} || ${order[1]} || ${order[2]} ||
                <span id="cancelBtn" style="color: blue; cursor: pointer;">[ Cancelar ]</span>
                <br>
                ${order[3]}
            </li>
            `    
        } else {
            return `
            <li>
                ${order[0]} || ${order[1]} || ${order[2]} <br>
                ${order[3]}
            </li>
            ` 
        }
    }).join('')

    ordersList.innerHTML = ordersHtml

    addCancelEvent()
}

function addCancelEvent() {
    const cancelBtns = document.querySelectorAll('#cancelBtn')
    cancelBtns.forEach(cancelBtn => {
        cancelBtn.onclick = cancelOrder
    })
}

function cancelOrder(e) {
    const orderId = e.target.parentElement.dataset.id

    const config = {
        method: 'DELETE'
    }

    fetch(`http://localhost:8080/api/pedidos/${orderId}`, config).then(response => {
        response.json().then(data => {
            console.log(data)
            getOrders()
        })
    })
    
}

getOrders()