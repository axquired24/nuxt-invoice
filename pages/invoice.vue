<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrapper bg-purple-900 min-h-screen">
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
            Filter By Status
          </div>
          <div class="col-span-1">
            New Invoice
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
  </div>
</template>

<script>
import getInvoices from '~/static/InvoiceData'

export default {
  data () {
    return {
      invoices: []
    }
  },
  mounted () {
    this.invoices = getInvoices()
  }
}
</script>
