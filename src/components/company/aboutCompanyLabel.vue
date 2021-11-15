<template>
    <div class="header-text">
        <h3>О компании</h3>
        <v-badge dot :color="color" offset-x="-20" offset-y="20"></v-badge>
        <span class="text">{{ statusText }}</span>
    </div>
</template>

<script>
export default {
    props: {
        status,
    },
    mounted() {},
    data() {
        return {
            color: null,
            statusText: null,
        };
    },
    watch: {
        status: function (val) {
            switch (val) {
                case 0:
                    //pending
                    this.color = "yellow";
                    this.statusText = "На рассмотрении";
                    break;
                case 1:
                    //approved
                    this.color = "green";
                    this.statusText = "Одобрено";
                    break;
                case 2:
                    //declined
                    this.color = "red";
                    this.statusText = "Отклонено";
                    break;
            }
        },
    },
};
</script>

<style>
.header-text {
    display: flex;
}
.header-text h3 {
    font-weight: 700;
}
.header-text .text {
    margin-left: 34px;
    padding-top: 5px;
    font-size: 10pt;
}
</style>
