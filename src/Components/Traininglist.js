import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import EditTraining from './EditTraining';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchdata(), []);
    const fetchdata = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            
            .then(response => response.json())
            .then(data => setTrainings(data))  
        }
    
        const saveTraining = training => {
            fetch("https://customerrest.herokuapp.com/api/trainings", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(training)
            })
              .then(res => fetchdata())
              .catch(err => console.error(err));
          };
    const updateTraining = (training, link) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
        }
  
        const deletetraining = (link) => {

        if (window.confirm('Are you sure?')) {
            fetch( link, {
                 method: 'DELETE' })
                .then(res => fetchdata())
                .catch(err => console.error(err))
        }
    }
    const columns = [  
    { Header: 'Firstname',
    accessor: 'customer.firstname'
},
{
    Header: 'Lastname',
    accessor: 'customer.lastname'
},{
    Header: 'Activity',
    accessor: 'activity'
},
{
    Header: 'Duration',
    accessor: 'duration'
},
{
    Header: 'Date',
    accessor: 'date'
},


    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "links[0].href",
        
        Cell: row => 
        <div>
            <EditTraining updateTraining={updateTraining} training={row.original} />
        </div>
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: row => 
        <div> 
            <Button color="secondary" size="small" onClick={() => 
                deletetraining( `https://customerrest.herokuapp.com/api/trainings/${row.original.id}`)}>Delete
            </Button>
        </div>
    }
    ]
    return (
        <div>
            <div>
            
            <div>
                <h1>Trainings</h1>
                <p>you can add trainings to customers in customer tab!</p>
            </div>

            </div>
            <ReactTable filterable={true} data={trainings} columns={columns} />

        </div>
    );
}