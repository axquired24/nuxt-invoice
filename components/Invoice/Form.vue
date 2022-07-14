<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-fullfade fixed left-0 top-0 w-full">
    <div class="bg-primary-900 w-1/2 pl-28 shadow-lg p-10 rounded-lg h-screen overflow-y-scroll">
      <div v-if="!isnew" class="text-3xl mt-2 font-semibold">
        Edit <span class="opacity-80">#</span><span class="uppercase">{{ form.id }}</span>
      </div>
      <div v-else class="text-3xl mt-2 font-semibold">
        New Invoice
      </div>
      <form @submit.prevent="submitForm()">
        <div class="mt-10 text-sm font-semibold text-primary-500">Bill From</div>
        <div class="form-group mt-4">
          <label class="text-sm">Street Address</label>
          <input v-model="form.from.address" type="text" class="form-control form-control-default">
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div class="form-group">
            <label class="text-sm">City</label>
            <input v-model="form.from.city" type="text" class="form-control form-control-default">
          </div>
          <div class="form-group">
            <label class="text-sm">Post Code</label>
            <input v-model="form.from.postalCode" type="text" class="form-control form-control-default">
          </div>
          <div class="form-group">
            <label class="text-sm">Country</label>
            <input v-model="form.from.country" type="text" class="form-control form-control-default">
          </div>
        </div>

        <div class="mt-10 text-sm font-semibold text-primary-500">Bill To</div>
        <div class="form-group mt-4">
          <label class="text-sm">Client's Name</label>
          <input v-model="form.to.name" type="text" class="form-control form-control-default">
        </div>
        <div class="form-group mt-4">
          <label class="text-sm">Client's Email</label>
          <input v-model="form.to.email" type="text" class="form-control form-control-default">
        </div>
        <div class="form-group mt-4">
          <label class="text-sm">Street Address</label>
          <input v-model="form.to.address" type="text" class="form-control form-control-default">
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div class="form-group">
            <label class="text-sm">City</label>
            <input v-model="form.to.city" type="text" class="form-control form-control-default">
          </div>
          <div class="form-group">
            <label class="text-sm">Post Code</label>
            <input v-model="form.to.postalCode" type="text" class="form-control form-control-default">
          </div>
          <div class="form-group">
            <label class="text-sm">Country</label>
            <input v-model="form.to.country" type="text" class="form-control form-control-default">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-10">
          <div class="form-group">
            <label class="text-sm">Invoice Date</label>
            <input v-model="form.date" type="date" class="picker form-control form-control-default">
          </div>
          <div class="form-group">
            <label class="text-sm">Payment Terms</label>
            <select v-model="form.dayTerms" class="form-control form-control-default">
              <option v-for="(day, index) in dayOptions" :key="index" :value="day">Net {{ day }} Days</option>
            </select>
          </div>
        </div>

        <div class="form-group mt-4">
          <label class="text-sm">Project Description</label>
          <input v-model="form.projectDescription" type="text" class="form-control form-control-default">
        </div>

        <div class="font-bold text-gray-500 text-xl mt-10">Item List</div>
        <div class="grid grid-cols-12 mt-4 mb-2 gap-4">
          <div class="col-span-5">Item name</div>
          <div class="col-span-2">Qty</div>
          <div class="col-span-2">Price</div>
          <div class="col-span-2">Total</div>
          <div class="col-span-1"></div>
        </div>

        <template v-for="(item, itemIdx) in form.items">
          <div :key="itemIdx" class="grid grid-cols-12 mt-2 gap-4 items-center">
            <div class="col-span-5">
              <input v-model="item.name" type="text" class="form-control form-control-default">
            </div>
            <div class="col-span-2">
              <input v-model="item.qty" type="number" step="1" class="form-control form-control-default">
            </div>
            <div class="col-span-2">
              <input
                v-model="item.price"
                type="number"
                step="0.01"
                min="0"
                lang="en"
                class="form-control form-control-default"
              >
            </div>
            <div class="col-span-2">{{ getSubTotalBill(item.qty, item.price) }}</div>
            <div class="col-span-1">
              <span class="text-gray-500 hover:text-gray-300 cursor-pointer" @click="removeInvoiceItem(itemIdx)"><IconTrashSvg class="h-6" /></span>
            </div>
          </div>
        </template>

        <div class="mt-4 w-full">
          <button type="button" @click="addInvoiceItem()" class="c__btn w-full bg-primary-800 hover:bg-primary-750">+ Add New Item</button>
        </div>

        <div class="flex justify-end gap-2 text-white text-sm my-10">
          <button type="button" @click="closeForm()" class="c__btn bg-primary-800 hover:bg-primary-750">Cancel</button>
          <button type="submit" class="c__btn bg-primary-500 hover:bg-primary-600">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { customAlphabet } from 'nanoid'
import { getEmptyInvoice, getEmptyInvoiceItem } from '~/static/InvoiceData'

const numeral = require('numeral')

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['inv', 'toggleform', 'isnew'],
  data: () => {
    return {
      form: getEmptyInvoice(),
      dayOptions: [10, 15, 30]
    }
  },
  mounted () {
    this.initForm()
  },
  methods: {
    initForm () {
      this.form = JSON.parse(JSON.stringify(this.inv))
      if (!this.isnew) {
        return false
      } else {
        const customNano = customAlphabet('1234567890abcdefghijklmmnopqrstuvwxyz', 6)
        this.form = JSON.parse(JSON.stringify(this.inv))
        this.form.id = customNano()
      } // endif
    },
    submitForm () {
      // TODO: submit form
    },
    closeForm () {
      const confirmation = confirm('Are you sure you want to close this form? Your edit will be lost.')
      if (confirmation) {
        this.toggleform(false)
      }
    },
    getSubTotalBill (qty, price) {
      let total = price * qty
      total = Math.round(total * 100) / 100
      return numeral(total).format('0,0.00')
    },
    addInvoiceItem () {
      this.form.items.push(getEmptyInvoiceItem())
    },
    removeInvoiceItem (idx) {
      const confirmation = confirm('Are you sure you want to remove this item?')
      if (!confirmation) {
        return false
      }
      this.form.items.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
.bg-fullfade {
  background-color: rgba(0, 0, 0, 0.5);
}
/* Remove input number arrow spin */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input.picker[type="date"] {
    position: relative;
}

input.picker[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    color: transparent;
    background: transparent;
    cursor: pointer;
}

</style>

<style lang="postcss" scoped>
.c__btn {
  @apply py-2 px-4 rounded-full cursor-pointer
}

.form-control {
  @apply block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50
}
.form-control-default {
    @apply text-white placeholder-gray-600 bg-primary-800 border-primary-750 focus:border-primary-500
  }
.form-control-danger {
  @apply border-red-300 bg-red-50 placeholder-red-200 text-red-900
}
</style>
