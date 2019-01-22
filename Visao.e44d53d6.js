// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"javascript/Visao.js":[function(require,module,exports) {
(function () {
  function Visao(template, versao) {
    this.template = template;
    this.$camadaCarregando = $('#carregando');
    this.$camadaSeletor = $('#seletor');
    this.$cursosDropdown = $('#cursoSelector');
    this.$carregarCurso = $('#carregar');
    this.$camadaLista = $('#lista');
    this.$listaDeDisciplinas = $('#lista-disciplinas');
    this.$nomeDoCurso = $('#lista-nomeCurso');
    this.$camadaBarraDoTopo = $('#query');
    this.$maisDetalhes = $('#more__plus');
    this.$minimizar = $('#topBar-minimizar');
    this.$desfazerTodos = $('#topBar-desfazer');
    this.$dadosDeConjuntos = $('#topBar-dataConjuntos');
    this.$porcentagemDoCurso = $('#topBar-data__porcentagemDoCurso-conteudo');
    this.$creditosFeitos = $('#topBar-data__creditosFeitos');
    this.$creditosParaFazer = $('#topBar-data__creditosTotais');
    this.$barraDoTopoNomeDoCurso = $('#topBar-data__nomeCurso');
    this.$barraDePesquisa = $('#query-input');
    this.minimizar = true;
    this.desejaDesfazer = false;
    this.iniciarEvent = new Agrade.Event(this);
    this.carregarCursoEvent = new Agrade.Event(this);
    this.checkboxCliqueEvent = new Agrade.Event(this);
    this.infoCliqueEvent = new Agrade.Event(this);
    this.separadorCliqueEvent = new Agrade.Event(this);
    this.desfazerTodosEvent = new Agrade.Event(this);
    this.mudarPesquisaEvent = new Agrade.Event(this);
    $('.footer-version').text(versao);
    $(document).ready(this.iniciar.bind(this));
  }

  Visao.prototype.iniciar = function () {
    var caminhoInteiro, caminho; //Pegue a URL inteira do browser

    caminhoInteiro = window.location.href; //Separe ela pelo '#'' e pegue a segunda parte

    caminho = caminhoInteiro.split('#')[1]; //Notifique que o aplicativo foi iniciado com esse caminho

    this.iniciarEvent.notify(caminho);
  };

  Visao.prototype.iniciarSelecaoDeCurso = function (listaDeCursos) {
    console.log("iniciarSelecaoDeCurso");
    this.$cursosDropdown.selectize({
      maxItems: 1,
      valueField: 'url',
      labelField: 'nome',
      searchField: 'nome',
      options: listaDeCursos,
      items: [listaDeCursos[0].url],
      create: false
    });
    this.$camadaCarregando.hide();
    this.$carregarCurso.click(this.carregarCurso.bind(this));
  };

  Visao.prototype.iniciarListagemDoCurso = function (curso) {
    var _this = this;

    console.log(curso); //Alterar url da pagina para condizer com curs

    window.location.hash = curso.id;

    if (this.template.itemCurso) {
      this.$camadaCarregando.hide();
      this.$camadaSeletor.hide();
      this.$camadaLista.show();
      this.$camadaBarraDoTopo.show();
      this.atualizarCabecalho(curso);
      this.$nomeDoCurso.text(curso.nomeCompleto);
      this.$maisDetalhes.click(function () {
        var $this;
        $this = $(this);
        $this.toggleClass('glyphicon-minus');
        $this.toggleClass('glyphicon-plus');

        if (!_this.$camadaBarraDoTopo.hasClass('aberta')) {
          _this.$camadaBarraDoTopo.addClass('aberta');

          _this.$camadaBarraDoTopo.removeClass('fechada');
        } else {
          _this.$camadaBarraDoTopo.addClass('fechada');

          _this.$camadaBarraDoTopo.removeClass('aberta');
        }
      });
      this.$minimizar.click(function () {
        $('.separador>.titulo>span', this.$listaDeDisciplinas).each(function (element) {
          var $this;
          $this = $(this).parent().parent();

          if (_this.minimizar) {
            $('.titulo>span', $this).removeClass('glyphicon-minus');
            $('.titulo>span', $this).addClass('glyphicon-plus');
            $('.separador-conteudo', $this).hide();
          } else {
            $('.titulo>span', $this).addClass('glyphicon-minus');
            $('.titulo>span', $this).removeClass('glyphicon-plus');
            $('.separador-conteudo', $this).show();
          }
        });
        _this.minimizar = !_this.minimizar;
        $('span', _this.$minimizar).toggleClass('glyphicon-minus');
        $('span', _this.$minimizar).toggleClass('glyphicon-plus');
      });
      this.$desfazerTodos.click(function () {
        if (!_this.desejaDesfazer) {
          _this.desejaDesfazer = true;
          $(this).toggleClass('btn-warning');
          $(this).toggleClass('btn-danger');
          $(this).text('Confirmar');
          _$this = $(this);
          setTimeout(function () {
            _this.desejaDesfazer = false;

            _$this.addClass('btn-warning');

            _$this.removeClass('btn-danger');

            _$this.text('Desfazer todos');
          }, 1500);
        } else {
          _this.desejaDesfazer = false;
          $(this).toggleClass('btn-warning');
          $(this).toggleClass('btn-danger');
          $(this).text('Desfazer todos');

          _this.desfazerTodosEvent.notify();
        }
      });
      this.$barraDePesquisa.keyup(function () {
        _this.mudarPesquisaEvent.notify($(this).val().toLowerCase());
      });
    } else {
      this.$camadaCarregando.show();
      this.template.caregarItemCursoEvent.onEventCall(function () {
        _this.iniciarListagemDoCurso();
      });
    }
  };

  Visao.prototype.carregarCurso = function () {
    var caminho = this.$cursosDropdown[0].selectize.getValue();
    this.carregarCursoEvent.notify(caminho);
  };

  Visao.prototype.criarGrupo = function (id, nivel, $pai) {
    var separadorId = Math.min(nivel, this.template.separadores.length - 1);
    var $separador = $('<div class="separador">'),
        $titulo = $(this.template.separadores[separadorId]),
        $conteudo = $(this.template.separadorConteudo);
    id = id.charAt(0).toUpperCase() + id.slice(1);
    $titulo.text(id);
    $titulo.prepend($('<span class="glyphicon glyphicon-minus"></span>'));
    $separador.attr('data-id', id);
    $separador.addClass('col-md-12 col-sm-12 col-xs-12');
    $separador.append($titulo);
    $separador.append($conteudo);
    $pai.append($separador);
    return $conteudo;
  };

  Visao.prototype.fazerLista = function (disciplinasObj, infoId) {
    // console.log( disciplinasObj );
    var _this = this;

    this.$listaDeDisciplinas.empty();

    function lookDown(obj, id, nivel, pai) {
      if (id) pai = _this.criarGrupo(id, nivel, pai);

      if (!(obj instanceof Array)) {
        for (x in obj) {
          lookDown(obj[x], x, nivel + 1, pai);
        }
      } else {
        obj.forEach(function (disciplina) {
          _this.adicionarDisciplina(disciplina, pai);
        });
      }
    }

    lookDown(disciplinasObj, null, -1, this.$listaDeDisciplinas);

    if (typeof infoId !== 'undefined') {
      var element = $($('.info[data-id=' + infoId + ']')[0]);
      element.addClass('selecionado');
      $('span', element).toggleClass('glyphicon-chevron-left glyphicon-info-sign');
    } //Adicione evento no checkbox de cada disciplina


    $('.checkbox', this.$listaDeDisciplinas).click(function () {
      var $this, id;
      $this = $(this);
      id = $this.attr('data-id');
      console.log(id);

      _this.checkboxCliqueEvent.notify(id);

      event.stopPropagation();
    }); //Adicione evento no info de cada disciplina

    $('.info', this.$listaDeDisciplinas).click(function () {
      var $this, id;
      $this = $(this);
      id = $this.attr('data-id');
      console.log(id);

      _this.infoCliqueEvent.notify(id);

      event.stopPropagation();
    });
    $('.separador>.titulo>span', this.$listaDeDisciplinas).click(function (event) {
      var $this;
      $this = $(this).parent().parent();
      $($('.titulo>span', $this)[0]).toggleClass('glyphicon-minus');
      $($('.titulo>span', $this)[0]).toggleClass('glyphicon-plus');
      $($('.separador-conteudo', $this)[0]).toggle();
      event.stopPropagation();
    });
  };

  Visao.prototype.adicionarDisciplina = function (disciplina, $pai) {
    var $disciplina, html;
    html = this.template.itemCurso;
    html = html.replace(new RegExp('{{disciplina.id}}', 'g'), disciplina.id);
    html = html.replace(new RegExp('{{disciplina.nome}}', 'g'), disciplina.nome);
    $disciplina = $(html);
    $disciplina.attr('data-id', disciplina.id);

    if (!disciplina.liberada) {
      $('.checkbox', $disciplina).addClass('trancada');
    } else if (disciplina.feita) {
      $('.checkbox', $disciplina).addClass('feita');
    }

    $pai.append($disciplina);
  };

  Visao.prototype.definirPesquisa = function (pesquisa) {
    this.$barraDePesquisa.val(pesquisa);
  };

  Visao.prototype.atualizarDisciplinas = function (disciplinas) {
    console.log("longo caminho", disciplinas);
    disciplinas.forEach(function (disciplina) {
      $disciplina = $($('.checkbox[data-id=' + disciplina.id + ']')[0]);

      if (disciplina.liberada) {
        $disciplina.removeClass('trancada');

        if (disciplina.feita) {
          $disciplina.addClass('feita');
        } else {
          $disciplina.removeClass('feita');
        }
      } else {
        $disciplina.addClass('trancada');
        $disciplina.removeClass('feita');
      }
    });
  };

  Visao.prototype.atualizarCabecalho = function (curso) {
    this.$porcentagemDoCurso.text((curso.totalDeCreditosFeitos * 100 / curso.totalDeCreditos).toFixed(2) + '%');
    this.$creditosFeitos.text(curso.totalDeCreditosFeitos);
    this.$creditosParaFazer.text(curso.totalDeCreditos);
    this.$barraDoTopoNomeDoCurso.text(curso.nome);
    this.$dadosDeConjuntos.empty();
    var $conjunto = $('<div class="col-md-12 col-sm-12 col-xs-12">');
    var $row = $('<div class="row">');
    $row.append($('<div class="col-md-6 col-sm-6 col-xs-3"> <h4> Conjunto </h4> </div>'));
    $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> <h4> Creditos </h4> </div>'));
    $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> <h4> Disciplinas </h4> </div>'));
    $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> <h4> Porcentagem </h4> </div>'));
    $conjunto.append($row);
    this.$dadosDeConjuntos.append($conjunto);

    for (i = 0; i < curso.conjuntos.length; i++) {
      var conjunto = curso.conjuntos[i];
      var $conjunto = $('<div class="col-md-12 col-sm-12 col-xs-12">');
      var $row = $('<div class="row">');
      $row.append($('<div class="col-md-6 col-sm-6 col-xs-3">' + conjunto.nome + '</div>'));
      $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> ' + conjunto.creditosFeitos + ' / ' + conjunto.creditos + ' </div>'));
      $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> ' + conjunto.disciplinasFeitas + ' / ' + conjunto.disciplinas + ' </div>'));
      $row.append($('<div class="col-md-2 col-sm-2 col-xs-3"> ' + (conjunto.creditosFeitos * 100 / conjunto.creditos).toFixed(2) + '% </div>'));
      $conjunto.append($row);
      this.$dadosDeConjuntos.append($conjunto);
    }
  };

  window.Agrade = window.Agrade || {};
  window.Agrade.Visao = Visao;
})();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36721" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascript/Visao.js"], null)
//# sourceMappingURL=/Visao.e44d53d6.map