<?php

namespace App\Models;

use App\Traits\HasUlid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory, HasUlid;

    protected $fillable = [
        'ulid',
        'title',
        'content'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
