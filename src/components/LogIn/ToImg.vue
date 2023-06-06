<template>
    <div class="to-img">

        <div class="wei">
            <img src="@/assets/image/登录更精彩.png" alt="">
            <p v-if="news">登录才能知道自己追了哪些漫画哦~</p>
            <p v-if="his">登录同步云端记录</p>
            <div v-if="news" class="a_top">
                <div class="text" @click.stop="login">账号登录</div>
            </div>
        </div>

        <van-dialog v-model="show" title="请先登录" show-cancel-button @confirm="confirm" @cancel="cancel">
            <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
            <img src="@/assets/image/背景.jpg" class="bgc">
        </van-dialog>

    </div>
</template>

<script>
export default {
    props: {
        news: {
            type: Boolean,
            default: false
        },
        his: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            show: false,
        }
    },
    created() { },
    methods: {
        login() {
            this.show = true
        },
        cancel() {
            console.log('取消！！');
            this.$store.commit('changeFlag', false)

        },
        confirm() {
            console.log('确定~');
            this.$store.commit('changeFlag', true)

        },

    }
}
</script>

<style lang="scss" scoped>
.to-img {
    width: 100vw;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .bgc{
        width: 100%;
        margin-top: 10px;
    }

    .wei {
        text-align: center;

        img {
            width: 60%;
        }

        p {
            font-size: 14px;
        }

        .a_top {
            display: flex;
            justify-content: center;
            margin-top: 10px;
            // border: 1px solid red;

            .text {
                width: 106px;
                height: 30px;
                font-size: 14px;
                padding-left: 34px;
                border-radius: 20px;
                color: #fff;
                background: url(@/assets/image/bilibili.png) no-repeat;
                background-color: #32AAFF;
                background-size: 31px 17px;
                text-align: center;
                line-height: 30px;
                background-position: 8px center;
            }
        }

    }

    .login {
        width: 85vw;
        height: 100%;
        background-color: skyblue;
    }
}
</style>