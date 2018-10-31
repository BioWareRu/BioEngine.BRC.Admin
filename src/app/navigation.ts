import {NavigationItem} from './@common/navigation/NavigationItem';

export const navigation: NavigationItem[] = [
    {
        id: 'dash',
        type: 'item',
        title: 'Дашборд',
        icon: 'home',
        url: '/dashboard',
    },
    {
        id: 'content',
        type: 'collapsable',
        title: 'Контент',
        icon: 'create',
        children: [
            {
                id: 'contentList',
                type: 'item',
                title: 'Список',
                icon: 'view_list',
                url: '/content/list',
            },
            {
                id: 'addPost',
                type: 'item',
                title: 'Добавить пост',
                icon: 'import_contacts',
                url: '/content/posts/add',
            },
            {
                id: 'addGallery',
                type: 'item',
                icon: 'images',
                title: 'Добавить галерею',
                url: '/content/gallery/add',
            },
            {
                id: 'addFile',
                type: 'item',
                icon: 'attachment',
                title: 'Добавить файл',
                url: '/content/files/add',
            },
        ],
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
                url: '/sites/add',
            },
        ]
    },
    {
        id: 'tags',
        type: 'item',
        title: 'Тэги',
        icon: 'labels',
        url: '/tags',
    },
    {
        id: 'pages',
        type: 'item',
        title: 'Страницы',
        icon: 'note',
        url: '/pages',
    },
    {
        id: 'menu',
        type: 'item',
        title: 'Меню',
        icon: 'menu',
        url: '/menu',
    },
    {
        id: 'polls',
        type: 'item',
        title: 'Опросы',
        icon: 'poll',
    },
    {
        id: 'settings',
        type: 'item',
        title: 'Настройки',
        icon: 'settings',
    },
];
