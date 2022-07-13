<template>
  <div class="grid grid-cols-5 gap-4 p-4 my-4 border border-purple-200 rounded-md">
    <div class="uppercase">
      {{ inv.id }}
    </div>
    <div>Due {{ inv.date }}</div>
    <div>{{ inv.to.name }}</div>
    <div>￡ {{ totalBill }}</div>
    <div class="capitalize">
      {{ inv.status }}
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['inv'],
  data: () => {
    return {
      totalBill: 0,
      statusClass: { bg: null, color: null }
    }
  },
  created () {
    this.totalBill = this.getTotalBill()
    this.statusClass = this.getStatusClass()
  },
  methods: {
    getTotalBill () {
      let total = 0
      this.inv.items.forEach((item) => {
        total += item.price * item.qty
      })
      return total
    },
    getStatusClass () {
      let bg = null
      let color = null
      switch (this.inv.status) {
        case 'paid':
          bg = 'bg-green-500'
          color = 'text-white'
          break
        case 'unpaid':
          bg = 'bg-red-500'
          color = 'text-white'
          break
        default:
          bg = 'bg-gray-500'
          color = 'text-white'
          break
      }

      return { bg, color }
    }
  }
}
</script>
