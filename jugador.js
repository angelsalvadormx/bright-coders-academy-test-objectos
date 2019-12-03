class Jugador{
  constructor(){
    this.puntosTotales = 0;
    this.marcador = [];
    this.numTiro = 1;
    this.ultimoTiro = 0;
  }
  static tirar(){
    return Math.floor(Math.random() * 10);
  }
  guardarTiro(tiro,bonus){
    var obj = {}
    if(this.numTiro == 1){
      obj={
        total: 0,
        izq: tiro,
        der:0
      }
    }else if(this.numTiro == 2){
      obj = this.marcador.pop();
      obj.der = tiro;
    }
    obj.total = obj.izq+der+bonus;
    this.marcador.push(obj);
    console.log(this.marcador);
    
  }

}