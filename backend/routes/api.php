<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EstudianteController;
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

Route::get('estudiantes', [EstudianteController::class, 'index']);
Route::post('/add-estudiante', [EstudianteController::class, 'add']);
Route::get('/edit-estudiante/{id}', [EstudianteController::class, 'edit']);
Route::put('update-estudiante/{id}', [EstudianteController::class, 'update']);
Route::delete('delete-estudiante/{id}', [EstudianteController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
