<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role();
        $role->nombre = 'administrador';
        $role->descripcion = 'Administrator';
        $role->save();
        $role = new Role();
        $role->nombre = 'usuario';
        $role->descripcion = 'User';
        $role->save();
        $role = new Role();
        $role->nombre = 'editor';
        $role->descripcion = 'Editor';
        $role->save();
    }
}
