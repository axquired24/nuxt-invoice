<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center items-start pt-10">
    <div class="w-1/2">
      <div class="grid grid-cols-4 items-end">
        <div class="col-span-2">
          <div class="text-3xl font-bold">
            Invoices
          </div>
          <span>There are total {{ invoices.length }} Invoices</span>
        </div>
        <div class="col-span-1">
          <select
            v-model="statusFilter"
            @change="filterByStatus(statusFilter)"
            class="cursor-pointer capitalize bg-transparent px-2 py-3 font-semibold">
            <option value="0" disabled>Filter by status</option>
            <option value="all">All</option>
            <template v-for="(st, stIdx) in statusList">
              <option :key="stIdx" :value="st">
                {{ st }}
              </option>
            </template>
          </select>
        </div>
        <div class="col-span-1">
          <div class="bg-primary-500 hover:bg-primary-600 py-1 px-2 rounded-full flex items-center gap-4 cursor-pointer">
            <IconPlusCircleSvg class="text-white h-10" />
            <span class="text-sm font-bold">New Invoice</span>
          </div>
        </div>
      </div>
      <div class="invoice-list mt-10">
        <template v-for="inv in invoices">
          <div :key="inv.id">
            <InvoiceListCard :inv="inv" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import getInvoices from '~/static/InvoiceData'

export default {
  layout: 'purple-one',
  data () {
    return {
      invoices: [],
      statusList: ['draft', 'pending', 'paid'],
      statusFilter: 0
    }
  },
  mounted () {
    this.resetFilter()
  },
  methods: {
    mapInvoices (invoices) {
      const self = this
      return invoices.map((inv) => {
        const dueDate = self.$moment(inv.date, 'YYYY-MM-DD').add(inv.dayTerms, 'days')
        inv.dueDate = dueDate.format('DD MMM YYYY')
        inv.dueDateTs = dueDate.unix()
        return inv
      }).sort((a, b) => {
        return a.dueDateTs - b.dueDateTs
      })
    },
    filterByStatus (status) {
      if (this.statusList.includes(status)) {
        const invoiceAll = this.mapInvoices(getInvoices())
        this.invoices = invoiceAll.filter((inv) => {
          return inv.status === status
        })
      } else {
        this.resetFilter()
      }
    },
    resetFilter () {
      this.invoices = this.mapInvoices(getInvoices())
    }
  }
}
</script>
