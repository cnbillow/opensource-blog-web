<template>
    <div class="validate-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods: {
        validate() {
            return new Promise((resolve) => {
                for (let i in this.$parent.$refs) {
                    if (this.$parent.$refs[i].validateInput) {
                        let success = this.$parent.$refs[i].validateInput()
                        if (!success) {
                            return
                        }
                    }
                }
                resolve()
            })
        }
    }
}
</script>

