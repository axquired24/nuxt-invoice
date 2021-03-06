<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center items-start pt-10">
    <div class="w-full px-4 lg:w-1/2">
      <div class="grid grid-cols-4 gap-4 items-end">
        <div class="col-span-2">
          <div class="text-3xl font-bold">
            Invoices
          </div>
          <span class="hidden md:block">There are total {{ invoices.length }} Invoices</span>
          <span class="md:hidden">{{ invoices.length }} Invoices</span>
        </div>
        <div class="col-span-1">
          <select
            v-model="statusFilter"
            class="hidden md:block cursor-pointer capitalize bg-transparent px-2 py-3 font-semibold"
            @change="filterByStatus(statusFilter)">
            <option value="0" disabled>Filter by status</option>
            <option value="all">All</option>
            <template v-for="(st, stIdx) in statusList">
              <option :key="stIdx" :value="st">
                {{ st }}
              </option>
            </template>
          </select>

          <select
            v-model="statusFilter"
            class="md:hidden cursor-pointer capitalize bg-transparent px-2 py-3 font-semibold"
            @change="filterByStatus(statusFilter)">
            <option value="0" disabled>Filter </option>
            <option value="all">All</option>
            <template v-for="(st, stIdx) in statusList">
              <option :key="stIdx" :value="st">
                {{ st }}
              </option>
            </template>
          </select>
        </div>
        <div class="col-span-1">
          <div @click="showForm = !showForm" class="c__btn bg-primary-500 hover:bg-primary-600 flex items-center gap-1 md:gap-4">
            <IconPlusCircleSvg class="text-white h-10" />
            <div>
              <span class="lg:hidden text-sm font-bold">New </span>
              <span class="hidden lg:block text-sm font-bold">New Invoice</span>
            </div>
          </div>
        </div>
      </div>
      <div class="invoice-list my-10">
        <template v-for="inv in invoices">
          <div :key="inv.id">
            <InvoiceListCard :inv="inv" />
          </div>
        </template>
      </div>
    </div>

    <template v-if="showForm">
      <InvoiceForm
        :inv="newInvoice"
        :toggleform="toggleForm"
        :isnew="true"
        :aftersubmit="afterSubmitForm"
      />
    </template>
  </div>
</template>

<script>
import DataStorage from '~/static/DataStorage'
import { getEmptyInvoice } from '~/static/InvoiceData'
const dbLocal = new DataStorage()

export default {
  layout: 'purple-one',
  data () {
    return {
      invoices: [],
      statusList: ['draft', 'pending', 'paid'],
      statusFilter: 0,
      showForm: false,
      newInvoice: getEmptyInvoice()
    }
  },
  mounted () {
    this.forceCleanCheck()
    dbLocal.getLatestValue()
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
        const invoiceAll = this.mapInvoices(dbLocal.currentValue)
        this.invoices = invoiceAll.filter((inv) => {
          return inv.status === status
        })
      } else {
        this.resetFilter()
      }
    },
    resetFilter () {
      this.invoices = this.mapInvoices(dbLocal.currentValue)
    },
    forceCleanCheck () {
      const isForceClean = this.$route.query?.reset === '1'
      if (isForceClean) {
        dbLocal.forceClean()
      }
    },
    toggleForm (visible = false) {
      this.showForm = visible
    },
    afterSubmitForm () {
      window.location.reload()
    }
  }
}
</script>

<style lang="postcss" scoped>
.c__btn {
  @apply py-1 px-2 rounded-full cursor-pointer
}
</style>
