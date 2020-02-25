export let flidConfig = {
  contextMenu:
    {
      item: {

        menuName: 'item-menu',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            fnHandler: 'run',
            icoName: 'edit',
            btnName: '运行'
          }
        ]
      },

      folder: {
        menuName: 'folder-menu',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            fnHandler: 'addFolder',
            icoName: 'edit',
            btnName: '新增任务夹'
          },
          {
            fnHandler: 'addTask',
            icoName: 'edit',
            btnName: '新增任务'
          }
        ]
      }
    }
};
