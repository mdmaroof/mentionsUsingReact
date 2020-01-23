import React, { Component } from 'react';

const jsonData = [
    { id:1 , name:'maroof' },
    { id:2 , name:'rumman' },
    { id:3 , name:'muneer' },
    { id:4 , name:'shamoon' },
    { id:5 , name:'shoeb' }
]

class App extends Component {
    state = {
        isLoad:false,
        inputValue:'',
        filterValue:'',
        array:[]
    }

    clickedData = (value) => {
        const data = [...this.state.array.slice(0,this.state.array.length-1),`@${value}`];
        const changedInput = data.join(' ')
        this.setState({
            array:data,
            inputValue:changedInput,
            isLoad:false,
        })
    }

    typeValue = (e) => {
        e.preventDefault();

        const data = e.target.value.split(" ");
        const x = data[data.length - 1].charAt(0).match(/\W|_/g);
        // console.log('true1',x)
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
                filterValue:filterValue
            })
        }
        
        this.setState({
            array:data
        })
    }

    render() {
   
        return(

            <div className="container">
                <h1>
                    Input search List
                </h1>
                <input value={this.state.inputValue} onChange={this.typeValue} style={{width:'400px',fontSize:'20px',marginTop:'40px',marginLeft:'10px'}}/>
                {this.state.isLoad ?
                    <div style={{background:'#000',color:'#fff',padding:'20px 10px',position:'absolute',width:'300px',left:'20px'}}>
                        {jsonData.filter(z=>z.name.includes(this.state.filterValue)).map(x =>{
                            return(
                                <li key={x.id} onClick={ () =>this.clickedData(x.name) }> {x.name} </li>
                            )
                        })}
                    </div>
                    :
                    ''
                }
                <br/>

                {
                    this.state.array.map((x,i)=>{
                        return(
                        <React.Fragment key={i}>
                            &nbsp;{x}&nbsp;&nbsp;
                        </React.Fragment>
                        )
                    })
                }
            </div>
        )
    }
}

export default App;