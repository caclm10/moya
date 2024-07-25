<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteContentController extends Controller
{
    public function update(Request $request, Note $note): JsonResponse
    {
        Gate::authorize('update', $note);

        $note->content = $request->input('content');
        $note->save();

        return response()->json();
    }
}
