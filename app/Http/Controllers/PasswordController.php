<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'old_password' => [
                'required',
                function (string $attribute, mixed $value, \Closure $fail) {
                    if (!Hash::check($value, auth()->user()->password)) {
                        $fail('auth.password')->translate();
                    }
                }
            ],
            'new_password' => ['required', 'min:6', 'max:20']
        ]);

        /** @var User */
        $user = auth()->user();
        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json();
    }
}
