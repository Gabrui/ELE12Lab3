/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @function [datenuacao] Calcula a distancia maxima devido atenuacao
 * @param {number} Pa potencia de entrada em dB
 * @param {number} S sensibilidade do sensor em dB
 * @param {number} alfa atenuacao em dB por km
 * @returns distancia maxima em km
 */
function datenuacao(Pa,S,alfa){
    return (Pa-S)/alfa;
}

/**
 * @function [Prr] Calcula a distancia maxima devido dispersao
 * @param {number} Tx taxa de bits por segundo
 * @param {number} Brx tempo de subida em MHz
 * @constant {number} trx tempo de subida em ns
 * @param {number} Dmodal dispersao modal em ns / km
 * @param {number} Dcrom dispersao cromatica em ns / nm km
 * @param {number} deltal largura espectral do laser em nm
 * @param {boolean} singlemode verdadeiro se a fibra for singlemode
 * @returns distancia maxima em km
 */
function ddisp(Tx,Brx,Dmodal,Dcrom,deltal,singlemode){
    /*Calculo do tempo de 1 bit*/
    Tbit = 1/Tx;
    /*Calculo do tempo de atraso do sistema
     * Admitindo no maximo um atraso de 0.1 do tempo do bit
     * calculado em nanosegundos*/
    tdisp = 0.1*Tbit*Math.pow(10,9);
    /*Calculo do tempo de subida*/
    trx = 0.44/Brx;
    /*Transformando de microsegundo para nanosegundo*/
    trx = trx*1000;
    if (singlemode){
        
        return Math.sqrt(Math.pow(tdisp,2) - Math.pow(trx,2))/(deltal*Dcrom);
        
    } 
    else{
        return Math.sqrt(Math.pow(tdisp,2) - Math.pow(trx,2))/Dmodal;
    }
   
}


/**
 * @function [dmax] Calcula a distancia maxima
 * @param {number} Pa potencia de entrada em dB
 * @param {number} S sensibilidade do sensor em dB
 * @param {number} alfa atenuacao em dB por km
 * @param {number} Tx taxa de bits por segundo
 * @param {number} Brx tempo de subida em MHz
 * @param {number} Dmodal dispersao modal em ns / km
 * @param {number} Dcrom dispersao cromatica em ns / nm km
 * @param {number} deltal largura espectral do laser em nm
 * @param {boolean} singlemode verdadeiro se a fibra for singlemode
 * @returns distancia maxima em km
 */
function dmax(Pa,S,alfa,Tx,Brx,Dmodal,Dcrom,deltal,singlemode){
    /*calculo da distancia maxima
     * considerando balanco de potencia*/
    distA = datenuacao(Pa,S,alfa);
    /*calculo da distancia maxima
     * considerando balanco de tempo de atraso*/
    distD = ddisp(Tx,Brx,Dmodal,Dcrom,deltal,singlemode);
    if (distA > distD || isNaN(distD)){
        return distD;
    }
    return distA;
}

/**
 * @function [TxT] Calcula a taxa de trasmissao em Megabits por segundo
 * @param {number} d distancia em km
 * @param {number} Brx tempo de subida em MHz
 * @constant {number} trx tempo de subida em ns
 * @constant {number} tdisp tempo de atraso por dispersao em ns
 * @param {number} Dmodal dispersao modal em ns / km
 * @param {number} Dcrom dispersao cromatica em ns / nm km
 * @param {number} deltal largura espectral do laser em nm
 * @param {boolean} singlemode verdadeiro se a fibra for singlemode
 * @returns Taxa de trasmissao em Megabits por segundo
 */
function TxT(d,Brx,Dmodal,Dcrom,deltal,singlemode){
    
    /*Calculo do tempo de subida*/
    trx = 0.44/Brx;
    /*Transformando de microsegundo para nanosegundo*/
    trx = trx*1000;
    if (singlemode){
        
        tdisp = d*deltal*Dcrom;
        return 100/Math.sqrt(Math.pow(tdisp,2) + Math.pow(trx,2));
        
    } 
    else{
        
        tdisp = d*Dmodal;
        return 100/Math.sqrt(Math.pow(tdisp,2) + Math.pow(trx,2));
    }
   
}
