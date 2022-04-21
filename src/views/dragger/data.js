let header = [
    { label: "用户号码", prop: "msisdn" },
    { label: "4/5g标签", prop: "label45g" },
    { label: "MR总次数", prop: "rsrp_cnt" },
    { label: "RSRP>-110次数", prop: "rsrp_110_cnt" },
    { label: "平均RSRP", prop: "rsrp" },
    { label: "平均RSRQ", prop: "rsrq" },
    { label: "平均SINR", prop: "sinr" },
    { label: "平均TA", prop: "ta" },
]
// 详单字段
let header2 = [
    { label: '小时级', prop: 'sdate', ifOnlyLabel5G: false },
    { label: '原始时间', prop: 'orig_time', ifOnlyLabel5G: false },
    { label: '用户号码', prop: 'msisdn', ifOnlyLabel5G: false },
    { label: '用户识别码', prop: 'imsi', ifOnlyLabel5G: false },
    { label: '服务小区号', prop: 'ci', ifOnlyLabel5G: false },
    { label: '服务小区名', prop: 'cell_name', ifOnlyLabel5G: false },
    { label: '45G标签', prop: 'label45g', ifOnlyLabel5G: false },
    { label: '服务小区频点号', prop: 'arfcn', ifOnlyLabel5G: false },
    { label: '服务小区的物理小区识别码', prop: 'pci', ifOnlyLabel5G: false },
    { label: '服务小区RSRP', prop: 'rsrp', ifOnlyLabel5G: false },
    { label: '服务小区RSRQ', prop: 'rsrq', ifOnlyLabel5G: false },
    { label: '服务小区TA', prop: 'ta', ifOnlyLabel5G: false },
    { label: '服务小区sinr', prop: 'sinr', ifOnlyLabel5G: false },
    { label: '经度', prop: 'longitude', ifOnlyLabel5G: false },
    { label: '纬度', prop: 'latitude', ifOnlyLabel5G: false },
    { label: 'NR邻区1频点号', prop: 'ncell1_arfcn', ifOnlyLabel5G: true },
    { label: 'NR邻区1的物理小区识别码', prop: 'ncell1_pci', ifOnlyLabel5G: true },
    { label: 'NR邻区1的SSB参考信号接收功率', prop: 'ncell1_ssb_rsrp', ifOnlyLabel5G: true },
    { label: 'NR邻区1的SSB参考信号接收质量', prop: 'ncell1_ssb_rsrq', ifOnlyLabel5G: true },
    { label: 'NR邻区1的SSB波束号', prop: 'ncell1_ssb_beam_indexid', ifOnlyLabel5G: true },
    { label: 'LTE邻区1频点号', prop: 'lte_ncell1_arfcn', ifOnlyLabel5G: false },
    { label: 'LTE邻区1的物理小区识别码', prop: 'lte_ncell1_pci', ifOnlyLabel5G: false },
    { label: 'LTE邻区1的参考信号接收功率', prop: 'lte_ncell1_rsrp', ifOnlyLabel5G: false },
    { label: 'LTE邻区1的参考信号接收质量', prop: 'lte_ncell1_rsrq', ifOnlyLabel5G: false },
    { label: 'NR邻区2频点号', prop: 'ncell2_arfcn', ifOnlyLabel5G: true },
    { label: 'NR邻区2的物理小区识别码', prop: 'ncell2_pci', ifOnlyLabel5G: true },
    { label: 'NR邻区2的SSB参考信号接收功率', prop: 'ncell2_ssb_rsrp', ifOnlyLabel5G: true },
    { label: 'NR邻区2的SSB参考信号接收质量', prop: 'ncell2_ssb_rsrq', ifOnlyLabel5G: true },
    { label: 'NR邻区2的SSB波束号', prop: 'ncell2_ssb_beam_indexid', ifOnlyLabel5G: true },
    { label: 'LTE邻区2频点号', prop: 'lte_ncell2_arfcn', ifOnlyLabel5G: false },
    { label: 'LTE邻区2的物理小区识别码', prop: 'lte_ncell2_pci', ifOnlyLabel5G: false },
    { label: 'LTE邻区2的参考信号接收功率', prop: 'lte_ncell2_rsrp', ifOnlyLabel5G: false },
    { label: 'LTE邻区2的参考信号接收质量', prop: 'lte_ncell2_rsrq', ifOnlyLabel5G: false },
    { label: 'NR邻区3频点号', prop: 'ncell3_arfcn', ifOnlyLabel5G: true },
    { label: 'NR邻区3的物理小区识别码', prop: 'ncell3_pci', ifOnlyLabel5G: true },
    { label: 'NR邻区3的SSB参考信号接收功率', prop: 'ncell3_ssb_rsrp', ifOnlyLabel5G: true },
    { label: 'NR邻区3的SSB参考信号接收质量', prop: 'ncell3_ssb_rsrq', ifOnlyLabel5G: true },
    { label: 'NR邻区3的SSB波束号', prop: 'ncell3_ssb_beam_indexid', ifOnlyLabel5G: true },
    { label: 'LTE邻区3频点号', prop: 'lte_ncell3_arfcn', ifOnlyLabel5G: false },
    { label: 'LTE邻区3的物理小区识别码', prop: 'lte_ncell3_pci', ifOnlyLabel5G: false },
    { label: 'LTE邻区3的参考信号接收功率', prop: 'lte_ncell3_rsrp', ifOnlyLabel5G: false }
]

module.exports = {
    // 处理提交(组件触发)
    handleSubmit(formData) {},
    // 接口 - 获取所有的点 （根据eci获取、坐标获取的是单独的点）
    getPoints(formData) {},
    // 接口 - 获取汇总信息
    getSummation(formData) {},
    // 接口 - 点击详情（获取详单 - 4、5G）
    getDetailsMessage(formData) {} 

    /**
     * 接口情况：
     * 问题：1、一切查询前提msisdn? 2、eci与坐标能否共存 3、站点、站点名
     * 
     * （根据rowKey为查询原则）
     * 1、获取详单
     *  label字段匹配
     * 2、获取点信息
     *  根据eci/坐标获取点信息
     * 3、分页处理？
     * 4、获取汇总信息
     */
}