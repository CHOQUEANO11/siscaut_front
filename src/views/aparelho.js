/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {Link} from "react-router-dom";

import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

//FirebsaeConfigs
import {db} from '../firebase'
 feature/banco_de_dados
import {doc, setDoc, Collection, addDoc, collection, onSnapshot} from 'firebase/firestore'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddAparelho/Modal";
import './index.css'






const Aparelho = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");


    const [modelo, setModelo] = useState('')
feature/banco_de_dados
    const [imei1, setImei1] =   useState('')
  
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    const [listaAparelho,setListaAparelho] = useState([])

    const [aparelhos,setAparelhos] = useState([])


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  //Função de add do Aparelho ao bando de dados
  async function handleAdd(){

  await addDoc(collection(db,"Aparelhos"),{
    imei1: imei1,
    imei2: imei2,
    marca:marca,
    modelo:modelo,
  })
  .then(()=>{
    console.log("conseguiu")
    setImei1('')
    setImei2('')
    setModelo('')
    setMarca('')
  })
  .catch((error)=>{
    console.log(error)

  });
}

 feature/banco_de_dados

function teste(){
  console.log(typeof(aparelhos) )
}



  //função de exibição 
  useEffect(()=>{
    async function loadAparelhos(){
      const unsub = onSnapshot(collection(db,'Aparelhos'), (snapshot)=>{
        let listaAparelhos = [];

        snapshot.forEach((doc)=>{
          listaAparelhos.push({
            id: doc.id,
            imei1: doc.data().imei1,
            imei2: doc.data().imei2,
            marca: doc.data().marca,
            modelo: doc.data().modelo
          })
        })
        setAparelhos(listaAparelhos);
      });

    }
      loadAparelhos();

  },[])




  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };



  async function getList(){

    const postsRef =collection(db,"Aparelhos")
    const response  = await getDocs(postsRef)
    const data = response.docs.map((doc)=>({...doc.data(),id: doc.id}))

    console.log('POSTREF' ,data)
    setListaAparelho(data)
 
  }
  useEffect(()=>{getList()},[])




  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Aparelhos</h3>
                   </div>
                  <div> 
                    <Modall
                    valueModelo={modelo}
                    valueAltModelo={(e)=>setModelo(e)}

                    
                    valueMarca={marca}
                    valueAltMarca={(e)=>setMarca(e)}


                    value1imei={imei1}
                    valueAlt1imei={(e)=>setImei1(e)}


                    value2imei={imei2}
                    valueAlt2imei={e=>setImei2(e)}

                    
                    Add={handleAdd}
                    />

                   
                  </div>
    
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
        
                <tbody>
feature/banco_de_dados

                   
                   
                   
                   {aparelhos.map((aparelhos) =>{
                    return(
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                      <div> <Link to="/auth/createUser">
                    
                        <Button
                            color="success"
                            // href="/admin/dashboard"
                            size="sm"
                          >
                            Editar
                          </Button>
                        </Link>

                          <Button color="danger" size="sm" onClick={teste}> Excluir </Button>
                        </div>
                    </td>
                      </tr>
                    )
                   })}






                  {/* <tr>
                    <th scope="row">Nilson</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                    </td>
                    <td>
                      <div> <Link to="/auth/createUser">
                    
                        <Button
                            color="success"
                            // href="/admin/dashboard"
                            size="sm"
                          >
                            Editar
                          </Button>
                        </Link>

                          <Button color="danger" size="sm" onClick={teste}> Excluir </Button>
                        </div>
                    </td>
                  </tr>
 */}

        
                  
               
                 
                
                 
                </tbody>
              </Table>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;
