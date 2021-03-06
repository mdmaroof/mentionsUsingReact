import React, { Component } from 'react';
import './style/app.css';

const jsonData = [
    { id:1 , name:'Maroof',email:'Maroof@gmail.com'},
    { id:2 , name:'Rumman',email:'Rumman@gmail.com' },
    { id:3 , name:'Muneer',email:'Muneer@gmail.com' },
    { id:4 , name:'Shamoon',email:'Shamoon@gmail.com' },
    { id:5 , name:'Shoeb',email:'shoeb@gmail.com' },

    { id:6 , name:'Zaid',email:'Zaid@gmail.com'},
    { id:7 , name:'Adeel',email:'Adeel@gmail.com' },
    { id:8 , name:'Ammar',email:'Ammar@gmail.com' },
    { id:9 , name:'Waseeb',email:'Waseeb@gmail.com' },
    { id:10 , name:'Mohan',email:'Mohan@gmail.com' },

    { id:11 , name:'John',email:'John@gmail.com'},
    { id:12 , name:'Mayank',email:'Mayank@gmail.com' },
    { id:13 , name:'Farukh',email:'Farukh@gmail.com' },
    { id:14 , name:'Yasir',email:'Yasir@gmail.com' },
    { id:15 , name:'Kamlesh',email:'Kamlesh@gmail.com' },
]

class App extends Component {
    state = {
        isLoad:false,
        inputValue:'',
        filterValue:'',
        array:[],
        saveArray:[],

        showProfile:false,
        profileData:{},
    }

    clickedData = (value) => {
        const valueData = {type:'href',value:`@${value}`}
        const data = [...this.state.array.slice(0,this.state.array.length-1),valueData.value];
        const changedInput = data.join(' ');
        this.setState({
            saveArray:[...this.state.saveArray,valueData],
            array:data,
            inputValue:changedInput,
            isLoad:false,
            showProfile:false,
        })
    }

    typeValue = (e) => {
        e.preventDefault();
        const data = e.target.value.split(" ");
        const x = data[data.length - 1].charAt(0).match(/\W|_/g);
        if(x != "@"){
            this.setState({
                inputValue: e.target.value,
                isLoad:false,
                filterValue:'',
                showProfile:false,
            })
        }
        else{
            const filterValue = data[data.length - 1].slice(1)
            const dataNew = filterValue.length != 0;
            this.setState({
                inputValue: e.target.value,
                isLoad:dataNew,
                filterValue:filterValue.toLowerCase()
            })
        }
        this.setState({
            array:data
        })
    }

    showProfile = (data) => {
        this.state.inputValue !== '' ? this.setState({showProfile:true}) : alert('Dude Atleast Type Something !!!')
    }

    render() {
        const filterValue = jsonData.filter(z => z.name.toLowerCase().includes(this.state.filterValue));
        return(
            <div className="container">
                <h1>SEND MESSAGE <span>( name mentions using @xyz )</span></h1>
                <div className="inputContainer">
                    <input className="inputStyle" value={this.state.inputValue} onChange={this.typeValue}/> 
                    <span className="btn" onClick={this.showProfile}>Send Data</span>
                    {filterValue.length !== 0 && this.state.isLoad ?
                        <div className="dataSelect">
                            {filterValue.length === 0 ? 'No Result' :filterValue.map((x,i) =>{
                                return<li key={x.id} className="hoverVlaue" onClick={ () =>this.clickedData(x.name) }> {x.name} </li>})
                            }
                        </div>
                        :
                        ''
                    }
                </div>
                <br/>
                {this.state.showProfile ? 
                    this.state.inputValue.split(" ").map((x,i)=>{
                        const data = this.state.saveArray.find(o => o.value === x) || false;
                        if(data === false){
                        return <React.Fragment key={i}>{x} {this.state.inputValue.split(" ").length === (i+1) ? '' : <>&nbsp;</>}</React.Fragment>
                        }
                        else{
                            return(
                                <React.Fragment key={i}>
                                    <span className="linkedValue">
                                        {x}
                                        <span>
                                            {<div>
                                                <>Profile ID : {jsonData.find(o => o.name === x.slice(1)).id}</><br/>
                                                <>Name : {jsonData.find(o => o.name === x.slice(1)).name}</><br/>
                                                <>Email : {jsonData.find(o => o.name === x.slice(1)).email.toLowerCase()}</><br/>
                                            </div>}
                                        </span>
                                    </span>  
                                    {this.state.inputValue.split(" ").length === (i+1) ? '' : <>&nbsp;</>}
                                </React.Fragment>       
                            )
                        }
                    }) : ''
                }
                <hr />
                Example : Hello @Maroof
            </div>
        )
    }
}
export default App;