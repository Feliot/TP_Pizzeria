<?php
require_once"accesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $tipo;
 	public $marca;
  	public $precio;
  	public $stock;
  	public $foto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function Getmarca()
	{
		return $this->marca;
	}
	public function Gettipo()
	{
		return $this->tipo;
	}
	public function Getprecio()
	{
		return $this->precio;
	}
	public function GetFoto()
	{
		return $this->foto;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function Setmarca($valor)
	{
		$this->marca = $valor;
	}
	public function Settipo($valor)
	{
		$this->tipo = $valor;
	}
	public function Setprecio($valor)
	{
		$this->precio = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($precio=NULL)
	{
		if($precio != NULL){
			$obj = Producto::TraerUnProducto($precio);
			
			$this->marca = $obj->marca;
			$this->tipo = $obj->tipo;
			$this->precio = $precio;
			$this->stock = $stock;
			$this->foto = $obj->foto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->marca."-".$this->tipo."-".$this->precio."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaProducto(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscada= $consulta->fetchObject('Producto');
		return $productoBuscada;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodosLosProductos() ");
		$consulta->execute();			
		$arrproductos= $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");	
		return $arrproductos;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from producto	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarProducto(:pid)");	
		$consulta->bindValue(':pid',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update producto 
				set tipo=:tipo,
				marca=:marca,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarProducto(:pid,:pmarca,:pprecio,:pstock,:ptipo:pfoto)");
			$consulta->bindValue(':pid',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':pmarca', $producto->marca, PDO::PARAM_STR);
			$consulta->bindValue(':pprecio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':pstock', $producto->stock, PDO::PARAM_INT);
			$consulta->bindValue(':ptipo',$producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':pfoto', $producto->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertarproducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto (tipo,marca,precio,foto)values(:tipo,:marca,:precio,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarProducto (:pmarca,:pprecio,:pstock,:ptipo,:foto)");
			$consulta->bindValue(':pmarca', $producto->marca, PDO::PARAM_STR);
			$consulta->bindValue(':pprecio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':pstock', $producto->stock, PDO::PARAM_INT);
			$consulta->bindValue(':ptipo',$producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':pfoto', $producto->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerProductosTest()
	{
		$arrayDeproductos=array();

		$producto = new stdClass();
		$producto->id = "4";
		$producto->tipo = "rogelio";
		$producto->marca = "agua";
		$producto->precio = "333333";
		$producto->foto = "333333.jpg";

		//$objetJson = json_encode($producto);
		//echo $objetJson;
		$producto2 = new stdClass();
		$producto2->id = "5";
		$producto2->tipo = "Bañera";
		$producto2->marca = "giratoria";
		$producto2->precio = "222222";
		$producto2->foto = "222222.jpg";

		$producto3 = new stdClass();
		$producto3->id = "6";
		$producto3->tipo = "Julieta";
		$producto3->marca = "Roberto";
		$producto3->precio = "888888";
		$producto3->foto = "888888.jpg";

		$arrayDeproductos[]=$producto;
		$arrayDeproductos[]=$producto2;
		$arrayDeproductos[]=$producto3;
		 
		

		return  $arrayDeproductos;
				
	}	


}
