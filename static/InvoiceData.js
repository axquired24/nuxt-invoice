const generateInvoiceItems = () => {
  const items = [
    {
      name: 'Banner Design',
      price: Math.floor(Math.random() * 101),
      qty: 1
    },
    {
      name: 'Brochure Design',
      price: Math.floor(Math.random() * 101),
      qty: 2
    }
  ]

  return items
}

const generateInvoice = (id, name, createdDate = '2020-01-01', status = 'pending') => {
  return {
    id,
    from: {
      address: '123 Main St',
      city: 'London',
      postalCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    to: {
      name,
      email: 'john.doe@mail.com',
      address: '129 Main St',
      city: 'Broadford',
      postalCode: 'BF1 3EZ',
      country: 'United Kingdom'
    },
    date: createdDate,
    dayTerms: 30,
    projectDescription: 'Graphic Design for ' + name,
    items: generateInvoiceItems(),
    status
  }
}

function getInvoices () {
  return [
    generateInvoice('b1dxjm', 'John Doe', '2022-01-01'),
    generateInvoice('cr5mdq', 'Firman Maulana', '2022-04-01', 'paid'),
    generateInvoice('gb1hhr', 'Rizki', '2022-03-09', 'paid'),
    generateInvoice('f7uahd', 'Rian Frost', '2022-08-09'),
    generateInvoice('hd2323', 'Fidia Rush', '2022-05-09', 'draft')
  ]
}

export default getInvoices