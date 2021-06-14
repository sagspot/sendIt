const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    sent: [
      {
        id: 's1',
        item: 'Electronics',
        date: '02-06-2021',
        recipient: {
          id: 2,
          name: 'Moses Daa',
          email: 'mosesdaa@gmail.com',
          status: 'delivered',
          date: '22-05-2021',
          remarks: 'Received in good condition',
        },
      },
      {
        id: 's2',
        item: 'Accessories',
        date: '22-05-2021',
        recipient: {
          id: 3,
          name: 'James Dee',
          email: 'jamesdee@gmail.com',
          status: 'pending',
          date: '',
          remarks: '',
        },
      },
    ],
    received: [
      {
        id: 's3',
        item: 'Foot wear',
        status: 'pending',
        date: '',
        remarks: '',
        sender: {
          id: 4,
          name: 'James Dee',
          email: 'jamesdee@gmail.com',
          date: '02-06-2021',
        },
      },
      {
        id: 's4',
        item: 'Jamsuits',
        status: 'delivered',
        date: '02-04-2021',
        remarks: 'Some suits dusty',
        sender: {
          id: 3,
          name: 'Jane Dee',
          email: 'janedee@gmail.com',
          date: '01-04-2021',
        },
      },
    ],
  },
  {
    id: 4,
    name: 'James Dee',
    email: 'jamesdee@gmail.com',
    sent: [
      {
        id: 's5',
        item: 'Electronics',
        date: '02-06-2021',
        recipient: {
          id: 2,
          name: 'Moses Daa',
          email: 'mosesdaa@gmail.com',
          status: 'pending',
          date: '',
          remarks: '',
        },
      },
      {
        id: 's6',
        item: 'Accessories',
        date: '22-05-2021',
        recipient: {
          id: 3,
          name: 'Jane Dee',
          email: 'janedee@gmail.com',
          status: 'delivered',
          date: '30-05-2021',
          remarks: 'Received in good condition',
        },
      },
    ],
    received: [
      {
        id: 's2',
        item: 'Accessories',
        status: 'pending',
        date: '',
        remarks: '',
        sender: {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          date: '22-05-2021',
        },
      },
      {
        id: 's8',
        item: 'Jamsuits',
        status: 'delivered',
        date: '02-04-2021',
        remarks: 'Some suits dusty',
        sender: {
          id: 3,
          name: 'Jane Dee',
          email: 'janedee@gmail.com',
          date: '01-04-2021',
        },
      },
    ],
  },
];

module.exports = users;
