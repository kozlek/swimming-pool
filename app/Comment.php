<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    
    public $timestamps = true;
    
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    public function content() {
        return $this->belongsTo('App\Content');
    }
}
