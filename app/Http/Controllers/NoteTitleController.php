<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteTitleController extends Controller
{
    public function update(Request $request, Note $note): JsonResponse
    {
        Gate::authorize('update', $note);

        $validated = $request->validate([
            'title' => ['nullable', 'max:255']
        ]);

        $note->title = $validated['title'];
        $note->save();

        return response()->json();
    }
}
