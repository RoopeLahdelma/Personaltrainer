import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';



export default function Customerlist() {
    const [customers, setCustomers] = useState([]);


    useEffect(() => fetchdata(), []);


    const fetchdata = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    }
    const saveTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(training)
        })
          .then(res => fetchdata())
          .catch(err => console.error(err));
        //setSaveopen(true);
      };

    const saveCustomer = (customers) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
            
    }
    const updateCustomer = (customer, link) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
     
    }
   
   
        const deletecustomer = (link) => {

            if (window.confirm('Are you sure?')) {
                fetch(link, { method: 'DELETE' })
                    .then(res => fetchdata())
                    .catch(err => console.error(err))    
            }
    }
    const columns = [{

        Header: 'Firstname',
        accessor: 'firstname'
    },
    {
        Header: 'Lastname',
        accessor: 'lastname'
    },
    {
        Header: 'Streetaddress',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },{
        filterable: false,
        sortable: false,
        width:175,
        Cell: row =>  <div> <Addtraining saveTraining={saveTraining} customer={row.original.links[0].href}/>
    
          </div>
        
      },

    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => <div><Editcustomer updateCustomer={updateCustomer} customer={row.original} />
           
        </div>

    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links.0.href',
        Cell: row => <div><Button color="secondary" size="small" onClick={() => deletecustomer(row.value)}>Delete</Button>
           
        </div>
    }
    ]
    return (
    <div>
        <div><h1>Customers</h1></div>;
        <div>
             <Addcustomer saveCustomer={saveCustomer} />
        </div>
            <ReactTable filterable={true} data={customers} columns={columns} />
    </div>
    );
}