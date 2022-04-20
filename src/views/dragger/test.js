let a = ["sdate","orig_time","msisdn","imsi","ci","cell_name","label45g","arfcn","pci","rsrp","rsrq","ta","sinr","longitude","latitude","ncell1_arfcn","ncell1_pci","ncell1_ssb_rsrp","ncell1_ssb_rsrq","ncell1_ssb_beam_indexid","lte_ncell1_arfcn","lte_ncell1_pci","lte_ncell1_rsrp","lte_ncell1_rsrq","ncell2_arfcn","ncell2_pci","ncell2_ssb_rsrp","ncell2_ssb_rsrq","ncell2_ssb_beam_indexid","lte_ncell2_arfcn","lte_ncell2_pci","lte_ncell2_rsrp","lte_ncell2_rsrq","ncell3_arfcn","ncell3_pci","ncell3_ssb_rsrp","ncell3_ssb_rsrq","ncell3_ssb_beam_indexid","lte_ncell3_arfcn","lte_ncell3_pci","lte_ncell3_rsrp"]

let b = ["小时级","原始时间","用户号码","用户识别码","服务小区号","服务小区名","45G标签","服务小区频点号","服务小区的物理小区识别码","服务小区RSRP","服务小区RSRQ","服务小区TA","服务小区sinr","经度","纬度","NR邻区1频点号","NR邻区1的物理小区识别码","NR邻区1的SSB参考信号接收功率","NR邻区1的SSB参考信号接收质量","NR邻区1的SSB波束号","LTE邻区1频点号","LTE邻区1的物理小区识别码","LTE邻区1的参考信号接收功率","LTE邻区1的参考信号接收质量","NR邻区2频点号","NR邻区2的物理小区识别码","NR邻区2的SSB参考信号接收功率","NR邻区2的SSB参考信号接收质量","NR邻区2的SSB波束号","LTE邻区2频点号","LTE邻区2的物理小区识别码","LTE邻区2的参考信号接收功率","LTE邻区2的参考信号接收质量","NR邻区3频点号","NR邻区3的物理小区识别码","NR邻区3的SSB参考信号接收功率","NR邻区3的SSB参考信号接收质量","NR邻区3的SSB波束号","LTE邻区3频点号","LTE邻区3的物理小区识别码","LTE邻区3的参考信号接收功率","LTE邻区3的参考信号接收质量"]
let r = []
a.forEach((v,i) => {
    r.push({label: b[i],prop:v})
});

console.log(r);