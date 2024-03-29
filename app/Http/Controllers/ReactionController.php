<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User as User;
use App\Content as Content;
use App\Reaction as Reaction;

class ReactionController extends Controller {

    public function get(Request $request) {
        $reaction = Reaction::find($request->reaction_id);
        return response()->success(compact('reaction'));
    }

    public function listPerContent(Request $request) {
        $content = Content::find($request->content_id);
        $reactions = $content->reactions()->get();
        return response()->success(compact('reactions'));
    }

    public function listPerUser(Request $request) {
        $user = User::find($request->user_id);
        $reactions = $user->reactions()->get();
        return response()->success(compact('reactions'));
    }

    public function countReactions(Request $request) {
        $content = Content::find($request->content_id);
        $count = $content->reactions()->count();
        return response()->success(compact('count'));
    }

    public function add(Request $request) {
        $previous = Content::find($request->content_id)->reactions()->where('user_id', '=', $request->id)->get();
        if (isset($previous[0])) {
            $previous[0]->type = $request->type;
            $previous[0]->save();
        } else {
            $reaction = new Reaction;
            $reaction->user_id = $request->id;
            $reaction->content_id = $request->content_id;
            $reaction->type = $request->type;
            $reaction->save();
        }
        return response()->success(array());
    }

    public function update(Request $request) {
        $reaction = Reaction::find($request->reaction_id);
        $reaction->type = $request->type;
        $reaction->save();
        return response()->success(array());
    }

    public function delete(Request $request) {
        Reaction::find($request->reaction_id)->delete();
        return response()->success(array());
    }

}
