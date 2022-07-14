<template>
  <div>
    <!-- Desktop -->
    <div
      @click="$router.push({path: '/invoices/detail', query: {id: inv.id}})"
      class="hidden md:grid grid-cols-12 p-4 pl-8 my-4 bg-primary-800 rounded-md items-center text-sm cursor-pointer hover:opacity-80"
    >
      <div class="col-span-2 uppercase font-semibold">
        <span class="opacity-70">#</span>{{ inv.id }}
      </div>
      <div class="col-span-3">Due {{ inv.dueDate }}</div>
      <div class="col-span-2">{{ inv.to.name }}</div>
      <div class="col-span-5 flex justify-end items-center">
        <div class="text-lg text-white font-semibold mr-8">￡ {{ totalBill }}</div>
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

    <!-- Mobile -->
    <div
      @click="$router.push({path: '/invoices/detail', query: {id: inv.id}})"
      class="md:hidden grid grid-cols-12 p-4 my-2 bg-primary-800 rounded-md items-center text-sm cursor-pointer hover:opacity-80"
    >
      <div class="col-span-6">
        <div class="uppercase font-semibold">
          <span class="opacity-70">#</span>{{ inv.id }}
        </div>
        <div class="mt-4">Due {{ inv.dueDate }}</div>
        <div class="text-lg text-white font-semibold mr-8">￡ {{ totalBill }}</div>
      </div>
      <div class="col-span-6 flex flex-col justify-start items-end">
        <div class="text-right mr-1">{{ inv.to.name }}</div>
        <div
          :class="statusClass"
          class="capitalize px-4 py-2 mt-4 flex justify-center gap-2 items-center rounded-md w-24"
        >
          <span><IconCircleSvg class="h-2" /></span>
          <span>{{ inv.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const numeral = require('numeral')
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['inv'],
  data: () => {
    return {
      totalBill: 0,
      statusClass: null
    }
  },
  created () {
    this.totalBill = numeral(this.getTotalBill()).format('0,0.00')
    this.statusClass = this.getStatusClass()
  },
  methods: {
    getTotalBill () {
      let total = 0
      this.inv.items.forEach((item) => {
        total += item.price * item.qty
      })
      return Math.round(total * 100) / 100
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
