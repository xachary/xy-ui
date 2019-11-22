<template>
    <div class="sample">
        <h3>url地址</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="url"
        >
        <div><label for="">check: </label>{{urlMsg}}</div>

        <h3>邮箱地址</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="email"
        >
        <div><label for="">check: </label>{{emailMsg}}</div>

        <h3>身份证</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="idCard"
        >
        <div><label for="">check: </label>{{idCardMsg}}</div>

        <h3>港澳台居民居住证</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="residencePermit"
        >
        <div><label for="">check: </label>{{residencePermitMsg}}</div>

        <h3>统一社会信用代码</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="creditCode"
        >
        <div><label for="">check: </label>{{creditCodeMsg}}</div>

        <h3>外国人永久居留身份证</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="chinagreenCard"
        >
        <div><label for="">check: </label>{{chinagreenCardMsg}}</div>

        <h3>军人证件号</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="militaryCard"
        >
        <div><label for="">check: </label>{{militaryCardMsg}}</div>

        <h3>回乡证</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="homeReturnPermit"
        >
        <div><label for="">check: </label>{{homeReturnPermitMsg}}</div>

        <h3>护照</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="passport"
        >
        <div><label for="">check: </label>{{passportMsg}}</div>

        <h3>营业执照</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="businessLicense"
        >
        <div><label for="">check: </label>{{businessLicenseMsg}}</div>

        <h3>手机号码</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="mobile"
        >
        <div><label for="">check: </label>{{mobileMsg}}</div>

        <h3>中文姓名</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="cnName"
        >
        <div><label for="">check: </label>{{cnNameMsg}}</div>

        <h3>金额</h3>
        <input
            type="text"
            placeholder="please input"
            v-model="price"
        >
        <div><label for="">check: </label>{{priceMsg}}</div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            url: 'http://www.google.com',
            email: '179740385@qq.com',
            idCard: '',
            residencePermit: '',
            creditCode: '',
            chinagreenCard: '',
            militaryCard: '',
            homeReturnPermit: '',
            passport: '',
            businessLicense: '',
            mobile: '18507567777',
            cnName: '杨某某',
            price: 12.45
        }
    },
    computed: {
        urlMsg() {
            let msg = this.$xyValidate.url(this.url).msg
            return msg ? msg : 'pass'
        },
        emailMsg() {
            let msg = this.$xyValidate.email(this.email).msg
            return msg ? msg : 'pass'
        },
        idCardMsg() {
            let msg = this.$xyValidate.idCard(this.idCard).msg
            return msg ? msg : 'pass'
        },
        residencePermitMsg() {
            let msg = this.$xyValidate.residencePermit(this.residencePermit).msg
            return msg ? msg : 'pass'
        },
        creditCodeMsg() {
            let msg = this.$xyValidate.creditCode(this.creditCode).msg
            return msg ? msg : 'pass'
        },
        chinagreenCardMsg() {
            let msg = this.$xyValidate.chinagreenCard(this.chinagreenCard).msg
            return msg ? msg : 'pass'
        },
        militaryCardMsg() {
            let msg = this.$xyValidate.militaryCard(this.militaryCard).msg
            return msg ? msg : 'pass'
        },
        homeReturnPermitMsg() {
            let msg = this.$xyValidate.homeReturnPermit(this.homeReturnPermit).msg
            return msg ? msg : 'pass'
        },
        passportMsg() {
            let msg = this.$xyValidate.passport(this.passport).msg
            return msg ? msg : 'pass'
        },
        businessLicenseMsg() {
            let msg = this.$xyValidate.businessLicense(this.businessLicense).msg
            return msg ? msg : 'pass'
        },
        mobileMsg() {
            let msg = this.$xyValidate.mobile(this.mobile).msg
            return msg ? msg : 'pass'
        },
        cnNameMsg() {
            let msg = this.$xyValidate.cnName(this.cnName).msg
            return msg ? msg : 'pass'
        },
        priceMsg() {
            let msg = this.$xyValidate.price({ fixed: 2, min: 1, max: 100, len: 2 })(this.price).msg
            return msg ? msg : 'pass'
        }
    },
    methods: {
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
}
</style>
