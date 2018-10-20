import api from './api'
import * as CONSTANTS from '../../common/constants/index'
import compensateHandler from './containers/compensate.js'
import breakRulesHandler from './containers/breakRules.js'
import { handleListDataStr } from '../../common/utils/listDataStr'
import { LIST_INFO } from '../../common/constants/abnormal'

const app = getApp()

const state = {
  CONSTANTS: CONSTANTS,
  authInfo: app.globalData.authInfo,
  tabType: CONSTANTS.TAB_COMPENSATE,

  tab: {
    id: 'abnormal-tab',
    activeTextColor: '#fff',
    activeLineColor: '#fff',
    textColor: '#fff',
    tabs: [
      {
        title: '赔付',
        tabTypeConfig: CONSTANTS.TAB_COMPENSATE,
        responseAttrName: 'bills',
      },
      {
        title: '违纪',
        tabTypeConfig: CONSTANTS.TAB_BREAK_RULES,
        responseAttrName: 'record',
      },
    ],
  },

  [CONSTANTS.TAB_COMPENSATE]: compensateHandler.state,
  [CONSTANTS.TAB_BREAK_RULES]: breakRulesHandler.state,
}

Page({
  data: state,

  ...compensateHandler.actions,
  ...breakRulesHandler.actions,

  onShow() {
    wx.setNavigationBarTitle({
      title: '异常处理',
    })

    this.dataInit(this.data.tabType)
  },

  dataInit(tabName) {
    const storageList = wx.getStorageSync(tabName.toLocaleUpperCase() + '_LIST')
    const setDataObj = tabName + '.handledList'
    const page = tabName + '.page'

    if (storageList) {
      this.setData({[ setDataObj]: storageList })
    }

    this.setData({ [page]: 1 })

    wx.showNavigationBarLoading()

    this.get_list(tabName)
      .then(wx.hideNavigationBarLoading)
      .catch(wx.hideNavigationBarLoading)
  },

  onReachBottom() {
    if (!this.data[this.data.tabType].hasNext) return
    this.get_list(this.data.tabType)
  },

  onPullDownRefresh() {
    this.setData({
      [this.data.tabType]: {
        ...LIST_INFO,
        handledList: this.data[this.data.tabType].handledList,
      }
    })

    this.get_list(this.data.tabType)
  },

  get_list(tabName) {
    const tabState = this.data[tabName]
    const response = this.data.tab.tabs.filter(each => each.tabTypeConfig === tabName)[0].responseAttrName

    let params = {
      offset : (tabState.page - 1) * tabState.limit,
      limit: tabState.limit,
    }

    return api['get_' + tabName](params)
      .then(res => {
        wx.stopPullDownRefresh()

        if (params.offset === 0) {
          this.setData({
            [tabName + '.list']: res[response],
            [tabName + '.hasNext']: res[response].length === tabState.limit,
            [tabName + '.page']: tabState.page + 1,
          })
        } else {
          this.setData({
            [tabName + '.list']: tabState.list.concat(res[response]),
            [tabName + '.hasNext']: res[response].length === tabState.limit,
            [tabName + '.page']: tabState.page + 1,
          })
        }

        this.handleList(tabName)
      })
      .catch(() => {
        wx.stopPullDownRefresh()
      })
  },

  handleList(tabName) {
    const tabState = this.data[tabName]
    let tempList = handleListDataStr(this.data[tabName].list)

    this.setData({
      [tabName + '.handledList']: tempList
    }, () => {
      wx.setStorage({
        key: tabName.toLocaleUpperCase() + '_LIST',
        data: tabState.handledList,
      })
    })
  },

  onChangeTab(e) {
    let key = e.detail.key
    let tabState = this.data.tab.tabs[key]

    if (this.data.tabType === tabState.tabTypeConfig) return

    wx.showLoading({
      title: '加载中',
    })

    this.setData({
      tabType: tabState.tabTypeConfig,
      [tabState.tabTypeConfig]: {
        ...LIST_INFO,
        handledList: this.data[tabState.tabTypeConfig].handledList,
      }
    })

    this.get_list(tabState.tabTypeConfig)
      .then(wx.hideLoading())
      .catch(wx.hideLoading())

  },

})
