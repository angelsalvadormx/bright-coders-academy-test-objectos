
const jugador = new Jugador();
var test = 10;
document.getElementById('btn').addEventListener('click',()=>{
  let numPinos = jugador.tirar();
  console.log(test);
  
  if(numPinos != -1){
    jugador.guardarTiro(test,0);
  }
});