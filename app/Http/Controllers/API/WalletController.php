<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Wallet;

class WalletController extends Controller
{
    public function index(){
        $wallet = Wallet::with('transfers')->firstOrFail();
        
        return response()->json($wallet, 200);
    }

}
