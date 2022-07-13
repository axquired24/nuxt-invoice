<template>
  <div class="grid grid-cols-5 gap-4 p-4 pl-8 my-4 bg-primary-800 rounded-md items-center text-sm cursor-pointer hover:opacity-80">
    <div class="uppercase font-semibold">
      <span class="opacity-70">#</span>{{ inv.id }}
    </div>
    <div>Due {{ inv.dueDate }}</div>
    <div>{{ inv.to.name }}</div>
    <div class="col-span-2 flex justify-end items-center">
      <div class="text-lg text-white font-bold mr-8">￡ {{ totalBill }}</div>
      <div
        :class="statusClass"
        class="capitalize px-4 py-2 mr-4 flex justify-center gap-2 items-center rounded-md w-24"
      >
        <span><IconCircleSvg class="h-2" /></span>
        <span>{{ inv.status }}</span>
      </div>
      <span><IconChevronRightSvg class="h-4 text-cgrey-a" /></span>
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
          bg = 'bg-cgreen-b'
          color = 'text-cgreen-a'
          break
        case 'pending':
          bg = 'bg-cyellow-b'
          color = 'text-cyellow-a'
          break
        default:
          bg = 'bg-cgrey-b'
          color = 'text-cgrey-a'
          break
      }

      return bg + ' ' + color
    }
  }
}
</script>
