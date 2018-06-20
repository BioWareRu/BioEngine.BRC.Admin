import { NbMenuItem } from '@nebular/theme';

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
        link: '/posts/list',
      },
      {
        title: 'Добавить пост',
        link: '/posts/add',
      },
      {
        title: 'Добавить галерею',
        link: '/posts/add',
      },
      {
        title: 'Добавить файл',
        link: '/posts/add',
      },
    ],
  },
  {
    title: 'Разделы',
    icon: 'ion-md-apps',
  },
  {
    title: 'Сайты',
    icon: 'ion-md-albums',
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
