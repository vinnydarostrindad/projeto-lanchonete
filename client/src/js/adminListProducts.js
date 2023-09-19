const productsList = document.querySelector('#products')

function listProducts() {
    fetch('http://localhost:8080/api/produtos').then(response => {
        response.json().then(data => {
            const productsHtml = data.map(product =>
                `<li>
                    ${product.name}  -  ${product.price} - 
                    <a href="./adminEditProduct.html?id=${product._id}">[Editar]</a> -
                    <a href="#" id="removeBtn" data-id="${product._id}">[Remove]</a>
                </li>`
            ).join('')
    
            productsList.innerHTML = productsHtml
    
            addRemoveEvent()
        })
    })
}

function addRemoveEvent() {
    const removeBtns = document.querySelectorAll('#removeBtn')

    removeBtns.forEach(removeBtn => {
        removeBtn.onclick = function(e) {
            e.preventDefault()

            const { id } = removeBtn.dataset

            const config = {
                method: 'DELETE'
            }
        
            fetch(`http://localhost:8080/api/produtos/${id}`, config).then(location.reload())
        }
    })
}

listProducts()