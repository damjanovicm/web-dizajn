let text = document.getElementById('name')
let text2 = document.getElementById('name2')
let naslov1 = document.getElementById('naslov1')
let naslov2 = document.getElementById('naslov2')
let naslov3 = document.getElementById('naslov3')


window.addEventListener('scroll', function() {

    let scroll = window.scrollY

    text.style.top = 50 + scroll * 0.15 + "%"
    text.style.fontSize = 100 - scroll * 0.15 + "px"
    text.style.opacity = 1 

    let top = 50 + scroll * 0.15

    if(top > 97){
        text.style.display = 'none'
    }else{
        text.style.display = 'block'
    }

})

$('.burger').on('click',function(){
    $('.burger').toggleClass('active')
})

$('.burger').on('click',function(){
    $('.overlay').toggleClass('show')
})

$('.one').on('click',function(){
    $('.paragraph1').toggleClass('overlay')
})

$('.two').on('click',function(){
    $('.paragraph2').toggleClass('overlay')
})

$('.three').on('click',function(){
    $('.paragraph3').toggleClass('overlay')
})

$('.paragraph1').on('click', function(){
    $('.not').toggleClass('visible')
    naslov1.innerHTML = "PRVI NASLOV"
})

$('.paragraph2').on('click', function(){
    $('.not2').toggleClass('visible')
    naslov2.innerHTML = "DRUGI NASLOV"
})

$('.paragraph3').on('click', function(){
    $('.not3').toggleClass('visible')
    naslov3.innerHTML = "TRECI NASLOV"
})


let opstine = {
    21: {
        name: "Podgorica",
        sifra: 20176
    },
    22: {
        name: "Bar",
        sifra: 20010
    },
    23: {
        name: "Kotor",
        sifra: 20036
    },
    24: {
        name: "Herceg Novi",
        sifra: 20192
    },
    25: {
        name: "Cetinje",
        sifra: 20206
    },
    26: {
        name: "Nikšić",
        sifra: 20117
    },
    27: {
        name: "Andrijevica",
        sifra: 20222
    },
    28: {
        name: "Bijelo Polje",
        sifra: 20028
    },
    29: {
        name: "Žabljak",
        sifra: 20052
    }
}

let input = document.getElementById('maticni')
let submit = document.getElementById('btn')
let error = document.getElementById('error')
let output = document.getElementById('output')

submit.addEventListener('click', function(e) {

    error.style.display = "none"
    output.style.display = "none"       

    e.preventDefault()

    if(input.value.length != 13 || input.value == "             "){
        error.innerHTML = "JMBG nije ispravan!"
        error.style.color = "red"
        error.style.display = "block"
    }else{

    let jmbg = input.value.slice(7,9)

        if(opstine.hasOwnProperty(jmbg)){
            output.innerHTML = "Vi ste iz: " + JSON.stringify(opstine[jmbg].name)
            output.style.color = "white"
            output.style.display = "block"    
        }else{
            error.innerHTML = "Regija se ne nalazi u Crnoj Gori!"
            error.style.color = "red"
            error.style.display = "block"    
        }
    }
})