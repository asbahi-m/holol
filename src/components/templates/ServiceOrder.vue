<template>
  <div class="service-order">
    <h1 class="title underline">{{ title }}</h1>
    <form action="" method="" @submit.prevent="checkForm">
      <div class="field">
        <label for="name">{{ $t("form.name") }}:</label>
        <input type="text" id="name" :placeholder="$t('form.enter_name')" v-model.trim="order.name" required />
      </div>
      <div class="form-group">
        <div class="field">
          <label for="phone">{{ $t("form.phone") }}:</label>
          <input type="tel" id="phone" :placeholder="$t('form.enter_phone')" v-model.number="order.phone" />
        </div>
        <div class="field">
          <label for="email">{{ $t("form.email") }}:</label>
          <input type="email" id="email" :placeholder="$t('form.enter_email')" v-model.trim="order.email" required />
        </div>
      </div>
      <div class="field">
        <label for="service">{{ $t("form.type") }}:</label>
        <select id="service" v-model="order.service" required>
          <option value="0" disabled>{{ $t("form.choose_service") }}</option>
          <option v-for="service in services" :key="service.id" :value="service.id">
            {{ $i18n.locale !== "en" && service[$i18n.locale] ? service[$i18n.locale].name : service.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="description">{{ $t("form.description") }}:</label>
        <textarea
          type="text"
          id="description"
          rows="3"
          :placeholder="$t('form.enter_desc')"
          v-model.trim="order.desc"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary center">{{ $t("form.send") }}</button>
    </form>
    <div class="overlay-img" :style="{ 'background-image': `url(${image})` }"></div>
  </div>
</template>

<script>
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
      errors: [],
    };
  },

  props: {
    image: String,
    title: String,
    services: Array,
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
        const serviceName = this.services.filter((item) => item["id"] == this.order.service)[0];
        this.$alert(
          `${this.$t("form.name")}: ${this.order.name} | ${this.$t("form.email")}: ${this.order.email} |
          ${this.$t("form.type")}: ${
            this.$i18n.locale !== "en" && serviceName[this.$i18n.locale]
              ? serviceName[this.$i18n.locale].name
              : serviceName.name
          }`,
          this.$t("form.success_service_order"),
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
      if (!this.order.name) this.errors.push(this.$t("form.error_missing_field", [this.$t("form.name")]));
      if (isNaN(this.order.phone)) this.errors.push(this.$t("form.error_nan_or_empty", [this.$t("form.phone")]));
      if (!this.order.email) this.errors.push(this.$t("form.error_missing_field", [this.$t("form.email")]));
      if (!this.order.service) this.errors.push(this.$t("form.error_missing_choice", [this.$t("post.service")]));
      if (this.order.desc.length > 200)
        this.errors.push(this.$t("form.error_long_text", [this.$t("form.description")]));
      this.$alert(this.errors.join(", "), this.$t("form.error_order_failed"), "error");
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
