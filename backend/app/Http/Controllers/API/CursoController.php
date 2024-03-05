<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Curso; 
use Illuminate\Support\Facades\Validator;

class CursoController extends Controller
{
    //Método para obtener todos los Cursos 
    public function index()
    {
        $cursos = Curso::all();
        return response()->json([
            'status'=> 200,
            'cursos'=>$cursos,
        ]);
    }

     //Método para agregar un Curso 
     public function add(Request $request)
     {
         $validator = Validator::make($request->all(),[
             'nombre'=>'required|max:255',
             'descripcion'=>'required|max:255',             
             'estado'=>'required',            
         ]);
 
         if($validator->fails())
         {
             return response()->json([
                 'status'=> 422,
                 'validate_err'=> $validator->messages(),
             ]);
         }
         else
         {
             $curso = new Curso;
             $curso->nombre = $request->input('nombre');  
             $curso->descripcion = $request->input('descripcion');          
             $curso->estado = $request->input('estado');           
             $curso->save();
 
             return response()->json([
                 'status'=> 200,
                 'message'=>'Curso agregado Correctamente',
             ]);
         }
     }
    
    //Método para obtener datos de un Curso 
    public function edit($id)
    {
        $curso = Curso::find($id);
        if($curso)
        {
            return response()->json([
                'status'=> 200,
                'curso' => $curso,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'El ID del Curso no fue encontrado',
            ]);
        }

    }

    //Método para modificar un Curso
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=>'required|max:255',
             'descripcion'=>'required|max:255',             
             'estado'=>'required',           
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $curso = Curso::find($id);
            if($curso)
            {
                $curso->nombre = $request->input('nombre');  
                $curso->descripcion = $request->input('descripcion');          
                $curso->estado = $request->input('estado'); 
               
                $curso->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Curso modificado Correctamente',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'El ID del Curso no fue encontrado',
                ]);
            }
        }
    }

     //Método para borrar un Curso
     public function destroy($id)
     {
         $curso = Curso::find($id);
         if($curso)
         {
             $curso->delete();
             return response()->json([
                 'status'=> 200,
                 'message'=>'Curso eliminado Correctamente',
             ]);
         }
         else
         {
             return response()->json([
                 'status'=> 404,
                 'message' => 'El ID del Curso no fue encontrado',
             ]);
         }
     }
}
