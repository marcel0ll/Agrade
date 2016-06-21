/**
  A classe disciplina tem o objetivo de modelar as informações de uma disciplina
*/
class Disciplina {
  constructor( nome, creditos ) {
    this.nome = nome;
    this.feita = false;
    this.forcada = false;
    this.creditos = 0;

    this.preDisciplinas = [];
    this.creditosNecessarios = 0;

    this.tags = [];
  }

  ehRequisito( id ) {
    // Checa se disciplina(id) está contida em requisitos dessa disciplina
  }

  temTag( tag ) {
    // Checa se disciplina tem a tag passada
  }
}
