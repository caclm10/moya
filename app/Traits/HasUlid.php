<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUlid
{
    public static function bootHasUlid(): void
    {
        static::creating(function (Model $model) {
            $model->ulid = Str::ulid();
        });
    }
}
