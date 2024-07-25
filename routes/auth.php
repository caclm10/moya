<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::prefix('register')->name('register')->controller(RegisterController::class)->group(function () {
        Route::get('', 'index');
        Route::post('', 'store')->name('.store');
    });

    Route::prefix('login')->name('login')->controller(LoginController::class)->group(function () {
        Route::get('', 'index');
        Route::post('', 'store')->name('.store');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
});
