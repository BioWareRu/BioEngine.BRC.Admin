import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Дашборд',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Контент',
    icon: 'ion-md-list-box',
    children: [
      {
        title: 'Список',
        link: '/content/list',
      },
      {
        title: 'Добавить пост',
        link: '/content/posts/add',
      },
      {
        title: 'Добавить галерею',
        link: '/content/gallery/add',
      },
      {
        title: 'Добавить файл',
        link: '/content/files/add',
      },
    ],
  },
  {
    title: 'Разделы',
    icon: 'ion-md-apps',
    children: [
      {
        title: 'Все',
        link: '/sections/list'
      },
      {
        title: 'Разработчики',
        link: '/sections/list/developers'
      },
      {
        title: 'Игры',
        link: '/sections/list/games'
      },
      {
        title: 'Темы',
        link: '/sections/list/topics'
      }
    ]
  },
  {
    title: 'Сайты',
    icon: 'ion-md-albums',
    children: [
      {
        title: 'Список',
        link: '/sites/list'
      },
      {
        title: 'Добавить сайт',
        link: '/sites/add',
      },
    ]
  },
  {
    title: 'Опросы',
    icon: 'ion-md-checkbox-outline',
  },
  {
    title: 'Настройки',
    icon: 'ion-md-settings',
  },
];
