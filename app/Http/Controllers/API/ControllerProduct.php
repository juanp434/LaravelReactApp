<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Producto;
use Illuminate\Http\Request;

class ControllerProduct extends Controller
{
    //

    public function get_all(){

        return Producto::all();
    }
}
