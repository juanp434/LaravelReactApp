<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('producto')->insert(
            [
                'titulo' => "Portatil Gamer Asus ROG",
                'descripcion' => 'Asus X542U 15" Core I7 RAM 8GB DD 1TB TV 2GB',
                'precio' => 2145000,
                'cantidad' => 10,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );
        DB::table('producto')->insert(
            [
                'titulo' => "Portatil Gamer Lenovo Legion",
                'descripcion' => 'Lenovo Y7000 Core I7 8va GTX 1060 6GB 256SSD 16GB RAM',
                'precio' => 5099000,
                'cantidad' => 5,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );
        DB::table('producto')->insert(
            [
                'titulo' => "Portatil Gamer Acer Predator",
                'descripcion' => 'Core I7 8750H RAM 16GB 256SSD TV GTX1060 15.6" FHD',
                'precio' => 5499000,
                'cantidad' => 3,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );
    }
}

