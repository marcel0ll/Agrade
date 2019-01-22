import Template from './Template';
import Persistencia from './Persistencia';
import Modelo from './Modelo';
import Visao from './Visao';
import Controlador from './Controlador';

let versao = '0.0.15-beta';
let template = new Template ();
let persistencia = new Persistencia ();
let modelo = new Modelo ( persistencia );
let visao = new Visao ( template, versao );
let controlador = new Controlador ( modelo, visao );
