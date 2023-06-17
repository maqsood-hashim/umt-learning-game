import { Paper, Typography } from "@material-ui/core";
import React, { useState ,useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "../AdminDashboard/MainSidebar/MainSidebar";
import QuestionTable from "./GradeTable/GradeTable";
import "./GradeInfo.css"

const QuestionInfo = () => {
  const [data, setData] = useState([]);
  const [dataClone, setDataClone] = useState([]);
  const [qlevel , setQlevel] = useState("0");

  const Button = ({ text, onClick, color, style }) => {
    const buttonStyle = {
      backgroundColor: color,
      ...style,
    };
  
    return (
      <button onClick={onClick} className="button" style={buttonStyle}>
        {text}
      </button>
    );
  };
///Button Clicked track
const [selectedButton, setSelectedButton] = useState();


  const handleClick = (level) => {
    setSelectedButton(level);
    // Handle button click event here
    setQlevel(level)
    const filteredData = dataClone.filter((item) => item.level === level);
    setData(filteredData)
    //  console.log("filtesd"+ filteredData)
    // console.log(`Selected level: ${qlevel}`);
  }
    
    const getData = ()=>{
      console.log(qlevel)
      fetch('/getAllGrades')
        .then(res => res.json())
        .then((data) => { 
          // console.log(data)
          // console.log("Filtere the data on"+qlevel)
          setDataClone(data)
          // const filteredData = dataClone.filter((item) => item.level === 0);
          setData(data)

          
         
       
          })
        .catch(error => console.error('Error fetching questions:', error));
    
     }
      
  
    
 
  useEffect(() => {
   
    getData();
   
    
    
  }, []);

  const headingStyle = {
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent black background
    padding: '20px',
    borderRadius: '8px',
    marginBottom:'10px'
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className={`d-none d-md-block`}>
            <MainSidebar />
          </Col>
          <Col md={10}>
            <Container className="mb-5">
              <Paper>
              <Typography
                 Typography variant="h4" style={headingStyle}
                >
                 Quiz Grades
                </Typography>

 
   
              </Paper>
              <div className="button-row">
                <Button
        text="Beginner"
        onClick={() => handleClick("0")}
        color={selectedButton === "0" ? '#4caf50' : '#777'}
        style={{ marginRight: '10px' }}
      />
      <Button
        text="Intermediate"
        onClick={() => handleClick("1")}
        color={selectedButton === "1" ? '#ff9800' : '#777'}
        style={{ marginRight: '10px' }}
      />
      <Button
        text="Expert"
        onClick={() => handleClick("2")}
        color={selectedButton === "2" ? '#f44336' : '#777'}
        style={{ marginRight: '10px' }}
      />
    </div>
              <QuestionTable Questiondata = {data}/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestionInfo;
