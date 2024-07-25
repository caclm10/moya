<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255', 'string'],
            'email' => ['required', 'max:255', 'email', Rule::unique('users', 'email')->ignore(auth()->id())],
        ]);

        /** @var User */
        $user = auth()->user();
        $user->fill($validated);
        $user->save();

        return response()->json();
    }
}
