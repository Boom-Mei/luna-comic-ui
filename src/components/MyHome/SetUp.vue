<template>
    <div class="set-up">
        <!-- <h3>设置</h3> -->
        <van-popup v-model="show" closeable position="bottom" :style="{ height: '100%' }">
            <h3>设置</h3>
            <ul class="box">
                <li>
                    <p>消息设置</p>
                    <van-icon name="arrow" />
                </li>
                <li>
                    <p>关闭流量阅读提醒</p>
                    <van-switch v-model="che1" size="24px" />
                </li>
                <li>
                    <p>关闭流量阅读提醒</p>
                    <van-switch v-model="che2" size="24px" />
                </li>
                <li>
                    <p>允许移动网络缓存漫画</p>
                    <van-switch v-model="che3" size="24px" />
                </li>
                <li>
                    <p>首页推荐设置</p>
                    <span>双列模式
                        <van-icon name="arrow" />
                    </span>
                </li>
                <li>
                    <p>深色模式</p>
                    <span>普通模式
                        <van-icon name="arrow" />
                    </span>
                </li>
                <li>
                    <p>清理临时文件</p>
                    <span>82.MB
                        <van-icon name="arrow" />
                    </span>
                </li>
                <li>
                    <p>自动清理临时文件</p>
                    <span>300MB
                        <van-icon name="arrow" />
                    </span>
                </li>
                <li>
                    <p>权限与账号管理</p>
                    <van-icon name="arrow" />
                </li>
                <button class="btn" v-if="this.$store.state.Login" @click.stop="removeLogin">退出登录</button>
            </ul>
        </van-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            che1: true,
            che2: true,
            che3: false
        }
    },
    // created() { this.getHistoryLogin() },
    methods: {
        removeLogin() {
            this.$store.commit('changeLogin', false)
        },
        // getHistoryLogin() {
        //     let logins = localStorage.getItem('Login');
        //     if (logins) {

        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
.set-up {
    max-height: 100vh;

    h3 {
        font-size: 18px;
        height: 32px;
        margin: 10px 0;
        text-align: center;
        letter-spacing: 3px;
        font-weight: 500;
    }

    .box {
        font-size: 15px;
        padding: 10px;

        li {
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #ccc;
            // border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                font-size: 13px;
                color: gray;
            }

            &:nth-last-of-type(1) {
                border-bottom: 1px solid #ccc;
            }
        }

        .btn {
            margin: 10px 0;
            width: 100%;
            height: 40px;
            border-radius: 20px;
            background-color: #fff;
            color: #1989fa;
            border: 1px solid #1989fa;
        }
    }
}
</style>