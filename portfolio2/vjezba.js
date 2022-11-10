let iznos = document.getElementById('iznos')
let datum = document.getElementById('datum')
let submit = document.getElementById('submit')
let ispis = document.getElementById('ispis')

ispis.style.visibility = 'hidden'

submit.addEventListener('click', function(e){

    e.preventDefault()

    let date = new Date(datum.value);

if(isNaN(parseFloat(iznos.value)) || datum.value == ""){
        ispis.innerHTML = 'Unesite sve podatke ispravno!'
        ispis.style.color = 'red'
        ispis.style.visibility = 'visible'

}else{

    if(date.getDate() <= 10){
        let popust = iznos.value - (10/100) * parseFloat(iznos.value)
        ispis.innerHTML = 'Cijena sa popustom: ' + popust + '€'
        ispis.style.visibility = 'visible'
        ispis.style.color = 'black'

    }else{
        ispis.innerHTML = 'Cijena: ' + iznos.value
        ispis.style.visibility = 'visible'
        ispis.style.color = 'black'
    }
}

})
