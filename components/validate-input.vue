<template>
    <div class="validate-input">
        <input :type="type" :value="currentValue" :placeholder="placeholder" @input="inputHandler" />
        <span v-if="tipShow">{{tipText}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentValue: this.value,
            tipText: '',
            tipShow: false
        }
    },
    props: ['value', 'rule', 'type', 'placeholder'],
    methods: {
        clear() {
            this.tipText = ''
            this.tipShow = false
        },
        inputHandler(e) {
            this.clear()
            const value = e.target.value
            this.currentValue = value
            this.$emit('input', value)
        },
        validateInput() {
            const re = /^[a-zA-Z0-9]+$/
            let success = true
            if (!re.test(this.currentValue)) {
                this.tipText = '含有非法字符'
                success = false
            }
            if (this.rule === 'account') {
                if (this.currentValue.length < 4) {
                    this.tipText = '账号不能短于4位数'
                    success = false
                }
            }
            if (this.rule === 'password') {
                if (this.currentValue.length < 6) {
                    this.tipText = '密码不能短于6位数'
                    success = false
                }
            }
            if (!this.success) {
                this.tipShow = true
            }
            return success
        }
    }
}
</script>

<style lang="less">
.validate-input {
    position: relative;
    display: inline-block;
    width: 100%;
    input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 0 10px;
        line-height: 40px;
        border: 1px solid #ddd;
        outline: none;
    }
    span {
        position: absolute;
        display: flex;
        align-items: center;
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
        height: 30px;
        padding: 0 10px;
        color: #ed4014;
    }
}
</style>
