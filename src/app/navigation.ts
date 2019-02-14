import { NavigationItem } from './@common/navigation/NavigationItem';
import { Icon } from './@common/shared/icon/Icon';

export const navigation: NavigationItem[] = [
    {
        id: 'dash',
        type: 'item',
        title: 'Дашборд',
        icon: new Icon('fa-home'),
        url: '/dashboard'
    },
    {
        id: 'posts',
        type: 'collapsable',
        title: 'Посты',
        icon: new Icon('fa-newspaper', 'far'),
        children: [
            {
                id: 'postsList',
                type: 'item',
                title: 'Список',
                icon: new Icon('fa-list-ul'),
                url: '/posts'
            },
            {
                id: 'addPost',
                type: 'item',
                title: 'Добавить пост',
                icon: new Icon('fa-pen'),
                url: '/posts/add'
            }
        ]
    },
    {
        id: 'sections',
        type: 'collapsable',
        title: 'Разделы',
        icon: new Icon('fa-th'),
        children: [
            {
                id: 'sectionsList',
                type: 'item',
                title: 'Все',
                icon: new Icon('fa-list-ul'),
                url: '/sections/list'
            },
            {
                id: 'developersList',
                type: 'item',
                title: 'Разработчики',
                icon: new Icon('fa-users'),
                url: '/sections/list/developers'
            },
            {
                id: 'gamesList',
                type: 'item',
                title: 'Игры',
                icon: new Icon('fa-gamepad'),
                url: '/sections/list/games'
            },
            {
                id: 'topicList',
                type: 'item',
                title: 'Темы',
                icon: new Icon('fa-folder'),
                url: '/sections/list/topics'
            }
        ]
    },
    {
        id: 'sites',
        type: 'collapsable',
        title: 'Сайты',
        icon: new Icon('fa-globe'),
        children: [
            {
                id: 'sitesList',
                type: 'item',
                title: 'Список',
                icon: new Icon('fa-list-ul'),
                url: '/sites/list'
            },
            {
                id: 'addSite',
                type: 'item',
                title: 'Добавить сайт',
                icon: new Icon('fa-plus'),
                url: '/sites/add'
            }
        ]
    },
    {
        id: 'tags',
        type: 'item',
        title: 'Тэги',
        icon: new Icon('fa-tags'),
        url: '/tags'
    },
    {
        id: 'pages',
        type: 'item',
        title: 'Страницы',
        icon: new Icon('fa-file'),
        url: '/pages'
    },
    {
        id: 'menu',
        type: 'item',
        title: 'Меню',
        icon: new Icon('fa-bars'),
        url: '/menu'
    },
    {
        id: 'polls',
        type: 'item',
        title: 'Опросы',
        icon: new Icon('fa-poll')
    },
    {
        id: 'storage',
        type: 'item',
        title: 'Хранилище',
        icon: new Icon('fa-hdd'),
        url: '/storage'
    },
    {
        id: 'settings',
        type: 'item',
        title: 'Настройки',
        icon: new Icon('fa-cog')
    }
];
