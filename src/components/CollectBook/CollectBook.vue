<template>
  <div class="collect">
    <!-- <h3>收藏</h3> -->
    <!-- {{ news }} -->
    <!-- 编辑按钮 -->
    <van-popover theme="dark" v-model="showEdit" trigger="click" :actions="actions" @select="onSelect"
      placement="left-end" class="edit" :close-on-click-action="false" :close-on-click-outside="false"
      v-if="!news && bookList">
      <template #reference>
        <img src="@/assets/image/编辑.png" @click="remove = !remove" />
      </template>
    </van-popover>

    <!-- <button @click.stop="addAll" v-show="remove">全选</button>
    <button @click.stop="addEll" v-show="remove">返选</button>
    <button @click.stop="addRem" v-show="remove">取消</button> -->
    <need-login :news="news" v-if="news"></need-login>
    <!-- 内容 -->
    <div class="main" v-if="!news">
      <van-checkbox-group v-model="result" ref="checkboxGroup" class="ul" v-if="remove">
        <li v-for="book in bookList" :key="book.id" :class="{ li: remove }">
          <img :src="book.vertical_cover + '@200w.jpg'" />
          <p>{{ book.title }}</p>
          <!-- <span>未看/{{ book.total }}话</span> -->
          <van-checkbox :name="book.id" class="input" @click="add(book.id)" v-show="remove">
          </van-checkbox>
        </li>

        <router-link tag="li" to="/sort" class="cha">+</router-link>
      </van-checkbox-group>

      <div class="ul" v-else>
        <router-link tag="li" :to="`/details/${book.id}`" v-for="book in bookList" :key="book.id">
          <img :src="book.vertical_cover" alt="" />
          <p>{{ book.title }}</p>
          <span>共{{ book.total }}话</span>
          <!-- <van-checkbox
            :name="book.id"
            class="input"
            @click="add(book.id)"
            v-show="remove"
          ></van-checkbox> -->
        </router-link>

        <router-link tag="li" to="/sort" class="cha">+</router-link>
      </div>
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
      // 是否未登录
      news: true,
      bookList: [],
      result: [],
      remove: false,
      showEdit: false,
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
  watch: {
    "$store.state.Login"() {
      this.getIn();
    },
  },
  methods: {
    getIn() {
      this.news = !this.$store.state.Login;
    },
    getBook() {
      this.bookList = this.$store.state.bookList;
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
      this.$store.commit("removeList", this.result);
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
  },
};
</script>

<style lang="scss" scoped>
.collect {
  min-height: 88vh;
  position: relative;

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
      width: 100%;
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

      .cha {
        width: 30%;
        height: 145px;
        border: 1px solid #c9e9ff;
        // border: 1px solid red;
        line-height: 139px;
        text-align: center;
        color: #31a9ff;
        background-color: #f7fcff;
        font-size: 30px;
      }
    }
  }
}
</style>