<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePictureController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'max:3072'],
        ]);

        /** @var User */
        $user = auth()->user();
        $oldPath = $user->picture_path;

        $image = $request->file('image');
        $path = $image->store('images/' . $user->ulid, 'public');
        $user->picture_path = $path;
        $user->save();

        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        return response()->json();
    }

    public function destroy(): JsonResponse
    {
        /** @var User */
        $user = auth()->user();
        $path = $user->picture_path;

        if ($path) {
            $user->picture_path = null;
            $user->save();
            Storage::disk('public')->delete($path);
        }

        return response()->json();
    }
}
