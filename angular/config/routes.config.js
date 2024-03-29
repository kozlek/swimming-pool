export function RoutesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    let getView = (viewName) => {
        return `./views/app/pages/${viewName}/${viewName}.page.html`;
    };

    $urlRouterProvider.otherwise('/');

    /*
     data: {auth: true} would require JWT auth
     However you can't apply it to the abstract state
     or landing state because you'll enter a redirect loop
     */

    $stateProvider
            .state('app', {
                abstract: true,
                data: {},
                views: {
                    header: {
                        templateUrl: getView('header')
                    },
                    footer: {
                        templateUrl: getView('footer')
                    },
                    main: {}
                }
            })
            .state('app.landing', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: getView('landing')
                    }
                },
                redirectTo: 'app.news'
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: getView('login')
                    }
                }
            })
            .state('app.register', {
                url: '/register',
                views: {
                    'main@': {
                        templateUrl: getView('register')
                    }
                }
            })
            .state('app.forgot_password', {
                url: '/forgot-password',
                views: {
                    'main@': {
                        templateUrl: getView('forgot-password')
                    }
                }
            })
            .state('app.reset_password', {
                url: '/reset-password/:email/:token',
                views: {
                    'main@': {
                        templateUrl: getView('reset-password')
                    }
                }
            })
            .state('app.news', {
                url: '/news',
                data: {
                    auth: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('news')
                    }
                }
            })
            .state('app.friends', {
                url: '/friends',
                data: {
                    auth: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('friends')
                    }
                },
                resolve: {
                    user: function (CurrentUserService) {
                        return CurrentUserService.getUser();
                    },
                    userList: function (CurrentUserService)
                    {
                        return CurrentUserService.getAllUsers();
                    },
                    friends: function (FriendsQueryService) {
                        return "";
                    }
                }
            })
            .state('app.profile', {
                url: '/profile/:id_user',
                data: {
                    auth: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('profile')
                    }
                }
            })
            .state('app.chat', {
                url: '/chat',
                data: {
                    auth: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('chat')
                    }
                }
            })
            .state('app.photos', {
                url: '/photos',
                data: {
                    auth: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('photos')
                    }
                }
            });
}
