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
 * @param {number} trx tempo de subida em ns
 * @param {number} Dmodal dispersao modal em ns / km
 * @param {number} Dcrom dispersao cromatica em ns / nm km
 * @param {number} deltal largura espectral do laser em nm
 * @param {boolean} singlemode verdadeiro se a fibra for singlemode
 * @returns distancia maxima em km
 */
function ddisp(Tx,trx,Dmodal,Dcrom,deltal,singlemode){
    Tbit = 1/Tx;
    tdisp = 0.1*Tbit*Math.pow(10,9);
    if (singlemode){
        
        return (Math.pow(tdisp,2) - Math.pow(trx,2))/(deltal*Dcrom);
        
    } 
    else{
        return (Math.pow(tdisp,2) - Math.pow(trx,2))/Dmodal;
    }
   
}
/**
 * @function [dmax] Calcula a distancia maxima
 * @param {number} Pa potencia de entrada em dB
 * @param {number} S sensibilidade do sensor em dB
 * @param {number} alfa atenuacao em dB por km
 * @param {number} Tx taxa de bits por segundo
 * @param {number} trx tempo de subida em ns
 * @param {number} Dmodal dispersao modal em ns / km
 * @param {number} Dcrom dispersao cromatica em ns / nm km
 * @param {number} deltal largura espectral do laser em nm
 * @param {boolean} singlemode verdadeiro se a fibra for singlemode
 * @returns distancia maxima em km
 */
function dmax(Pa,S,alfa,Tx,trx,Dmodal,Dcrom,deltal,singlemode){
    
    distA = datenuacao(Pa,S,alfa);
    distD = ddisp(Tx,trx,Dmodal,Dcrom,deltal,singlemode);
    if (distA > distD){
        
        return distD;
    }
    return distA;
}