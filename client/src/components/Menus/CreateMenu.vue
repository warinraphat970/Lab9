<template>
  <div class="create-menu">
    <h1>Create Menu</h1>

    <form @submit.prevent="saveMenu">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="menu.name" required />
      </div>

      <div>
        <label for="price">Price</label>
        <input id="price" v-model="menu.price" required />
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="menu.description"></textarea>
      </div>

      <button
        type="submit"
        :disabled="saving"
        @click.prevent="saveMenu"
        aria-busy="saving"
      >
        <span v-if="!saving">บันทึกเมนู</span>
        <span v-else>กำลังบันทึก...</span>
      </button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService'

export default {
  data () {
    return {
      menu: {
        name: '',
        price: '',
        description: ''
      },
      message: '',
      saving: false
    }
  },
  methods: {
    async saveMenu () {
      console.log('saveMenu called', this.menu)
      this.saving = true
      try {
        const res = await MenuService.post(this.menu)
        this.message = 'สร้างเมนูสำเร็จ'
        console.log('menu created', res && res.data ? res.data : res)
        // reset form
        this.menu = { name: '', price: '', description: '' }
        // optionally navigate to list or show
        // this.$router.push({ name: 'MenusIndex' })
      } catch (err) {
        this.message = 'ไม่สามารถบันทึกเมนูได้'
        console.error(err)
      }
      this.saving = false
    }
  }
}
</script>

<style scoped>
.create-menu {
  max-width: 600px;
}
form > div {
  margin-bottom: 8px;
}
label { display:block; font-weight:600 }
input, textarea { width:100%; padding:6px }
button { padding:8px 12px; cursor: pointer }
button[disabled] { opacity: 0.6; cursor: wait }
.create-menu { position: relative; z-index: 1 }
</style>
