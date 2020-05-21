<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['name', 'sku', 'category_id', 'price'];

    public function category()
    {
        return $this->belongsTo('App\Models\Core\Category');
    }
}
