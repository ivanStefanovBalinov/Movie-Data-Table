import modal from "./modal.js";
import {createForm} from "./form.js";

export class Table {
    #table


    constructor(dataSource){
        this.#table = document.createElement('table');
        this.#table.classList.add('table')
        this.#table.append(this.#generateTableHead(Object.keys(dataSource[0])));
        this.#table.append(this.#generateTableBody(dataSource))
       
    }

    #generateTableHead(objectKeys) {
        const theadElement = document.createElement('thead')
        const headTableRowElement = document.createElement('tr')

        objectKeys.forEach((key) => {
            const thElement = document.createElement('th')
            thElement.classList.add('tabelHeadCells')
            thElement.innerText = key;

            headTableRowElement.append(thElement);
        });

        theadElement.append(headTableRowElement);

        return theadElement
    }
    
    

    #generateTableBody(dataSource){
        const tbodyElement = document.createElement('tbody');

        const rows = dataSource.map((object) => this.#generateBodyRow(object));
        tbodyElement.append(...rows);

        return tbodyElement;
    }

    #generateBodyRow(object){
        const bodyRowElement = document.createElement('tr');
        bodyRowElement.classList.add('bodyRow')
        bodyRowElement.id = object.Title


        const bodyRowCells = Object.keys(object).map((objectKey) => {
            const tdElement = document.createElement('td');
            tdElement.classList.add('tableDataCells')
            tdElement.innerText = object[objectKey];
            tdElement.id = objectKey

            return tdElement;
        });

        bodyRowElement.onclick = () => this.#editTableBodyRow(object)

        bodyRowElement.append(...bodyRowCells);
        return bodyRowElement;
    }

    #editTableBodyRow(object){
        modal.show();

       const handler = (event) => {event.preventDefault();
    
            const inputs = event.target.querySelectorAll('input');
            const target= document.getElementById(object.Title);
            const updateRow = [...inputs].reduce(
            (prev, curr) => ({...prev, [curr.name] : curr.value}),
            {})
            
            document.body.style.overflow = 'none'
            console.log(updateRow);
            modal.hide()
            this.#table.style.pointerEvents = 'auto'
            this.#table.classList.remove('filterTable')
            
            target.childNodes.forEach((child) => {
                
                 child.innerText = updateRow[child.id]       
            });
            

        }


        const editFrom = createForm([
            {fieldName: 'Title', type: 'text', value: object.Title},
            {fieldName: 'US Gross', type: 'number', value: object['US Gross']},
            {fieldName: 'Worldwide Gross', type: 'text', value: object['Worldwide Gross']},
            {fieldName: 'US DVD Sales', type: 'number', value: object['US DVD Sales']},
            {fieldName: 'Production Budget', type: 'number', value: object['Production Budget']},
            {fieldName: 'Release Date', type: 'text', value: object['Release Date']},
            {fieldName: 'MPAA Rating', type: 'text', value: object['MPAA Rating']},
            {fieldName: 'Running Time min', type: 'text', value: object['Running Time min']},
            {fieldName: 'Distributor', type: 'text', value: object['Distributor']},
            {fieldName: 'Source', type: 'text', value: object['Source']},
            {fieldName: 'Major Genre', type: 'text', value: object['Major Genre']},
            {fieldName: 'Creative Type', type: 'text', value: object['Creative Type']},
            {fieldName: 'Director', type: 'text', value: object['Director']},
            {fieldName: 'Rotten Tomatoes Rating', type: 'number', value: object['Rotten Tomatoes Rating']},
            {fieldName: 'IMDB Rating', type: 'text', value: object['IMDB Rating']},
            {fieldName: 'IMDB Votes', type: 'number', value: object['IMDB Votes']}
        ],`Edit ${object.Title}`, handler)
        
        modal.populateModal(editFrom)
        this.#table.style.pointerEvents = 'none';
        this.#table.classList.add('filterTable')
        
        
        
    }
    
   

    getTableElement(){
        return this.#table
    }

   
}

