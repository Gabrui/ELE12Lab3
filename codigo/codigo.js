//UTILIZA A BIBLIOTECA math.js para o cálculo com números complexos

/* global math, MathJax, Plotly */


function mudarEntradas() {
    var singlemode = document.getElementsByName("singlemode")[0].value;
    var MMs = document.getElementsByClassName("mm");
    var SMs = document.getElementsByClassName("sm");
    if (singlemode) {
        for (var i = MMs.length; i > 0; i--) {
            MMs[i-1].style.display = 'none';
        }
        for (var i = SMs.length; i > 0; i--) {
            SMs[i-1].style.display = '';
        }
    } else {
        for (var i = MMs.length; i > 0; i--) {
            MMs[i-1].style.display = '';
        }
        for (var i = SMs.length; i > 0; i--) {
            SMs[i-1].style.display = 'none';
        }
    }

}


function calcular() {

    var Pa = document.getElementsByName("Pa")[0].value;
    var S = document.getElementsByName("S")[0].value;
    var alfa = document.getElementsByName("alfa")[0].value;
    var Tx = document.getElementsByName("Tx")[0].value * Math.pow(10, 6);
    var Brx = document.getElementsByName("Brx")[0].value;
    var Dmodal = document.getElementsByName("Dmodal")[0].value;
    var Dcrom = document.getElementsByName("Dcrom")[0].value;
    var deltal = document.getElementsByName("deltal")[0].value;
    var singlemode = document.getElementsByName("singlemode")[0].value;

    lmax = dmax(Pa,S,alfa,Tx,Brx,Dmodal,Dcrom,deltal,singlemode);
    lmax = lmax.toFixed(2);

    texto = "$ \\text{Comprimento máximo da Fibra } = " + lmax +" km$";
    document.getElementById("respostas").innerHTML = texto;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"respostas"]);


    
}



