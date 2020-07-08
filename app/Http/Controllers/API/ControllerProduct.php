<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Producto;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ControllerProduct extends Controller
{
    //

    public function get_all()
    {

        return Producto::all();
    }
    // funcion de insertar
    public function create(Request $request)
    {
        // inserta en DB
        Producto::insert([
            'titulo' => $request->input('nombre'),
            'descripcion' => $request->input('descripcion'),
            'precio' => $request->input('precio'),
            'cantidad' => $request->input('cantidad'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        // respuesta JSON
        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;

        return $response;
    }
    // funcion de actualizar
    public function update(Request $request)
    {
        $producto = Producto::find($request->input('id'));

        if (!$producto) {
            $response['message'] = "Producto no encontrado";
            $response['success'] = false;
        } else {
            Producto::where('id', $request->input('id'))->update([
                    'titulo' => $request->input('nombre'),
                    'descripcion' => $request->input('descripcion'),
                    'precio' => $request->input('precio'),
                    'cantidad' => $request->input('cantidad'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
            // respuesta JSON
            $response['message'] = "Actualizo exitosamente";
            $response['success'] = true;
        }

        return $response;
    }
    // funcion de eliminar
    public function delete(Request $request)
    {
        $producto = Producto::find($request->input('id'));

        if (!$producto) {
            $response['message'] = "Producto no encontrado";
            $response['success'] = false;
        } else {
            Producto::where('id', $request->input('id'))->delete();
            // respuesta JSON
            $response['message'] = "Eliminado exitosamente";
            $response['success'] = true;
        }

        return $response;
    }
}
