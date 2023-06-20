<template>
  <div class="history">
    <!-- <h3>历史记录</h3> -->
    <!-- {{his}} -->
    <!-- 编辑按钮 -->
    <van-popover theme="dark" v-model="showEdit" trigger="click" :actions="actions" @select="onSelect"
      placement="left-end" class="edit" :close-on-click-action="btnClear" :close-on-click-outside="false"
      v-if="!his && historyList">
      <template #reference>
        <img src="@/assets/image/编辑.png" @click="remove = !remove" />
      </template>
    </van-popover>

    <need-login :his="his" v-if="his"></need-login>
    <div class="main" v-if="!his">
      <!-- <ul v-if="historyList">
        <li v-for="h in historyList" :key="h.id">
          {{ h.title }}
          {{ h.id }}
        </li>
      </ul> -->

      <van-checkbox-group v-model="result" ref="checkboxGroup" class="ul" v-if="remove">
        <li v-for="i in historyList" :key="i.id" :class="{ li: remove }">
          <img :src="i.vertical_cover + '@200w.jpg'" />
          <p>{{ i.title }}</p>

          <span v-if="i.chapterNum">{{ "看到" + i.chapterNum + "话" }}/{{ i.total }}话</span>
          <span v-else>未看/{{ i.total }}话</span>

          <van-checkbox :name="i.id" class="input" @click="add(i.id)" v-show="remove"></van-checkbox>
        </li>
      </van-checkbox-group>

      <div class="ul" v-else>
        <router-link tag="li" :to="`/details/${book.id}`" v-for="book in historyList" :key="book.id">
          <img :src="book.vertical_cover + '@200w.jpg'" alt="" />
          <p>{{ book.title }}</p>
          <span v-if="book.chapterNum">{{ "看到" + book.chapterNum + "话" }}/{{ book.total }}话</span>
          <span v-else>未看/{{ book.total }}话</span>
          <van-checkbox :name="book.id" class="input" @click="add(book.id)" v-show="remove"></van-checkbox>
        </router-link>
      </div>

      <!-- <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
        <van-checkbox name="c">复选框 c</van-checkbox>
      </van-checkbox-group> -->
    </div>
  </div>
</template>

<script>
import NeedLogin from "../Login/NeedLogin.vue";

export default {
  components: {
    NeedLogin
  },
  data() {
    return {
      his: true,
      historyList: [],
      result: [],
      remove: false,
      showEdit: false,
      btnClear: false,
      actions: [
        { text: "全选", icon: "passed" },
        { text: "取消", icon: "warning-o" },
        { text: "删除", icon: "close" },
      ]
    };
  },
  created() {
    this.getIn();
    this.getBook();
  },
  mounted() {
    this.removeAll();
  },
  watch: {
    // "$store.state.bookList": {},
    "$store.state.Login"() {
      this.getIn();
    },
  },
  methods: {
    getIn() {
      this.his = !this.$store.state.Login;
    },
    getBook() {
      this.historyList = this.$store.state.historyList;
    },
    // 选择要删除的
    add(value) {
      // todo: 自己加的，待验证
      this.result.add(value);
    },
    // 全选
    addAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    // 反选
    addEll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    // 取消
    addRem() {
      this.$refs.checkboxGroup.toggleAll(false);
    },
    // 删除
    removeAll() {
      // 把编辑关闭
      this.$store.commit("removeHistory", this.result);

      this.getBook();
    },
    // 编辑按钮
    onSelect(action) {
      this.$toast(action.text);
      if (action.text == "全选") {
        this.addAll();
      } else if (action.text == "删除") {
        this.removeAll();
      } else if (action.text == "反选") {
        this.addEll();
      } else if (action.text == "取消") {
        this.addRem();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.history {
  height: 88vh;
  position: relative;
  overflow: hidden;

  .edit {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 517px;
    z-index: 8;

    img {
      width: 100%;
    }
  }

  .main {
    height: 85vh;
    overflow: auto;

    .ul {
      display: flex;
      flex-wrap: wrap;

      padding: 5px;

      .li {
        // height: 145px;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          // height: 100%;
          height: 145px;
          background-color: black;
          opacity: 0.5;
        }
      }

      li {
        width: 30%;
        height: 197px;
        // border: 1px solid red;
        margin: 5px 6px;
        display: flex;
        flex-direction: column;
        letter-spacing: 1px; //文字间距
        position: relative;

        img {
          height: 145px;
          border-radius: 5px;
        }

        p {
          height: 20px;
          font-size: 14px;
          margin: 8px 0 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          font-size: 12px;
          color: gray;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .input {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
        }
      }
    }
  }
}
</style>