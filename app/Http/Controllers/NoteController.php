<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class NoteController extends Controller
{
    public function index(): Response
    {
        return inertia('Notes/Index', [
            'notes' => $this->notes()
        ]);
    }

    public function store(): JsonResponse
    {
        /** @var User */
        $user = auth()->user();

        $note = new Note;

        $user->notes()->save($note);

        return response()->json([
            'note' => new NoteResource($note)
        ]);
    }

    public function show(Note $note): Response
    {
        Gate::authorize('view', $note);

        return inertia('Notes/Show', [
            'note' => fn () => new NoteResource($note),
            'notes' => $this->notes()
        ]);
    }

    public function destroy(Note $note): JsonResponse
    {
        Gate::authorize('delete', $note);

        $note->delete();

        return response()->json();
    }

    private function notes(): \Closure
    {
        /** @var User */
        $user = auth()->user();

        $notes = function () use ($user) {
            $notes = $user->notes()->latest()->get();
            return NoteResource::collection($notes);
        };

        return $notes;
    }
}
