<template>
  <div class="sex-nav">
    <!-- <h2>男生和女生</h2> -->

    <div class="tablist" v-if="tabList">
      <van-tabs v-model="active" sticky animated swipeable background="#fff" color="black" @click="onClick">
        <van-tab :name="tab.id" :key="tab.id" :title="tab.tagName" v-for="tab in tabList" sticky>
          <!-- 男生 -->
          <div v-show="sex == '男生'" class="boy">
            <van-cell v-for="book in bookList" :key="book.id">
              <router-link tag="div" :to="`/details/${book.id}`" class="main_item">
                <lazy-component>
                  <img :src="book.coverUrl" v-lazy="book.coverUrl" />
                </lazy-component>
                <p>{{ book.bookName }}</p>
                <!-- <span :class="{ active_gold: book.summary }">{{
                  book.summary ||
                  "更新至" + book.chapterCount + "话"
                }}</span> -->
                <span :class="{ active_gold: book.summary }">{{
                  "更新至" + book.chapterCount + "话"
                }}</span>
              </router-link>
            </van-cell>
          </div>

          <!-- 女生 -->
          <div v-show="sex == '女生'" class="girl">
            <van-cell v-for="book in bookList" :key="book.id">
              <router-link tag="div" :to="`/details/${book.id}`" class="main_item">
                <lazy-component>
                  <img :src="book.coverUrl" v-lazy="book.coverUrl" />
                </lazy-component>
                <p>{{ book.bookName }}</p>
                <!-- <span :class="{ active_gold: book.summary }">{{
                  book.summary ||
                  "更新至" + book.chapterCount + "话"
                }}</span> -->
                <span :class="{ active_gold: book.summary }">{{
                  "更新至" + book.chapterCount + "话"
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
      default: "男生"
    }
  },
  data() {
    return {
      active: null,
      tabList: [],
      bookList: [],
      tagName: '全部',
      page: 1
    };
  },
  created() {
    this.getData();
    this.onClick();
  },
  mounted() {
    this.getData();
  },
  watch: {
    types(newType) {
      this.types = newType;
      this.getData(this.types);
    },
    sex(newType) {
      console.log(newType);
      this.getData();
    }
  },
  methods: {
    async getData() {
      let type = this.sex == "男生" ? 1 : 2;
      await this.$axios.get("/tag/list", {
        params: {
          type: type,
          pageNo: 1,
          pageSize: 20
        }
      })
        .then((data) => {
          this.tabList = data.data.data.dataList.filter((v) => {
            return v.type == type;
          });
          let tag = this.tabList.filter((tab) => {
            return tab.tagName == this.tagName;
          });
          this.$axios.get("/book/list", {
            params: {
              tag: tag.length > 0 ? tag[0].id : 1,
              pageNo: 1,
              pageSize: 20
            }
          })
            .then((data) => {
              this.bookList = data.data.data.dataList;
            })
        })
    },
    onClick(name) {
      if (name) {
        this.tagName = name;
      }
    }
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