<template>
  <form action="" method="" @submit.prevent="checkForm">
    <div class="field">
      <label for="name">{{ $t("form.name") }}:</label>
      <input type="text" id="name" :placeholder="$t('form.enter_name')" v-model.trim="contact.name" required />
    </div>
    <div class="form-group">
      <div class="field">
        <label for="phone">{{ $t("form.phone") }}:</label>
        <input type="tel" id="phone" :placeholder="$t('form.enter_phone')" v-model.number="contact.phone" />
      </div>
      <div class="field">
        <label for="email">{{ $t("form.email") }}:</label>
        <input type="email" id="email" :placeholder="$t('form.enter_email')" v-model.trim="contact.email" required />
      </div>
    </div>
    <div class="field">
      <label for="message">{{ $t("form.message") }}:</label>
      <textarea
        type="text"
        id="message"
        rows="3"
        :placeholder="$t('form.enter_msg')"
        v-model.trim="contact.message"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary center">{{ $t("form.send") }}</button>
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
        this.$alert(this.$t("form.success_thanks"), this.$t("form.success_send_msg"), "success").then(
          (this.contact.name = ""),
          (this.contact.phone = ""),
          (this.contact.email = ""),
          (this.contact.message = "")
        );
        return true;
      }
      this.errors = [];
      if (!this.contact.name) this.errors.push(this.$t("form.error_missing_field", [this.$t("form.name")]));
      if (isNaN(this.contact.phone)) this.errors.push(this.$t("form.error_nan_or_empty", [this.$t("form.phone")]));
      if (!this.contact.email) this.errors.push(this.$t("form.error_missing_field", [this.$t("form.email")]));
      if (this.contact.message.length > 200)
        this.errors.push(this.$t("form.error_long_text", [this.$t("form.message")]));
      this.$alert(this.errors.join(", "), this.$t("form.error_send_failed"), "error");
    },
  },
};
</script>
