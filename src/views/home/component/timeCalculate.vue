<template>
  <div>
    <fieldset class="time-operation">
      <legend>比较日期大小</legend>
      <div>
        <el-form :inline="true">
          <el-form-item label="起点日期：">
            <el-date-picker
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              placeholder="截止日期"
              style="width: 200px"
              v-model="startTime"
              @change="changeTime('startTime')"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期：">
            <el-date-picker
              size="mini"
              type="date"
              :format="'yyyy-MM-dd'"
              placeholder="截止日期"
              style="width: 200px"
              v-model="endTime"
              @change="changeTime('endTime')"
            ></el-date-picker>
          </el-form-item>
          <div>
            <el-tag class="el-time__tags" v-for="(item, index) in dateList" :key="'date' + index">
              {{ item }}
            </el-tag>
          </div>
        </el-form>
      </div>
    </fieldset>
  </div>
</template>
<script>
import { getYear, getMonths, getDate, getDays , concatTime } from "../../../utils/timeProcess";
export default {
  data() {
    return {
      startTime: "2021-01-01",
      endTime: "2021-01-31",
      dateList: [],
    };
  },
  mounted() {
    this.compareTimeScales();
  },
  methods: {
    // 控件修改触发方法
    changeTime(name) {
      console.log(this[name]);
      this.compareTimeScales();
    },
    // 比较时间获取特定的区间
    compareTimeScales() {
      let sYear = getYear(this.startTime), 
          eYear = getYear(this.endTime),
          sMon = getMonths(this.startTime),
          eMon = getMonths(this.endTime),
          sDate = getDate(this.startTime),
          eDate = getDate(this.endTime);
      let arr = [];
      if(sMon > eMon || sYear > eYear) return ;
      // 跨月
      if (eMon - sMon == 1) {
        this.traversingTime(getDays(null, sMon), false, (date) => {
          arr.push(concatTime(sYear , sMon , date));
        } , sDate);
        this.traversingTime(eDate, false, (date) => {
          arr.push(concatTime(eYear , eMon , date));
        } , 1);
      } else if (sMon == eMon){
        this.traversingTime(eDate, false, (date) => {
          arr.push(concatTime(eYear , eMon , date));
        } , sDate);
      } else {
        this.traversingTime(getDays(null, sMon), false, (date) => {
          arr.push(concatTime(sYear , sMon , date));
        } , sDate);
        this.traversingTime(getDays(null, sMon + 1), false, (date) => {
          arr.push(concatTime(eYear , sMon + 1 , date));
        } , 1);
        this.traversingTime(eDate, false, (date) => {
          arr.push(concatTime(eYear , eMon , date));
        } , 1);
      }
      this.dateList = [...arr];
    },

    // 遍历获取日期
    traversingTime(times, order = true, cb = null , min = 0) {
      if (!cb) return;
      // 递减
      if (order) {
        let size = Number(times);
        while (size > min) {
          cb.call(null, Number(size));
          --size;
        }
      }
      // 递增
      else {
        let size = min;
        while (size <= times) {
          cb.call(null, Number(size));
          ++size;
        }
      }
    },
  },
};
</script>
<style scoped>
.time-operation {
  width: 70%;
  height: 250px;
  padding: 20px 0 20px 20px;
  overflow-y: scroll;
}
.time-operation .el-time__tags{ 
  margin: 5px;
}
</style>