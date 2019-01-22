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
})({"javascript/Modelo.js":[function(require,module,exports) {
(function () {
  // Protótipo para objeto do Modelo do programa
  function Modelo(persistencia) {
    this.listaDeCursos;
    this.curso;
    this.persistencia = persistencia;
    this.ultimaPesquisa;
    this._disciplinasObj;
    this.infoSelected;
    this.ultimoInfo;
    this.carregarCursoEvent = new Agrade.Event(this);
    this.carregarListaDeCursosEvent = new Agrade.Event(this);
    this.pesquisaProcessadaEvent = new Agrade.Event(this);
    this.itemsModificadosEvent = new Agrade.Event(this);
    this.cabecalhoModificadoEvent = new Agrade.Event(this);
  }

  ; // Função que carrega arquivo json com informações do curso

  Modelo.prototype.carregarCurso = function (caminho) {
    var _this = this; //Caso estejam mandando carregar o major já carregado, só retorne o major sem fazer outra requisição


    if (this.curso && this.curso.id === caminho) {
      _this.carregarCursoEvent.notify(true, this.curso);
    } else {
      $.ajax({
        url: './config/cursos/' + caminho + '.json',
        datatype: 'json'
      }).success(function (json) {
        var curso = typeof json === 'string' ? JSON.parse(json) : json;
        curso.id = caminho;

        _this.prepararDadosDeCurso(curso);

        _this.curso = curso;

        var carregar = _this.persistencia.carregar(caminho);

        if (carregar) {
          carregar.forEach(function (id) {
            var disciplina = $.grep(_this.curso.disciplinas, function (e) {
              return e.id == id;
            })[0];
            if (typeof disciplina !== 'undefined') disciplina.feita = true;
          });
        }

        _this.curso.disciplinas.forEach(function (disciplina) {
          disciplina.liberada = _this._deveLiberar(disciplina);
        });

        _this.processarCabecalho(false);

        _this.curso.disciplinas.forEach(function (disciplina) {
          disciplina.liberada = _this._deveLiberar(disciplina);
        });

        _this.carregarCursoEvent.notify(true, _this.curso);
      }).error(function () {
        _this.carregarCursoEvent.notify(false);
      });
    }
  }; //Função que carrega lista de cursos do arquivo 'setup.json'


  Modelo.prototype.carregarListaDeCursos = function () {
    var _this = this; //Caso estejam mandando carregar a lista já carregada, só retorne a lista sem fazer outra requisição


    if (this.listaDeCursos) {
      _this.carregarListaDeCursosEvent.notify(true, _this.listaDeCursos);
    } else {
      $.ajax({
        url: './config/setup.json',
        datatype: 'json'
      }).success(function (json) {
        var listaDeCursos = typeof json === 'string' ? JSON.parse(json) : json;
        _this.listaDeCursos = [];

        for (x in listaDeCursos) {
          var curso = {
            nome: x,
            url: listaDeCursos[x]
          };

          _this.listaDeCursos.push(curso);
        }

        _this.listaDeCursos = _this.listaDeCursos.sort(function (a, b) {
          var x = a.nome.toLowerCase(),
              y = b.nome.toLowerCase();
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        });

        _this.carregarListaDeCursosEvent.notify(true, _this.listaDeCursos);
      }).error(function () {
        _this.carregarListaDeCursosEvent.notify(false);
      });
    }
  }; //Função que processa as pesquisas da barra de pesquisa


  Modelo.prototype.processarPesquisa = function (pesquisa) {
    var tokens, seletores, valores, propriedades, disciplinas, disciplinasObj, devePesquisar, taxonomias, grupos;
    pesquisa = pesquisa.trim();
    pesquisa = pesquisa.toLowerCase();
    devePesquisar = pesquisa != this.ultimaPesquisa;

    if (typeof this.infoSelected === 'undefined' && typeof this.ultimoInfo !== 'undefined') {
      devePesquisar = true;
    }

    if (devePesquisar) {
      this.ultimoInfo = undefined;
      this.ultimaPesquisa = pesquisa;
      tokens = pesquisa.split(' ');
      seletores = [];
      valores = [];
      tokens.forEach(function (token) {
        var leitor, seletor, valor;
        leitor = token.split('=');
        seletor = leitor[0];
        if (leitor.length >= 2) valor = leitor[1];

        if (seletor !== 'taxonomia') {
          seletores.push(seletor);
          if (valor == '') valor = undefined;
          valores.push(valor);
        }
      }); //Garanta que as disciplinas serão ordenadas ao menos alfabeticamente

      seletores.push('nome');
      valores.push(undefined); //Garanta que não há dois seletores iguais

      for (i = 0; i < seletores.length; i++) {
        if (typeof this.curso.disciplinas[0][seletores[i]] === 'undefined' && typeof this.curso.disciplinas[0].taxonomia[seletores[i]] === 'undefined') {
          seletores.splice(i, 1);
          valores.splice(i, 1);
          i--;
          continue;
        }

        for (j = i + 1; j < seletores.length - 1; j++) {
          if (seletores[i] === seletores[j]) {
            seletores.splice(j, 1);
            valores.splice(j, 1);
            j--;
            continue;
          }
        }
      }

      taxonomias = [];

      for (i = 0; i < seletores.length - 1; i++) {
        var seletor = seletores[i];

        if (typeof this.curso.disciplinas[0].taxonomia[seletor] !== 'undefined') {
          taxonomias.push(seletor);
        }
      } //Ordena as disciplinas pelos seletores que são propriedades dela. Ignora taxonomias


      this.curso.disciplinas = this.curso.disciplinas.sort(function (a, b) {
        for (i = 0; i < seletores.length; i++) {
          var seletor = seletores[i];

          if (typeof a.taxonomia[seletor] !== 'undefined') {
            if (a.taxonomia[seletor] < b.taxonomia[seletor]) return -1;
            if (a.taxonomia[seletor] > b.taxonomia[seletor]) return 1;
          }

          if (typeof a[seletor] !== 'undefined') {
            if (a[seletor] < b[seletor]) return -1;
            if (a[seletor] > b[seletor]) return 1;
          }
        }

        return 0;
      });
      disciplinas = [];
      this.curso.disciplinas.forEach(function (disciplina) {
        disciplinas.push(disciplina);
      }); //Remove da lista de disciplinas todas as discplinas que não correspondem aos valores dos seletores com '='

      for (i = 0; i < valores.length; i++) {
        if (typeof valores[i] !== 'undefined') {
          var seletor = seletores[i];

          for (j = 0; j < disciplinas.length; j++) {
            var disciplina = disciplinas[j];

            if (typeof disciplina[seletor] !== 'undefined') {
              if (String(disciplina[seletor]).toLowerCase().search(valores[i].toLowerCase()) === -1) {
                disciplinas.splice(j, 1);
                j--;
                continue;
              }
            } else if (typeof disciplina.taxonomia[seletor] !== 'undefined') {
              if (String(disciplina.taxonomia[seletor]).toLowerCase().search(valores[i].toLowerCase()) === -1) {
                disciplinas.splice(j, 1);
                j--;
                continue;
              }
            }
          }
        }
      }

      if (taxonomias.length > 0) disciplinasObj = {};else disciplinasObj = [];
      disciplinas.forEach(function (disciplina) {
        var obj = disciplinasObj;

        if (taxonomias.length > 0) {
          for (i = 0; i < taxonomias.length; i++) {
            var seletor = taxonomias[i];

            if (typeof disciplina.taxonomia[seletor] !== 'undefined') {
              var chave = seletor + ' ' + disciplina.taxonomia[seletor];

              if (typeof obj[chave] === 'undefined') {
                if (i === taxonomias.length - 1) {
                  obj[chave] = [];
                } else {
                  obj[chave] = {};
                  obj = obj[chave];
                }
              } else {
                if (!(obj[chave] instanceof Array)) obj = obj[chave];
              }

              if (i === taxonomias.length - 1) {
                obj[chave].push(disciplina);
              }
            }
          }
        } else {
          obj.push(disciplina);
        }
      });
      this._disciplinasObj = disciplinasObj;
    }

    this.pesquisaProcessadaEvent.notify(this._disciplinasObj);
  }; //Função que adiciona varriáveis ao objeto curso


  Modelo.prototype.prepararDadosDeCurso = function (curso) {
    var listaDeConjuntosComCreditosNaoCalculados,
        _this = this;

    listaDeConjuntosComCreditosNaoCalculados = []; //Número total de disciplinas

    curso.totalDeDisciplinas = 0; //Número total de créditos do curso

    curso.totalDeCreditos = 0; //Número total de disciplinas feitas

    curso.totalDeDisciplinasFeitas = 0; //Número total de créditos feitos do curso

    curso.totalDeCreditosFeitos = 0;
    curso.conjuntos.forEach(function (conjunto) {
      conjunto.disciplinasFeitas = 0;
      conjunto.creditosFeitos = 0;
      curso.totalDeDisciplinas += conjunto.disciplinas;
      curso.totalDeCreditos += conjunto.creditos;
      if (conjunto.creditos === 0) listaDeConjuntosComCreditosNaoCalculados.push(conjunto);
    });
    curso.disciplinas.forEach(function (disciplina) {
      var creditosPrecisamSerCalculados;
      creditosPrecisamSerCalculados = false;
      disciplina.feita = false;
      disciplina.liberada = false;
      listaDeConjuntosComCreditosNaoCalculados.forEach(function (conjunto) {
        if (conjunto.nome === disciplina.taxonomia.conjunto) {
          console.log(conjunto.nome);
          creditosPrecisamSerCalculados = true;
          conjunto.creditos += disciplina.creditos;
        }
      });

      if (creditosPrecisamSerCalculados) {
        curso.totalDeCreditos += disciplina.creditos;
      }
    });
  };

  Modelo.prototype.salvarLocalmente = function () {
    var dicsciplinasFeitas = [];
    this.curso.disciplinas.forEach(function (disciplina) {
      if (disciplina.feita) {
        dicsciplinasFeitas.push(disciplina.id);
      }
    });
    this.persistencia.salvarLocalmente(dicsciplinasFeitas, this.curso.id);
  };

  Modelo.prototype.processarCabecalho = function (notify) {
    var _this = this; //Número total de disciplinas feitas


    this.curso.totalDeDisciplinasFeitas = 0; //Número total de créditos feitos do curso

    this.curso.totalDeCreditosFeitos = 0;
    this.curso.conjuntos.forEach(function (conjunto) {
      conjunto.disciplinasFeitas = 0;
      conjunto.creditosFeitos = 0;
    });
    this.curso.disciplinas.forEach(function (disciplina) {
      if (disciplina.liberada && disciplina.feita) {
        var conjunto = $.grep(_this.curso.conjuntos, function (e) {
          return e.nome == disciplina.taxonomia.conjunto;
        })[0];

        if (typeof conjunto !== 'undefined') {
          if (conjunto.disciplinas <= 0 || conjunto.disciplinasFeitas < conjunto.disciplinas) {
            conjunto.disciplinasFeitas++;
            conjunto.creditosFeitos += disciplina.creditos;
          }
        }
      }
    });
    this.curso.conjuntos.forEach(function (conjunto) {
      _this.curso.totalDeDisciplinasFeitas += conjunto.disciplinasFeitas;
      _this.curso.totalDeCreditosFeitos += Math.min(conjunto.creditosFeitos, conjunto.creditos);
    });
    if (typeof notify === 'undefined' || !notify) this.cabecalhoModificadoEvent.notify(this.curso);
  };

  Modelo.prototype.desfazerTodos = function () {
    var _this = this;

    this.curso.disciplinas.forEach(function (disciplina) {
      disciplina.feita = false;
      libera = $.grep(_this.curso.disciplinas, function (e) {
        return $.inArray(disciplina.id, e.requisitos) !== -1;
      });
      libera.forEach(function (disciplina) {
        disciplina.liberada = false;
      });
    });
    this.salvarLocalmente();
    this.processarCabecalho();
    this.pesquisaProcessadaEvent.notify(this._disciplinasObj);
  };

  Modelo.prototype.interagirComDisciplina = function (id) {
    var disciplina,
        disciplinasModificadas,
        _this = this;

    disciplina = $.grep(this.curso.disciplinas, function (e) {
      return e.id == id;
    })[0];
    disciplinasModificadas = [];

    if (typeof disciplina !== 'undefined') {
      if (disciplina.liberada) {
        disciplina.feita = !disciplina.feita;
        disciplinasModificadas.push(disciplina);

        if (disciplina.feita) {
          libera = $.grep(this.curso.disciplinas, function (e) {
            return $.inArray(id, e.requisitos) !== -1;
          });
          libera.forEach(function (disciplina) {
            disciplinasModificadas.push(disciplina);
            disciplina.liberada = _this._deveLiberar(disciplina);
          });
        } else {
          libera = $.grep(this.curso.disciplinas, function (e) {
            return $.inArray(id, e.requisitos) !== -1;
          });
          libera.forEach(function (disciplina) {
            disciplinasModificadas.push(disciplina);
            disciplina.liberada = false;
          });
        }
      }
    }

    if (disciplinasModificadas.length > 0) this.processarCabecalho();

    _this._verificarDisciplinasComCreditosMinimos(disciplinasModificadas);

    this.salvarLocalmente();
    this.itemsModificadosEvent.notify(disciplinasModificadas);
  };

  Modelo.prototype.interagirComInfo = function (id) {
    this.ultimoInfo = this.infoSelected;

    if (this.infoSelected == id) {
      this.infoSelected = undefined;
    } else {
      this.infoSelected = id;
    }

    if (typeof this.infoSelected !== 'undefined') {
      var disciplina, disciplinas;
      disciplina = $.grep(this.curso.disciplinas, function (e) {
        return e.id == id;
      })[0];
      disciplinas = {
        requisitos: [],
        disciplina: [disciplina],
        desbloqueia: []
      };

      for (var i = 0; i < disciplina.requisitos.length; i++) {
        var idRequisito = disciplina.requisitos[i];
        var requisito = $.grep(this.curso.disciplinas, function (e) {
          return e.id == idRequisito;
        })[0];
        if (typeof requisito !== 'undefined') disciplinas.requisitos.push(requisito);
      }

      disciplinas.desbloqueia = $.grep(this.curso.disciplinas, function (e) {
        return $.inArray(id, e.requisitos) !== -1;
      });
      this._disciplinasObj = disciplinas;
      this.pesquisaProcessadaEvent.notify(this._disciplinasObj, id);
    } else {
      this.processarPesquisa(this.ultimaPesquisa);
    }
  };

  Modelo.prototype._deveLiberar = function (disciplina) {
    var requisitos = disciplina.requisitos,
        _this = this;

    for (var i = 0; i < requisitos.length; i++) {
      var id = requisitos[i];
      var disci = $.grep(_this.curso.disciplinas, function (e) {
        return e.id == id;
      })[0];

      if (typeof disci !== 'undefined') {
        if (!disci.feita) return false;
      }
    }

    if (typeof disciplina.minCreditos !== 'undefined') if (this.curso.totalDeCreditosFeitos < disciplina.minCreditos) return false;
    return true;
  };

  Modelo.prototype._verificarDisciplinasComCreditosMinimos = function (modificadas) {
    var libera = $.grep(this.curso.disciplinas, function (e) {
      return typeof e.minCreditos !== 'undefined';
    }),
        _this = this;

    libera.forEach(function (disciplina) {
      modificadas.push(disciplina);
      disciplina.liberada = _this._deveLiberar(disciplina);
    });
  };

  window.Agrade = window.Agrade || {};
  window.Agrade.Modelo = Modelo;
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascript/Modelo.js"], null)
//# sourceMappingURL=/Modelo.e2b912aa.map