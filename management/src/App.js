import React from 'react';

import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
// import { makeStyles } from '@material-ui/core/styles/'
import { withStyles } from '@material-ui/core/styles/'

import Test from './components/Test'
import CircularProgress from '@material-ui/core/CircularProgress'



const styles = theme => ({
  root:{
    width:'100%',
    marginTop: theme.spacing(10),
    overflowX:"auto",
  },
  table:{
    minWidth:1080
  },
  progress: {
    margin:theme.spacing(2),
  }

})
  

/*
1)constructor()

2)componentWillMount()

3)render()

4)componentDidMount()

props or state => shouldComponentUpdate()
*/

class App extends React.Component {
  state={
    customers:"",
    completed:0,
  }
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res=>this.setState({customers: res}))

    //NOTE: this.callApi() 를 주석 처리하면 loading화면 확인 할 수 있다.
  }
  callApi=async()=>{
    const response = await fetch('api/customers');
    const body = await response.json();
    return body
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed>= 100 ? 0 : completed+1})
  }
  render() {
  const {classes} = this.props;
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
          
        }) : 
        <TableRow>
          <TableCell colSpan="6" align="center">
            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
          </TableCell>
        </TableRow>
        }
        
    </TableBody>
    </Table>
    <Test></Test>
    </Paper>
  
    
  );
 }
}

export default withStyles(styles)(App);
