<template>
  <section class="section">
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
            <b-upload :name="field.name" v-model="file">
              <a class="button is-secondary">
                <b-icon icon="upload" />
                <span>
                  Click to upload
                </span>
              </a>
            </b-upload>
            <span v-if="file" class="file-name">
              {{ file.name }}
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

      <button
        type="submit"
        class="button is-primary"
      >
        Submit
      </button>
    </form>
  </section>
</template>

<script>

export default {
  data() {
    return {
      fields: [],
      file: null
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('/api/form')
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
    submit(event) {
      event.preventDefault()
      const bodyFormData = new FormData(this.$refs.form)
      this.$axios({
        method: 'post',
        url: '/api/send',
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
    }
  }
}
</script>
