<template>
  <main>
    <section class="section pigeon">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.933 511.933">
          <path d="M501.262 63.771c0-5.89-4.781-10.671-10.671-10.671s-10.655 4.781-10.655 10.671h-4.874l3.155-4.875a10.677 10.677 0 0 0 .953-9.748c-.453-1.141-11.514-27.809-47.149-27.809-3.937 0-8.093.344-12.311 1.016-25.731 4.093-41.604 37.135-59.976 75.411-13.951 29.043-28.371 59.086-46.854 75.442-11.889 10.53-47.057 32.418-147.058 76.943-60.398 26.879-116.234 49.344-116.781 49.594-4.093 1.625-6.749 5.625-6.687 10.029a10.663 10.663 0 0 0 6.952 9.844c7.03 2.623 13.967 5.123 20.841 7.529L5.392 364.019C1.08 366.455-.966 371.548.44 376.298a10.654 10.654 0 0 0 10.218 7.654c.203 0 .406 0 .609-.031l233.937-13.311c.203.031.406.063.594.063 1.281 11.279 4.874 26.559 9.482 39.588 6.39 18.092 13.654 29.527 22.013 34.621v24.402h-10.671a10.638 10.638 0 0 0-10.654 10.654 10.64 10.64 0 0 0 10.654 10.656h63.992c5.889 0 10.67-4.75 10.67-10.656 0-5.904-4.781-10.654-10.67-10.654h-31.996v-24.402c8.374-5.094 15.639-16.529 22.028-34.621 4.562-12.904 8.124-28.027 9.437-39.275 48.071-6.313 85.004-25.09 110.063-56.055 15.248-18.842 25.996-42.088 32.246-69.592.156-.547.281-1.094.359-1.656 9.373-42.791 7.982-95.799-4.234-158.587h32.746c5.889 0 10.67-4.766 10.67-10.671-.001-5.89-4.782-10.654-10.671-10.654zM55.447 360.05l41.729-23.748c21.294 6.906 41.775 12.875 61.366 17.873L55.447 360.05zm246.108 40.119c-5.844 17.654-11.374 24.496-13.592 26.152-2.219-1.656-7.75-8.498-13.607-26.152-3.188-9.654-5.531-19.811-6.75-27.559a368.41 368.41 0 0 0 23.841.781h.031c5.718 0 11.312-.156 16.778-.438-1.233 7.718-3.561 17.718-6.701 27.216zm122.014-98.674c-13.264 16.404-30.761 28.965-51.977 37.338-22.247 8.781-49.197 13.248-80.114 13.248h-.016c-55.945 0-126.045-14.498-208.674-43.119 47.634-19.715 149.12-62.795 207.799-95.774a11.044 11.044 0 0 0 3.015-1.281c.594-.375 60.367-36.995 108.455-20.669 21.684 7.343 38.15 24.809 49.008 51.884-5.592 23.135-14.748 42.625-27.496 58.373zm33.012-93.432c-12.404-18.075-28.371-30.511-47.76-37.057-21.402-7.249-43.947-6.218-63.99-1.969 12.982-17.997 23.683-40.275 34.134-62.038 13.78-28.715 29.402-61.242 44.088-63.585 3.125-.5 6.141-.75 8.968-.75 13.78 0 21.138 5.921 24.669 10.248l-10.187 15.732c-.047.078-.094.172-.156.266l-.327.563a2.249 2.249 0 0 0-.156.344 5.331 5.331 0 0 0-.281.609 2.906 2.906 0 0 0-.125.344 7.9 7.9 0 0 0-.219.641c-.047.125-.063.25-.094.391-.063.203-.109.406-.156.609a4.742 4.742 0 0 0-.063.483 5.624 5.624 0 0 0-.078.547 7.76 7.76 0 0 0-.031.594c-.016.141-.016.266-.016.391v.078c0 .203.016.406.031.609 0 .156 0 .313.031.469.016.141.031.266.063.406l.094.656s0 .016.016.016c10.795 50.618 14.639 94.487 11.545 131.403z" />
          <path d="M426.6 53.1c-5.89 0-10.654 4.781-10.654 10.671s4.764 10.654 10.654 10.654 10.67-4.765 10.67-10.654S432.49 53.1 426.6 53.1z" />
        </svg>
      </div>

      <h1 class="title">
        Pigeon
      </h1>

      <p class="subtitle">
        Simple open-source serverless API for sending emails and building forms effortlessly.
      </p>

      <a
        href="https://github.com/SnowdogApps/pigeon"
        target="_blank"
        class="button"
      >
        Github
      </a>
    </section>
    <hr>
    <section class="section">
      <h2 class="title">
        Demo
      </h2>

      <form
        ref="form"
        @submit="submit"
      >
        <template v-for="field in fields">
          <b-field
            v-if="isInput(field.type)"
            :key="field.id"
            :label="field.label"
          >
            <b-input
              :type="field.type"
              :name="field.name"
              :required="field.required"
            />
          </b-field>

          <template v-if="isUpload(field.type)">
            <b-field
              :key="field.id"
              class="file"
            >
              <b-upload
                v-show="!file"
                :name="field.name"
                v-model="file"
                :required="field.required"
              >
                <a class="tag is-secondary">
                  <b-icon icon="upload" />
                  <span>
                    Click to upload
                  </span>
                </a>
              </b-upload>
              <span
                v-if="file"
                class="tag is-primary"
              >
                {{ file.name }}
                <button
                  @click="file = null"
                  class="delete is-small"
                  type="button"
                />
              </span>
            </b-field>
          </template>

          <template v-if="isCheckbox(field.type)">
            <div
              :key="field.id"
              class="field"
            >
              <b-checkbox
                :name="field.name"
                :required="field.required"
              >
                {{ field.label }}
              </b-checkbox>
            </div>
          </template>
        </template>

        <b-message
          v-if="status && message"
          :type="status"
          has-icon
        >
          {{ message }}
        </b-message>

        <button
          type="submit"
          class="button is-primary"
        >
          Submit
        </button>
      </form>
    </section>
  </main>
</template>

<script>

export default {
  data() {
    return {
      fields: [],
      file: null,
      status: null,
      message: null
    }
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `${process.env.api}`,
      { params: { id: 'demo' } }
    )
    this.fields = data
  },
  methods: {
    isInput(type) {
      return ['text', 'email', 'phone', 'textarea', 'password'].includes(type)
    },
    isUpload(type) {
      return type === 'file'
    },
    isCheckbox(type) {
      return type === 'checkbox'
    },
    async submit(event) {
      event.preventDefault()
      this.message = null
      this.status = null

      const bodyFormData = new FormData(this.$refs.form)

      try {
        const { data } = await this.$axios({
          method: 'post',
          url: `${process.env.api}`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { id: 'demo' }
        })

        this.status = 'is-success'
        this.message = data
      } catch (error) {
        this.status = 'is-danger'
        this.message = error.response.data || error
      }
    }
  }
}
</script>

<style>
.pigeon {
  text-align: center;
}

.logo {
  width: 200px;
  margin: 20px auto;
}
</style>
