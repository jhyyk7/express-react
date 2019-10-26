import React from 'react';

import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'
import Test from './components/Test'



const styles = theme=>({
  root:{
    width:'100%',
    marginTop: theme.spacing(10),
    overflowX:"auto",
  },
  table:{
    minWidth:1080
  }
})

class App extends React.Component {
  state={
    customers:""
  }
  componentDidMount(){
    this.callApi()
    .then(res=>this.setState({customers: res}))
  }
  callApi=async()=>{
    const response = await fetch('api/customers');
    const body = await response.json();
    return body
  }
  render() {
  var {classes} = this.props;
  return (
    <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
        </TableRow>
      </TableHead>
    <TableBody>
    
        {
        this.state.customers ? this.state.customers.map(c=>{

          return (

            <Customer 
              key={c.id}
              id={c.id}
              name={c.name}
              image={c.image}
              birth={c.birth}
              gender={c.gender}
              job={c.job}
            ></Customer>
          )
          
        }) : ""
        }
        
    </TableBody>
    </Table>
    <Test></Test>
    </Paper>
  
    
  );
 }
}

export default withStyles(styles)(App);
