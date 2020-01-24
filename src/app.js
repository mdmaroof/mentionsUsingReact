import React, { Component } from 'react';
import './style/app.css';

const jsonData = [
    { id:1 , name:'Maroof',email:'Maroof@gmail.com'},
    { id:2 , name:'Rumman',email:'Rumman@gmail.com' },
    { id:3 , name:'Muneer',email:'Muneer@gmail.com' },
    { id:4 , name:'Shamoon',email:'Shamoon@gmail.com' },
    { id:5 , name:'Shoeb',email:'shoeb@gmail.com' }
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
                filterValue:''
            })
        }
        else{
            const filterValue = data[data.length - 1].slice(1)
            this.setState({
                inputValue: e.target.value,
                isLoad:true,
                filterValue:filterValue.toLowerCase()
            })
        }
        
        this.setState({
            array:data
        })
    }

    showProfile = (data) => {
        const slicedValue = data.slice(1);
        const searchedResult = jsonData.find(o => o.name === slicedValue)
        this.setState({
            showProfile:true,
            profileData:searchedResult,
        })
    }

    render() {
        const filterValue = jsonData.filter(z => z.name.toLowerCase().includes(this.state.filterValue));
        return(

            <div className="container">
                <h1>
                    Mentions search List
                </h1>

                <div className="inputContainer">
                    <input className="inputStyle" value={this.state.inputValue} onChange={this.typeValue}/>

                    {this.state.isLoad ?
                        <div className="dataSelect">
                            {filterValue.length === 0 ?
                                'No Result'
                            :
                                filterValue.map((x,i) =>{
                                    return(
                                        <li key={x.id} className="hoverVlaue" onClick={ () =>this.clickedData(x.name) }> {x.name} </li>
                                    )
                                })
                            }
                        </div>
                        :
                        ''
                    }

                </div>

                <br/> <br/> <br/>

                {this.state.inputValue.split(" ").map((x,i)=>{
                    const data = this.state.saveArray.find(o => o.value === x) || false;
                    if(data === false){
                        return(
                            <React.Fragment key={i}>{x} &nbsp;</React.Fragment>
                        )
                    }
                    else{
                        return(
                            <React.Fragment key={i}>
                                <span onClick={()=>this.showProfile(x)} style={{padding:'2px 4px',cursor:'Pointer',background:'#ccc',color:'#ff0000'}} href="#">{x}</span>  &nbsp;
                            </React.Fragment>       
                        )
                    }
                }
                ) || 'Type Something'}


                <hr />
                <br />

                {this.state.showProfile ?
                 <>
                    <b>Profile ID : </b> {this.state.profileData.id}<br/>
                    <b>Profile Name : </b> {this.state.profileData.name}<br/>
                    <b>Profile Email : </b> {this.state.profileData.email}
                 </>
                 :
                 ''
                }
            </div>
        )
    }
}

export default App;