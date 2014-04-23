import {Injector, Inject} from 'di';
import {ModuleLoader} from './util/module_loader';
import {ArrayOfClass} from './types';
import {Global} from './global';
import {DocumentReady} from './util/document_ready';
import {ViewFactory} from './view_factory';

export function bootstrap(compileTemplatesOnTheFly = true) {
  var injector = new Injector();
  injector.get(Bootstrap)(compileTemplatesOnTheFly);
}

// TODO: Create tests for this
@Inject(Global, ModuleLoader, DocumentReady)
export function Bootstrap(global, moduleLoader, documentReady) {
  return bootstrap;

  function bootstrap(compileTemplatesOnTheFly) {
    return documentReady.then(function() {
      return moduleLoader([getLastPathPart(global.location.pathname)]);
    }).then(function(modules) {
      var module = modules[0];
      return module.promise;
    }).then(function(templatesAndModules) {
      var appTemplates = templatesAndModules.appTemplates;
      if (!appTemplates) {
        return;
      }
      appTemplates.forEach((template) => {
        var rootView;
        window.zone.fork({
          afterTask: function () {
            if (rootView) {
              rootView.digest();
            }
          },
          onError: function(err) {
            // TODO(vojta): nice error handling for Tobias
            console.log(err.stack)
          }
        }).run(function() {
          var rootInjector = new Injector();
          var viewFactory = rootInjector.get(ViewFactory);

          var initHello = {
            value: 'Hello',
                right: { value: 'World' },
                left: { value: 'Everybody' }  
              };
          var initBye = {
            value: 'Goodbye',
                right: { value: 'Moon' },
                left: { value: 'Sailor' }
          };
          var scope = {
              'initData': {
                value: 'Hello',
                right: { value: 'World' },
                left: { value: 'Everybody' }  
              }
            };

          benchmarkSteps.push({
            name: 'cleanup',
            fn: function CleanUp() {
              scope.initData = {};
              rootView.digest();
            }
          });

          var c = 0;
          benchmarkSteps.push({
            name: 'createDom',
            fn: function CreateDom() {
              scope.initData = initHello;

             /* var values = [];
              var maxDepth = 2;
               for (var i = 0; i < maxDepth; i++) {
                  values.push(Math.random() > 0.5 ? '|' : '-');
                }
             function buildData(depth) {
                  if (depth == maxDepth) return {};
                  return {
                    value: values[depth],
                    right: buildData(depth + 1),
                    left: buildData(depth + 1)
                  }
                }
              scope.initData = c++ % 2 == 0 ? initHello : initBye; 
              console.log('initData', scope.initData); */

              // scope.initData = {
              //   value: 'Hello ' + c++,
              //   right: { value: 'World' },
              //   left: { value: 'Everybody' }  
              // }
              rootView.digest();
            }
          });

          rootView = viewFactory.createRootView({
            template: template,
            executionContext: scope,
            
          });

          if (!compileTemplatesOnTheFly) {
            rootView.appendTo(document.body)
          }
        });
      });
      return appTemplates;
    }, function(e) {
      console.log(e.stack)
    });
  }
}

// TODO: Can't bootstrap automatically
// as this leads to problems in the unit tests

function getLastPathPart(path) {
  var parts = path.split('/');
  return parts[parts.length-1];
}
