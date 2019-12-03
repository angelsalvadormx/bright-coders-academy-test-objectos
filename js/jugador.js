class Jugador {
  constructor() {
    this.marcador = [];
    this.pinosDePie = 10;
    this.contTiros = 1;
    this.numTiro = 0;
    this.ultimoTiro = 0;
    this.bonus = false;
    this.bonusStrike = false;
    this.limiteNumTiros = 2;
  }
  tirar() {
    if (this.contTiros <= 10 && this.numTiro == this.limiteNumTiros) {
      this.contTiros++;
      this.pinosDePie = 10;
    }
    if (this.contTiros > 10) {
      alert('Juego terminado');
      return -1;
    }
    this.numTiro++;
    if (this.numTiro > this.limiteNumTiros) {
      this.numTiro = 1;
    }
    return Math.floor(Math.random() * this.pinosDePie);
  }
  guardarTiro(tiro, bonus) {

    let obj = {};
    this.pinosDePie -= tiro;
    this.ultimoTiro = tiro;

    if (this.numTiro == 1) {
      if (tiro == 10) {
        this.bonusStrike = true;
      }
      obj = {
        total: 0,
        der: tiro,
        izq: 0
      }
      if (this.bonus == true) {
        let pos = this.marcador.length - 1;
        this.marcador[pos].total += tiro;
        this.actulizarCuadro(pos + 1, this.marcador[pos].total);
        this.bonus = false;
      }
    } else if (this.numTiro == 2) {
      obj = this.marcador.pop();
      obj.izq = tiro;
      if ((obj.izq + obj.der) == 10) {
        this.bonus = true;
      }
    } else if (this.numTiro == 3) {
      let pos = this.marcador.length - 1;
      this.marcador[pos].total += tiro;
      this.actulizarCuadro(pos + 1, this.marcador[pos].total);
    }

    if (this.bonusStrike === true) {
      obj.izq = 0;
      this.numTiro = 2;
    }

    if ((this.bonusStrike === true || this.bonus === true) && this.contTiros == 10) {
      this.limiteNumTiros = 3;
    }

    obj.total = bonus + this.calcularTotal(obj);
    this.marcador.push(obj);
    this.actualizarTablero();
  }

  actulizarCuadro(idCuadro, total) {

    document.getElementById(idCuadro).getElementsByClassName('total')[0].innerText = total;
  }
  obtenerTotal() {
    let pos = this.marcador.length - 1;
    return this.marcador[pos].total
  }
  calcularTotal(obj) {
    let total = 0
    let pos = this.marcador.length - 1;
    if (pos != -1) {
      total = this.marcador[pos].total + obj.izq + obj.der;
    } else {
      total = obj.izq + obj.der;
    }
    return total;
  }
  actualizarTablero() {
    let cuadros = document.getElementById(this.contTiros);

    let cuadro = cuadros.getElementsByClassName('cuadro' + this.numTiro)[0];


    if (this.numTiro == 2) {
      cuadros.getElementsByClassName('total')[0].innerText = this.obtenerTotal();

      if (this.bonus === true) {
        cuadro.classList.add('repuesto');
      } else if (this.bonusStrike === true) {
        cuadro.classList.add('strike');
        this.bonus = true;
        this.bonusStrike = false;
      } else {
        cuadro.innerText = this.ultimoTiro;
      }
    } else {
      cuadro.innerText = this.ultimoTiro;
    }
  }
}