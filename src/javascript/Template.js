import "./jquery";
import Event from "./Event";

export default class Template {
    constructor() {
        // this.separadores = ['<h3 class="col-md-12 col-sm-12 col-xs-12">', '<h4 class="col-md-12 col-sm-12 col-xs-12">', '<p class="col-md-12 col-sm-12 col-xs-12">'];
        this.separadores = [
            '<h3 class="titulo row">',
            '<h4 class="titulo row">',
            '<p class="titulo row">'
        ];
        // this.separadorConteudo = '<div class="separador-conteudo col-md-12 col-sm-12 col-xs-12">';
        this.separadorConteudo = '<div class="separador-conteudo row">';
        this._itemCurso;

        this.caregarItemCursoEvent = new Event(this);

        this.requisitarArquivosHtml();
    }

    requisitarArquivosHtml() {
        $.ajax({
            url: "./assets/html/itemCurso.html",
            datatype: "html",
            success: data => {
                this._itemCurso = data;
                this.caregarItemCursoEvent.notify(true);
            },
            error: () => {
                this.caregarItemCursoEvent.notify(false);
                throw new Error(
                    'Error: Falha ao carregar "itemCurso.html", favor reporte esse erro'
                );
            }
        });
    }

    get itemCurso() {
        return this._itemCurso || false;
    }
}
