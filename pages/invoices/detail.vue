<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center items-start pt-10">
    <div class="w-1/2">
      <div class="grid grid-cols-4 items-end">
        <div class="col-span-2 flex gap-2">
          <NuxtLink to="/invoices">
            <IconChevronRightSvg class="text-primary-800 hover:text-cgrey-a h-10 cursor-pointer transform rotate-180" />
          </NuxtLink>
          <div class="text-3xl font-bold">
            Invoice <span class="opacity-70">#</span><span class="uppercase">{{ invoice?.id }}</span>
          </div>
        </div>
        <div class="col-span-2 gap-2 flex justify-end items-center">
          <div class="c__btn bg-transparent text-cgrey-a hover:text-gray-400">
            <span class="text-sm font-semibold">Edit</span>
          </div>
          <div class="c__btn bg-red-700 hover:bg-red-800">
            <span class="text-sm font-semibold">Delete</span>
          </div>
          <div class="c__btn bg-primary-500 hover:bg-primary-600">
            <span class="text-sm font-semibold">Mark as Paid</span>
          </div>
        </div>
      </div>
      <!-- End section header -->

      <div class="p-10 mt-10 bg-primary-800 rounded-md">
        <div
          :class="statusClass"
          class="capitalize px-4 py-2 mb-4 flex justify-center gap-2 items-center rounded-md w-24"
        >
          <span><IconCircleSvg class="h-2" /></span>
          <span>{{ invoice?.status }}</span>
        </div>
        <div class="flex justify-between opacity-80 text-sm">
          <div class="flex flex-col gap-0 text-left">
            <div>{{ invoice?.to?.address }}</div>
            <div>{{ invoice?.to?.city }}</div>
            <div>{{ invoice?.to?.postalCode }}</div>
            <div>{{ invoice?.to?.country }}</div>
          </div>
          <div class="flex flex-col gap-0 text-right">
            <div>{{ invoice?.from?.address }}</div>
            <div>{{ invoice?.from?.city }}</div>
            <div>{{ invoice?.from?.postalCode }}</div>
            <div>{{ invoice?.from?.country }}</div>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <div class="text-sm">Due Date</div>
            <div>{{ getDueDate(invoice) }}</div>
          </div>
          <div>
            <div class="text-sm">To</div>
            <div>{{ invoice?.to?.name }}</div>
          </div>
          <div>
            <div class="text-sm">Sent to</div>
            <div>{{ invoice?.to?.email }}</div>
          </div>
        </div>

        <div class="mt-10">
          <div class="text-sm">Project</div>
          <div>{{ invoice?.projectDescription }}</div>
        </div>

        <div class="mt-10 bg-primary-600 p-4 rounded-tr-md rounded-tl-md">
          <div class="grid grid-cols-5 text-xs text-right">
            <div class="col-span-2 text-left">ITEM NAME</div>
            <div>QTY</div>
            <div>PRICE</div>
            <div>TOTAL</div>
          </div>

          <template v-for="(item, itemIdx) in invoice?.items">
            <div :key="itemIdx" class="grid grid-cols-5 my-2 text-right">
              <div class="col-span-2 text-left">{{ item.name }}</div>
              <div>{{ item.qty }}</div>
              <div>￡ {{ item.price }}</div>
              <div>￡ {{ Math.round((item.qty * item.price) * 100) / 100 }}</div>
            </div>
          </template>
        </div>
        <div class="w-full text-right text-lg font-semibold p-4 bg-primary-900 rounded-br-md rounded-bl-md">
          ￡ {{ totalBill }}
        </div>
      </div>
      <!-- End section body -->
    </div>
  </div>
</template>

<script>
import DataStorage from '~/static/DataStorage'
const numeral = require('numeral')
const dbLocal = new DataStorage()

export default {
  layout: 'purple-one',
  data () {
    return {
      invoice: {
        id: null
      },
      totalBill: 0,
      statusClass: null
    }
  },
  mounted () {
    dbLocal.getLatestValue()
    this.fetchById()
    this.totalBill = numeral(this.getTotalBill(this.invoice)).format('0,0.00')
    this.statusClass = this.getStatusClass(this.invoice)
  },
  methods: {
    fetchById () {
      const invoiceId = this.$route.query?.id
      if (!invoiceId) {
        alert('Invalid Invoice ID')
        this.$router.push({ path: '/invoices' })
      } else {
        this.invoice = dbLocal.findById(invoiceId)
        console.log({ detailInvoice: this.invoice })
      }
    },
    getDueDate (inv) {
      if (!inv.id) {
        return null
      } // endif
      const dueDate = this.$moment(inv.date, 'YYYY-MM-DD').add(inv.dayTerms, 'days')
      return dueDate.format('DD MMM YYYY')
    },
    getTotalBill (inv) {
      let total = 0
      inv?.items?.forEach((item) => {
        total += item.price * item.qty
      })
      return Math.round(total * 100) / 100
    },
    getStatusClass (inv) {
      let bg = null
      let color = null
      switch (inv?.status) {
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

<style lang="postcss" scoped>
.c__btn {
  @apply py-2 px-4 rounded-full cursor-pointer
}
</style>
