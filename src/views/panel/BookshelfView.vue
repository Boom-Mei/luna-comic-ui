<template>
  <div class="book-shelf">
    <!-- <h1>书架</h1> -->

    <van-tabs v-model="active" color="black" sticky animated @click="onClick">
      <van-tab title="追漫" class="box1" name="追漫">
        <CollectBook></CollectBook>
      </van-tab>
      <van-tab title="历史" class="box1" name="历史">
        <HistoryBook></HistoryBook>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CollectBook from "@/components/CollectBook/CollectBook.vue";
import HistoryBook from "../../components/CollectBook/HistoryBook.vue";

export default {
  components: {
    CollectBook,
    HistoryBook
  },
  data() {
    return {
      active: ""
    };
  },
  watch: {
    active() {
      let name = window.localStorage.getItem('BookActive')
      if (name) {
        this.active = name;
      }
    }
  },
  methods: {
    onClick(name) {
      this.active = name
      localStorage.setItem("BookActive", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.book-shelf {
  .box1 {
    height: 85vh;
  }
}
</style>