import {FriendSelectionController} from '../../../dialogs/friendSelection/friendSelection.dialog.js';
import {FriendsDeleteConfirmController} from '../../../dialogs/friendsDeleteConfirm/friendsDeleteConfirm.dialog.js';

class FriendsListController {
    constructor(DialogService, API, CurrentUserService,FriendsQueryService) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.CurrentUser = CurrentUserService;
        this.FriendsQuery= FriendsQueryService;
        this.message="";
        this.emptyQuery=true;
        this.user=null;
        this.friendsInvitation=null;
    }
    
    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getInvitationsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.friendsInvitation = angular.copy(response.data.fInvitations);
            });
        });
        /*
         this.people = [
         {name: 'Taha Miyara', img: 'img/example/taha.jpg', selected: false},
         {name: 'Thomas Berdy', img: 'img/example/thomas.jpg', selected: false},
         {name: 'Mark Zuckerberg', img: 'img/example/mark.jpg', selected: false}
         ];
         */
    }
    display(user)
    {
        return user.name;
    }
    querySearch(query) {
        if (query != "")
        {
            this.emptyQuery=false;
            var results = [];
            var re = query + "+";
            var regex = new RegExp(re, "i");
            for (var k in this.currentFriends) {
                if (regex.test(this.display(this.currentFriends[k])))
                {
                    results.push(this.currentFriends[k]);
                }
            }
            return results;
        }
        this.emptyQuery=true;
        return this.currentFriends;

    }
    getFriends() {
        return this.FriendsQuery.getFriends(this.user.data.id);
    }
    
    addFriend() {
        this.API.all('user/friends/add').get('', {
            id: this.user.data.id,
            friend_id: ''
        }).then((response) => {
            this.friends = angular.copy(response.data.friends);
        });
    }

    

    deleteSelection()
    {
        //Load the selected friends
        var newTab = [];
        this.message="";
        for(var k in this.currentFriends)
        {
            if(this.currentFriends[k].selected)
            {
                newTab.push(this.currentFriends[k]);
                
            }
        }
        if(newTab.length == 0)
        {
            this.message="Vous n'avez sélectionné personne !";
            return;
        }
        let options = {
            controller: FriendsDeleteConfirmController,
            controllerAs: 'vm',
            locals:
                    {
                        parent: this,
                        selectedTab: newTab
                    }
        }
        
        this.Dialog.fromTemplate('friendsDeleteConfirm', options);
        //return this.Dialog.fromTemplate('confirmDelete');
    }
    friendsSelection()
    {
        let options = {
            controller: FriendSelectionController,
            controllerAs: 'vm',
            locals:
                    {
                        parent: this
                    }
        }
        this.Dialog.fromTemplate('friendSelection', options);
        //alert(a);
    }
    goToProfil(person,event)
    {
        //dialog of mini profil
    }
}

export const FriendsListComponent = {
    templateUrl: './views/app/components/friends-list/friends-list.component.html',
    controller: FriendsListController,
    controllerAs: 'vm',
    bindings: {}
}
