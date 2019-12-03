class Jugador {
  constructor() {
    this.marcador = [];
    this.puntosTotales = 0;
    this.pinosDePie = 10;
    this.contTiros = 1;
    this.numTiro = 0;
    this.ultimoTiro = 0;
  }
  tirar() {
    if (this.contTiros <= 10 && this.numTiro == 2) {
      this.contTiros++;
      this.pinosDePie = 10;
    }
    if (this.contTiros > 10) {
      alert('Juego terminado');
      return -1;
    }
    this.numTiro++;
    if (this.numTiro > 2) {
      this.numTiro = 1;
    }
    return Math.floor(Math.random() * this.pinosDePie);
  }
  guardarTiro(tiro, bonus) {
    let obj = {};
    this.pinosDePie -= tiro;
    if (this.numTiro == 1) {
      obj = {
        total: 0,
        izq: tiro,
        der: 0
      }
      if (this.bonus == true) {
        let pos = this.marcador.length - 1;
        console.log(this.marcador);
        this.marcador[pos].total += tiro;
        
        this.actulizarCuadro(pos+1,this.marcador[pos].total);
        this.bonus = false;
        console.log("bonus....",this.bonus);
        
      }
    } else if (this.numTiro == 2) {
      obj = this.marcador.pop();
      obj.der = tiro;
      if ((obj.izq + obj.der) == 10) {
        this.bonus = true;
      }
    }

    obj.total = obj.izq + obj.der + bonus;
    this.puntosTotales += tiro;
    this.marcador.push(obj);
    this.ultimoTiro = tiro;
    this.actualizarTablero();
  }

  actulizarCuadro(idCuadro,total){
    console.log(idCuadro);
    
    document.getElementById(idCuadro).getElementsByClassName('total')[0].innerText = total;
  }

  actualizarTablero() {
    let cuadros = document.getElementById(this.contTiros);
    console.log(this.numTiro);
    console.log(cuadros);

    let cuadro = cuadros.getElementsByClassName('cuadro' + this.numTiro)[0];
    
    
    if (this.numTiro == 2) {
      cuadros.getElementsByClassName('total')[0].innerText = this.puntosTotales;
      console.log("bonus",this.bonus);
      
      if (this.bonus === true) {
        cuadro.classList.add('repuesto');
      }else{
        cuadro.innerText = this.ultimoTiro;
      }
    }else{
      cuadro.innerText = this.ultimoTiro;
    }
  }
}