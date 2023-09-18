const productsList = document.querySelector('#products')

fetch('http://localhost:8080/api/produtos').then(response => {
    response.json().then(data => {
        const productsHtml = data.map(product =>
            `<li>
                ${product.name}  -  ${product.price} - 
                <a href="../adminEditProduct/${product._id}">[Editar]</a> -
                <a href="#" id="removeBtn">[Remove]</a>
            </li>`
        ).join('')

        productsList.innerHTML = productsHtml
    })
})