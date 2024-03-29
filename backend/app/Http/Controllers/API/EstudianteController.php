<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estudiante; 
use Illuminate\Support\Facades\Validator;

class EstudianteController extends Controller
{
    //Método para obtener todos los Estudiantes 
    public function index()
    {
        $estudiantes = Estudiante::all();
        //console.log($estudiantes);
        return response()->json([
            'status'=> 200,
            'estudiantes'=>$estudiantes,
        ]);
    }

    //Método para agregar un Estudiante 
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=>'required|max:191',
            'curso'=>'required|max:191',
            'email'=>'required|email|max:191',
            'telefono'=>'required|min:5',            
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
            $estudiante = new Estudiante;
            $estudiante->nombre = $request->input('nombre');  
            $estudiante->curso = $request->input('curso');          
            $estudiante->email = $request->input('email');
            $estudiante->telefono = $request->input('telefono');            
            $estudiante->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Estudiante agregado Correctamente',
            ]);
        }

    }

    //Método para obtener datos de un Estudiante 
    public function edit($id)
    {
        $estudiante = Estudiante::find($id);
        if($estudiante)
        {
            return response()->json([
                'status'=> 200,
                'estudiante' => $estudiante,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'El ID del Estudiante no fue encontrado',
            ]);
        }

    }

    //Método para modificar un Estudiante
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=>'required|max:191',  
            'curso'=>'required|max:191',          
            'email'=>'required|email|max:191',
            'telefono'=>'required|min:5',            
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
            $estudiante = Estudiante::find($id);
            if($estudiante)
            {
                $estudiante->nombre = $request->input('nombre');
                $estudiante->curso = $request->input('curso');
                $estudiante->email = $request->input('email');
                $estudiante->telefono = $request->input('telefono');
               
                $estudiante->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Estudiante modificado Correctamente',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'El ID del Estudiante no fue encontrado',
                ]);
            }
        }
    }

    //Método para borrar un Estudiante
    public function destroy($id)
    {
        $estudiante = Estudiante::find($id);
        if($estudiante)
        {
            $estudiante->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Estudiante eliminado Correctamente',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'El ID del Estudiante no fue encontrado',
            ]);
        }
    }
}
