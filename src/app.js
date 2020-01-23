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
        array:[],
        saveArray:[],

        showProfile:false,
        profileData:{},
    }

    clickedData = (value) => {
        // const valueData = <a href="#">@{value}</a>;
        const valueData = {type:'href',value:`@${value}`}
        // console.log('--->',valueData)
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

    showProfile = (data) => {
        const slicedValue = data.slice(1);
        const searchedResult = jsonData.find(o => o.name === slicedValue)
        this.setState({
            showProfile:true,
            profileData:searchedResult,
        })
    }
    render() {
      const filterValue = jsonData.filter(z => z.name.includes(this.state.filterValue));
        return(

            <div className="container">
                <h1>
                    Input search List
                </h1>

                <input value={this.state.inputValue} onChange={this.typeValue} style={{width:'400px',fontSize:'20px',marginTop:'40px',marginLeft:'10px'}}/>
                    
                    {this.state.isLoad ?
                        <div style={{background:'#000',color:'#fff',padding:'20px 10px',position:'absolute',width:'300px'}}>
                            {filterValue.length === 0 ?
                                'No Result'
                            :
                                filterValue.map((x,i) =>{
                                    return(
                                        <li key={x.id} onClick={ () =>this.clickedData(x.name) }> {x.name} </li>
                                    )
                                })
                            }
                        </div>
                        :
                        ''
                    }
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
                                <span onClick={()=>this.showProfile(x)} style={{padding:'2px 4px',background:'#000',color:'#ff0000'}} href="#">{x}</span>  &nbsp;
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
                    <b>Profile Name : </b> {this.state.profileData.name}
                 </>
                 :
                 ''
                }


            </div>
        )
    }
}

export default App;