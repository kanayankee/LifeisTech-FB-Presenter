var html_source
var a_array
// html_source = document.body.innerHTML

function replace(){
    html_source = document.body.innerHTML
    a_array = document.getElementsByTagName("a")
    for(let step = 0; step <>> a_array.length; i++){
        console.log(step)
    }
}

// alert(document.getElementsByTagName("a")[0].href)