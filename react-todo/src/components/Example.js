import React, { Component } from 'react';
import { Container, Label , Dropdown, Grid, Image, Segment, Button, List, Form, Menu, Input} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Multiselect } from 'multiselect-react-dropdown';
// import Select from "react-dropdown-select";
import Select from 'react-select'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        values: [],
        users_name:[
          {key: 'aviuser', text:'aviuser', value:'aviuser'},
          {key: 'rahul', text:'rahul', value:'rahul'},
          {key: 'kshitij', text:'kshitij', value:'kshitij'},
          {key: 'abhijeet', text:'abhijeet', value:'abhijeet'},
        ],
        _bill:{
          "bill_name":"",
          "bill_amount":0,
        },
        selectedUsenames:[]
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.createUI = this.createUI.bind(this);
      this.onSelect = this.onSelect.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onBillChange = this.onBillChange.bind(this)
      this.onDelete = this.onDelete.bind(this)
      this.whatValue = this.whatValue.bind(this)
    }
    onChange(event){
      event.preventDefault()
      var split_number = event.target.name.split("-")[1]
      var bill_split_list = this.state._bill
      var temp = {}
      if (split_number in this.state._bill){
          temp = this.state._bill[split_number]
          temp["input_name"] = event.target.name
          temp["input_value"] = event.target.value 
      }else{
          temp["input_name"] = event.target.name
          temp["input_value"] = event.target.value 
        }
      bill_split_list[split_number] = temp
      this.setState({
        _bill:bill_split_list
      })
    }
   
    onSelect = (e, data) => {
      e.preventDefault()
      var split_number = data.name.split("-")[1]
      var bill_split_list = this.state._bill
      var temp = {}
      if (split_number in this.state._bill){
          temp = this.state._bill[split_number]
          temp["select_name"] = data.name
          temp["select_value"] = data.value 
      }else{
          temp["select_name"] = data.name
          temp["select_value"] = data.value 
        }
      bill_split_list[split_number] = temp
      this.setState({
        _bill:bill_split_list
      })
   }
   onBillChange(event){
    event.preventDefault()
    var newBill = this.state._bill
    newBill[event.target.name] = event.target.value
    this.setState({
      ...this._bill,
      _bill:newBill
    })
   }
   whatValue = (e, data) => {
     e.preventDefault()
      console.log(data)
   }
    createUI(){
       return this.state.values.map((el, i) => 
           <div key={i}>
        <Form.Group widths='equal'>
          <Form.Input fluid 
          label='Split Amount' 
          placeholder='Split Amount' 
          // value={this.state.bill_splits[`input-${i}`]}
          value={this.state._bill[`${i}`]===undefined?"":this.state._bill[`${i}`].input_value}
          name={`input-${i}`}
          onChange={this.onChange}
          />
          <Form.Select
            fluid
            label='User'
            options={this.state.users_name}
            placeholder='User'
            // value={this.whatValue}
            name={`select-${i}`}
            onChange={this.onSelect}
          />
          <Button 
          negative 
          type='button'
          size='medium'
          name={`delete-${i}`} 
          placeholder="Delete"
          onClick={this.onDelete}
          >Delete</Button>
          </Form.Group>
           </div>          
       )
    }
  
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    
    addClick(event){
      this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    
    removeClick(i){
      console.log(i)
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
    onDelete = (e, data) => {
      console.log(data.name)
      var split_number = data.name.split('-')[1]
      var val = this.state.values
      val.pop()
      var bill = this.state._bill
      delete bill[split_number]
      console.log(bill)
      this.setState({
        _bill:bill
      })
    }
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <DynamicForm>
          
        </DynamicForm>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
          placeholder="Bill Name"
          label="Bill Name"
          value={this.state._bill.bill_name}
          name="bill_name"
          onChange={this.onBillChange}
          />
          <Form.Input
          placeholder="Total Amount"
          label="Total Amount"
          value={this.state._bill.bill_amount}
          name="bill_amount"
          onChange={this.onBillChange}
          />
            {this.createUI()}        
            <Button primary type='button' onClick={this.addClick.bind(this)} value='add more'>Add More</Button>
            <Button type='submit'>Submit</Button>
        </Form>
      );
    }
  }

  export default Example;