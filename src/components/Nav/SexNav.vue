<template>
  <div class="sex-nav">
    <!-- <h2>男生和女生</h2> -->
    <div class="tablist" v-if="sexList">
      <van-tabs v-model="active" sticky animated swipeable background="#fff" color="black" @click="onClick">
        <van-tab :name="s.id" :key="s.id" :title="s.name" v-for="s in sexList" sticky>
          <!-- 男生 -->
          <div v-show="sex == '男生'" class="boy">
            <van-cell v-for="b in boyList" :key="b.item_id">
              <router-link tag="div" :to="`/details/${b.item_id}`" class="main_item">
                <lazy-component>
                  <img :src="b.image + '@200w.jpg'" v-lazy="b.image + '@200w.jpg'" />
                </lazy-component>
                <p>{{ b.title }}</p>
                <span :class="{ active_gold: b.comic_info.decision }">{{
                  b.comic_info.decision ||
                  "更新至" + b.comic_info.lastest_short_title + "话"
                }}</span>
              </router-link>
            </van-cell>
          </div>

          <!-- 女生 -->
          <div v-show="sex == '女生'" class="girl">
            <van-cell v-for="g in girlList" :key="g.id">
              <router-link tag="div" :to="`/details/${g.item_id}`" class="main_item">
                <lazy-component>
                  <img :src="g.image + '@200w.jpg'" v-lazy="g.image + '@200w.jpg'" />
                </lazy-component>
                <p>{{ g.title }}</p>
                <span :class="{ active_gold: g.comic_info.decision }">{{
                  g.comic_info.decision ||
                  "更新至" + g.comic_info.lastest_short_title + "话"
                }}</span>
              </router-link>
            </van-cell>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sex: {
      type: String,
      default: "男生",
    },
  },
  data() {
    return {
      active: null,
      sexList: [],
      boyList: [],
      girlList: [],
      girl: 262,
      boy: 263,
      types: 1129,
      type: 1058,
      page: 1
    };
  },
  created() {
    this.getDate();
    this.onClick();
  },
  mounted() {
    this.getDate();
  },
  watch: {
    types(newType) {
      this.types = newType;
      this.getDate(this.types);
    },
    sex(newType) {
      console.log(newType);
      this.getDate();
    }
  },
  methods: {
    async getDate() {
      if (this.sex == "男生") {
        await this.axios
          .get("GetClassPageLayout?tabId=" + this.boy)
          .then((data) => {
            this.sexList = data.layout;
            this.axios
              .get(
                `GetHomeSecondaryComics?moduleId=${this.types}&pageNum=${this.page}&pageSize=20`
              )
              .then((data) => {
                this.boyList = data.comics;
              });
          });
      } else if (this.sex == "女生") {
        await this.axios
          .get("GetClassPageLayout?tabId=" + this.girl)
          .then((data) => {
            this.sexList = data.layout;
            this.axios
              .get(
                `GetHomeSecondaryComics?moduleId=${this.type}&pageNum=${this.page}&pageSize=20`
              )
              .then((data) => {
                this.girlList = data.comics;
              });
          });
      }
    },
    onClick(name) {
      if (name) {
        this.types = name;
        this.type = name;
      }
    },
    addPage() {
      this.page++;
    },
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.sex-nav {

  .boy,
  .girl {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .van-cell {
      width: 50%;

      .main_item {
        margin-left: 10px;

        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
        }

        span {
          font-size: 13px;
          color: gray;
        }

        .active_gold {
          font-size: 13px;
          color: gold;
        }

        img {
          border-radius: 10px;
          width: 100%;
        }
      }
    }
  }
}
</style>