<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class RegisterController extends Controller
{
    public function index(): Response
    {
        return inertia('Auth/Register');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255', 'string'],
            'email' => ['required', 'max:255', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'min:6', 'max:20']
        ]);

        $user = new User([
            ...$validated,
            'password' => bcrypt($validated['password'])
        ]);
        $user->save();

        auth()->login($user, $request->input('remember'));

        $request->session()->regenerate();

        return response()->json();
    }
}
