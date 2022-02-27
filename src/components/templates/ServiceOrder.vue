<template>
  <div class="service-order">
    <h1 class="title underline">{{ title }}</h1>
    <form action="" method="" @submit.prevent="checkForm">
      <div class="field">
        <label for="name">اسمك الكريم:</label>
        <input type="text" id="name" placeholder="أدخل اسمك" v-model.trim="order.name" required />
      </div>
      <div class="form-group">
        <div class="field">
          <label for="phone">رقم الجوال:</label>
          <input type="tel" id="phone" placeholder="أدخل رقم جوالك" v-model.number="order.phone" />
        </div>
        <div class="field">
          <label for="email">البريد الإلكتروني:</label>
          <input type="email" id="email" placeholder="أدخل بريدك" v-model.trim="order.email" required />
        </div>
      </div>
      <div class="field">
        <label for="service">نوع الخدمة:</label>
        <select id="service" v-model="order.service" required>
          <option value="0" disabled>اختر أحد الخدمات</option>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
        </select>
      </div>
      <div class="field">
        <label for="description">وصف الطلب:</label>
        <textarea
          type="text"
          id="description"
          rows="3"
          placeholder="أدخل وصف الخدمة"
          v-model.trim="order.desc"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary center">إرسال</button>
    </form>
    <div class="overlay-img" :style="{ 'background-image': `url(${image})` }"></div>
  </div>
</template>

<script>
import Data from "/db.json";

export default {
  name: "ServiceOrder",
  data() {
    return {
      order: {
        name: "",
        phone: "",
        email: "",
        service: 0,
        desc: "",
      },
      services: Data.services,
      errors: [],
    };
  },

  props: {
    image: String,
    title: String,
  },

  mounted() {
    this.$route.params.service_id ? (this.order.service = this.$route.params.service_id) : "";
  },

  methods: {
    checkForm() {
      if (
        this.order.name &&
        !isNaN(this.order.phone) &&
        this.order.email &&
        this.order.service &&
        this.order.desc.length < 200
      ) {
        const serviceName = Data.services.filter((item) => item.id == this.order.service);
        this.$alert(
          `اسمك: ${this.order.name} | بريدك: ${this.order.email} | نوع الخدمة: ${serviceName[0].name}`,
          "تم إرسال سالتك بنجاح",
          "success"
        ).then(
          (this.order.name = ""),
          (this.order.phone = ""),
          (this.order.email = ""),
          (this.order.service = 0),
          (this.order.desc = "")
        );
        return true;
      }
      this.errors = [];
      if (!this.order.name) this.errors.push("يجب كتابة الاسم");
      if (isNaN(this.order.phone)) this.errors.push("الجوال يجب أن يكون رقماً أو فارغاً");
      if (!this.order.email) this.errors.push("يجب كتابة الإيميل");
      if (!this.order.service) this.errors.push("يجب اختيار أحد الخدمات");
      if (this.order.desc.length > 200) this.errors.push("وصف الطلب يحتوي على نص طويل جداً");
      this.$alert(this.errors.join(", "), "خطأ! لم يتم إرسال رسالتك", "error");
    },
  },
};
</script>

<style lang="scss" scoped>
.service-order {
  position: relative;
  padding: 15px;
  color: #fff;
  form {
    padding: 0 30px;
    input,
    select,
    textarea {
      border-color: rgba(0, 0, 0, 0.8);
      &:focus {
        outline-color: #fff;
      }
    }
  }
}
</style>
