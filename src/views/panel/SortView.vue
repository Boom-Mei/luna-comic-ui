<template>
  <div class="sort">
    <div class="box" v-if="sortList">
      <!-- 类型 -->
      <ul class="top">
        <li
          @click.stop="change1(s.id, s.name)"
          v-for="s in sortList.styles"
          :key="s.id"
          v-html="s.name"
          ref="li1"
        ></li>
      </ul>

      <div class="main" ref="main">
        <!-- 国家 -->
        <ul class="box1">
          <li
            @click.stop="change2(a.id, a.name)"
            v-for="a in sortList.areas"
            :key="a.id"
            v-html="a.name"
            ref="li2"
          ></li>
        </ul>
        <!-- 完结 -->
        <ul class="box2">
          <li
            @click.stop="change3(b.id, b.name)"
            v-for="b in sortList.status"
            :key="b.id"
            v-html="b.name"
            ref="li3"
          ></li>
        </ul>
        <!-- 免费 -->
        <ul class="box3">
          <li
            @click.stop="change4(d.id, d.name)"
            v-for="d in sortList.prices"
            :key="d.id"
            v-html="d.name"
            ref="li4"
          ></li>
        </ul>
        <!-- 人气 -->
        <ul class="box4">
          <van-icon name="arrow-down" v-if="!show" class="sx" @click.stop="sx"
            >&nbsp;筛选</van-icon
          >
          <van-icon name="arrow-up" v-else class="sx" @click.stop="sx"
            >&nbsp;筛选</van-icon
          >
          <li
            @click.stop="change5(c.id, c.name)"
            v-for="c in sortList.orders"
            :key="c.id"
            v-html="c.name"
            ref="li5"
          ></li>
        </ul>
      </div>
    </div>

    <!-- 加载中... -->
    <van-loading
      type="spinner"
      size="24px"
      text-size="18px"
      color="skyblue"
      class="load"
      style="textAlign: center"
      v-else
      >加载中...
    </van-loading>

    <SortList
      :styleId="styleId"
      :areaId="areaId"
      :orderId="orderId"
      :isFreeId="isFreeId"
      :isFinishId="isFinishId"
    ></SortList>
  </div>
</template>

<script>
import SortList from "../../components/Multiplex/SortList.vue";
export default {
  data() {
    return {
      styleId: -1,
      areaId: -1,
      orderId: 0,
      isFreeId: -1,
      isFinishId: -1,
      sortList: [],
      show: false,
    };
  },
  created() {
    this.getSort();
  },
    mounted(){
    this.getSort();
  },
  methods: {
    async getSort() {
      await this.axios
        .get("AllLabel")
        .then((re) => {
          // console.log("漫画分类===>", re);
          let arr = re;
          for (const i in arr) {
            if (i != "orders") {
              // console.log(arr[i]);
              arr[i].unshift({ id: -1, name: "全部" });
            }
          }
          console.log(arr, "--------");
          this.sortList = arr;
        })
        .catch((error) => {
          console.log("请求失败===>", error);
        });
    },
    sx() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.main.style.height = "auto";
      } else {
        this.$refs.main.style.height = "32px";
      }
    },
    change1(value, name) {
      this.styleId = value;
      for (const i in this.$refs.li1) {
        if (name == this.$refs.li1[i].innerText) {
          this.$refs.li1[i].style.color = "skyblue";
        } else {
          this.$refs.li1[i].style.color = "black";
        }
      }
    },
    change2(value, name) {
      this.areaId = value;
      for (const i in this.$refs.li2) {
        if (name == this.$refs.li2[i].innerText) {
          this.$refs.li2[i].style.color = "skyblue";
        } else {
          this.$refs.li2[i].style.color = "black";
        }
      }
    },
    change3(value, name) {
      this.isFinishId = value;
      for (const i in this.$refs.li3) {
        if (name == this.$refs.li3[i].innerText) {
          this.$refs.li3[i].style.color = "skyblue";
        } else {
          this.$refs.li3[i].style.color = "black";
        }
      }
    },
    change4(value, name) {
      this.isFreeId = value;
      for (const i in this.$refs.li4) {
        if (name == this.$refs.li4[i].innerText) {
          this.$refs.li4[i].style.color = "skyblue";
        } else {
          this.$refs.li4[i].style.color = "black";
        }
      }
    },
    change5(value, name) {
      this.orderId = value;
      for (const i in this.$refs.li5) {
        if (name == this.$refs.li5[i].innerText) {
          this.$refs.li5[i].style.color = "skyblue";
        } else {
          this.$refs.li5[i].style.color = "black";
        }
      }
    },
  },
  components: { SortList },
};
</script>

<style lang="scss" scoped>
.sort {
  .box {
    padding: 10px 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
      width: 100%;
      height: 100px;
      // border-top: 1px solid #ccc;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        height: 20px;
        line-height: 20px;
        text-align: center;
        padding: 2px 9px;
        margin: 6px 0;
        &:nth-child(1) {
          color: skyblue;
        }
      }
    }

    .main {
      border-top: 1px solid #ccc;
      width: 100%;
      height: 32px;
      font-size: 12px;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      position: relative;
      padding-bottom: 32px;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        li {
          height: 20px;
          line-height: 20px;
          text-align: center;
          padding: 2px 9px;
          margin: 6px 0;
          &:nth-of-type(1) {
            color: skyblue;
          }
        }
      }
      .box4 {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #fff;
        .sx {
          height: 20px;
          position: absolute;
          top: 0;
          right: -10px;
          line-height: 20px;
          text-align: center;
          padding: 2px 9px;
          margin: 6px 0;
          color: gray;
        }
      }
    }
  }
}
</style>

