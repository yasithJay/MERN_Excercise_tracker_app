import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import axios from 'axios';


const Excercise = props =>{
    <tr>
        <td>{props.excercise.username}</td>
        <td>{props.excercise.description}</td>
        <td>{props.excercise.duration}</td>
        <td>{props.excercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.excercise._id}>edit</Link> | <button onClick={()=>{props.deleteExcercise(props.excercise._id)}}>delete</button>
        </td>

    </tr>

}

export default class ExcerciseList extends Component {
    constructor (props) {
        super(props);

        this.deleteExcercise = this.deleteExcercise.bind(this);

        this.state = {excercises : []};

    }

    // componentDidMount() {
    //     axios.get('http://localhost:5000/excercises/')
    //     .then(response => {
    //         this.setState({excercises : response.data})
    //     })
    //     .catch(err => console.log(err))
    // }

    
    deleteExcercise(id) {
        axios.delete('http://localhost:5000/excercises/delete'+id)
        .then(response => console.log(response.data));

        this.setState({
            excercises :this.state.excercises.filter(el => el._id !== id)
        });
    }

    excercisesList() {
        return this.state.excercises.map(currentexcercise => {
            return <Excercise excercise={currentexcercise} deleteExcercise = {this.deleteExcercise} key={currentexcercise._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Excercises</h3> 
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <td>Username</td>
                            <td>Description</td>
                            <td>Duration</td>
                            <td>Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.excercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }

}