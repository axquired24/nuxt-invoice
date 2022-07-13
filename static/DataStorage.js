import getInvoices from '@/static/InvoiceData'

class DataStorage {
  constructor () {
    this.storageKey = 'tadaInvoice'
    this.currentValue = null
  }

  getLatestValue () {
    let storageValue = localStorage.getItem(this.storageKey)
    if (!storageValue) {
      storageValue = getInvoices()
      localStorage.setItem(this.storageKey, JSON.stringify(storageValue))
    } else {
      storageValue = JSON.parse(storageValue)
    }
    this.currentValue = storageValue
  }

  commitLatestValue (latestValue) {
    this.currentValue = latestValue
    localStorage.setItem(this.storageKey, JSON.stringify(latestValue))
  }

  findById (id) {
    return this.currentValue.find(invoice => invoice.id === id)
  }

  updateById (id, updatedInvoice) {
    const latestValue = this.currentValue
    const index = latestValue.findIndex(invoice => invoice.id === id)
    latestValue[index] = updatedInvoice
    this.commitLatestValue(latestValue)
  }

  removeById (id) {
    const latestValue = this.currentValue
    const index = latestValue.findIndex(invoice => invoice.id === id)
    latestValue.splice(index, 1)
    this.commitLatestValue(latestValue)
  }
}

export default DataStorage
