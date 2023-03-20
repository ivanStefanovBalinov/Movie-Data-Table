import {Table} from './table.js'
// import modal from './modal.js';



const fetchData = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json',
        {method: 'GET'});
        const data = await response.json();
        const dataSlice = data.slice(0, 49)
        // dataSlice[0]['Title'] = 'TEST'
        const  myTable = new Table(dataSlice);
        // console.log(myTable.getDataStorage());

        document.body.append(myTable.getTableElement())

         
        
        
         
    } catch (error) {
        console.log(error);
    }
}

fetchData()