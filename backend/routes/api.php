<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EstudianteController;
use App\Http\Controllers\API\CursoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Rutas API para los metodos HTTP de Estudiantes
Route::get('estudiantes', [EstudianteController::class, 'index']);
Route::post('/add-estudiante', [EstudianteController::class, 'add']);
Route::get('/edit-estudiante/{id}', [EstudianteController::class, 'edit']);
Route::put('update-estudiante/{id}', [EstudianteController::class, 'update']);
Route::delete('delete-estudiante/{id}', [EstudianteController::class, 'destroy']);

//Rutas API para los metodos HTTP de Cursos
Route::get('cursos', [CursoController::class, 'index']);
Route::post('/add-curso', [CursoController::class, 'add']);
Route::get('/edit-curso/{id}', [CursoController::class, 'edit']);
Route::put('update-curso/{id}', [CursoController::class, 'update']);
Route::delete('delete-curso/{id}', [CursoController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
