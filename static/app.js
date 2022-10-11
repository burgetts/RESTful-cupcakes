const BASE_URL = 'http://127.0.0.1:5000/'

function generateCupcakeMarkup(c){
    return `
    <li id=${c.id}> 
        <p> Flavor: ${c.flavor} | Size: ${c.size} | Rating ${c.rating} </p>
        <img src="${c.image}"> 
    </li>`
}

async function appendCupcakes(){
    let cupcakes = await axios.get(`${BASE_URL}/api/cupcakes`)
    $list_cupcakes = $('#all-cupcakes')
    console.log($list_cupcakes)

    for (let c of cupcakes.data.cupcakes){
        markup = generateCupcakeMarkup(c)
        $list_cupcakes.append(markup)
    }
}

let $form = $('#new-cupcake')
console.log($form)
$form.on("submit", async function(e){
    e.preventDefault()
    // get form values
    let flavor = $('[name="flavor"]').val()
    let size = $('[name="size"]').val()
    let rating = $('[name="rating"]').val()
    let image = $('[name="image"]').val()
    // post request to api
    let resp = await axios.post(`${BASE_URL}/api/cupcakes`, {
        flavor,
        size,
        rating,
        image
    })
    // add to $list_cupcakes
  let newCupcake = generateCupcakeMarkup(resp.data.cupcake)
  $('#all-cupcakes').append(newCupcake)
})

appendCupcakes()


