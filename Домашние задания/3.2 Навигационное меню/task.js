const links = document.querySelectorAll('.menu__link');

for (const link of links) {
  link.addEventListener('click', function (event) {
    const parentItem = this.closest('.menu__item');
    const subMenu = parentItem.querySelector('.menu_sub');

    if (subMenu) {
      event.preventDefault();

      const allSubMenus = document.querySelectorAll('.menu_sub');
      for (const menu of allSubMenus) {
        if (menu !== subMenu) {
          menu.classList.remove('menu_active');
        }
      }

      subMenu.classList.toggle('menu_active');
    }
  });
}