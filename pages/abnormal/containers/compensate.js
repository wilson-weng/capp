import { LIST_INFO } from '../../../common/constants/abnormal'

const state = {
  ...LIST_INFO,
}

const actions = {
  toCompensateListDaily(e) {
    let { item } = e.currentTarget.dataset

    wx.navigateTo({
      url: `/pages/compensateList/index?id=${item.id}`
    })

  },
}

export default {
  actions,
  state,
}
