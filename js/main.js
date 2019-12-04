
const jugador = new Jugador();

document.getElementById('btn').addEventListener('click',()=>{
  let numPinos = jugador.tirar();

  
  if(numPinos != -1){
    jugador.guardarTiro(numPinos,0);
  }
});
