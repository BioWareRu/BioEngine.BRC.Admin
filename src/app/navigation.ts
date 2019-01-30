import { NavigationItem } from './@common/navigation/NavigationItem';

export const navigation: NavigationItem[] = [
    {
        id: 'dash',
        type: 'item',
        title: 'Дашборд',
        icon: 'home',
        url: '/dashboard'
    },
    {
        id: 'posts',
        type: 'collapsable',
        title: 'Посты',
        icon: 'create',
        children: [
            {
                id: 'postsList',
                type: 'item',
                title: 'Список',
                icon: 'view_list',
                url: '/posts'
            },
            {
                id: 'addPost',
                type: 'item',
                title: 'Добавить пост',
                icon: 'import_contacts',
                url: '/posts/add'
            }
        ]
    },
    {
        id: 'sections',
        type: 'collapsable',
        title: 'Разделы',
        icon: 'apps',
        children: [
            {
                id: 'sectionsList',
                type: 'item',
                title: 'Все',
                icon: 'view_list',
                url: '/sections/list'
            },
            {
                id: 'developersList',
                type: 'item',
                title: 'Разработчики',
                icon: 'people',
                url: '/sections/list/developers'
            },
            {
                id: 'gamesList',
                type: 'item',
                title: 'Игры',
                icon: 'games',
                url: '/sections/list/games'
            },
            {
                id: 'topicList',
                type: 'item',
                title: 'Темы',
                icon: 'folder',
                url: '/sections/list/topics'
            }
        ]
    },
    {
        id: 'sites',
        type: 'collapsable',
        title: 'Сайты',
        icon: 'public',
        children: [
            {
                id: 'sitesList',
                type: 'item',
                title: 'Список',
                icon: 'view_list',
                url: '/sites/list'
            },
            {
                id: 'addSite',
                type: 'item',
                title: 'Добавить сайт',
                icon: 'add',
                url: '/sites/add'
            }
        ]
    },
    {
        id: 'tags',
        type: 'item',
        title: 'Тэги',
        icon: 'labels',
        url: '/tags'
    },
    {
        id: 'pages',
        type: 'item',
        title: 'Страницы',
        icon: 'note',
        url: '/pages'
    },
    {
        id: 'menu',
        type: 'item',
        title: 'Меню',
        icon: 'menu',
        url: '/menu'
    },
    {
        id: 'polls',
        type: 'item',
        title: 'Опросы',
        icon: 'poll'
    },
    {
        id: 'storage',
        type: 'item',
        title: 'Хранилище',
        icon: 'attachment',
        url: '/storage'
    },
    {
        id: 'settings',
        type: 'item',
        title: 'Настройки',
        icon: 'settings'
    }
];
