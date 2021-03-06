
var app = angular.module('ABMangularPHP', ['ngAnimate','ui.router','angularFileUpload','satellizer'])
.config(function($stateProvider, $urlRouterProvider,$authProvider) {
 
  $authProvider.loginUrl = 'TP_Pizzeria/PHP/clases/autentificador.php';
  $authProvider.signupUrl = 'TP_Pizzeria/PHP/clases/autentificador.php';
  $authProvider.tokenName = 'mytoken2016';
  $authProvider.tokenPrefix = 'ABM_Persona';
  $authProvider.authHeader = 'Data';

  $stateProvider
    .state('menu', {
      views: {
        'principal': { templateUrl: 'template/menu.html',controller: 'controlMenu' },
        'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
      }
      ,url:'/menu'
    })
    .state('login', {
       views: {
          'principal': { templateUrl: 'template/templateLoguin.html',controller: 'controlLoguin' },
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
        }, url: '/login'
        })
    ///{nombre}?:password
    .state('grilla', {
        url: '/grilla',
        views: {
          'principal': { templateUrl: 'template/templateGrilla.html',controller: 'controlGrilla' },
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
        }
      })
    .state('grillaFiltro', {
        url: '/grillaFiltro',
        views: {
          'principal': { templateUrl: 'template/templateGrillaFiltro.html',controller: 'controlGrillaFiltro'} ,
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'} }    
      })
    .state('alta', {
        url: '/alta',
        views: {
          'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlAlta' },
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
        }
      })
      .state('modificar', {
        url: '/modificar/{id}?:nombre:apellido:dni:foto',
         views: {
          'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlModificacion' },
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
        }
      })
      .state("logout", {
                     views: {
          'principal': { templateUrl: 'template/templateLoguin.html',controller: 'controlLogout' },
          'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
                    },
                    url: "/logout"
                })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); //cuando se haga el login feemplazar /menu por /login

});//fin config

app.controller('controlMenuSup', function($scope, $http, $auth, $state, $stateParams, servicioMjePrincipal) {
      if(servicioMjePrincipal.mensaje!= null)
      {
        $scope.MensajePrincipal = servicioMjePrincipal.mensaje;
        console.log($scope.MensajePrincipal);
      }    
else{

      console.log(servicioMjePrincipal.mensaje);
   };//fin else
    
    
});//fin del controlMenuSup
app.controller('controlLoguin', function($scope, $http, $auth, $state, $stateParams, servicioMjePrincipal) {
  
  // var mail = $stateParams.mail;
   // var nombre = $stateParams.nombre;
   // var pass = $stateParams.password;
 
   
    
  
   $scope.logear=function(pass , nombre) {
     console.info("respuesta del loguin1", pass , nombre);
      $auth.login({usuario:nombre,clave:pass})
      .then(function(respuestadeauth){
      console.info("respuesta del loguin",respuestadeauth);
      console.info("respuesta del loguinasda",$auth.isAuthenticated());
      if($auth.isAuthenticated())
      {
        servicioMjePrincipal.CargarMje("Bienvenido "+nombre);
        console.log($auth.getToken());
        $state.go('menu');
      }
      else
        {
          servicioMjePrincipal.CargarMje("Está desconectado.");
          $state.go('login');  
        }
      //  console.info("datos auth en menu", $auth.isAuthenticated(),$auth.getPayload());
    }).catch(function(parametro){
      console.info("ERROR", parametro);
   });//fin catch
  };//fin logear

});//fin del controlLoguin

app.controller('controlLogout',function($scope, $http, $auth, $location, servicioMjePrincipal){
  console.log("Deslogueo mytoken2016");
  $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            console.log("Deslogueo mytoken2016");
           localStorage.removeItem('mytoken2016');
           servicioMjePrincipal.CargarMje("Está desconectado.");
           $location.path("/Loguin") 
        },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
});//fin logout

app.controller('controlMenu', function($scope, $http, $auth, $state) {
  $scope.DatoTest="test";
  $scope.DatoInicio="Cargame";
  if(!$auth.isAuthenticated())
        {
          console.log("Validacion en Menu INCORRECTA");
          $state.go('login');
        }
  else{
   //Fin else
   /*if($auth.isAuthenticated())
    {
      $state.go('alta');
    }
    else
      {
        $state.go('menu');
      }
    $auth.login({usuario:"pepito",clave:"666"});
    $scope.DatoTest="**Menu**";
    console.info("datos auth en menu", $auth.isAuthenticated(),$auth.getPayload());*/
     }
});//fin controlMenu

app.controller('controlAlta', function($scope, $http ,$state,$auth,FileUploader,cargadoDeFoto,servicioMjePost) {
    $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
    $scope.uploader.queueLimit = 1;// aparentemente esto tiene que estar antes de la validacion sino tira error.
    if(!$auth.isAuthenticated())
      {
       console.log("Validacion en ALTA INCORRECTA");
        $state.go('login');
      }
    else
      {
      $scope.DatoTest="**alta**";
      //inicio las variables

      $scope.producto={};
      $scope.producto.nombre= "natalia" ;
      $scope.producto.dni= "12312312" ;
      $scope.producto.apellido= "natalia" ;
      $scope.producto.foto="pordefecto.png";
      cargadoDeFoto.CargarFoto($scope.producto.foto,$scope.uploader);
 
      $scope.Mje=function()
      {

        servicioMjePost.retornarMje.then(function(carga)
        {
          $scope.MyMje=  carga;
          }); //fin then
        }//fin mje

      $scope.Guardar=function(){
      console.log($scope.uploader.queue);
      if($scope.uploader.queue[0].file.name!='pordefecto.png')
      {
        var nombreFoto = $scope.uploader.queue[0]._file.name;
        $scope.producto.foto=nombreFoto;
      }
      $scope.uploader.uploadAll();
        console.log("producto a guardar:");
        console.log($scope.producto);
      }
       $scope.uploader.onSuccessItem=function(item, response, status, headers)
      {
        //alert($scope.producto.foto);
          $http.post('PHP/nexo.php', { datos: {accion :"insertar",producto:$scope.producto}})
            .then(function(respuesta) {       
               //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);
             $state.go("grilla");

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
            });
        console.info("Ya guardé el archivo.", item, response, status, headers);
      }; // fin onSuccessItem
      }//fin del else
 });// fin control del Alta

app.controller('controlGrilla', function($scope, $http,$location,$state,$auth,factoryProducto){
    $scope.DatoTest="**grilla**";
     if(!$auth.isAuthenticated())
          {
            console.log("Validacion en GRILLA INCORRECTA");
            $state.go('login');
          }
    else{
    //factoryPersona.mostrarNombre("Molina");
     factoryProducto.TraerListado().then(function(carga){
      $scope.ListadoProductos=  carga;
    });
    $scope.guardar = function(producto){
    console.log( JSON.stringify(producto));
    }

   } //fin del ELSE
  	$scope.Borrar=function(producto){
		console.log("borrar"+producto);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",producto:producto}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                           $scope.ListadoProducto = respuesta.data.listado;
                           console.log(respuesta.data);

                      },function errorCallback(response) {
                           $scope.ListadoProducto= [];
                          console.log( response);
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
 	  }// $scope.Borrar
   $scope.videoSources = [];
        
        $scope.loadVideos = function() {
            $scope.videoSources =('http://www.w3schools.com/html/mov_bbb.mp4');
          
        };
});//app.controller('controlGrilla',

app.controller('controlGrillaFiltro', function($scope, $http,$location,$state,cienDatos) {
    $scope.DatoTest="**grillaFiltro**";
    console.info(cienDatos);
    $scope.ListadoProducto= cienDatos;
    $scope.filtraraPorMoneda= function(valoractual, valoresperado, tercerparametro){
      if(valoractual.indexOf(valoresperado)===0)
        {return true;
        console.info("valores ",valoresperado,valoractual);}
      else{
      return false;}
    };//fin filtrarPorMoneda

});//app.controller('controlGrillaFiltro',

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)
  {
  $scope.producto={};
  $scope.DatoTest="**Modificar**";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;
  $scope.producto.id=$stateParams.id;
  $scope.producto.nombre=$stateParams.nombre;
  $scope.producto.apellido=$stateParams.apellido;
  $scope.producto.dni=$stateParams.dni;
  $scope.producto.foto=$stateParams.foto;

  $scope.cargarfoto=function(nombrefoto){

      var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.producto.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",producto:$scope.producto}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grilla");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(producto)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.producto.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});//app.controller('controlModificacion')

app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }
});//app.service('cargadoDeFoto',function($http,FileUploader){

app.factory("factoryProducto",function(servicioProducto){
  var producto = {
    TraerListado:  function(){ 
     return servicioProducto.retornarProducto().then(function(respuesta){
        console.log(respuesta);
        return respuesta ;
      }) //console.log("este es mi nombre "+dato)
      }//fin de TraerListado
  }; //fin producto
  return producto;
});//Fin cargadoDeFoto

app.service('servicioProducto',function($http){ 
  //var lista= {
  this.retornarProducto=function(){
     // return listado;
    return  $http.get('/TP_Pizzeria/Datos/Producto')// el nombre completo de la pagina
    .then(function(respuesta) {       
         return  respuesta.data;
         //console.log(respuesta.data);
    },function errorCallback(response) {
        return [];
       // console.log( response);     
   });
   };//fin retornarPersona
});//app.service

app.service('servicioUsuario',function($http){ 
  //var lista= {
  this.retornarProducto=function(){
     // return listado;
    return  $http.get('/TP_Pizzeria/Datos/Usuario')// el nombre completo de la pagina
    .then(function(respuesta) {       
         return  respuesta.data;
         //console.log(respuesta.data);
    },function errorCallback(response) {
        return [];
       // console.log( response);     
   });
   };//fin retornarPersona
});//app.service

app.service('servicioMjePrincipal',function($http){ 
 var mensaje ='Desconectado';

  this.CargarMje= function (mje) {
    this.mensaje=mje;  
    return true;     
   }
   return mensaje; 
});//app.servicioMjePrincipal

app.service('servicioMjePost',function($http){ 
  //var lista= {
  this.retornarMje=function(){
      //var listado = "GermanMolina";
     // return listado;
    return  $http.post('/TP_Pizzeria/Datos/',{uno: 1, fruta: "manzana"})// el nombre completo de la pagina
    .then(function(respuesta) {       
         return  respuesta.data;
         //console.log(respuesta.data);
    },function errorCallback(response) {
        return [];
       // console.log( response);     
   });
   };//fin retornarMje
});//app.service servicioMjePost