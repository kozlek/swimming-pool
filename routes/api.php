<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/register', 'Auth\AuthController@register');

Route::post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
Route::get('auth/password/verify', 'Auth\PasswordResetController@verify');
Route::post('auth/password/reset', 'Auth\PasswordResetController@reset');


//protected API routes with JWT (must be logged in)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::get('user/get', 'UserController@get');
Route::get('user/list', 'UserController@getList');
Route::post('user/update', 'UserController@update');
Route::post('user/delete', 'UserController@delete');

Route::get('user/friends/list', 'UserController@listFriends');
Route::get('user/friends/requests/list', 'UserController@listRequests');
Route::get('user/friends/invitations/list', 'UserController@listInvitations');
Route::get('user/friends/add', 'UserController@addFriend');
Route::get('user/friends/confirm', 'UserController@confirmFriend');
Route::post('user/friends/delete', 'UserController@deleteFriend');

Route::get('content/get', 'ContentController@get');
Route::get('content/list', 'ContentController@listAll');
Route::get('content/list/posts', 'ContentController@listPosts');
Route::get('content/list/events', 'ContentController@listEvents');
Route::get('content/list/pictures', 'ContentController@listPictures');
Route::post('content/add/post', 'ContentController@addPost');
Route::post('content/add/event', 'ContentController@addEvent');
Route::post('content/add/file', 'ContentController@addFile');
Route::post('content/delete', 'ContentController@delete');

Route::get('comment/get', 'CommentController@get');
Route::get('comments/list', 'CommentController@listPerContent');
Route::get('comments/list/byuser', 'CommentController@listPerUser');
Route::post('comments/add', 'CommentController@add');
Route::post('comments/delete', 'CommentController@delete');