<template>
  <form action="" method="" @submit.prevent="checkForm">
    <div class="field">
      <label for="name">اسمك الكريم:</label>
      <input type="text" id="name" placeholder="أدخل اسمك" v-model.trim="contact.name" required />
    </div>
    <div class="form-group">
      <div class="field">
        <label for="phone">رقم الجوال:</label>
        <input type="tel" id="phone" placeholder="أدخل رقم جوالك" v-model.number="contact.phone" />
      </div>
      <div class="field">
        <label for="email">البريد الإلكتروني:</label>
        <input type="email" id="email" placeholder="أدخل بريدك" v-model.trim="contact.email" required />
      </div>
    </div>
    <div class="field">
      <label for="message">الرسالة:</label>
      <textarea
        type="text"
        id="message"
        rows="3"
        placeholder="أدخل محتوى الرسالة"
        v-model.trim="contact.message"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary center">إرسال</button>
  </form>
</template>

<script>
export default {
  name: "ContactUsTmp",

  props: {
    contact: {
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
      message: {
        type: String,
        validator() {
          (val) => val.length < 200;
        },
      },
    },
  },

  methods: {
    checkForm() {
      if (this.contact.name && !isNaN(this.contact.phone) && this.contact.email && this.contact.message.length < 200) {
        this.$alert(`شكراً لتواصلكم معنا`, "تم إرسال سالتك بنجاح", "success").then(
          (this.contact.name = ""),
          (this.contact.phone = ""),
          (this.contact.email = ""),
          (this.contact.message = "")
        );
        return true;
      }
      this.errors = [];
      if (!this.contact.name) this.errors.push("يجب كتابة الاسم");
      if (isNaN(this.contact.phone)) this.errors.push("الجوال يجب أن يكون رقماً أو فارغاً");
      if (!this.contact.email) this.errors.push("يجب كتابة الإيميل");
      if (this.contact.message.length > 200) this.errors.push("الرسالة تحتوي على نص طويل جداً");
      this.$alert(this.errors.join(", "), "خطأ! لم يتم إرسال رسالتك", "error");
    },
  },
};
</script>
