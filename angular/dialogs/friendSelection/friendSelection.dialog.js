export class FriendSelectionController {
    constructor(DialogService, API, FriendsQueryService, CurrentUserService, parent) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.API = API;
        this.parent = parent;
        this.currentUser = CurrentUserService;
        //this.users = this.loadAll();
        this.parent = parent;
        this.message = "";
        this.isDisabled = false;

        //temporary solution
        this.API.all('user/list').get('')
                .then((response) => {
                    this.users = angular.copy(response.data.users);
                });

        //console.log("test :"+ this.users);

    }
    save() {
        console.log('save');
        //Valid select item
        if (this.selectedItem === null)
        {
            console.log('undefined');
            this.message = "undefined";
            return;
        }
        //Already friend or invitation sent
        var friendsList = this.FriendsQuery.getFriends(this.currentUser.data.id);
        for (var i in friendsList)
        {
            if (friendsList[i].id === this.selectedItem.id)
            {
                console.log('already');
                this.message = "already";
                return;
            }
        }

        this.FriendsQuery.addFriends(this.selectedItem.id);
        this.Dialog.hide();
    }

    cancel() {
        //alert('Cancel Button Pressed');
        this.Dialog.cancel();
    }
    //Load of all the users
    loadAll() {
        console.log("loadAll : " + this.currentUser.allUsers);
        this.users = this.currentUser.allUsers;
    }
    display(user)
    {
        return user.firstname + " " + user.name;
    }
    querySearch(query) {
        if (query != "")
        {
            var results = [];
            var re = query + "+";
            var regex = new RegExp(re, "i");
            for (var k in this.users) {


                if (regex.test(this.display(this.users[k])))
                {
                    results.push(this.users[k]);
                }
            }
            return results;
        }
        return "";

    }

}
export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
