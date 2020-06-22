<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ProductoSeeder::class);
        $this->call(WalletsTableSeeder::class);
        $this->call(TransferTableSeeder::class);
    }
}
