//UTILIZA A BIBLIOTECA math.js para o cálculo com números complexos

/* global MathJax, Plotly */


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

    var Pa = Number(document.getElementsByName("Pa")[0].value);
    var S = Number(document.getElementsByName("S")[0].value);
    var alfa = Number(document.getElementsByName("alfa")[0].value);
    var Tx = Number(document.getElementsByName("Tx")[0].value) * Math.pow(10, 6);
    var Brx = Number(document.getElementsByName("Brx")[0].value);
    var Dmodal = Number(document.getElementsByName("Dmodal")[0].value);
    var Dcrom = Number(document.getElementsByName("Dcrom")[0].value)/1000;
    var deltal = Number(document.getElementsByName("deltal")[0].value);
    var singlemode = Boolean(document.getElementsByName("singlemode")[0].value);

    lmax = dmax(Pa,S,alfa,Tx,Brx,Dmodal,Dcrom,deltal,singlemode);

    if (isNaN(lmax)) {
        texto = "$ \\text{ Não há nenhum comprimento para a taxa de bits especificada. }$";
    } else {
        lmax = lmax.toFixed(2);
        texto = "$ \\text{Comprimento máximo da Fibra } = " + lmax +" km$";
    }

    document.getElementById("respostas").innerHTML = texto;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"respostas"]);
    
    var comprimentos = [];
    var taxas = [];
    
    var comprimentoMax = datenuacao(Pa,S,alfa);
    var comprimentoMin = comprimentoMax/100;
    var passo = 100;
    
    for (var i = 0; i < passo; i++) {
        comprimentos[i] = comprimentoMin + i/passo*(comprimentoMax-comprimentoMin);
        taxas[i] = TxT(comprimentos[i],Brx,Dmodal,Dcrom,deltal,singlemode);
    }
    

    var dados = [{
        x: comprimentos,
        y: taxas,
        mode: 'lines',
        line: {shape: 'spline'},
        type: 'scatter'
    }];

    var estilo = {
        title: 'Análise de Taxa de Transmissão',
        xaxis: {
            title: 'Comprimento (Km)'
        },
        yaxis: {
            title: 'Taxa de Transmissão (Mbits/s)'
        }
    };

    Plotly.newPlot('grafico', dados, estilo);


}