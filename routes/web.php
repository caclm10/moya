<?php

use App\Http\Controllers\NoteContentController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NoteTitleController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePictureController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('login');
});


Route::middleware(['auth'])->group(function () {
    Route::resource('notes', NoteController::class)
        ->parameter('notes', 'note:ulid');

    Route::prefix('notes')->name('notes.')->group(function () {
        Route::prefix('{note:ulid}')->group(function () {
            Route::patch('title', [NoteTitleController::class, 'update'])->name('title.update');
            Route::patch('content', [NoteContentController::class, 'update'])->name('content.update');
        });
    });

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::patch("", [ProfileController::class, 'update'])->name('update');

        Route::patch("picture", [ProfilePictureController::class, 'update'])->name('picture.update');
        Route::delete("picture", [ProfilePictureController::class, 'destroy'])->name('picture.destroy');
    });
    Route::patch("password", [PasswordController::class, 'update'])->name('password.update');
});

require __DIR__ . '/auth.php';
