const AppBsnService = require('../../app/service/AppBsnService');

describe('应该获取tabIcons', function () {
  it('检查应该正常', async function () {
    let result = await AppBsnService.getStartBannerPicture();
    result.tabIcons.length.should.be.equal(4);
    result.tabIcons[0].unselect.should.be.equal('mainaaaaaaaaa');
  });
});
